export interface WhatsAppEnquiry {
  projectName: string
  unitId: string
  block: string
  level: number
  layoutName: string
  sizeSqFt: number
  packageName: string
  packageType: 'Basic' | 'Upgrade'
  packageLetter: 'A' | 'B' | 'C'
  carParkNumbers: readonly [string, string]
  carParkType: 'Open' | 'Covered'
  carParkOrientation: 'Side-by-side' | 'Tandem'
  estimatedTotalPrice: string
  estimatedMonthlyPayment: string
  configurationUrl?: string
}

export function normalizeWhatsAppNumber(phoneNumber: string): string {
  return phoneNumber.replace(/[\s+-]/g, '')
}

export function createWhatsAppUrl(phoneNumber: string, enquiry: WhatsAppEnquiry): string | null {
  const recipient = normalizeWhatsAppNumber(phoneNumber)
  if (!/^\d+$/.test(recipient) || !enquiry.unitId || !enquiry.packageName) return null
  const message = [
    'Help me lock this unit!',
    '',
    `Project: ${enquiry.projectName}`,
    `Unit Number: ${enquiry.unitId}`,
    `Block and level: Block ${enquiry.block}, Level ${enquiry.level}`,
    `Layout and size: ${enquiry.layoutName}, ${enquiry.sizeSqFt.toLocaleString('en-MY')} sq ft`,
    `Selected package: ${enquiry.packageName}`,
    `PackageType: ${enquiry.packageType}`,
    `Package: ${enquiry.packageLetter}`,
    `Carpark Number: ${enquiry.carParkNumbers.join(' / ')}`,
    `Carpark type: ${enquiry.carParkType}`,
    `Carpark Orientation: ${enquiry.carParkOrientation}`,
    `Estimated total price: ${enquiry.estimatedTotalPrice}`,
    `Estimated monthly mortgage payment: ${enquiry.estimatedMonthlyPayment}`,
    '',
    'Please confirm the current availability and final pricing for this unit.',
    enquiry.configurationUrl ? `Selected configuration: ${enquiry.configurationUrl}` : '',
  ].filter(Boolean).join('\n')
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`
}
