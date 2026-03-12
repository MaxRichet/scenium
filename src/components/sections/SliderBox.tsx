"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import CTAButton from "@/components/ui/CTAButton";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";
import { slidesData } from "@/data/scenes";
import { flushSync } from "react-dom";

export default function SliderBox() {

    const isAnimating = useRef(false);

    const activeRef = useRef<HTMLDivElement>(null);
    const sliderLeftRef = useRef<HTMLDivElement>(null);
    const placeLeftRef = useRef<HTMLDivElement>(null);
    const sliderRightRef = useRef<HTMLDivElement>(null);
    const placeRightRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const leftRightContainerRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const total = slidesData.length;
    const needClone = total <= 3;

    const getIndex = (offset: number) => (activeIndex + offset + total) % total;

    const activeSlide = slidesData[getIndex(0)];
    const previewLeft = slidesData[getIndex(1)];
    const previewRight = slidesData[getIndex(2)];

    const slideNext = () => {
        if (isAnimating.current) return;
            isAnimating.current = true;

        const active = activeRef.current;
        const left = sliderLeftRef.current;
        const leftPlace = placeLeftRef.current;
        const right = sliderRightRef.current;
        const rightPlace = placeRightRef.current;
        const slider = sliderRef.current;
        const leftRightContainer = leftRightContainerRef.current;


        if (!active || !left || !right || !slider || !leftRightContainer || !leftPlace || !rightPlace) return;

        const activeBounds = active.getBoundingClientRect();
        const leftText = left.querySelector("p");

        let clone: HTMLDivElement | null = null;

        if (needClone) {
            clone = active.cloneNode(true) as HTMLDivElement;
            clone.removeAttribute("ref");

            const cloneText = clone.querySelector("p");
            const cloneImg = clone.querySelector("img");

            if (cloneText) {
                gsap.set(cloneText, { autoAlpha: 0, height: 0, overflow: "hidden" });
            }

            const mm = gsap.matchMedia();

            mm.add("(min-width: 1536px)", () => {
                gsap.set(cloneImg, { height: "80%" });
            });

            gsap.set(clone, {
                position: "absolute",
                top: 0,
                right: "-26px",
                width: right.offsetWidth,
                height: "100%",
                zIndex: 10,
                xPercent: 100,
                border: "2px solid var(--border-grey)",
                background: "var(--grey)",
                borderRadius: "12px",
                padding: "9px",
            });

            leftRightContainer.appendChild(clone);
        }

        const tl = gsap.timeline({
            defaults: { duration: 0.9, ease: "power3.inOut" },
            onComplete: () => {
                gsap.set(left, {
                    top: "auto",
                    left: "auto",
                    width: right.offsetWidth,
                    height: "100%",
                    zIndex: "auto",
                    padding: "9px",
                });
                gsap.set(left.querySelector("p"), { opacity: 0 });
                tl.to(left.querySelector("img"), {
                    height: "80%",
                    ease: "power3.inOut"
                }, 0);
                if (clone) clone.remove();

                flushSync(() => {
                    setActiveIndex((i) => (i + 1) % total);
                });
                gsap.set([active, left, right], { clearProps: "transform" });
                isAnimating.current = false;
            },
        });

        tl.to(active, { xPercent: -active.offsetWidth }, 0);

        tl.to(left, { x: -active.offsetWidth - 26, width: activeBounds.width, height: activeBounds.height, padding: "17px" }, 0);
        tl.to(leftText, {opacity: 100}, 0.9,);
        tl.to(left.querySelector("img"), {
            height: "auto",
            ease: "power3.inOut"
        }, 0);

        tl.to(right, { x: -left.offsetWidth - 26 }, 0);

        if (clone) {
            tl.to(clone, { x: -right.offsetWidth - 26 }, 0);
        }
    }

    useEffect(() => {
        const interval = setInterval(slideNext, 2000);
        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex]);

  return (
    <section className="mb-[60px]">
        <Title as="h1">Nos scènes</Title>
            <div ref={sliderRef} className="relative flex gap-[26px] overflow-hidden">

                {/* ACTIVE */}
                <div ref={activeRef} style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="rounded-[12px] p-[17px] w-[57%]">
                    <Image src={activeSlide.image} alt={activeSlide.title} width={493} height={493} className="rounded-[6px] w-full" />
                    <Title as="h2" variant="display">{activeSlide.title}</Title>
                    <Text className="mb-[35px]">{activeSlide.description}</Text>
                </div>

                <div className="flex flex-col gap-[26px]">
                    <div ref={leftRightContainerRef} className="relative flex gap-[26px] h-full">

                        {/* LEFT */}
                        <div ref={placeLeftRef} className="relative w-[50%]">
                            <div ref={sliderLeftRef} style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="rounded-[12px] p-[9px] w-full absolute left-0 h-full">
                                <Image src={previewLeft.image} alt={previewLeft.title} width={493} height={493} className="rounded-[6px] w-full 2xl:h-[80%]" />
                                <Title as="h2" variant="display">{previewLeft.title}</Title>
                                <Text className="opacity-0">{previewLeft.description}</Text>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div ref={placeRightRef} className="relative w-[50%] h-full">
                            <div ref={sliderRightRef} style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="rounded-[12px] p-[9px] w-full absolute right-0 h-full">
                                <Image src={previewRight.image} alt={previewRight.title} width={493} height={493} className="rounded-[6px] w-full 2xl:h-[80%]" />
                                <Title as="h2" variant="display">{previewRight.title}</Title>
                                <Text className="hidden">{previewRight.description}</Text>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="z-10 rounded-[12px] py-[10px] px-[20px]" >
                        <Text>Marquez les esprits <span className="font-semibold">sans effort !</span> Découvrez nos scènes événementielles mobiles : un design unique, un impact garanti pour <span className="font-semibold">des mariages, anniversaires et soirées inoubliables.</span></Text>
                        <Text>Design unique, impact garanti.</Text>
                        <div className="flex justify-end z-10 relative mb-[8px]">
                          <CTAButton href="/scenes" label="Découvrir nos scènes" />
                        </div>
                    </div>
                </div>
            </div>
    </section>
  );
}
