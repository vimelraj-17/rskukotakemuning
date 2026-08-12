import type { Unit } from '../types/property'

/**
 * DEMO DATA ONLY.
 * These records are intentionally synthetic and must never be interpreted as
 * current inventory, availability or official parking allocations.
 */
export const demoUnits: readonly Unit[] = [
  {
    id: 'DEMO-B-01-01',
    block: 'B',
    level: 1,
    positionOrStack: 'Corner',
    layoutId: 'layout-1000',
    sizeSqFt: 1000,
    bedrooms: 3,
    bathrooms: 2,
    basePriceMyr: 250000,
    compatiblePackageIds: ['a-basic', 'a-upgrade'],
    parking: {
      bayNumbers: ['DEMO-P1', 'DEMO-P2'],
      level: 'DEMO LEVEL',
      type: 'Open',
      orientation: 'Tandem',
    },
    availabilityStatus: 'unknown',
    planCoordinates: { x: 0.05, y: 0.12, width: 0.08, height: 0.06 },
    classification: 'demo',
  },
  {
    id: 'DEMO-B-06-01',
    block: 'B',
    level: 6,
    positionOrStack: 'Intermediate',
    layoutId: 'layout-1000',
    sizeSqFt: 1000,
    bedrooms: 3,
    bathrooms: 2,
    basePriceMyr: 275000,
    compatiblePackageIds: ['b-basic', 'b-upgrade'],
    parking: {
      bayNumbers: ['DEMO-P3', 'DEMO-P4'],
      level: 'DEMO LEVEL',
      type: 'Covered',
      orientation: 'Side-by-side',
    },
    availabilityStatus: 'unknown',
    classification: 'demo',
  },
  {
    id: 'DEMO-C-01-01',
    block: 'C',
    level: 1,
    positionOrStack: 'Corner',
    layoutId: 'layout-1080',
    sizeSqFt: 1080,
    bedrooms: 3,
    bathrooms: 2,
    basePriceMyr: 290000,
    compatiblePackageIds: ['c-basic', 'c-upgrade'],
    parking: {
      bayNumbers: ['DEMO-P5', 'DEMO-P6'],
      level: 'DEMO LEVEL',
      type: 'Covered',
      orientation: 'Tandem',
    },
    availabilityStatus: 'unknown',
    classification: 'demo',
  },
]
