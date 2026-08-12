import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../App'

describe('App', () => {
  it('renders the temporary foundation homepage and planned journey', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Residensi Lestari Fasa 2' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'The planned visitor journey' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })
})
