'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos scènes', href: '/scenes' },
  { label: 'À propos', href: '/about' },
  { label: 'Nous contacter', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const indicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const index = LINKS.findIndex(link => link.href === pathname)
    setActiveIndex(index === -1 ? 0 : index)
  }, [pathname])

  useEffect(() => {
    moveTo(activeIndex, false)
  }, [activeIndex])

  const moveTo = (index: number, animate = true) => {
    if (!containerRef.current || !indicatorRef.current) return

    const links = containerRef.current.querySelectorAll<HTMLAnchorElement>('a')
    const target = links[index]
    if (!target) return

    const { offsetLeft, offsetWidth } = target

    gsap.to(indicatorRef.current, {
      x: offsetLeft,
      width: offsetWidth,
      backgroundColor: animate ? '#555' : '#444',
      duration: animate ? 0.4 : 0,
      ease: 'power3.out',
    })
  }

  return (
    <nav className="w-full flex justify-center">
      <div
        ref={containerRef}
        className="relative flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur"
        style={{ background: "var(--black)" }}
      >
        {/* INDICATEUR */}
        <div
          ref={indicatorRef}
          className="absolute top-1 bottom-1 rounded-full bg-[#444]"
          style={{ width: 0 }}
        />

        {/* LINKS */}
        {LINKS.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="relative z-10 px-6 py-2 text-lg"
            style={{ color: "var(--white)" }}
            onMouseEnter={() => moveTo(i)}
            onMouseLeave={() => moveTo(activeIndex)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}