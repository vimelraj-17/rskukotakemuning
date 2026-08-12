export interface MortgageInputs {
  propertyPrice: number
  packagePrice: number
  loanMarginPercent: number
  annualInterestRatePercent: number
  tenureYears: number
}

export interface MortgageEstimate {
  totalPurchasePrice: number
  loanAmount: number
  downPayment: number
  monthlyPayment: number
  totalInterest: number
}

export function calculateMortgage(inputs: MortgageInputs): MortgageEstimate | null {
  const values = Object.values(inputs)
  if (values.some((value) => !Number.isFinite(value))) return null
  if (inputs.propertyPrice < 0 || inputs.packagePrice < 0) return null
  if (inputs.loanMarginPercent < 0 || inputs.loanMarginPercent > 100) return null
  if (inputs.annualInterestRatePercent < 0 || inputs.annualInterestRatePercent > 100) return null
  if (inputs.tenureYears <= 0 || inputs.tenureYears > 50) return null

  const totalPurchasePrice = inputs.propertyPrice + inputs.packagePrice
  const loanAmount = totalPurchasePrice * inputs.loanMarginPercent / 100
  const downPayment = totalPurchasePrice - loanAmount
  const numberOfPayments = Math.round(inputs.tenureYears * 12)
  const monthlyRate = inputs.annualInterestRatePercent / 100 / 12
  const monthlyPayment = monthlyRate === 0
    ? loanAmount / numberOfPayments
    : loanAmount * monthlyRate * (1 + monthlyRate) ** numberOfPayments /
      ((1 + monthlyRate) ** numberOfPayments - 1)
  const totalInterest = monthlyPayment * numberOfPayments - loanAmount

  return { totalPurchasePrice, loanAmount, downPayment, monthlyPayment, totalInterest }
}

export function parseMortgageInput(value: string): number {
  return value.trim() === '' ? Number.NaN : Number(value)
}
