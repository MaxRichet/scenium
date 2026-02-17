'use client'

import React, { ReactNode, CSSProperties } from 'react';
import { useGlowBorder } from '@/animations/GlowBorder';

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export default function GlowDiv({ className, style, children }: Props) {
  const ref = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useGlowBorder(ref);

  return (
    <div
      ref={ref}
      className={`
        glow-border
        rounded-[10px]
        flex flex-col items-center
        text-white
        px-[20px]
        py-[10px]
        ${className}`}
      style={{
        ['--glow-color' as any]: '19, 149, 234',
        background: 'var(--grey)',
        ...style
      }}
    >
      {children}
    </div>
  );
}
