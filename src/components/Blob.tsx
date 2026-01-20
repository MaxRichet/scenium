'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'

type BlobProps = {
  size: string         // tailwind width/height
  startX: number       // position initiale en %
  startY: number
  blur?: number        // rayon flou en px
  animate?: boolean
}

export default function Blob({
  size,
  startX,
  startY,
  blur = 30,
  animate = true,
}: BlobProps) {
  const blobRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   if (!blobRef.current || !animate) return

  //   // on récupère la div parent
  //   const parent = blobRef.current.parentElement as HTMLDivElement
  //   if (!parent) return

  //   const move = () => {
  //     const parentRect = parent.getBoundingClientRect()
  //     const blobRect = blobRef.current!.getBoundingClientRect()

  //     // taille totale du blob visible avec blur
  //     const visibleWidth = blobRect.width + blur * 2
  //     const visibleHeight = blobRect.height + blur * 2

  //     // limites pour le centre du blob
  //     const minX = visibleWidth / 2
  //     const maxX = parentRect.width - visibleWidth / 2
  //     const minY = visibleHeight / 2
  //     const maxY = parentRect.height - visibleHeight / 2

  //     // position initiale en px depuis le parent
  //     const startXPx = (startX / 100) * parentRect.width
  //     const startYPx = (startY / 100) * parentRect.height

  //     // position aléatoire autour de la position initiale
  //     const x = gsap.utils.random(
  //       Math.max(minX, startXPx - visibleWidth / 2),
  //       Math.min(maxX, startXPx + visibleWidth / 2)
  //     )
  //     const y = gsap.utils.random(
  //       Math.max(minY, startYPx - visibleHeight / 2),
  //       Math.min(maxY, startYPx + visibleHeight / 2)
  //     )

  //     gsap.to(blobRef.current, {
  //       x: x - parentRect.width / 2,
  //       y: y - parentRect.height / 2,
  //       duration: gsap.utils.random(1, 2),
  //       ease: 'sine.inOut',
  //       onComplete: move,
  //     })
  //   }

  //   move()

  //   return () => {
  //     gsap.killTweensOf(blobRef.current)
  //   }
  // }, [animate, blur, startX, startY])

  return (
    <div
      ref={blobRef}
      className={`absolute rounded-full opacity-60 ${size}`}
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        background: 'var(--main-color)',
        filter: `blur(${blur}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}
