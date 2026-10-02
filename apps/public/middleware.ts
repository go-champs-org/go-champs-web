import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { legacyLocaleRedirect } from './src/i18n/legacyLocaleRedirect';
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE
} from './src/i18n/localeCookie';
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const redirectToCleanUrl = (
  request: NextRequest,
  { locale, location }: { locale: string; location: string }
) => {
  const response = NextResponse.redirect(new URL(location, request.url), 301);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax'
  });

  return response;
};

export default function middleware(request: NextRequest) {
  const legacy = legacyLocaleRedirect(
    request.nextUrl.pathname,
    request.nextUrl.search
  );

  return legacy ? redirectToCleanUrl(request, legacy) : intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
