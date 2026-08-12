import type { ProjectInformation } from '../types/property'

interface SiteHeaderProps {
  project: ProjectInformation
  stageLabel: string
}

export function SiteHeader({ project, stageLabel }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <a className="wordmark" href="#main-content" aria-label={`${project.name} home`}>
        <span className="wordmark__mark" aria-hidden="true">
          {project.brandMark}
        </span>
        <span>
          {project.shortName}
          <small>{project.phaseLabel}</small>
        </span>
      </a>
      <span className="site-header__stage">{stageLabel}</span>
    </header>
  )
}
