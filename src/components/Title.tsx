import type { CSSProperties, ReactNode } from 'react'

type Props = {
  as: 'h1' | 'h2'
  variant?: 'display'
  className?: string
  style?: CSSProperties
  children: ReactNode
}

const config = {
  h1: {
    fontSize: 'var(--h1-desk)',
    className: 'max-xl:text-[90px]! max-md:text-[60px]! max-sm:text-[45px]!',
  },
  h2: {
    fontSize: 'var(--h2-mob)',
    className: '',
  },
  h2display: {
    fontSize: 'var(--title-social)',
    className: '',
  },
}

export default function Title({ as: Tag, variant, className = '', style, children }: Props) {
  const key = Tag === 'h2' && variant === 'display' ? 'h2display' : Tag
  const { fontSize, className: baseClass } = config[key]

  return (
    <Tag className={`${baseClass} ${className}`.trim()} style={{ fontSize, ...style }}>
      {children}
    </Tag>
  )
}
