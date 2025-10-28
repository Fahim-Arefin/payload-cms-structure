// // working code
// import type { CollectionConfig } from 'payload'
// import { createBeforeChangeHook } from './createBeforeChangeHook'
// import { deleteRemovedMedia } from './deleteRemovedMedia'
// import type { ImageConfig, CreatedMedia } from './mediaUtils'
// import { MEDIA_SLUG } from './mediaUtils'

// // optional single-doc guard (keep if you already use it)
// import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'

// export type ArrayMediaConfig = {
//   fieldName: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// export type GroupMediaConfig = {
//   groupKey: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
//   groupItemLabelField?: string
// }

// /** Blocks: media directly on the block row */
// export type BlockSimpleMediaConfig = {
//   layoutKey: string // e.g. "layout"
//   blockType: string // block slug (we will write THIS into Media.derivedFrom)
//   mediaFields: string[] // fields on the block row itself
// }

// /** Blocks: array inside a block where items have media */
// export type BlockArrayMediaConfig = {
//   layoutKey: string
//   blockType: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
// }

// /** Blocks: group -> nested array where items have media */
// export type BlockGroupMediaConfig = {
//   layoutKey: string
//   blockType: string
//   groupKey: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   groupItemLabelField?: string
// }

// export type WithMediaLifecycleOpts = {
//   imageConfigs?: ImageConfig[]
//   arrayFields?: ArrayMediaConfig[]
//   groupFields?: GroupMediaConfig[]
//   blockSimpleFields?: BlockSimpleMediaConfig[]
//   blockArrayFields?: BlockArrayMediaConfig[]
//   blockGroupFields?: BlockGroupMediaConfig[]
//   skipOnDraft?: boolean
//   onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>
//   singleDocSlug?: string
//   /** collectionSlug will be stamped into media.ownerCollection */
//   collectionSlug?: string
// }

// /* ---------------- helpers ---------------- */

// const relID = (v: any): string | null => {
//   if (!v) return null
//   if (typeof v === 'string') return v
//   if (typeof v === 'object') {
//     if (typeof v.value === 'string') return v.value
//     if (typeof v.value?.id === 'string') return v.value.id
//     if (typeof v.id === 'string') return v.id
//   }
//   return null
// }

// function isBlockItemOfType(row: any, type: string) {
//   return row && typeof row === 'object' && row.blockType === type
// }

// function eachBlockRow(
//   holder: any,
//   layoutKey: string,
//   blockType: string,
//   cb: (row: any, idx: number) => void,
// ) {
//   const rows = Array.isArray(holder?.[layoutKey]) ? holder[layoutKey] : []
//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i]
//     if (isBlockItemOfType(row, blockType)) cb(row, i)
//   }
// }

// /** We want (id, derivedFromSlug) pairs of all *current* references in the saved doc */
// function collectIDsWithSource(
//   doc: any,
//   simpleFields: string[],
//   arrayFields: Array<{ field: string; mediaFields: string[] }>,
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
//   blockSimpleFields: BlockSimpleMediaConfig[],
//   blockArrayFields: BlockArrayMediaConfig[],
//   blockGroupFields: BlockGroupMediaConfig[],
// ): Array<{ id: string; derivedFrom?: string; ownerField?: string }> {
//   const out: Array<{ id: string; derivedFrom?: string; ownerField?: string }> = []

//   const addPair = (holder: any, base: string, derivedFrom?: string) => {
//     const a = relID(holder?.[base])
//     if (a) out.push({ id: String(a), derivedFrom, ownerField: base })
//     const b = relID(holder?.[`${base}Original`])
//     if (b) out.push({ id: String(b), derivedFrom, ownerField: `${base}Original` })
//   }

//   // 1) top-level simple fields (no block; we won't set derivedFrom here)
//   for (const f of simpleFields) addPair(doc, f, undefined)

//   // 2) one-level arrays (no block; leave derivedFrom empty)
//   for (const a of arrayFields) {
//     const items = doc?.[a.field]
//     if (!Array.isArray(items)) continue
//     for (const it of items) for (const mf of a.mediaFields) addPair(it, mf, undefined)
//   }

