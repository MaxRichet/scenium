import type { ReactNode } from 'react'

import type { CSSProperties } from 'react'

type Props = {
  size?: 'base' | 'sm'
  variant?: 'eyebrow'
  lineHeight?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
}

const sizes = {
  base: 'var(--txt-social)',
  sm: 'var(--whoweare)',
}

export default function Text({ size = 'base', variant, lineHeight = false, className = '', style, children }: Props) {
  const eyebrowStyle: CSSProperties = variant === 'eyebrow'
    ? { fontSize: '13px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--main-color-hexa)' }
    : {}

  return (
    <p
      className={className}
      style={{
        ...(variant !== 'eyebrow' && { fontSize: sizes[size] }),
        ...(lineHeight && { lineHeight: 'var(--line-height)' }),
        ...eyebrowStyle,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
