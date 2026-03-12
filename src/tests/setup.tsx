import React from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('gsap', () => ({
  default: {
    to: vi.fn(),
    from: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      set: vi.fn().mockReturnThis(),
    })),
    matchMedia: vi.fn(() => ({
      add: vi.fn(),
    })),
  },
  power3: {
    inOut: 'power3.inOut',
  },
}))

vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    const { fill, ...rest } = props;
    return <img {...rest} data-fill={fill ? "true" : undefined} />
  },
}))
