'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'
import Image from 'next/image'

type Puff = {
  id: number
  x: number
  y: number
}

type Props = {
  shouldStart: boolean
}

export default function PlaneAnimation({ shouldStart }: Props) {
  const planeX = useMotionValue(-200)
  const planeY = useMotionValue(0)
  const [puffs, setPuffs] = useState<Puff[]>([])
  const [active, setActive] = useState(false)
  const puffId = useRef(0)
  const started = useRef(false)

  useEffect(() => {
    if (!shouldStart || started.current) return
    started.current = true

    let running = true

    const launchPlane = () => {
      const width = window.innerWidth
      const startY = window.innerHeight * 0.6
      const endY = window.innerHeight * 0.1

      planeX.set(-200)
      planeY.set(startY)
      setPuffs([])
      setActive(true)

      animate(planeX, width + 200, {
        duration: 12,
        ease: 'linear',
        onUpdate: (latest) => {
          if (!running) return
          if (Math.round(latest) % 18 === 0) {
            setPuffs((prev) => [
              ...prev.slice(-35),
              { id: puffId.current++, x: latest - 10, y: planeY.get() + 15 },
            ])
          }
        },
        onComplete: () => {
          if (!running) return
          setActive(false)
          setTimeout(launchPlane, 5000)
        },
      })

      animate(planeY, endY, {
        duration: 12,
        ease: 'linear',
      })
    }

    launchPlane()

    return () => {
      running = false
    }
  }, [shouldStart, planeX, planeY])

  if (!active && puffs.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        overflow: 'hidden',
      }}
    >
      {puffs.map((puff) => (
        <motion.div
          key={puff.id}
          initial={{ opacity: 0.55, scale: 0.3, x: puff.x, y: puff.y }}
          animate={{ opacity: 0, scale: 2.8, y: puff.y - 50 }}
          transition={{ duration: 3.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: 45,
            height: 45,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 70%)',
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}

      <motion.div
        style={{
          position: 'absolute',
          x: planeX,
          y: planeY,
          rotate: -8,
        }}
      >
        <Image
          src="/scenes/chambre-celeste/avion.png"
          alt="avion"
          width={120}
          height={60}
          style={{ objectFit: 'contain' }}
        />
      </motion.div>
    </div>
  )
}
