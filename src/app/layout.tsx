import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import type { Metadata } from 'next';

import ServiceWorkerRegistrar from './ServiceWorkerRegistrar';

import './globals.css';
import { univers, ivymode } from './fonts';

export const metadata: Metadata = {
  manifest: '/manifest.ts',
  themeColor: '#FAF8F4',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${univers.variable} ${ivymode.variable} scroll-smooth`}>
      <body className='font-sans overflow-x-hidden antialiased text-aag-black text-base bg-aag-beige'>
        <ServiceWorkerRegistrar />
        {children}
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
