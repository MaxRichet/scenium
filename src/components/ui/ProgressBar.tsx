import type { RefObject } from 'react'
import Image from 'next/image'

type Props = {
  dots: [RefObject<HTMLSpanElement | null>, RefObject<HTMLSpanElement | null>, RefObject<HTMLSpanElement | null>]
  lines: [RefObject<HTMLDivElement | null>, RefObject<HTMLDivElement | null>]
  imgs: [RefObject<HTMLImageElement | null>, RefObject<HTMLImageElement | null>, RefObject<HTMLImageElement | null>]
  width: number
}

const inactiveStyle = { background: 'var(--nav-active)' }
const activeStyle = { background: 'var(--main-color-hexa)' }

function Dot({ dotRef, imgRef }: { dotRef: RefObject<HTMLSpanElement | null>; imgRef: RefObject<HTMLImageElement | null> }) {
  return (
    <span className="relative w-8 h-7 rounded-full overflow-hidden max-lg:w-9 max-sm:w-10" style={inactiveStyle}>
      <span ref={dotRef} className="absolute inset-0 rounded-full scale-0" style={activeStyle}>
        <Image
          ref={imgRef}
          src="/coche.svg"
          alt="coche"
          width={14}
          height={14}
          className="opacity-0 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </span>
    </span>
  )
}

function Line({ lineRef }: { lineRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="relative h-[3px] w-[50%] rounded-full mx-[10px] overflow-hidden" style={inactiveStyle}>
      <div ref={lineRef} className="absolute left-0 top-0 h-full w-full scale-x-0 origin-left" style={activeStyle} />
    </div>
  )
}

export default function ProgressBar({ dots, lines, imgs, width }: Props) {
  return (
    <div
      className="relative flex items-center h-7 left-1/2 transform -translate-x-1/2 mb-[40px]"
      style={{ pointerEvents: 'none', width }}
    >
      <Dot dotRef={dots[0]} imgRef={imgs[0]} />
      <Line lineRef={lines[0]} />
      <Dot dotRef={dots[1]} imgRef={imgs[1]} />
      <Line lineRef={lines[1]} />
      <Dot dotRef={dots[2]} imgRef={imgs[2]} />
    </div>
  )
}
