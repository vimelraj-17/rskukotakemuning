# Missing Content and Asset Checklist

Use this checklist to gather authoritative, licensed, and approved inputs before major implementation. Checked items are already known from the project request; unchecked items are missing, ambiguous, or require approval.

## Confirmed baseline

- [x] Repository: `vimelraj-17/rskukotakemuning`
- [x] Project name: Residensi Lestari Fasa 2
- [x] Primary language: English
- [x] Currency: MYR
- [x] Package filter values: All, Basic, Upgrade
- [x] WhatsApp number: `+60172062979`
- [x] Hosting target: GitHub Pages
- [x] Custom domain: none
- [x] Required journey: landing → information → layouts → packages → unit selection → summary → mortgage calculator → WhatsApp
- [x] Functional reference is inspiration only; its code, content, brand, assets, and data are prohibited source material

## Received source bundle

- [x] `Block B.png`
- [x] `Block C.png`
- [x] `latest sale chart available as at 230726.pdf`
- [x] `Lestari2 Car Park Plan 2472026 (Latest Unit numbering).pdf`
- [x] `PHASE 2 CARPARK ALLOCATION 22072026 （New numbering) pdf.pdf`
- [x] `Lestari 2 Sales Kit as at 20.08.2025 pdf(1).pdf`
- [x] `Drop off area 2.jpeg`
- [x] `Drop off area.jpeg`
- [x] `Facade 2.jpeg`
- [x] `Facade.jpeg`
- [x] `Facilities.jpeg`
- [x] `Package Comparison..png`
- [x] `WhatsApp Image 2026-08-11 at 17.29.48.jpeg`
- [x] `Eligibility Check.png`
- [x] Exact attachment identities and repository-safe aliases recorded in `SOURCE_REGISTER.md`
- [x] All pages and images inspected; results recorded in `SOURCE_RECONCILIATION_REPORT.md`

## Priority 0 — implementation blockers

- [ ] Corrected and approved allocation source resolving the 21 malformed parking-bay identifiers listed in `SOURCE_RECONCILIATION_REPORT.md`.
- [ ] Authoritative, timestamped unit/status masterlist in CSV, XLSX, or validated JSON. The supplied allocation PDF has unit attributes but no availability status.
- [ ] Approved unit availability/status vocabulary and meaning, such as available, held, sold, blocked, or unknown.
- [ ] Authoritative legend or export defining the 79 green marks in the sale chart.
- [x] A/B/C Basic prices and Upgrade additions supplied in writing and in the package-comparison image; Package C's written Basic amount still requires typo confirmation.
- [ ] Corrected Package C written Basic amount: confirm `RM290,000`, because the latest text says `RM290,0000` while the image and computed Upgrade total say RM290,000.
- [ ] Authoritative package-to-unit rules resolving the package graphic's conflicts with the current allocation schedule for Basic parking, B Upgrade position and B/C residential floors.
- [ ] High-resolution standalone layout/floor-plan assets with permission to publish.
- [ ] Approved unit-to-plan and car-park-bay selection geometry for every selectable unit and assigned bay.
- [ ] Updated approved project fact sheet reconciling 615 units, current block names and current price-band totals.
- [ ] Approved brand direction: logo, colours, typography, and visual tone.
- [ ] Mortgage calculator defaults, input limits, rounding, and disclaimer.
- [x] WhatsApp opening and selected-unit field set confirmed: unit number, Basic/Upgrade type, A/B/C package, both bay numbers, Open/Covered type and Side-by-side/Tandem orientation.
- [ ] Named owner and update process for unit prices and availability.

## Project identity and approved copy

