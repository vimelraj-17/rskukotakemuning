import { describe, expect, it } from 'vitest'
import { createWhatsAppUrl, normalizeWhatsAppNumber } from '../utils/whatsapp'

describe('WhatsApp enquiry URL', () => {
  it('normalizes configured phone formatting', () => {
    expect(normalizeWhatsAppNumber('+60 17-206 2979')).toBe('60172062979')
  })

  it('encodes the complete enquiry safely', () => {
    const url = createWhatsAppUrl('+60 17-206 2979', {
      projectName: 'Residensi Lestari Fasa 2', unitId: 'B-01-01', block: 'B', level: 1,
      layoutName: 'Layout A', sizeSqFt: 1000, packageName: 'Package A Upgrade',
      estimatedTotalPrice: 'RM 288,000', estimatedMonthlyPayment: 'RM 1,179',
      configurationUrl: 'https://example.com/?layout=a&package=b&unit=c',
    })!
    expect(url).toMatch(/^https:\/\/wa\.me\/60172062979\?text=/)
    expect(decodeURIComponent(new URL(url).searchParams.get('text')!)).toContain('Unit ID: B-01-01')
  })

  it('rejects invalid recipients or incomplete selections', () => {
    const details = { projectName: 'Project', unitId: '', block: 'B', level: 1, layoutName: 'A', sizeSqFt: 1, packageName: 'Package', estimatedTotalPrice: 'RM 1', estimatedMonthlyPayment: 'RM 1' }
    expect(createWhatsAppUrl('not-a-phone', details)).toBeNull()
    expect(createWhatsAppUrl('+6017', details)).toBeNull()
  })
})
