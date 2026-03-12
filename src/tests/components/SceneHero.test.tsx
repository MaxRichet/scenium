import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SceneHero from '@/components/SceneHero'

describe('SceneHero', () => {
  it('renders the image with the correct src and alt', () => {
    render(<SceneHero src="/scenes/chambre-celeste/hero.png" alt="Chambre Céleste" />)
    const img = screen.getByRole('img', { name: 'Chambre Céleste' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/scenes/chambre-celeste/hero.png')
  })

  it('renders as a section', () => {
    const { container } = render(<SceneHero src="/test.png" alt="Test" />)
    expect(container.querySelector('section')).toBeInTheDocument()
  })
})
