import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GuidedSelector } from '../components/GuidedSelector'
import { propertyData } from '../data/propertyData'
import { selectionStorageKey } from '../utils/selection'

function renderSelector() {
  return render(<GuidedSelector layouts={propertyData.layouts} packages={propertyData.packages} units={propertyData.units} dataLabel={propertyData.metadata.label} dataNotice={propertyData.metadata.notice} projectName={propertyData.project.name} />)
}

describe('GuidedSelector', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

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

  it('selects available units while reserved units remain visible and disabled', () => {
    renderSelector()
    fireEvent.click(screen.getByRole('radio', { name: /1,000 sq ft layout/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to packages/i }))
    fireEvent.click(screen.getByRole('radio', { name: /Package A Basic/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to units/i }))

    const available = screen.getByRole('radio', { name: /DEMO-B-01-01/i })
    fireEvent.click(available)
    expect(available).toBeChecked()

    fireEvent.change(screen.getByLabelText('Package compatibility'), { target: { value: 'b-basic' } })
    expect(screen.getByRole('radio', { name: /DEMO-B-06-01/i })).toBeDisabled()
    expect(screen.getByText('Reserved', { selector: '.unit-status' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Review selection/i })).toBeDisabled()
  })

  it('filters units and offers a reset when no results match', () => {
    renderSelector()
    fireEvent.click(screen.getByRole('radio', { name: /1,000 sq ft layout/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to packages/i }))
    fireEvent.click(screen.getByRole('radio', { name: /Package A Basic/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to units/i }))
    fireEvent.change(screen.getByLabelText('Level'), { target: { value: '6' } })
    expect(screen.getByRole('heading', { name: /No units match/i })).toBeInTheDocument()
    fireEvent.click(screen.getAllByRole('button', { name: 'Reset filters' })[1]!)
    expect(screen.getByRole('radio', { name: /DEMO-B-01-01/i })).toBeInTheDocument()
  })

  it('clears an incompatible unit and returns to package choice after a layout change', () => {
    renderSelector()
    fireEvent.click(screen.getByRole('radio', { name: /1,000 sq ft layout/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to packages/i }))
    fireEvent.click(screen.getByRole('radio', { name: /Package A Basic/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to units/i }))
    fireEvent.click(screen.getByRole('radio', { name: /DEMO-B-01-01/i }))

    fireEvent.change(screen.getByLabelText('Layout'), { target: { value: 'layout-1080' } })
    expect(screen.getByRole('heading', { name: 'Choose your package' })).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(selectionStorageKey)!)).toMatchObject({ unitId: null })
  })

  it('shows calculated totals and preserves compatible choices while editing', () => {
    window.history.replaceState({}, '', '/?layout=layout-1000&package=a-upgrade&unit=DEMO-B-01-01')
    renderSelector()
    expect(screen.getByRole('heading', { name: 'Your selection summary' })).toBeInTheDocument()
    expect(screen.getByText(/RM\s*288,000/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Change package' }))
    expect(screen.getByRole('radio', { name: /Package A Upgrade/i })).toBeChecked()
    fireEvent.click(screen.getByRole('radio', { name: /Package A Basic/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to units/i }))
    expect(screen.getByRole('radio', { name: /DEMO-B-01-01/i })).toBeChecked()
  })

  it('copies the summary with a validated share URL', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    window.history.replaceState({}, '', '/?layout=layout-1000&package=a-upgrade&unit=DEMO-B-01-01')
    renderSelector()
    fireEvent.click(screen.getByRole('button', { name: 'Copy summary and share link' }))
    await screen.findByText('Summary and share link copied.')
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('layout=layout-1000&package=a-upgrade&unit=DEMO-B-01-01'))
  })

  it('ignores invalid query parameters and falls back safely', () => {
    window.localStorage.setItem(selectionStorageKey, JSON.stringify({ layoutId: 'layout-1000', packageId: 'a-basic', unitId: null }))
    window.history.replaceState({}, '', '/?layout=layout-1000&package=missing&unit=bad')
    renderSelector()
    expect(screen.getByRole('heading', { name: 'Choose your package' })).toBeInTheDocument()
    expect(screen.queryByText('bad')).not.toBeInTheDocument()
  })
})
