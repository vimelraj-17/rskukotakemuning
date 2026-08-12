import {
  availabilityStatuses,
  type AvailabilityStatus,
  type PropertyData,
} from '../types/property'

export type ValidationErrorCode =
  | 'DUPLICATE_UNIT_ID'
  | 'MISSING_LAYOUT'
  | 'MISSING_PACKAGE'
  | 'INVALID_PRICE'
  | 'INVALID_STATUS'
  | 'INVALID_UNIT_ID'
  | 'INVALID_PARKING_BAY'
  | 'DUPLICATE_PARKING_BAY'
  | 'BROKEN_COMPATIBILITY_REFERENCE'

export interface ValidationError {
  code: ValidationErrorCode
  path: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: readonly ValidationError[]
}

const validStatusSet = new Set<string>(availabilityStatuses)

function isValidPrice(value: number): boolean {
  return Number.isFinite(value) && value > 0
}

export function isAvailabilityStatus(value: unknown): value is AvailabilityStatus {
  return typeof value === 'string' && validStatusSet.has(value)
}

export function validatePropertyData(data: PropertyData): ValidationResult {
  const errors: ValidationError[] = []
  const layoutIds = new Set(data.layouts.map((layout) => layout.id))
  const packageById = new Map(data.packages.map((item) => [item.id, item]))
  const seenUnitIds = new Set<string>()
  const seenParkingBays = new Set<string>()

  data.layouts.forEach((layout, layoutIndex) => {
    if (!isValidPrice(layout.startingPriceMyr)) {
      errors.push({
        code: 'INVALID_PRICE',
        path: `layouts[${layoutIndex}].startingPriceMyr`,
        message: `Layout ${layout.id} must have a positive finite starting price.`,
      })
    }
  })

  data.packages.forEach((item, packageIndex) => {
    const packagePath = `packages[${packageIndex}]`

    if (
      !isValidPrice(item.basePriceMyr) ||
      !Number.isFinite(item.upgradeAdditionMyr) ||
      item.upgradeAdditionMyr < 0 ||
      !isValidPrice(item.totalPriceMyr) ||
      item.totalPriceMyr !== item.basePriceMyr + item.upgradeAdditionMyr
    ) {
      errors.push({
        code: 'INVALID_PRICE',
        path: packagePath,
        message: `Package ${item.id} contains an invalid or inconsistent MYR price.`,
      })
    }

    item.compatibleLayoutIds.forEach((layoutId, layoutIndex) => {
      if (!layoutIds.has(layoutId)) {
        errors.push({
          code: 'MISSING_LAYOUT',
          path: `${packagePath}.compatibleLayoutIds[${layoutIndex}]`,
          message: `Package ${item.id} references missing layout ${layoutId}.`,
        })
      }
    })
  })

  data.units.forEach((unit, unitIndex) => {
    const unitPath = `units[${unitIndex}]`

    if (seenUnitIds.has(unit.id)) {
      errors.push({
        code: 'DUPLICATE_UNIT_ID',
        path: `${unitPath}.id`,
        message: `Unit ID ${unit.id} is duplicated.`,
      })
    }
    seenUnitIds.add(unit.id)

    const unitIdMatch = unit.id.match(/^([BC])-(\d{2})-(\d{2})$/)
    if (!unitIdMatch || unit.block !== unitIdMatch[1] || unit.level !== Number(unitIdMatch[2])) {
      errors.push({
        code: 'INVALID_UNIT_ID',
        path: `${unitPath}.id`,
        message: `Unit ${unit.id} must use current block-level-position numbering that matches its block and level fields.`,
      })
    }

    unit.parking.bayNumbers.forEach((bayNumber, bayIndex) => {
      const bayPath = `${unitPath}.parking.bayNumbers[${bayIndex}]`
      if (!/^(?:G|UG|\d+A?)-(?:CT|CS|OS)-[BC]\d{3}$/.test(bayNumber)) {
        errors.push({
          code: 'INVALID_PARKING_BAY',
          path: bayPath,
          message: `Unit ${unit.id} has invalid current parking bay ${bayNumber}.`,
        })
      }
      if (seenParkingBays.has(bayNumber)) {
        errors.push({
          code: 'DUPLICATE_PARKING_BAY',
          path: bayPath,
          message: `Parking bay ${bayNumber} is allocated more than once.`,
        })
      }
      seenParkingBays.add(bayNumber)
    })

    if (!layoutIds.has(unit.layoutId)) {
      errors.push({
        code: 'MISSING_LAYOUT',
        path: `${unitPath}.layoutId`,
        message: `Unit ${unit.id} references missing layout ${unit.layoutId}.`,
      })
    }

    if (!isValidPrice(unit.basePriceMyr)) {
      errors.push({
        code: 'INVALID_PRICE',
        path: `${unitPath}.basePriceMyr`,
        message: `Unit ${unit.id} must have a positive finite base price.`,
      })
    }

    if (!isAvailabilityStatus(unit.availabilityStatus)) {
      errors.push({
        code: 'INVALID_STATUS',
        path: `${unitPath}.availabilityStatus`,
        message: `Unit ${unit.id} has unsupported status ${String(unit.availabilityStatus)}.`,
      })
    }

    if (unit.compatiblePackageIds.length === 0) {
      errors.push({
        code: 'BROKEN_COMPATIBILITY_REFERENCE',
        path: `${unitPath}.compatiblePackageIds`,
        message: `Unit ${unit.id} must reference at least one compatible package.`,
      })
    }

    unit.compatiblePackageIds.forEach((packageId, packageIndex) => {
      const packageDefinition = packageById.get(packageId)
      const referencePath = `${unitPath}.compatiblePackageIds[${packageIndex}]`

      if (!packageDefinition) {
        errors.push({
          code: 'MISSING_PACKAGE',
          path: referencePath,
          message: `Unit ${unit.id} references missing package ${packageId}.`,
        })
        return
      }

      if (!packageDefinition.compatibleLayoutIds.includes(unit.layoutId)) {
        errors.push({
          code: 'BROKEN_COMPATIBILITY_REFERENCE',
          path: referencePath,
          message: `Package ${packageId} does not support unit ${unit.id}'s layout ${unit.layoutId}.`,
        })
      }

      if (packageDefinition.basePriceMyr !== unit.basePriceMyr) {
        errors.push({
          code: 'BROKEN_COMPATIBILITY_REFERENCE',
          path: referencePath,
          message: `Package ${packageId} and unit ${unit.id} have different base prices.`,
        })
      }
    })
  })

  return { valid: errors.length === 0, errors }
}

export function assertValidPropertyData(data: PropertyData): void {
  const result = validatePropertyData(data)

  if (!result.valid) {
    const summary = result.errors
      .map((error) => `${error.code} at ${error.path}: ${error.message}`)
      .join('\n')

    throw new Error(`Property data validation failed:\n${summary}`)
  }
}
