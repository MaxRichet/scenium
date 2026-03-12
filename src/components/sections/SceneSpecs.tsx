import SpotlightCard from "@/components/SpotlightCard";
import Text from "@/components/ui/Text";
import Title from "@/components/ui/Title";
import { Layers, Maximize2, Lightbulb, Zap, Sparkles, ScanLine, type LucideIcon } from "lucide-react";

export type SceneSpec = {
  icon: LucideIcon
  label: string
  value: string
  desc: string
}

const SPECS: SceneSpec[] = [
  {
    icon: Layers,
    label: "Structure",
    value: "Aluminium brossé",
    desc: "Légère et stable, facile à transporter et à installer sans outillage.",
  },
  {
    icon: ScanLine,
    label: "Revêtement",
    value: "Miroir & toile blanche",
    desc: "Parois miroir et fond bleu profond pour l'effet ciel infini et lumière douce.",
  },
  {
    icon: Maximize2,
    label: "Dimensions",
    value: "2,50 × 2,50 × 2,20 m",
    desc: "1 à 3 personnes, adaptée à tous types de salles et espaces extérieurs.",
  },
  {
    icon: Lightbulb,
    label: "Éclairage",
    value: "LED réglable",
    desc: "Chaud ou froid selon l'ambiance, entièrement personnalisable.",
  },
  {
    icon: Zap,
    label: "Installation",
    value: "< 2h / 45 min",
    desc: "Montage en moins de 2h, démontage en 45 min. Déploiement express.",
  },
  {
    icon: Sparkles,
    label: "Accessoires",
    value: "Kit personnalisation",
    desc: "Lumières supplémentaires, kit pluie, couleurs et thèmes modulables.",
  },
];

export default function SceneSpecs() {
  return (
    <section className="px-[125px] pb-[100px] max-lg:px-[60px] max-md:pb-[70px] max-sm:px-[24px] max-sm:pb-[50px]">
      <div className="mb-[50px]">
        <Text variant="eyebrow" className="font-semibold mb-[8px]">Fiche technique</Text>
        <Title as="h2" className="font-semibold" style={{ fontSize: "clamp(28px, 3.5vw, var(--h2-desk))" }}>
          Caractéristiques
        </Title>
      </div>

      <div className="grid grid-cols-3 gap-[16px] max-lg:grid-cols-2 max-sm:grid-cols-1">
        {SPECS.map((spec) => {
          const Icon = spec.icon;
          return (
            <SpotlightCard
              key={spec.label}
              spotlightColor="rgba(20, 149, 234, 0.2)"
              className="flex flex-col gap-[14px]"
            >
              <div
                className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center"
                style={{ background: "rgba(20, 149, 234, 0.12)", border: "1px solid rgba(20, 149, 234, 0.25)" }}
              >
                <Icon size={20} color="var(--main-color-hexa)" strokeWidth={1.5} />
              </div>
              <Text style={{ fontSize: "12px", color: "var(--secondary-grey)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {spec.label}
              </Text>
              <Text className="font-semibold" style={{ fontSize: "20px", color: "var(--white)", lineHeight: "1.2" }}>
                {spec.value}
              </Text>
              <Text style={{ fontSize: "14px", color: "var(--secondary-grey)", lineHeight: "1.6" }}>
                {spec.desc}
              </Text>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
