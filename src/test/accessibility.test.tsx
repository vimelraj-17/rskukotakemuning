import { render } from '@testing-library/react'
import axe from 'axe-core'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '../App'

describe('automated accessibility scan', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

  it('has no detectable WCAG A/AA structure violations', async () => {
    const { container } = render(<App />)
    const result = await axe.run(container, {
      rules: {
        // jsdom cannot calculate rendered foreground/background colours.
        'color-contrast': { enabled: false },
      },
    })

    expect(result.violations).toEqual([])
  })
})
