import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import type { Metadata, Viewport } from 'next';

import ServiceWorkerRegistrar from './ServiceWorkerRegistrar';
import FullscreenController from '../ui/FullscreenController';

import './globals.css';
import { univers, ivymode } from './fonts';

export const metadata: Metadata = {
  manifest: '/manifest.ts',
};

export const viewport: Viewport = {
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
        <FullscreenController />
        <ServiceWorkerRegistrar />
        <main className='h-screen w-screen'>{children}</main>
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
