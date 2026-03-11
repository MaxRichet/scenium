'use client'

import React from 'react'
import { useRef } from "react";
import Image from "next/image";
import ButtonAnimation from "@/hooks/ButtonAnimation";
import AnimatedBackground from "@/components/background/AnimatedBackground";
import AnimatedLink from "@/components/ui/AnimatedLink";

export default function Footer() {

    const baseClass = 'w-[46px] h-[46px] rounded-[10px] flex items-center justify-center mx-[5px] cursor-pointer cursor-pointer bg-black/50';
    const baseStyle = {
        border: '1px solid var(--secondary-grey)',
    };
    const baseInput = 'w-full rounded-lg border bg-black px-[15px] py-[5px] outline-none cursor-pointer text-[19px]';

    const bgRef = React.useRef<HTMLDivElement>(null);
    const btnRef = React.useRef<HTMLButtonElement>(null);

    ButtonAnimation(bgRef, btnRef);

  return (
      <footer className='grid grid-cols-1 md:grid-cols-2 xl:flex xl:flex-row justify-evenly relative mt-[100px] py-[100px] xl:py-[200px] items-center gap-[60px] xl:gap-0 justify-items-center'>
        <AnimatedBackground fadeDirection="top" />
        <div className='z-999 flex items-center flex-col md:col-span-1 xl:w-auto'>
            <Image src="/logoN.svg" alt="Logo Scenium" width={241} height={92} className='pb-[50px] lg:block hidden' />
            <div className='pb-[20px] text-center'>
                <p style={{ fontSize: 'var(--footer-title)' }} className='pb-[15px]' >Restez connecté</p>
                <div className="flex justify-center">
                    <div className={`${baseClass}`} style={ baseStyle } >
                        <Image src="/tiktok.svg" alt="Tiktok Icons" width={24} height={24} />
                    </div>
                    <div className={`${baseClass}`} style={ baseStyle } >
                        <Image src="/linkedin.svg" alt="LinkedIn Icons" width={24} height={24} />
                    </div>
                    <div className={`${baseClass}`} style={ baseStyle } >
                        <Image src="/instagram.svg" alt="Instagram Icons" width={24} height={24} />
                    </div>
                    <div className={`${baseClass}`} style={ baseStyle } >
                        <Image src="/x.svg" alt="X Icons" width={24} height={24} />
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <p style={{ fontSize: 'var(--footer-title)' }} className='pb-[15px]' >Pour ne rien louper</p>
                <div className="flex" >
                    <input type="text" className={`${baseInput}, mr-[15px]`}  style={ baseStyle } placeholder='Email' />
                    <button className='flex items-center relative h-[40px] cursor-pointer' ref={btnRef} >
                        <div className='absolute rounded-md w-[22px] h-full z-0' style={{ background: "var(--main-color-hexa)", border: "1px solid var(--secondary-blue)" }} ref={bgRef} ></div>
                        <Image src="/arrowContactForm.svg" alt="Arrow Icon" width={15} height={15} className='rotate-[-90deg] ml-[4px] max-w-fit' />
                        <p className='z-2 ml-[10px] pr-[10px]' style={{ fontSize: 'var(--footer-links)' }}>S&apos;inscrire</p>
                    </button>
                </div>
            </div>
        </div>
        <div className='z-999 text-center xl:text-left md:col-span-1 xl:w-auto'>
            <p style={{ fontSize: 'var(--footer-title)' }} >Informations</p>
            <ul className='flex flex-col items-center xl:items-start'>
                <li><AnimatedLink href="/about" style={{ fontSize: 'var(--footer-links)' }}>A propos</AnimatedLink></li>
                <li><AnimatedLink href="/scenes" style={{ fontSize: 'var(--footer-links)' }}>Nos scènes</AnimatedLink></li>
            </ul>
        </div>
        <div className='z-999 text-center xl:text-left md:col-span-2 xl:col-span-1 xl:w-auto'>
            <p style={{ fontSize: 'var(--footer-title)' }} >Informations pratiques</p>
            <ul className='flex flex-col items-center xl:items-start'>
                <li><AnimatedLink href="/legal" style={{ fontSize: 'var(--footer-links)' }}>informations légales</AnimatedLink></li>
                <li><AnimatedLink href="/privacy" style={{ fontSize: 'var(--footer-links)' }}>Politique de confidentialité</AnimatedLink></li>
            </ul>
        </div>
      </footer>
  )
}
