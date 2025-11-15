import { FC } from 'react';
import { type Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicNextLink, PrismicNextImage } from '@prismicio/next';

import { Bounded } from '@/ui/Bounded';
import { ConditionalWrap } from '@/ui/ConditionalWrap';

type GalleryItemProps = {
  news: Content.GallerySliceDefaultPrimaryGalleryItemItem;
};

const GalleryCard: FC<GalleryItemProps> = ({ news }) => {
  const { image, link } = news;

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
    </li>
  );
};

export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

const Gallery: FC<GalleryProps> = ({ slice }) => {
  const { galleryItem } = slice.primary;

  return (
    <Bounded as='section'>
      <div className='grid gap-10 w-full'>
        <ul className='grid grid-cols-6 items-start gap-3'>
          {galleryItem.map((item) => (
            <GalleryCard key={item.image.url} news={item} />
          ))}
        </ul>
      </div>
    </Bounded>
  );
};

export default Gallery;
