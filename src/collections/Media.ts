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

// =============================================================================
// =============================================================================
// =============================================================================
// // prev working code
// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   upload: true,

//   admin: {
//     useAsTitle: 'ownerCollection',
//     defaultColumns: ['filename', 'temporary', 'ownerCollection', 'derivedFrom'],
//     listSearchableFields: ['ownerCollection', 'filename', 'id', 'derivedFrom'],
//   },

//   fields: [
//     {
//       name: 'temporary',
//       type: 'checkbox',
//       defaultValue: true,
//       index: true,
//       admin: { description: 'Temporary until document saves successfully' },
//     },
//     { name: 'ownerCollection', type: 'text', index: true, admin: { readOnly: true } },
//     { name: 'ownerDocId', type: 'text', index: true, admin: { readOnly: true } },
//     { name: 'ownerField', type: 'text', index: true, admin: { readOnly: true } },

//     // Link cropped file back to original
//     { name: 'derivedFrom', type: 'relationship', relationTo: 'media', admin: { readOnly: true } },

//     // Optional: if you store tiny blur here
//     { name: 'blurDataURL', type: 'text', admin: { readOnly: true } },
//   ],

//   access: {
//     read: () => true,
//     create: () => true,
//     update: () => true,
//     delete: () => true,
//   },
// }

// export default Media

// ====================================================================================
// ====================================================================================
// ====================================================================================

// src/collections/Media.ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,

  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'temporary', 'ownerCollection', 'derivedFrom'],
    listSearchableFields: ['ownerCollection', 'filename', 'id', 'derivedFrom', 'alt'],
  },

  fields: [
    // ✅ add alt so create/update({ data: { alt } }) type-checks
    { name: 'alt', type: 'text', required: false },

    {
      name: 'temporary',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      admin: { description: 'Temporary until document saves successfully' },
    },

    { name: 'ownerCollection', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'ownerDocId', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'ownerField', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'ownerSessionId', type: 'text', index: true, admin: { readOnly: true } },

    // Link cropped file back to original
    { name: 'derivedFrom', type: 'relationship', relationTo: 'media', admin: { readOnly: true } },

    // Optional blur
    { name: 'blurDataURL', type: 'text', admin: { readOnly: true } },
  ],

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
}

export default Media
