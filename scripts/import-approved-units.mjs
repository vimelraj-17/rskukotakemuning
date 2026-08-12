import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const [allocationPdf, outputFile = 'src/data/units.ts'] = process.argv.slice(2)

if (!allocationPdf) {
  throw new Error('Usage: node scripts/import-approved-units.mjs <allocation.pdf> [output.ts]')
}

const availableUnitIds = new Set(`
C-17-02 C-17-04 C-16-01 C-16-02 C-16-04 C-16-09 C-15-01 C-15-05
C-14-02 C-14-05 C-13-01 C-13-02 C-13-12 C-12-04 C-12-05 C-12-06
C-11-04 C-10-04 C-10-05 C-10-08 C-10-10 C-10-12 C-09-05 C-09-07
C-08-05 C-08-12 C-06-05 C-06-07 C-05-04 C-05-05 C-05-12 C-05-13
C-05-20 C-04-08 C-03-01 C-03-04 C-03-07 C-03-08 C-03-12 C-02-12
C-01-12 B-15-10 B-15-15 B-13-15 B-11-03 B-11-15 B-10-08 B-10-10
B-09-08 B-09-15 B-08-15 B-06-04 B-06-07 B-05-01 B-05-03 B-05-04
B-05-07 B-05-08 B-05-15 B-05-16 B-05-20 B-04-01 B-04-04 B-04-07
B-04-08 B-04-15 B-04-16 B-04-20 B-03-01 B-03-03 B-03-04 B-03-07
B-03-08 B-03-15 B-02-04 B-02-08 B-02-15 B-01-08 B-01-15
`.trim().split(/\s+/))

const workDirectory = mkdtempSync(resolve(tmpdir(), 'rsk-unit-import-'))
const extractedTextPath = resolve(workDirectory, 'allocation.txt')

try {
  execFileSync('pdftotext', ['-layout', resolve(allocationPdf), extractedTextPath])
  const lines = readFileSync(extractedTextPath, 'utf8').split(/\r?\n/)

  // Capture only the approved current unit identifier and the fields that follow it.
  // Source cells before that identifier are skipped and are never emitted.
  const rowPattern = /^\s*\d+\s+[BC]\s+\S+\s+([BC]-(?:G|\d{2})-\d{2})\s+(GROUND(?: FLOOR)?|LEVEL\s+\d+)\s+(CORNER|INTERMEDIATE)\s+RM\s+([\d,]+\.\d{2})\s+(UPGRADE|BASIC)\s+(GROUND|UPPER GROUND|LEVEL\s+\d+A?)\s+(COVERED|OPEN)\s+(TANDEM|SIDE BY SIDE)\s+(\S+)\s+(\S+)(?:\s+\S+)?\s*$/
  const parsedRows = lines
    .map((line) => line.match(rowPattern))
    .filter((match) => match && availableUnitIds.has(match[1]))
    .map((match) => {
      const [, id, residentialLevel, position, price, packageType, parkingLevel, parkingType, orientation, firstBay, secondBay] = match
      const basePriceMyr = Number(price.replaceAll(',', ''))
      const letter = basePriceMyr === 250000 ? 'a' : basePriceMyr === 275000 ? 'b' : 'c'
      return {
        id,
        block: id.slice(0, 1),
        level: residentialLevel.startsWith('GROUND') ? 0 : Number(residentialLevel.replace('LEVEL ', '')),
        positionOrStack: position === 'CORNER' ? 'Corner' : 'Intermediate',
        layoutId: basePriceMyr === 290000 ? 'layout-1080' : 'layout-1000',
        sizeSqFt: basePriceMyr === 290000 ? 1080 : 1000,
        bedrooms: 3,
        bathrooms: 2,
        basePriceMyr,
        compatiblePackageIds: [`${letter}-${packageType.toLowerCase()}`],
        parking: {
          bayNumbers: [firstBay, secondBay],
          level: parkingLevel.replace(/^LEVEL /, 'Level ').replace('UPPER GROUND', 'Upper Ground').replace(/^GROUND$/, 'Ground'),
          type: parkingType === 'COVERED' ? 'Covered' : 'Open',
          orientation: orientation === 'SIDE BY SIDE' ? 'Side-by-side' : 'Tandem',
        },
        availabilityStatus: 'available',
        classification: 'confirmed',
      }
    })
    .sort((a, b) => a.id.localeCompare(b.id, 'en'))

  if (parsedRows.length !== availableUnitIds.size) {
    const found = new Set(parsedRows.map((row) => row.id))
    const missing = [...availableUnitIds].filter((id) => !found.has(id))
    throw new Error(`Expected ${availableUnitIds.size} approved units, found ${parsedRows.length}. Missing: ${missing.join(', ')}`)
  }

  const unitIds = new Set(parsedRows.map((row) => row.id))
  const bayNumbers = parsedRows.flatMap((row) => row.parking.bayNumbers)
  if (unitIds.size !== parsedRows.length || new Set(bayNumbers).size !== bayNumbers.length) {
    throw new Error('Duplicate unit IDs or parking bay numbers detected during import.')
  }

  const invalidBays = bayNumbers.filter((bay) => !/^(?:G|UG|\d+A?)-(?:CT|CS|OS)-[BC]\d{3}$/.test(bay))
  if (invalidBays.length) throw new Error(`Invalid parking bay identifiers: ${invalidBays.join(', ')}`)

  const output = `import type { Unit } from '../types/property'\n\n/**\n * Owner-approved available inventory as at 23 July 2026.\n * Reconciled against the current unit-number allocation and car park plans.\n */\nexport const units: readonly Unit[] = ${JSON.stringify(parsedRows, null, 2)}\n`
  writeFileSync(resolve(outputFile), output)
  console.log(`Imported ${parsedRows.length} approved units with ${bayNumbers.length} unique parking bays.`)
} finally {
  rmSync(workDirectory, { recursive: true, force: true })
}