//   // 3) nested arrays (no block; leave derivedFrom empty)
//   for (const g of groupFields) {
//     const holder = doc?.[g.groupKey]
//     if (Array.isArray(holder)) {
//       for (const gi of holder) {
//         const nested = gi?.[g.arrayKey]
//         if (!Array.isArray(nested)) continue
//         for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf, undefined)
//       }
//     } else if (holder && typeof holder === 'object') {
//       const nested = holder?.[g.arrayKey]
//       if (!Array.isArray(nested)) continue
//       for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf, undefined)
//     }
//   }

//   // 4) blocks: media on the block row — derivedFrom = blockType (slug)
//   for (const b of blockSimpleFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       for (const mf of b.mediaFields) addPair(row, mf, b.blockType)
//     })
//   }

//   // 5) blocks: array items with media — derivedFrom = blockType (slug)
//   for (const b of blockArrayFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
//       for (const it of items) for (const mf of b.mediaFields) addPair(it, mf, b.blockType)
//     })
//   }

//   // 6) blocks: groups -> arrays — derivedFrom = blockType (slug)
//   // for (const b of blockGroupFields) {
//   //   eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//   //     const groups = Array.isArray(row?.[b.groupKey]) ? row[b.groupKey] : []
//   //     for (const g of groups) {
//   //       const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
//   //       for (const ni of nested) for (const mf of b.mediaFields) addPair(ni, mf, b.blockType)
//   //     }
//   //   })
//   // }

//   // 6) blocks: groups -> arrays — derivedFrom = blockType (slug)
//   for (const b of blockGroupFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const holder = row?.[b.groupKey]

//       // Case A: group is an ARRAY of group items
//       if (Array.isArray(holder)) {
//         for (const g of holder) {
//           const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
//           for (const ni of nested) for (const mf of b.mediaFields) addPair(ni, mf, b.blockType)
//         }
//         return
//       }

//       // ✅ Case B: group is a plain OBJECT that itself contains the array (your expectations.{left|right})
//       if (holder && typeof holder === 'object') {
//         const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
//         for (const ni of nested) for (const mf of b.mediaFields) addPair(ni, mf, b.blockType)
//       }
//     })
//   }

//   return out
// }

// /** Finalize (and stamp) the media actually referenced by this saved doc. */
// async function finalizeReferencedMedia(opts: {
//   req: any
//   doc: any
//   collectionSlug?: string
//   simpleFields: string[]
//   arrayFields: Array<{ field: string; mediaFields: string[] }>
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
//   blockSimpleFields: BlockSimpleMediaConfig[]
//   blockArrayFields: BlockArrayMediaConfig[]
//   blockGroupFields: BlockGroupMediaConfig[]
// }) {
//   const {
//     req,
//     doc,
//     collectionSlug,
//     simpleFields,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//   } = opts

//   const refs = collectIDsWithSource(
//     doc,
//     simpleFields,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//   )
//   if (!refs.length) return

//   for (const ref of refs) {
//     try {
//       await req.payload.update({
//         collection: MEDIA_SLUG,
//         id: ref.id,
//         data: {
//           uploadSessionId: doc?.uploadSessionId ?? undefined,
//           ownerCollection: collectionSlug ?? undefined,
//           ownerDocId: String(doc.id),
//           ownerField: ref.ownerField,
//           // 👇 Only the block slug, just like you asked
//           derivedFrom: ref.derivedFrom ?? undefined,
//           temporary: false,
//         },
//         overrideAccess: true,
//       })
//     } catch {
//       /* ignore */
//     }
//   }
// }

// /* ---------------- main ---------------- */

// export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
//   const {
//     imageConfigs = [],
//     arrayFields = [],
//     groupFields = [],
//     blockSimpleFields = [],
//     blockArrayFields = [],
//     blockGroupFields = [],
//     skipOnDraft = true,
//     onAfterChange,
//     singleDocSlug,
//     collectionSlug,
//   } = opts

//   const simpleMediaNames = imageConfigs.map((c) => c.fieldName)
//   const simpleDeleteFields = [...simpleMediaNames, ...simpleMediaNames.map((n) => `${n}Original`)]
//   const arrayDeleteFields = arrayFields.map((a) => ({
//     field: a.fieldName,
//     mediaFields: [...a.mediaFields, ...a.mediaFields.map((n) => `${n}Original`)],
//   }))

//   const beforeChangeCreator = createBeforeChangeHook({
//     imageConfigs,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//   })

