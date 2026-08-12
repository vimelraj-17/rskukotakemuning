# Responsive and accessibility QA

## Target viewports

| Viewport | Coverage |
| --- | --- |
| 375 × 812 | Single-column cards, compact four-step progress, sticky selector controls, full-width primary actions, stacked filters, summary and calculator wrapping |
| 768 × 1024 | Two-column content and filters, desktop navigation transition, readable summary/calculator panels |
| 1440 × 900 | Full navigation, three-column package/unit grids, bounded content width and balanced spacing |

## Checks performed

- No document-level horizontal overflow; wide future plan surfaces use `.plan-scroll` with horizontal touch scrolling.
- Sticky header and mobile selector controls retain explicit stacking contexts.
- Interactive controls meet a minimum 44 px target height and have visible keyboard focus.
- Mobile cards, results, summary and calculator use one-column layouts.
- Every current form control has an associated label; disabled choices remain announced.
- Page has one `h1`; section headings use `h2`, workflow headings use `h3`, and nested card headings use `h4`.
- Both raster images have descriptive alternative text and intrinsic dimensions. The noncritical facilities image is lazy-loaded and asynchronously decoded.
- Supplied WebP files are already compressed: hero 149,680 bytes; facilities 130,914 bytes.
- Keyboard operation uses native links, buttons, radio inputs and selects; no custom focus trap is present.
- Automated semantic tests, TypeScript, lint, all unit/integration tests and the production build are required to pass.

## Environment note

The workspace preview server could not expose a local browser URL because its network-interface lookup failed. Viewport behavior was therefore verified from responsive CSS constraints and automated DOM tests rather than a live browser screenshot run. A deployed Pages smoke test at these exact viewport dimensions remains recommended before release.
