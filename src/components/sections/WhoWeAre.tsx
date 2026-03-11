"use client";

import React from "react";
import Image from "next/image";
import Card from "@/components/ui/Card";
import { useElementSize } from "@/hooks/useElementSize";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Title from "@/components/ui/Title";
import Text from "@/components/ui/Text";

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
  const txtRef = React.useRef<HTMLDivElement>(null);
  const { height } = useElementSize(txtRef);
  const isDesktop = useBreakpoint(1023);
  const [cardMaxHeight, setCardMaxHeight] = React.useState<number | string>(
    "auto",
  );

  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (!isDesktop) {
      setCardMaxHeight("auto");
      return;
    }

    const heights = cardRefs.current
      .filter((ref): ref is HTMLDivElement => ref !== null)
      .map((ref) => {
        ref.style.height = "auto";
        return ref.scrollHeight;
      });

    setCardMaxHeight(Math.max(...heights, height));
  }, [isDesktop, height]);

  return (
    <section>
      <Title as="h1">Qui sommes-nous ?</Title>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[26px]">
        <div ref={txtRef} className="col-span-1 lg:col-span-2 xl:col-span-2">
          <Text className="max-xl:text-justify">
            Chez <span className="font-semibold">Scenium</span>, on ne capture
            pas juste des photos, on cree des experiences. Notre mission :
            transformer chaque evenement en un décor unique, immersif et
            inoubliable.
          </Text>
          <Text className="max-xl:text-justify">
            Nos scenes melent design, innovation et storytelling pour offrir des
            souvenirs memorables et viraux. Inspirees des tendances artistiques
            et concues avec des materiaux durables, elles s’installent partout
            et s’adaptent a tous vos evenements.
          </Text>
        </div>

        {data.map((item, index) => (
          <Card
            variant="glow"
            key={item.id}
            ref={(el: HTMLDivElement | null) => {
              cardRefs.current[index] = el;
            }}
            style={{
              height: cardMaxHeight !== "auto" ? `${cardMaxHeight}px` : "auto",
            }}
            className="col-span-1 pb-[30px]"
          >
            <div className="flex mb-[10px] mt-[20px]">
              <div
                className="flex items-center rounded-[5px] my-[5px] px-[8px]"
                style={{ background: "rgba(var(--main-color-rgb), 0.4)" }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={17}
                  height={17}
                  className={
                    index === 0 || index === 2
                      ? "w-[26px]"
                      : index === 1
                        ? "w-[22px]"
                        : "w-[23px]"
                  }
                />
              </div>
              <Title as="h2" className="ml-[10px]">
                {item.title}
              </Title>
            </div>
            <Text size="sm">{item.text}</Text>
          </Card>
        ))}
      </div>
    </section>
  );
}
