'use client';

import { PrismicNextLink } from '@prismicio/next';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  locales: {
    lang: string;
    lang_name: string;
    url: string;
  }[];
}

const localeLabels = {
  'en-us': 'ENGLISH',
  pl: 'POLSKI',
};

export const LanguageSwitcher = ({ locales }: LanguageSwitcherProps) => {
  const pathname = usePathname();

  const currentLang = locales.find((locale) => pathname.startsWith(`/${locale.lang}`))?.lang;

  return (
    <ul className='w-full flex justify-end gap-3 px-4 md:px-9 translate-y-2'>
      {locales
        .filter((locale) => locale.lang !== currentLang) // tylko inny język
        .map((locale) => (
          <li key={locale.lang} className=''>
            <PrismicNextLink
              href={locale.url}
              aria-label={`Change language to ${locale.lang_name}`}
            >
              {localeLabels[locale.lang as keyof typeof localeLabels] || locale.lang}
            </PrismicNextLink>
          </li>
        ))}
    </ul>
  );
};
