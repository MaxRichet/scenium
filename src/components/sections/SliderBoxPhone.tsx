"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import CTAButton from "@/components/ui/CTAButton";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";
import { slidesData, type Slide } from "@/data/scenes";
import Card from "@/components/ui/Card";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { flushSync } from "react-dom";

function CardContent({ slide }: { slide: Slide }) {
  return (
    <>
      <div className="relative aspect-square w-full mb-4">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="rounded-[6px] object-cover"
        />
      </div>
      <Title as="h2" variant="display">{slide.title}</Title>
      <Text className="mb-[35px]">{slide.description}</Text>
    </>
  );
}

export default function SliderBoxPhone() {
  const isAnimating = useRef(false);

  const [activeIndex, setActiveIndex] = useState(1);
  const isSingle = !useBreakpoint(999);
  const total = slidesData.length;

  const getIndex = (offset: number) => (activeIndex + offset + total) % total;

  const leftSlide = slidesData[getIndex(0)];
  const rightSlide = slidesData[getIndex(1)];
  const nextSlide = slidesData[getIndex(isSingle ? 1 : 2)];

  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const nextCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isSingle]);


  return (
    <section className="mt-[60px]">
      <Title as="h1" className="mb-4">Nos scènes</Title>

      <div className="relative overflow-hidden">
        <div ref={containerRef} className="flex relative" style={{ gap: isSingle ? "0px" : "26px" }}>

          {/* LEFT CARD */}
          <Card
            ref={leftCardRef}
            className="shrink-0 p-[17px]"
            style={{ width: isSingle ? "100%" : "calc(50% - 13px)" }}
          >
            <CardContent slide={leftSlide} />
          </Card>

          {/* RIGHT CARD (Hidden on mobile < 1000px) */}
          {!isSingle && (
            <Card
              ref={rightCardRef}
              className="shrink-0 p-[17px]"
              style={{ width: "calc(50% - 13px)" }}
            >
              <CardContent slide={rightSlide} />
            </Card>
          )}

          {/* NEXT CARD (Hidden off-screen) */}
          <Card
            ref={nextCardRef}
            className="shrink-0 absolute top-0 p-[17px]"
            style={{
              width: isSingle ? "100%" : "calc(50% - 13px)",
              left: "100%",
              marginLeft: isSingle ? "0px" : "26px"
            }}
          >
            <CardContent slide={nextSlide} />
          </Card>

        </div>
      </div>

      <div className="mt-[26px]">
        <Card className="z-10 py-[10px] px-[20px]">
          <Text>
            Marquez les esprits <span className="font-semibold">sans effort !</span> Découvrez nos scènes événementielles mobiles : un design unique, un impact garanti pour <span className="font-semibold">des mariages, anniversaires et soirées inoubliables.</span>
          </Text>
          <Text>Design unique, impact garanti.</Text>
          <div className="flex justify-end z-10 relative mb-[8px]">
            <CTAButton href="/scenes" label="Découvrir nos scènes" />
          </div>
        </Card>
      </div>
    </section>
  );
}
