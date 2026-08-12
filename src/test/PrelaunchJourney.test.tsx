import { fireEvent, render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../App'
import { selectionStorageKey } from '../utils/selection'

function getWhatsAppMessage() {
  const link = screen.getByRole('link', { name: /Enquire on WhatsApp/i })
  const url = new URL(link.getAttribute('href')!)
  return { link, url, message: decodeURIComponent(url.searchParams.get('text')!) }
}

describe('pre-launch visitor journey', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

  it('completes, restores and shares a valid property selection', () => {
    const firstRender = render(<App />)

    // Landing page and project information.
    expect(screen.getByRole('heading', { level: 1, name: 'A considered place to call home.' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Designed around everyday living.' })).toBeInTheDocument()
    expect(screen.getByText('1,000–1,080')).toBeInTheDocument()

    // Layout and compatible package.
    fireEvent.click(screen.getByRole('radio', { name: /1,000 sq ft layout/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to packages/i }))
    expect(screen.getByRole('radio', { name: /Package C Basic/i })).toBeDisabled()
    fireEvent.click(screen.getByRole('radio', { name: /Package A Upgrade/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to units/i }))

    // Phone-friendly filters and available-unit selection.
    fireEvent.change(screen.getByLabelText('Block'), { target: { value: 'B' } })
    fireEvent.change(screen.getByLabelText('Maximum price'), { target: { value: '250000' } })
    fireEvent.change(screen.getByLabelText('Availability'), { target: { value: 'available' } })
    const availableUnit = screen.getByRole('radio', { name: /DEMO-B-01-01/i })
    expect(availableUnit).toBeEnabled()
    fireEvent.click(availableUnit)
    fireEvent.click(screen.getByRole('button', { name: /Review selection/i }))

    // Canonical summary and adjusted calculator.
    expect(screen.getByRole('heading', { name: 'Your selection summary' })).toBeInTheDocument()
    const totalRow = screen.getByText('Estimated total').closest('div')!
    const summaryTotal = within(totalRow).getByText(/RM\s*288,000/).textContent
    fireEvent.change(screen.getByLabelText('Property price (MYR)'), { target: { value: '260000' } })
    fireEvent.change(screen.getByLabelText('Annual interest rate (%)'), { target: { value: '5' } })
    expect(screen.getByText(/RM\s*298,000/)).toBeInTheDocument()

    // Generated WhatsApp action opens safely and matches the canonical summary.
    const enquiry = getWhatsAppMessage()
    expect(enquiry.url.origin + enquiry.url.pathname).toBe('https://wa.me/60172062979')
    expect(enquiry.link).toHaveAttribute('target', '_blank')
    expect(enquiry.link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(enquiry.message).toContain(`Estimated total price: ${summaryTotal}`)
    expect(enquiry.message).toContain('Unit ID: DEMO-B-01-01')
    expect(enquiry.message).toContain('Package A Upgrade')
    expect(enquiry.message).toContain('Please confirm the current availability')

    const storedSelection = JSON.parse(window.localStorage.getItem(selectionStorageKey)!)
    expect(storedSelection).toEqual({ layoutId: 'layout-1000', packageId: 'a-upgrade', unitId: 'DEMO-B-01-01' })

    // Refresh restores the selection from local storage.
    firstRender.unmount()
    const refreshed = render(<App />)
    expect(screen.getByRole('heading', { name: 'Your selection summary' })).toBeInTheDocument()
    expect(screen.getByText('DEMO-B-01-01')).toBeInTheDocument()

    // A clean browser can open the validated shared configuration URL.
    const configurationLine = getWhatsAppMessage().message.split('\n').find((line) => line.startsWith('Selected configuration: '))!
    const sharedUrl = new URL(configurationLine.replace('Selected configuration: ', ''))
    refreshed.unmount()
    window.localStorage.clear()
    window.history.replaceState({}, '', `${sharedUrl.pathname}${sharedUrl.search}`)
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Your selection summary' })).toBeInTheDocument()
    expect(screen.getByText('DEMO-B-01-01')).toBeInTheDocument()
    expect(screen.getByText('Package A Upgrade')).toBeInTheDocument()
  })

  it('keeps a sold unit visible but impossible to select', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('radio', { name: /1,080 sq ft layout/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to packages/i }))
    fireEvent.click(screen.getByRole('radio', { name: /Package C Basic/i }))
    fireEvent.click(screen.getByRole('button', { name: /Continue to units/i }))

    const soldUnit = screen.getByRole('radio', { name: /DEMO-C-01-01/i })
    expect(soldUnit).toBeVisible()
    expect(soldUnit).toBeDisabled()
    expect(soldUnit).not.toBeChecked()
    expect(screen.getByRole('button', { name: /Review selection/i })).toBeDisabled()
  })
})
