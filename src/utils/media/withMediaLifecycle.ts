// import type { CollectionConfig } from 'payload'
// import { createBeforeChangeHook } from './createBeforeChangeHook'
// import { deleteRemovedMedia } from './deleteRemovedMedia'
// import type { ImageConfig, CreatedMedia } from './mediaUtils'
// import { MEDIA_SLUG } from './mediaUtils'
// import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'

// /* ───────────────── types ───────────────── */

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
//   layoutKey: string
//   blockType: string
//   mediaFields: string[]
//   mediaFieldLabels?: Record<string, string>
// }

// /** Blocks: array inside a block where items have media */
// export type BlockArrayMediaConfig = {
//   layoutKey: string
//   blockType: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// /** Blocks: group → nested array where items have media */
// export type BlockGroupMediaConfig = {
//   layoutKey: string
//   blockType: string
//   groupKey: string
//   arrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   groupItemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// /** Blocks: nested blocks[] → firstArray[] → secondArray[] → media */
// export type BlockNestedDeepMediaConfig = {
//   layoutKey: string
//   blockType: string
//   blocksKey: string
//   nestedBlockType: string
//   firstArrayKey: string
//   secondArrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// /** block → array[] → blocks[] → array[] → media */
// export type BlockArrayBlocksMediaConfig = {
//   layoutKey: string
//   blockType: string
//   arrayKey: string
//   blocksKey: string
//   nestedBlockType: string
//   nestedArrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// /** ⭐ block → array[] → blocks[] → groupKey{} → nestedArrayKey[] → media */
// export type BlockArrayBlocksGroupMediaConfig = {
//   layoutKey: string
//   blockType: string
//   arrayKey: string
//   blocksKey: string
//   nestedBlockType: string
//   groupKey: string
//   nestedArrayKey: string
//   mediaFields: string[]
//   itemLabelField?: string
//   mediaFieldLabels?: Record<string, string>
// }

// export type WithMediaLifecycleOpts = {
//   imageConfigs?: ImageConfig[]
//   /** top-level (or dot-path) upload fields like PDFs */
//   otherUploadFields?: string[]

//   arrayFields?: ArrayMediaConfig[]
//   groupFields?: GroupMediaConfig[]
//   blockSimpleFields?: BlockSimpleMediaConfig[]
//   blockArrayFields?: BlockArrayMediaConfig[]
//   blockGroupFields?: BlockGroupMediaConfig[]

//   /** blocks → nested blocks[] → firstArray[] → secondArray[] → media */
//   blockNestedDeepFields?: BlockNestedDeepMediaConfig[]

//   /** block → array[] → blocks[] → array[] → media */
//   blockArrayBlocksFields?: BlockArrayBlocksMediaConfig[]

//   /** ⭐ block → array[] → blocks[] → groupKey{} → nestedArrayKey[] → media */
//   blockArrayBlocksGroupFields?: BlockArrayBlocksGroupMediaConfig[]

//   skipOnDraft?: boolean
//   onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>

//   /** if present, guards collection to single doc */
//   singleDocSlug?: string
//   /** stamped into media.ownerCollection */
//   collectionSlug?: string
// }

// /* ───────────────── helpers ───────────────── */

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

// // ── dot-path safe getters/setters ──
// function getByPath(obj: any, path: string): any {
//   if (!obj) return undefined
//   if (!path.includes('.')) return obj?.[path]
//   return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
// }
// function setByPath(obj: any, path: string, value: any) {
//   const parts = path.split('.')
//   const last = parts.pop()!
//   let cur = obj
//   for (const k of parts) {
//     if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}
//     cur = cur[k]
//   }
//   cur[last] = value
// }

// // ── flatten/unflatten adapter for dot paths (simple fields only) ──
// function flattenDotFields(data: any, fieldNames: string[]) {
//   for (const name of fieldNames) {
//     if (!name.includes('.')) continue
//     const val = getByPath(data, name)
//     if (typeof val !== 'undefined') data[name] = val
//     const origPath = `${name}Original`
//     const origVal = getByPath(data, origPath)
//     if (typeof origVal !== 'undefined') data[origPath] = origVal
//   }
// }
// function unflattenDotFields(data: any, fieldNames: string[]) {
//   for (const name of fieldNames) {
//     if (!name.includes('.')) continue
//     if (Object.prototype.hasOwnProperty.call(data, name)) {
//       setByPath(data, name, data[name])
//       delete data[name]
//     }
//     const origPath = `${name}Original`
//     if (Object.prototype.hasOwnProperty.call(data, origPath)) {
//       setByPath(data, origPath, data[origPath])
//       delete data[origPath]
//     }
//   }
// }

// /** We want (id, derivedFromSlug, ownerField) pairs of all *current* references in the saved doc */
// function collectIDsWithSource(
//   doc: any,
//   simpleFields: string[],
//   arrayFields: Array<{ field: string; mediaFields: string[] }>,
//   groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
//   blockSimpleFields: BlockSimpleMediaConfig[],
//   blockArrayFields: BlockArrayMediaConfig[],
//   blockGroupFields: BlockGroupMediaConfig[],
//   // deep: blocks → blocks → array → array
//   blockNestedDeepFields: BlockNestedDeepMediaConfig[] = [],
//   // block → array → blocks → array
//   blockArrayBlocksFields: BlockArrayBlocksMediaConfig[] = [],
//   // ⭐ block → array → blocks → group → array
//   blockArrayBlocksGroupFields: BlockArrayBlocksGroupMediaConfig[] = [],
// ): Array<{ id: string; derivedFrom?: string; ownerField?: string }> {
//   const out: Array<{ id: string; derivedFrom?: string; ownerField?: string }> = []

//   const addPairByPath = (root: any, path: string, derivedFrom?: string) => {
//     const val = getByPath(root, path)
//     const id = relID(val)
//     if (id) out.push({ id: String(id), derivedFrom, ownerField: path })
//     const origPath = `${path}Original`
//     const oVal = getByPath(root, origPath)
//     const oid = relID(oVal)
//     if (oid) out.push({ id: String(oid), derivedFrom, ownerField: origPath })
//   }

//   // 1) top-level (or dot-path) simple fields
//   for (const f of simpleFields) addPairByPath(doc, f, undefined)

//   // 2) one-level arrays
//   for (const a of arrayFields) {
//     const items = doc?.[a.field]
//     if (!Array.isArray(items)) continue
//     for (const it of items) for (const mf of a.mediaFields) addPairByPath(it, mf, undefined)
//   }

//   // 3) nested arrays under a group
//   for (const g of groupFields) {
//     const holder = doc?.[g.groupKey]
//     if (Array.isArray(holder)) {
//       for (const gi of holder) {
//         const nested = gi?.[g.arrayKey]
//         if (!Array.isArray(nested)) continue
//         for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
//       }
//     } else if (holder && typeof holder === 'object') {
//       const nested = holder?.[g.arrayKey]
//       if (!Array.isArray(nested)) continue
//       for (const ni of nested) for (const mf of g.mediaFields) addPairByPath(ni, mf, undefined)
//     }
//   }

//   // 4) blocks: media on the block row
//   for (const b of blockSimpleFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       for (const mf of b.mediaFields) addPairByPath(row, mf, b.blockType)
//     })
//   }

//   // 5) blocks: array items with media
//   for (const b of blockArrayFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
//       for (const it of items) for (const mf of b.mediaFields) addPairByPath(it, mf, b.blockType)
//     })
//   }

//   // 6) blocks: groups -> arrays
//   for (const b of blockGroupFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
//       const holder = row?.[b.groupKey]

//       // array of groups
//       if (Array.isArray(holder)) {
//         for (const g of holder) {
//           const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
//           for (const ni of nested)
//             for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
//         }
//         return
//       }

//       // single group object
//       if (holder && typeof holder === 'object') {
//         const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
//         for (const ni of nested) for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
//       }
//     })
//   }

//   // 7) blocks: nested blocks[] → firstArray[] → secondArray[] → media
//   for (const b of blockNestedDeepFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
//       for (const inner of nestedBlocks) {
//         if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//         const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
//         for (const firstItem of firstArr) {
//           const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
//             ? firstItem[b.secondArrayKey]
//             : []
//           for (const secondItem of secondArr) {
//             for (const mf of b.mediaFields) addPairByPath(secondItem, mf, b.nestedBlockType)
//           }
//         }
//       }
//     })
//   }