- [ ] Official project name styling and whether “Fasa 2” or “Phase 2” is preferred in English copy.
- [ ] Developer and/or project owner legal name.
- [ ] Authorised sales representative or team name to use near the WhatsApp call to action.
- [ ] One-sentence value proposition.
- [ ] Full project overview.
- [ ] Official address and map coordinates.
- [ ] Property tenure and expiry date if relevant.
- [ ] Land area, number of blocks, number of units, floors, lifts, and parking allocation.
- [ ] Built-up sizes, bedroom/bathroom counts, balconies, yards, and other verified specifications.
- [ ] Starting price and full approved price bands.
- [ ] Launch, completion, vacant-possession, or key milestone dates.
- [ ] Approved facilities list.
- [ ] Approved nearby amenities and verified distances or travel times.
- [x] A legible Malay-language preliminary eligibility graphic was received.
- [ ] Current LPHS authority/source date and approval for each eligibility criterion, plus approved English wording.
- [ ] Required project notices, qualification language, and “subject to change” wording.
- [ ] English copy review and final content sign-off owner.

## Brand and media assets

- [ ] Primary logo in SVG and fallback PNG.
- [ ] Logo usage rules, safe area, minimum size, and approved colour variants.
- [ ] Brand colour palette with accessible usage guidance.
- [ ] Licensed webfonts or approved system-font direction.
- [x] Five 2048 × 1152 project renders received for potential hero/gallery use.
- [ ] Written web publication rights for a selected hero image or project visual.
- [ ] Approved artist-impression captions and required disclaimer for the five project renders.
- [ ] Location map with publication rights and attribution requirements.
- [ ] Facility imagery or original icons.
- [ ] Favicon and app/site icons.
- [ ] Social sharing image.
- [ ] Source, rights owner, approval status, required credit, and expiry/restriction metadata for every asset.
- [ ] Alternative text or enough factual context to write accurate alternative text.
- [ ] Responsive renditions or source files suitable for WebP/AVIF optimization.

## Layouts and floor plans

- [ ] Stable ID and public name for each layout.
- [x] Typical 1,000 sq ft and 1,080 sq ft plans received inside the sales-kit PDF.
- [x] Current Block B and Block C unit-location charts received as PNG files.
- [x] Eight current-numbering car-park location sheets received as a PDF.
- [ ] High-resolution standalone SVG, PDF, CAD export, or raster plan for each unit layout/orientation.
- [ ] Editable DWG/DXF/SVG car-park plan or approved bay-coordinate table for exact interactive highlighting.
- [ ] Verified dimensions and room labels.
- [ ] Built-up area and unit of measurement.
- [ ] Bedroom, bathroom, balcony, yard, and parking details.
- [ ] Orientation or facing information if it will be displayed.
- [ ] Legend and disclosure for plans that are not to scale.
- [ ] Approval to add interactive overlays to supplied plans.
- [ ] Mobile-friendly detail/crop strategy for dense plans.

## Unit inventory schema

Supply one row per unit with these fields where applicable:

- [x] 615 unique current unit IDs reconcile exactly across the allocation and block plans.
- [x] Block, floor and position are present for all 615 allocation rows.
- [ ] Layout/type ID.
- [x] Package ID is present for all 615 allocation rows.
- [x] Selling price is present for all 615 allocation rows.
- [ ] Current availability/status.
- [ ] Status “last updated” date and data source.
- [ ] Corner/intermediate or other approved position category.
- [ ] Orientation/facing category if used.
- [ ] Corrected parking bay IDs for all rows; level, arrangement and cover are present, but 21 supplied identifiers are malformed.
- [ ] Plan coordinates, SVG region ID, or another reliable unit-to-visual mapping.
- [ ] Display notes and restrictions.
- [ ] Unique source record/reference for audit and reconciliation.
- [ ] Rules for units with incomplete, conflicting, or unknown data.
- [ ] Update cadence and person responsible for publishing changes.

## Packages

- [x] `All` is treated as a filter state; the allocation contains only Basic and Upgrade package values.
- [x] Package letters A, B and C and their Basic/Upgrade price model are supplied; Package C's written extra-zero conflict remains open.
- [x] Basic package furniture/electrical reference received in Malay.
- [ ] Approved English Basic headline, description, itemised inclusions and explicit exclusions.
- [x] Upgrade package comparison and itemised marketing reference received for A, B and C.
- [ ] Approved English Upgrade headlines, final inclusions, explicit exclusions and substitution rules.
- [x] Price treatment supplied: Upgrade is the Basic price plus A RM38,000, B RM33,000 or C RM43,000; display base, addition and total separately.
- [ ] Package-to-unit eligibility rules reconciled against the allocation schedule.
- [x] Package-specific imagery received.
- [ ] Web-publication rights for the package-specific imagery.
- [ ] Package terms, expiry, substitutions, and “illustration only” language.
- [ ] Rules for units without an assigned package.

