import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from '../App'

describe('App', () => {
  it('renders structured project content and an explicit demo-data warning', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Residensi Lestari Fasa 2' }),
    ).toBeInTheDocument()
    expect(screen.getByText('DEMO DATA')).toBeInTheDocument()
    expect(screen.getByText('3', { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(5)
  })
})
