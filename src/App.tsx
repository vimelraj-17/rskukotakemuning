import { DataNotice } from './components/DataNotice'
import { DataOverview } from './components/DataOverview'
import { SiteHeader } from './components/SiteHeader'
import { journeySections } from './data/journey'
import { propertyData } from './data/propertyData'
import { siteCopy } from './data/siteCopy'

export function App() {
  return (
    <div className="site-shell">
      <SiteHeader project={propertyData.project} stageLabel={siteCopy.stageLabel} />

      <main id="main-content">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero__content">
            <p className="eyebrow">{siteCopy.hero.eyebrow}</p>
            <h1 id="page-title">{propertyData.project.name}</h1>
            <p className="hero__summary">{siteCopy.hero.summary}</p>
            <a className="button" href="#data-overview">
              {siteCopy.hero.actionLabel}
            </a>
          </div>

          <DataNotice metadata={propertyData.metadata} />
        </section>

        <DataOverview data={propertyData} />

        <section className="journey" id="journey" aria-labelledby="journey-title">
          <div className="section-heading">
            <p className="eyebrow">{siteCopy.journey.eyebrow}</p>
            <h2 id="journey-title">{siteCopy.journey.title}</h2>
          </div>

          <ol className="journey-grid">
            {journeySections.map((section, index) => (
              <li className="journey-card" key={section.id}>
                <span className="journey-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer>
        <p>{siteCopy.footerNotice}</p>
      </footer>
    </div>
  )
}
