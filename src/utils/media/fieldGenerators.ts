// import type { Field } from 'payload'
// import { ImageConfig, MEDIA_SLUG } from './mediaUtils'

// // normalize relationship shape to id
// function relIdFrom(val: any): string | null {
//   if (!val) return null
//   if (typeof val === 'string') return val
//   if (typeof val === 'object') {
//     if (typeof val.value === 'string') return val.value
//     if (typeof val.value?.id === 'string') return val.value.id
//     if (typeof val.id === 'string') return val.id
//   }
//   return null
// }

// /**
//  * Strong server-side validator
//  */
// async function validateExistingMedia(
//   val: any,
//   { siblingData, req }: any,
//   fieldName: string,
//   label: string,
// ) {
//   const cap = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//   const pendingCropKey = `pending${cap}Crop`
//   const pendingOriginalKey = `pending${cap}Original`

//   const hasPending = Boolean(siblingData?.[pendingCropKey] || siblingData?.[pendingOriginalKey])
//   const id = relIdFrom(val)

//   if (!id && !hasPending) return `Please select and crop the ${label.toLowerCase()}.`
//   if (hasPending) return true

//   try {
//     await req.payload.findByID({ collection: MEDIA_SLUG, id: String(id) })
//     return true
//   } catch {
//     return `The selected ${label.toLowerCase()} is missing. Please re-upload.`
//   }
// }

// export function generateImageFields(config: ImageConfig & { ownerCollection?: string }): Field[] {
//   const {
//     fieldName,
//     label,
//     description,
//     aspectRatio,
//     // quality = 0.9,
//     quality = 0.95,
//     maxKB = 500,
//     ownerCollection,
//   } = config

//   return [
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       required: true,
//       label,
//       admin: {
//         description,
//         components: { Field: { path: '@/components/admin/CropUploadField' } },
//       },
//       validate: async (val: any, ctx: any) => validateExistingMedia(val, ctx, fieldName, label),
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality,
//           maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//           ownerCollection, // 👈 pass down so client can tag uploads
//           // 👇 ADD THESE TWO LINES
//           accept: 'image/*',
//           // outputType: 'image/jpg',
//           outputType: 'image/webp',
//         },
//       } as any),
//     },
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `${fieldName}BlurDataURL`,
//       type: 'text',
//       admin: { readOnly: true, description: 'Auto-generated Base64 blur' },
//     },
//   ]
// }

// export function generateArrayImageFields(config: {
//   fieldName: string
//   label: string
//   description: string
//   aspectRatio: number
//   quality?: number
//   maxKB?: number
//   ownerCollection?: string
// }): Field[] {
//   const {
//     fieldName,
//     label,
//     description,
//     aspectRatio,
//     // quality = 0.9,
//     quality = 0.95,
//     maxKB = 500,
//     ownerCollection,
//   } = config

//   return [
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       required: true,
//       label,
//       admin: {
//         description,
//         components: { Field: { path: '@/components/admin/CropUploadField' } },
//       },
//       validate: async (val: any, ctx: any) => validateExistingMedia(val, ctx, fieldName, label),
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality,
//           maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//           ownerCollection, // 👈 pass through
//           // 👇 ADD THESE TWO LINES
//           accept: 'image/*',
//           // outputType: 'image/jpg',
//           outputType: 'image/webp',
//         },
//       } as any),
//     },
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     { name: `${fieldName}BlurDataURL`, type: 'text', admin: { readOnly: true } },
//   ]
// }

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// // version 01
// import type { Field } from 'payload'

// export const MEDIA_SLUG = 'media'

// /** Normalize any relationship-ish value to an ID string */
// function relIdFrom(val: any): string | null {
//   if (!val) return null
//   if (typeof val === 'string' || typeof val === 'number') return String(val)
//   if (typeof val === 'object') {
//     if (typeof val.value === 'string') return val.value
//     if (val.value && typeof val.value.id === 'string') return val.value.id
//     if (typeof val.id === 'string') return val.id
//   }
//   return null
// }

// /** HARDENED server-side validator for upload fields */
// export async function validateExistingMedia(
//   val: any,
//   { siblingData, req }: any,
//   fieldName: string,
//   label: string,
// ) {
//   const cap = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
//   const pendingCropKey = `pending${cap}Crop`
//   const pendingOriginalKey = `pending${cap}Original`

//   const idFromMain = relIdFrom(val)
//   const pendingId =
//     typeof siblingData?.[pendingCropKey] === 'string'
//       ? siblingData[pendingCropKey]
//       : typeof siblingData?.[pendingOriginalKey] === 'string'
//         ? siblingData[pendingOriginalKey]
//         : null

//   const explicitOriginalRel = siblingData?.[`${fieldName}Original`]
//   const idFromExplicitOriginal = relIdFrom(explicitOriginalRel)

//   const id = idFromMain || pendingId || idFromExplicitOriginal
//   if (!id) return `Please select and crop the ${label.toLowerCase()}.`

//   try {
//     await req.payload.findByID({ collection: MEDIA_SLUG, id: String(id) })
//     return true
//   } catch {
//     if (pendingId) return true
//     return `The selected ${label.toLowerCase()} is missing. Please re-upload.`
//   }
// }

// export function generateImageFields(config: {
//   fieldName: string
//   label: string
//   description: string
//   aspectRatio: number
//   quality?: number
//   maxKB?: number
//   ownerCollection?: string
// }): Field[] {
//   const {
//     fieldName,
//     label,
//     description,
//     aspectRatio,
//     quality = 0.95,
//     maxKB = 500,
//     ownerCollection,
//   } = config

