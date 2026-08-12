import { eligibilityRequirements } from './eligibility'
import { facilities } from './facilities'
import { layouts } from './layouts'
import { locationInformation } from './location'
import { packages } from './packages'
import { projectInformation } from './project'
import { units } from './units'
import type { PropertyData } from '../types/property'
import { assertValidPropertyData } from '../utils/validatePropertyData'

export const propertyData: PropertyData = {
  metadata: {
    mode: 'production',
    label: 'Availability as at 23 July 2026',
    notice:
      'The 79 listed units are reconciled with the current unit-number allocation and car park plans. Availability and final pricing must still be confirmed by an authorised representative.',
    effectiveAt: '2026-07-23',
  },
  project: projectInformation,
  layouts,
  packages,
  units,
  facilities,
  location: locationInformation,
  eligibilityRequirements,
}

assertValidPropertyData(propertyData)
