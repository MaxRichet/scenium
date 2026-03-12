"use client";

import Masonry from "@/components/Masonry";
import SceneCTA from "@/components/SceneCTA";
import SceneHero from "@/components/SceneHero";
import SceneSpecs from "@/components/SceneSpecs";
import SceneIntroOverlay from "@/components/SceneIntroOverlay";
import CTAButton from "@/components/CTAButton";
import Text from "@/components/Text";
import Title from "@/components/Title";
import { galleryItems } from "@/data/chambre-celeste";
import SmoothScroll from "@/app/smooth-scroll";

export default function ChambreCelestePage() {
  return (
    <main>
      <SmoothScroll/>
      <SceneIntroOverlay title="Chambre Céleste" />
      <SceneHero src="/scenes/chambre-celeste/hero.png" alt="Chambre Céleste" />

      <section className="px-[125px] py-[120px] max-lg:px-[60px] max-md:py-[70px] max-sm:px-[24px] max-sm:py-[50px]">
        <div className="flex items-start justify-between gap-[60px] mb-[80px] max-lg:flex-col max-lg:gap-[32px]">
          <div className="flex-1">
            <Title
              as="h2"
              className="font-semibold leading-tight mb-[24px]"
              style={{ fontSize: "clamp(32px, 4vw, var(--h2-desk))" }}
            >
              Qu&apos;est-ce que la<br />Chambre Céleste ?
            </Title>
            <CTAButton href="/contact" label="Demander un devis" />
          </div>
          <div className="flex-1 max-w-[500px] max-lg:max-w-none">
            <Text
              className="leading-relaxed"
              style={{ color: "var(--secondary-grey)", lineHeight: "1.7", fontSize: "clamp(16px, 1.5vw, 23px)" }}
            >
              La Chambre Céleste transforme chaque instant en un souvenir
              magique. Ses parois miroir et son fond bleu profond donnent
              l&apos;illusion de flotter dans un nuage, tandis que la lumière douce
              enveloppe chaque moment comme un halo aérien. Pour vos mariages,
              anniversaires ou événements élégants, chaque photo devient un
              morceau de rêve, et chaque souvenir reste suspendu.
            </Text>
          </div>
        </div>
      </section>

      <section className="px-[125px] pb-[100px] max-lg:px-[60px] max-sm:px-[24px]">
        <Masonry
          items={galleryItems}
          animateFrom="bottom"
          stagger={0.05}
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
        />
      </section>

      <SceneSpecs />

      <SceneCTA
        eyebrow="Prêt à créer quelque chose d'unique ?"
        title="Réservez la Chambre Céleste pour votre événement"
        description="Mariages, anniversaires, soirées d'entreprise — notre équipe vous accompagne pour créer une expérience à votre image."
        cta={{ href: '/contact', label: 'Nous contacter' }}
      />
    </main>
  );
}
