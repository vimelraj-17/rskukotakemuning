export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <a className="wordmark" href="#main-content" aria-label="Residensi Lestari Fasa 2 home">
        <span className="wordmark__mark" aria-hidden="true">
          RL
        </span>
        <span>
          Residensi Lestari
          <small>Fasa 2</small>
        </span>
      </a>
      <span className="site-header__stage">Foundation</span>
    </header>
  )
}
