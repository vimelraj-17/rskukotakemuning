import { render, screen } from '@testing-library/react'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
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
    expect(screen.getByRole('heading', { name: 'Connected from Kota Kemuning.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'A preliminary Rumah Selangorku check.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Let’s find the right home for you.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Start your selection/ })).toHaveAttribute('href', '#select-home')
  })

  it('exposes useful image alternatives for approved media', () => {
    render(<App />)

    expect(screen.getByAltText(/residential towers and landscaped entrance/)).toHaveAttribute('src', '/images/facade-hero.webp')
    expect(screen.getByAltText(/central facilities building/)).toHaveAttribute('loading', 'lazy')
    expect(screen.getByAltText(/Project location diagram/)).toHaveAttribute('loading', 'lazy')
    expect(screen.getByAltText(/Typical 1,000 sq ft floor plan with three bedrooms/)).toHaveAttribute('loading', 'lazy')
    expect(screen.getByAltText(/residential towers and landscaped entrance/)).toHaveAttribute('width', '1440')
    expect(screen.getByAltText(/central facilities building/)).toHaveAttribute('height', '810')
  })

  it('keeps navigation and workflow controls keyboard reachable', () => {
    render(<App />)
    const menu = screen.getByRole('button', { name: 'Menu' })
    menu.focus()
    expect(menu).toHaveFocus()
    expect(screen.getByRole('radio', { name: /1,000 sq ft layout/i })).toHaveAccessibleName()
    expect(screen.getByRole('button', { name: /Continue to packages/i })).toBeDisabled()
  })

  it('has no broken internal section links or bundled image references', () => {
    render(<App />)

    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      const target = link.getAttribute('href')!
      expect(document.querySelector(target), `${target} should resolve to an element`).not.toBeNull()
    })

    document.querySelectorAll<HTMLImageElement>('img[src]').forEach((image) => {
      const pathname = new URL(image.src).pathname.replace(/^\/rskukotakemuning\//, '/')
      expect(existsSync(resolve('public', pathname.replace(/^\//, ''))), `${pathname} should exist`).toBe(true)
    })
  })
})
