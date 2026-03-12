import { useEffect, RefObject } from 'react';

export function useGlowBorder(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;
    
    const el = ref.current;
    if (!el) return;

    let frameId: number;

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        el.style.setProperty('--glow-x', `${x}%`);
        el.style.setProperty('--glow-y', `${y}%`);
        el.style.setProperty('--glow-intensity', '1');
      });
    };

    const handleLeave = () => {
      cancelAnimationFrame(frameId);
      el.style.setProperty('--glow-intensity', '0');
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref]);
}
