// // collection config 100% working code
// import path from 'node:path'
// import os from 'node:os'
// import fs from 'node:fs/promises'
// import { generateBlurDataURL } from '@/utils/generateBlurDataURL'
// import {
//   decodeDataURL,
//   processImageField,
//   CreatedMedia,
//   ImageConfig,
//   trackReqCreatedMedia,
//   MEDIA_SLUG,
// } from './mediaUtils'
// import type {
//   ArrayMediaConfig,
//   GroupMediaConfig,
//   BlockSimpleMediaConfig,
//   BlockArrayMediaConfig,
//   BlockGroupMediaConfig,
// } from './withMediaLifecycle'

// function labelFromFieldName(fieldName: string) {
//   return fieldName.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^\w/, (c) => c.toUpperCase())
// }

// async function processArrayImageField(args: {
//   item: any
//   fieldName: string
//   label: string
//   req: any
//   altBase: string
//   createdMedia: CreatedMedia[]
// }): Promise<void> {
//   const { item, fieldName, label, req, altBase, createdMedia } = args
//   const Caps = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//   const pendingOriginalField = `pending${Caps}Original`
//   const pendingCropField = `pending${Caps}Crop`
//   const originalField = `${fieldName}Original`
//   const blurDataURLField = `${fieldName}BlurDataURL`

//   // Original
//   if (item[pendingOriginalField] && typeof item[pendingOriginalField] === 'string') {
//     const { buffer, ext } = decodeDataURL(item[pendingOriginalField])
//     const tmp = path.join(
//       os.tmpdir(),
//       `${fieldName}-original-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
//     )
//     await fs.writeFile(tmp, buffer)
//     const created = await req.payload.create({
//       collection: MEDIA_SLUG,
//       data: { alt: `${altBase} ${label} Original` },
//       filePath: tmp,
//     })
//     await fs.unlink(tmp).catch(() => {})
//     createdMedia.push({ id: created.id, collection: MEDIA_SLUG })
//     trackReqCreatedMedia(req, created.id, MEDIA_SLUG)
//     item[originalField] = created.id
//     item[pendingOriginalField] = undefined
//   }

//   // Cropped
//   if (item[pendingCropField] && typeof item[pendingCropField] === 'string') {
//     const { buffer, ext } = decodeDataURL(item[pendingCropField])
//     const tmp = path.join(
//       os.tmpdir(),
//       `${fieldName}-crop-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
//     )
//     await fs.writeFile(tmp, buffer)
//     const cropped = await req.payload.create({
//       collection: MEDIA_SLUG,
//       data: { alt: `${altBase} ${label}` },
//       filePath: tmp,
//     })
//     await fs.unlink(tmp).catch(() => {})
//     createdMedia.push({ id: cropped.id, collection: MEDIA_SLUG })
//     trackReqCreatedMedia(req, cropped.id, MEDIA_SLUG)
//     item[fieldName] = cropped.id
//     item[pendingCropField] = undefined
//     item[blurDataURLField] = await generateBlurDataURL(buffer)
//   }
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

// /**
//  * Hook factory — now block-aware.
//  */
// export function createBeforeChangeHook(config: {
//   imageConfigs?: ImageConfig[]
//   arrayFields?: ArrayMediaConfig[]
//   groupFields?: GroupMediaConfig[]
//   blockSimpleFields?: BlockSimpleMediaConfig[]
//   blockArrayFields?: BlockArrayMediaConfig[]
//   blockGroupFields?: BlockGroupMediaConfig[]
// }) {
//   return async ({ data, req, originalDoc }: any) => {
//     if (!data) return data

//     const altBase = data.title || (data.heading ?? data.sectionHeading) || data.name || 'Document'
//     const createdMedia: CreatedMedia[] = []

//     try {
//       // 1) Main images (top-level)
//       if (config.imageConfigs?.length) {
//         for (const imageConfig of config.imageConfigs) {
//           await processImageField({
//             data,
//             fieldConfig: imageConfig,
//             originalDoc,
//             req,
//             altBase,
//             createdMedia,
//           })
//         }
//       }

