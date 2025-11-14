import { FC } from 'react';
import { type Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next';

import { Bounded } from '@/ui/Bounded';
import { Heading } from '@/ui/Heading';
import { ConditionalWrap } from '@/ui/ConditionalWrap';
import { Button } from '@/ui/Button';

type GalleryItemProps = {
  news: Content.GallerySliceDefaultPrimaryGalleryItemItem;
};

const GalleryCard: FC<GalleryItemProps> = ({ news }) => {
  const { image, title, text, link } = news;

  return (
    <li className='grid'>
      {isFilled.image(image) && (
        <ConditionalWrap
          condition={isFilled.link(link)}
          wrap={({ children }) => (
            <PrismicNextLink field={link} tabIndex={-1}>
              {children}
            </PrismicNextLink>
          )}
        >
          <PrismicNextImage field={image} sizes='100vw' className='w-full' alt='' />
        </ConditionalWrap>
      )}
      <Heading as='h3' size='xs' className='my-1'>
        {title}
      </Heading>
      <p className='text-sm'>{text || ''}</p>

      {isFilled.link(news.link) && (
        <PrismicNextLink field={link} className='text-xs uppercase'>
          {link.text || 'Zobacz'}
        </PrismicNextLink>
      )}
    </li>
  );
};

export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

const Gallery: FC<GalleryProps> = ({ slice }) => {
  const { galleryItem, link } = slice.primary;

  return (
    <Bounded as='section'>
      <div className='grid gap-10 w-full'>
        <ul className='grid grid-cols-2 items-start gap-y-8 gap-x-4 md:gap-4 md:grid-cols-4'>
          {galleryItem.map((item) => (
            <GalleryCard key={item.image.url} news={item} />
          ))}
        </ul>

        {isFilled.link(link) && (
          <div className='flex justify-center mt-4'>
            <PrismicNextLink field={link}>
              <Button>{link.text || 'Zobacz'}</Button>
            </PrismicNextLink>
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Gallery;
