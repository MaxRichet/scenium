'use client'

import Image from "next/image";
import ButtonAnimation from "@/animations/ButtonAnimation";
import React from 'react'
import ScrollCircle from "@/components/ScrollCircle";
import AnimatedBackground from "@/components/AnimatedBackground";
import Link from "next/link";
import SliderBox from "@/containers/SliderBox";
import Command from "@/containers/Command";
import WhoWeAre from "@/containers/WhoWeAre";

export default function Home() {
  const bgRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const btnRef = React.useRef<HTMLAnchorElement>(null) as React.RefObject<HTMLAnchorElement>;

  ButtonAnimation(bgRef, btnRef);

  return (
    <main style={{ fontSize: 'var(--txt-desk)' }}>
        <section className="text-center h-screen flex flex-col justify-center">
          <AnimatedBackground />
          <Image src="/logo.svg" alt="Logo Scenium" width={593} height={227} className="mx-auto z-10 relative" />
          <div className="flex items-center justify-center z-999 mt-[40px] mb-[60px]">
            <Image src="/crochetL.svg" alt="Crochet" width={17} height={42} />
            <p className="text-[21px] font-semibold" >Un clic, une scène, des souvenirs</p>
            <Image src="/crochetR.svg" alt="Crochet" width={17} height={42} />
          </div>
          <div 
            style={{ border: '1px solid var(--black)' }} 
            className="bg-black/30 rounded-[12px] text-left mx-[355px] p-[20px] z-10 relative"
          >
            <p>Marquez les esprits <span className="font-semibold">sans effort !</span> Découvrez nos scènes événementielles mobiles : un design unique, un impact garanti pour <span className="font-semibold">des mariages, anniversaires et soirées inoubliables.</span></p>
            <p>Design unique, impact garanti.</p>
            <div className="flex justify-end z-10 relative">
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
          <ScrollCircle />
        </section>
        <div className="px-[128px]">
          <SliderBox />
          <Command />
          <WhoWeAre />
        </div>
    </main>
  );
}
