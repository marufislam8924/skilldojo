import { NextResponse } from "next/server";

const TRACKING_PARAMS = new Set([
  "gclid",
  "fbclid",
  "msclkid",
  "dclid",
  "yclid",
  "mc_cid",
  "mc_eid",
  "ref",
  "source",
]);

function shouldStripParam(param) {
  const key = param.toLowerCase();
  if (TRACKING_PARAMS.has(key)) return true;
  if (key.startsWith("utm_")) return true;
  return false;
}

export function middleware(request) {
  const { nextUrl } = request;
  const cleanUrl = nextUrl.clone();
  let changed = false;

  for (const key of nextUrl.searchParams.keys()) {
    if (shouldStripParam(key)) {
      cleanUrl.searchParams.delete(key);
      changed = true;
    }
  }

  if (changed) {
    return NextResponse.redirect(cleanUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
