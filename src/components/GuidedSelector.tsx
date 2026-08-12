import { useEffect, useMemo, useState } from 'react'
import type { Layout, PackageDefinition } from '../types/property'
import { formatMyr } from '../utils/formatMyr'
import {
  getCompatibilityReason,
  isPackageCompatible,
  persistSelection,
  readSavedSelection,
} from '../utils/selection'

interface GuidedSelectorProps {
  layouts: readonly Layout[]
  packages: readonly PackageDefinition[]
}

export function GuidedSelector({ layouts, packages }: GuidedSelectorProps) {
  const initial = useMemo(() => readSavedSelection(layouts, packages), [layouts, packages])
  const [step, setStep] = useState<1 | 2>(initial.packageId ? 2 : 1)
  const [layoutId, setLayoutId] = useState<string | null>(initial.layoutId)
  const [packageId, setPackageId] = useState<string | null>(initial.packageId)
  const selectedLayout = layouts.find((item) => item.id === layoutId) ?? null

  useEffect(() => {
    persistSelection({ layoutId, packageId })
  }, [layoutId, packageId])

  function selectLayout(nextLayoutId: string) {
    setLayoutId(nextLayoutId)
    const currentPackage = packages.find((item) => item.id === packageId)
    if (currentPackage && !isPackageCompatible(currentPackage, nextLayoutId)) setPackageId(null)
  }

  function continueToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
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
        ) : (
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
                    <input type="radio" name="package" value={pkg.id} checked={selected} disabled={!compatible} aria-describedby={!compatible ? reasonId : undefined} onChange={() => setPackageId(pkg.id)} />
                    <span className="package-monogram">{pkg.letter}</span><div className="choice-content"><span className="choice-kicker">{pkg.type}</span><h4>{pkg.name}</h4><p className="package-cost">{pkg.upgradeAdditionMyr === 0 ? 'Included in base price' : `+ ${formatMyr(pkg.upgradeAdditionMyr)}`}</p><ul>{pkg.inclusions.map((item) => <li key={item}>{item}</li>)}</ul><p className="compatible-copy">Compatible with {compatibleLayoutNames.join(', ')}</p>{!compatible && <p className="disabled-reason" id={reasonId}>{reason}</p>}</div>
                    <span className="selected-badge">{selected ? 'Selected' : compatible ? 'Select package' : 'Not compatible'}</span>
                  </label>
                )
              })}
            </div>
            <div className="selector-controls"><button className="selector-back" type="button" onClick={() => setStep(1)}><span aria-hidden="true">←</span> Back</button><button className="selector-next" type="button" disabled={!packageId} onClick={continueToContact}>Continue <span aria-hidden="true">→</span></button></div>
          </div>
        )}
      </div>
    </section>
  )
}
