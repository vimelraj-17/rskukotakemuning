export const availabilityStatuses = [
  'available',
  'held',
  'sold',
  'blocked',
  'unavailable',
  'unknown',
] as const

export type AvailabilityStatus = (typeof availabilityStatuses)[number]
export type DataClassification = 'confirmed'
export type PackageLetter = 'A' | 'B' | 'C'
export type PackageType = 'Basic' | 'Upgrade'
export type CarParkType = 'Open' | 'Covered'
export type CarParkOrientation = 'Side-by-side' | 'Tandem'
export type UnitPosition = 'Corner' | 'Intermediate' | 'Unknown'

export interface ProjectInformation {
  id: string
  name: string
  shortName: string
  phaseLabel: string
  brandMark: string
  primaryLanguage: 'English'
  currency: 'MYR'
  whatsAppNumber: string
  hosting: 'GitHub Pages'
  customDomain: string | null
  classification: DataClassification
}

export interface Layout {
  id: string
  name: string
  sizeSqFt: number
  bedrooms: number | null
  bathrooms: number | null
  planAsset: string | null
  features: readonly string[]
  startingPriceMyr: number
  classification: DataClassification
}

export interface PackageDefinition {
  id: string
  letter: PackageLetter
  type: PackageType
  name: string
  basePriceMyr: number
  upgradeAdditionMyr: number
  totalPriceMyr: number
  compatibleLayoutIds: readonly string[]
  inclusions: readonly string[]
  classification: DataClassification
}

export interface PlanCoordinates {
  x: number
  y: number
  width: number
  height: number
}

export interface ParkingDetails {
  bayNumbers: readonly [string, string]
  level: string
  type: CarParkType
  orientation: CarParkOrientation
}

export interface Unit {
  id: string
  block: string
  level: number
  positionOrStack: UnitPosition | string
  layoutId: string
  sizeSqFt: number
  bedrooms: number
  bathrooms: number
  basePriceMyr: number
  compatiblePackageIds: readonly string[]
  parking: ParkingDetails
  availabilityStatus: AvailabilityStatus
  planCoordinates?: PlanCoordinates
  classification: DataClassification
}

export interface Facility {
  id: string
  name: string
  category: 'Indoor' | 'Outdoor' | 'Service' | 'Other'
  description: string | null
  classification: DataClassification
}

export interface LocationInformation {
  marketingArea: string
  address: string | null
  latitude: number | null
  longitude: number | null
  nearbyPlaces: readonly {
    id: string
    name: string
    distanceLabel: string | null
  }[]
  classification: DataClassification
}

export interface EligibilityRequirement {
  id: string
  title: string
  description: string
  sourceLabel: string
  classification: DataClassification
}

export interface DatasetMetadata {
  mode: 'production'
  label: string
  notice: string
  effectiveAt: string | null
}

export interface PropertyData {
  metadata: DatasetMetadata
  project: ProjectInformation
  layouts: readonly Layout[]
  packages: readonly PackageDefinition[]
  units: readonly Unit[]
  facilities: readonly Facility[]
  location: LocationInformation
  eligibilityRequirements: readonly EligibilityRequirement[]
}
