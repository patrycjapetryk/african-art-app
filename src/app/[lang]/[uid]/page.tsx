import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { asText, filter } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';

import { createClient } from '@/prismicio';
import { components } from '@/slices';

type Params = Promise<{ uid: string; lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID('page', (await params).uid, { lang: (await params).lang })
    .catch(() => notFound());

  return {
    title: asText(page.data.title),
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || '',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();

  // ⬇️ Note this line using a '*' for the lang parameter
  const pages = await client.getAllByType('page', {
    predicates: [filter.not('my.page.uid', 'home')],
    lang: '*',
  });

  return pages.map((page) => ({ uid: page.uid, lang: page.lang }));
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID('page', (await params).uid, {
      lang: (await params).lang,
    })
    .catch(() => notFound());

  // <SliceZone> renders the page's slices.
  return <SliceZone slices={page.data.slices} components={components} />;
}
