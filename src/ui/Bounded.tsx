import type { ReactNode } from 'react';
import clsx from 'clsx';

type BoundedProps = {
  as?: 'div' | 'section' | 'header' | 'footer';
  yPadding?: '0' | 'sm' | 'base' | 'lg' | 'xl';
  collapsible?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Bounded({
  as: Comp = 'div',
  yPadding = 'base',
  collapsible = true,
  className,
  children,
}: BoundedProps) {
  return (
    <Comp
      data-collapsible={collapsible}
      className={clsx(
        yPadding === '0' && 'py-0',
        yPadding === 'sm' && 'py-6 md:py-8',
        yPadding === 'base' && 'py-8 md:py-9',
        yPadding === 'lg' && 'py-10 md:py-16',
        yPadding === 'xl' && 'py-32 md:py-48',
        className,
      )}
    >
      <div className='flex flex-col items-center w-full px-4 md:px-[7.5%]'>{children}</div>
    </Comp>
  );
}
