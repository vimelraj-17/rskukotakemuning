import { describe, expect, it } from 'vitest'
import { demoUnits } from '../data/units.demo'
import { emptyUnitFilters, filterUnits, isUnitSelectable } from '../utils/filterUnits'

describe('unit filtering', () => {
  it('applies the chosen layout, package, block, level, price, position and status', () => {
    const results = filterUnits(demoUnits, 'layout-1000', 'a-basic', {
      ...emptyUnitFilters,
      block: 'B', level: '1', maxPrice: '250000', position: 'Corner', availability: 'available',
    })
    expect(results.map((unit) => unit.id)).toEqual(['DEMO-B-01-01'])
  })

  it('allows only available inventory to be selected', () => {
    expect(isUnitSelectable(demoUnits[0]!)).toBe(true)
    expect(isUnitSelectable(demoUnits[1]!)).toBe(false)
    expect(isUnitSelectable(demoUnits[2]!)).toBe(false)
  })
})
