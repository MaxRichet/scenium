"use client";

import React, { useRef, useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import gsap from "gsap";
import { useElementSize } from "@/hooks/useElementSize";
import CTAButton from "@/components/ui/CTAButton";
import ProgressBar from "@/components/ui/ProgressBar";
import { processData } from "@/data/process";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";
import { flushSync } from "react-dom";

export default function CommandPhone() {
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

    const contentRef = useRef<HTMLDivElement>(null);

    const [currentStep, setCurrentStep] = useState(0);

    const finalWidth = width - (((width / 3) / 2) * 2) + (20 * 2);

    useEffect(() => {
        if (!dot1.current || !dot2.current || !dot3.current) return
        if (!line1.current || !line2.current || !contentRef.current) return

        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 0,
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

        // Step 1
        tl.to(dot1.current, {
            scale: 1,
            duration: 0.4,
            transformOrigin: "50% 50%"
        })
        .to(img1.current, {
            opacity: 1,
            duration: 0.3
        }, "<+=0.2")

        tl.to(line1.current, {
            scaleX: 1,
            duration: 3
        })

        // Transition to Step 2
        tl.to(contentRef.current, { opacity: 0, duration: 0.4 })
        .call(() => {
            flushSync(() => setCurrentStep(1));
        })
        .to(dot2.current, {
            scale: 1,
            duration: 0.4
        })
        .to(contentRef.current, { opacity: 1, duration: 0.3 })
        .to(img2.current, {
            opacity: 1,
            duration: 0.3
        }, "<+=0.2")

        tl.to(line2.current, {
            scaleX: 1,
            duration: 3
        })

        // Transition to Step 3
        tl.to(contentRef.current, { opacity: 0, duration: 0.4 })
        .call(() => {
            flushSync(() => setCurrentStep(2));
        })
        .to(dot3.current, {
            scale: 1,
            duration: 0.4
        })
        .to(contentRef.current, { opacity: 1, duration: 0.3 })
        .to(img3.current, {
            opacity: 1,
            duration: 0.3
        }, "<+=0.2")

        // Final Wait before reset
        tl.to({}, { duration: 3 })

        // Reset preparation
        tl.to(contentRef.current, { opacity: 0, duration: 0.4 })
        .call(() => {
            flushSync(() => setCurrentStep(0));
        })
        .to(contentRef.current, { opacity: 1, duration: 0.3 })

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
            
            <div className="flex justify-center w-full">
                <Card variant="glow" className="w-full" >
                    <div ref={contentRef}>
                        <Title as="h2" className='pb-[10px]'>{processData[currentStep].title}</Title>
                        <Text lineHeight>{processData[currentStep].text}</Text>
                    </div>

                    <div className="flex justify-end z-10 relative w-full pt-[20px] mb-[9px]">
                        <CTAButton href="/scenes" label="Découvrir nos scènes" />
                    </div>
                </Card>
            </div>
        </div>
    </section>
  );
}