//   const stashSessionIdPreHook = ({ req, data }: any) => {
//     ;(req as any)._uploadSessionId = data?.uploadSessionId
//     return data
//   }

//   return {
//     beforeValidate: [stashSessionIdPreHook],
//     beforeChange: [stashSessionIdPreHook, beforeChangeCreator],
//     afterChange: [
//       async ({ req, doc, previousDoc }) => {
//         // delete removed relations (including originals)
//         await deleteRemovedMedia({
//           req,
//           previousDoc,
//           doc,
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//           skipOnDraft,
//         })

//         // stamp all referenced media (owner*, temporary:false, derivedFrom = block slug)
//         await finalizeReferencedMedia({
//           req,
//           doc,
//           collectionSlug: collectionSlug || singleDocSlug,
//           simpleFields: simpleMediaNames,
//           arrayFields: arrayFields.map((a) => ({ field: a.fieldName, mediaFields: a.mediaFields })),
//           groupFields: groupFields.map((g) => ({
//             groupKey: g.groupKey,
//             arrayKey: g.arrayKey,
//             mediaFields: g.mediaFields,
//           })),
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//         })

//         // clear rollback stash
//         const r = req as any
//         if (Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []

//         if (onAfterChange) await onAfterChange({ req, doc, previousDoc })
//         return doc
//       },
//     ],
//     afterError: [
//       async ({ req }) => {
//         const r = req as any
//         const stash: CreatedMedia[] = Array.isArray(r._createdMediaForRollback)
//           ? r._createdMediaForRollback
//           : []
//         for (const m of stash) {
//           try {
//             await req.payload.delete({ collection: m.collection, id: m.id, overrideAccess: true })
//           } catch {}
//         }
//         r._createdMediaForRollback = []
//       },
//     ],
//     afterDelete: [
//       async ({ req, doc }) => {
//         await deleteRemovedMedia({
//           req,
//           previousDoc: doc,
//           doc: {},
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//           skipOnDraft: false,
//         })

//         // ownerCollection sweep
//         try {
//           const found = await req.payload.find({
//             collection: MEDIA_SLUG,
//             limit: 500,
//             where: {
//               and: [
//                 { ownerDocId: { equals: String(doc.id) } },
//                 { ownerCollection: { exists: true } },
//               ],
//             },
//             depth: 0,
//             overrideAccess: true,
//           })
//           for (const m of found.docs) {
//             await req.payload.delete({ collection: MEDIA_SLUG, id: m.id, overrideAccess: true })
//           }
//         } catch (e) {
//           req.payload.logger?.warn?.(`afterDelete owner cleanup failed: ${(e as Error).message}`)
//         }
//       },
//     ],
//     ...(singleDocSlug
//       ? { beforeOperation: [createSingleDocBeforeOperationHook(singleDocSlug)] }
//       : {}),
//   }
// }

// =================================================================================
// =================================================================================
// =================================================================================
// // // testing (last working code)
// import type { CollectionConfig } from 'payload'
// import { createBeforeChangeHook } from './createBeforeChangeHook'
// import { deleteRemovedMedia } from './deleteRemovedMedia'
// import type { ImageConfig, CreatedMedia } from './mediaUtils'
// import { MEDIA_SLUG } from './mediaUtils'

// // optional single-doc guard (keep if you already use it)
// import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'

// export type ArrayMediaConfig = {
//   fieldName: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// export type GroupMediaConfig = {
//   groupKey: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
//   groupItemLabelField?: string
// }

// /** Blocks: media directly on the block row */
// export type BlockSimpleMediaConfig = {
//   layoutKey: string // e.g. "layout"
//   blockType: string // block slug (we will write THIS into Media.derivedFrom)
//   mediaFields: string[] // fields on the block row itself
//   mediaFieldLabels?: Record<string, string> // <-- add this line
// }

// /** Blocks: array inside a block where items have media */
// export type BlockArrayMediaConfig = {
//   layoutKey: string
//   blockType: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string> // <-- add this line
// }

// /** Blocks: group -> nested array where items have media */
// export type BlockGroupMediaConfig = {
//   layoutKey: string
//   blockType: string
//   groupKey: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   groupItemLabelField?: string
//   mediaFieldLabels?: Record<string, string> // <-- add this line
// }

// export type WithMediaLifecycleOpts = {
//   imageConfigs?: ImageConfig[]