## Selection summary

- [ ] Required summary fields and their display order.
- [ ] Whether layout, position, orientation, parking, floor, and block should be shown.
- [ ] Whether visitors may copy or share a summary.
- [ ] Availability confirmation wording.
- [ ] Behaviour when a selected unit becomes unavailable or data is stale.
- [ ] Whether a timestamp or inventory version should appear.

## Mortgage calculator

- [ ] Default loan margin or down payment.
- [ ] Minimum and maximum loan margin/down payment.
- [ ] Default annual interest/profit rate.
- [ ] Minimum and maximum rate.
- [ ] Default tenure and permitted tenure range.
- [ ] Rounding rule for monthly repayments and totals.
- [ ] Whether to show loan amount, down payment, total interest/profit, or other derived figures.
- [ ] Whether fees, stamp duty, legal fees, insurance, MRTA/MRTT, or rebates are excluded.
- [ ] Approved non-advisory and financier-dependent disclaimer.
- [ ] Compliance/legal review owner.

## WhatsApp handoff

- [ ] Confirm the owner/recipient name for `+60172062979`.
- [x] Approved opening wording: “Help me lock this unit!”
- [x] Approved selected-unit fields and enum values recorded in `PROJECT_BRIEF.md`.
- [x] Calculator inputs/results excluded from the current message field set.
- [x] Current page URL and inventory timestamp excluded from the current message field set.
- [x] Unit-lock/availability-confirmation request is the opening wording.
- [ ] Privacy review for any user-entered details before they are placed in the message.
- [ ] Tracking/analytics requirements for WhatsApp clicks, if any.

## Legal, privacy, and trust

- [ ] Legal entity and contact information for the footer.
- [ ] Sales disclaimer and information-change disclaimer.
- [ ] Artist-impression and not-to-scale notices where relevant.
- [ ] Eligibility and approval disclaimer.
- [ ] Mortgage illustration disclaimer.
- [ ] Privacy notice if analytics or personal-data collection is introduced.
- [ ] Cookie/consent decision based on the final analytics stack.
- [ ] Accessibility statement or support contact.
- [ ] Content and legal sign-off process.

## SEO and sharing

- [ ] Page title and meta description.
- [ ] Canonical GitHub Pages URL after Pages is enabled.
- [ ] Social sharing title, description, and image.
- [ ] Search indexing preference.
- [ ] Structured-data requirements, if any.
- [ ] Project keywords supplied by the marketing owner.

## GitHub Pages and operations

- [ ] Confirm the GitHub Pages source: GitHub Actions is proposed.
- [ ] Confirm the final Pages URL and repository base path.
- [ ] Confirm whether the repository will remain public.
- [ ] Confirm who may approve and merge deployment pull requests.
- [ ] Confirm inventory/content update workflow after launch.
- [ ] Confirm browser and device support targets.
- [ ] Confirm analytics, error monitoring, and uptime expectations.
- [ ] Define rollback procedure and owner.
- [ ] Define a content/data version visible to maintainers.

## Nice-to-have decisions

- [ ] Shareable selection URL without personal information.
- [ ] Printable selection summary.
- [ ] Compare two or more units.
- [ ] Saved shortlist in the visitor's browser.
- [ ] Parking-plan visualization.
- [ ] Guided eligibility checklist with a clear non-determination disclaimer.
- [ ] Future Malay-language content.
- [ ] Future CRM or live inventory integration.

## Minimum handoff bundle to begin Phase 1 safely

Provide one approved folder or archive containing:

1. Project fact sheet and approved English copy.
2. Brand logo and palette.
3. Layout plans and publication permissions.
4. Unit masterlist with packages, prices, statuses, and plan mapping.
5. Basic and Upgrade package details.
6. Mortgage defaults and disclaimer.
7. WhatsApp message approval.
8. Legal notices and the names of content/data approvers.
