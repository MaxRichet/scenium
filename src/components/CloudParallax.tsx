'use client'

import { useScroll, useTransform, motion, MotionValue } from 'motion/react'
import Image from 'next/image'

const CLOUDS = [
  { x: '-5%',  top: '5%',  width: '45vw', speed: -150, dir: -1 },
  { x: '55%',  top: '10%',  width: '55vw', speed: -280, dir:  1 },
  { x: '-10%', top: '50%', width: '60vw', speed: -380, dir:  1 },
  { x: '65%',  top: '40%', width: '35vw', speed: -200, dir: -1 },
  { x: '30%',  top: '70%', width: '50vw', speed: -320, dir:  1 },
  { x: '-15%', top: '80%', width: '42vw', speed: -450, dir: -1 },
  { x: '70%',  top: '85%', width: '58vw', speed: -240, dir:  1 },
]

function Cloud({ x, top, width, speed, dir, scrollY }: typeof CLOUDS[0] & { scrollY: MotionValue<number> }) {
  const translateY = useTransform(scrollY, [0, 1000], [0, speed * dir])

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top,
        width,
        aspectRatio: '2 / 1',
        translateY,
        pointerEvents: 'none',
      }}
    >
      <Image
        src="/scenes/chambre-celeste/cloud.png"
        alt=""
        fill
        style={{ objectFit: 'contain' }}
      />
    </motion.div>
  )
}

export default function CloudParallax() {
  const { scrollY } = useScroll()

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {CLOUDS.map((cloud, i) => (
        <Cloud key={i} {...cloud} scrollY={scrollY} />
      ))}
    </div>
  )
}
