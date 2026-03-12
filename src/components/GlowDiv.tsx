'use client'

import React, { ReactNode, CSSProperties, forwardRef, useRef, useImperativeHandle } from 'react';
import { useGlowBorder } from '@/animations/GlowBorder';

type Props = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

interface GlowCSSProperties extends CSSProperties {
  '--glow-color'?: string;
}

const GlowDiv = forwardRef<HTMLDivElement, Props>(({ className, style, children }, ref) => {
  const localRef = useRef<HTMLDivElement>(null);
  
  useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

  useGlowBorder(localRef);

  const combinedStyle: GlowCSSProperties = {
    '--glow-color': 'var(--main-color-rgb)',
    background: 'var(--grey)',
    ...style
  };

  return (
    <div
      ref={localRef}
      className={`
        glow-border
        rounded-[10px]
        flex flex-col items-center
        text-white
        px-[20px]
        py-[10px]
        ${className}`}
      style={combinedStyle}
    >
      <div className="relative z-[10] w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
});

GlowDiv.displayName = 'GlowDiv';

export default GlowDiv;