//   /** NEW: plain upload fields (e.g., PDFs) at the top level (no image processing). */
//   otherUploadFields?: string[]

//   arrayFields?: ArrayMediaConfig[]
//   groupFields?: GroupMediaConfig[]
//   blockSimpleFields?: BlockSimpleMediaConfig[]
//   blockArrayFields?: BlockArrayMediaConfig[]
//   blockGroupFields?: BlockGroupMediaConfig[]
//   skipOnDraft?: boolean
//   onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>
//   singleDocSlug?: string
//   /** collectionSlug will be stamped into media.ownerCollection */
//   collectionSlug?: string
// }

// /* ---------------- helpers ---------------- */

// const relID = (v: any): string | null => {
//   if (!v) return null
//   if (typeof v === 'string') return v
//   if (typeof v === 'object') {
//     if (typeof v.value === 'string') return v.value
//     if (typeof v.value?.id === 'string') return v.value.id
//     if (typeof v.id === 'string') return v.id
//   }
//   return null
// }

// function isBlockItemOfType(row: any, type: string) {
//   return row && typeof row === 'object' && row.blockType === type
// }

// function eachBlockRow(
//   holder: any,
//   layoutKey: string,
//   blockType: string,
//   cb: (row: any, idx: number) => void,
// ) {
//   const rows = Array.isArray(holder?.[layoutKey]) ? holder[layoutKey] : []
//   for (let i = 0; i < rows.length; i++) {
//     const row = rows[i]
//     if (isBlockItemOfType(row, blockType)) cb(row, i)
//   }
// }

// /** We want (id, derivedFromSlug) pairs of all *current* references in the saved doc */
// function collectIDsWithSource(
//   doc: any,
//   simpleFields: string[],
//   arrayFields: Array<{ field: string; mediaFields: string[] }>,
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
//   blockSimpleFields: BlockSimpleMediaConfig[],
//   blockArrayFields: BlockArrayMediaConfig[],
//   blockGroupFields: BlockGroupMediaConfig[],
// ): Array<{ id: string; derivedFrom?: string; ownerField?: string }> {
//   const out: Array<{ id: string; derivedFrom?: string; ownerField?: string }> = []

//   const addPair = (holder: any, base: string, derivedFrom?: string) => {
//     const a = relID(holder?.[base])
//     if (a) out.push({ id: String(a), derivedFrom, ownerField: base })
//     const b = relID(holder?.[`${base}Original`])
//     if (b) out.push({ id: String(b), derivedFrom, ownerField: `${base}Original` })
//   }

//   // 1) top-level simple fields (no block; we won't set derivedFrom here)
//   for (const f of simpleFields) addPair(doc, f, undefined)

//   // 2) one-level arrays (no block; leave derivedFrom empty)
//   for (const a of arrayFields) {
//     const items = doc?.[a.field]
//     if (!Array.isArray(items)) continue
//     for (const it of items) for (const mf of a.mediaFields) addPair(it, mf, undefined)
//   }

//   // 3) nested arrays (no block; leave derivedFrom empty)
//   for (const g of groupFields) {
//     const holder = doc?.[g.groupKey]
//     if (Array.isArray(holder)) {
//       for (const gi of holder) {
//         const nested = gi?.[g.arrayKey]
//         if (!Array.isArray(nested)) continue
//         for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf, undefined)
//       }
//     } else if (holder && typeof holder === 'object') {
//       const nested = holder?.[g.arrayKey]
//       if (!Array.isArray(nested)) continue
//       for (const ni of nested) for (const mf of g.mediaFields) addPair(ni, mf, undefined)
//     }
//   }

//   // 4) blocks: media on the block row — derivedFrom = blockType (slug)
//   for (const b of blockSimpleFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       for (const mf of b.mediaFields) addPair(row, mf, b.blockType)
//     })
//   }

//   // 5) blocks: array items with media — derivedFrom = blockType (slug)
//   for (const b of blockArrayFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
//       for (const it of items) for (const mf of b.mediaFields) addPair(it, mf, b.blockType)
//     })
//   }

//   // 6) blocks: groups -> arrays — derivedFrom = blockType (slug)
//   for (const b of blockGroupFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const holder = row?.[b.groupKey]

//       // Case A: group is an ARRAY of group items
//       if (Array.isArray(holder)) {
//         for (const g of holder) {
//           const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
//           for (const ni of nested) for (const mf of b.mediaFields) addPair(ni, mf, b.blockType)
//         }
//         return
//       }

