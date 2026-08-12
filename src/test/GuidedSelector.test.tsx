import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { GuidedSelector } from '../components/GuidedSelector'
import { propertyData } from '../data/propertyData'
import { selectionStorageKey } from '../utils/selection'

function renderSelector() {
  return render(<GuidedSelector layouts={propertyData.layouts} packages={propertyData.packages} />)
}

describe('GuidedSelector', () => {
  beforeEach(() => window.localStorage.clear())

  it('selects a layout, highlights it and preserves it when moving back', () => {
    renderSelector()
    const layout = screen.getByRole('radio', { name: /1,000 sq ft layout/i })
    const continueButton = screen.getByRole('button', { name: /Continue to packages/i })

    expect(continueButton).toBeDisabled()
    fireEvent.click(layout)
    expect(layout).toBeChecked()
    expect(screen.getByText('Selected')).toBeInTheDocument()
    expect(continueButton).toBeEnabled()

    fireEvent.click(continueButton)
    fireEvent.click(screen.getByRole('button', { name: /Back/i }))
    expect(layout).toBeChecked()
  })

  it('disables incompatible packages, explains why, and selects a compatible package', () => {
    renderSelector()
    fireEvent.click(screen.getByRole('radio', { name: /1,000 sq ft layout/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to packages/i }))

    const incompatible = screen.getByRole('radio', { name: /Package C Basic/i })
    expect(incompatible).toBeDisabled()
    expect(screen.getByText(/Package C Basic is not offered with 1,000 sq ft layout/)).toBeInTheDocument()

    const compatible = screen.getByRole('radio', { name: /Package A Upgrade/i })
    fireEvent.click(compatible)
    expect(compatible).toBeChecked()
    expect(screen.getByRole('button', { name: /^Continue/i })).toBeEnabled()
  })

  it('restores a valid saved choice', () => {
    window.localStorage.setItem(selectionStorageKey, JSON.stringify({ layoutId: 'layout-1080', packageId: 'c-upgrade' }))
    renderSelector()

    expect(screen.getByRole('heading', { name: 'Choose your package' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /Package C Upgrade/i })).toBeChecked()
  })

  it('removes an invalid saved combination', () => {
    window.localStorage.setItem(selectionStorageKey, JSON.stringify({ layoutId: 'layout-1080', packageId: 'a-basic' }))
    renderSelector()

    expect(screen.getByRole('heading', { name: 'Choose your layout' })).toBeInTheDocument()
    expect(window.localStorage.getItem(selectionStorageKey)).toBeNull()
  })
})
