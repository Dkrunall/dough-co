import { NextResponse, type NextRequest } from "next/server";
import { beginLogin, isCustomerAccountConfigured } from "@/lib/customer-account";
import { siteOrigin } from "../site-origin";

export async function GET(req: NextRequest) {
  const origin = siteOrigin(req);
  if (!isCustomerAccountConfigured) return NextResponse.redirect(`${origin}/account`);
  return NextResponse.redirect(await beginLogin(`${origin}/account/callback`));
}
