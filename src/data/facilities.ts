import type { Facility } from '../types/property'

export const facilities: readonly Facility[] = [
  {
    id: 'gym',
    name: 'Gym',
    category: 'Indoor',
    description: 'Indoor exercise space shown in the project plans.',
    classification: 'confirmed',
  },
  {
    id: 'multipurpose-hall',
    name: 'Multipurpose hall',
    category: 'Indoor',
    description: 'Shared hall shown between Blocks B and C.',
    classification: 'confirmed',
  },
]
