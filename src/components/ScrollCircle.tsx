'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function ScrollCircle() {
  const circleRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!circleRef.current) return

    gsap.to(circleRef.current, {
      rotate: 360,
      duration: 12,
      repeat: -1,
      ease: 'linear',
      transformOrigin: '50% 50%',
    })
  }, [])

  return (
    <div className="w-[120px] h-[120px] mx-auto absolute top-[83%] left-1/2 -translate-x-1/2">
      <svg
        ref={circleRef}
        viewBox="0 0 300 300"
        className="absolute inset-0"
      >
        <defs>
          <path
            id="textCircle"
            d="
              M 150,150
              m -110,0
              a 110,110 0 1,1 220,0
              a 110,110 0 1,1 -220,0
            "
          />
        </defs>

        <text
          fill="white"
          fontSize="30"
          letterSpacing="5.7"
          className="uppercase"
        >
          <textPath href="#textCircle">
            SCROLL • SCROLL • SCROLL • SCROLL • SCROLL • 
          </textPath>
        </text>
      </svg>

      <Image
        src="/arrowScroll.svg"
        alt="Scroll arrow"
        width={35}
        height={40}
        className="absolute inset-0 m-auto"
      />
    </div>
  )
}
