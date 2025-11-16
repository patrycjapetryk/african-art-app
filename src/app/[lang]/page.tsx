import { type Metadata } from 'next';

import { asText } from '@prismicio/client';
import { SliceZone } from '@prismicio/react';
import { createClient } from '@/prismicio';

import { components } from '@/slices';
import { getLocales } from '@/utils/getLocales';
import { LanguageSwitcher } from '@/ui/LanguageSwitcher';

type Params = Promise<{ uid: string; lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const client = createClient();
  // ⬇️ Note this line with the `lang` parameter being passed in
  const home = await client.getByUID('page', 'home', { lang: (await params).lang });

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || '',
        },
      ],
    },
  };
}

export default async function Home({ params }: { params: Params }) {
  const client = createClient();
  const home = await client.getByUID('page', 'home', {
    lang: (await params).lang,
  });
  const locales = await getLocales(home, client);

  // <SliceZone> renders the page's slices.
  return (
    <div>
      <LanguageSwitcher locales={locales} />
      <SliceZone slices={home.data.slices} components={components} />;
    </div>
  );
}
