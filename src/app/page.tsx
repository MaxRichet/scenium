'use client'

import React from 'react'
import Image from "next/image";
import ScrollCircle from "@/components/background/ScrollCircle";
import AnimatedBackground from "@/components/background/AnimatedBackground";
import CTAButton from "@/components/ui/CTAButton";
import Card from "@/components/ui/Card";
import Text from "@/components/ui/Text";
import SliderBox from "@/components/sections/SliderBox";
import SliderBoxPhone from "@/components/sections/SliderBoxPhone";
import Command from "@/components/sections/Command";
import CommandPhone from "@/components/sections/CommandPhone";
import WhoWeAre from "@/components/sections/WhoWeAre";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export default function Home() {
  const [mounted, setMounted] = React.useState(false);
  const isLargeScreen = useBreakpoint(1536);
  const isDesktop = useBreakpoint(1024);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="max-lg:text-[20px]!" style={{ fontSize: 'var(--txt-desk)' }}>
        <section className="text-center h-screen flex flex-col justify-center">
          <AnimatedBackground />
          <Image src="/logoN.svg" alt="Logo Scenium" width={593} height={227} className="mx-auto z-10 relative max-md:w-[450px] max-sm:w-[300px]" />
          <div className="flex items-center justify-center z-10 mt-[40px] mb-[60px]">
            <Image src="/crochetL.svg" alt="Crochet" width={17} height={42} />
            <Text>Un clic, une scène, des souvenirs</Text>
            <Image src="/crochetR.svg" alt="Crochet" width={17} height={42} />
          </div>
          <Card variant="ghost" className="text-left mx-[355px] p-[20px] z-10 relative max-2xl:mx-[150px] max-lg:mx-[50px] max-sm:mx-[20px]">
            <Text>Marquez les esprits <span className="font-semibold">sans effort !</span> Découvrez nos scènes événementielles mobiles : un design unique, un impact garanti pour <span className="font-semibold">des mariages, anniversaires et soirées inoubliables.</span></Text>
            <Text>Design unique, impact garanti.</Text>
            <div className="flex justify-end z-10 relative">
              <CTAButton href="/scenes" label="Découvrir nos scènes" />
            </div>
          </Card>
          <ScrollCircle />
        </section>
        <div className="px-[128px] max-lg:px-[90px] max-md:px-[60px] max-sm:px-[20px]">
          {mounted && (isLargeScreen ? <SliderBox /> : <SliderBoxPhone />)}
          {mounted && (isDesktop ? <Command /> : <CommandPhone />)}
          <WhoWeAre />
        </div>
    </main>
  );
}
