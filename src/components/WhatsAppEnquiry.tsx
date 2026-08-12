import { createWhatsAppUrl, type WhatsAppEnquiry as EnquiryDetails } from '../utils/whatsapp'

interface WhatsAppEnquiryProps {
  phoneNumber: string
  enquiry: EnquiryDetails | null
}

export function WhatsAppEnquiry({ phoneNumber, enquiry }: WhatsAppEnquiryProps) {
  const url = enquiry ? createWhatsAppUrl(phoneNumber, enquiry) : null
  return <div className="whatsapp-enquiry">
    <div><p className="eyebrow eyebrow--light">Final step</p><h4>Confirm this selection on WhatsApp.</h4><p>No personal information is collected or stored by this website.</p></div>
    {url ? <a className="button button--gold" href={url} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <span aria-hidden="true">↗</span></a> : <button className="button button--gold" type="button" disabled>Choose a valid unit and package first</button>}
  </div>
}
