import { describe, expect, it } from 'vitest'
import { calculateMortgage, parseMortgageInput } from '../utils/mortgage'

describe('calculateMortgage', () => {
  it('matches a known reducing-balance repayment result', () => {
    const result = calculateMortgage({ propertyPrice: 250000, packagePrice: 38000, loanMarginPercent: 90, annualInterestRatePercent: 4.2, tenureYears: 35 })!
    expect(result.totalPurchasePrice).toBe(288000)
    expect(result.loanAmount).toBe(259200)
    expect(result.downPayment).toBe(28800)
    expect(result.monthlyPayment).toBeCloseTo(1178.97, 2)
    expect(result.totalInterest).toBeCloseTo(235968.42, 2)
  })

  it('handles a zero interest loan', () => {
    const result = calculateMortgage({ propertyPrice: 120000, packagePrice: 0, loanMarginPercent: 100, annualInterestRatePercent: 0, tenureYears: 10 })!
    expect(result.monthlyPayment).toBe(1000)
    expect(result.totalInterest).toBe(0)
  })

  it('handles zero loan margin and boundary values', () => {
    const result = calculateMortgage({ propertyPrice: 100000, packagePrice: 0, loanMarginPercent: 0, annualInterestRatePercent: 100, tenureYears: 50 })!
    expect(result.loanAmount).toBe(0)
    expect(result.downPayment).toBe(100000)
    expect(result.monthlyPayment).toBe(0)
  })

  it('rejects empty, non-finite and out-of-range input', () => {
    expect(parseMortgageInput('')).toBeNaN()
    expect(calculateMortgage({ propertyPrice: Number.NaN, packagePrice: 0, loanMarginPercent: 90, annualInterestRatePercent: 4, tenureYears: 30 })).toBeNull()
    expect(calculateMortgage({ propertyPrice: -1, packagePrice: 0, loanMarginPercent: 90, annualInterestRatePercent: 4, tenureYears: 30 })).toBeNull()
    expect(calculateMortgage({ propertyPrice: 1, packagePrice: 0, loanMarginPercent: 101, annualInterestRatePercent: 4, tenureYears: 30 })).toBeNull()
    expect(calculateMortgage({ propertyPrice: 1, packagePrice: 0, loanMarginPercent: 90, annualInterestRatePercent: -1, tenureYears: 30 })).toBeNull()
    expect(calculateMortgage({ propertyPrice: 1, packagePrice: 0, loanMarginPercent: 90, annualInterestRatePercent: 4, tenureYears: 0 })).toBeNull()
  })
})
