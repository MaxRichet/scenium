import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SceneSpecs from '@/components/sections/SceneSpecs'

vi.mock('@/components/SpotlightCard', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('SceneSpecs', () => {
  it('renders the section heading', () => {
    render(<SceneSpecs />)
    expect(screen.getByText('Fiche technique')).toBeInTheDocument()
    expect(screen.getByText('Caractéristiques')).toBeInTheDocument()
  })

  it('renders all 6 specs', () => {
    render(<SceneSpecs />)
    const labels = ['Structure', 'Revêtement', 'Dimensions', 'Éclairage', 'Installation', 'Accessoires']
    labels.forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renders spec values', () => {
    render(<SceneSpecs />)
    expect(screen.getByText('Aluminium brossé')).toBeInTheDocument()
    expect(screen.getByText('LED réglable')).toBeInTheDocument()
    expect(screen.getByText('2,50 × 2,50 × 2,20 m')).toBeInTheDocument()
  })

  it('renders spec descriptions', () => {
    render(<SceneSpecs />)
    expect(screen.getByText(/Légère et stable/i)).toBeInTheDocument()
    expect(screen.getByText(/Montage en moins de 2h/i)).toBeInTheDocument()
  })
})
