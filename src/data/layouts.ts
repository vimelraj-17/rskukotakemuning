import type { Layout } from '../types/property'

// The supplied furnishing reference identifies three bedrooms and two bathrooms.
// Standalone plan assets and final room specifications still require approval.
export const layouts: readonly Layout[] = [
  {
    id: 'layout-1000',
    name: '1,000 sq ft layout',
    sizeSqFt: 1000,
    bedrooms: 3,
    bathrooms: 2,
    planAsset: null,
    features: ['Practical family-sized layout', 'Packages A and B available'],
    startingPriceMyr: 250000,
    classification: 'pending-approval',
  },
  {
    id: 'layout-1080',
    name: '1,080 sq ft layout',
    sizeSqFt: 1080,
    bedrooms: 3,
    bathrooms: 2,
    planAsset: null,
    features: ['Larger built-up area', 'Package C configuration'],
    startingPriceMyr: 290000,
    classification: 'pending-approval',
  },
]
