import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/Links";
import { fetchCustomer, getSession, isCustomerAccountConfigured } from "@/lib/customer-account";
import { formatPrice } from "@/lib/products";
import { accountUrl } from "@/lib/shopify";

export const metadata: Metadata = { title: "My Account" };

const ERRORS: Record<string, string> = {
  signin: "We couldn't sign you in. Please try again.",
  expired: "Your session has ended. Please sign in again.",
};

const STATUS_LABELS: Record<string, string> = {
  PAID: "Paid",
  PENDING: "Payment pending",
  AUTHORIZED: "Authorised",
  PARTIALLY_PAID: "Partially paid",
  REFUNDED: "Refunded",
  PARTIALLY_REFUNDED: "Partially refunded",
  VOIDED: "Cancelled",
};

const dateFormat = new Intl.DateTimeFormat("en-AE", { day: "numeric", month: "long", year: "numeric" });

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!isCustomerAccountConfigured) {
    return <SignIn message="Customer accounts are not set up yet." href={accountUrl ?? "/"} />;
  }

  const session = await getSession();
  if (!session) return <SignIn message={error ? ERRORS[error] : undefined} />;
  if (session.expired) redirect("/account/refresh");

  const customer = await fetchCustomer(session.accessToken);
  if (!customer) return <SignIn message={ERRORS.expired} />;

  const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ");
  const email = customer.emailAddress?.emailAddress;
  const orders = customer.orders.nodes;
  const addresses = [...customer.addresses.nodes].sort(
    (a, b) => Number(b.id === customer.defaultAddress?.id) - Number(a.id === customer.defaultAddress?.id),
  );

  return (
    <div className="bg-surface">
      <div className="page-container py-14 md:py-20">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/75">My Account</p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h1 className="text-[clamp(40px,5vw,68px)] leading-none">
            Hello{customer.firstName ? `, ${customer.firstName}` : ""}.
          </h1>
          <form action="/account/logout" method="post">
            <button className="text-[11px] font-medium uppercase tracking-[0.2em] underline-offset-4 hover:text-accent hover:underline">
              Sign out
            </button>
          </form>
        </div>

        <div className="mt-14 grid gap-14 md:grid-cols-[1fr_320px] md:gap-16">
          {/* Orders */}
          <section>
            <h2 className="border-b border-line pb-4 text-xl uppercase tracking-[0.15em]">Your Orders</h2>
            {orders.length === 0 ? (
              <div className="flex flex-col items-start gap-5 py-10">
                <p className="font-serif text-2xl text-muted">You haven&apos;t placed an order yet.</p>
                <ArrowLink href="/shop">Explore the menu</ArrowLink>
              </div>
            ) : (
              <ul className="divide-y divide-line">
                {orders.map((order) => (
                  <li key={order.id} className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-serif text-2xl">Order {order.name}</p>
                      <p className="mt-1 text-sm text-muted">
                        {dateFormat.format(new Date(order.processedAt))}
                        {order.financialStatus && ` · ${STATUS_LABELS[order.financialStatus] ?? order.financialStatus}`}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {order.lineItems.nodes.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 bg-sand/70 py-1 pl-1 pr-3 text-xs">
                            <span className="relative size-8 shrink-0 overflow-hidden bg-sand">
                              {item.image && (
                                <Image src={item.image.url} alt="" fill sizes="32px" className="object-cover" />
                              )}
                            </span>
                            {item.quantity} × {item.title}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 md:flex-col md:items-end md:gap-3">
                      <span className="tracking-[0.1em]">
                        {formatPrice(order.totalPrice.amount, order.totalPrice.currencyCode)}
                      </span>
                      <a
                        href={order.statusPageUrl}
                        className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] hover:text-accent"
                      >
                        View order <ArrowRight className="size-3.5" strokeWidth={1.5} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Details + addresses */}
          <aside className="space-y-12">
            <section>
              <h2 className="border-b border-line pb-4 text-xl uppercase tracking-[0.15em]">Details</h2>
              <dl className="mt-5 space-y-3 text-sm">
                {name && (
                  <div>
                    <dt className="text-muted">Name</dt>
                    <dd>{name}</dd>
                  </div>
                )}
                {email && (
                  <div>
                    <dt className="text-muted">Email</dt>
                    <dd className="break-all">{email}</dd>
                  </div>
                )}
              </dl>
            </section>

            <section>
              <h2 className="border-b border-line pb-4 text-xl uppercase tracking-[0.15em]">Addresses</h2>
              {addresses.length === 0 ? (
                <p className="mt-5 text-sm text-muted">Addresses you use at checkout are saved here.</p>
              ) : (
                <ul className="mt-5 space-y-6 text-sm leading-relaxed">
                  {addresses.map((address) => (
                    <li key={address.id}>
                      {address.id === customer.defaultAddress?.id && (
                        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent">Default</p>
                      )}
                      {address.formatted.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SignIn({ message, href = "/account/login" }: { message?: string; href?: string }) {
  return (
    <div className="bg-surface">
      <div className="page-container flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-foreground/75">My Account</p>
        <h1 className="max-w-[12ch] text-[clamp(40px,5vw,68px)] leading-[1.05]">Welcome back.</h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-foreground/80">
          Sign in to see your orders and saved addresses. We&apos;ll email you a one-time code — no password needed.
        </p>
        {message && <p className="mt-6 text-sm text-red-700">{message}</p>}
        {/* Plain link: the sign-in route redirects to Shopify, so client-side navigation must not prefetch it. */}
        <a
          href={href}
          className="mt-10 inline-flex items-center gap-4 bg-cocoa px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-background transition-colors hover:bg-foreground/85"
        >
          Sign in <ArrowRight className="size-3.5" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  );
}
