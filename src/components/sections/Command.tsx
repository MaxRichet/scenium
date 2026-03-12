"use client";

import React, { useRef, useEffect } from "react";
import Card from "@/components/ui/Card";
import gsap from "gsap";
import { useElementSize } from "@/hooks/useElementSize";
import CTAButton from "@/components/ui/CTAButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { processData } from "@/data/process";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";

export default function Command() {
    const boxRef = useRef<HTMLDivElement>(null);
    const { width } = useElementSize(boxRef);
    const dot1 = useRef<HTMLSpanElement>(null)
    const dot2 = useRef<HTMLSpanElement>(null)
    const dot3 = useRef<HTMLSpanElement>(null)

    const line1 = useRef<HTMLDivElement>(null)
    const line2 = useRef<HTMLDivElement>(null)

    const img1 = useRef<HTMLImageElement>(null)
    const img2 = useRef<HTMLImageElement>(null)
    const img3 = useRef<HTMLImageElement>(null)

    const finalWidth = width - (((width / 3) / 2) * 2) + (20 * 2);

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
        "+=0.9"
    )

    }, [])

  return (
    <section className="mb-[60px]">
        <Title as="h1">Commander</Title>
        <div ref={boxRef} className="flex flex-col w-full">
            <ProgressBar
                dots={[dot1, dot2, dot3]}
                lines={[line1, line2]}
                imgs={[img1, img2, img3]}
                width={finalWidth}
            />
            <div className="flex items-stretch relative gap-[30px]">
                <Card variant="glow" className="flex-1" >
                    <Title as="h2" className='pb-[10px]'>{processData[0].title}</Title>
                    <Text lineHeight>{processData[0].text}</Text>
                    <div className="flex justify-end z-10 relative w-full pt-[20px] mb-[9px]">
                        <CTAButton href="/scenes" label="Découvrir nos scènes" />
                    </div>
                </Card>
                <Card variant="glow" className="flex-1" >
                    <Title as="h2" className='pb-[10px]'>{processData[1].title}</Title>
                    <Text lineHeight>{processData[1].text}</Text>
                </Card>
                <Card variant="glow" className="flex-1" >
                    <Title as="h2" className='pb-[10px]'>{processData[2].title}</Title>
                    <Text lineHeight>{processData[2].text}</Text>
                </Card>
            </div>
        </div>
    </section>
  );
}