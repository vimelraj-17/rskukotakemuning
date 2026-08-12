import { SiteHeader } from './components/SiteHeader'
import { brochureContent as copy } from './data/brochure'
import { propertyData } from './data/propertyData'
import { siteCopy } from './data/siteCopy'
import { formatMyr } from './utils/formatMyr'
import { assetUrl } from './utils/assetUrl'

const whatsAppUrl = `https://wa.me/${propertyData.project.whatsAppNumber.replace('+', '')}`
const basicPackages = propertyData.packages.filter((item) => item.type === 'Basic')
const upgradePackages = propertyData.packages.filter((item) => item.type === 'Upgrade')
const startingPrice = Math.min(...basicPackages.map((item) => item.basePriceMyr))

function Placeholder({ label }: { label: string }) {
  return <div className="media-placeholder" role="img" aria-label={label}><span aria-hidden="true">⌁</span><p>{label}</p></div>
}

export function App() {
  return (
    <div className="site-shell">
      <SiteHeader project={propertyData.project} stageLabel={siteCopy.stageLabel} />
      <main id="main-content">
        <section className="brochure-hero" aria-labelledby="page-title">
          <img src={assetUrl(copy.hero.image)} alt={copy.hero.imageAlt} />
          <div className="hero-shade" />
          <div className="hero-inner">
            <p className="eyebrow eyebrow--light">{copy.hero.eyebrow}</p><h1 id="page-title">{copy.hero.title}</h1><p>{copy.hero.summary}</p>
            <div className="hero-actions"><a className="button button--light" href="#overview">{copy.hero.primaryAction}</a><a className="text-link text-link--light" href="#contact">{copy.hero.secondaryAction} <span aria-hidden="true">→</span></a></div>
          </div>
          <small className="image-caption">{copy.imageDisclaimer}</small>
        </section>

        <section className="price-band" aria-label="Starting price"><div><span>Homes from</span><strong>{formatMyr(startingPrice)}</strong></div><p>Choose from Packages A, B and C, with Basic and Upgrade options.</p><a href="#furnishing">Compare packages <span aria-hidden="true">→</span></a></section>

        <section className="section split-section" id="overview" aria-labelledby="overview-title"><div className="section-heading"><p className="eyebrow">{copy.overview.eyebrow}</p><h2 id="overview-title">{copy.overview.title}</h2></div><p className="section-lead">{copy.overview.body}</p></section>

        <section className="section facts-section" aria-label="Project facts"><dl className="facts-grid">{copy.facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}<small>{fact.suffix}</small></dd></div>)}</dl></section>

        <section className="section" id="layouts" aria-labelledby="layouts-title"><div className="section-heading narrow"><p className="eyebrow">{copy.layouts.eyebrow}</p><h2 id="layouts-title">{copy.layouts.title}</h2><p>{copy.layouts.body}</p></div><div className="layout-grid">{propertyData.layouts.map((layout) => <article className="layout-card" key={layout.id}><Placeholder label={`${layout.name}: ${copy.layouts.placeholder}`} /><div><span>{layout.name}</span><strong>{layout.sizeSqFt.toLocaleString('en-MY')} sq ft</strong><p>Detailed specifications pending approval.</p></div></article>)}</div></section>

        <section className="section furnishing-section" id="furnishing" aria-labelledby="furnishing-title"><div className="section-heading narrow"><p className="eyebrow eyebrow--light">{copy.furnishing.eyebrow}</p><h2 id="furnishing-title">{copy.furnishing.title}</h2><p>{copy.furnishing.body}</p></div><div className="package-grid">{basicPackages.map((pkg) => { const upgrade = upgradePackages.find((item) => item.letter === pkg.letter)!; return <article className="package-card" key={pkg.id}><span className="package-letter">{pkg.letter}</span><h3>{pkg.name}</h3><strong>{formatMyr(pkg.basePriceMyr)}</strong><p>Upgrade addition <b>+ {formatMyr(upgrade.upgradeAdditionMyr)}</b></p><small>{formatMyr(upgrade.totalPriceMyr)} total</small></article> })}</div><div className="furnishing-details"><div><h3>Basic furnishing reference</h3><ul>{copy.furnishing.basicItems.map((item) => <li key={item}>{item}</li>)}</ul></div><p>{copy.furnishing.note}</p></div></section>

        <section className="section media-split" id="facilities" aria-labelledby="facilities-title"><figure><img src={assetUrl(copy.facilities.image)} alt={copy.facilities.imageAlt} loading="lazy" /><figcaption>{copy.imageDisclaimer}</figcaption></figure><div><p className="eyebrow">{copy.facilities.eyebrow}</p><h2 id="facilities-title">{copy.facilities.title}</h2><p>{copy.facilities.body}</p><ul className="feature-list">{propertyData.facilities.map((item) => <li key={item.id}>{item.name}</li>)}</ul></div></section>

        <section className="section location-section" id="location" aria-labelledby="location-title"><div><p className="eyebrow">{copy.location.eyebrow}</p><h2 id="location-title">{copy.location.title}</h2><p>{copy.location.body}</p><strong>{propertyData.location.marketingArea}</strong></div><Placeholder label={copy.location.placeholder} /></section>

        <section className="section eligibility-section" id="eligibility" aria-labelledby="eligibility-title"><div className="section-heading narrow"><p className="eyebrow">{copy.eligibility.eyebrow}</p><h2 id="eligibility-title">{copy.eligibility.title}</h2></div><ol className="eligibility-grid">{propertyData.eligibilityRequirements.map((item, index) => <li key={item.id}><span>{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol><p className="disclaimer"><strong>Important:</strong> {copy.eligibility.disclaimer}</p></section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title"><p className="eyebrow eyebrow--light">{copy.contact.eyebrow}</p><h2 id="contact-title">{copy.contact.title}</h2><p>{copy.contact.body}</p><a className="button button--gold" href={whatsAppUrl} target="_blank" rel="noreferrer">{copy.contact.action} <span aria-hidden="true">↗</span></a></section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><span>{propertyData.project.brandMark}</span><strong>{propertyData.project.name}</strong></div><nav aria-label="Footer navigation">{copy.navigation.slice(0, 4).map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><p>Information is subject to final confirmation and approval. © {new Date().getFullYear()} {propertyData.project.shortName}.</p></footer>
    </div>
  )
}
