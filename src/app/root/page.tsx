// app/root/page.tsx
import { SliceZone } from '@prismicio/react';
import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { LanguageSwitcher } from '@/ui/LanguageSwitcher';
import { getLocales } from '@/utils/getLocales';

export default async function RootPage() {
  const client = createClient();
  const home = await client.getByUID('page', 'home', { lang: 'pl' });
  const locales = await getLocales(home, client);

  return (
    <div>
      <LanguageSwitcher locales={locales} />
      <SliceZone slices={home.data.slices} components={components} />
    </div>
  );
}
