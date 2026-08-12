# Source Register

## Status

- Intake date: 12 August 2026
- Project: Residensi Lestari Fasa 2
- Purpose: immutable identity and usage register for the supplied project documents and images
- Reconciliation status: blocked by the exceptions in `SOURCE_RECONCILIATION_REPORT.md`

The supplied filenames are preserved exactly for provenance. The repository-safe aliases below are the names to use if approved copies are later added to the application. No source attachment has been renamed or modified during this audit.

## File register

| Exact supplied filename | Repository-safe alias | Format and extent | SHA-256 | Intended role |
| --- | --- | --- | --- | --- |
| `Block B.png` | `block-b-unit-location-and-package-plan.png` | PNG, 2048 × 1465 | `37289bdf6498a3fcbb858adbca4985c5c25bd2e1d88c00cbe314c4c5355c4228` | Current unit numbering, unit location, price-band colour, package colour, position outline, orientation and stack type for Block B |
| `Block C.png` | `block-c-unit-location-and-package-plan.png` | PNG, 2048 × 1493 | `875efc0fcf9b3508875da8038c67b7f394bbb91bcd7eb7c081be67ae5251fce0` | Current unit numbering, unit location, price-band colour, package colour, position outline, orientation and stack type for Block C |
| `latest sale chart available as at 230726.pdf` | `sale-chart-2026-07-23.pdf` | PDF, 2 A3 pages | `cea207a688d5d1b7b37500d08d5b38e0d3fab97b2098e5b1fc5211acff5d9b73` | Block C and Block B charts containing green status marks as at the date encoded in the filename |
| `Lestari2 Car Park Plan 2472026 (Latest Unit numbering).pdf` | `car-park-location-plan-current-numbering-2026-07-24.pdf` | PDF, 8 A4 pages | `486dc33900c4403d78c42658bf2c819ba6a238425676479b04b4421e61228e31` | Physical car-park bay locations and current unit-number labels for Ground, Upper Ground, Level 1, Level 1A, Level 2, Level 2A, Level 3 and Level 3A |
| `PHASE 2 CARPARK ALLOCATION 22072026 （New numbering) pdf.pdf` | `car-park-allocation-current-numbering-2026-07-22.pdf` | PDF, 5 A4 pages, 615 allocation rows | `0f51df28c3666c768c5404b55119621ce48eee4a9ef2d34431bdf5f483a5c629` | Current unit-to-bay allocation, unit price, package, position and parking attributes; usable only after listed identifier exceptions are resolved |
| `Lestari 2 Sales Kit as at 20.08.2025 pdf(1).pdf` | `sales-kit-2025-08-20.pdf` | PDF, 38 pages | `958cb84b8d34ecb076d91a5a6859ad85179dd2be4fcf4e554cc604be8645a113` | General project, layout, specification, furniture, facility, eligibility, amenity and disclaimer source; older operational figures require re-approval |
| `Drop off area 2.jpeg` | `drop-off-area-02.jpeg` | JPEG, 2048 × 1152 | `607f2e803a99af561799f50a19b9f189b75f480c89acbceff1cb84b19e47b609` | Project render: secondary drop-off and parking view |
| `Drop off area.jpeg` | `drop-off-area-01.jpeg` | JPEG, 2048 × 1152 | `23204f0ad3772c11bd875bfd1e437ac2ee9b7d1a6e0e90e4d8ce5a79b5c11bfd` | Project render: covered drop-off and internal road view |
| `Facade 2.jpeg` | `facade-02.jpeg` | JPEG, 2048 × 1152 | `78696fa247547377c3b7eb1febc1df952425e0420e4b0a070f1e68ac42177b3d` | Project render: tower facade and landscaped approach |
| `Facade.jpeg` | `facade-01.jpeg` | JPEG, 2048 × 1152 | `298354802bcf77fc537d5ad68958a65dba08b2d11ccf17ea2f126f4aacddaf46` | Project render: tower facade and parking podium |
| `Facilities.jpeg` | `facilities.jpeg` | JPEG, 2048 × 1152 | `48bc13263b667b9add5422e622652b0e09f430dbc93d3079f4e9e0505a790039` | Project render: central facilities facade |
| `Package Comparison..png` | `package-comparison.png` | PNG, 1536 × 1024 | `9ff4826b8b08d3462e28c5859ae64bad19dbf7b2a17cba065c450cf5099d6ee3` | A/B/C Basic and Upgrade prices, upgrade additions, package features, general floor/position/parking claims and expected-VP marketing claim; unit-level claims require reconciliation |
| `WhatsApp Image 2026-08-11 at 17.29.48.jpeg` | `basic-package-lphs-furniture-and-electrical.jpeg` | JPEG, 854 × 1280 | `316d93f8ae94e0f82a9fed0e8c00f30d944e883aa2dcf6e765b0ddadff5e462e` | Malay-language Basic furniture and electrical reference stated as an LPHS requirement |
| `Eligibility Check.png` | `lphs-eligibility-check.png` | PNG, 1024 × 1536 | `a5982a157427582b18e86df8c8435c8b975222872ddb1cdf5e9f8f84d77865ad` | Malay-language preliminary Rumah Selangorku eligibility marketing checklist and approval disclaimer |

## Mandatory precedence and exclusion rules

1. The user's current written instructions control the project name, language, currency, WhatsApp number and data-integrity policy.
2. Only current unit numbers may enter the application data model. The red legacy-number field in the 22 July 2026 allocation schedule is excluded completely: do not extract it, store it, display it, log it, test it, use it as an alias or create a mapping from it.
3. `Lestari2 Car Park Plan 2472026 (Latest Unit numbering).pdf` controls physical car-park bay location and the bay label printed at that location.
4. `PHASE 2 CARPARK ALLOCATION 22072026 （New numbering) pdf.pdf` controls the current unit-to-car-park relationship only after every malformed or ambiguous bay identifier in the reconciliation report is corrected or explicitly approved against the current-numbering plan.
5. `Block B.png` and `Block C.png` control current residential unit location and numbering on the block charts. Their complete current-number unit sets reconcile with the allocation schedule.
6. `latest sale chart available as at 230726.pdf` may identify which cells carry a green mark, but the marks must not be interpreted as available, sold, booked, held or blocked until an authoritative legend or status table is supplied.
7. `Package Comparison..png` and the user's written package details control the A/B/C price model only where they agree. The Package C written amount `RM290,0000` conflicts with the image's RM290,000 and must be corrected in writing before it becomes production data.
8. General statements in the package-comparison image do not override unit-level allocation fields. Unit-specific package type, position, residential floor, car-park type, orientation and bay IDs come from the reconciled current allocation record.
9. `WhatsApp Image 2026-08-11 at 17.29.48.jpeg` and `Eligibility Check.png` are marketing/content references. They are not a substitute for current, authoritative LPHS policy, approved English copy or legal review.
10. The 2025 sales kit is a general-content source, not an authority for current unit counts, current price-band totals, current block naming, current availability or current contact details where it conflicts with later records or the user's instructions.
11. For visitor contact, use only `+60172062979`. Contact details printed in older source material are not application data.
12. No data exception may be silently repaired. A failed reconciliation blocks generation and deployment of the affected records.

## Publication controls

- The five project-render JPEGs and the visuals embedded in the sales kit appear to be project renders or artist impressions. Publication permission, required credits and approved disclaimer wording are not included in the attachments and remain required.
- Publication permission and required disclaimer/credit metadata are also required for all three newly supplied marketing graphics.
- The official logo is visible in the sales kit but no standalone approved logo file or usage guide was supplied.
- Repository-safe aliases do not alter source identity; hashes above remain the audit key.
