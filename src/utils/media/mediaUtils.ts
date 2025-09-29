// // latest code
// import path from 'node:path'
// import os from 'node:os'
// import fs from 'node:fs/promises'
// import { generateBlurDataURL } from '@/utils/generateBlurDataURL'

// export interface ImageConfig {
//   fieldName: string
//   label: string
//   description: string
//   aspectRatio: number
//   quality?: number
//   maxKB?: number
//   minWidth?: number
//   minHeight?: number
// }

// export interface CreatedMedia {
//   id: string
//   collection: string
// }

// export function decodeDataURL(dataURL: string): { buffer: Buffer; mime: string; ext: string } {
//   const m = dataURL.match(/^data:(.+);base64,(.*)$/)
//   if (!m) throw new Error('Invalid dataURL')
//   const mime = m[1]
//   const b64 = m[2]
//   const buffer = Buffer.from(b64, 'base64')
//   const ext = mime.split('/')[1] || 'bin'
//   return { buffer, mime, ext }
// }

// export async function processImageField(args: {
//   data: any
//   fieldConfig: ImageConfig
//   originalDoc: any
//   req: any
//   altBase: string
//   createdMedia?: CreatedMedia[] // Add optional rollback tracker
// }): Promise<void> {
//   const { data, fieldConfig, originalDoc, req, altBase, createdMedia } = args
//   const { fieldName } = fieldConfig

//   const pendingOriginalField = `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`
//   const pendingCropField = `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`
//   const originalField = `${fieldName}Original`
//   const blurDataURLField = `${fieldName}BlurDataURL`

//   // Process original image if staged
//   if (data[pendingOriginalField] && typeof data[pendingOriginalField] === 'string') {
//     try {
//       const { buffer, ext } = decodeDataURL(data[pendingOriginalField])
//       const tmp = path.join(
//         os.tmpdir(),
//         `${fieldName}-original-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`,
//       )
//       await fs.writeFile(tmp, buffer)

//       const created = await req.payload.create({
//         collection: 'media',
//         data: { alt: `${altBase} ${fieldConfig.label} Original` },
//         filePath: tmp,
//       })
//       await fs.unlink(tmp).catch(() => {})

//       // Track created media for potential rollback
//       if (createdMedia) {
//         createdMedia.push({ id: created.id, collection: 'media' })
//       }

//       // Delete previous original image if it exists
//       const prevOriginal = originalDoc?.[originalField]
//       if (prevOriginal && prevOriginal !== created.id) {
//         try {
//           await req.payload.delete({ collection: 'media', id: prevOriginal })
//         } catch {
//           /* ignore if already gone */
//         }
//       }

//       data[originalField] = created.id
//       data[pendingOriginalField] = undefined
//     } catch (error) {
//       console.error(`Error processing ${fieldName} original image:`, error)
//       throw error // Re-throw to trigger rollback
//     }
//   }

//   // Process cropped image if staged
//   if (data[pendingCropField] && typeof data[pendingCropField] === 'string') {
//     try {
//       const { buffer, ext } = decodeDataURL(data[pendingCropField])
//       const tmp = path.join(
//         os.tmpdir(),
//         `${fieldName}-crop-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`,
//       )
//       await fs.writeFile(tmp, buffer)

//       const cropped = await req.payload.create({
//         collection: 'media',
//         data: { alt: `${altBase} ${fieldConfig.label}` },
//         filePath: tmp,
//       })
//       await fs.unlink(tmp).catch(() => {})

//       // Track created media for potential rollback
//       if (createdMedia) {
//         createdMedia.push({ id: cropped.id, collection: 'media' })
//       }

//       // Delete previous cropped image if it exists
//       const prevCropped = originalDoc?.[fieldName]
//       if (prevCropped && prevCropped !== cropped.id) {
//         try {
//           await req.payload.delete({ collection: 'media', id: prevCropped })
//         } catch {
//           /* ignore if already gone */
//         }
//       }

//       data[fieldName] = cropped.id
//       data[pendingCropField] = undefined

//       // Generate blur data URL
//       data[blurDataURLField] = await generateBlurDataURL(buffer)
//     } catch (error) {
//       console.error(`Error processing ${fieldName} cropped image:`, error)
//       throw error // Re-throw to trigger rollback
//     }
//   }
// }

