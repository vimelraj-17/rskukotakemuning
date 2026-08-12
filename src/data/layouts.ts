import type { Layout } from '../types/property'

export const layouts: readonly Layout[] = [
  {
    id: 'layout-1000',
    name: '1,000 sq ft layout',
    sizeSqFt: 1000,
    bedrooms: 3,
    bathrooms: 2,
    planAsset: 'images/layout-1000.webp',
    features: ['3 bedrooms and 2 bathrooms', 'Balcony and utility yard', 'Packages A and B'],
    startingPriceMyr: 250000,
    classification: 'confirmed',
  },
  {
    id: 'layout-1080',
    name: '1,080 sq ft layout',
    sizeSqFt: 1080,
    bedrooms: 3,
    bathrooms: 2,
    planAsset: 'images/layout-1080.webp',
    features: ['3 bedrooms and 2 bathrooms', 'Larger kitchen and dining area', 'Package C'],
    startingPriceMyr: 290000,
    classification: 'confirmed',
  },
]
