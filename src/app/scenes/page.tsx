'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Carousel } from '@/src/components/application/carousel/carousel-base'
import CloudCover from '@/components/CloudCover'
import CTAButton from '@/components/CTAButton'
import Title from '@/components/Title'
import Text from '@/components/Text'

const TRANSITION_DURATION = 1400

type SceneSlideData = {
  type: 'scene'
  src: string
  alt: string
  title: string
  href: string
}

type ComingSlideData = {
  type: 'coming'
}

type SlideData = SceneSlideData | ComingSlideData

const SLIDES: SlideData[] = [
  {
    type: 'scene',
    src: '/scenes/chambre-celeste/hero.png',
    alt: 'Chambre Céleste',
    title: 'Chambre Céleste',
    href: '/scenes/chambre-celeste',
  },
  { type: 'coming' },
  { type: 'coming' },
  { type: 'coming' },
]

function SceneSlide({ slide, onNavigate }: { slide: SceneSlideData; onNavigate: (href: string) => void }) {
  return (
    <Carousel.Item className="relative h-full overflow-hidden">
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        sizes="100vw"
        quality={90}
        className="object-cover object-center"
        priority
      />

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, black 0%, transparent 55%)' }}
      />

      <div className="absolute bottom-0 left-0 right-0 px-10 pb-10 flex flex-col gap-4">
        <h2
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(32px, 5vw, 80px)',
            fontWeight: 600,
            color: 'white',
            letterSpacing: '0.02em',
          }}
        >
          {slide.title}
        </h2>
        <CTAButton
          href={slide.href}
          label="Découvrir"
          onClick={(e) => { e.preventDefault(); onNavigate(slide.href) }}
          className="w-30"
        />
      </div>
    </Carousel.Item>
  )
}

function ComingSoonSlide() {
  return (
    <Carousel.Item className="relative h-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <p
          style={{
            fontFamily: 'var(--font-main)',
            fontSize: 'clamp(20px, 3vw, 40px)',
            fontWeight: 500,
            color: 'var(--secondary-grey)',
            letterSpacing: '0.08em',
          }}
        >
          À venir
        </p>
      </div>
    </Carousel.Item>
  )
}

export default function ScenesPage() {
  const [covering, setCovering] = useState(false)
  const router = useRouter()

  function handleNavigate(href: string) {
    setCovering(true)
    setTimeout(() => router.push(href), TRANSITION_DURATION)
  }

  return (
    <main className="flex flex-col h-screen">
      <CloudCover visible={covering} />

      <section className="px-[125px] pt-[120px] pb-[60px] max-lg:px-[60px] max-sm:px-[24px] max-sm:pt-[80px]">
        <Text variant="eyebrow" className="mb-4">Nos univers</Text>
        <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
          <Title as="h2" className="font-semibold leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 56px)' }}>
            Chaque scène,<br />une expérience unique
          </Title>
          <Text
            size="sm"
            className="max-w-[380px] max-md:max-w-none"
            style={{ color: 'var(--secondary-grey)', lineHeight: '1.7' }}
          >
            Découvrez nos espaces immersifs conçus pour sublimer vos événements.
            Chaque décor raconte une histoire, chaque détail est pensé pour l&apos;émotion.
          </Text>
        </div>
      </section>

      <div className="px-5 pb-5 flex-1 min-h-0">
        <div className="relative w-full h-full overflow-hidden rounded-[24px]">
          <Carousel.Root className="h-full w-full">
            <Carousel.PrevTrigger className="absolute left-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full border border-white/40 text-white backdrop-blur-sm hover:bg-white/10 transition-colors disabled:opacity-30">
              <ChevronLeft size={20} />
            </Carousel.PrevTrigger>
            <Carousel.NextTrigger className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full border border-white/40 text-white backdrop-blur-sm hover:bg-white/10 transition-colors disabled:opacity-30">
              <ChevronRight size={20} />
            </Carousel.NextTrigger>

            <Carousel.Content className="h-full">
              {SLIDES.map((slide, i) =>
                slide.type === 'scene'
                  ? <SceneSlide key={i} slide={slide} onNavigate={handleNavigate} />
                  : <ComingSoonSlide key={i} />
              )}
            </Carousel.Content>
          </Carousel.Root>
        </div>
      </div>
    </main>
  )
}