// // Rollback function to delete created media
// export async function rollbackCreatedMedia(req: any, createdMedia: CreatedMedia[]): Promise<void> {
//   for (const media of createdMedia) {
//     try {
//       await req.payload.delete({
//         collection: media.collection,
//         id: media.id,
//       })
//       console.log(`Rollback: Deleted media ${media.id}`)
//     } catch (rollbackError) {
//       console.error(`Failed to rollback media ${media.id}:`, rollbackError)
//     }
//   }
// }

// ====================================================================================
// ====================================================================================
// ====================================================================================

// // 90% solved code
// import path from 'node:path'
// import os from 'node:os'
// import fs from 'node:fs/promises'
// import { generateBlurDataURL } from '@/utils/generateBlurDataURL'

// export interface ImageConfig {
//   fieldName: string
//   label: string
//   description: string
//   aspectRatio: number
//   quality?: number
//   maxKB?: number
//   minWidth?: number
//   minHeight?: number
// }

// export interface CreatedMedia {
//   id: string
//   collection: string
// }

// // NEW: per-request tracker helper
// export function trackReqCreatedMedia(req: any, id: string, collection: string = 'media') {
//   const r = req as any
//   if (!Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []
//   r._createdMediaForRollback.push({ id, collection })
// }

// export function decodeDataURL(dataURL: string): { buffer: Buffer; mime: string; ext: string } {
//   const m = dataURL.match(/^data:(.+);base64,(.*)$/)
//   if (!m) throw new Error('Invalid dataURL')
//   const mime = m[1]
//   const b64 = m[2]
//   const buffer = Buffer.from(b64, 'base64')
//   const ext = mime.split('/')[1] || 'bin'
//   return { buffer, mime, ext }
// }

// export async function processImageField(args: {
//   data: any
//   fieldConfig: ImageConfig
//   originalDoc: any
//   req: any
//   altBase: string
//   createdMedia?: CreatedMedia[] // optional local rollback tracker
// }): Promise<void> {
//   const { data, fieldConfig, originalDoc, req, altBase, createdMedia } = args
//   const { fieldName } = fieldConfig

//   const caps = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//   const pendingOriginalField = `pending${caps}Original`
//   const pendingCropField = `pending${caps}Crop`
//   const originalField = `${fieldName}Original`
//   const blurDataURLField = `${fieldName}BlurDataURL`

//   // Process original image if staged
//   if (data[pendingOriginalField] && typeof data[pendingOriginalField] === 'string') {
//     try {
//       const { buffer, ext } = decodeDataURL(data[pendingOriginalField])
//       const tmp = path.join(
//         os.tmpdir(),
//         `${fieldName}-original-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`,
//       )
//       await fs.writeFile(tmp, buffer)

//       const created = await req.payload.create({
//         collection: 'media',
//         data: { alt: `${altBase} ${fieldConfig.label} Original` },
//         filePath: tmp,
//       })
//       await fs.unlink(tmp).catch(() => {})

//       // Track created media (local + request-level)
//       if (createdMedia) createdMedia.push({ id: created.id, collection: 'media' })
//       trackReqCreatedMedia(req, created.id, 'media') // NEW

//       // Delete previous original image if it exists
//       const prevOriginal = originalDoc?.[originalField]
//       if (prevOriginal && prevOriginal !== created.id) {
//         try {
//           await req.payload.delete({ collection: 'media', id: prevOriginal })
//         } catch {
//           /* ignore if already gone */
//         }
//       }

//       data[originalField] = created.id
//       data[pendingOriginalField] = undefined
//     } catch (error) {
//       console.error(`Error processing ${fieldName} original image:`, error)
//       throw error // Re-throw to trigger rollback
//     }
//   }

//   // Process cropped image if staged
//   if (data[pendingCropField] && typeof data[pendingCropField] === 'string') {
//     try {
//       const { buffer, ext } = decodeDataURL(data[pendingCropField])
//       const tmp = path.join(
//         os.tmpdir(),
//         `${fieldName}-crop-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`,
//       )
//       await fs.writeFile(tmp, buffer)

//       const cropped = await req.payload.create({
//         collection: 'media',
//         data: { alt: `${altBase} ${fieldConfig.label}` },
//         filePath: tmp,
//       })
//       await fs.unlink(tmp).catch(() => {})

//       // Track created media (local + request-level)
//       if (createdMedia) createdMedia.push({ id: cropped.id, collection: 'media' })
//       trackReqCreatedMedia(req, cropped.id, 'media') // NEW

//       // Delete previous cropped image if it exists
//       const prevCropped = originalDoc?.[fieldName]
//       if (prevCropped && prevCropped !== cropped.id) {
//         try {
//           await req.payload.delete({ collection: 'media', id: prevCropped })
//         } catch {
//           /* ignore if already gone */
//         }
//       }

