import { NextResponse, type NextRequest } from "next/server";
import { refreshSession } from "@/lib/customer-account";
import { siteOrigin } from "../site-origin";

/** The account page sends expired sessions here; cookies can only be updated in a route handler. */
export async function GET(req: NextRequest) {
  const origin = siteOrigin(req);
  const ok = await refreshSession(origin);
  return NextResponse.redirect(`${origin}/account${ok ? "" : "?error=expired"}`);
}