//   // 8) block → array[] → blocks[] → array[] → media
//   for (const b of blockArrayBlocksFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
//       for (const arrItem of arr) {
//         const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
//         for (const inner of innerBlocks) {
//           if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//           const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
//           for (const ni of nestedArr) {
//             for (const mf of b.mediaFields) addPairByPath(ni, mf, b.nestedBlockType)
//           }
//         }
//       }
//     })
//   }

//   // 9) ⭐ block → array[] → blocks[] → groupKey{} → nestedArrayKey[] → media
//   for (const b of blockArrayBlocksGroupFields) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const topArr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
//       for (const topItem of topArr) {
//         const innerBlocks = Array.isArray(topItem?.[b.blocksKey]) ? topItem[b.blocksKey] : []
//         for (const inner of innerBlocks) {
//           if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//           const groupHolder = inner?.[b.groupKey]
//           // group can be an object or an array of groups
//           if (Array.isArray(groupHolder)) {
//             for (const g of groupHolder) {
//               const nestedArr = Array.isArray(g?.[b.nestedArrayKey]) ? g[b.nestedArrayKey] : []
//               for (const ni of nestedArr) {
//                 for (const mf of b.mediaFields) addPairByPath(ni, mf, b.nestedBlockType)
//               }
//             }
//           } else if (groupHolder && typeof groupHolder === 'object') {
//             const nestedArr = Array.isArray(groupHolder?.[b.nestedArrayKey])
//               ? groupHolder[b.nestedArrayKey]
//               : []
//             for (const ni of nestedArr) {
//               for (const mf of b.mediaFields) addPairByPath(ni, mf, b.nestedBlockType)
//             }
//           }
//         }
//       }
//     })
//   }

//   return out
// }

// /** Diff helper for deep nested removal: blocks → blocks → array → array */
// function collectDeepNestedIDs(doc: any, cfgs: BlockNestedDeepMediaConfig[]): Set<string> {
//   const ids = new Set<string>()
//   const push = (v: any) => {
//     const id = relID(v)
//     if (id) ids.add(String(id))
//     const oid = relID((v && (v as any).imageOriginal) ?? (v && (v as any).iconOriginal))
//     if (oid) ids.add(String(oid))
//   }

//   for (const b of cfgs) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
//       for (const inner of nestedBlocks) {
//         if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//         const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
//         for (const firstItem of firstArr) {
//           const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
//             ? firstItem[b.secondArrayKey]
//             : []
//           for (const secondItem of secondArr) {
//             for (const mf of b.mediaFields) {
//               const val = secondItem?.[mf]
//               if (val) push(val)
//               const orig = secondItem?.[`${mf}Original`]
//               if (orig) push(orig)
//             }
//           }
//         }
//       }
//     })
//   }
//   return ids
// }

// /** Diff helper for array → blocks → array removal */
// function collectArrayBlocksIDs(doc: any, cfgs: BlockArrayBlocksMediaConfig[]): Set<string> {
//   const ids = new Set<string>()
//   const pushRel = (v: any) => {
//     const id = relID(v)
//     if (id) ids.add(String(id))
//   }

//   for (const b of cfgs) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
//       for (const arrItem of arr) {
//         const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
//         for (const inner of innerBlocks) {
//           if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//           const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
//           for (const ni of nestedArr) {
//             for (const mf of b.mediaFields) {
//               pushRel(ni?.[mf])
//               pushRel(ni?.[`${mf}Original`])
//             }
//           }
//         }
//       }
//     })
//   }
//   return ids
// }

// /** ⭐ Diff helper for array → blocks → group → array removal */
// function collectArrayBlocksGroupIDs(
//   doc: any,
//   cfgs: BlockArrayBlocksGroupMediaConfig[],
// ): Set<string> {
//   const ids = new Set<string>()
//   const pushRel = (v: any) => {
//     const id = relID(v)
//     if (id) ids.add(String(id))
//   }

//   for (const b of cfgs) {
//     eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
//       const topArr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
//       for (const topItem of topArr) {
//         const innerBlocks = Array.isArray(topItem?.[b.blocksKey]) ? topItem[b.blocksKey] : []
//         for (const inner of innerBlocks) {
//           if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//           const groupHolder = inner?.[b.groupKey]
//           if (Array.isArray(groupHolder)) {
//             for (const g of groupHolder) {
//               const nestedArr = Array.isArray(g?.[b.nestedArrayKey]) ? g[b.nestedArrayKey] : []
//               for (const ni of nestedArr) {
//                 for (const mf of b.mediaFields) {
//                   pushRel(ni?.[mf])
//                   pushRel(ni?.[`${mf}Original`])
//                 }
//               }
//             }
//           } else if (groupHolder && typeof groupHolder === 'object') {
//             const nestedArr = Array.isArray(groupHolder?.[b.nestedArrayKey])
//               ? groupHolder[b.nestedArrayKey]
//               : []
//             for (const ni of nestedArr) {
//               for (const mf of b.mediaFields) {
//                 pushRel(ni?.[mf])
//                 pushRel(ni?.[`${mf}Original`])
//               }
//             }
//           }
//         }
//       }
//     })
//   }
//   return ids
// }

// /** 🔥 NEW: for drafts — clone publish media → lastDraft and rewire doc fields */
// async function clonePublishMediaToDraftInPlace(opts: {
//   req: any
//   doc: any
//   simpleMediaNames: string[]
//   arrayFields: ArrayMediaConfig[]
//   groupFields: GroupMediaConfig[]
//   blockSimpleFields: BlockSimpleMediaConfig[]
//   blockArrayFields: BlockArrayMediaConfig[]
//   blockGroupFields: BlockGroupMediaConfig[]
//   blockNestedDeepFields: BlockNestedDeepMediaConfig[]
//   blockArrayBlocksFields: BlockArrayBlocksMediaConfig[]
//   blockArrayBlocksGroupFields: BlockArrayBlocksGroupMediaConfig[]
// }) {
//   const {
//     req,
//     doc,
//     simpleMediaNames,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//     blockNestedDeepFields,
//     blockArrayBlocksFields,
//     blockArrayBlocksGroupFields,
//   } = opts

//   // cache: oldId -> newDraftId
//   const cloned = new Map<string, string>()

//   const cloneIfPublish = async (val: any): Promise<any> => {
//     const id = relID(val)
//     if (!id) return val

//     if (cloned.has(id)) {
//       const newId = cloned.get(id)!
//       if (typeof val === 'string') return newId
//       if (typeof val === 'object') return { ...(val as any), id: newId, value: newId }
//       return val
//     }

//     let mediaDoc: any
//     try {
//       mediaDoc = await req.payload.findByID({
//         collection: MEDIA_SLUG,
//         id,
//         depth: 0,
//         overrideAccess: true,
//       })
//     } catch {
//       return val
//     }
//     if (!mediaDoc) return val

//     const stage = mediaDoc.versionStage as 'publish' | 'lastDraft' | undefined
//     const isTemp = mediaDoc.temporary === true

//     // Already draft or temp → don't clone
//     if (stage === 'lastDraft' || isTemp) return val

//     // Treat undefined stage as publish
//     try {
//       const clone = await req.payload.create({
//         collection: MEDIA_SLUG,
//         data: {
//           filename: mediaDoc.filename,
//           filesize: mediaDoc.filesize,
//           width: mediaDoc.width,
//           height: mediaDoc.height,
//           mimeType: mediaDoc.mimeType,
//           prefix: mediaDoc.prefix,
//           focalX: mediaDoc.focalX,
//           focalY: mediaDoc.focalY,
//           url: mediaDoc.url,
//           thumbnailURL: mediaDoc.thumbnailURL ?? null,

//           temporary: false,
//           versionStage: 'lastDraft',
//         },
//         overrideAccess: true,
//       })

//       const newId = clone.id as string
//       cloned.set(id, newId)

//       if (typeof val === 'string') return newId
//       if (typeof val === 'object') return { ...(val as any), id: newId, value: newId }
//       return val
//     } catch {
//       return val
//     }
//   }

