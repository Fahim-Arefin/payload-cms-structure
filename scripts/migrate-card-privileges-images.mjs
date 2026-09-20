import { createRequire } from 'node:module'
import { config } from 'dotenv'

// Preview: node scripts/migrate-card-privileges-images.mjs
// Apply:   node scripts/migrate-card-privileges-images.mjs --apply
// Run once per environment when deploying the group-level card image schema.
config({ quiet: true })

// Use the MongoDB adapter's existing dependency; no extra package is needed.
const require = createRequire(import.meta.url)
const adapterRequire = createRequire(require.resolve('@payloadcms/db-mongodb'))
const mongoose = adapterRequire('mongoose')
const apply = process.argv.includes('--apply')

if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is required')
const connection = await mongoose.createConnection(process.env.DATABASE_URI).asPromise()

try {
  for (const [collectionName, layoutPath] of [
    ['pages', 'layout'],
    ['_pages_versions', 'version.layout'],
  ]) {
    const collection = connection.collection(collectionName)
    const documents = collection.find(
      { [`${layoutPath}.blockType`]: 'cardPrivileges' },
      { projection: { [layoutPath]: 1 } },
    )
    let groups = 0
    for await (const doc of documents) {
      const layout = layoutPath === 'layout' ? doc.layout : doc.version?.layout
      for (const [index, block] of (layout ?? []).entries()) {
        if (block.blockType !== 'cardPrivileges') continue
        for (const name of ['metalCard', 'visaInfinite']) {
          const group = block[name]
          if (!group || group.cardImage) continue
          const previous = group.items?.find((item) => item.cardImage)
          if (!previous) continue
          const path = `${layoutPath}.${index}.${name}`
          const fields = {}
          for (const key of ['cardImage', 'cardImageOriginal', 'cardImageBlurDataURL']) {
            if (previous[key] != null) fields[`${path}.${key}`] = previous[key]
          }
          if (apply) {
            // Only add missing group artwork. Preserve all original array data,
            // page status, timestamps, and any concurrently selected group image.
            await collection.updateOne(
              {
                _id: doc._id,
                [`${path}.cardImage`]: null,
                [`${layoutPath}.${index}.blockType`]: 'cardPrivileges',
              },
              { $set: fields },
            )
          }
          groups++
        }
      }
    }
    console.log(
      `${collectionName}: ${groups} card groups ${apply ? 'migrated' : 'to migrate (dry run)'}`,
    )
  }
} finally {
  await connection.close()
}
