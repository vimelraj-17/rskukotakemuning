import { describe, expect, it } from 'vitest'
import { formatMyr } from '../utils/formatMyr'

describe('formatMyr', () => {
  it('formats whole MYR amounts for English Malaysia', () => {
    expect(formatMyr(288000)).toBe('RM\u00a0288,000')
  })

  it('rejects non-finite values', () => {
    expect(() => formatMyr(Number.NaN)).toThrow(TypeError)
  })
})
