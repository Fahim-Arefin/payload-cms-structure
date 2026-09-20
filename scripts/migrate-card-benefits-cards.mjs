import { createRequire } from 'node:module'
import { config } from 'dotenv'
import { migrateCardBenefitsLayout } from './lib/card-benefits-migration.mjs'

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
      { [`${path}.blockType`]: 'cardBenefits' },
      { projection: { [path]: 1 } },
    )) {
      const layout = path === 'layout' ? doc.layout : doc.version?.layout
      for (const change of migrateCardBenefitsLayout(layout, () => new mongoose.Types.ObjectId())) {
        planned.push({ collection, doc, layout, path, ...change })
      }
    }
  }
  console.log(`${planned.length} Benefits blocks to migrate${apply ? '' : ' (dry run)'}`)
  for (const { collection, doc, layout, path, index, cards, defaultCardKey } of planned) {
    if (!apply) continue
    const prefix = `${path}.${index}`
    const result = await collection.updateOne(
      { _id: doc._id, [prefix]: layout[index] },
      { $set: { [`${prefix}.cards`]: cards, [`${prefix}.defaultCardKey`]: defaultCardKey } },
    )
    if (result.modifiedCount !== 1)
      throw new Error('Content changed during migration. Preview again before retrying.')
  }
  if (apply) console.log('Migration complete. Original names, artwork and benefit arrays retained.')
} finally {
  await connection.close()
}