//       // 2) One-level arrays
//       if (config.arrayFields?.length) {
//         for (const arrayConfig of config.arrayFields) {
//           const arr = data[arrayConfig.fieldName]
//           if (!Array.isArray(arr)) continue

//           for (let i = 0; i < arr.length; i++) {
//             const item = arr[i]
//             if (!item) continue
//             const itemAltBase =
//               item[arrayConfig.itemLabelField || 'label'] ||
//               item.title ||
//               item.heading ||
//               `Item ${i + 1}`

//             for (const mediaField of arrayConfig.mediaFields) {
//               const mfLabel =
//                 arrayConfig.mediaFieldLabels?.[mediaField] ?? labelFromFieldName(mediaField)

//               await processArrayImageField({
//                 item,
//                 fieldName: mediaField,
//                 label: mfLabel,
//                 req,
//                 altBase: itemAltBase,
//                 createdMedia,
//               })
//             }
//           }
//         }
//       }

//       // 3) Nested arrays (groupFields)
//       if (config.groupFields?.length) {
//         for (const gf of config.groupFields) {
//           const groups = Array.isArray(data?.[gf.groupKey]) ? data[gf.groupKey] : []
//           if (!groups.length) continue

//           for (let gi = 0; gi < groups.length; gi++) {
//             const groupItem = groups[gi]
//             if (!groupItem || typeof groupItem !== 'object') continue

//             const groupAltBase =
//               (gf.groupItemLabelField && groupItem[gf.groupItemLabelField]) ||
//               groupItem.title ||
//               groupItem.heading ||
//               groupItem.sectionHeading ||
//               `${gf.groupKey} ${gi + 1}`

//             const nestedArr = Array.isArray(groupItem?.[gf.arrayKey]) ? groupItem[gf.arrayKey] : []
//             for (let ni = 0; ni < nestedArr.length; ni++) {
//               const nestedItem = nestedArr[ni]
//               if (!nestedItem || typeof nestedItem !== 'object') continue

//               const nestedAltBase =
//                 (gf.itemLabelField && nestedItem[gf.itemLabelField]) ||
//                 nestedItem.title ||
//                 nestedItem.label ||
//                 `${gf.arrayKey} ${ni + 1}`

//               for (const mediaField of gf.mediaFields) {
//                 const mfLabel = gf.mediaFieldLabels?.[mediaField] ?? labelFromFieldName(mediaField)
//                 await processArrayImageField({
//                   item: nestedItem,
//                   fieldName: mediaField,
//                   label: mfLabel,
//                   req,
//                   altBase: `${groupAltBase} ${nestedAltBase}`.trim(),
//                   createdMedia,
//                 })
//               }
//             }
//           }
//         }
//       }

//       /* ---------- NEW: blocks ---------- */

//       // 4) Block simple fields (media on block row)
//       if (config.blockSimpleFields?.length) {
//         for (const b of config.blockSimpleFields) {
//           eachBlockRow(data, b.layoutKey, b.blockType, async (row) => {
//             for (const mf of b.mediaFields) {
//               await processImageField({
//                 data: row,
//                 fieldConfig: {
//                   fieldName: mf,
//                   label: b.mediaFieldLabels?.[mf] ?? mf,
//                   description: '',
//                   aspectRatio: 1,
//                 },
//                 originalDoc,
//                 req,
//                 altBase,
//               })
//             }
//           })
//         }
//       }

//       // 5) Block array fields (array items have media)
//       if (config.blockArrayFields?.length) {
//         for (const b of config.blockArrayFields) {
//           eachBlockRow(data, b.layoutKey, b.blockType, async (row) => {
//             const arr = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
//             for (let i = 0; i < arr.length; i++) {
//               const item = arr[i]
//               const itemAltBase =
//                 item?.[b.itemLabelField || 'label'] ||
//                 item?.title ||
//                 item?.heading ||
//                 `Item ${i + 1}`
//               for (const mf of b.mediaFields) {
//                 const label = b.mediaFieldLabels?.[mf] ?? labelFromFieldName(mf)
//                 await processArrayImageField({
//                   item,
//                   fieldName: mf,
//                   label,
//                   req,
//                   altBase: `${altBase} ${itemAltBase}`.trim(),
//                   createdMedia,
//                 })
//               }
//             }
//           })
//         }
//       }

