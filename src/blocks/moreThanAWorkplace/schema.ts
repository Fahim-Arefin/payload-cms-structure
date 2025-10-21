// // collection config
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

// import {
//   AGENT_ONBOARDING_PAGE_ADMIN_GROUP,
//   AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { bnNum } from '@/lib/utils'
// import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 80
// const HILITE_MAX = 40

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /** Require that highlight appears verbatim inside sibling `targetField`. */
// const validateHighlightedInField =
//   (label: string, targetField: string, max = HILITE_MAX, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
//     return true
//   }

// /* ---------------- images ---------------- */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'backgroundImage',
//     label: 'Background Image',
//     description: 'Large section background visual. 16:9 recommended.',
//     aspectRatio: 16 / 9,
//     quality: 0.95,
//     maxKB: 300,
//   },
// ]

// /* ---------------- collection ---------------- */
// const MoreThanAWorkplace: CollectionConfig = {
//   slug: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'title',
//     group: AGENT_ONBOARDING_PAGE_ADMIN_GROUP,
//     defaultColumns: ['title', 'updatedAt'],
//     description:
//       'More Than a Workplace → background image + EN/BN title with highlighted text + gallery array of images.',
//   },

//   access: createSingleDocAccess(AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Background image
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
//         required: true,
//       } as any),
//     ),

//     /* ---------- Title (EN/BN) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: true,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Highlighted Title (EN/BN) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within Title)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear verbatim inside the Title. Max ${HILITE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (BN)',
//             'titleBN',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Gallery array of images ---------- */
//     {
//       name: 'gallery',
//       type: 'array',
//       label: 'Gallery Images',
//       required: true,
//       minRows: 1,
//       maxRows: 12,
//       labels: { singular: 'Image', plural: 'Images' },
//       admin: {
//         description: 'A collection of images to display in the gallery.',
//       },
//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Image',
//           description: 'Upload an image for the gallery. aspect ratio 1.5:1',
//           aspectRatio: 1.5 / 1,
//           quality: 0.95,
//           maxKB: 250,
//           ownerCollection: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG as any,
//           required: true,
//         } as any),
//       ],
//     },
//   ],

//   // ✅ Unified media lifecycle
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [
//       {
//         fieldName: 'gallery',
//         mediaFields: ['image'],
//         itemLabelField: 'id',
//         mediaFieldLabels: { image: 'Gallery Image' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
//     collectionSlug: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default MoreThanAWorkplace

// =======================================================================================
// =======================================================================================
// =======================================================================================
// =======================================================================================

// src/collections/MoreThanAWorkplace.ts
import type { Block } from 'payload'

import {
  AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_LABEL,
  AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_THUMBNAIL_URL,
  AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
} from '@/lib/constants'

import { bnNum } from '@/lib/utils'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HILITE_MAX = 40

/* ---------------- validators ---------------- */

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Require that highlight appears verbatim inside sibling `targetField`. */
const validateHighlightedInField =
  (label: string, targetField: string, max = HILITE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

/* ---------------- collection ---------------- */
const MoreThanAWorkplaceSchema: Block = {
  slug: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
  labels: {
    singular: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_LABEL,
    plural: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_LABEL,
  },

  imageURL: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FCF4EB',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    // Background image
    // {
    //   name: 'backgroundImage',
    //   label: 'Background Image',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description: 'Large section background visual. 16:9 recommended.',
    //   },
    // },
    // Background image (generated, 16:9)
    ...generateImageFields({
      fieldName: 'backgroundImage',
      label: 'Background Image',
      description: 'Large section background visual. 16:9 recommended.',
      aspectRatio: 16 / 9,
      quality: 0.93,
      maxKB: 500,
      ownerCollection: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG as any,
    } as any),

    /* ---------- Title (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Highlighted Title (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within Title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'titleBN',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Gallery array of images ---------- */
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery Images',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Image', plural: 'Images' },
      admin: {
        description: 'A collection of images to display in the gallery.',
      },
      fields: [
        // {
        //   name: 'image',
        //   label: 'Image',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        //   admin: {
        //     description: 'Upload an image for the gallery. aspect ratio 1.5:1',
        //   },
        // },
        // Image (generated, 1.5:1)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image',
          description: 'Upload an image for the gallery. Aspect ratio ~1.5:1.',
          aspectRatio: 1.5 / 1,
          quality: 0.93,
          maxKB: 400,
          ownerCollection: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG as any,
        } as any),
      ],
    },
  ],
}

export default MoreThanAWorkplaceSchema
