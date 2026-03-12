import { useEffect, useState } from 'react'

/**
 * Returns true when window.innerWidth > breakpoint.
 * Safe for SSR — returns false on first render.
 */
export function useBreakpoint(breakpoint: number): boolean {
  const [isAbove, setIsAbove] = useState(false)

  useEffect(() => {
    const check = () => setIsAbove(window.innerWidth > breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])

  return isAbove
}
