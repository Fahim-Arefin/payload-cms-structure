// // latest code
// import type { Field } from 'payload'
// import { ImageConfig } from './mediaUtils'

// export function generateImageFields(config: ImageConfig): Field[] {
//   const { fieldName, label, description, aspectRatio, quality = 0.8, maxKB = 500 } = config

//   return [
//     // Cropped image field
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: 'media',
//       required: true,
//       label: label,
//       admin: {
//         description: description,
//         components: {
//           Field: {
//             path: '@/components/admin/CropUploadField',
//           },
//         },
//       },
//       validate: (val: any, { siblingData }: any) => {
//         if (val) return true
//         if (siblingData?.[`pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`])
//           return true
//         return `Please select and crop the ${label.toLowerCase()}.`
//       },
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality: quality,
//           maxKB: maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//         },
//       } as any),
//     },
//     // Original image field (hidden)
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: 'media',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Hidden pending fields
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Blur data URL field
//     {
//       name: `${fieldName}BlurDataURL`,
//       type: 'text',
//       admin: {
//         readOnly: true,
//         description: 'Auto-generated Base64 blur',
//       },
//     },
//   ]
// }

// // utils/media/fieldGenerators.ts
// export function generateArrayImageFields(config: {
//   fieldName: string
//   label: string
//   description: string
//   aspectRatio: number
//   quality?: number
//   maxKB?: number
// }): Field[] {
//   const { fieldName, label, description, aspectRatio, quality = 0.8, maxKB = 500 } = config

//   return [
//     // Cropped image field for array items
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: 'media',
//       required: true,
//       label: label,
//       admin: {
//         description: description,
//         components: {
//           Field: {
//             path: '@/components/admin/CropUploadField',
//           },
//         },
//       },
//       validate: (val: any, { siblingData }: any) => {
//         if (val) return true
//         if (siblingData?.[`pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`])
//           return true
//         return `Please select and crop the ${label.toLowerCase()}.`
//       },
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality: quality,
//           maxKB: maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//         },
//       } as any),
//     },
//     // Original image field for array items (hidden)
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: 'media',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Hidden pending fields for array items
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Blur data URL field for array items
//     {
//       name: `${fieldName}BlurDataURL`,
//       type: 'text',
//       admin: {
//         readOnly: true,
//       },
//     },
//   ]
// }

// ================================================================
// ================================================================
// ================================================================

// // 90% solved code
// import type { Field } from 'payload'
// import { ImageConfig } from './mediaUtils'

// export function generateImageFields(config: ImageConfig): Field[] {
//   const { fieldName, label, description, aspectRatio, quality = 0.8, maxKB = 500 } = config

//   return [
//     // Cropped image field
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: 'media',
//       required: true,
//       label: label,
//       admin: {
//         description: description,
//         components: {
//           Field: {
//             path: '@/components/admin/CropUploadField',
//           },
//         },
//       },
//       validate: (val: any, { siblingData }: any) => {
//         if (val) return true
//         if (siblingData?.[`pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`])
//           return true
//         return `Please select and crop the ${label.toLowerCase()}.`
//       },
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality: quality,
//           maxKB: maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//         },
//       } as any),
//     },
//     // Original image field (hidden)
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: 'media',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Hidden pending fields
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Blur data URL field
//     {
//       name: `${fieldName}BlurDataURL`,
//       type: 'text',
//       admin: {
//         readOnly: true,
//         description: 'Auto-generated Base64 blur',
//       },
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
// }): Field[] {
//   const { fieldName, label, description, aspectRatio, quality = 0.8, maxKB = 500 } = config

