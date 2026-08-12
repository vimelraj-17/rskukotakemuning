import { describe, expect, it } from 'vitest'
import { propertyData } from '../data/propertyData'
import type { PropertyData } from '../types/property'
import {
  assertValidPropertyData,
  validatePropertyData,
} from '../utils/validatePropertyData'

function cloneData(): PropertyData {
  return structuredClone(propertyData)
}

describe('validatePropertyData', () => {
  it('accepts the bundled production dataset', () => {
    expect(validatePropertyData(propertyData)).toEqual({ valid: true, errors: [] })
    expect(() => assertValidPropertyData(propertyData)).not.toThrow()
  })

  it('detects duplicate unit IDs', () => {
    const data = cloneData()
    data.units = [data.units[0]!, { ...data.units[1]!, id: data.units[0]!.id }]

    expect(validatePropertyData(data).errors).toContainEqual(
      expect.objectContaining({ code: 'DUPLICATE_UNIT_ID' }),
    )
  })

  it('detects malformed current unit IDs and parking bay collisions', () => {
    const data = cloneData()
    data.units = [
      { ...data.units[0]!, id: 'B-99-99' },
      {
        ...data.units[1]!,
        parking: {
          ...data.units[1]!.parking,
          bayNumbers: [data.units[0]!.parking.bayNumbers[0], 'BAD-BAY'],
        },
      },
    ]

    const codes = validatePropertyData(data).errors.map((error) => error.code)
    expect(codes).toContain('INVALID_UNIT_ID')
    expect(codes).toContain('DUPLICATE_PARKING_BAY')
    expect(codes).toContain('INVALID_PARKING_BAY')
  })

  it('detects unit and package references to missing layouts', () => {
    const data = cloneData()
    data.units = [{ ...data.units[0]!, layoutId: 'missing-layout' }]
    data.packages = [
      { ...data.packages[0]!, compatibleLayoutIds: ['missing-layout'] },
    ]

    const errors = validatePropertyData(data).errors
    expect(errors.filter((error) => error.code === 'MISSING_LAYOUT')).toHaveLength(2)
  })

  it('detects missing packages', () => {
    const data = cloneData()
    data.units = [
      { ...data.units[0]!, compatiblePackageIds: ['missing-package'] },
    ]

    expect(validatePropertyData(data).errors).toContainEqual(
      expect.objectContaining({ code: 'MISSING_PACKAGE' }),
    )
  })

  it('detects invalid unit and package prices', () => {
    const data = cloneData()
    data.units = [{ ...data.units[0]!, basePriceMyr: 0 }]
    data.packages = [{ ...data.packages[0]!, totalPriceMyr: -1 }]

    expect(
      validatePropertyData(data).errors.filter(
        (error) => error.code === 'INVALID_PRICE',
      ),
    ).toHaveLength(2)
  })

  it('detects invalid layout starting prices', () => {
    const data = cloneData()
    data.layouts = [{ ...data.layouts[0]!, startingPriceMyr: 0 }]

    expect(validatePropertyData(data).errors).toContainEqual(
      expect.objectContaining({ code: 'INVALID_PRICE' }),
    )
  })

  it('detects unsupported availability statuses at runtime', () => {
    const data = cloneData()
    data.units = [
      {
        ...data.units[0]!,
        availabilityStatus: 'reserved' as never,
      },
    ]

    expect(validatePropertyData(data).errors).toContainEqual(
      expect.objectContaining({ code: 'INVALID_STATUS' }),
    )
  })

  it('detects packages that do not support a unit layout', () => {
    const data = cloneData()
    data.units = [
      {
        ...data.units[0]!,
        compatiblePackageIds: ['c-basic'],
      },
    ]

    expect(validatePropertyData(data).errors).toContainEqual(
      expect.objectContaining({ code: 'BROKEN_COMPATIBILITY_REFERENCE' }),
    )
    expect(() => assertValidPropertyData(data)).toThrow(
      'BROKEN_COMPATIBILITY_REFERENCE',
    )
  })

  it('detects an empty package list and a package with a different base price', () => {
    const data = cloneData()
    data.units = [
      { ...data.units[0]!, compatiblePackageIds: [] },
      {
        ...data.units[1]!,
        basePriceMyr: 275000,
        compatiblePackageIds: ['a-basic'],
      },
    ]

    expect(
      validatePropertyData(data).errors.filter(
        (error) => error.code === 'BROKEN_COMPATIBILITY_REFERENCE',
      ),
    ).toHaveLength(2)
  })
})
