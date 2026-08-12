import type { EligibilityRequirement } from '../types/property'

// English working translations of the supplied Malay-language marketing
// graphic. Current LPHS authority, effective date and legal approval are pending.
export const eligibilityRequirements: readonly EligibilityRequirement[] = [
  {
    id: 'malaysian-citizen',
    title: 'Malaysian citizen',
    description: 'The applicant is a Malaysian citizen.',
    sourceLabel: 'Eligibility Check.png — working translation',
    classification: 'pending-approval',
  },
  {
    id: 'minimum-age',
    title: 'At least 18 years old',
    description: 'The applicant is 18 years of age or older.',
    sourceLabel: 'Eligibility Check.png — working translation',
    classification: 'pending-approval',
  },
  {
    id: 'household-income',
    title: 'Household income limit',
    description: 'Monthly household income does not exceed RM14,500.',
    sourceLabel: 'Eligibility Check.png — working translation',
    classification: 'pending-approval',
  },
  {
    id: 'selangor-home-ownership',
    title: 'No home in Selangor',
    description: 'The applicant or spouse does not own a home in Selangor.',
    sourceLabel: 'Eligibility Check.png — working translation',
    classification: 'pending-approval',
  },
  {
    id: 'lphs-registration',
    title: 'LPHS registration',
    description: 'The applicant is registered with LPHS.',
    sourceLabel: 'Eligibility Check.png — working translation',
    classification: 'pending-approval',
  },
]
