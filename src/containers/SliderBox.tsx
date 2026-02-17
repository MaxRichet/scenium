"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ButtonAnimation from "@/animations/ButtonAnimation";

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
    description:
      "Créez votre jardin secret : réservez ce décor floral pour des photos d’une beauté et d’une magie inoubliables.",
    image: "/fleur.png",
  },
  {
    id: 2,
    title: "Nuage",
    description:
      "Une ambiance onirique et vaporeuse pour capturer des instants hors du temps.",
    image: "/nuage.png",
  },
  {
    id: 3,
    title: "Ballon",
    description:
      "Un moment magique entouré de reflets et de lumières, idéal pour un impact visuel.",
    image: "/ballon.png",
  },
];

export default function SliderBox() {

    const bgRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const btnRef = React.useRef<HTMLAnchorElement>(null) as React.RefObject<HTMLAnchorElement>;

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

    ButtonAnimation(bgRef, btnRef);

    const slideNext = () => {
        if (isAnimating.current) return;
            isAnimating.current = true;

        const active = activeRef.current;
        const left = sliderLeftRef.current;
        const right = sliderRightRef.current;
        const slider = sliderRef.current;
        const leftRightContainer = leftRightContainerRef.current;

        
        if (!active || !left || !right || !slider || !leftRightContainer) return;
        
        const activeBounds = active.getBoundingClientRect();
        const leftText = left.querySelector("p");

        let clone: HTMLDivElement | null = null;

        if (needClone) {
            clone = active.cloneNode(true) as HTMLDivElement;

            clone.removeAttribute("ref");

            const cloneText = clone.querySelector("p");

            if (cloneText) {
                gsap.set(cloneText, {
                    autoAlpha: 0,
                    height: 0,
                    overflow: "hidden",
                });
            }

            gsap.set(clone, {
                position: "absolute",
                top: 0,
                right: "-26px",
                width: right.offsetWidth,
                zIndex: 10,
                xPercent: 100,
                border: "2px solid var(--border-grey)",
                background: "var(--grey)",
                borderRadius: "12px",
                padding: "9px",
                height: "100%",
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
                    height: right.offsetHeight,
                    zIndex: "auto",
                    padding: "9px",
                });
                gsap.set(left.querySelector("p"), {
                    opacity: 0
                });
                
                setActiveIndex((i) => (i + 1) % total);

                if (clone) clone.remove();

                gsap.set([active, left, right], { clearProps: "transform" });

                isAnimating.current = false;
            },
        });

        tl.to(active, { xPercent: -active.offsetWidth }, 0);
        
        tl.to(left, { x: -active.offsetWidth - 26, width: activeBounds.width, height: activeBounds.height, padding: "17px" }, 0);
        tl.to(leftText, {opacity: 100}, 0.9,);

        tl.to(right, { x: -left.offsetWidth - 26 }, 0);

        if (clone) {
            tl.to(clone, { x: -right.offsetWidth - 26 }, 0);
        }
    }

    useEffect(() => {
        const interval = setInterval(slideNext, 2000);
        return () => clearInterval(interval);
    }, [activeIndex]);

  return (
    <section>
        <h1 style={{ fontSize: "var(--h1-desk)" }}>Nos scènes</h1>
            <div ref={sliderRef} className="relative flex gap-[26px] overflow-hidden">
                
                {/* ACTIVE */}
                <div ref={activeRef} style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="rounded-[12px] p-[17px] w-[57%]">
                    <Image src={activeSlide.image} alt={activeSlide.title} width={493} height={493} className="rounded-[6px] w-full" />
                    <h2 style={{ fontSize: "var(--title-social)" }}>{activeSlide.title}</h2>
                    <p style={{ fontSize: "var(--txt-social)" }} className="mb-[35px]">{activeSlide.description}</p>
                </div>
                
                <div className="flex flex-col gap-[26px]">
                    <div ref={leftRightContainerRef} className="relative flex gap-[26px] h-full">

                        {/* LEFT */}
                        <div ref={placeLeftRef} className="relative w-[50%]">
                            <div ref={sliderLeftRef} style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="rounded-[12px] p-[9px] w-full absolute left-0 h-full">
                                <Image src={previewLeft.image} alt={previewLeft.title} width={493} height={493} className="rounded-[6px] w-full" />
                                <h2 style={{ fontSize: "var(--title-social)" }}>{previewLeft.title}</h2>
                                <p style={{ fontSize: "var(--txt-social)" }} className="opacity-0">{previewLeft.description}</p>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div ref={placeRightRef} className="relative w-[50%] h-full">
                            <div ref={sliderRightRef} style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="rounded-[12px] p-[9px] w-full absolute right-0 h-full">
                                <Image src={previewRight.image} alt={previewRight.title} width={493} height={493} className="rounded-[6px] w-full" />
                                <h2 style={{ fontSize: "var(--title-social)" }}>{previewRight.title}</h2>
                                <p style={{ fontSize: "var(--txt-social)" }} className="hidden">{previewRight.description}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ background: 'var(--grey)', border: '2px solid var(--border-grey)' }} className="z-10 rounded-[12px] py-[10px] px-[20px]" >
                        <p style={{ fontSize: "var(--txt-social)" }}>Marquez les esprits <span className="font-semibold">sans effort !</span> Découvrez nos scènes événementielles mobiles : un design unique, un impact garanti pour <span className="font-semibold">des mariages, anniversaires et soirées inoubliables.</span></p>
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
            </div>
    </section>
  );
}