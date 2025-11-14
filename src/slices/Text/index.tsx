import { FC } from 'react';
import type { Content } from '@prismicio/client';
import type { SliceComponentProps } from '@prismicio/react';
import clsx from 'clsx';

import { Bounded } from '@/ui/Bounded';
import { PrismicRichText } from '@/ui/PrismicRichText';

type TextProps = SliceComponentProps<Content.TextSlice>;

const Text: FC<TextProps> = ({ slice }) => {
  return (
    <Bounded as='section' className='leading-relaxed'>
      <div
        className={clsx(
          '[&>h3]:mb-3',
          slice.variation === 'oneColumnCentered' &&
            'text-justify [&>h2]:text-center [&>h3]:text-center max-w-[95%] md:max-w-[72%]',
          slice.variation === 'twoColumns' && 'md:columns-2 md:gap-40',
        )}
      >
        <PrismicRichText field={slice.primary.text} />
      </div>
    </Bounded>
  );
};

export default Text;