//       // Case B: group is a plain OBJECT that itself contains the array
//       if (holder && typeof holder === 'object') {
//         const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
//         for (const ni of nested) for (const mf of b.mediaFields) addPair(ni, mf, b.blockType)
//       }
//     })
//   }

//   return out
// }

// /** Finalize (and stamp) the media actually referenced by this saved doc. */
// async function finalizeReferencedMedia(opts: {
//   req: any
//   doc: any
//   collectionSlug?: string
//   simpleFields: string[]
//   arrayFields: Array<{ field: string; mediaFields: string[] }>
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
//   blockSimpleFields: BlockSimpleMediaConfig[]
//   blockArrayFields: BlockArrayMediaConfig[]
//   blockGroupFields: BlockGroupMediaConfig[]
// }) {
//   const {
//     req,
//     doc,
//     collectionSlug,
//     simpleFields,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//   } = opts

//   const refs = collectIDsWithSource(
//     doc,
//     simpleFields,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//   )
//   if (!refs.length) return

//   for (const ref of refs) {
//     try {
//       await req.payload.update({
//         collection: MEDIA_SLUG,
//         id: ref.id,
//         data: {
//           uploadSessionId: doc?.uploadSessionId ?? undefined,
//           ownerCollection: collectionSlug ?? undefined,
//           ownerDocId: String(doc.id),
//           ownerField: ref.ownerField,
//           // Only the block slug
//           derivedFrom: ref.derivedFrom ?? undefined,
//           temporary: false,
//         },
//         overrideAccess: true,
//       })
//     } catch {
//       /* ignore */
//     }
//   }
// }

// /* ---------------- main ---------------- */

// export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
//   const {
//     imageConfigs = [],
//     otherUploadFields = [], // <- NEW
//     arrayFields = [],
//     groupFields = [],
//     blockSimpleFields = [],
//     blockArrayFields = [],
//     blockGroupFields = [],
//     skipOnDraft = true,
//     onAfterChange,
//     singleDocSlug,
//     collectionSlug,
//   } = opts

//   // add non-image upload fields (e.g., PDFs) to the tracked simple fields
//   const simpleMediaNames = [...imageConfigs.map((c) => c.fieldName), ...otherUploadFields]

//   const simpleDeleteFields = [...simpleMediaNames, ...simpleMediaNames.map((n) => `${n}Original`)]

//   const arrayDeleteFields = arrayFields.map((a) => ({
//     field: a.fieldName,
//     mediaFields: [...a.mediaFields, ...a.mediaFields.map((n) => `${n}Original`)],
//   }))

//   const beforeChangeCreator = createBeforeChangeHook({
//     imageConfigs,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//   })

//   const stashSessionIdPreHook = ({ req, data }: any) => {
//     ;(req as any)._uploadSessionId = data?.uploadSessionId
//     return data
//   }

//   return {
//     beforeValidate: [stashSessionIdPreHook],
//     beforeChange: [stashSessionIdPreHook, beforeChangeCreator],
//     afterChange: [
//       async ({ req, doc, previousDoc }) => {
//         // delete removed relations (including originals)
//         await deleteRemovedMedia({
//           req,
//           previousDoc,
//           doc,
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//           skipOnDraft,
//         })

//         // stamp all referenced media (owner*, temporary:false, derivedFrom = block slug)
//         await finalizeReferencedMedia({
//           req,
//           doc,
//           collectionSlug: collectionSlug || singleDocSlug,
//           simpleFields: simpleMediaNames,
//           arrayFields: arrayFields.map((a) => ({ field: a.fieldName, mediaFields: a.mediaFields })),
//           groupFields: groupFields.map((g) => ({
//             groupKey: g.groupKey,
//             arrayKey: g.arrayKey,
//             mediaFields: g.mediaFields,
//           })),
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//         })

//         // clear rollback stash
//         const r = req as any
//         if (Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []

