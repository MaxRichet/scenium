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
    const [cardMaxHeight, setCardMaxHeight] = React.useState<number | string>('auto');

    const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

    React.useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            // Calculate max height for cards
            if (width >= 1024) {
              const heights = cardRefs.current
                .filter(ref => ref !== null)
                .map(ref => {
                  // Temporarily reset height to measure content
                  ref.style.height = 'auto';
                  return ref.scrollHeight;
                });
              
              // We also include the height from useElementSize if we want to match txtRef
              // But the user said "toutes les GlowDiv aient la même height"
              const max = Math.max(...heights, height);
              setCardMaxHeight(max);
            } else {
              setCardMaxHeight('auto');
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        // Also listen to height changes from useElementSize
        return () => window.removeEventListener("resize", handleResize);
    }, [height]);

  return (
    <section>
        <h1 className="max-xl:text-[90px]! max-md:text-[60px]! max-sm:text-[45px]!" style={{ fontSize: "var(--h1-desk)" }} >Qui sommes-nous ?</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[26px]">
            <div ref={txtRef} className="col-span-1 lg:col-span-2 xl:col-span-2">
                <p style={{ fontSize: 'var(--txt-social)' }} className="max-xl:text-justify">
                    Chez <span className="font-semibold">Scenium</span>, on ne capture pas juste des photos,
                    on cree des experiences. Notre mission : transformer chaque evenement en un décor unique,
                    immersif et inoubliable.
                </p>
                <p style={{ fontSize: 'var(--txt-social)' }} className="max-xl:text-justify">
                    Nos scenes melent design, innovation et storytelling pour offrir des souvenirs memorables
                    et viraux. Inspirees des tendances artistiques et concues avec des materiaux durables,
                    elles s’installent partout et s’adaptent a tous vos evenements.
                </p>
            </div>
            
            {data.map((item, index) => (
              <GlowDiv 
                key={item.id}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[index] = el;
                }}
                style={{ height: cardMaxHeight !== 'auto' ? `${cardMaxHeight}px` : 'auto' }}
                className="col-span-1 pb-[30px]"
              >
                  <div className="flex mb-[10px] mt-[20px]">
                      <div
                          className="flex items-center rounded-[5px] my-[5px] px-[8px]"
                          style={{ background: 'rgba(var(--main-color-rgb), 0.4)' }}
                      >
                          <Image
                              src={item.image}
                              alt={item.alt}
                              width={17}
                              height={17}
                              className={index === 0 || index === 2 ? "w-[26px]" : index === 1 ? "w-[22px]" : "w-[23px]"}
                          />
                      </div>
                      <h2 style={{ fontSize: 'var(--h2-mob)' }} className="ml-[10px]">{item.title}</h2>
                  </div>
                  <p style={{ fontSize: 'var(--whoweare)' }}>{item.text}</p>
              </GlowDiv>
            ))}
        </div>
    </section>
  );
}