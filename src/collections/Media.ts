// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   access: {
//     read: () => true,
//   },
//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       required: true,
//     },
//   ],
//   upload: true,
// }

// src/collections/Media.ts
import type { CollectionConfig } from 'payload'

const MAX_BYTES = 100 * 1024 // 100 KB

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },

  upload: {
    // ✅ WebP only (blocks jpg/png/svg, etc.)
    mimeTypes: ['image/webp'],

    // ✅ Generate fixed 1.29 ratio variants (Sharp crops to fit)
    // 1.29 ≈ 129:100 — pick widths you actually need
    imageSizes: [
      { name: 'pc_1290x1000', width: 1290, height: 1000, position: 'centre' },
      { name: 'tab_774x600', width: 774, height: 600, position: 'centre' },
      { name: 'mob_387x300', width: 387, height: 300, position: 'centre' },
    ],

    // (optional) storage location for originals + sizes
    // staticURL: '/media',
    staticDir: 'media',

    // (optional) tune encoder
    // formatOptions: { webp: { quality: 82 } },
  },

  hooks: {
    // You can use beforeValidate or beforeChange; beforeValidate fails earlier.
    beforeValidate: [
      async ({ req }) => {
        // Multer attaches the uploaded file on req
        const r = req as any
        const size: number | undefined =
          r?.file?.size ??
          r?.files?.file?.size ??
          (Array.isArray(r?.files?.file) ? r.files.file[0]?.size : undefined)

        if (typeof size === 'number' && size > MAX_BYTES) {
          throw new Error(`File too large: ${(size / 1024).toFixed(0)} KB. Max is 100 KB.`)
        }
      },
    ],
  },

  fields: [{ name: 'alt', type: 'text', required: true }],
}