//   const processSimpleFieldPath = async (path: string) => {
//     const cur = getByPath(doc, path)
//     if (typeof cur !== 'undefined') {
//       const updated = await cloneIfPublish(cur)
//       if (updated !== cur) setByPath(doc, path, updated)
//     }
//     const origPath = `${path}Original`
//     const curOrig = getByPath(doc, origPath)
//     if (typeof curOrig !== 'undefined') {
//       const updatedOrig = await cloneIfPublish(curOrig)
//       if (updatedOrig !== curOrig) setByPath(doc, origPath, updatedOrig)
//     }
//   }

//   const processHolderField = async (holder: any, mf: string) => {
//     if (!holder || typeof holder !== 'object') return
//     const cur = holder[mf]
//     if (typeof cur !== 'undefined') {
//       holder[mf] = await cloneIfPublish(cur)
//     }
//     const orig = holder[`${mf}Original`]
//     if (typeof orig !== 'undefined') {
//       holder[`${mf}Original`] = await cloneIfPublish(orig)
//     }
//   }

//   // 1) simple fields (dot paths allowed)
//   for (const name of simpleMediaNames) {
//     await processSimpleFieldPath(name)
//   }

//   // 2) one-level arrays
//   for (const a of arrayFields) {
//     const items = doc?.[a.fieldName]
//     if (!Array.isArray(items)) continue
//     for (const it of items) for (const mf of a.mediaFields) await processHolderField(it, mf)
//   }

//   // 3) nested arrays under group
//   for (const g of groupFields) {
//     const holder = doc?.[g.groupKey]
//     if (Array.isArray(holder)) {
//       for (const gi of holder) {
//         const nested = gi?.[g.arrayKey]
//         if (!Array.isArray(nested)) continue
//         for (const ni of nested) for (const mf of g.mediaFields) await processHolderField(ni, mf)
//       }
//     } else if (holder && typeof holder === 'object') {
//       const nested = holder?.[g.arrayKey]
//       if (Array.isArray(nested)) {
//         for (const ni of nested) for (const mf of g.mediaFields) await processHolderField(ni, mf)
//       }
//     }
//   }

//   // 4) blocks: simple
//   for (const b of blockSimpleFields) {
//     const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
//     for (const row of rows) {
//       if (!isBlockItemOfType(row, b.blockType)) continue
//       for (const mf of b.mediaFields) await processHolderField(row, mf)
//     }
//   }

//   // 5) blocks: array
//   for (const b of blockArrayFields) {
//     const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
//     for (const row of rows) {
//       if (!isBlockItemOfType(row, b.blockType)) continue
//       const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
//       for (const it of items) for (const mf of b.mediaFields) await processHolderField(it, mf)
//     }
//   }

//   // 6) blocks: groups -> arrays
//   for (const b of blockGroupFields) {
//     const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
//     for (const row of rows) {
//       if (!isBlockItemOfType(row, b.blockType)) continue
//       const holder = row?.[b.groupKey]
//       if (Array.isArray(holder)) {
//         for (const g of holder) {
//           const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
//           for (const ni of nested) for (const mf of b.mediaFields) await processHolderField(ni, mf)
//         }
//       } else if (holder && typeof holder === 'object') {
//         const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
//         for (const ni of nested) for (const mf of b.mediaFields) await processHolderField(ni, mf)
//       }
//     }
//   }

//   // 7) blocks: nested blocks → array → array
//   for (const b of blockNestedDeepFields) {
//     const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
//     for (const outerRow of rows) {
//       if (!isBlockItemOfType(outerRow, b.blockType)) continue
//       const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
//       for (const inner of nestedBlocks) {
//         if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//         const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
//         for (const firstItem of firstArr) {
//           const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
//             ? firstItem[b.secondArrayKey]
//             : []
//           for (const secondItem of secondArr) {
//             for (const mf of b.mediaFields) await processHolderField(secondItem, mf)
//           }
//         }
//       }
//     }
//   }

//   // 8) block → array → blocks → array
//   for (const b of blockArrayBlocksFields) {
//     const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
//     for (const outerRow of rows) {
//       if (!isBlockItemOfType(outerRow, b.blockType)) continue
//       const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
//       for (const arrItem of arr) {
//         const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
//         for (const inner of innerBlocks) {
//           if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//           const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
//           for (const ni of nestedArr) {
//             for (const mf of b.mediaFields) await processHolderField(ni, mf)
//           }
//         }
//       }
//     }
//   }

//   // (Correct one, TypeScript-safe)
//   for (const b of blockArrayBlocksGroupFields) {
//     const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
//     for (const outerRow of rows) {
//       if (!isBlockItemOfType(outerRow, b.blockType)) continue
//       const topArr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
//       for (const topItem of topArr) {
//         const innerBlocks = Array.isArray(topItem?.[b.blocksKey]) ? topItem[b.blocksKey] : []
//         for (const inner of innerBlocks) {
//           if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
//           const groupHolder = inner?.[b.groupKey]
//           if (Array.isArray(groupHolder)) {
//             for (const g of groupHolder) {
//               const nestedArr = Array.isArray(g?.[b.nestedArrayKey]) ? g[b.nestedArrayKey] : []
//               for (const ni of nestedArr) {
//                 for (const mf of b.mediaFields) await processHolderField(ni, mf)
//               }
//             }
//           } else if (groupHolder && typeof groupHolder === 'object') {
//             const nestedArr = Array.isArray(groupHolder?.[b.nestedArrayKey])
//               ? groupHolder[b.nestedArrayKey]
//               : []
//             for (const ni of nestedArr) {
//               for (const mf of b.mediaFields) await processHolderField(ni, mf)
//             }
//           }
//         }
//       }
//     }
//   }
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
//   blockNestedDeepFields?: BlockNestedDeepMediaConfig[]
//   blockArrayBlocksFields?: BlockArrayBlocksMediaConfig[]
//   blockArrayBlocksGroupFields?: BlockArrayBlocksGroupMediaConfig[]
// }): Promise<string[]> {
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
//     blockNestedDeepFields = [],
//     blockArrayBlocksFields = [],
//     blockArrayBlocksGroupFields = [],
//   } = opts

//   const refs = collectIDsWithSource(
//     doc,
//     simpleFields,
//     arrayFields,
//     groupFields,
//     blockSimpleFields,
//     blockArrayFields,
//     blockGroupFields,
//     blockNestedDeepFields,
//     blockArrayBlocksFields,
//     blockArrayBlocksGroupFields,
//   )

//   if (!refs.length) return []

//   const stage: 'publish' | 'lastDraft' = doc?._status === 'draft' ? 'lastDraft' : 'publish'

//   const idSet = new Set<string>()

//   for (const ref of refs) {
//     idSet.add(ref.id)
//     try {
//       await req.payload.update({
//         collection: MEDIA_SLUG,
//         id: ref.id,
//         data: {
//           uploadSessionId: doc?.uploadSessionId ?? undefined,
//           ownerCollection: collectionSlug ?? undefined,
//           ownerDocId: String(doc.id),
//           ownerDocSlug: (doc as any)?.slug ?? undefined,
//           ownerDocName: (doc as any)?.name ?? undefined,
//           ownerBlockType: ref.derivedFrom ?? undefined,
//           ownerField: ref.ownerField,
//           derivedFrom: ref.derivedFrom ?? undefined,
//           temporary: false,
//           versionStage: stage,
//         },
//         overrideAccess: true,
//       })
//     } catch {
//       // ignore per-file errors
//     }
//   }

//   return Array.from(idSet)
// }

// /** 🔥 NEW: on publish — delete any media for this doc that is not referenced anymore */
// async function cleanupOwnerStaleMedia(opts: {
//   req: any
//   collectionSlug: string
//   docId: string | number
//   keepIds: Set<string>
// }) {
//   const { req, collectionSlug, docId, keepIds } = opts

//   try {
//     const res = await req.payload.find({
//       collection: MEDIA_SLUG,
//       limit: 1000,
//       where: {
//         and: [
//           { ownerCollection: { equals: collectionSlug } },
//           { ownerDocId: { equals: String(docId) } },
//         ],
//       },
//       depth: 0,
//       overrideAccess: true,
//     })

//     for (const m of res.docs) {
//       if (!keepIds.has(String(m.id))) {
//         try {
//           await req.payload.delete({
//             collection: MEDIA_SLUG,
//             id: m.id,
//             overrideAccess: true,
//           })
//         } catch {}
//       }
//     }
//   } catch (e) {
//     req.payload.logger?.warn?.(
//       `cleanupOwnerStaleMedia failed: ${(e as Error)?.message ?? 'unknown error'}`,
//     )
//   }
// }

