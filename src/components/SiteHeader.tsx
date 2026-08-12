import { useState } from 'react'
import { brochureContent } from '../data/brochure'
import type { ProjectInformation } from '../types/property'

interface SiteHeaderProps {
  project: ProjectInformation
  stageLabel: string
}

export function SiteHeader({ project, stageLabel }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

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
      <button className="nav-toggle" type="button" aria-expanded={isOpen} aria-controls="primary-navigation" onClick={() => setIsOpen((value) => !value)}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <nav id="primary-navigation" className="primary-nav" data-open={isOpen} aria-label="Primary navigation">
        {brochureContent.navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}</a>)}
        <a className="nav-contact" href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
      </nav>
      <span className="visually-hidden">{stageLabel}</span>
    </header>
  )
}
