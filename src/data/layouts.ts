import type { Layout } from '../types/property'

// The two sizes are visible in supplied source material. Bedroom/bathroom counts,
// standalone plans and unit-to-layout mappings still require approval.
export const layouts: readonly Layout[] = [
  {
    id: 'layout-1000',
    name: '1,000 sq ft layout',
    sizeSqFt: 1000,
    bedrooms: null,
    bathrooms: null,
    planAsset: null,
    classification: 'pending-approval',
  },
  {
    id: 'layout-1080',
    name: '1,080 sq ft layout',
    sizeSqFt: 1080,
    bedrooms: null,
    bathrooms: null,
    planAsset: null,
    classification: 'pending-approval',
  },
]