//       // 6) Block group fields (group -> nested array)
//       if (config.blockGroupFields?.length) {
//         for (const b of config.blockGroupFields) {
//           eachBlockRow(data, b.layoutKey, b.blockType, async (row) => {
//             const groups = Array.isArray(row?.[b.groupKey]) ? row[b.groupKey] : []
//             for (let gi = 0; gi < groups.length; gi++) {
//               const group = groups[gi]
//               const groupAltBase =
//                 (b.groupItemLabelField && group?.[b.groupItemLabelField]) ||
//                 group?.title ||
//                 group?.heading ||
//                 `${b.groupKey} ${gi + 1}`

//               const nestedArr = Array.isArray(group?.[b.arrayKey]) ? group[b.arrayKey] : []
//               for (let ni = 0; ni < nestedArr.length; ni++) {
//                 const item = nestedArr[ni]
//                 const nestedAltBase =
//                   (b.itemLabelField && item?.[b.itemLabelField]) ||
//                   item?.title ||
//                   item?.label ||
//                   `${b.arrayKey} ${ni + 1}`

//                 for (const mf of b.mediaFields) {
//                   const label = b.mediaFieldLabels?.[mf] ?? labelFromFieldName(mf)
//                   await processArrayImageField({
//                     item,
//                     fieldName: mf,
//                     label,
//                     req,
//                     altBase: `${groupAltBase} ${nestedAltBase}`.trim(),
//                     createdMedia,
//                   })
//                 }
//               }
//             }
//           })
//         }
//       }

//       return data
//     } catch (error) {
//       const r = req as any
//       const stash = createdMedia.length ? createdMedia : r._createdMediaForRollback || []
//       if (stash.length) {
//         await Promise.all(
//           stash.map((m: CreatedMedia) =>
//             req.payload
//               .delete({ collection: m.collection, id: m.id })
//               .catch((e: any) =>
//                 req.payload.logger?.warn?.(`Rollback delete failed for ${m.id}: ${e?.message}`),
//               ),
//           ),
//         )
//       }
//       throw error
//     }
//   }
// }

// =========================================================================================
// =========================================================================================
// =========================================================================================

// src/utils/media/createBeforeChangeHook.ts
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs/promises'
import { generateBlurDataURL } from '@/utils/generateBlurDataURL'
import {
  decodeDataURL,
  processImageField,
  CreatedMedia,
  ImageConfig,
  trackReqCreatedMedia,
  MEDIA_SLUG,
} from './mediaUtils'
import type {
  ArrayMediaConfig,
  GroupMediaConfig,
  BlockSimpleMediaConfig,
  BlockArrayMediaConfig,
  BlockGroupMediaConfig,
} from './withMediaLifecycle'

function labelFromFieldName(fieldName: string) {
  return fieldName.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^\w/, (c) => c.toUpperCase())
}

