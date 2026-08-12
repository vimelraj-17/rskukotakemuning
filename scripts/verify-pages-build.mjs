import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const base = process.env.VITE_BASE_PATH ?? '/rskukotakemuning/'
const dist = resolve('dist')
const html = readFileSync(join(dist, 'index.html'), 'utf8')
const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1])
const localReferences = references.filter((reference) => !reference.startsWith('http'))

if (!localReferences.length) throw new Error('No local build assets were referenced by dist/index.html.')
for (const reference of localReferences) {
  if (!reference.startsWith(base)) throw new Error(`Build reference does not use GitHub Pages base ${base}: ${reference}`)
  const outputPath = join(dist, reference.slice(base.length))
  if (!existsSync(outputPath)) throw new Error(`Built asset is missing: ${outputPath}`)
}

for (const image of ['facade-hero.webp', 'facilities.webp']) {
  if (!existsSync(join(dist, 'images', image))) throw new Error(`Public image was not copied: images/${image}`)
}

const bundles = readdirSync(join(dist, 'assets')).filter((file) => file.endsWith('.js'))
if (!bundles.length) throw new Error('No production JavaScript bundle was generated.')
if (!bundles.some((file) => readFileSync(join(dist, 'assets', file), 'utf8').includes(base))) {
  throw new Error(`Production JavaScript does not contain the configured base path ${base}.`)
}

console.log(`Verified ${localReferences.length} HTML asset references and GitHub Pages base ${base}`)
