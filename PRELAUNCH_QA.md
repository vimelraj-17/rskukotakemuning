# Pre-launch QA checkpoint

Date: 13 August 2026  
Branch: `feature/property-selector`

## Result

The production application, validation utilities and release-path checks pass. The release remains intentionally blocked from being treated as live inventory because only synthetic demo units are present and several approved source assets/details are still missing.

## Complete visitor journey

`src/test/PrelaunchJourney.test.tsx` exercises the release flow as one integration scenario:

1. Opens the landing page and confirms project information.
2. Chooses the 1,000 sq ft layout.
3. Confirms an incompatible Package C option is disabled and chooses Package A Upgrade.
4. Filters Block B by maximum price and available status.
5. Selects the available `DEMO-B-01-01` record and reviews the summary.
6. Confirms the canonical estimated total is RM288,000.
7. Changes property price and interest assumptions in the mortgage calculator.
8. Validates the encoded `wa.me` enquiry, safe new-tab attributes, recipient, project selection, canonical summary total and current calculated monthly estimate.
9. Remounts the application and confirms the local-storage selection is restored.
10. Clears local storage, opens the generated query-string URL and confirms the shared selection is restored safely.

The same suite confirms a sold unit remains visible, disabled, unselected and unable to advance to the summary.

## Integrity and accessibility coverage

- Bundled property data passes the validator, including unique unit IDs, existing layout/package references, supported statuses, positive pricing and compatibility rules.
- Every rendered internal `#` link resolves to an element in the document.
- Every rendered raster image resolves to a bundled file.
- `axe-core` reports no detectable WCAG A/AA structural violations. Colour contrast is excluded from the jsdom scan because jsdom does not calculate rendered colours; contrast and focus styles are covered by the responsive stylesheet review documented in `RESPONSIVE_ACCESSIBILITY_QA.md`.
- The generated WhatsApp recipient is `60172062979`; the message total comes from the canonical selected unit/package summary even when calculator price fields are used for a financing scenario.
- `scripts/verify-pages-build.mjs` confirms the built HTML assets exist and use `/rskukotakemuning/`, the expected GitHub Pages project base.
- A tracked-file scan found no private keys, tokens, passwords or API credentials. The configured project WhatsApp number is intentionally public configuration, not a secret.

## Commands required for this checkpoint

```text
npm ci
npm test
npm run lint
npm run typecheck
npm run build
npm run verify:pages
npm audit
```

## Remaining launch blockers and placeholders

| Item | Status required before launch |
| --- | --- |
| Production units, availability and parking allocations | Replace the three synthetic demo records only after zero-mismatch reconciliation. Never import or reference the red legacy unit-number column in `PHASE 2 CARPARK ALLOCATION 22072026`. |
| Unit and car-park mapping | Resolve all blocking exceptions in `SOURCE_RECONCILIATION_REPORT.md`; verify unit ID, block, level, stack, availability, bay number, car-park level, covered/open type and side-by-side/tandem orientation. |
| Floor plans | Supply approved standalone plan images. No plan hotspots are enabled because trustworthy coordinates are unavailable. |
| Location | Supply the approved address, coordinates, location map and verified nearby travel claims. |
| Layout specifications | Confirm bedroom/bathroom counts, detailed features and all package-to-layout rules. |
| Package and furnishing data | Obtain final written approval for prices, inclusions, brands, dimensions, colours, substitutions and terms. |
| Facilities and project facts | Confirm the final facility schedule, fact-card values and expected VP wording. |
| Browser release smoke test | Deploy the tested commit to a Pages preview or `main`, then repeat the journey at 375 × 812, 768 × 1024 and 1440 × 900 in a real browser. This workspace could not expose its local preview server because its network-interface lookup failed. |
