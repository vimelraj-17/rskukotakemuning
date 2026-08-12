import { SiteHeader } from './components/SiteHeader'
import { journeySections } from './data/journey'

export function App() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main id="main-content">
        <section className="hero" aria-labelledby="page-title">
          <div className="hero__content">
            <p className="eyebrow">Property selection experience</p>
            <h1 id="page-title">Residensi Lestari Fasa 2</h1>
            <p className="hero__summary">
              A responsive, guided journey from project discovery to a verified
              unit enquiry. This temporary homepage confirms that the application
              foundation is running.
            </p>
            <a className="button" href="#journey">
              View planned journey
            </a>
          </div>

          <aside className="status-card" aria-label="Build status">
            <span className="status-card__label">Foundation checkpoint</span>
            <strong>React + TypeScript + Vite</strong>
            <p>
              Production unit data remains gated by the source reconciliation
              process.
            </p>
          </aside>
        </section>

        <section className="journey" id="journey" aria-labelledby="journey-title">
          <div className="section-heading">
            <p className="eyebrow">Single-page flow</p>
            <h2 id="journey-title">The planned visitor journey</h2>
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
        <p>
          Planning build — project facts, prices and availability require final
          approval before publication.
        </p>
      </footer>
    </div>
  )
}
