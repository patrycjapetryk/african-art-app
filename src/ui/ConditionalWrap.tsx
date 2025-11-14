import type { ElementType, ReactNode } from 'react';

type ConditionalWrapProps = {
  condition: boolean;
  wrap: ElementType;
  children: ReactNode;
};

export function ConditionalWrap({ condition, wrap: Wrap, children }: ConditionalWrapProps) {
  return condition ? <Wrap>{children}</Wrap> : children;
}
