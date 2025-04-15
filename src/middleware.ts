import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales } from './i18n/config';

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  
  // Ne pas rediriger la page d'accueil
  if (pathname === '/' || pathname === '') {
    return NextResponse.next();
  }
  
  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    ({ code }) => !pathname.startsWith(`/${code}/`) && pathname !== `/${code}`
  );
  
  // Si c'est une page qui nécessite l'internationalisation et qu'il manque la locale
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
  // Matcher excluding /_next/, /api/, and specifically including paths that need i18n
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/terms', '/privacy']
};
