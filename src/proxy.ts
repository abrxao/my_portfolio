import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { cookieName, fallbackLng, locales } from "@/i18n/settings";

acceptLanguage.languages([...locales]);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|.*\\..*|favicon.ico).*)",
  ],
};

function resolveLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(cookieName)?.value;
  if (cookieLocale) {
    const detected = acceptLanguage.get(cookieLocale);
    if (detected) return detected;
  }

  const headerLocale = acceptLanguage.get(
    request.headers.get("Accept-Language")
  );
  return headerLocale ?? fallbackLng;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = resolveLocale(request);
  const redirectUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}`,
    request.url
  );
  return NextResponse.redirect(redirectUrl);
}
