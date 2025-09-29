import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

// =================================================================
// =================================================================
// =================================================================

// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   upload: true,

//   // 👇 Admin list settings: make ownerCollection the “title”
//   // and search across ownerCollection/ownerField/filename/session/id
//   admin: {
//     useAsTitle: 'ownerCollection',
//     defaultColumns: ['filename', 'temporary', 'ownerCollection', 'uploadSessionId'],
//     // Payload v3+: tells the list search bar which fields to search
//     listSearchableFields: ['ownerCollection', 'filename', 'uploadSessionId', 'id'],
//   },

//   fields: [
//     {
//       name: 'temporary',
//       type: 'checkbox',
//       defaultValue: true,
//       index: true,
//       admin: { description: 'Temporary until document saves successfully' },
//     },
//     { name: 'uploadSessionId', type: 'text', index: true },
//     { name: 'ownerCollection', type: 'text', index: true, admin: { readOnly: true } },
//     { name: 'ownerDocId', type: 'text', index: true, admin: { readOnly: true } },
//     { name: 'ownerField', type: 'text', index: true, admin: { readOnly: true } },
//     // keep if you’re writing the tiny blur here from the cropper
//     { name: 'blurDataURL', type: 'text', admin: { readOnly: true } },
//   ],

//   access: {
//     read: () => true,
//     create: () => true,
//     update: () => true,
//     delete: () => true,
//   },
// }

// =================================================================
// =================================================================
// =================================================================
