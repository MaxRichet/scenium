'use client'

import React, { ReactNode, CSSProperties, forwardRef } from 'react';
import { useGlowBorder } from '@/animations/GlowBorder';

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const GlowDiv = forwardRef<HTMLDivElement, Props>(({ className, style, children }, ref) => {
  const innerRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  
  // Use the forwarded ref if provided, otherwise use internal ref
  const activeRef = (ref as React.RefObject<HTMLDivElement>) || innerRef;

  useGlowBorder(activeRef);

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
});

GlowDiv.displayName = 'GlowDiv';

export default GlowDiv;
