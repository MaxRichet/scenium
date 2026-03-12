import Image from 'next/image'

type Props = {
  src: string
  alt: string
}

export default function SceneHero({ src, alt }: Props) {
  return (
    <section className="px-5 pt-25 pb-5 h-screen">
      <div className="relative w-full h-full overflow-hidden rounded-[24px]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  )
}