//   return [
//     // Cropped image field for array items
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: 'media',
//       required: true,
//       label: label,
//       admin: {
//         description: description,
//         components: {
//           Field: {
//             path: '@/components/admin/CropUploadField',
//           },
//         },
//       },
//       validate: (val: any, { siblingData }: any) => {
//         if (val) return true
//         if (siblingData?.[`pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`])
//           return true
//         return `Please select and crop the ${label.toLowerCase()}.`
//       },
//       ...({
//         cropper: {
//           aspect: aspectRatio,
//           quality: quality,
//           maxKB: maxKB,
//           previewSize: 'tab',
//           defaultAlt: label,
//           originalField: `${fieldName}Original`,
//           pendingOriginalField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//           pendingCropField: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//           specificLabel: label,
//           specificDescription: description,
//         },
//       } as any),
//     },
//     // Original image field for array items (hidden)
//     {
//       name: `${fieldName}Original`,
//       type: 'upload',
//       relationTo: 'media',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Hidden pending fields for array items
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Original`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     {
//       name: `pending${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}Crop`,
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },
//     // Blur data URL field for array items
//     {
//       name: `${fieldName}BlurDataURL`,
//       type: 'text',
//       admin: {
//         readOnly: true,
//       },
//     },
//   ]
// }

// ================================================================
// ================================================================
// ================================================================
// // 100% solved code
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
//  * Strong server-side validator:
//  * - If neither current value nor pending crop/original exist => hard error (acts as required)
//  * - If current value exists => verify the media doc exists
//  * - If pending crop/original exists => allow (it will be created in beforeChange)
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

//   // No existing value and nothing pending -> block (acts as required)
//   if (!id && !hasPending) {
//     return `Please select and crop the ${label.toLowerCase()}.`
//   }

//   // If a new one is pending, allow; beforeChange will create the media.
//   if (hasPending) return true

//   // Validate that existing ID actually exists
//   try {
//     await req.payload.findByID({ collection: MEDIA_SLUG, id: String(id) })
//     return true
//   } catch {
//     return `The selected ${label.toLowerCase()} is missing. Please re-upload.`
//   }
// }

// export function generateImageFields(config: ImageConfig): Field[] {
//   const { fieldName, label, description, aspectRatio, quality = 0.8, maxKB = 500 } = config

//   return [
//     {
//       name: fieldName,
//       type: 'upload',
//       relationTo: MEDIA_SLUG,
//       required: true, // UI hint; our validator also enforces empties
//       label,
//       admin: {
//         description,
//         components: { Field: { path: '@/components/admin/CropUploadField' } },
//       },
//       validate: async (val: any, ctx: any) => {
//         return validateExistingMedia(val, ctx, fieldName, label)
//       },
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
// }): Field[] {
//   const { fieldName, label, description, aspectRatio, quality = 0.8, maxKB = 500 } = config

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
//       validate: async (val: any, ctx: any) => {
//         return validateExistingMedia(val, ctx, fieldName, label)
//       },
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
//       admin: { readOnly: true },
//     },
//   ]
// }

// ================================================================
// ================================================================
// ================================================================

import type { Field } from 'payload'
import { ImageConfig, MEDIA_SLUG } from './mediaUtils'

// normalize relationship shape to id
function relIdFrom(val: any): string | null {
  if (!val) return null
  if (typeof val === 'string') return val
  if (typeof val === 'object') {
    if (typeof val.value === 'string') return val.value
    if (typeof val.value?.id === 'string') return val.value.id
    if (typeof val.id === 'string') return val.id
  }
  return null
}

/**
 * Strong server-side validator
 */
async function validateExistingMedia(
  val: any,
  { siblingData, req }: any,
  fieldName: string,
  label: string,
) {
  const cap = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  const pendingCropKey = `pending${cap}Crop`
  const pendingOriginalKey = `pending${cap}Original`

  const hasPending = Boolean(siblingData?.[pendingCropKey] || siblingData?.[pendingOriginalKey])
  const id = relIdFrom(val)

  if (!id && !hasPending) return `Please select and crop the ${label.toLowerCase()}.`
  if (hasPending) return true

  try {
    await req.payload.findByID({ collection: MEDIA_SLUG, id: String(id) })
    return true
  } catch {
    return `The selected ${label.toLowerCase()} is missing. Please re-upload.`
  }
}

export function generateImageFields(config: ImageConfig & { ownerCollection?: string }): Field[] {
  const {
    fieldName,
    label,
    description,
    aspectRatio,
    // quality = 0.9,
    quality = 0.95,
    maxKB = 500,
    ownerCollection,
  } = config

  return [
    {
      name: fieldName,
      type: 'upload',
      relationTo: MEDIA_SLUG,
      required: true,
      label,
      admin: {
        description,
        components: { Field: { path: '@/components/admin/CropUploadField' } },
      },
      validate: async (val: any, ctx: any) => validateExistingMedia(val, ctx, fieldName, label),
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
          ownerCollection, // 👈 pass down so client can tag uploads
          // 👇 ADD THESE TWO LINES
          accept: 'image/*',
          // outputType: 'image/jpg',
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
    {
      name: `${fieldName}BlurDataURL`,
      type: 'text',
      admin: { readOnly: true, description: 'Auto-generated Base64 blur' },
    },
  ]
}

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
    // quality = 0.9,
    quality = 0.95,
    maxKB = 500,
    ownerCollection,
  } = config

  return [
    {
      name: fieldName,
      type: 'upload',
      relationTo: MEDIA_SLUG,
      required: true,
      label,
      admin: {
        description,
        components: { Field: { path: '@/components/admin/CropUploadField' } },
      },
      validate: async (val: any, ctx: any) => validateExistingMedia(val, ctx, fieldName, label),
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
          ownerCollection, // 👈 pass through
          // 👇 ADD THESE TWO LINES
          accept: 'image/*',
          // outputType: 'image/jpg',
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