//         if (onAfterChange) await onAfterChange({ req, doc, previousDoc })
//         return doc
//       },
//     ],
//     afterError: [
//       async ({ req }) => {
//         const r = req as any
//         const stash: CreatedMedia[] = Array.isArray(r._createdMediaForRollback)
//           ? r._createdMediaForRollback
//           : []
//         for (const m of stash) {
//           try {
//             await req.payload.delete({ collection: m.collection, id: m.id, overrideAccess: true })
//           } catch {}
//         }
//         r._createdMediaForRollback = []
//       },
//     ],
//     afterDelete: [
//       async ({ req, doc }) => {
//         await deleteRemovedMedia({
//           req,
//           previousDoc: doc,
//           doc: {},
//           mediaFields: simpleDeleteFields,
//           arrayFields: arrayDeleteFields,
//           groupFields,
//           blockSimpleFields,
//           blockArrayFields,
//           blockGroupFields,
//           skipOnDraft: false,
//         })

//         // ownerCollection sweep
//         try {
//           const found = await req.payload.find({
//             collection: MEDIA_SLUG,
//             limit: 500,
//             where: {
//               and: [
//                 { ownerDocId: { equals: String(doc.id) } },
//                 { ownerCollection: { exists: true } },
//               ],
//             },
//             depth: 0,
//             overrideAccess: true,
//           })
//           for (const m of found.docs) {
//             await req.payload.delete({ collection: MEDIA_SLUG, id: m.id, overrideAccess: true })
//           }
//         } catch (e) {
//           req.payload.logger?.warn?.(`afterDelete owner cleanup failed: ${(e as Error).message}`)
//         }
//       },
//     ],
//     ...(singleDocSlug
//       ? { beforeOperation: [createSingleDocBeforeOperationHook(singleDocSlug)] }
//       : {}),
//   }
// }

// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
// testing (last working code) — UPDATED: remove direct processImageField calls to avoid TS errors.
// This file now relies on createBeforeChangeHook + imageConfigs to do all image processing.
// We still ADD support for groupSimpleFields and groupNestedArrayFields in deletion/finalization paths.
// withMediaLifecycle.ts
import type { CollectionConfig } from 'payload'
import { createBeforeChangeHook } from './createBeforeChangeHook'
import { deleteRemovedMedia } from './deleteRemovedMedia'
import type { ImageConfig, CreatedMedia } from './mediaUtils'
import { MEDIA_SLUG } from './mediaUtils'

// optional single-doc guard (keep if you already use it)
import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'

