"use client";

import React, { useRef, useState, useEffect, act, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GlowDiv from "@/components/GlowDiv";
import gsap from "gsap";
import { useElementSize } from "@/utils/useElementSize";
import ButtonAnimation from '@/animations/ButtonAnimation';

type Data = {
  id: number;
  title: string;
  text: string;
};

const data: Data[] = [
  {
    id: 1,
    title: "Contacte",
    text:
      "Tout commence par un simple formulaire. Vous y partagez l’histoire de votre événement : où il aura lieu, quand, et l’univers que vous souhaitez créer. C’est là que votre scène prend vie pour la première fois.",
  },
  {
    id: 2,
    title: "Échange",
    text:
      "En moins de 24h, notre équipe revient vers vous pour affiner cette vision. On discute de tous les détails importants… Ensemble, on construit une expérience fidèle à l’émotion que vous voulez offrir à vos invités.",
  },
  {
    id: 3,
    title: "Profite",
    text:
      "Puis vient enfin le grand jour. Nous livrons et installons la box pendant que vous vous concentrez sur l’essentiel : vivre votre moment. Quand tout est prêt, il ne reste qu’à capturer des souvenirs qui resteront longtemps.",
  },
];

export default function Command() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const { width } = useElementSize(boxRef);
    const dot1 = useRef<HTMLSpanElement>(null)
    const dot2 = useRef<HTMLSpanElement>(null)
    const dot3 = useRef<HTMLSpanElement>(null)

    const line1 = useRef<HTMLDivElement>(null)
    const line2 = useRef<HTMLDivElement>(null)

    const img1 = useRef<HTMLImageElement>(null)
    const img2 = useRef<HTMLImageElement>(null)
    const img3 = useRef<HTMLImageElement>(null)

    const bgRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const btnRef = React.useRef<HTMLAnchorElement>(null) as React.RefObject<HTMLAnchorElement>;

    const finalWidth = width - (((width / 3) / 2) * 2) + (20 * 2);

    const style = { background: 'var(--nav-active)' };

    useEffect(() => {
    if (!dot1.current || !dot2.current || !dot3.current) return
    if (!line1.current || !line2.current) return

    const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.6,
        defaults: { ease: "power2.out" }
    })

    tl.set([dot1.current, dot2.current, dot3.current], {
        scale: 0,
    })

    tl.set([line1.current, line2.current], {
        scaleX: 0,
    })

    tl.set([img1.current, img2.current, img3.current], {
        opacity: 0
    })

    tl.to(dot1.current, {
        scale: 1,
        duration: 0.6,
        transformOrigin: "50% 50%"
    })
    .to(img1.current, {
        opacity: 1,
        duration: 0.3
    }, "<+=0.2")

    tl.to(line1.current, {
        scaleX: 1,
        duration: 0.9
    })

    tl.to(dot2.current, {
        scale: 1,
        duration: 0.6
    })
    .to(img2.current, {
        opacity: 1,
        duration: 0.3
    }, "<+=0.2")

    tl.to(line2.current, {
        scaleX: 1,
        duration: 0.9
    })

    tl.to(dot3.current, {
        scale: 1,
        duration: 0.6
    })
    .to(img3.current, {
        opacity: 1,
        duration: 0.3
    }, "<+=0.2")

    tl.to(
        [dot1.current, dot2.current, dot3.current, line1.current, line2.current],
        {
        duration: 0.4
        },
        "+=0.3"
    )

    }, [])

    ButtonAnimation(bgRef, btnRef);

  return (
    <section>
        <h1 style={{ fontSize: "var(--h1-desk)" }}>Commander</h1>
        <div ref={boxRef} className="flex flex-col w-full">
            <div
            ref={lineRef}
            className={`relative flex items-center h-7 left-1/2 transform -translate-x-1/2 mb-[40px]`}
            style={{ pointerEvents: 'none', width: finalWidth }}
            >
                <span 
                className="relative w-8 h-7 rounded-full overflow-hidden"
                style={style}
                >
                    <span
                        ref={dot1}
                        className="absolute inset-0 rounded-full scale-0"
                        style={{ background: 'var(--main-color-hexa)' }}
                    >
                        <Image
                            ref={img1}
                            src="/coche.svg"
                            alt="coche"
                            width={14}
                            height={14}
                            className="opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </span>
                </span>
                <div 
                className="relative h-[3px] w-[50%] rounded-full mx-[10px] overflow-hidden"
                style={style}
                >
                    <div
                        ref={line1}
                        className="absolute left-0 top-0 h-full w-full scale-x-0 origin-left"
                        style={{ background: 'var(--main-color-hexa)' }}
                    />
                </div>
                <span 
                className="relative w-8 h-7 rounded-full overflow-hidden"
                style={style}
                >
                    <span
                        ref={dot2}
                        className="absolute inset-0 rounded-full scale-0"
                        style={{ background: 'var(--main-color-hexa)' }}
                    >
                        <Image
                            ref={img2}
                            src="/coche.svg"
                            alt="coche"
                            width={14}
                            height={14}
                            className="opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </span>
                </span>
                <div 
                className="relative h-[3px] w-[50%] rounded-full mx-[10px] overflow-hidden"
                style={style}
                >
                    <div
                        ref={line2}
                        className="absolute left-0 top-0 h-full w-full scale-x-0 origin-left"
                        style={{ background: 'var(--main-color-hexa)' }}
                    />
                </div>
                <span 
                className="relative w-8 h-7 rounded-full overflow-hidden"
                style={style}
                >
                    <span
                        ref={dot3}
                        className="absolute inset-0 rounded-full scale-0"
                        style={{ background: 'var(--main-color-hexa)' }}
                    >
                        <Image
                            ref={img3}
                            src="/coche.svg"
                            alt="coche"
                            width={14}
                            height={14}
                            className="opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                    </span>
                </span>
            </div>
            <div ref={containerRef} className="flex items-stretch relative gap-[30px]">
                <GlowDiv className="flex-1" >
                    <h2 style={{ fontSize: 'var(--h2-mob)' }} className='pb-[10px]' >{data[0].title}</h2>
                        <p style={{ fontSize: 'var(--txt-social)', lineHeight: 'var(--line-height)' }} >{data[0].text}</p>

                            <div className="flex justify-end z-10 relative w-full pt-[20px] mb-[9px]">
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
                </GlowDiv>
                <GlowDiv className="flex-1" >
                    <h2 style={{ fontSize: 'var(--h2-mob)' }} className='pb-[10px]' >{data[1].title}</h2>
                    <p style={{ fontSize: 'var(--txt-social)', lineHeight: 'var(--line-height)' }} >{data[1].text}</p>
                </GlowDiv>
                <GlowDiv className="flex-1" >
                    <h2 style={{ fontSize: 'var(--h2-mob)' }} className='pb-[10px]' >{data[2].title}</h2>
                    <p style={{ fontSize: 'var(--txt-social)', lineHeight: 'var(--line-height)' }} >{data[2].text}</p>
                </GlowDiv>
            </div>
        </div>
    </section>
  );
}