// /* ───────────────── main ───────────────── */

// export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
//   const {
//     imageConfigs = [],
//     otherUploadFields = [],
//     arrayFields = [],
//     groupFields = [],
//     blockSimpleFields = [],
//     blockArrayFields = [],
//     blockGroupFields = [],
//     blockNestedDeepFields = [],
//     blockArrayBlocksFields = [],
//     blockArrayBlocksGroupFields = [],
//     skipOnDraft = true,
//     onAfterChange,
//     singleDocSlug,
//     collectionSlug,
//   } = opts

//   const effectiveCollectionSlug = collectionSlug || singleDocSlug

//   // Track simple media (supports dot-paths like "branding.logo")
//   const simpleMediaNames = [...imageConfigs.map((c) => c.fieldName), ...otherUploadFields]

//   // For delete sweep include both field and fieldOriginal
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

//   // Dot-path adapter (simple fields only)
//   const dotPathPreAdapter = ({ data }: any) => {
//     flattenDotFields(data, simpleMediaNames)
//     return data
//   }
//   const dotPathPostAdapter = ({ data }: any) => {
//     unflattenDotFields(data, simpleMediaNames)
//     return data
//   }

//   // 🔥 NEW: draft-only clone step
//   const draftCloneHook = async ({ req, data }: any) => {
//     if (data?._status !== 'draft') return data

//     await clonePublishMediaToDraftInPlace({
//       req,
//       doc: data,
//       simpleMediaNames,
//       arrayFields,
//       groupFields,
//       blockSimpleFields,
//       blockArrayFields,
//       blockGroupFields,
//       blockNestedDeepFields,
//       blockArrayBlocksFields,
//       blockArrayBlocksGroupFields,
//     })

//     return data
//   }

//   // Cleanup helper for deep nested (blocks → blocks → array → array)
//   const cleanupDeepNested = async ({
//     req,
//     previousDoc,
//     doc,
//     configs,
//   }: {
//     req: any
//     previousDoc: any
//     doc: any
//     configs: BlockNestedDeepMediaConfig[]
//   }) => {
//     if (!configs.length) return
//     try {
//       const prevIDs = collectDeepNestedIDs(previousDoc ?? {}, configs)
//       const curIDs = collectDeepNestedIDs(doc ?? {}, configs)
//       const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
//       for (const id of toDelete) {
//         try {
//           await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
//         } catch {}
//       }
//     } catch (e) {
//       req.payload.logger?.warn?.(
//         `cleanupDeepNested failed: ${(e as Error)?.message ?? 'unknown error'}`,
//       )
//     }
//   }

//   // Cleanup helper for array → blocks → array
//   const cleanupArrayBlocks = async ({
//     req,
//     previousDoc,
//     doc,
//     configs,
//   }: {
//     req: any
//     previousDoc: any
//     doc: any
//     configs: BlockArrayBlocksMediaConfig[]
//   }) => {
//     if (!configs.length) return
//     try {
//       const prevIDs = collectArrayBlocksIDs(previousDoc ?? {}, configs)
//       const curIDs = collectArrayBlocksIDs(doc ?? {}, configs)
//       const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
//       for (const id of toDelete) {
//         try {
//           await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
//         } catch {}
//       }
//     } catch (e) {
//       req.payload.logger?.warn?.(
//         `cleanupArrayBlocks failed: ${(e as Error)?.message ?? 'unknown error'}`,
//       )
//     }
//   }

//   // ⭐ Cleanup helper for array → blocks → group → array
//   const cleanupArrayBlocksGroup = async ({
//     req,
//     previousDoc,
//     doc,
//     configs,
//   }: {
//     req: any
//     previousDoc: any
//     doc: any
//     configs: BlockArrayBlocksGroupMediaConfig[]
//   }) => {
//     if (!configs.length) return
//     try {
//       const prevIDs = collectArrayBlocksGroupIDs(previousDoc ?? {}, configs)
//       const curIDs = collectArrayBlocksGroupIDs(doc ?? {}, configs)
//       const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
//       for (const id of toDelete) {
//         try {
//           await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
//         } catch {}
//       }
//     } catch (e) {
//       req.payload.logger?.warn?.(
//         `cleanupArrayBlocksGroup failed: ${(e as Error)?.message ?? 'unknown error'}`,
//       )
//     }
//   }

//   return {
//     beforeValidate: [stashSessionIdPreHook],

//     // order matters
//     beforeChange: [
//       stashSessionIdPreHook,
//       dotPathPreAdapter,
//       beforeChangeCreator,
//       dotPathPostAdapter,
//       draftCloneHook, // 🔥 cloning publish media → draft only when _status === 'draft'
//     ],

//     afterChange: [
//       async ({ req, doc, previousDoc }) => {
//         // 1) delete removed relations (existing shapes)
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

//         // 2) handle deep nested removals (blocks → blocks → array → array)
//         await cleanupDeepNested({
//           req,
//           previousDoc,
//           doc,
//           configs: blockNestedDeepFields,
//         })

//         // 3) handle array → blocks → array removals
//         await cleanupArrayBlocks({
//           req,
//           previousDoc,
//           doc,
//           configs: blockArrayBlocksFields,
//         })

//         // 4) ⭐ handle array → blocks → group → array removals
//         await cleanupArrayBlocksGroup({
//           req,
//           previousDoc,
//           doc,
//           configs: blockArrayBlocksGroupFields,
//         })

//         // 5) stamp all referenced media (and assign versionStage by status)
//         const currentRefIDs = await finalizeReferencedMedia({
//           req,
//           doc,
//           collectionSlug: effectiveCollectionSlug,
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
//           blockNestedDeepFields,
//           blockArrayBlocksFields,
//           blockArrayBlocksGroupFields,
//         })

//         // 6) If this is a publish save, delete any owner media not referenced anymore
//         if (doc?._status !== 'draft' && effectiveCollectionSlug && currentRefIDs.length > 0) {
//           await cleanupOwnerStaleMedia({
//             req,
//             collectionSlug: effectiveCollectionSlug,
//             docId: doc.id,
//             keepIds: new Set(currentRefIDs.map(String)),
//           })
//         }

//         // 7) clear rollback stash
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
//         if (effectiveCollectionSlug) {
//           try {
//             const found = await req.payload.find({
//               collection: MEDIA_SLUG,
//               limit: 500,
//               where: {
//                 and: [
//                   { ownerDocId: { equals: String(doc.id) } },
//                   { ownerCollection: { equals: effectiveCollectionSlug } },
//                 ],
//               },
//               depth: 0,
//               overrideAccess: true,
//             })
//             for (const m of found.docs) {
//               await req.payload.delete({ collection: MEDIA_SLUG, id: m.id, overrideAccess: true })
//             }
//           } catch (e) {
//             req.payload.logger?.warn?.(`afterDelete owner cleanup failed: ${(e as Error).message}`)
//           }
//         }
//       },
//     ],

//     ...(singleDocSlug
//       ? { beforeOperation: [createSingleDocBeforeOperationHook(singleDocSlug)] }
//       : {}),
//   }
// }

// new blockGroupArrayFields added here
import type { CollectionConfig } from 'payload'
import { createBeforeChangeHook } from './createBeforeChangeHook'
import { deleteRemovedMedia } from './deleteRemovedMedia'
import type { ImageConfig, CreatedMedia } from './mediaUtils'
import { MEDIA_SLUG } from './mediaUtils'
import { createSingleDocBeforeOperationHook } from '@/utils/singleDocUtils'

/* ───────────────── types ───────────────── */

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
  layoutKey: string
  blockType: string
  mediaFields: string[]
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

/** Blocks: group → nested array where items have media */
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

