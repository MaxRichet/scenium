import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SceneCTA from '@/components/SceneCTA'

vi.mock('@/components/AnimatedBackground', () => ({
  __esModule: true,
  default: () => <div data-testid="animated-background" />,
}))

vi.mock('@/hooks/ButtonAnimation', () => ({
  __esModule: true,
  default: () => {},
}))

const defaultProps = {
  eyebrow: "Prêt à créer quelque chose d'unique ?",
  title: 'Réservez la Chambre Céleste pour votre événement',
  description: 'Mariages, anniversaires, soirées d\'entreprise — notre équipe vous accompagne.',
  cta: { href: '/contact', label: 'Nous contacter' },
}

describe('SceneCTA', () => {
  it('renders the eyebrow text', () => {
    render(<SceneCTA {...defaultProps} />)
    expect(screen.getByText(defaultProps.eyebrow)).toBeInTheDocument()
  })

  it('renders the title', () => {
    render(<SceneCTA {...defaultProps} />)
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<SceneCTA {...defaultProps} />)
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument()
  })

  it('renders the CTA button with the correct href and label', () => {
    render(<SceneCTA {...defaultProps} />)
    const link = screen.getByRole('link', { name: /Nous contacter/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact')
  })
})