//       data[fieldName] = cropped.id
//       data[pendingCropField] = undefined

//       // Generate blur data URL
//       data[blurDataURLField] = await generateBlurDataURL(buffer)
//     } catch (error) {
//       console.error(`Error processing ${fieldName} cropped image:`, error)
//       throw error // Re-throw to trigger rollback
//     }
//   }
// }

// // Rollback function to delete created media
// export async function rollbackCreatedMedia(req: any, createdMedia: CreatedMedia[]): Promise<void> {
//   for (const media of createdMedia) {
//     try {
//       await req.payload.delete({
//         collection: media.collection,
//         id: media.id,
//       })
//       req.payload.logger?.info?.(`Rollback: Deleted media ${media.id}`)
//     } catch (rollbackError) {
//       req.payload.logger?.warn?.(
//         `Failed to rollback media ${media.id}: ${(rollbackError as Error).message}`,
//       )
//     }
//   }
// }

// ====================================================================================
// ====================================================================================
// ====================================================================================
// 100% solved code
import path from 'node:path'
import os from 'node:os'
import fs from 'node:fs/promises'
import type { CollectionSlug } from 'payload'
import { generateBlurDataURL } from '@/utils/generateBlurDataURL'

export const MEDIA_SLUG = 'media' as CollectionSlug

export interface ImageConfig {
  fieldName: string
  label: string
  description: string
  aspectRatio: number
  quality?: number
  maxKB?: number
  minWidth?: number
  minHeight?: number
}

export interface CreatedMedia {
  id: string
  collection: CollectionSlug
}

// per-request tracker
export function trackReqCreatedMedia(
  req: any,
  id: string,
  collection: CollectionSlug = MEDIA_SLUG,
) {
  const r = req as any
  if (!Array.isArray(r._createdMediaForRollback)) r._createdMediaForRollback = []
  r._createdMediaForRollback.push({ id, collection })
}

export function decodeDataURL(dataURL: string): { buffer: Buffer; mime: string; ext: string } {
  const m = dataURL.match(/^data:(.+);base64,(.*)$/)
  if (!m) throw new Error('Invalid dataURL')
  const mime = m[1]
  const b64 = m[2]
  const buffer = Buffer.from(b64, 'base64')
  const ext = mime.split('/')[1] || 'bin'
  return { buffer, mime, ext }
}

/**
 * CREATE-only (no deletions here). Deletions happen in afterChange.
 */
export async function processImageField(args: {
  data: any
  fieldConfig: ImageConfig
  originalDoc: any
  req: any
  altBase: string
  createdMedia?: CreatedMedia[]
}): Promise<void> {
  const { data, fieldConfig, req, altBase, createdMedia } = args
  const { fieldName, label } = fieldConfig

  const Caps = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  const pendingOriginalField = `pending${Caps}Original`
  const pendingCropField = `pending${Caps}Crop`
  const originalField = `${fieldName}Original`
  const blurDataURLField = `${fieldName}BlurDataURL`

  // original
  if (data[pendingOriginalField] && typeof data[pendingOriginalField] === 'string') {
    const { buffer, ext } = decodeDataURL(data[pendingOriginalField])
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
    if (createdMedia) createdMedia.push({ id: created.id, collection: MEDIA_SLUG })
    trackReqCreatedMedia(req, created.id, MEDIA_SLUG)
    data[originalField] = created.id
    data[pendingOriginalField] = undefined
  }

  // crop
  if (data[pendingCropField] && typeof data[pendingCropField] === 'string') {
    const { buffer, ext } = decodeDataURL(data[pendingCropField])
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
    if (createdMedia) createdMedia.push({ id: cropped.id, collection: MEDIA_SLUG })
    trackReqCreatedMedia(req, cropped.id, MEDIA_SLUG)
    data[fieldName] = cropped.id
    data[pendingCropField] = undefined
    data[blurDataURLField] = await generateBlurDataURL(buffer)
  }
}

// delete newly-created media on failure
export async function rollbackCreatedMedia(req: any, createdMedia: CreatedMedia[]): Promise<void> {
  for (const media of createdMedia) {
    try {
      await req.payload.delete({ collection: media.collection, id: media.id })
      req.payload.logger?.info?.(`Rollback: Deleted media ${media.id}`)
    } catch (e) {
      req.payload.logger?.warn?.(`Rollback delete failed for ${media.id}: ${(e as Error).message}`)
    }
  }
}
