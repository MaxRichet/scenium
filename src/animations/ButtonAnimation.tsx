'use client'

import { useEffect } from 'react'
import gsap from "gsap";

export default function ButtonAnimation(bgRef: React.RefObject<HTMLDivElement>, btnRef: React.RefObject<HTMLButtonElement>) {

  useEffect(() => {
    if (!btnRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      const enter = () => {
        gsap.to(bgRef.current, {
          width: 110,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      const leave = () => {
        gsap.to(bgRef.current, {
          width: 22,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      btnRef.current!.addEventListener("mouseenter", enter);
      btnRef.current!.addEventListener("mouseleave", leave);

      return () => {
        btnRef.current!.removeEventListener("mouseenter", enter);
        btnRef.current!.removeEventListener("mouseleave", leave);
      };
    }, btnRef);

    return () => ctx.revert();
  }, []);
}
