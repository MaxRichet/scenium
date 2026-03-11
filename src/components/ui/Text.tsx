import type { ReactNode } from 'react'

type Props = {
  size?: 'base' | 'sm'
  lineHeight?: boolean
  className?: string
  children: ReactNode
}

const sizes = {
  base: 'var(--txt-social)',
  sm: 'var(--whoweare)',
}

export default function Text({ size = 'base', lineHeight = false, className = '', children }: Props) {
  return (
    <p
      className={className}
      style={{
        fontSize: sizes[size],
        ...(lineHeight && { lineHeight: 'var(--line-height)' }),
      }}
    >
      {children}
    </p>
  )
}
