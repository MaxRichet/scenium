'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

type Props = {
  title: string
}

export default function SceneIntroOverlay({ title }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          <motion.p
            style={{
              fontSize: 'clamp(28px, 5vw, 72px)',
              fontFamily: 'var(--font-main)',
              color: 'var(--white)',
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {title}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