/** Blocks: group → firstArray[] → secondArray[] → media */
export type BlockGroupArrayMediaConfig = {
  layoutKey: string
  blockType: string
  groupKey: string
  firstArrayKey: string
  secondArrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

/** Blocks: nested blocks[] → firstArray[] → secondArray[] → media */
export type BlockNestedDeepMediaConfig = {
  layoutKey: string
  blockType: string
  blocksKey: string
  nestedBlockType: string
  firstArrayKey: string
  secondArrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

/** block → array[] → blocks[] → array[] → media */
export type BlockArrayBlocksMediaConfig = {
  layoutKey: string
  blockType: string
  arrayKey: string
  blocksKey: string
  nestedBlockType: string
  nestedArrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

/** ⭐ block → array[] → blocks[] → groupKey{} → nestedArrayKey[] → media */
export type BlockArrayBlocksGroupMediaConfig = {
  layoutKey: string
  blockType: string
  arrayKey: string
  blocksKey: string
  nestedBlockType: string
  groupKey: string
  nestedArrayKey: string
  mediaFields: string[]
  itemLabelField?: string
  mediaFieldLabels?: Record<string, string>
}

export type WithMediaLifecycleOpts = {
  imageConfigs?: ImageConfig[]
  /** top-level (or dot-path) upload fields like PDFs */
  otherUploadFields?: string[]

  arrayFields?: ArrayMediaConfig[]
  groupFields?: GroupMediaConfig[]
  blockSimpleFields?: BlockSimpleMediaConfig[]
  blockArrayFields?: BlockArrayMediaConfig[]
  blockGroupFields?: BlockGroupMediaConfig[]
  /** block → group → firstArray[] → secondArray[] → media */
  blockGroupArrayFields?: BlockGroupArrayMediaConfig[]

  /** blocks → nested blocks[] → firstArray[] → secondArray[] → media */
  blockNestedDeepFields?: BlockNestedDeepMediaConfig[]

  /** block → array[] → blocks[] → array[] → media */
  blockArrayBlocksFields?: BlockArrayBlocksMediaConfig[]

  /** ⭐ block → array[] → blocks[] → groupKey{} → nestedArrayKey[] → media */
  blockArrayBlocksGroupFields?: BlockArrayBlocksGroupMediaConfig[]

  skipOnDraft?: boolean
  onAfterChange?: (args: { req: any; doc: any; previousDoc: any }) => void | Promise<void>

  /** if present, guards collection to single doc */
  singleDocSlug?: string
  /** stamped into media.ownerCollection */
  collectionSlug?: string
}

/* ───────────────── helpers ───────────────── */

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

// ── dot-path safe getters/setters ──
function getByPath(obj: any, path: string): any {
  if (!obj) return undefined
  if (!path.includes('.')) return obj?.[path]
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}
function setByPath(obj: any, path: string, value: any) {
  const parts = path.split('.')
  const last = parts.pop()!
  let cur = obj
  for (const k of parts) {
    if (!cur[k] || typeof cur[k] !== 'object') cur[k] = {}
    cur = cur[k]
  }
  cur[last] = value
}

// ── flatten/unflatten adapter for dot paths (simple fields only) ──
function flattenDotFields(data: any, fieldNames: string[]) {
  for (const name of fieldNames) {
    if (!name.includes('.')) continue
    const val = getByPath(data, name)
    if (typeof val !== 'undefined') data[name] = val
    const origPath = `${name}Original`
    const origVal = getByPath(data, origPath)
    if (typeof origVal !== 'undefined') data[origPath] = origVal
  }
}
function unflattenDotFields(data: any, fieldNames: string[]) {
  for (const name of fieldNames) {
    if (!name.includes('.')) continue
    if (Object.prototype.hasOwnProperty.call(data, name)) {
      setByPath(data, name, data[name])
      delete data[name]
    }
    const origPath = `${name}Original`
    if (Object.prototype.hasOwnProperty.call(data, origPath)) {
      setByPath(data, origPath, data[origPath])
      delete data[origPath]
    }
  }
}

/** We want (id, derivedFromSlug, ownerField) pairs of all *current* references in the saved doc */
function collectIDsWithSource(
  doc: any,
  simpleFields: string[],
  arrayFields: Array<{ field: string; mediaFields: string[] }>,
  groupFields: Array<{ groupKey: string; arrayKey: string; mediaFields: string[] }>,
  blockSimpleFields: BlockSimpleMediaConfig[],
  blockArrayFields: BlockArrayMediaConfig[],
  blockGroupFields: BlockGroupMediaConfig[],
  blockGroupArrayFields: BlockGroupArrayMediaConfig[] = [],
  // deep: blocks → blocks → array → array
  blockNestedDeepFields: BlockNestedDeepMediaConfig[] = [],
  // block → array → blocks → array
  blockArrayBlocksFields: BlockArrayBlocksMediaConfig[] = [],
  // ⭐ block → array → blocks → group → array
  blockArrayBlocksGroupFields: BlockArrayBlocksGroupMediaConfig[] = [],
): Array<{ id: string; derivedFrom?: string; ownerField?: string }> {
  const out: Array<{ id: string; derivedFrom?: string; ownerField?: string }> = []

  const addPairByPath = (root: any, path: string, derivedFrom?: string) => {
    const val = getByPath(root, path)
    const id = relID(val)
    if (id) out.push({ id: String(id), derivedFrom, ownerField: path })
    const origPath = `${path}Original`
    const oVal = getByPath(root, origPath)
    const oid = relID(oVal)
    if (oid) out.push({ id: String(oid), derivedFrom, ownerField: origPath })
  }

  // 1) top-level (or dot-path) simple fields
  for (const f of simpleFields) addPairByPath(doc, f, undefined)

  // 2) one-level arrays
  for (const a of arrayFields) {
    const items = doc?.[a.field]
    if (!Array.isArray(items)) continue
    for (const it of items) for (const mf of a.mediaFields) addPairByPath(it, mf, undefined)
  }

  // 3) nested arrays under a group
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

  // 4) blocks: media on the block row
  for (const b of blockSimpleFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      for (const mf of b.mediaFields) addPairByPath(row, mf, b.blockType)
    })
  }

  // 5) blocks: array items with media
  for (const b of blockArrayFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
      for (const it of items) for (const mf of b.mediaFields) addPairByPath(it, mf, b.blockType)
    })
  }

  // 6) blocks: groups -> arrays
  for (const b of blockGroupFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const holder = row?.[b.groupKey]

      // array of groups
      if (Array.isArray(holder)) {
        for (const g of holder) {
          const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
          for (const ni of nested)
            for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
        }
        return
      }

      // single group object
      if (holder && typeof holder === 'object') {
        const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
        for (const ni of nested) for (const mf of b.mediaFields) addPairByPath(ni, mf, b.blockType)
      }
    })
  }

  //6.1 blocks: group -> firstArray[] -> secondArray[] -> media
  for (const b of blockGroupArrayFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const holder = row?.[b.groupKey]

      const processGroupHolder = (groupHolder: any) => {
        const firstArr = Array.isArray(groupHolder?.[b.firstArrayKey])
          ? groupHolder[b.firstArrayKey]
          : []

        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []

          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) {
              addPairByPath(secondItem, mf, b.blockType)
            }
          }
        }
      }

      if (Array.isArray(holder)) {
        for (const groupItem of holder) processGroupHolder(groupItem)
        return
      }

      if (holder && typeof holder === 'object') {
        processGroupHolder(holder)
      }
    })
  }

  // 7) blocks: nested blocks[] → firstArray[] → secondArray[] → media
  for (const b of blockNestedDeepFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
      for (const inner of nestedBlocks) {
        if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
        const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []
          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) addPairByPath(secondItem, mf, b.nestedBlockType)
          }
        }
      }
    })
  }

  // 8) block → array[] → blocks[] → array[] → media
  for (const b of blockArrayBlocksFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const arrItem of arr) {
        const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
          for (const ni of nestedArr) {
            for (const mf of b.mediaFields) addPairByPath(ni, mf, b.nestedBlockType)
          }
        }
      }
    })
  }

  // 9) ⭐ block → array[] → blocks[] → groupKey{} → nestedArrayKey[] → media
  for (const b of blockArrayBlocksGroupFields) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const topArr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const topItem of topArr) {
        const innerBlocks = Array.isArray(topItem?.[b.blocksKey]) ? topItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const groupHolder = inner?.[b.groupKey]
          // group can be an object or an array of groups
          if (Array.isArray(groupHolder)) {
            for (const g of groupHolder) {
              const nestedArr = Array.isArray(g?.[b.nestedArrayKey]) ? g[b.nestedArrayKey] : []
              for (const ni of nestedArr) {
                for (const mf of b.mediaFields) addPairByPath(ni, mf, b.nestedBlockType)
              }
            }
          } else if (groupHolder && typeof groupHolder === 'object') {
            const nestedArr = Array.isArray(groupHolder?.[b.nestedArrayKey])
              ? groupHolder[b.nestedArrayKey]
              : []
            for (const ni of nestedArr) {
              for (const mf of b.mediaFields) addPairByPath(ni, mf, b.nestedBlockType)
            }
          }
        }
      }
    })
  }

  return out
}