export type ArrayMediaConfig = {
  fieldName: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

export type GroupMediaConfig = {
  groupKey: string
  arrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
  groupItemLabelField?: string
}

/** Blocks: media directly on the block row */
export type BlockSimpleMediaConfig = {
  layoutKey: string // e.g. "layout"
  blockType: string // block slug (we will write THIS into Media.derivedFrom)
  mediaFields: string[] // fields on the block row itself
  mediaFieldLabels?: Record<string, string>
}

/** Blocks: array inside a block where items have media */
export type BlockArrayMediaConfig = {
  layoutKey: string
  blockType: string
  arrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

/** Blocks: group -> nested array where items have media */
export type BlockGroupMediaConfig = {
  layoutKey: string
  blockType: string
  groupKey: string
  arrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  groupItemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

export type WithMediaLifecycleOpts = {
  imageConfigs?: ImageConfig[]

  /** Plain upload fields (e.g., PDFs) at the top level (or dot-path like "group.file"). */
  otherUploadFields?: string[]

  arrayFields?: ArrayMediaConfig[]
  groupFields?: GroupMediaConfig[]
  blockSimpleFields?: BlockSimpleMediaConfig[]
  blockArrayFields?: BlockArrayMediaConfig[]
  blockGroupFields?: BlockGroupMediaConfig[]
  skipOnDraft?: boolean
  onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>
  singleDocSlug?: string
  /** collectionSlug will be stamped into media.ownerCollection */
  collectionSlug?: string
}

/* ---------------- helpers ---------------- */

const relID = (v: any): string | null => {
  if (!v) return null
  if (typeof v === 'string') return v
  if (typeof v === 'object') {
    if (typeof v.value === 'string') return v.value
    if (typeof v.value?.id === 'string') return v.value.id
    if (typeof v.id === 'string') return v.id
  }
  return null
}

function isBlockItemOfType(row: any, type: string) {
  return row && typeof row === 'object' && row.blockType === type
}

function eachBlockRow(
  holder: any,
  layoutKey: string,
  blockType: string,
  cb: (row: any, idx: number) => void,
) {
  const rows = Array.isArray(holder?.[layoutKey]) ? holder[layoutKey] : []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    if (isBlockItemOfType(row, blockType)) cb(row, i)
  }
}

// NEW: safe getter by dot path (supports "a.b.c")
function getByPath(obj: any, path: string): any {
  if (!obj) return undefined
  if (!path.includes('.')) return obj?.[path]
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}

// NEW: we only need to READ values by path in this file; stamping uses payload.update directly

/** We want (id, derivedFromSlug, ownerField) pairs of all *current* references in the saved doc */
function collectIDsWithSource(
  doc: any,
  simpleFields: string[],
  arrayFields: Array<{ field: string; mediaFields: string[] }>,
  groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
  blockSimpleFields: BlockSimpleMediaConfig[],
  blockArrayFields: BlockArrayMediaConfig[],
  blockGroupFields: BlockGroupMediaConfig[],
): Array<{ id: string; derivedFrom?: string; ownerField?: string }> {
  const out: Array<{ id: string; derivedFrom?: string; ownerField?: string }> = []

  // NEW: accept dot-paths in simpleFields and look up both field and fieldOriginal by path
  const addPairByPath = (root: any, path: string, derivedFrom?: string) => {
    const val = getByPath(root, path)
    const id = relID(val)
    if (id) out.push({ id: String(id), derivedFrom, ownerField: path })

    const origPath = `${path}Original`
    const oVal = getByPath(root, origPath)
    const oid = relID(oVal)
    if (oid) out.push({ id: String(oid), derivedFrom, ownerField: origPath })
  }

  // 1) top-level (or dot-path) simple fields (no block; we won't set derivedFrom here)
  for (const f of simpleFields) {
    addPairByPath(doc, f, undefined)
  }

  // 2) one-level arrays (no block; leave derivedFrom empty)
  for (const a of arrayFields) {
    const items = doc?.[a.field]
    if (!Array.isArray(items)) continue
    for (const it of items) for (const mf of a.mediaFields) addPairByPath(it, mf, undefined)
  }

  // 3) nested arrays under a group (no block; leave derivedFrom empty)
  for (const g of groupFields) {
    const holder = doc?.[g.groupKey]
    if (Array.isArray(holder)) {
      for (const gi of holder) {
        const nested = gi?.[g.arrayKey]
        if (!Array.isArray(nested)) continue
        for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
      }
    } else if (holder && typeof holder === 'object') {
      const nested = holder?.[g.arrayKey]
      if (!Array.isArray(nested)) continue
      for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
    }
  }

  // 4) blocks: media on the block row — derivedFrom = blockType (slug)
  for (const b of blockSimpleFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      for (const mf of b.mediaFields) addPairByPath(row, mf, b.blockType)
    })
  }

  // 5) blocks: array items with media — derivedFrom = blockType (slug)
  for (const b of blockArrayFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
      for (const it of items) for (const mf of b.mediaFields) addPairByPath(it, mf, b.blockType)
    })
  }

  // 6) blocks: groups -> arrays — derivedFrom = blockType (slug)
  for (const b of blockGroupFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const holder = row?.[b.groupKey]

      // Case A: group is an ARRAY of group items
      if (Array.isArray(holder)) {
        for (const g of holder) {
          const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
          for (const ni of nested)
            for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
        }
        return
      }

      // Case B: group is a plain OBJECT that itself contains the array
      if (holder && typeof holder === 'object') {
        const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
        for (const ni of nested) for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
      }
    })
  }

  return out
}

/** Finalize (and stamp) the media actually referenced by this saved doc. */
async function finalizeReferencedMedia(opts: {
  req: any
  doc: any
  collectionSlug?: string
  simpleFields: string[]
  arrayFields: Array<{ field: string; mediaFields: string[] }>
  groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>
  blockSimpleFields: BlockSimpleMediaConfig[]
  blockArrayFields: BlockArrayMediaConfig[]
  blockGroupFields: BlockGroupMediaConfig[]
}) {
  const {
    req,
    doc,
    collectionSlug,
    simpleFields,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
  } = opts

  const refs = collectIDsWithSource(
    doc,
    simpleFields,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
  )
  if (!refs.length) return

  for (const ref of refs) {
    try {
      await req.payload.update({
        collection: MEDIA_SLUG,
        id: ref.id,
        data: {
          uploadSessionId: doc?.uploadSessionId ?? undefined,
          ownerCollection: collectionSlug ?? undefined, // stamp from opts
          ownerDocId: String(doc.id),
          ownerField: ref.ownerField, // e.g., "branding.logo" or "branding.logoOriginal"
          derivedFrom: ref.derivedFrom ?? undefined, // only the block slug (if any)
          temporary: false,
        },
        overrideAccess: true,
      })
    } catch {
      /* ignore */
    }
  }
}

