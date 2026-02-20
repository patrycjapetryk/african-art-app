import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/prismicio';

export async function middleware(request: NextRequest) {
  const client = createClient();
  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);
  const defaultLocale = locales[0];

  const { pathname } = request.nextUrl;

  // 🔹 Ignoruj assety i manifest
  if (
    pathname.startsWith('/_next') || // statyczne pliki Next
    pathname.startsWith('/static') || // inne statyczne pliki
    pathname === '/favicon.ico' || // favicon
    pathname === '/manifest.webmanifest' // manifest
  ) {
    return NextResponse.next();
  }

  // 🔹 Sprawdź czy URL już ma locale
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  // 🔹 Jeśli brak prefiksu, redirect do domyślnego języka
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

// 🔹 Matcher – middleware działa na wszystkich stronach poza assetami i API
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
