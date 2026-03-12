'use client'

import Link from 'next/link'
import { useRef } from 'react'
import gsap from 'gsap'

type Props = {
  href: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export default function AnimatedLink({ href, style, children }: Props) {
  const underlineRef = useRef<HTMLSpanElement>(null)

  const enter = () => {
    gsap.to(underlineRef.current, {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  const leave = () => {
    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  return (
    <Link
      href={href}
      style={{ ...style, position: 'relative', display: 'inline-block' }}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      {children}
      <span
        ref={underlineRef}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: '2px',
          background: 'var(--white)',
          transform: 'scaleX(0)',
          transformOrigin: 'right center',
        }}
      />
    </Link>
  )
}
