import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../App'

describe('App', () => {
  it('renders the complete public brochure in an accessible heading order', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'A considered place to call home.' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Designed around everyday living.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Space for the rhythm of home.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Start with the essentials. Upgrade your finish.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Useful amenities, close to home.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Set within the Kota Kemuning area.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'A preliminary Rumah Selangorku check.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Let’s find the right home for you.' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Start a WhatsApp conversation/ })).toBeDisabled()
    expect(screen.queryByRole('link', { name: /Start a WhatsApp conversation/ })).not.toBeInTheDocument()
  })

  it('exposes useful image alternatives and missing-media placeholders', () => {
    render(<App />)

    expect(screen.getByAltText(/residential towers and landscaped entrance/)).toHaveAttribute('src', '/images/facade-hero.webp')
    expect(screen.getByAltText(/central facilities building/)).toHaveAttribute('loading', 'lazy')
    expect(screen.getByRole('img', { name: 'Verified location map coming soon' })).toBeInTheDocument()
  })
})
