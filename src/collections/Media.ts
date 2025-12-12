// // currently working code
// import type { CollectionConfig } from 'payload'

// export const Media: CollectionConfig = {
//   slug: 'media',
//   upload: true,

//   admin: {
//     useAsTitle: 'filename',
//     defaultColumns: ['filename', 'temporary', 'ownerCollection', 'derivedFrom'],
//     listSearchableFields: ['filename', 'ownerCollection', 'derivedFrom'],
//   },

//   fields: [
//     // alt text kept for type-safe create/update
//     { name: 'alt', type: 'text', required: false },

//     {
//       name: 'temporary',
//       type: 'checkbox',
//       defaultValue: true,
//       index: true,
//       admin: { description: 'Temporary until the owning document publishes successfully' },
//     },

//     { name: 'ownerCollection', type: 'text', index: true, admin: { readOnly: true } },
//     { name: 'ownerDocId', type: 'text', index: true, admin: { readOnly: true } },
//     { name: 'ownerField', type: 'text', index: true, admin: { readOnly: true } },
//     { name: 'ownerSessionId', type: 'text', index: true, admin: { readOnly: true } },

//     // 🔁 JUST TEXT — we will write the BLOCK SLUG here (e.g., "hero", "why-choose-us")
//     { name: 'derivedFrom', type: 'text', index: true, admin: { readOnly: true } },

//     // Optional tiny blur data URL (useful for previews)
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

//==================================================================
//==================================================================
//==================================================================
//==================================================================

// src/collections/Media.ts
import { MEDIA } from '@/lib/constants'
import type { CollectionConfig } from 'payload'

export const MEDIA_SLUG = 'media'

const Media: CollectionConfig = {
  slug: MEDIA_SLUG,
  upload: true,
  admin: {
    // group: MEDIA,
    useAsTitle: 'filename',
    defaultColumns: [
      'filename',
      'versionStage',
      'temporary',
      'ownerCollection',
      // 'ownerDocId',
      // 'ownerDocSlug',
      'ownerDocName',
      'ownerBlockType',
      // 'ownerField',
    ],
    listSearchableFields: [
      'filename',
      'versionStage',
      'ownerCollection',
      'ownerDocName',
      'ownerBlockType',
    ],
  },

  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    // who owns this file (for cleanup / grouping)
    {
      name: 'ownerCollection',
      label: 'Collection Name',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      // 🔥 NEW: which doc this media belongs to (page id, etc.)
      name: 'ownerDocId',
      label: 'Page Id',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'ownerDocSlug',
      label: 'Page Slug',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'ownerDocName', // 👈 NEW
      label: 'Page Name',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'ownerBlockType',
      label: 'Block Name',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'ownerField',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'temporary',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Temporary file; will be purged if not finalized.' },
    },
    {
      name: 'temporaryExpiresAt',
      type: 'date',
      admin: { readOnly: true },
    },
    {
      name: 'blurDataURL',
      type: 'text',
      admin: { readOnly: true },
    },
    // 🔥 version stage flag for draft vs published
    {
      name: 'versionStage',
      type: 'select',
      options: [
        { label: 'Publish', value: 'publish' },
        { label: 'Last Draft', value: 'lastDraft' },
      ],
      defaultValue: undefined,
      required: false,
      admin: {
        position: 'sidebar',
        description:
          'Internal marker: whether this file belongs to the published version or last saved draft.',
      },
    },
  ],
}

export default Media
