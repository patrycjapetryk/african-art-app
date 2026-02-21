import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/prismicio';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🔹 1. Ignorujemy assety, API, pliki statyczne
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.webmanifest' ||
    pathname.match(/\.(.*)$/) // wszystkie pliki z rozszerzeniem (.png, .jpg, itd.)
  ) {
    return NextResponse.next();
  }

  const client = createClient();
  const repository = await client.getRepository();

  const locales = repository.languages.map((lang) => lang.id);
  const defaultLocale = locales[0];

  // 🔹 2. Sprawdzamy czy ścieżka już ma locale
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // 🔥 3. Jeśli brak locale → redirect z WYŁĄCZONYM cache
  if (!hasLocale) {
    const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url);

    const response = NextResponse.redirect(redirectUrl, 302);

    // 🚨 NAJWAŻNIEJSZE — wyłączamy cache redirectu
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');

    return response;
  }

  return NextResponse.next();
}

// 🔹 Middleware działa na wszystkich stronach oprócz API i assetów
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
