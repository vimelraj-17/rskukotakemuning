import { eligibilityRequirements } from './eligibility'
import { facilities } from './facilities'
import { layouts } from './layouts'
import { locationInformation } from './location'
import { packages } from './packages'
import { projectInformation } from './project'
import { demoUnits } from './units.demo'
import type { PropertyData } from '../types/property'
import { assertValidPropertyData } from '../utils/validatePropertyData'

export const propertyData: PropertyData = {
  metadata: {
    mode: 'demo',
    label: 'DEMO DATA',
    notice:
      'Unit IDs, bedroom and bathroom counts, parking details and availability shown in this build are synthetic test records. They are not real inventory and cannot be used to reserve a unit.',
    effectiveAt: null,
  },
  project: projectInformation,
  layouts,
  packages,
  units: demoUnits,
  facilities,
  location: locationInformation,
  eligibilityRequirements,
}

assertValidPropertyData(propertyData)
