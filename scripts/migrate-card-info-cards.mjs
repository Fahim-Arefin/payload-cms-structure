import { createRequire } from 'node:module'
import { config } from 'dotenv'
import { migrateCardInfoLayout } from './lib/card-info-migration.mjs'

// Preview by default; use --apply to migrate this environment.
config({ quiet: true })
const require = createRequire(import.meta.url)
const mongoose = createRequire(require.resolve('@payloadcms/db-mongodb'))('mongoose')
if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required')
const connection = await mongoose.createConnection(process.env.DATABASE_URI).asPromise()
const apply = process.argv.includes('--apply')

try {
  const planned = []
  for (const [name, path] of [
    ['pages', 'layout'],
    ['_pages_versions', 'version.layout'],
  ]) {
    const collection = connection.collection(name)
    for await (const doc of collection.find(
      { [`${path}.blockType`]: 'cardInfo' },
      { projection: { [path]: 1 } },
    )) {
      const layout = path === 'layout' ? doc.layout : doc.version?.layout
      for (const change of migrateCardInfoLayout(layout, () => new mongoose.Types.ObjectId())) {
        planned.push({ collection, doc, layout, path, ...change })
      }
    }
  }
  console.log(`${planned.length} Card Info blocks to migrate${apply ? '' : ' (dry run)'}`)
  for (const { collection, doc, layout, path, index, cards, defaultCardKey } of planned) {
    if (!apply) continue
    const prefix = `${path}.${index}`
    const result = await collection.updateOne(
      {
        _id: doc._id,
        [`${prefix}.blockType`]: 'cardInfo',
        [`${prefix}.cards`]: null,
        [`${prefix}.cardSelector`]: layout[index].cardSelector,
      },
      { $set: { [`${prefix}.cards`]: cards, [`${prefix}.defaultCardKey`]: defaultCardKey } },
    )
    if (result.modifiedCount !== 1)
      throw new Error('Content changed during migration. Preview again before retrying.')
  }
  if (apply) console.log('Migration complete. Original selector data retained for recovery.')
} finally {
  await connection.close()
}
