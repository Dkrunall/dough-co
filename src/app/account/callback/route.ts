import { NextResponse, type NextRequest } from "next/server";
import { completeLogin } from "@/lib/customer-account";
import { siteOrigin } from "../site-origin";

export async function GET(req: NextRequest) {
  const origin = siteOrigin(req);
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  if (!code || !state) return NextResponse.redirect(`${origin}/account?error=signin`);

  try {
    await completeLogin(code, state, `${origin}/account/callback`, origin);
  } catch (err) {
    console.error("Customer sign-in failed:", err);
    return NextResponse.redirect(`${origin}/account?error=signin`);
  }
  return NextResponse.redirect(`${origin}/account`);
}
