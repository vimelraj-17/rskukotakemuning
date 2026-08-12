import type { Layout, PackageDefinition, Unit } from '../types/property'
import { formatMyr } from '../utils/formatMyr'

interface SelectionSummaryProps {
  projectName: string
  layout: Layout
  packageDefinition: PackageDefinition
  unit: Unit
  onEditLayout: () => void
  onEditPackage: () => void
  onEditUnit: () => void
  onCopy: () => void
  copyStatus: string
}

export function SelectionSummary({ projectName, layout, packageDefinition: pkg, unit, onEditLayout, onEditPackage, onEditUnit, onCopy, copyStatus }: SelectionSummaryProps) {
  const total = unit.basePriceMyr + pkg.upgradeAdditionMyr
  const status = unit.availabilityStatus === 'held' ? 'Reserved' : unit.availabilityStatus.charAt(0).toUpperCase() + unit.availabilityStatus.slice(1)
  return <div className="selector-step summary-step" aria-labelledby="summary-title">
    <div><span>Step 4 of 4</span><h3 id="summary-title">Your selection summary</h3><p>{projectName}</p></div>
    <div className="summary-grid">
      <section><div className="summary-heading"><h4>Home</h4><button type="button" onClick={onEditUnit}>Change unit</button></div><dl><div><dt>Unit ID</dt><dd>{unit.id}</dd></div><div><dt>Block and level</dt><dd>Block {unit.block}, Level {unit.level}</dd></div><div><dt>Layout</dt><dd>{layout.name}</dd></div><div><dt>Size</dt><dd>{unit.sizeSqFt.toLocaleString('en-MY')} sq ft</dd></div><div><dt>Bedrooms and bathrooms</dt><dd>{unit.bedrooms} bedrooms, {unit.bathrooms} bathrooms</dd></div><div><dt>Availability</dt><dd>{status}</dd></div></dl><button className="summary-edit" type="button" onClick={onEditLayout}>Change layout</button></section>
      <section><div className="summary-heading"><h4>Package</h4><button type="button" onClick={onEditPackage}>Change package</button></div><p><strong>{pkg.name}</strong></p><ul>{pkg.inclusions.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section><h4>Parking</h4><dl><div><dt>Bay numbers</dt><dd>{unit.parking.bayNumbers.join(' / ')}</dd></div><div><dt>Parking level</dt><dd>{unit.parking.level}</dd></div><div><dt>Type</dt><dd>{unit.parking.type}</dd></div><div><dt>Orientation</dt><dd>{unit.parking.orientation}</dd></div></dl></section>
      <section className="price-summary"><h4>Estimated price</h4><dl><div><dt>Base price</dt><dd>{formatMyr(unit.basePriceMyr)}</dd></div><div><dt>Package cost</dt><dd>{formatMyr(pkg.upgradeAdditionMyr)}</dd></div><div className="summary-total"><dt>Estimated total</dt><dd>{formatMyr(total)}</dd></div></dl></section>
    </div>
    <aside className="confirmation-notice"><strong>Confirmation required</strong><p>Availability and final pricing must be confirmed by an authorised representative.</p></aside>
    <div className="summary-actions"><button className="selector-next" type="button" onClick={onCopy}>Copy summary and share link</button><span role="status" aria-live="polite">{copyStatus}</span></div>
  </div>
}
