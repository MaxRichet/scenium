'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos scènes', href: '/scenes' },
  { label: 'À propos', href: '/about' },
  { label: 'Nous contacter', href: '/contact' },
]

export default function NavbarMobile() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const burgerLine1 = useRef<HTMLDivElement>(null)
  const burgerLine2 = useRef<HTMLDivElement>(null)
  const linksContainerRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (!menuRef.current || !burgerLine1.current || !burgerLine2.current) return

    if (isOpen) {
      // Burger to X animation
      gsap.to(burgerLine1.current, { rotation: 45, y: 9, duration: 0.3, ease: 'power2.inOut' })
      gsap.to(burgerLine2.current, { rotation: -45, y: -9, duration: 0.3, ease: 'power2.inOut' })
      
      // Menu slide in
      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: 'power3.out' })
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // X back to Burger animation
      gsap.to(burgerLine1.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' })
      gsap.to(burgerLine2.current, { rotation: 0, y: 0, duration: 0.3, ease: 'power2.inOut' })
      
      // Menu slide out
      gsap.to(menuRef.current, { x: '-100%', duration: 0.5, ease: 'power3.in' })
      
      // Restore scroll
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = LINKS.slice(0, -1)
  const contactLink = LINKS[LINKS.length - 1]

  return (
    <>
      {/* BURGER BUTTON */}
      <button 
        onClick={toggleMenu}
        className="fixed top-[30px] left-[30px] z-[1000] w-[30px] h-[20px] flex flex-col justify-between lg:hidden"
        aria-label="Menu"
      >
        <div ref={burgerLine1} className="w-full h-[2px] bg-white rounded-full" />
        <div ref={burgerLine2} className="w-full h-[2px] bg-white rounded-full" />
      </button>

      {/* MOBILE MENU OVERLAY */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[999] bg-black translate-x-[-100%] flex flex-col pt-[60px] pb-0 lg:hidden"
      >
        {/* LOGO */}
        <div className="flex justify-center mb-[40px]">
          <Image src="/logoN.svg" alt="Logo Scenium" width={180} height={68} />
        </div>

        {/* LINKS */}
        <div className="flex-grow flex flex-col items-center">
          <div ref={linksContainerRef} className="w-[80%] md:w-[50%] flex flex-col">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href
              return (
                <div key={link.href} className="group flex flex-col w-full">
                  <Link
                    href={link.href}
                    className={`
                      relative py-[20px] text-[25px] text-center transition-all duration-300 w-full rounded-[9px]
                      ${isActive ? 'bg-[var(--nav-active)]' : 'hover:bg-[var(--nav-hover)]'}
                    `}
                    style={{ color: 'var(--white)' }}
                  >
                    {link.label}
                  </Link>
                  {i < navLinks.length - 1 && (
                    <div className="h-[1px] bg-white opacity-20 w-[calc(100%-18px)] mx-auto" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* CONTACT LINK AT BOTTOM */}
        <div className="mt-auto w-full flex justify-center">
          <div className="w-[80%] md:w-[50%]">
            <Link
              href={contactLink.href}
              className={`
                relative py-[25px] text-[25px] text-center transition-all duration-300 block w-full rounded-[9px]
                ${pathname === contactLink.href ? 'bg-[var(--nav-active)]' : 'hover:bg-[var(--nav-hover)]'}
              `}
              style={{ color: 'var(--white)' }}
            >
              {contactLink.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
