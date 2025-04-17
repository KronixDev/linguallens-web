import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

export function middleware(request: NextRequest) {
  // Récupérer le chemin demandé
  const pathname = request.nextUrl.pathname
  
  // Vérifier si le chemin a déjà un code de langue valide
  const pathnameHasValidLocale = locales.some(
    locale => pathname.startsWith(`/${locale.code}/`) || pathname === `/${locale.code}`
  )

  // Si le chemin n'a pas de locale, rediriger vers le chemin avec locale par défaut
  if (!pathnameHasValidLocale) {
    // Construire la nouvelle URL avec le locale par défaut
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
    
    // Préserver les paramètres de recherche lors de la redirection
    newUrl.search = request.nextUrl.search
    
    // Retourner une réponse de redirection permanente
    return NextResponse.redirect(newUrl)
  }
  
  return NextResponse.next()
}

// Définir les chemins qui doivent déclencher le middleware
export const config = {
  // Matcher tous les chemins sauf ceux commençant par /api, /_next, etc.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.png$).*)']
}