/** Diff helper for block → group → firstArray[] → secondArray[] → media */
function collectBlockGroupArrayIDs(doc: any, cfgs: BlockGroupArrayMediaConfig[]): Set<string> {
  const ids = new Set<string>()

  const pushRel = (v: any) => {
    const id = relID(v)
    if (id) ids.add(String(id))
  }

  for (const b of cfgs) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (row) => {
      const holder = row?.[b.groupKey]

      const processGroupHolder = (groupHolder: any) => {
        const firstArr = Array.isArray(groupHolder?.[b.firstArrayKey])
          ? groupHolder[b.firstArrayKey]
          : []

        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []

          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) {
              pushRel(secondItem?.[mf])
              pushRel(secondItem?.[`${mf}Original`])
            }
          }
        }
      }

      if (Array.isArray(holder)) {
        for (const groupItem of holder) processGroupHolder(groupItem)
        return
      }

      if (holder && typeof holder === 'object') {
        processGroupHolder(holder)
      }
    })
  }

  return ids
}

/** Diff helper for deep nested removal: blocks → blocks → array → array */
function collectDeepNestedIDs(doc: any, cfgs: BlockNestedDeepMediaConfig[]): Set<string> {
  const ids = new Set<string>()
  const push = (v: any) => {
    const id = relID(v)
    if (id) ids.add(String(id))
    const oid = relID((v && (v as any).imageOriginal) ?? (v && (v as any).iconOriginal))
    if (oid) ids.add(String(oid))
  }

  for (const b of cfgs) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
      for (const inner of nestedBlocks) {
        if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
        const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []
          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) {
              const val = secondItem?.[mf]
              if (val) push(val)
              const orig = secondItem?.[`${mf}Original`]
              if (orig) push(orig)
            }
          }
        }
      }
    })
  }
  return ids
}

/** Diff helper for array → blocks → array removal */
function collectArrayBlocksIDs(doc: any, cfgs: BlockArrayBlocksMediaConfig[]): Set<string> {
  const ids = new Set<string>()
  const pushRel = (v: any) => {
    const id = relID(v)
    if (id) ids.add(String(id))
  }

  for (const b of cfgs) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const arrItem of arr) {
        const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
          for (const ni of nestedArr) {
            for (const mf of b.mediaFields) {
              pushRel(ni?.[mf])
              pushRel(ni?.[`${mf}Original`])
            }
          }
        }
      }
    })
  }
  return ids
}

/** ⭐ Diff helper for array → blocks → group → array removal */
function collectArrayBlocksGroupIDs(
  doc: any,
  cfgs: BlockArrayBlocksGroupMediaConfig[],
): Set<string> {
  const ids = new Set<string>()
  const pushRel = (v: any) => {
    const id = relID(v)
    if (id) ids.add(String(id))
  }

  for (const b of cfgs) {
    eachBlockRow(doc, b.layoutKey, b.blockType, (outerRow) => {
      const topArr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const topItem of topArr) {
        const innerBlocks = Array.isArray(topItem?.[b.blocksKey]) ? topItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const groupHolder = inner?.[b.groupKey]
          if (Array.isArray(groupHolder)) {
            for (const g of groupHolder) {
              const nestedArr = Array.isArray(g?.[b.nestedArrayKey]) ? g[b.nestedArrayKey] : []
              for (const ni of nestedArr) {
                for (const mf of b.mediaFields) {
                  pushRel(ni?.[mf])
                  pushRel(ni?.[`${mf}Original`])
                }
              }
            }
          } else if (groupHolder && typeof groupHolder === 'object') {
            const nestedArr = Array.isArray(groupHolder?.[b.nestedArrayKey])
              ? groupHolder[b.nestedArrayKey]
              : []
            for (const ni of nestedArr) {
              for (const mf of b.mediaFields) {
                pushRel(ni?.[mf])
                pushRel(ni?.[`${mf}Original`])
              }
            }
          }
        }
      }
    })
  }
  return ids
}

