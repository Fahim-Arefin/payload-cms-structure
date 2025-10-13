// // src/collections/AboutAllAbout.ts
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import {
//   ABOUT_US_PAGE_ADMIN_GROUP,
//   ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 40
// const CARD_TITLE_MAX = 30
// const DESC_MAX = 150

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /** Highlight must exist verbatim in sibling target field */
// const validateHighlightedInField =
//   (label: string, targetField: string, max = TITLE_MAX, required = true) =>
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
//     fieldName: 'image',
//     label: 'Background Image',
//     description: 'Large background image for the section. 2:3 recommended.',
//     aspectRatio: 2 / 3,
//     quality: 0.85,
//     maxKB: 200,
//   },
// ]

// const ValuesThatShapeUs: CollectionConfig = {
//   slug: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'title',
//     group: ABOUT_US_PAGE_ADMIN_GROUP,
//     defaultColumns: ['title', 'updatedAt'],
//     description:
//       'About Us → “Values That Shape Us” section (title + highlighted part + value cards).',
//   },

//   access: createSingleDocAccess(ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id used by cropper + hooks for temp uploads
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Section title + highlighted part (EN + BN twins, same row pairing)
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
//             description: `Base title (e.g., “Values That”). Max ${TITLE_MAX} characters.`,
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
//             description: `মূল শিরোনাম (যেমন, “আমাদের মূল্যবোধ”). সর্বোচ্চ ${TITLE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedText',
//           type: 'text',
//           label: 'Highlighted Title (within Title)',
//           maxLength: TITLE_MAX,
//           validate: validateHighlightedInField('Highlighted Title', 'title', TITLE_MAX, false),
//           admin: {
//             width: '50%',
//             description: `Highlighted tail of the heading (e.g., “Shape Us”). Must appear inside Title exactly. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//           maxLength: TITLE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Title (BN)',
//             'titleBN',
//             TITLE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `শিরোনামের রঙিন অংশ (যেমন, “আমাদের পরিচয়”). এটি অবশ্যই শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${TITLE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     // Background image (not localized)
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
//       } as any),
//     ),

//     // Cards (values) — localized EN/BN twins for title & description; media stays single
//     {
//       name: 'values',
//       type: 'array',
//       label: 'Values',
//       required: true,
//       minRows: 3,
//       maxRows: 10,
//       labels: { singular: 'Value', plural: 'Values' },
//       admin: {
//         description:
//           'Add value items with icon + hover icon, a short title, and a brief description.',
//       },
//       fields: [
//         // Static icon (not localized)
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Icon (default)',
//           description:
//             'Icon shown normally. (give colored version and transparent bg image) (ratio 1:1)',
//           aspectRatio: 1,
//           quality: 0.9,
//           maxKB: 50,
//           ownerCollection: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG as any,
//         } as any),

//         // Hover icon (not localized)
//         ...generateArrayImageFields({
//           fieldName: 'hoverImage',
//           label: 'Icon (on hover)',
//           description:
//             'Icon shown on hover. (give white version and transparent bg image) (ratio 1:1)',
//           aspectRatio: 1,
//           quality: 0.9,
//           maxKB: 50,
//           ownerCollection: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG as any,
//         } as any),

//         // Texts (EN + BN twins, paired rows)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               label: 'Card Title',
//               maxLength: CARD_TITLE_MAX,
//               validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Short card title (e.g., “Trust”). Max ${CARD_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'কার্ড শিরোনাম (বাংলা)',
//               maxLength: CARD_TITLE_MAX,
//               validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `সংক্ষিপ্ত কার্ড শিরোনাম (যেমন, “বিশ্বাস”). সর্বোচ্চ ${CARD_TITLE_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'textarea',
//               required: true,
//               label: 'Card Description',
//               maxLength: DESC_MAX,
//               validate: validateShortText('Card Description', DESC_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Brief one-liner or two-liner. Max ${DESC_MAX} characters.`,
//               },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'textarea',
//               required: true,
//               label: 'কার্ডের বর্ণনা (বাংলা)',
//               maxLength: DESC_MAX,
//               validate: validateShortText('Card Description (BN)', DESC_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `সংক্ষিপ্ত এক/দুই লাইনের বিবরণ। সর্বোচ্চ ${DESC_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [
//       {
//         fieldName: 'values',
//         mediaFields: ['image', 'hoverImage'],
//         itemLabelField: 'title',
//         mediaFieldLabels: { image: 'Icon', hoverImage: 'Hover Icon' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
//     collectionSlug: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default ValuesThatShapeUs

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// block
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

import {
  ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_BLOCK_LABEL,
  ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
} from '@/lib/constants'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 40
const CARD_TITLE_MAX = 40
const DESC_MAX = 150

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

/** Highlight must exist verbatim in sibling target field */
const validateHighlightedInField =
  (label: string, targetField: string, max = TITLE_MAX, required = true) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

const ValuesThatShapeUsSchema: Block = {
  slug: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
  labels: {
    singular: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_BLOCK_LABEL,
  },

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#F6EDDD',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    // Section title + highlighted part (EN + BN twins, same row pairing)
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
            description: `Base title (e.g., “Values That”). Max ${TITLE_MAX} characters.`,
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
            description: `মূল শিরোনাম (যেমন, “আমাদের মূল্যবোধ”). সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Title (within Title)',
          maxLength: TITLE_MAX,
          validate: validateHighlightedInField('Highlighted Title', 'title', TITLE_MAX, false),
          admin: {
            width: '50%',
            description: `Highlighted tail of the heading (e.g., “Shape Us”). Must appear inside Title exactly. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: TITLE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Title (BN)',
            'titleBN',
            TITLE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `শিরোনামের রঙিন অংশ (যেমন, “আমাদের পরিচয়”). এটি অবশ্যই শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Background image (not localized)
    {
      name: 'image',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Large background image for the section. 2:3 recommended.',
      },
    },

    // Cards (values) — localized EN/BN twins for title & description; media stays single
    {
      name: 'values',
      type: 'array',
      label: 'Values',
      required: true,
      minRows: 3,
      maxRows: 10,
      labels: { singular: 'Value', plural: 'Values' },
      admin: {
        description:
          'Add value items with icon + hover icon, a short title, and a brief description.',
      },
      fields: [
        // Static icon (not localized)
        {
          name: 'image',
          label: 'Icon (default)',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Icon shown normally. (give colored version and transparent bg image) (ratio 1:1)',
          },
        },

        // Hover icon (not localized)
        {
          name: 'hoverImage',
          label: 'Icon (on hover)',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Icon shown on hover. (give white version and transparent bg image) (ratio 1:1)',
          },
        },

        // Texts (EN + BN twins, paired rows)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Card Title',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Short card title (e.g., “Trust”). Max ${CARD_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'কার্ড শিরোনাম (বাংলা)',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত কার্ড শিরোনাম (যেমন, “বিশ্বাস”). সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Card Description',
              maxLength: DESC_MAX,
              validate: validateShortText('Card Description', DESC_MAX, true),
              admin: {
                width: '50%',
                description: `Brief one-liner or two-liner. Max ${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'textarea',
              required: true,
              label: 'কার্ডের বর্ণনা (বাংলা)',
              maxLength: DESC_MAX,
              validate: validateShortText('Card Description (BN)', DESC_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত এক/দুই লাইনের বিবরণ। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default ValuesThatShapeUsSchema
