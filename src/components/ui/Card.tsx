'use client'

import { forwardRef, type ReactNode, type CSSProperties } from 'react'
import GlowDiv from '@/components/ui/GlowDiv'

type Variant = 'default' | 'ghost' | 'glow'

type Props = {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children: ReactNode
}

const variantClass: Record<Exclude<Variant, 'glow'>, string> = {
  default: 'rounded-[12px]',
  ghost:   'bg-black/30 rounded-[12px]',
}

const variantStyle: Record<Exclude<Variant, 'glow'>, CSSProperties> = {
  default: { background: 'var(--grey)', border: '2px solid var(--border-grey)' },
  ghost:   { border: '1px solid var(--black)' },
}

const Card = forwardRef<HTMLDivElement, Props>(
  ({ variant = 'default', className = '', style, children }, ref) => {
    if (variant === 'glow') {
      return (
        <GlowDiv ref={ref} className={className} style={style}>
          {children}
        </GlowDiv>
      )
    }

    return (
      <div
        ref={ref}
        className={`${variantClass[variant]} ${className}`.trim()}
        style={{ ...variantStyle[variant], ...style }}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
export default Card
