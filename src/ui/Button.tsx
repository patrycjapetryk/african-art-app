import { type ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'third';
  className?: string;
  children: ReactNode;
};

export function Button({ variant = 'primary', className, children }: ButtonProps) {
  return (
    <span
      className={clsx(
        'px-7 py-3 text-xs border uppercase font-normal transition',
        variant === 'primary' &&
          'border-aag-black bg-aag-black text-white hover:text-aag-black hover:bg-transparent',
        variant === 'secondary' &&
          'border-white bg-transparent text-white hover:text-aag-black hover:bg-white',
        variant === 'third' &&
          'border-aag-black bg-transparent text-aag-black hover:text-white hover:bg-aag-black',
        className,
      )}
    >
      {children}
    </span>
  );
}
