import { describe, expect, it } from 'vitest'
import { propertyData } from '../data/propertyData'
import { createShareUrl, getCompatibilityReason, isPackageCompatible, readSelectionFromSearch, validateSavedSelection } from '../utils/selection'

describe('selection compatibility rules', () => {
  const layout1000 = propertyData.layouts.find((item) => item.id === 'layout-1000')!
  const packageA = propertyData.packages.find((item) => item.id === 'a-basic')!
  const packageC = propertyData.packages.find((item) => item.id === 'c-basic')!

  it('uses package layout references as the compatibility source of truth', () => {
    expect(isPackageCompatible(packageA, layout1000.id)).toBe(true)
    expect(isPackageCompatible(packageC, layout1000.id)).toBe(false)
    expect(getCompatibilityReason(packageC, layout1000)).toMatch(/not offered with 1,000 sq ft layout/)
  })

  it('rejects unknown and incompatible persisted values', () => {
    expect(validateSavedSelection({ layoutId: 'missing', packageId: null }, propertyData.layouts, propertyData.packages)).toBeNull()
    expect(validateSavedSelection({ layoutId: layout1000.id, packageId: packageC.id }, propertyData.layouts, propertyData.packages)).toBeNull()
  })

  it('validates query parameters and creates an encoded share URL', () => {
    expect(readSelectionFromSearch('?layout=layout-1000&package=a-upgrade&unit=B-01-08', propertyData.layouts, propertyData.packages, propertyData.units)).toEqual({ layoutId: 'layout-1000', packageId: 'a-upgrade', unitId: 'B-01-08' })
    expect(readSelectionFromSearch('?layout=layout-1000&package=bad&unit=bad', propertyData.layouts, propertyData.packages, propertyData.units)).toBeNull()
    expect(createShareUrl({ layoutId: 'layout-1000', packageId: 'a-upgrade', unitId: 'B-01-08' }, window.location)).toContain('layout=layout-1000&package=a-upgrade&unit=B-01-08')
  })
})
