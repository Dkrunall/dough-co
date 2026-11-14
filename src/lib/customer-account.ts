import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Shopify Customer Account API (headless customer accounts).
 *
 * Sign-in happens on Shopify's hosted page (email one-time code) using OAuth 2.0
 * with PKCE as a public client; the resulting tokens live in an httpOnly cookie and
 * are used server-side to read the customer's profile, orders and addresses.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;

export const isCustomerAccountConfigured = Boolean(domain && clientId);

const SESSION_COOKIE = "dc_customer";
const LOGIN_COOKIE = "dc_customer_login";
const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

/* ── Endpoints (discovered from the store, cached) ───────── */

type Endpoints = { authorize: string; token: string; logout: string; graphql: string };
let endpointsPromise: Promise<Endpoints> | null = null;

function endpoints() {
  endpointsPromise ??= (async () => {
    const get = (path: string) =>
      fetch(`https://${domain}/.well-known/${path}`, { next: { revalidate: 86400 } }).then((r) => {
        if (!r.ok) throw new Error(`Discovery ${path} failed (${r.status})`);
        return r.json();
      });
    const [oidc, api] = await Promise.all([get("openid-configuration"), get("customer-account-api")]);
    return {
      authorize: oidc.authorization_endpoint,
      token: oidc.token_endpoint,
      logout: oidc.end_session_endpoint,
      graphql: api.graphql_api,
    };
  })().catch((err) => {
    endpointsPromise = null;
    throw err;
  });
  return endpointsPromise;
}

/* ── Sign-in (PKCE) ──────────────────────────────────────── */

const base64url = (buf: Buffer) => buf.toString("base64url");

/** Builds Shopify's sign-in URL and remembers state/verifier/nonce in a short-lived cookie. */
export async function beginLogin(redirectUri: string) {
  const { authorize } = await endpoints();
  const state = base64url(randomBytes(24));
  const nonce = base64url(randomBytes(24));
  const verifier = base64url(randomBytes(48));
  const challenge = base64url(createHash("sha256").update(verifier).digest());

  (await cookies()).set(LOGIN_COOKIE, JSON.stringify({ state, nonce, verifier }), {
    ...cookieBase,
    maxAge: 60 * 10,
  });

  const url = new URL(authorize);
  url.search = new URLSearchParams({
    client_id: clientId!,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "openid email customer-account-api:full",
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: "S256",
  }).toString();
  return url.toString();
}

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  id_token?: string;
};

type Session = { accessToken: string; refreshToken: string; expiresAt: number; idToken?: string };

async function requestToken(params: Record<string, string>, origin: string) {
  const { token } = await endpoints();
  const res = await fetch(token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Public clients must send the registered JavaScript origin.
      Origin: origin,
      "User-Agent": "DoughAndCo-Storefront",
    },
    body: new URLSearchParams({ client_id: clientId!, ...params }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Token request failed (${res.status}): ${await res.text()}`);
  return (await res.json()) as TokenResponse;
}

async function saveSession(t: TokenResponse, previous?: Session) {
  const session: Session = {
    accessToken: t.access_token,
    refreshToken: t.refresh_token ?? previous?.refreshToken,
    expiresAt: Date.now() + t.expires_in * 1000,
    idToken: t.id_token ?? previous?.idToken,
  };
  (await cookies()).set(SESSION_COOKIE, JSON.stringify(session), { ...cookieBase, maxAge: 60 * 60 * 24 * 30 });
}

function idTokenNonce(idToken: string) {
  try {
    return JSON.parse(Buffer.from(idToken.split(".")[1], "base64url").toString()).nonce as string | undefined;
  } catch {
    return undefined;
  }
}

/** Handles Shopify's redirect back: checks state and nonce, then stores the tokens. */
export async function completeLogin(code: string, state: string, redirectUri: string, origin: string) {
  const jar = await cookies();
  const raw = jar.get(LOGIN_COOKIE)?.value;
  jar.delete(LOGIN_COOKIE);
  if (!raw) throw new Error("Sign-in expired");
  const pending = JSON.parse(raw) as { state: string; nonce: string; verifier: string };
  if (pending.state !== state) throw new Error("Sign-in state mismatch");

  const tokens = await requestToken(
    { grant_type: "authorization_code", redirect_uri: redirectUri, code, code_verifier: pending.verifier },
    origin,
  );
  if (tokens.id_token && idTokenNonce(tokens.id_token) !== pending.nonce) throw new Error("Sign-in nonce mismatch");
  await saveSession(tokens);
}

/* ── Session ─────────────────────────────────────────────── */

export async function getSession(): Promise<(Session & { expired: boolean }) | null> {
  const raw = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const session = JSON.parse(raw) as Session;
    return { ...session, expired: session.expiresAt - 60_000 < Date.now() };
  } catch {
    return null;
  }
}

/** Swaps the refresh token for a new access token. Returns false if the customer must sign in again. */
export async function refreshSession(origin: string) {
  const session = await getSession();
  if (!session?.refreshToken) return false;
  try {
    await saveSession(
      await requestToken({ grant_type: "refresh_token", refresh_token: session.refreshToken }, origin),
      session,
    );
    return true;
  } catch {
    (await cookies()).delete(SESSION_COOKIE);
    return false;
  }
}

/** Clears the local session and returns Shopify's logout URL so the Shopify session ends too. */
export async function endSession(postLogoutRedirect: string) {
  const jar = await cookies();
  const session = await getSession();
  jar.delete(SESSION_COOKIE);
  const { logout } = await endpoints();
  const url = new URL(logout);
  if (session?.idToken) url.searchParams.set("id_token_hint", session.idToken);
  url.searchParams.set("post_logout_redirect_uri", postLogoutRedirect);
  return url.toString();
}

/* ── Customer data ───────────────────────────────────────── */

type Money = { amount: string; currencyCode: string };

export type CustomerAccount = {
  firstName: string | null;
  lastName: string | null;
  emailAddress: { emailAddress: string } | null;
  defaultAddress: { id: string } | null;
  addresses: { nodes: { id: string; formatted: string[] }[] };
  orders: {
    nodes: {
      id: string;
      name: string;
      processedAt: string;
      financialStatus: string | null;
      statusPageUrl: string;
      totalPrice: Money;
      lineItems: { nodes: { title: string; quantity: number; image: { url: string; altText: string | null } | null }[] };
    }[];
  };
};

const ACCOUNT_QUERY = /* GraphQL */ `
  query Account {
    customer {
      firstName
      lastName
      emailAddress { emailAddress }
      defaultAddress { id }
      addresses(first: 10) { nodes { id formatted(withName: true) } }
      orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          name
          processedAt
          financialStatus
          statusPageUrl
          totalPrice { amount currencyCode }
          lineItems(first: 10) { nodes { title quantity image { url altText } } }
        }
      }
    }
  }
`;

/** Returns null when the token is rejected (customer must sign in again). */
export async function fetchCustomer(accessToken: string): Promise<CustomerAccount | null> {
  const { graphql } = await endpoints();
  const res = await fetch(graphql, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: accessToken },
    body: JSON.stringify({ query: ACCOUNT_QUERY }),
    cache: "no-store",
  });
  if (res.status === 401 || res.status === 403) return null;
  const json = await res.json().catch(() => null);
  if (!res.ok || !json || json.errors) {
    const detail = json?.errors?.map((e: { message: string }) => e.message).join("; ");
    throw new Error(`Customer Account API failed (${res.status}): ${detail ?? res.statusText}`);
  }
  return json.data.customer as CustomerAccount;
}
