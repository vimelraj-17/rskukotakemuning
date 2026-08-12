import { siteCopy } from '../data/siteCopy'
import type { PropertyData } from '../types/property'

interface DataOverviewProps {
  data: PropertyData
}

export function DataOverview({ data }: DataOverviewProps) {
  const metrics = [
    { label: siteCopy.dataOverview.countLabels.layouts, value: data.layouts.length },
    { label: siteCopy.dataOverview.countLabels.packages, value: data.packages.length },
    { label: siteCopy.dataOverview.countLabels.units, value: data.units.length },
    { label: siteCopy.dataOverview.countLabels.facilities, value: data.facilities.length },
    {
      label: siteCopy.dataOverview.countLabels.eligibility,
      value: data.eligibilityRequirements.length,
    },
  ]

  return (
    <section className="data-overview" id="data-overview" aria-labelledby="data-overview-title">
      <div className="section-heading">
        <p className="eyebrow">{siteCopy.dataOverview.eyebrow}</p>
        <h2 id="data-overview-title">{siteCopy.dataOverview.title}</h2>
        <p>{siteCopy.dataOverview.description}</p>
      </div>

      <dl className="metric-grid">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
