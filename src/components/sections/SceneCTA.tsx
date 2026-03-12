import AnimatedBackground from '@/components/background/AnimatedBackground'
import CTAButton from '@/components/ui/CTAButton'
import Text from '@/components/ui/Text'
import Title from '@/components/ui/Title'

type Props = {
  eyebrow: string
  title: string
  description: string
  cta: { href: string; label: string }
}

export default function SceneCTA({ eyebrow, title, description, cta }: Props) {
  return (
    <section className="relative overflow-hidden mx-[125px] mb-[100px] rounded-[20px] max-lg:mx-[60px] max-sm:mx-[24px]">
      <AnimatedBackground baseBallCount={8} baseBlurPx={80} fadeTo="transparent" />
      <div className="relative z-10 flex flex-col items-center text-center py-[120px] px-[60px] max-sm:py-[80px] max-sm:px-[24px]">
        <Text variant="eyebrow" className="font-semibold mb-[16px]">{eyebrow}</Text>
        <Title
          as="h2"
          className="font-semibold mb-[20px] max-w-[700px]"
          style={{ fontSize: 'clamp(28px, 4vw, 56px)', lineHeight: '1.2' }}
        >
          {title}
        </Title>
        <Text
          className="mb-[48px] max-w-[500px]"
          style={{ fontSize: '18px', color: 'var(--secondary-grey)', lineHeight: '1.7' }}
        >
          {description}
        </Text>
        <CTAButton href={cta.href} label={cta.label} />
      </div>
    </section>
  )
}
