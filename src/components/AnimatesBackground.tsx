'use client'

import Blob from './Blob'

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Blob size="w-[220px] h-[220px]" startX={30} startY={40} />
      <Blob size="w-[180px] h-[180px]" startX={70} startY={30} />
      <Blob size="w-[160px] h-[160px]" startX={50} startY={70} />
    </div>
  )
}