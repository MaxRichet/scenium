'use client'

import React, { ReactNode, CSSProperties, forwardRef, useRef } from 'react';
import { useGlowBorder } from '@/hooks/GlowBorder';

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const GlowDiv = forwardRef<HTMLDivElement, Props>(({ className, style, children }, forwardedRef) => {
  const innerRef = useRef<HTMLDivElement>(null);
  useGlowBorder(innerRef);

  return (
    <div
      ref={(node) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef !== null) {
          (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={`
        glow-border
        rounded-[10px]
        flex flex-col items-center
        text-white
        px-[20px]
        py-[10px]
        ${className}`}
      style={{
        ['--glow-color' as string]: '19, 149, 234',
        background: 'var(--grey)',
        ...style
      }}
    >
      {children}
    </div>
  );
});

GlowDiv.displayName = 'GlowDiv';

export default GlowDiv;
