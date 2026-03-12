'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ButtonAnimation from '@/hooks/ButtonAnimation'
import Text from '@/components/ui/Text'

type Props = {
  href: string
  label: string
  className?: string
}

export default function CTAButton({ href, label, className }: Props) {
  const bgRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  ButtonAnimation(bgRef, btnRef)

  return (
    <Link
      href={href}
      ref={btnRef}
      className={`flex items-center relative h-[40px] cursor-pointer inline-flex ${className ?? ''}`}
    >
      <div
        className="absolute rounded-md w-[22px] h-full z-0 pointer-events-none"
        style={{ background: 'var(--main-color-hexa)', border: '1px solid var(--secondary-blue)' }}
        ref={bgRef}
      />
      <Image
        src="/arrowContactForm.svg"
        alt="Arrow Icon"
        width={15}
        height={15}
        className="rotate-[-90deg] ml-[4px] relative z-10"
      />
      <Text className="relative z-10 ml-[10px] pr-[10px]">
        {label}
      </Text>
    </Link>
  )
}