/* ---------------- main ---------------- */

export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
  const {
    imageConfigs = [],
    otherUploadFields = [],
    arrayFields = [],
    groupFields = [],
    blockSimpleFields = [],
    blockArrayFields = [],
    blockGroupFields = [],
    skipOnDraft = true,
    onAfterChange,
    singleDocSlug,
    collectionSlug,
  } = opts

  // Track simple media (supports dot-paths like "branding.logo")
  const simpleMediaNames = [...imageConfigs.map((c) => c.fieldName), ...otherUploadFields]

  // For delete sweep we include both field and fieldOriginal (dot-path OK)
  const simpleDeleteFields = [...simpleMediaNames, ...simpleMediaNames.map((n) => `${n}Original`)]

  const arrayDeleteFields = arrayFields.map((a) => ({
    field: a.fieldName,
    mediaFields: [...a.mediaFields, ...a.mediaFields.map((n) => `${n}Original`)],
  }))

  const beforeChangeCreator = createBeforeChangeHook({
    imageConfigs,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
  })

  const stashSessionIdPreHook = ({ req, data }: any) => {
    ;(req as any)._uploadSessionId = data?.uploadSessionId
    return data
  }

  return {
    beforeValidate: [stashSessionIdPreHook],
    beforeChange: [stashSessionIdPreHook, beforeChangeCreator],
    afterChange: [
      async ({ req, doc, previousDoc }) => {
        // delete removed relations (including originals)
        await deleteRemovedMedia({
          req,
          previousDoc,
          doc,
          mediaFields: simpleDeleteFields, // dot-path aware
          arrayFields: arrayDeleteFields,
          groupFields,
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          skipOnDraft,
        })

        // stamp all referenced media (owner*, temporary:false, derivedFrom = block slug)
        await finalizeReferencedMedia({
          req,
          doc,
          collectionSlug: collectionSlug || singleDocSlug,
          simpleFields: simpleMediaNames,
          arrayFields: arrayFields.map((a) => ({ field: a.fieldName, mediaFields: a.mediaFields })),
          groupFields: groupFields.map((g) => ({
            groupKey: g.groupKey,
            arrayKey: g.arrayKey,
            mediaFields: g.mediaFields,
          })),
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
        })

        // clear rollback stash
        const r = req as any
        if (Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []

        // Optional cleanup trigger (like your BoardOfDirectors global)
        if (onAfterChange) await onAfterChange({ req, doc, previousDoc })
        return doc
      },
    ],
    afterError: [
      async ({ req }) => {
        const r = req as any
        const stash: CreatedMedia[] = Array.isArray(r._createdMediaForRollback)
          ? r._createdMediaForRollback
          : []
        for (const m of stash) {
          try {
            await req.payload.delete({ collection: m.collection, id: m.id, overrideAccess: true })
          } catch {}
        }
        r._createdMediaForRollback = []
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        await deleteRemovedMedia({
          req,
          previousDoc: doc,
          doc: {},
          mediaFields: simpleDeleteFields,
          arrayFields: arrayDeleteFields,
          groupFields,
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          skipOnDraft: false,
        })

        // ownerCollection sweep
        try {
          const found = await req.payload.find({
            collection: MEDIA_SLUG,
            limit: 500,
            where: {
              and: [
                { ownerDocId: { equals: String(doc.id) } },
                { ownerCollection: { exists: true } },
              ],
            },
            depth: 0,
            overrideAccess: true,
          })
          for (const m of found.docs) {
            await req.payload.delete({ collection: MEDIA_SLUG, id: m.id, overrideAccess: true })
          }
        } catch (e) {
          req.payload.logger?.warn?.(`afterDelete owner cleanup failed: ${(e as Error).message}`)
        }
      },
    ],
    ...(singleDocSlug
      ? { beforeOperation: [createSingleDocBeforeOperationHook(singleDocSlug)] }
      : {}),
  }
}
