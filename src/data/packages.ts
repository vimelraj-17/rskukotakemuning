import type { PackageDefinition, PackageLetter } from '../types/property'

const packagePricing: Record<
  PackageLetter,
  { basePriceMyr: number; upgradeAdditionMyr: number; layoutId: string }
> = {
  A: { basePriceMyr: 250000, upgradeAdditionMyr: 38000, layoutId: 'layout-1000' },
  B: { basePriceMyr: 275000, upgradeAdditionMyr: 33000, layoutId: 'layout-1000' },
  C: { basePriceMyr: 290000, upgradeAdditionMyr: 43000, layoutId: 'layout-1080' },
}

const basicInclusions = [
  'TV cabinet and television',
  'Kitchen cabinet and refrigerator',
  'Three wardrobes',
  'Three air-conditioning units',
  'Two water heaters',
] as const

const upgradeInclusions: Record<PackageLetter, readonly string[]> = {
  A: ['Premium finish', 'Larger kitchen cabinetry', 'Full-height wardrobes'],
  B: ['Premium finish', 'Larger kitchen cabinetry', 'Full-height wardrobes'],
  C: ['Premium finish', 'Wet and dry kitchen cabinetry', 'Kitchen island and upgraded appliances'],
}

export const packages: readonly PackageDefinition[] = (
  Object.entries(packagePricing) as [PackageLetter, (typeof packagePricing)[PackageLetter]][]
).flatMap(([letter, pricing]) => [
  {
    id: `${letter.toLowerCase()}-basic`,
    letter,
    type: 'Basic',
    name: `Package ${letter} Basic`,
    basePriceMyr: pricing.basePriceMyr,
    upgradeAdditionMyr: 0,
    totalPriceMyr: pricing.basePriceMyr,
    compatibleLayoutIds: [pricing.layoutId],
    inclusions: basicInclusions,
    classification: 'pending-approval',
  },
  {
    id: `${letter.toLowerCase()}-upgrade`,
    letter,
    type: 'Upgrade',
    name: `Package ${letter} Upgrade`,
    basePriceMyr: pricing.basePriceMyr,
    upgradeAdditionMyr: pricing.upgradeAdditionMyr,
    totalPriceMyr: pricing.basePriceMyr + pricing.upgradeAdditionMyr,
    compatibleLayoutIds: [pricing.layoutId],
    inclusions: [...basicInclusions, ...upgradeInclusions[letter]],
    classification: 'pending-approval',
  },
])
