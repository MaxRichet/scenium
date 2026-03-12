import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ChambreCelestePage from '@/app/scenes/chambre-celeste/page'

vi.mock('@/components/Masonry', () => ({
  __esModule: true,
  default: () => <div data-testid="masonry" />,
}))

vi.mock('@/components/AnimatedBackground', () => ({
  __esModule: true,
  default: () => <div data-testid="animated-background" />,
}))

vi.mock('@/hooks/ButtonAnimation', () => ({
  __esModule: true,
  default: () => {},
}))

vi.mock('@/components/SceneHero', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <div data-testid="scene-hero" data-src={src} data-alt={alt} />
  ),
}))

vi.mock('@/components/SceneSpecs', () => ({
  __esModule: true,
  default: () => <div data-testid="scene-specs" />,
}))

vi.mock('@/components/SceneCTA', () => ({
  __esModule: true,
  default: ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
    <div data-testid="scene-cta">
      <span>{eyebrow}</span>
      <span>{title}</span>
      <span>{description}</span>
    </div>
  ),
}))

describe('ChambreCelestePage', () => {
  it('renders the hero with correct image', () => {
    render(<ChambreCelestePage />)
    const hero = screen.getByTestId('scene-hero')
    expect(hero).toBeInTheDocument()
    expect(hero).toHaveAttribute('data-src', '/scenes/chambre-celeste/hero.png')
    expect(hero).toHaveAttribute('data-alt', 'Chambre Céleste')
  })

  it('renders the presentation section', () => {
    render(<ChambreCelestePage />)
    expect(screen.getByText(/Qu'est-ce que la/i)).toBeInTheDocument()
    expect(screen.getByText(/Chambre Céleste transforme/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Demander un devis/i })).toBeInTheDocument()
  })

  it('renders the masonry gallery', () => {
    render(<ChambreCelestePage />)
    expect(screen.getByTestId('masonry')).toBeInTheDocument()
  })

  it('renders the specs section', () => {
    render(<ChambreCelestePage />)
    expect(screen.getByTestId('scene-specs')).toBeInTheDocument()
  })

  it('renders the CTA section with correct content', () => {
    render(<ChambreCelestePage />)
    const cta = screen.getByTestId('scene-cta')
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveTextContent(/Réservez la Chambre Céleste/i)
    expect(cta).toHaveTextContent(/Mariages, anniversaires/i)
  })
})
