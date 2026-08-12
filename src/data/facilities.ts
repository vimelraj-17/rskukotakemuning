import type { Facility } from '../types/property'

// Names visible in supplied block plans; descriptions and publication wording
// remain subject to project-owner approval.
export const facilities: readonly Facility[] = [
  {
    id: 'gym',
    name: 'Gym',
    category: 'Indoor',
    description: null,
    classification: 'pending-approval',
  },
  {
    id: 'multipurpose-hall',
    name: 'Multipurpose hall',
    category: 'Indoor',
    description: null,
    classification: 'pending-approval',
  },
]