/** 🔥 NEW: for drafts — clone publish media → lastDraft and rewire doc fields */
async function clonePublishMediaToDraftInPlace(opts: {
  req: any
  doc: any
  simpleMediaNames: string[]
  arrayFields: ArrayMediaConfig[]
  groupFields: GroupMediaConfig[]
  blockSimpleFields: BlockSimpleMediaConfig[]
  blockArrayFields: BlockArrayMediaConfig[]
  blockGroupFields: BlockGroupMediaConfig[]
  blockGroupArrayFields: BlockGroupArrayMediaConfig[]
  blockNestedDeepFields: BlockNestedDeepMediaConfig[]
  blockArrayBlocksFields: BlockArrayBlocksMediaConfig[]
  blockArrayBlocksGroupFields: BlockArrayBlocksGroupMediaConfig[]
}) {
  const {
    req,
    doc,
    simpleMediaNames,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
    blockGroupArrayFields,
    blockNestedDeepFields,
    blockArrayBlocksFields,
    blockArrayBlocksGroupFields,
  } = opts

  // cache: oldId -> newDraftId
  const cloned = new Map<string, string>()

  const cloneIfPublish = async (val: any): Promise<any> => {
    const id = relID(val)
    if (!id) return val

    if (cloned.has(id)) {
      const newId = cloned.get(id)!
      if (typeof val === 'string') return newId
      if (typeof val === 'object') return { ...(val as any), id: newId, value: newId }
      return val
    }

    let mediaDoc: any
    try {
      mediaDoc = await req.payload.findByID({
        collection: MEDIA_SLUG,
        id,
        depth: 0,
        overrideAccess: true,
      })
    } catch {
      return val
    }
    if (!mediaDoc) return val

    const stage = mediaDoc.versionStage as 'publish' | 'lastDraft' | undefined
    const isTemp = mediaDoc.temporary === true

    // Already draft or temp → don't clone
    if (stage === 'lastDraft' || isTemp) return val

    // Treat undefined stage as publish
    try {
      const clone = await req.payload.create({
        collection: MEDIA_SLUG,
        data: {
          filename: mediaDoc.filename,
          filesize: mediaDoc.filesize,
          width: mediaDoc.width,
          height: mediaDoc.height,
          mimeType: mediaDoc.mimeType,
          prefix: mediaDoc.prefix,
          focalX: mediaDoc.focalX,
          focalY: mediaDoc.focalY,
          url: mediaDoc.url,
          thumbnailURL: mediaDoc.thumbnailURL ?? null,

          temporary: false,
          versionStage: 'lastDraft',
        },
        overrideAccess: true,
      })

      const newId = clone.id as string
      cloned.set(id, newId)

      if (typeof val === 'string') return newId
      if (typeof val === 'object') return { ...(val as any), id: newId, value: newId }
      return val
    } catch {
      return val
    }
  }

  const processSimpleFieldPath = async (path: string) => {
    const cur = getByPath(doc, path)
    if (typeof cur !== 'undefined') {
      const updated = await cloneIfPublish(cur)
      if (updated !== cur) setByPath(doc, path, updated)
    }
    const origPath = `${path}Original`
    const curOrig = getByPath(doc, origPath)
    if (typeof curOrig !== 'undefined') {
      const updatedOrig = await cloneIfPublish(curOrig)
      if (updatedOrig !== curOrig) setByPath(doc, origPath, updatedOrig)
    }
  }

  const processHolderField = async (holder: any, mf: string) => {
    if (!holder || typeof holder !== 'object') return
    const cur = holder[mf]
    if (typeof cur !== 'undefined') {
      holder[mf] = await cloneIfPublish(cur)
    }
    const orig = holder[`${mf}Original`]
    if (typeof orig !== 'undefined') {
      holder[`${mf}Original`] = await cloneIfPublish(orig)
    }
  }

  // 1) simple fields (dot paths allowed)
  for (const name of simpleMediaNames) {
    await processSimpleFieldPath(name)
  }

  // 2) one-level arrays
  for (const a of arrayFields) {
    const items = doc?.[a.fieldName]
    if (!Array.isArray(items)) continue
    for (const it of items) for (const mf of a.mediaFields) await processHolderField(it, mf)
  }

  // 3) nested arrays under group
  for (const g of groupFields) {
    const holder = doc?.[g.groupKey]
    if (Array.isArray(holder)) {
      for (const gi of holder) {
        const nested = gi?.[g.arrayKey]
        if (!Array.isArray(nested)) continue
        for (const ni of nested) for (const mf of g.mediaFields) await processHolderField(ni, mf)
      }
    } else if (holder && typeof holder === 'object') {
      const nested = holder?.[g.arrayKey]
      if (Array.isArray(nested)) {
        for (const ni of nested) for (const mf of g.mediaFields) await processHolderField(ni, mf)
      }
    }
  }

  // 4) blocks: simple
  for (const b of blockSimpleFields) {
    const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
    for (const row of rows) {
      if (!isBlockItemOfType(row, b.blockType)) continue
      for (const mf of b.mediaFields) await processHolderField(row, mf)
    }
  }

  // 5) blocks: array
  for (const b of blockArrayFields) {
    const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
    for (const row of rows) {
      if (!isBlockItemOfType(row, b.blockType)) continue
      const items = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
      for (const it of items) for (const mf of b.mediaFields) await processHolderField(it, mf)
    }
  }

  // 6) blocks: groups -> arrays
  for (const b of blockGroupFields) {
    const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
    for (const row of rows) {
      if (!isBlockItemOfType(row, b.blockType)) continue
      const holder = row?.[b.groupKey]
      if (Array.isArray(holder)) {
        for (const g of holder) {
          const nested = Array.isArray(g?.[b.arrayKey]) ? g[b.arrayKey] : []
          for (const ni of nested) for (const mf of b.mediaFields) await processHolderField(ni, mf)
        }
      } else if (holder && typeof holder === 'object') {
        const nested = Array.isArray(holder?.[b.arrayKey]) ? holder[b.arrayKey] : []
        for (const ni of nested) for (const mf of b.mediaFields) await processHolderField(ni, mf)
      }
    }
  }
  // blocks: group -> firstArray[] -> secondArray[]
  for (const b of blockGroupArrayFields) {
    const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []

    for (const row of rows) {
      if (!isBlockItemOfType(row, b.blockType)) continue

      const holder = row?.[b.groupKey]

      const processGroupHolder = async (groupHolder: any) => {
        const firstArr = Array.isArray(groupHolder?.[b.firstArrayKey])
          ? groupHolder[b.firstArrayKey]
          : []

        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []

          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) {
              await processHolderField(secondItem, mf)
            }
          }
        }
      }

      if (Array.isArray(holder)) {
        for (const groupItem of holder) {
          await processGroupHolder(groupItem)
        }
      } else if (holder && typeof holder === 'object') {
        await processGroupHolder(holder)
      }
    }
  }

  // 7) blocks: nested blocks → array → array
  for (const b of blockNestedDeepFields) {
    const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
    for (const outerRow of rows) {
      if (!isBlockItemOfType(outerRow, b.blockType)) continue
      const nestedBlocks = Array.isArray(outerRow?.[b.blocksKey]) ? outerRow[b.blocksKey] : []
      for (const inner of nestedBlocks) {
        if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
        const firstArr = Array.isArray(inner?.[b.firstArrayKey]) ? inner[b.firstArrayKey] : []
        for (const firstItem of firstArr) {
          const secondArr = Array.isArray(firstItem?.[b.secondArrayKey])
            ? firstItem[b.secondArrayKey]
            : []
          for (const secondItem of secondArr) {
            for (const mf of b.mediaFields) await processHolderField(secondItem, mf)
          }
        }
      }
    }
  }

  // 8) block → array → blocks → array
  for (const b of blockArrayBlocksFields) {
    const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
    for (const outerRow of rows) {
      if (!isBlockItemOfType(outerRow, b.blockType)) continue
      const arr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const arrItem of arr) {
        const innerBlocks = Array.isArray(arrItem?.[b.blocksKey]) ? arrItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const nestedArr = Array.isArray(inner?.[b.nestedArrayKey]) ? inner[b.nestedArrayKey] : []
          for (const ni of nestedArr) {
            for (const mf of b.mediaFields) await processHolderField(ni, mf)
          }
        }
      }
    }
  }

  // (Correct one, TypeScript-safe)
  for (const b of blockArrayBlocksGroupFields) {
    const rows = Array.isArray(doc?.[b.layoutKey]) ? doc[b.layoutKey] : []
    for (const outerRow of rows) {
      if (!isBlockItemOfType(outerRow, b.blockType)) continue
      const topArr = Array.isArray(outerRow?.[b.arrayKey]) ? outerRow[b.arrayKey] : []
      for (const topItem of topArr) {
        const innerBlocks = Array.isArray(topItem?.[b.blocksKey]) ? topItem[b.blocksKey] : []
        for (const inner of innerBlocks) {
          if (!isBlockItemOfType(inner, b.nestedBlockType)) continue
          const groupHolder = inner?.[b.groupKey]
          if (Array.isArray(groupHolder)) {
            for (const g of groupHolder) {
              const nestedArr = Array.isArray(g?.[b.nestedArrayKey]) ? g[b.nestedArrayKey] : []
              for (const ni of nestedArr) {
                for (const mf of b.mediaFields) await processHolderField(ni, mf)
              }
            }
          } else if (groupHolder && typeof groupHolder === 'object') {
            const nestedArr = Array.isArray(groupHolder?.[b.nestedArrayKey])
              ? groupHolder[b.nestedArrayKey]
              : []
            for (const ni of nestedArr) {
              for (const mf of b.mediaFields) await processHolderField(ni, mf)
            }
          }
        }
      }
    }
  }
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
  blockGroupArrayFields?: BlockGroupArrayMediaConfig[]
  blockNestedDeepFields?: BlockNestedDeepMediaConfig[]
  blockArrayBlocksFields?: BlockArrayBlocksMediaConfig[]
  blockArrayBlocksGroupFields?: BlockArrayBlocksGroupMediaConfig[]
}): Promise<string[]> {
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
    blockGroupArrayFields = [],
    blockNestedDeepFields = [],
    blockArrayBlocksFields = [],
    blockArrayBlocksGroupFields = [],
  } = opts

  const refs = collectIDsWithSource(
    doc,
    simpleFields,
    arrayFields,
    groupFields,
    blockSimpleFields,
    blockArrayFields,
    blockGroupFields,
    blockGroupArrayFields,
    blockNestedDeepFields,
    blockArrayBlocksFields,
    blockArrayBlocksGroupFields,
  )

  if (!refs.length) return []

  const stage: 'publish' | 'lastDraft' = doc?._status === 'draft' ? 'lastDraft' : 'publish'

  const idSet = new Set<string>()

  for (const ref of refs) {
    idSet.add(ref.id)
    try {
      await req.payload.update({
        collection: MEDIA_SLUG,
        id: ref.id,
        data: {
          uploadSessionId: doc?.uploadSessionId ?? undefined,
          ownerCollection: collectionSlug ?? undefined,
          ownerDocId: String(doc.id),
          ownerDocSlug: (doc as any)?.slug ?? undefined,
          ownerDocName: (doc as any)?.name ?? undefined,
          ownerBlockType: ref.derivedFrom ?? undefined,
          ownerField: ref.ownerField,
          derivedFrom: ref.derivedFrom ?? undefined,
          temporary: false,
          versionStage: stage,
        },
        overrideAccess: true,
      })
    } catch {
      // ignore per-file errors
    }
  }

  return Array.from(idSet)
}

/** 🔥 NEW: on publish — delete any media for this doc that is not referenced anymore */
async function cleanupOwnerStaleMedia(opts: {
  req: any
  collectionSlug: string
  docId: string | number
  keepIds: Set<string>
}) {
  const { req, collectionSlug, docId, keepIds } = opts

  try {
    const res = await req.payload.find({
      collection: MEDIA_SLUG,
      limit: 1000,
      where: {
        and: [
          { ownerCollection: { equals: collectionSlug } },
          { ownerDocId: { equals: String(docId) } },
        ],
      },
      depth: 0,
      overrideAccess: true,
    })

    for (const m of res.docs) {
      if (!keepIds.has(String(m.id))) {
        try {
          await req.payload.delete({
            collection: MEDIA_SLUG,
            id: m.id,
            overrideAccess: true,
          })
        } catch {}
      }
    }
  } catch (e) {
    req.payload.logger?.warn?.(
      `cleanupOwnerStaleMedia failed: ${(e as Error)?.message ?? 'unknown error'}`,
    )
  }
}

