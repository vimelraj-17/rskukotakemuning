import { useEffect, useMemo, useState } from 'react'
import type { Layout, PackageDefinition, Unit } from '../types/property'
import { formatMyr } from '../utils/formatMyr'
import { emptyUnitFilters, filterUnits, isUnitSelectable, type UnitFilters } from '../utils/filterUnits'
import { SelectionSummary } from './SelectionSummary'
import {
  createShareUrl,
  getCompatibilityReason,
  isPackageCompatible,
  persistSelection,
  readSavedSelection,
  readSelectionFromSearch,
} from '../utils/selection'

interface GuidedSelectorProps {
  layouts: readonly Layout[]
  packages: readonly PackageDefinition[]
  units: readonly Unit[]
  dataLabel: string
  dataNotice: string
  projectName: string
  whatsAppNumber: string
}

export function GuidedSelector({ layouts, packages, units, dataLabel, dataNotice, projectName, whatsAppNumber }: GuidedSelectorProps) {
  const initial = useMemo(() => readSelectionFromSearch(window.location.search, layouts, packages, units) ?? readSavedSelection(layouts, packages, units), [layouts, packages, units])
  const [step, setStep] = useState<1 | 2 | 3 | 4>(initial.unitId ? 4 : initial.packageId ? 2 : 1)
  const [layoutId, setLayoutId] = useState<string | null>(initial.layoutId)
  const [packageId, setPackageId] = useState<string | null>(initial.packageId)
  const [unitId, setUnitId] = useState<string | null>(initial.unitId)
  const [filters, setFilters] = useState<UnitFilters>(emptyUnitFilters)
  const [copyStatus, setCopyStatus] = useState('')
  const selectedLayout = layouts.find((item) => item.id === layoutId) ?? null
  const selectedPackage = packages.find((item) => item.id === packageId) ?? null
  const selectedUnit = units.find((item) => item.id === unitId) ?? null
  const matchingUnits = layoutId && packageId ? filterUnits(units, layoutId, packageId, filters) : []
  const blocks = [...new Set(units.map((unit) => unit.block))].sort()
  const levels = [...new Set(units.map((unit) => unit.level))].sort((a, b) => a - b)

  useEffect(() => {
    persistSelection({ layoutId, packageId, unitId })
  }, [layoutId, packageId, unitId])

  function selectLayout(nextLayoutId: string) {
    setLayoutId(nextLayoutId)
    setUnitId(null)
    const currentPackage = packages.find((item) => item.id === packageId)
    if (currentPackage && !isPackageCompatible(currentPackage, nextLayoutId)) {
      setPackageId(null)
      if (step === 3) setStep(2)
    }
  }

  function selectPackage(nextPackageId: string) {
    setPackageId(nextPackageId)
    const currentUnit = units.find((item) => item.id === unitId)
    if (currentUnit && !currentUnit.compatiblePackageIds.includes(nextPackageId)) setUnitId(null)
  }

  function updateFilter<Key extends keyof UnitFilters>(key: Key, value: UnitFilters[Key]) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  async function copySummary() {
    if (!selectedLayout || !selectedPackage || !selectedUnit) return
    const total = selectedUnit.basePriceMyr + selectedPackage.upgradeAdditionMyr
    const shareUrl = createShareUrl({ layoutId, packageId, unitId }, window.location)
    const summary = [
      projectName,
      `Unit: ${selectedUnit.id}`,
      `Block ${selectedUnit.block}, Level ${selectedUnit.level}`,
      `Layout: ${selectedLayout.name}`,
      `Package: ${selectedPackage.name}`,
      `Estimated total: ${formatMyr(total)}`,
      `Parking: ${selectedUnit.parking.bayNumbers.join(' / ')}`,
      shareUrl,
    ].join('\n')
    try {
      await navigator.clipboard.writeText(summary)
      setCopyStatus('Summary and share link copied.')
    } catch {
      setCopyStatus('Copy failed. Please copy the page URL from your browser.')
    }
  }

  return (
    <section className="selector-section" id="select-home" aria-labelledby="selector-title">
      <div className="selector-shell">
        <header className="selector-heading">
          <p className="eyebrow">Guided selection</p>
          <h2 id="selector-title">Build your preferred home.</h2>
          <p>Choose a layout, then compare only the furnishing packages that work with it.</p>
        </header>

        <ol className="step-indicator" aria-label="Selection progress">
          <li aria-current={step === 1 ? 'step' : undefined} data-complete={Boolean(layoutId)}><span>1</span> Layout</li>
          <li aria-current={step === 2 ? 'step' : undefined} data-complete={Boolean(packageId)}><span>2</span> Package</li>
          <li aria-current={step === 3 ? 'step' : undefined} data-complete={Boolean(unitId)}><span>3</span> Unit</li>
          <li aria-current={step === 4 ? 'step' : undefined} data-complete={step === 4}><span>4</span> Summary</li>
        </ol>

        {step === 1 ? (
          <div className="selector-step" aria-labelledby="layout-step-title">
            <div><span>Step 1 of 2</span><h3 id="layout-step-title">Choose your layout</h3></div>
            <div className="choice-grid choice-grid--layouts" role="radiogroup" aria-label="Available layouts">
              {layouts.map((layout) => {
                const selected = layout.id === layoutId
                return (
                  <label className="choice-card layout-choice" data-selected={selected} key={layout.id}>
                    <input type="radio" name="layout" value={layout.id} checked={selected} onChange={() => selectLayout(layout.id)} />
                    <div className="selector-placeholder" role="img" aria-label={`${layout.name} plan image pending approval`}><span>{layout.sizeSqFt.toLocaleString('en-MY')}</span><small>sq ft plan</small></div>
                    <div className="choice-content"><span className="choice-kicker">{layout.name}</span><h4>{layout.sizeSqFt.toLocaleString('en-MY')} sq ft</h4><dl><div><dt>Bedrooms</dt><dd>{layout.bedrooms ?? 'TBC'}</dd></div><div><dt>Bathrooms</dt><dd>{layout.bathrooms ?? 'TBC'}</dd></div></dl><ul>{layout.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><p>From <strong>{formatMyr(layout.startingPriceMyr)}</strong></p></div>
                    <span className="selected-badge">{selected ? 'Selected' : 'Select layout'}</span>
                  </label>
                )
              })}
            </div>
            <div className="selector-controls"><span /><button className="selector-next" type="button" disabled={!layoutId} onClick={() => setStep(2)}>Continue to packages <span aria-hidden="true">→</span></button></div>
          </div>
        ) : step === 2 ? (
          <div className="selector-step" aria-labelledby="package-step-title">
            <div><span>Step 2 of 2</span><h3 id="package-step-title">Choose your package</h3><p>For {selectedLayout?.name}</p></div>
            <div className="choice-grid choice-grid--packages" role="radiogroup" aria-label="Available packages">
              {packages.map((pkg) => {
                const compatible = selectedLayout ? isPackageCompatible(pkg, selectedLayout.id) : false
                const reason = selectedLayout ? getCompatibilityReason(pkg, selectedLayout) : 'Choose a layout first.'
                const selected = pkg.id === packageId
                const reasonId = `${pkg.id}-reason`
                const compatibleLayoutNames = pkg.compatibleLayoutIds.map(
                  (compatibleLayoutId) => layouts.find((layout) => layout.id === compatibleLayoutId)?.name ?? compatibleLayoutId,
                )
                return (
                  <label className="choice-card package-choice" data-selected={selected} data-disabled={!compatible} key={pkg.id}>
                    <input type="radio" name="package" value={pkg.id} checked={selected} disabled={!compatible} aria-describedby={!compatible ? reasonId : undefined} onChange={() => selectPackage(pkg.id)} />
                    <span className="package-monogram">{pkg.letter}</span><div className="choice-content"><span className="choice-kicker">{pkg.type}</span><h4>{pkg.name}</h4><p className="package-cost">{pkg.upgradeAdditionMyr === 0 ? 'Included in base price' : `+ ${formatMyr(pkg.upgradeAdditionMyr)}`}</p><ul>{pkg.inclusions.map((item) => <li key={item}>{item}</li>)}</ul><p className="compatible-copy">Compatible with {compatibleLayoutNames.join(', ')}</p>{!compatible && <p className="disabled-reason" id={reasonId}>{reason}</p>}</div>
                    <span className="selected-badge">{selected ? 'Selected' : compatible ? 'Select package' : 'Not compatible'}</span>
                  </label>
                )
              })}
            </div>
            <div className="selector-controls"><button className="selector-back" type="button" onClick={() => setStep(1)}><span aria-hidden="true">←</span> Back</button><button className="selector-next" type="button" disabled={!packageId} onClick={() => setStep(3)}>Continue to units <span aria-hidden="true">→</span></button></div>
          </div>
        ) : step === 3 ? (
          <div className="selector-step unit-step" aria-labelledby="unit-step-title">
            <div><span>Step 3 of 3</span><h3 id="unit-step-title">Choose your unit</h3><p>{selectedLayout?.name} · {selectedPackage?.name}</p></div>
            <aside className="demo-notice" aria-label={dataLabel}><strong>{dataLabel}</strong><p>{dataNotice}</p></aside>
            <form className="unit-filters" onSubmit={(event) => event.preventDefault()}>
              <label>Block<select value={filters.block} onChange={(event) => updateFilter('block', event.target.value)}><option value="">All blocks</option>{blocks.map((block) => <option key={block}>{block}</option>)}</select></label>
              <label>Level<select value={filters.level} onChange={(event) => updateFilter('level', event.target.value)}><option value="">All levels</option>{levels.map((level) => <option key={level}>{level}</option>)}</select></label>
              <label>Maximum price<select value={filters.maxPrice} onChange={(event) => updateFilter('maxPrice', event.target.value)}><option value="">Any price</option>{[250000, 275000, 290000].map((price) => <option key={price} value={price}>{formatMyr(price)}</option>)}</select></label>
              <label>Position<select value={filters.position} onChange={(event) => updateFilter('position', event.target.value as UnitFilters['position'])}><option value="">Corner or intermediate</option><option>Corner</option><option>Intermediate</option></select></label>
              <label>Layout<select value={layoutId ?? ''} onChange={(event) => selectLayout(event.target.value)}>{layouts.map((layout) => <option key={layout.id} value={layout.id}>{layout.name}</option>)}</select></label>
              <label>Package compatibility<select value={packageId ?? ''} onChange={(event) => selectPackage(event.target.value)}>{packages.filter((pkg) => layoutId && isPackageCompatible(pkg, layoutId)).map((pkg) => <option key={pkg.id} value={pkg.id}>{pkg.name}</option>)}</select></label>
              <label>Availability<select value={filters.availability} onChange={(event) => updateFilter('availability', event.target.value as UnitFilters['availability'])}><option value="">All statuses</option><option value="available">Available</option><option value="held">Reserved</option><option value="sold">Sold</option></select></label>
              <button type="button" onClick={() => setFilters(emptyUnitFilters)}>Reset filters</button>
            </form>
            <p className="result-count" aria-live="polite">{matchingUnits.length} {matchingUnits.length === 1 ? 'unit' : 'units'} shown</p>
            {matchingUnits.length ? <div className="unit-results" role="radiogroup" aria-label="Matching units">{matchingUnits.map((unit) => {
              const selectable = isUnitSelectable(unit)
              const selected = unit.id === unitId
              const statusLabel = unit.availabilityStatus === 'held' ? 'Reserved' : unit.availabilityStatus.charAt(0).toUpperCase() + unit.availabilityStatus.slice(1)
              return <label className="unit-card" data-selected={selected} data-disabled={!selectable} key={unit.id}>
                <input type="radio" name="unit" value={unit.id} checked={selected} disabled={!selectable} onChange={() => setUnitId(unit.id)} />
                <div><span className={`unit-status unit-status--${unit.availabilityStatus}`}>{statusLabel}</span><h4>{unit.id}</h4><dl><div><dt>Level</dt><dd>{unit.level}</dd></div><div><dt>Size</dt><dd>{unit.sizeSqFt.toLocaleString('en-MY')} sq ft</dd></div><div><dt>Price</dt><dd>{formatMyr(unit.basePriceMyr)}</dd></div></dl></div>
                <span className="selected-badge">{selected ? 'Selected' : selectable ? 'Select unit' : `${statusLabel} — unavailable`}</span>
              </label>
            })}</div> : <div className="empty-results"><h4>No units match these filters.</h4><p>Reset the filters or go back to choose another layout and package.</p><button type="button" onClick={() => setFilters(emptyUnitFilters)}>Reset filters</button></div>}
            <div className="selector-controls"><button className="selector-back" type="button" onClick={() => setStep(2)}><span aria-hidden="true">←</span> Back</button><button className="selector-next" type="button" disabled={!unitId} onClick={() => setStep(4)}>Review selection <span aria-hidden="true">→</span></button></div>
          </div>
        ) : selectedLayout && selectedPackage && selectedUnit ? (
          <SelectionSummary projectName={projectName} layout={selectedLayout} packageDefinition={selectedPackage} unit={selectedUnit} onEditLayout={() => setStep(1)} onEditPackage={() => setStep(2)} onEditUnit={() => setStep(3)} onCopy={copySummary} copyStatus={copyStatus} phoneNumber={whatsAppNumber} configurationUrl={createShareUrl({ layoutId, packageId, unitId }, window.location)} />
        ) : null}
      </div>
    </section>
  )
}
