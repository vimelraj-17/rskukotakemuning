export type PackageLetter = 'A' | 'B' | 'C'
export type PackageType = 'Basic' | 'Upgrade'
export type CarParkType = 'Open' | 'Covered'
export type CarParkOrientation = 'Side-by-side' | 'Tandem'

export interface PackagePricing {
  package: PackageLetter
  packageType: PackageType
  basePriceMyr: number
  upgradeAdditionMyr: number
}

export interface CarParkAllocation {
  bayNumbers: readonly [string, string]
  type: CarParkType
  orientation: CarParkOrientation
}

export interface UnitRecord {
  id: string
  block: 'B' | 'C'
  floor: number
  packagePricing: PackagePricing
  carPark: CarParkAllocation
}
