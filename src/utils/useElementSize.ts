import { useEffect, useState, RefObject } from "react";

type Size = {
  width: number;
  height: number;
};

export function useElementSize(ref: RefObject<HTMLElement>) {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}
