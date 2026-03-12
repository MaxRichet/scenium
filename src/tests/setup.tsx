import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock GSAP as it's not useful in JSDOM tests
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

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element
    const { fill, ...rest } = props;
    return <img {...rest} data-fill={fill ? "true" : undefined} />
  },
}))
