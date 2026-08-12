export interface JourneySection {
  id: string
  title: string
  description: string
}

export const journeySections: readonly JourneySection[] = [
  {
    id: 'project-information',
    title: 'Project information',
    description: 'Explore verified project facts, layouts and facilities.',
  },
  {
    id: 'packages',
    title: 'Packages',
    description: 'Compare Basic and Upgrade choices across packages A, B and C.',
  },
  {
    id: 'unit-selection',
    title: 'Unit selection',
    description: 'Filter and select from an approved, validated inventory.',
  },
  {
    id: 'selection-summary',
    title: 'Selection summary',
    description: 'Review the exact unit, package and assigned parking details.',
  },
  {
    id: 'mortgage-whatsapp',
    title: 'Estimate and enquire',
    description: 'Explore a mortgage illustration, then continue through WhatsApp.',
  },
] as const
