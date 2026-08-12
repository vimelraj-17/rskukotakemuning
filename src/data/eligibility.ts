import type { EligibilityRequirement } from '../types/property'

export const eligibilityRequirements: readonly EligibilityRequirement[] = [
  {
    id: 'malaysian-citizen',
    title: 'Malaysian citizen',
    description: 'The applicant is a Malaysian citizen.',
    sourceLabel: 'Owner-approved English translation of Eligibility Check.png',
    classification: 'confirmed',
  },
  {
    id: 'minimum-age',
    title: 'At least 18 years old',
    description: 'The applicant is 18 years of age or older.',
    sourceLabel: 'Owner-approved English translation of Eligibility Check.png',
    classification: 'confirmed',
  },
  {
    id: 'household-income',
    title: 'Household income limit',
    description: 'Monthly household income does not exceed RM14,500.',
    sourceLabel: 'Owner-approved English translation of Eligibility Check.png',
    classification: 'confirmed',
  },
  {
    id: 'selangor-home-ownership',
    title: 'No home in Selangor',
    description: 'The applicant or spouse does not own a home in Selangor.',
    sourceLabel: 'Owner-approved English translation of Eligibility Check.png',
    classification: 'confirmed',
  },
  {
    id: 'lphs-registration',
    title: 'LPHS registration',
    description: 'The applicant is registered with LPHS.',
    sourceLabel: 'Owner-approved English translation of Eligibility Check.png',
    classification: 'confirmed',
  },
]
