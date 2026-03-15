"use client";

import SceneIntroOverlay from "@/components/SceneIntroOverlay";
import CloudParallax from "@/components/CloudParallax";
import SceneSpecs from "@/components/SceneSpecs";
import SceneCTA from "@/components/SceneCTA";
import Masonry from "@/components/Masonry";
import CTAButton from "@/components/CTAButton";
import Text from "@/components/Text";
import Title from "@/components/Title";
import { galleryItems } from "@/data/chambre-celeste";
import SmoothScroll from "@/app/smooth-scroll";

export default function ChambreCelestePage() {
  return (
    <main style={{ position: "relative" }}>
      <SmoothScroll />
      <SceneIntroOverlay />

      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="/scenes/chambre-celeste/chambre-bg.png"
          alt="Chambre Céleste"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <CloudParallax />

        {/* Overlay sur l'image */}
        <div
          className="absolute inset-0 flex items-end pb-[500px] px-[125px] max-lg:px-[60px] max-sm:px-[24px] max-sm:pb-[60px]"
        >
          <div className="flex items-end justify-between gap-[60px] w-full max-lg:flex-col max-lg:gap-[24px]">
            <div className="flex-1">
              <Title
                as="h2"
                className="font-semibold leading-tight mb-[28px]"
                style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
              >
                Qu&apos;est-ce que la<br />Chambre Céleste ?
              </Title>
              <CTAButton href="/contact" label="Demander un devis" />
            </div>
            <div className="flex-1 max-w-[520px] max-lg:max-w-none">
              <Text
                style={{ color: "var(--white)", lineHeight: "1.8", fontSize: "clamp(15px, 1.4vw, 22px)" }}
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
        </div>
      </div>

      <div style={{ marginTop: "80px" }}>
        <SceneSpecs />
      </div>

      {/* Galerie */}
      <section className="px-[125px] pt-[40px] pb-[80px] max-lg:px-[60px] max-md:pb-[60px] max-sm:px-[24px] max-sm:pt-[20px] max-sm:pb-[40px]">
        <div className="mb-[50px]">
          <Text variant="eyebrow" className="font-semibold mb-[8px]">Galerie</Text>
          <Title as="h2" className="font-semibold" style={{ fontSize: "clamp(28px, 3.5vw, var(--h2-desk))" }}>
            La scène en images
          </Title>
        </div>
        <Masonry
          items={galleryItems}
          animateFrom="bottom"
          stagger={0.05}
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
        />
      </section>

      <SceneCTA
        eyebrow="Prêt à créer quelque chose d'unique ?"
        title="Réservez la Chambre Céleste pour votre événement"
        description="Mariages, anniversaires, soirées d'entreprise — notre équipe vous accompagne pour créer une expérience à votre image."
        cta={{ href: '/contact', label: 'Nous contacter' }}
      />
    </main>
  );
}
