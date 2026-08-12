const myrFormatter = new Intl.NumberFormat('en-MY', {
  style: 'currency',
  currency: 'MYR',
  maximumFractionDigits: 0,
})

export function formatMyr(value: number): string {
  if (!Number.isFinite(value)) {
    throw new TypeError('MYR value must be a finite number.')
  }

  return myrFormatter.format(value)
}
