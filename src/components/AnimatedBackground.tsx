// AnimatedBackground.tsx — tout le cerveau est ici
'use client'

import { useEffect, useRef, useState } from 'react';
import MetaBalls from '@/components/MetaBalls';

type AnimatedBackgroundProps = {
  baseBallCount?: number;
  baseBlurPx?: number;
  fadeTo?: string;
  fadeHeightPx?: number;
  fadeDirection?: 'top' | 'bottom';
};

const REFERENCE_WIDTH = 1200;

export default function AnimatedBackground({
  baseBallCount = 12,
  baseBlurPx = 70,
  fadeTo = '#151515',
  fadeHeightPx = 120,
  fadeDirection = 'bottom',
}: AnimatedBackgroundProps) {

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [ballCount, setBallCount] = useState(baseBallCount);
  const [blurPx,    setBlurPx]    = useState(baseBlurPx);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    function compute(width: number) {
      const ratio = Math.min(1, Math.max(0.2, width / REFERENCE_WIDTH));
      setBallCount(Math.max(2, Math.round(baseBallCount * ratio)));
      setBlurPx(Math.round(baseBlurPx * Math.max(0.3, ratio)));
    }

    compute(wrapper.clientWidth);

    const ro = new ResizeObserver(entries => {
      const width = entries[0]?.contentRect.width;
      if (width) compute(width);
    });

    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [baseBallCount, baseBlurPx]);
  const fadeStyle =
    fadeDirection === 'bottom'
      ? {
          bottom: 0,
          background: `linear-gradient(to top, ${fadeTo}, transparent)`,
        }
      : {
          top: 0,
          background: `linear-gradient(to bottom, ${fadeTo}, transparent)`,
        };

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
    >
      <MetaBalls
        color="#1495EA"
        animationSize={23}
        enableTransparency={true}
        speed={0.3}
        ballCount={ballCount}
        blurMarginPx={blurPx}
      />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ backdropFilter: `blur(${blurPx}px)` }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 z-20"
        style={{ height: `${fadeHeightPx}px`, ...fadeStyle }}
      />
    </div>
  );
}
