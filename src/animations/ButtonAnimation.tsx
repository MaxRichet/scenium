'use client'

import { useEffect } from 'react'
import gsap from "gsap";

export default function ButtonAnimation(
  bgRef: React.RefObject<HTMLDivElement>,
  btnRef: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    const btn = btnRef.current;
    const bg = bgRef.current;

    if (!btn || !bg) return;

    const enter = () => {
      gsap.to(bg, {
        width: "100%",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(bg, {
        width: 22,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);

    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);
}
