'use client'

import React from 'react'
import { useEffect, useRef } from "react";
import footerLinkAnimation from '@/animations/FooterLinkAnimation';
import Image from "next/image";
import Link from "next/link";
import ButtonAnimation from "@/animations/ButtonAnimation";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Footer() {

    const baseClass = 'w-[46px] h-[46px] rounded-[10px] flex items-center justify-center mx-[5px] cursor-pointer cursor-pointer';
    const baseStyle = {
        border: '1px solid var(--secondary-grey)',
    };
    const baseInput = 'w-full rounded-lg border bg-black px-[15px] py-[5px] outline-none cursor-pointer text-[19px]';

    const bgRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const btnRef = React.useRef<HTMLButtonElement>(null) as React.RefObject<HTMLButtonElement>;

    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!footerRef.current) return;
        footerLinkAnimation(footerRef.current);
    }, []);

    ButtonAnimation(bgRef, btnRef);

  return (
      <footer className='flex justify-evenly relative mt-[100px] py-[200px] items-center' ref={footerRef} >
        <AnimatedBackground fadeDirection="top" />
        <div className='z-999 flex items-center flex-col'>
            <Image src="/logo.svg" alt="Logo Scenium" width={241} height={92} className='pb-[50px]' />
            <div className='pb-[20px]'>
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
            <div>
                <p style={{ fontSize: 'var(--footer-title)' }} className='pb-[15px]' >Pour ne rien louper</p>
                <div className="flex" >
                    <input type="text" className={`${baseInput}, mr-[15px]`}  style={ baseStyle } placeholder='Email' />
                    <button className='flex items-center relative h-[40px] cursor-pointer' ref={btnRef} >
                        <div className='absolute rounded-md w-[22px] h-full z-0' style={{ background: "var(--main-color-hexa)", border: "1px solid var(--secondary-blue)" }} ref={bgRef} ></div>
                        <Image src="/arrowContactForm.svg" alt="Arrow Icon" width={15} height={15} className='rotate-[-90deg] ml-[4px] max-w-fit' />
                        <p className='z-2 ml-[10px] pr-[10px]' style={{ fontSize: 'var(--footer-social' }}>S'inscrire</p>
                    </button>
                </div>
            </div>
        </div>
        <div className='z-999'>
            <p style={{ fontSize: 'var(--footer-title)' }} >Informations</p>
            <ul>
                <li><Link href="/about" style={{ fontSize: 'var(--footer-links)' }}>A propos</Link></li>
                <li><Link href="/scenes" style={{ fontSize: 'var(--footer-links)' }}>Nos scènes</Link></li>
            </ul>
        </div>
        <div className='z-999'>
            <p style={{ fontSize: 'var(--footer-title)' }} >Informations pratiques</p>
            <ul>
                <li><Link href="/legal" style={{ fontSize: 'var(--footer-links)' }}>informations légales</Link></li>
                <li><Link href="/privacy" style={{ fontSize: 'var(--footer-links' }}>Politique de confidentialité</Link></li>
            </ul>
        </div>
      </footer>
  )
}