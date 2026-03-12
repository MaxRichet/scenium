'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NavbarMobile from './NavbarMobile'

const LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos scènes', href: '/scenes' },
  { label: 'À propos', href: '/about' },
  { label: 'Nous contacter', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const leftLinks = LINKS.slice(0, -1)
  const rightLink = LINKS[LINKS.length - 1]

  const getLinkEl = (index: number) =>
    containerRef.current?.querySelectorAll<HTMLAnchorElement>('a')[index]

  const moveActive = (index: number) => {
    const el = getLinkEl(index)
    if (!el || !activeRef.current || !containerRef.current) return
    gsap.to(activeRef.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  const moveHover = (index: number) => {
    const el = getLinkEl(index)
    if (!el || !hoverRef.current || !containerRef.current) return

    gsap.to(hoverRef.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.35,
      ease: 'power3.out',
      opacity: 1,
    })
  }

  const resetHover = () => {
    const el = getLinkEl(activeIndex)
    if (!el || !hoverRef.current || !containerRef.current) return

    gsap.to(hoverRef.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.35,
      ease: 'power3.out',
      opacity: 0,
    })
  }

  useEffect(() => {
    const index = LINKS.findIndex(l => l.href === '/' ? pathname === '/' : pathname.startsWith(l.href))
    setActiveIndex(index === -1 ? 0 : index)
  }, [pathname])

  useEffect(() => {
    if (isDesktop && mounted) {
      moveActive(activeIndex)
      resetHover()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isDesktop, mounted])

  if (!mounted) return null

  if (!isDesktop) return <NavbarMobile />

  return (
    <nav className="flex w-full justify-center fixed z-999 max-lg:pt-[50px]">
      <div
        ref={containerRef}
        className="
          relative flex items-center justify-between
          w-[931px] h-[57px]
          rounded-[12px]
          max-2xl:w-[700px]
          max-lg:w-[600px]
        "
        style={{ background: 'var(--black)', border: "1px solid var(--nav-active)" }}
      >
        <div
          ref={activeRef}
          className="
            absolute top-[2px] bottom-[2px]
            rounded-[9px] z-6
          "
          style={{ background: "var(--nav-active)" }}
        />

        <div
          ref={hoverRef}
          className="
            absolute top-[2px] bottom-[2px]
            rounded-[9px]
            opacity-0 z-5
          "
          style={{ background: "var(--nav-hover)" }}
        />

        <div className="flex ml-[2px]">
          {leftLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                relative z-10
                px-[30px] py-[14px]
                whitespace-nowrap
              "
              style={{ color: 'var(--white)' }}
              onMouseEnter={() => moveHover(i)}
              onMouseLeave={resetHover}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href={rightLink.href}
          className="
            relative z-10
            whitespace-nowrap
            px-[30px] py-[14px]
            mr-[2px]
          "
          style={{ color: 'var(--white)' }}
          onMouseEnter={() => moveHover(LINKS.length - 1)}
          onMouseLeave={resetHover}
        >
          {rightLink.label}
        </Link>
      </div>
    </nav>
  )
}