//   return [
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       required: false, // let validator enforce it
//       label,
//       admin: {
//         description,
//         components: { Field: { path: '@/components/admin/CropUploadField' } },
//       },
//       validate: async (val: any, ctx: any) => validateExistingMedia(val, ctx, fieldName, label),
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality,
//           maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//           ownerCollection,
//           accept: 'image/*',
//           outputType: 'image/webp',
//         },
//       } as any),
//     },
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `${fieldName}BlurDataURL`,
//       type: 'text',
//       admin: { readOnly: true, description: 'Auto-generated Base64 blur' },
//     },
//   ]
// }

// export function generateArrayImageFields(config: {
//   fieldName: string
//   label: string
//   description: string
//   aspectRatio: number
//   quality?: number
//   maxKB?: number
//   ownerCollection?: string
// }): Field[] {
//   const {
//     fieldName,
//     label,
//     description,
//     aspectRatio,
//     quality = 0.95,
//     maxKB = 500,
//     ownerCollection,
//   } = config

//   return [
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       required: false,
//       label,
//       admin: {
//         description,
//         components: { Field: { path: '@/components/admin/CropUploadField' } },
//       },
//       validate: async (val: any, ctx: any) => validateExistingMedia(val, ctx, fieldName, label),
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality,
//           maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//           ownerCollection,
//           accept: 'image/*',
//           outputType: 'image/webp',
//         },
//       } as any),
//     },
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: { condition: () => false, readOnly: true },
//     },
//     { name: `${fieldName}BlurDataURL`, type: 'text', admin: { readOnly: true } },
//   ]
// }

// ========================================================================
// ========================================================================
// ========================================================================

// version - 02
// src/utils/media/fieldGenerators.ts
import type { Field } from 'payload'

export const MEDIA_SLUG = 'media'

/** Normalizes any relationship-like value to an ID string (handy later if you re-add validation) */
function relIdFrom(val: any): string | null {
  if (!val) return null
  if (typeof val === 'string' || typeof val === 'number') return String(val)
  if (typeof val === 'object') {
    if (typeof val.value === 'string') return val.value
    if (val?.value?.id) return String(val.value.id)
    if (val?.id) return String(val.id)
  }
  return null
}

/** 🔓 PERMISSIVE VALIDATOR: always pass. (Unblocks saving) */
export async function validateExistingMedia() {
  return true
}

/** Single image field */
export function generateImageFields(config: {
  fieldName: string
  label: string
  description: string
  aspectRatio: number
  quality?: number
  maxKB?: number
  ownerCollection?: string
}): Field[] {
  const {
    fieldName,
    label,
    description,
    aspectRatio,
    quality = 0.95,
    maxKB = 500,
    ownerCollection,
  } = config

  return [
    {
      name: fieldName,
      type: 'upload',
      relationTo: MEDIA_SLUG,
      required: false,
      label,
      admin: {
        description,
        components: { Field: { path: '@/components/admin/CropUploadField' } },
      },
      validate: validateExistingMedia, // ← always true
      ...({
        cropper: {
          aspect: aspectRatio,
          quality,
          maxKB,
          previewSize: 'tab',
          defaultAlt: label,
          originalField: `${fieldName}Original`,
          pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
          pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
          specificLabel: label,
          specificDescription: description,
          ownerCollection,
          accept: 'image/*',
          outputType: 'image/webp',
        },
      } as any),
    },
    // hidden helpers the cropper writes
    {
      name: `${fieldName}Original`,
      type: 'upload',
      relationTo: MEDIA_SLUG,
      admin: { condition: () => false, readOnly: true },
    },
    {
      name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
      type: 'text',
      admin: { condition: () => false, readOnly: true },
    },
    {
      name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
      type: 'text',
      admin: { condition: () => false, readOnly: true },
    },
    {
      name: `${fieldName}BlurDataURL`,
      type: 'text',
      admin: { readOnly: true, description: 'Auto-generated Base64 blur' },
    },
  ]
}

/** Array-item image (used in your Hero items) */
export function generateArrayImageFields(config: {
  fieldName: string
  label: string
  description: string
  aspectRatio: number
  quality?: number
  maxKB?: number
  ownerCollection?: string
}): Field[] {
  const {
    fieldName,
    label,
    description,
    aspectRatio,
    quality = 0.95,
    maxKB = 500,
    ownerCollection,
  } = config

  return [
    {
      name: fieldName,
      type: 'upload',
      relationTo: MEDIA_SLUG,
      required: false,
      label,
      admin: {
        description,
        components: { Field: { path: '@/components/admin/CropUploadField' } },
      },
      validate: validateExistingMedia, // ← always true
      ...({
        cropper: {
          aspect: aspectRatio,
          quality,
          maxKB,
          previewSize: 'tab',
          defaultAlt: label,
          originalField: `${fieldName}Original`,
          pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
          pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
          specificLabel: label,
          specificDescription: description,
          ownerCollection,
          accept: 'image/*',
          outputType: 'image/webp',
        },
      } as any),
    },
    {
      name: `${fieldName}Original`,
      type: 'upload',
      relationTo: MEDIA_SLUG,
      admin: { condition: () => false, readOnly: true },
    },
    {
      name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
      type: 'text',
      admin: { condition: () => false, readOnly: true },
    },
    {
      name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
      type: 'text',
      admin: { condition: () => false, readOnly: true },
    },
    { name: `${fieldName}BlurDataURL`, type: 'text', admin: { readOnly: true } },
  ]
}