async function processArrayImageField(args: {
  item: any
  fieldName: string
  label: string
  req: any
  altBase: string
  createdMedia: CreatedMedia[]
}): Promise<void> {
  const { item, fieldName, label, req, altBase, createdMedia } = args
  const Caps = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  const pendingOriginalField = `pending${Caps}Original`
  const pendingCropField = `pending${Caps}Crop`
  const originalField = `${fieldName}Original`
  const blurDataURLField = `${fieldName}BlurDataURL`

  // Original
  if (item[pendingOriginalField] && typeof item[pendingOriginalField] === 'string') {
    const { buffer, ext } = decodeDataURL(item[pendingOriginalField])
    const tmp = path.join(
      os.tmpdir(),
      `${fieldName}-original-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
    )
    await fs.writeFile(tmp, buffer)
    const created = await req.payload.create({
      collection: MEDIA_SLUG,
      data: { alt: `${altBase} ${label} Original` },
      filePath: tmp,
    })
    await fs.unlink(tmp).catch(() => {})
    createdMedia.push({ id: created.id, collection: MEDIA_SLUG })
    trackReqCreatedMedia(req, created.id, MEDIA_SLUG)
    item[originalField] = created.id
    item[pendingOriginalField] = undefined
  }

  // Cropped
  if (item[pendingCropField] && typeof item[pendingCropField] === 'string') {
    const { buffer, ext } = decodeDataURL(item[pendingCropField])
    const tmp = path.join(
      os.tmpdir(),
      `${fieldName}-crop-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`,
    )
    await fs.writeFile(tmp, buffer)
    const cropped = await req.payload.create({
      collection: MEDIA_SLUG,
      data: { alt: `${altBase} ${label}` },
      filePath: tmp,
    })
    await fs.unlink(tmp).catch(() => {})
    createdMedia.push({ id: cropped.id, collection: MEDIA_SLUG })
    trackReqCreatedMedia(req, cropped.id, MEDIA_SLUG)
    item[fieldName] = cropped.id
    item[pendingCropField] = undefined
    item[blurDataURLField] = await generateBlurDataURL(buffer)
  }
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

/**
 * Hook factory — block-aware.
 */
export function createBeforeChangeHook(config: {
  imageConfigs?: ImageConfig[]
  arrayFields?: ArrayMediaConfig[]
  groupFields?: GroupMediaConfig[]
  blockSimpleFields?: BlockSimpleMediaConfig[]
  blockArrayFields?: BlockArrayMediaConfig[]
  blockGroupFields?: BlockGroupMediaConfig[]
}) {
  return async ({ data, req, originalDoc }: any) => {
    if (!data) return data

    const altBase = data.title || (data.heading ?? data.sectionHeading) || data.name || 'Document'
    const createdMedia: CreatedMedia[] = []

    try {
      // 1) Main images (top-level)
      if (config.imageConfigs?.length) {
        for (const imageConfig of config.imageConfigs) {
          await processImageField({
            data,
            fieldConfig: imageConfig,
            originalDoc,
            req,
            altBase,
            createdMedia,
          })
        }
      }

      // 2) One-level arrays
      if (config.arrayFields?.length) {
        for (const arrayConfig of config.arrayFields) {
          const arr = data[arrayConfig.fieldName]
          if (!Array.isArray(arr)) continue

          for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (!item) continue
            const itemAltBase =
              item[arrayConfig.itemLabelField || 'label'] ||
              item.title ||
              item.heading ||
              `Item ${i + 1}`

            for (const mediaField of arrayConfig.mediaFields) {
              const mfLabel = arrayConfig.mediaFieldLabels?.[mediaField] ?? mediaField

              await processArrayImageField({
                item,
                fieldName: mediaField,
                label: mfLabel,
                req,
                altBase: itemAltBase,
                createdMedia,
              })
            }
          }
        }
      }

      // 3) Nested arrays (groupFields)
      if (config.groupFields?.length) {
        for (const gf of config.groupFields) {
          const groups = Array.isArray(data?.[gf.groupKey]) ? data[gf.groupKey] : []
          if (!groups.length) continue

          for (let gi = 0; gi < groups.length; gi++) {
            const groupItem = groups[gi]
            if (!groupItem || typeof groupItem !== 'object') continue

            const groupAltBase =
              (gf.groupItemLabelField && groupItem[gf.groupItemLabelField]) ||
              groupItem.title ||
              groupItem.heading ||
              groupItem.sectionHeading ||
              `${gf.groupKey} ${gi + 1}`

            const nestedArr = Array.isArray(groupItem?.[gf.arrayKey]) ? groupItem[gf.arrayKey] : []
            for (let ni = 0; ni < nestedArr.length; ni++) {
              const nestedItem = nestedArr[ni]
              if (!nestedItem || typeof nestedItem !== 'object') continue

              const nestedAltBase =
                (gf.itemLabelField && nestedItem[gf.itemLabelField]) ||
                nestedItem.title ||
                nestedItem.label ||
                `${gf.arrayKey} ${ni + 1}`

              for (const mediaField of gf.mediaFields) {
                const mfLabel = gf.mediaFieldLabels?.[mediaField] ?? mediaField
                await processArrayImageField({
                  item: nestedItem,
                  fieldName: mediaField,
                  label: mfLabel,
                  req,
                  altBase: `${groupAltBase} ${nestedAltBase}`.trim(),
                  createdMedia,
                })
              }
            }
          }
        }
      }

      /* ---------- blocks ---------- */

      // 4) Block simple fields (media on block row)
      if (config.blockSimpleFields?.length) {
        for (const b of config.blockSimpleFields) {
          eachBlockRow(data, b.layoutKey, b.blockType, async (row) => {
            for (const mf of b.mediaFields) {
              await processImageField({
                data: row,
                fieldConfig: {
                  fieldName: mf,
                  label: b.mediaFieldLabels?.[mf] ?? mf,
                  description: '',
                  aspectRatio: 1,
                },
                originalDoc,
                req,
                altBase,
              })
            }
          })
        }
      }

      // 5) Block array fields (array items have media)
      if (config.blockArrayFields?.length) {
        for (const b of config.blockArrayFields) {
          eachBlockRow(data, b.layoutKey, b.blockType, async (row) => {
            const arr = Array.isArray(row?.[b.arrayKey]) ? row[b.arrayKey] : []
            for (let i = 0; i < arr.length; i++) {
              const item = arr[i]
              const itemAltBase =
                item?.[b.itemLabelField || 'label'] ||
                item?.title ||
                item?.heading ||
                `Item ${i + 1}`
              for (const mf of b.mediaFields) {
                const label = b.mediaFieldLabels?.[mf] ?? mf
                await processArrayImageField({
                  item,
                  fieldName: mf,
                  label,
                  req,
                  altBase: `${altBase} ${itemAltBase}`.trim(),
                  createdMedia,
                })
              }
            }
          })
        }
      }

      // 6) Block group fields (group -> nested array)
      if (config.blockGroupFields?.length) {
        for (const b of config.blockGroupFields) {
          eachBlockRow(data, b.layoutKey, b.blockType, async (row) => {
            const groups = Array.isArray(row?.[b.groupKey]) ? row[b.groupKey] : []
            for (let gi = 0; gi < groups.length; gi++) {
              const group = groups[gi]
              const groupAltBase =
                (b.groupItemLabelField && group?.[b.groupItemLabelField]) ||
                group?.title ||
                group?.heading ||
                `${b.groupKey} ${gi + 1}`

              const nestedArr = Array.isArray(group?.[b.arrayKey]) ? group[b.arrayKey] : []
              for (let ni = 0; ni < nestedArr.length; ni++) {
                const item = nestedArr[ni]
                const nestedAltBase =
                  (b.itemLabelField && item?.[b.itemLabelField]) ||
                  item?.title ||
                  item?.label ||
                  `${b.arrayKey} ${ni + 1}`

                for (const mf of b.mediaFields) {
                  const label = b.mediaFieldLabels?.[mf] ?? mf
                  await processArrayImageField({
                    item,
                    fieldName: mf,
                    label,
                    req,
                    altBase: `${groupAltBase} ${nestedAltBase}`.trim(),
                    createdMedia,
                  })
                }
              }
            }
          })
        }
      }

      return data
    } catch (error) {
      const r = req as any
      const stash = createdMedia.length ? createdMedia : r._createdMediaForRollback || []
      if (stash.length) {
        await Promise.all(
          stash.map((m: CreatedMedia) =>
            req.payload
              .delete({ collection: m.collection, id: m.id })
              .catch((e: any) =>
                req.payload.logger?.warn?.(`Rollback delete failed for ${m.id}: ${e?.message}`),
              ),
          ),
        )
      }
      throw error
    }
  }
}
