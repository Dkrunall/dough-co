import { NextResponse, type NextRequest } from "next/server";
import { endSession } from "@/lib/customer-account";
import { siteOrigin } from "../site-origin";

// POST (from the Sign out button) so other sites can't sign customers out with a link.
export async function POST(req: NextRequest) {
  const origin = siteOrigin(req);
  return NextResponse.redirect(await endSession(`${origin}/account`), 303);
}
