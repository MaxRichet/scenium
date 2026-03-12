"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ButtonAnimation from "@/animations/ButtonAnimation";
import { flushSync } from "react-dom";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const slidesData: Slide[] = [
  {
    id: 1,
    title: "Fleur",
    description: "Créez votre jardin secret : réservez ce décor floral pour des photos inoubliables.",
    image: "/fleur.png",
  },
  {
    id: 2,
    title: "Nuage",
    description: "Une ambiance onirique et vaporeuse pour capturer des instants hors du temps.",
    image: "/nuage.png",
  },
  {
    id: 3,
    title: "Ballon",
    description: "Un moment magique entouré de reflets et de lumières, idéal pour un impact visuel.",
    image: "/ballon.png",
  },
];

export default function SliderBoxPhone() {
  const bgRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const isAnimating = useRef(false);

  const [activeIndex, setActiveIndex] = useState(1);
  const [isSingle, setIsSingle] = useState(false);
  const total = slidesData.length;

  const getIndex = (offset: number) => (activeIndex + offset + total) % total;

  const leftSlide = slidesData[getIndex(0)];
  const rightSlide = slidesData[getIndex(1)];
  const nextSlide = slidesData[getIndex(isSingle ? 1 : 2)];

  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const nextCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  ButtonAnimation(bgRef, btnRef);

  useEffect(() => {
    const handleResize = () => {
      setIsSingle(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slideNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const left = leftCardRef.current;
    const right = rightCardRef.current;
    const next = nextCardRef.current;

    if (!left || !next) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.9, ease: "power3.inOut" },
      onComplete: () => {
        flushSync(() => {
          setActiveIndex((i) => (i + 1) % total);
        });
        gsap.set([left, right, next], { clearProps: "transform" });
        isAnimating.current = false;
      },
    });

    const xMove = left.offsetWidth + (isSingle ? 0 : 26);

    tl.to(left, { x: -xMove }, 0);
    if (right && !isSingle) {
      tl.to(right, { x: -xMove }, 0);
    }
    tl.to(next, { x: -xMove }, 0);
  };

  useEffect(() => {
    const interval = setInterval(slideNext, 2000);
    return () => clearInterval(interval);
  }, [activeIndex, isSingle]);

  const cardStyle = { 
    background: 'var(--grey)', 
    border: '2px solid var(--border-grey)',
    borderRadius: '12px',
    padding: '17px',
  };

  const CardContent = ({ slide }: { slide: Slide }) => (
    <>
      <div className="relative aspect-square w-full mb-4">
        <Image 
          src={slide.image} 
          alt={slide.title} 
          fill
          className="rounded-[6px] object-cover" 
        />
      </div>
      <h2 style={{ fontSize: "var(--title-social)" }}>{slide.title}</h2>
      <p style={{ fontSize: "var(--txt-social)" }} className="mb-[35px]">{slide.description}</p>
    </>
  );

  return (
    <section className="mt-[60px] mb-[60px]">
      <h1 style={{ fontSize: "var(--h1-desk)" }} className="mb-4 max-xl:text-[90px]! max-md:text-[60px]! max-sm:text-[45px]!">Nos scènes</h1>
      
      <div className="relative overflow-hidden">
        <div ref={containerRef} className="flex relative" style={{ gap: isSingle ? "0px" : "26px" }}>
          
          {/* LEFT CARD */}
          <div 
            ref={leftCardRef}
            className="shrink-0"
            style={{ ...cardStyle, width: isSingle ? "100%" : "calc(50% - 13px)" }}
          >
            <CardContent slide={leftSlide} />
          </div>

          {/* RIGHT CARD (Hidden on mobile < 1000px) */}
          {!isSingle && (
            <div 
              ref={rightCardRef}
              className="shrink-0"
              style={{ ...cardStyle, width: "calc(50% - 13px)" }}
            >
              <CardContent slide={rightSlide} />
            </div>
          )}

          {/* NEXT CARD (Hidden off-screen) */}
          <div 
            ref={nextCardRef}
            className="shrink-0 absolute top-0"
            style={{ 
              ...cardStyle, 
              width: isSingle ? "100%" : "calc(50% - 13px)",
              left: "100%",
              marginLeft: isSingle ? "0px" : "26px"
            }}
          >
            <CardContent slide={nextSlide} />
          </div>

        </div>
      </div>

      <div className="mt-[26px]">
        <div style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="z-10 rounded-[12px] py-[10px] px-[20px]" >
          <p style={{ fontSize: "var(--txt-social)" }}>
            Marquez les esprits <span className="font-semibold">sans effort !</span> Découvrez nos scènes événementielles mobiles : un design unique, un impact garanti pour <span className="font-semibold">des mariages, anniversaires et soirées inoubliables.</span>
          </p>
          <p style={{ fontSize: "var(--txt-social)" }}>Design unique, impact garanti.</p>
          <div className="flex justify-end z-10 relative mb-[8px]">
            <Link
              href="/scenes"
              className="flex items-center relative h-[40px] cursor-pointer inline-flex"
              ref={btnRef}
            >
              <div
                className="absolute rounded-md w-[22px] h-full z-0 pointer-events-none"
                style={{
                  background: "var(--main-color-hexa)",
                  border: "1px solid var(--secondary-blue)",
                }}
                ref={bgRef}
              />
              <Image
                src="/arrowContactForm.svg"
                alt="Arrow Icon"
                width={15}
                height={15}
                className="rotate-[-90deg] ml-[4px] relative z-10"
              />
              <p className="relative z-10 ml-[10px] pr-[10px]" style={{ fontSize: 'var(--txt-social)' }}>
                Découvrir nos scènes
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
