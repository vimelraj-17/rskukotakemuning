export interface WhatsAppEnquiry {
  projectName: string
  unitId: string
  block: string
  level: number
  layoutName: string
  sizeSqFt: number
  packageName: string
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
    `Enquiry for ${enquiry.projectName}`,
    '',
    `Unit ID: ${enquiry.unitId}`,
    `Block and level: Block ${enquiry.block}, Level ${enquiry.level}`,
    `Layout and size: ${enquiry.layoutName}, ${enquiry.sizeSqFt.toLocaleString('en-MY')} sq ft`,
    `Selected package: ${enquiry.packageName}`,
    `Estimated total price: ${enquiry.estimatedTotalPrice}`,
    `Estimated monthly mortgage payment: ${enquiry.estimatedMonthlyPayment}`,
    '',
    'Please confirm the current availability and final pricing for this unit.',
    enquiry.configurationUrl ? `Selected configuration: ${enquiry.configurationUrl}` : '',
  ].filter(Boolean).join('\n')
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`
}
