import type { Layout, PackageDefinition } from '../types/property'

export const selectionStorageKey = 'residensi-lestari-selection-v1'

export interface SelectionState {
  layoutId: string | null
  packageId: string | null
}

export function isPackageCompatible(
  packageDefinition: PackageDefinition,
  layoutId: string,
): boolean {
  return packageDefinition.compatibleLayoutIds.includes(layoutId)
}

export function getCompatibilityReason(
  packageDefinition: PackageDefinition,
  layout: Layout,
): string | null {
  if (isPackageCompatible(packageDefinition, layout.id)) return null
  return `${packageDefinition.name} is not offered with ${layout.name}. Choose a compatible package or go back to change the layout.`
}

export function validateSavedSelection(
  value: unknown,
  layouts: readonly Layout[],
  packages: readonly PackageDefinition[],
): SelectionState | null {
  if (!value || typeof value !== 'object') return null
  const candidate = value as Record<string, unknown>
  const layout = layouts.find((item) => item.id === candidate.layoutId)
  if (!layout) return null

  if (candidate.packageId === null || candidate.packageId === undefined) {
    return { layoutId: layout.id, packageId: null }
  }

  const packageDefinition = packages.find((item) => item.id === candidate.packageId)
  if (!packageDefinition || !isPackageCompatible(packageDefinition, layout.id)) return null
  return { layoutId: layout.id, packageId: packageDefinition.id }
}

export function readSavedSelection(
  layouts: readonly Layout[],
  packages: readonly PackageDefinition[],
): SelectionState {
  const empty: SelectionState = { layoutId: null, packageId: null }
  try {
    const raw = window.localStorage.getItem(selectionStorageKey)
    if (!raw) return empty
    const valid = validateSavedSelection(JSON.parse(raw), layouts, packages)
    if (valid) return valid
    window.localStorage.removeItem(selectionStorageKey)
  } catch {
    window.localStorage.removeItem(selectionStorageKey)
  }
  return empty
}

export function persistSelection(selection: SelectionState): void {
  if (!selection.layoutId) {
    window.localStorage.removeItem(selectionStorageKey)
    return
  }
  window.localStorage.setItem(selectionStorageKey, JSON.stringify(selection))
}
