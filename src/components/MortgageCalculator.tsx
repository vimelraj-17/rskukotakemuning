import { useMemo, useState } from 'react'
import { formatMyr } from '../utils/formatMyr'
import { calculateMortgage, parseMortgageInput } from '../utils/mortgage'
import { WhatsAppEnquiry } from './WhatsAppEnquiry'
import type { WhatsAppEnquiry as EnquiryDetails } from '../utils/whatsapp'

interface MortgageCalculatorProps {
  propertyPrice: number
  packagePrice: number
  phoneNumber: string
  enquiry: Omit<EnquiryDetails, 'estimatedTotalPrice' | 'estimatedMonthlyPayment'>
}

const assumptionsStorageKey = 'residensi-lestari-mortgage-assumptions-v1'

function readAssumptions() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(assumptionsStorageKey) ?? '{}') as Record<string, unknown>
    return {
      loanMargin: typeof saved.loanMargin === 'string' ? saved.loanMargin : '90',
      interestRate: typeof saved.interestRate === 'string' ? saved.interestRate : '4.2',
      tenure: typeof saved.tenure === 'string' ? saved.tenure : '35',
    }
  } catch {
    return { loanMargin: '90', interestRate: '4.2', tenure: '35' }
  }
}

export function MortgageCalculator({ propertyPrice: selectedPropertyPrice, packagePrice: selectedPackagePrice, phoneNumber, enquiry }: MortgageCalculatorProps) {
  const [propertyDraft, setPropertyDraft] = useState({ source: selectedPropertyPrice, value: String(selectedPropertyPrice) })
  const [packageDraft, setPackageDraft] = useState({ source: selectedPackagePrice, value: String(selectedPackagePrice) })
  const [assumptions, setAssumptions] = useState(readAssumptions)
  const { loanMargin, interestRate, tenure } = assumptions
  const propertyPrice = propertyDraft.source === selectedPropertyPrice ? propertyDraft.value : String(selectedPropertyPrice)
  const packagePrice = packageDraft.source === selectedPackagePrice ? packageDraft.value : String(selectedPackagePrice)

  const estimate = useMemo(() => calculateMortgage({
    propertyPrice: parseMortgageInput(propertyPrice),
    packagePrice: parseMortgageInput(packagePrice),
    loanMarginPercent: parseMortgageInput(loanMargin),
    annualInterestRatePercent: parseMortgageInput(interestRate),
    tenureYears: parseMortgageInput(tenure),
  }), [propertyPrice, packagePrice, loanMargin, interestRate, tenure])

  function updateAssumption(key: keyof typeof assumptions, value: string) {
    const next = { ...assumptions, [key]: value }
    setAssumptions(next)
    window.localStorage.setItem(assumptionsStorageKey, JSON.stringify(next))
  }

  return <section className="mortgage-calculator" aria-labelledby="mortgage-title">
    <div className="mortgage-heading"><p className="eyebrow">Financing illustration</p><h3 id="mortgage-title">Estimated mortgage calculator</h3><p>Adjust the assumptions to explore a standard reducing-balance repayment estimate.</p></div>
    <div className="mortgage-layout">
      <form className="mortgage-inputs" onSubmit={(event) => event.preventDefault()}>
        <label>Property price (MYR)<input type="number" min="0" step="1000" inputMode="decimal" value={propertyPrice} onChange={(event) => setPropertyDraft({ source: selectedPropertyPrice, value: event.target.value })} /></label>
        <label>Package price (MYR)<input type="number" min="0" step="1000" inputMode="decimal" value={packagePrice} onChange={(event) => setPackageDraft({ source: selectedPackagePrice, value: event.target.value })} /></label>
        <label>Loan margin (%)<input type="number" min="0" max="100" step="1" inputMode="decimal" value={loanMargin} onChange={(event) => updateAssumption('loanMargin', event.target.value)} /></label>
        <label>Annual interest rate (%)<input type="number" min="0" max="100" step="0.01" inputMode="decimal" value={interestRate} onChange={(event) => updateAssumption('interestRate', event.target.value)} /></label>
        <label>Loan tenure (years)<input type="number" min="1" max="50" step="1" inputMode="numeric" value={tenure} onChange={(event) => updateAssumption('tenure', event.target.value)} /></label>
      </form>
      {estimate ? <dl className="mortgage-results" aria-live="polite"><div><dt>Total estimated purchase price</dt><dd>{formatMyr(estimate.totalPurchasePrice)}</dd></div><div><dt>Loan amount</dt><dd>{formatMyr(estimate.loanAmount)}</dd></div><div><dt>Estimated down payment</dt><dd>{formatMyr(estimate.downPayment)}</dd></div><div className="mortgage-primary"><dt>Estimated monthly payment</dt><dd>{formatMyr(estimate.monthlyPayment)}</dd></div><div><dt>Estimated total interest</dt><dd>{formatMyr(estimate.totalInterest)}</dd></div></dl> : <div className="mortgage-error" role="alert"><strong>Enter valid calculator values.</strong><p>Prices and rates cannot be negative. Loan margin must be 0–100%, and tenure must be 1–50 years.</p></div>}
    </div>
    <aside className="mortgage-disclaimer"><strong>Illustration only — not a loan offer.</strong><p>Bank approval, effective rates, insurance, legal fees and other charges may differ. Confirm all financing terms with an authorised bank or representative.</p></aside>
    <WhatsAppEnquiry phoneNumber={phoneNumber} enquiry={estimate ? { ...enquiry, estimatedTotalPrice: formatMyr(estimate.totalPurchasePrice), estimatedMonthlyPayment: formatMyr(estimate.monthlyPayment) } : null} />
  </section>
}
