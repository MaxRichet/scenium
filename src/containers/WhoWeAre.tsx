"use client";

import React from "react";
import Image from "next/image";
import GlowDiv from "@/components/GlowDiv";
import { useElementSize } from "@/utils/useElementSize";

type Data = {
  id: number;
  image: string;
  alt: string;
  title: string;
  text: string;
};

const data: Data[] = [
  {
    id: 1,
    image: "/quality.svg",
    alt: "Quality icon",
    title: "Qualite garantie",
    text: "Des scenes concues avec des composants de qualite",
  },
  {
    id: 2,
    image: "/unique.svg",
    alt: "Unique scene icon",
    title: "Des scènes uniques",
    text: "Des scènes tendances adaptées à votre image",
  },
  {
    id: 3,
    image: "/delivery.svg",
    alt: "Delivery icon",
    title: "Livraison rapide",
    text: "Livraison et installation efficace sur le lieu de votre événement",
  },
  {
    id: 4,
    image: "/service.svg",
    alt: "Service icon",
    title: "Service personnalise",
    text: "Nous vous guidons à chaque étape",
  },
];

export default function WhoWeAre() {
    const txtRef = React.useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const { height } = useElementSize(txtRef);

  return (
    <section>
        <h1 style={{ fontSize: "var(--h1-desk)" }} >Qui sommes-nous ?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
            <div ref={txtRef} className="md:col-span-2 lg:col-span-2">
                <p style={{ fontSize: 'var(--txt-social)' }}>
                    Chez <span className="font-semibold">Scenium</span>, on ne capture pas juste des photos,
                    on cree des experiences. Notre mission : transformer chaque evenement en un décor unique,
                    immersif et inoubliable.
                </p>
                <p style={{ fontSize: 'var(--txt-social)' }}>
                    Nos scenes melent design, innovation et storytelling pour offrir des souvenirs memorables
                    et viraux. Inspirees des tendances artistiques et concues avec des materiaux durables,
                    elles s’installent partout et s’adaptent a tous vos evenements.
                </p>
            </div>
            <GlowDiv className="lg:col-span-1">
                <div className="flex mb-[10px] mt-[20px]">
                    <div
                        className="flex items-center rounded-[5px] my-[5px] px-[8px]"
                        style={{ background: 'rgba(var(--main-color-rgb), 0.4)' }}
                    >
                        <Image
                            src={data[0].image}
                            alt={data[0].alt}
                            width={17}
                            height={17}
                            className="w-[26px]"
                        />
                    </div>
                    <h2 style={{ fontSize: 'var(--h2-mob)' }} className="ml-[10px]">{data[0].title}</h2>
                </div>
                <p style={{ fontSize: 'var(--whoweare)' }}>{data[0].text}</p>
            </GlowDiv>
            <GlowDiv style={{height: `${height}px`}}>
                <div className="flex mb-[10px] mt-[20px]">
                    <div
                        className="flex items-center rounded-[5px] my-[5px] px-[8px]"
                        style={{ background: 'rgba(var(--main-color-rgb), 0.4)' }}
                    >
                        <Image
                            src={data[1].image}
                            alt={data[1].alt}
                            width={15}
                            height={15}
                            className="w-[22px]"
                        />
                    </div>
                    <h2 style={{ fontSize: 'var(--h2-mob)' }} className="ml-[10px]">{data[1].title}</h2>
                </div>
                <p style={{ fontSize: 'var(--whoweare)' }}>{data[1].text}</p>
            </GlowDiv>
            <GlowDiv>
                <div className="flex mb-[10px] mt-[20px]">
                    <div
                        className="flex items-center rounded-[5px] my-[5px] px-[8px]"
                        style={{ background: 'rgba(var(--main-color-rgb), 0.4)' }}
                    >
                        <Image
                            src={data[2].image}
                            alt={data[2].alt}
                            width={15}
                            height={15}
                            className="w-[26px]"
                        />
                    </div>
                    <h2 style={{ fontSize: 'var(--h2-mob)' }} className="ml-[10px]">{data[2].title}</h2>
                </div>
                <p style={{ fontSize: 'var(--whoweare)' }}>{data[2].text}</p>
            </GlowDiv>
            <GlowDiv>
                <div className="flex mb-[10px] mt-[20px]">
                    <div
                        className="flex items-center rounded-[5px] my-[5px] px-[8px]"
                        style={{ background: 'rgba(var(--main-color-rgb), 0.4)' }}
                    >
                        <Image
                            src={data[3].image}
                            alt={data[3].alt}
                            width={15}
                            height={15}
                            className="w-[23px]"
                        />
                    </div>
                    <h2 style={{ fontSize: 'var(--h2-mob)' }} className="ml-[10px]">{data[3].title}</h2>
                </div>
                <p style={{ fontSize: 'var(--whoweare)' }}>{data[3].text}</p>
            </GlowDiv>
        </div>
    </section>
  );
}