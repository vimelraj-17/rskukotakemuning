import { describe, expect, it } from 'vitest'
import { units } from '../data/units'
import { emptyUnitFilters, filterUnits, isUnitSelectable } from '../utils/filterUnits'

describe('unit filtering', () => {
  it('applies the chosen layout, package, block, level, price, position and status', () => {
    const results = filterUnits(units, 'layout-1000', 'a-upgrade', {
      ...emptyUnitFilters,
      block: 'B', level: '1', maxPrice: '250000', position: 'Corner', availability: 'available',
    })
    expect(results.map((unit) => unit.id)).toEqual(['B-01-08', 'B-01-15'])
  })

  it('allows only available inventory to be selected', () => {
    expect(isUnitSelectable(units[0]!)).toBe(true)
    expect(isUnitSelectable({ ...units[0]!, availabilityStatus: 'held' })).toBe(false)
    expect(isUnitSelectable({ ...units[0]!, availabilityStatus: 'sold' })).toBe(false)
  })
})
