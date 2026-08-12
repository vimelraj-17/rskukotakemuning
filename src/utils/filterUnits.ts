import type { AvailabilityStatus, Unit, UnitPosition } from '../types/property'

export interface UnitFilters {
  block: string
  level: string
  maxPrice: string
  position: '' | UnitPosition
  availability: '' | AvailabilityStatus
}

export const emptyUnitFilters: UnitFilters = {
  block: '',
  level: '',
  maxPrice: '',
  position: '',
  availability: '',
}

export function filterUnits(
  units: readonly Unit[],
  layoutId: string,
  packageId: string,
  filters: UnitFilters,
): Unit[] {
  const maximum = filters.maxPrice === '' ? null : Number(filters.maxPrice)
  return units.filter((unit) =>
    unit.layoutId === layoutId &&
    unit.compatiblePackageIds.includes(packageId) &&
    (!filters.block || unit.block === filters.block) &&
    (!filters.level || unit.level === Number(filters.level)) &&
    (maximum === null || unit.basePriceMyr <= maximum) &&
    (!filters.position || unit.positionOrStack === filters.position) &&
    (!filters.availability || unit.availabilityStatus === filters.availability),
  )
}

export function isUnitSelectable(unit: Unit): boolean {
  return unit.availabilityStatus === 'available'
}
