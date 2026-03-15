'use client'

import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'

const CLOUDS = [
  { left: '-30%', bottom: '-30%', width: '130vw', delay: 0.05 },
  { left: '40%',  bottom: '-25%', width: '95vw',  delay: 0.09 },
  { left: '72%',  bottom: '-32%', width: '115vw', delay: 0.07 },
  { left: '-10%', bottom: '-5%',  width: '85vw',  delay: 0.14 },
  { left: '18%',  bottom: '-12%', width: '125vw', delay: 0.11 },
  { left: '78%',  bottom: '5%',   width: '80vw',  delay: 0.17 },
  { left: '-22%', bottom: '18%',  width: '100vw', delay: 0.2  },
  { left: '35%',  bottom: '12%',  width: '135vw', delay: 0.16 },
  { left: '65%',  bottom: '26%',  width: '90vw',  delay: 0.22 },
  { left: '-5%',  bottom: '36%',  width: '110vw', delay: 0.19 },
  { left: '50%',  bottom: '32%',  width: '75vw',  delay: 0.25 },
  { left: '20%',  bottom: '48%',  width: '120vw', delay: 0.23 },
  { left: '-18%', bottom: '54%',  width: '85vw',  delay: 0.27 },
  { left: '70%',  bottom: '52%',  width: '100vw', delay: 0.24 },
]

type Props = {
  visible: boolean
  onComplete?: () => void
}

export default function CloudCover({ visible, onComplete }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[9999] overflow-hidden">
          {CLOUDS.map((cloud, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: cloud.left,
                bottom: cloud.bottom,
                width: cloud.width,
                aspectRatio: '2 / 1',
                minWidth: '500px',
              }}
              initial={{ y: '200vh' }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.1,
                ease: [0.76, 0, 0.24, 1],
                delay: cloud.delay,
              }}
              onAnimationComplete={i === CLOUDS.length - 1 ? onComplete : undefined}
            >
              <Image
                src="/scenes/chambre-celeste/cloud.png"
                alt=""
                fill
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
