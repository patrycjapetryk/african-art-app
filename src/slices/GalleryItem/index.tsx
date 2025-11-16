'use client';

import { FC } from 'react';
import { Content, isFilled } from '@prismicio/client';
import { PrismicText, SliceComponentProps } from '@prismicio/react';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { Bounded } from '@/ui/Bounded';
import { Heading } from '@/ui/Heading';
import { PrismicRichText } from '@/ui/PrismicRichText';

export type GalleryItemProps = SliceComponentProps<Content.GalleryItemSlice>;

const GalleryItem: FC<GalleryItemProps> = ({ slice }) => {
  const { image, heading, description, text } = slice.primary;

  const pathname = usePathname();
  const currentLang = pathname?.split('/')[1] || 'pl';
  const homeHref = `/${currentLang}`;

  return (
    <Bounded as='section'>
      <PrismicNextLink href={homeHref} className='fixed right-6 top-6' aria-label='Close'>
        <Image src='/images/close.svg' alt='Close icon' width={22} height={22} priority />
      </PrismicNextLink>

      <div className='flex flex-col gap-8 w-full items-center justify-center max-w-4xl'>
        {isFilled.richText(heading) && (
          <Heading size='xl' className='text-center italic mt-4'>
            <PrismicText field={heading} />
          </Heading>
        )}

        <div className='w-full flex items-end gap-5'>
          <div className='w-36'>
            <PrismicNextImage field={image} sizes='100vw' className='w-full' alt='' />
          </div>
          {isFilled.richText(description) && (
            <div className='-mt-4 text-xs uppercase'>
              <PrismicRichText field={description} />
            </div>
          )}
        </div>

        <div className='w-full'>
          <PrismicRichText field={text} />
        </div>
      </div>
    </Bounded>
  );
};

export default GalleryItem;