/* ───────────────── main ───────────────── */

export function withMediaLifecycle(opts: WithMediaLifecycleOpts): CollectionConfig['hooks'] {
  const {
    imageConfigs = [],
    otherUploadFields = [],
    arrayFields = [],
    groupFields = [],
    blockSimpleFields = [],
    blockArrayFields = [],
    blockGroupFields = [],
    blockGroupArrayFields = [],
    blockNestedDeepFields = [],
    blockArrayBlocksFields = [],
    blockArrayBlocksGroupFields = [],
    skipOnDraft = true,
    onAfterChange,
    singleDocSlug,
    collectionSlug,
  } = opts

  const effectiveCollectionSlug = collectionSlug || singleDocSlug

  // Track simple media (supports dot-paths like "branding.logo")
  const simpleMediaNames = [...imageConfigs.map((c) => c.fieldName), ...otherUploadFields]

  // For delete sweep include both field and fieldOriginal
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

  // Dot-path adapter (simple fields only)
  const dotPathPreAdapter = ({ data }: any) => {
    flattenDotFields(data, simpleMediaNames)
    return data
  }
  const dotPathPostAdapter = ({ data }: any) => {
    unflattenDotFields(data, simpleMediaNames)
    return data
  }

  // 🔥 NEW: draft-only clone step
  const draftCloneHook = async ({ req, data }: any) => {
    if (data?._status !== 'draft') return data

    await clonePublishMediaToDraftInPlace({
      req,
      doc: data,
      simpleMediaNames,
      arrayFields,
      groupFields,
      blockSimpleFields,
      blockArrayFields,
      blockGroupFields,
      blockGroupArrayFields,
      blockNestedDeepFields,
      blockArrayBlocksFields,
      blockArrayBlocksGroupFields,
    })

    return data
  }

  const cleanupBlockGroupArray = async ({
    req,
    previousDoc,
    doc,
    configs,
  }: {
    req: any
    previousDoc: any
    doc: any
    configs: BlockGroupArrayMediaConfig[]
  }) => {
    if (!configs.length) return
    if (skipOnDraft && doc?._status === 'draft') return
    try {
      const prevIDs = collectBlockGroupArrayIDs(previousDoc ?? {}, configs)
      const curIDs = collectBlockGroupArrayIDs(doc ?? {}, configs)
      const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))

      for (const id of toDelete) {
        try {
          await req.payload.delete({
            collection: MEDIA_SLUG,
            id,
            overrideAccess: true,
          })
        } catch {}
      }
    } catch (e) {
      req.payload.logger?.warn?.(
        `cleanupBlockGroupArray failed: ${(e as Error)?.message ?? 'unknown error'}`,
      )
    }
  }

  // Cleanup helper for deep nested (blocks → blocks → array → array)
  const cleanupDeepNested = async ({
    req,
    previousDoc,
    doc,
    configs,
  }: {
    req: any
    previousDoc: any
    doc: any
    configs: BlockNestedDeepMediaConfig[]
  }) => {
    if (!configs.length) return
    try {
      const prevIDs = collectDeepNestedIDs(previousDoc ?? {}, configs)
      const curIDs = collectDeepNestedIDs(doc ?? {}, configs)
      const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
      for (const id of toDelete) {
        try {
          await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
        } catch {}
      }
    } catch (e) {
      req.payload.logger?.warn?.(
        `cleanupDeepNested failed: ${(e as Error)?.message ?? 'unknown error'}`,
      )
    }
  }

  // Cleanup helper for array → blocks → array
  const cleanupArrayBlocks = async ({
    req,
    previousDoc,
    doc,
    configs,
  }: {
    req: any
    previousDoc: any
    doc: any
    configs: BlockArrayBlocksMediaConfig[]
  }) => {
    if (!configs.length) return
    try {
      const prevIDs = collectArrayBlocksIDs(previousDoc ?? {}, configs)
      const curIDs = collectArrayBlocksIDs(doc ?? {}, configs)
      const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
      for (const id of toDelete) {
        try {
          await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
        } catch {}
      }
    } catch (e) {
      req.payload.logger?.warn?.(
        `cleanupArrayBlocks failed: ${(e as Error)?.message ?? 'unknown error'}`,
      )
    }
  }

  // ⭐ Cleanup helper for array → blocks → group → array
  const cleanupArrayBlocksGroup = async ({
    req,
    previousDoc,
    doc,
    configs,
  }: {
    req: any
    previousDoc: any
    doc: any
    configs: BlockArrayBlocksGroupMediaConfig[]
  }) => {
    if (!configs.length) return
    try {
      const prevIDs = collectArrayBlocksGroupIDs(previousDoc ?? {}, configs)
      const curIDs = collectArrayBlocksGroupIDs(doc ?? {}, configs)
      const toDelete = [...prevIDs].filter((id) => !curIDs.has(id))
      for (const id of toDelete) {
        try {
          await req.payload.delete({ collection: MEDIA_SLUG, id, overrideAccess: true })
        } catch {}
      }
    } catch (e) {
      req.payload.logger?.warn?.(
        `cleanupArrayBlocksGroup failed: ${(e as Error)?.message ?? 'unknown error'}`,
      )
    }
  }

  return {
    beforeValidate: [stashSessionIdPreHook],

    // order matters
    beforeChange: [
      stashSessionIdPreHook,
      dotPathPreAdapter,
      beforeChangeCreator,
      dotPathPostAdapter,
      draftCloneHook, // 🔥 cloning publish media → draft only when _status === 'draft'
    ],

    afterChange: [
      async ({ req, doc, previousDoc }) => {
        // 1) delete removed relations (existing shapes)
        await deleteRemovedMedia({
          req,
          previousDoc,
          doc,
          mediaFields: simpleDeleteFields,
          arrayFields: arrayDeleteFields,
          groupFields,
          blockSimpleFields,
          blockArrayFields,
          blockGroupFields,
          skipOnDraft,
        })

        await cleanupBlockGroupArray({
          req,
          previousDoc,
          doc,
          configs: blockGroupArrayFields,
        })

        // 2) handle deep nested removals (blocks → blocks → array → array)
        await cleanupDeepNested({
          req,
          previousDoc,
          doc,
          configs: blockNestedDeepFields,
        })

        // 3) handle array → blocks → array removals
        await cleanupArrayBlocks({
          req,
          previousDoc,
          doc,
          configs: blockArrayBlocksFields,
        })

        // 4) ⭐ handle array → blocks → group → array removals
        await cleanupArrayBlocksGroup({
          req,
          previousDoc,
          doc,
          configs: blockArrayBlocksGroupFields,
        })

        // 5) stamp all referenced media (and assign versionStage by status)
        const currentRefIDs = await finalizeReferencedMedia({
          req,
          doc,
          collectionSlug: effectiveCollectionSlug,
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
          blockGroupArrayFields,
          blockNestedDeepFields,
          blockArrayBlocksFields,
          blockArrayBlocksGroupFields,
        })

        // 6) If this is a publish save, delete any owner media not referenced anymore
        if (doc?._status !== 'draft' && effectiveCollectionSlug && currentRefIDs.length > 0) {
          await cleanupOwnerStaleMedia({
            req,
            collectionSlug: effectiveCollectionSlug,
            docId: doc.id,
            keepIds: new Set(currentRefIDs.map(String)),
          })
        }

        // 7) clear rollback stash
        const r = req as any
        if (Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []

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
        if (effectiveCollectionSlug) {
          try {
            const found = await req.payload.find({
              collection: MEDIA_SLUG,
              limit: 500,
              where: {
                and: [
                  { ownerDocId: { equals: String(doc.id) } },
                  { ownerCollection: { equals: effectiveCollectionSlug } },
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
        }
      },
    ],

    ...(singleDocSlug
      ? { beforeOperation: [createSingleDocBeforeOperationHook(singleDocSlug)] }
      : {}),
  }
}
