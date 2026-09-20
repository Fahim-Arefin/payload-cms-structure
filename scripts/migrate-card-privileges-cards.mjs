import { createRequire } from 'node:module'
import { config } from 'dotenv'
import { migratePrivilegesLayout } from './lib/card-privileges-migration.mjs'

// Preview: node scripts/migrate-card-privileges-cards.mjs
// Apply:   node scripts/migrate-card-privileges-cards.mjs --apply
// Run once per environment when deploying the dynamic Cards array schema.
config({ quiet: true })
const require = createRequire(import.meta.url)
const mongoose = createRequire(require.resolve('@payloadcms/db-mongodb'))('mongoose')
if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required')
const connection = await mongoose.createConnection(process.env.DATABASE_URI).asPromise()
const apply = process.argv.includes('--apply')

try {
  const planned = []
  // Preflight every document before applying any changes.
  for (const [name, path] of [
    ['pages', 'layout'],
    ['_pages_versions', 'version.layout'],
  ]) {
    const collection = connection.collection(name)
    const documents = collection.find(
      { [`${path}.blockType`]: 'cardPrivileges' },
      { projection: { [path]: 1 } },
    )
    for await (const doc of documents) {
      const layout = path === 'layout' ? doc.layout : doc.version?.layout
      for (const change of migratePrivilegesLayout(layout, () => new mongoose.Types.ObjectId())) {
        planned.push({ collection, doc, layout, path, ...change })
      }
    }
  }
  console.log(
    `${planned.length} Privileges blocks ${apply ? 'to migrate' : 'to migrate (dry run)'}`,
  )
  for (const change of planned) {
    const { collection, doc, layout, path, index, cards, defaultCardKey } = change
    if (!apply) continue
    const prefix = `${path}.${index}`
    const filter = {
      _id: doc._id,
      [`${prefix}.blockType`]: 'cardPrivileges',
      [`${prefix}.cards`]: null,
    }
    for (const group of ['metalCard', 'visaInfinite']) {
      if (layout[index][group]) filter[`${prefix}.${group}`] = layout[index][group]
    }
    const result = await collection.updateOne(filter, {
      $set: { [`${prefix}.cards`]: cards, [`${prefix}.defaultCardKey`]: defaultCardKey },
    })
    if (result.modifiedCount !== 1)
      throw new Error('Page content changed during migration. Rerun the preview before retrying.')
  }
  if (apply) console.log('Migration complete. Original groups and all item data were retained.')
} finally {
  await connection.close()
}
