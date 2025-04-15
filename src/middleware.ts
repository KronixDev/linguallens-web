import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18n/config';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    ({ code }) => !pathname.startsWith(`/${code}/`) && pathname !== `/${code}`
  );
  
  // If the pathname is missing a locale, redirect to the default locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
