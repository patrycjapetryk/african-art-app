import type { ReactNode } from 'react';
import clsx from 'clsx';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: ReactNode;
};

export function Heading({ as: Comp = 'h1', size = 'lg', children, className }: HeadingProps) {
  return (
    <Comp
      className={clsx(
        'leading-tight md:leading-tight',
        size === 'xl' && 'font-serif font-light text-5xl md:text-7xl',
        size === 'lg' && 'font-serif font-normal text-4xl md:text-5xl',
        size === 'md' && 'text-3xl font-normal md:text-4xl',
        size === 'sm' && 'text-lg font-normal',
        size === 'xs' && 'text-sm font-normal md:text-xs uppercase',
        className,
      )}
    >
      {children}
    </Comp>
  );
}
