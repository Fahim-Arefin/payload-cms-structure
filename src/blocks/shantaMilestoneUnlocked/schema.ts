// // collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import {
//   ABOUT_US_PAGE_ADMIN_GROUP,
//   ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { bnNum } from '@/lib/utils'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 40
// const HILITE_MAX = 40
// const MILESTONE_TITLE_MAX = 40
// const MILESTONE_DATE_MAX = 30 // ← add this
// const MILESTONE_DESC_MAX = 250
// const STAT_LABEL_MAX = 32
// const STAT_VALUE_MAX = 16

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

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
//     fieldName: 'image',
//     label: 'Section Image',
//     description: 'Section main image. 16:9 recommended.',
//     aspectRatio: 16 / 9,
//     quality: 0.9,
//     maxKB: 400,
//   },
// ]

// /* ---------------- collection ---------------- */
// const ShantaMilestonesUnlocked: CollectionConfig = {
//   slug: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'sectionTitle',
//     group: ABOUT_US_PAGE_ADMIN_GROUP,
//     defaultColumns: ['sectionTitle', 'milestoneTitle', 'milestoneDate', 'updatedAt'],
//     description:
//       'About Us → “Shanta Milestones Unlocked”: section image + EN/BN titles + milestone meta + stats icons.',
//   },

//   access: createSingleDocAccess(ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG),

//   fields: [
//     // 🔐 hidden per-doc session id for media finalize/purge cycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     /* ---------- Section image (not localized) ---------- */
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
//         required: true,
//       } as any),
//     ),
//     /* ---------- Section heading (EN/BN twins + highlight) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'sectionTitle',
//           type: 'text',
//           required: true,
//           label: 'Section Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading (e.g., “Shanta Milestones”). Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'sectionTitleBN',
//           type: 'text',
//           required: true,
//           label: 'সেকশন শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `প্রধান শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
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
//           label: 'Highlighted Text (within Section Title)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text',
//             'sectionTitle',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear verbatim inside the Section Title. Max ${HILITE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (সেকশন শিরোনামের মধ্যে)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (BN)',
//             'sectionTitleBN',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। সেকশন শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Milestone title (EN/BN) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'milestoneTitle',
//           type: 'text',
//           required: true,
//           label: 'Milestone Title',
//           maxLength: MILESTONE_TITLE_MAX,
//           validate: validateShortText('Milestone Title', MILESTONE_TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Headline for the milestone. Max ${MILESTONE_TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'milestoneTitleBN',
//           type: 'text',
//           required: true,
//           label: 'মাইলস্টোন শিরোনাম (বাংলা)',
//           maxLength: MILESTONE_TITLE_MAX,
//           validate: validateShortText('Milestone Title (BN)', MILESTONE_TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `মাইলস্টোনের শিরোনাম। সর্বোচ্চ ${bnNum(MILESTONE_TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     /* ---------- Milestone date (EN/BN) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'milestoneDate',
//           type: 'text',
//           required: true,
//           label: 'Milestone Date',
//           maxLength: MILESTONE_DATE_MAX,
//           validate: validateShortText('Milestone Date', MILESTONE_DATE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `e.g., “December 1, 2024”. Max ${MILESTONE_DATE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'milestoneDateBN',
//           type: 'text',
//           required: true,
//           label: 'মাইলস্টোনের তারিখ (বাংলা)',
//           maxLength: MILESTONE_DATE_MAX,
//           validate: validateShortText('Milestone Date (BN)', MILESTONE_DATE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `যেমন, “December ${bnNum(1)}, ${bnNum(2024)}”。 সর্বোচ্চ ${bnNum(MILESTONE_DATE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Milestone description (EN/BN) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'milestoneDescription',
//           type: 'textarea',
//           required: true,
//           label: 'Milestone Description',
//           maxLength: MILESTONE_DESC_MAX,
//           validate: validateShortText('Milestone Description', MILESTONE_DESC_MAX, true),
//           admin: {
//             width: '50%',
//             description: `1–3 lines summarizing the milestone. Max ${MILESTONE_DESC_MAX} characters.`,
//           },
//         },
//         {
//           name: 'milestoneDescriptionBN',
//           type: 'textarea',
//           required: true,
//           label: 'মাইলস্টোন বর্ণনা (বাংলা)',
//           maxLength: MILESTONE_DESC_MAX,
//           validate: validateShortText('Milestone Description (BN)', MILESTONE_DESC_MAX, true),
//           admin: {
//             width: '50%',
//             description: `১–৩ লাইনের সারাংশ। সর্বোচ্চ ${bnNum(MILESTONE_DESC_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Stats array: icon + label (EN/BN) + value ---------- */
//     {
//       name: 'stats',
//       type: 'array',
//       label: 'Milestone Stats (exactly 4)',
//       required: true,
//       minRows: 4,
//       maxRows: 4,
//       labels: { singular: 'Stat', plural: 'Stats' },
//       admin: {
//         description: 'Small highlight items displayed under the milestone (icon + label + value).',
//       },
//       fields: [
//         // icon (not localized)
//         ...generateArrayImageFields({
//           fieldName: 'icon',
//           label: 'Icon',
//           description: 'Square icon (1:1). Use transparent PNG if possible.',
//           aspectRatio: 1,
//           quality: 0.9,
//           maxKB: 80,
//           ownerCollection: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG as any,
//           required: true,
//         } as any),

//         // label (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'label',
//               type: 'text',
//               required: true,
//               label: 'Label',
//               maxLength: STAT_LABEL_MAX,
//               validate: validateShortText('Label', STAT_LABEL_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Short label (e.g., “Policies”). Max ${STAT_LABEL_MAX} characters.`,
//               },
//             },
//             {
//               name: 'labelBN',
//               type: 'text',
//               required: true,
//               label: 'লেবেল (বাংলা)',
//               maxLength: STAT_LABEL_MAX,
//               validate: validateShortText('Label (BN)', STAT_LABEL_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `সংক্ষিপ্ত লেবেল। সর্বোচ্চ ${bnNum(STAT_LABEL_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // value (EN) + valueBN (BN) — short text twins
//         {
//           type: 'row',
//           fields: [
//             // value (EN) + valueBN (BN) — short text twins
//             {
//               name: 'value',
//               type: 'text',
//               required: true,
//               label: 'Value',
//               maxLength: STAT_VALUE_MAX,
//               validate: validateShortText('Value', STAT_VALUE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `E.g., “100+”, “1M+”, “24/7”. Max ${STAT_VALUE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'valueBN',
//               type: 'text',
//               required: true,
//               label: 'মান (বাংলা)',
//               maxLength: STAT_VALUE_MAX,
//               validate: validateShortText('Value (BN)', STAT_VALUE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `যেমন, “${bnNum(100)}+”, “${bnNum(1)}M+”, “${bnNum(24)}/${bnNum(7)}”。 সর্বোচ্চ ${bnNum(STAT_VALUE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   // ✅ Media lifecycle: finalize temps, purge temps, diff-delete on edits
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [
//       {
//         fieldName: 'stats',
//         mediaFields: ['icon'],
//         itemLabelField: 'label',
//         mediaFieldLabels: { icon: 'Icon' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
//     collectionSlug: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default ShantaMilestonesUnlocked

// =====================================================================================================
// =====================================================================================================
// =====================================================================================================
// =====================================================================================================

// block
import type { Block } from 'payload'

import {
  ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_LABEL,
  ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_THUMBNAIL_URL,
  ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
} from '@/lib/constants'

import { bnNum } from '@/lib/utils'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 40
const HILITE_MAX = 40
const MILESTONE_TITLE_MAX = 40
const MILESTONE_DATE_MAX = 30 // ← add this
const MILESTONE_DESC_MAX = 250
const STAT_LABEL_MAX = 32
const STAT_VALUE_MAX = 20

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
const ShantaMilestonesUnlockedSchema: Block = {
  slug: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,

  labels: {
    singular: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_LABEL,
  },

  imageURL: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FFFFFF',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    // main image
    {
      name: 'image',
      label: 'Section Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Section main image. 16:9 recommended.',
      },
    },

    /* ---------- Section heading (EN/BN twins + highlight) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading (e.g., “Shanta Milestones”). Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'sectionTitleBN',
          type: 'text',
          required: true,
          label: 'সেকশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
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
          label: 'Highlighted Text (within Section Title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text',
            'sectionTitle',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Section Title. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সেকশন শিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'sectionTitleBN',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সেকশন শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Milestone title (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'milestoneTitle',
          type: 'text',
          required: true,
          label: 'Milestone Title',
          maxLength: MILESTONE_TITLE_MAX,
          validate: validateShortText('Milestone Title', MILESTONE_TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Headline for the milestone. Max ${MILESTONE_TITLE_MAX} characters.`,
          },
        },
        {
          name: 'milestoneTitleBN',
          type: 'text',
          required: true,
          label: 'মাইলস্টোন শিরোনাম (বাংলা)',
          maxLength: MILESTONE_TITLE_MAX,
          validate: validateShortText('Milestone Title (BN)', MILESTONE_TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `মাইলস্টোনের শিরোনাম। সর্বোচ্চ ${bnNum(MILESTONE_TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    /* ---------- Milestone date (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'milestoneDate',
          type: 'text',
          required: true,
          label: 'Milestone Date',
          maxLength: MILESTONE_DATE_MAX,
          validate: validateShortText('Milestone Date', MILESTONE_DATE_MAX, true),
          admin: {
            width: '50%',
            description: `e.g., “December 1, 2024”. Max ${MILESTONE_DATE_MAX} characters.`,
          },
        },
        {
          name: 'milestoneDateBN',
          type: 'text',
          required: true,
          label: 'মাইলস্টোনের তারিখ (বাংলা)',
          maxLength: MILESTONE_DATE_MAX,
          validate: validateShortText('Milestone Date (BN)', MILESTONE_DATE_MAX, true),
          admin: {
            width: '50%',
            description: `যেমন, “December ${bnNum(1)}, ${bnNum(2024)}”。 সর্বোচ্চ ${bnNum(MILESTONE_DATE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Milestone description (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'milestoneDescription',
          type: 'textarea',
          required: true,
          label: 'Milestone Description',
          maxLength: MILESTONE_DESC_MAX,
          validate: validateShortText('Milestone Description', MILESTONE_DESC_MAX, true),
          admin: {
            width: '50%',
            description: `1–3 lines summarizing the milestone. Max ${MILESTONE_DESC_MAX} characters.`,
          },
        },
        {
          name: 'milestoneDescriptionBN',
          type: 'textarea',
          required: true,
          label: 'মাইলস্টোন বর্ণনা (বাংলা)',
          maxLength: MILESTONE_DESC_MAX,
          validate: validateShortText('Milestone Description (BN)', MILESTONE_DESC_MAX, true),
          admin: {
            width: '50%',
            description: `১–৩ লাইনের সারাংশ। সর্বোচ্চ ${bnNum(MILESTONE_DESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Stats array: icon + label (EN/BN) + value ---------- */
    {
      name: 'stats',
      type: 'array',
      label: 'Milestone Stats (exactly 4)',
      required: true,
      minRows: 4,
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      admin: {
        description: 'Small highlight items displayed under the milestone (icon + label + value).',
      },
      fields: [
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Square icon (1:1). Use transparent PNG if possible.',
          },
        },

        // label (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
              maxLength: STAT_LABEL_MAX,
              validate: validateShortText('Label', STAT_LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `Short label (e.g., “Policies”). Max ${STAT_LABEL_MAX} characters.`,
              },
            },
            {
              name: 'labelBN',
              type: 'text',
              required: true,
              label: 'লেবেল (বাংলা)',
              maxLength: STAT_LABEL_MAX,
              validate: validateShortText('Label (BN)', STAT_LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত লেবেল। সর্বোচ্চ ${bnNum(STAT_LABEL_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // value (EN) + valueBN (BN) — short text twins
        {
          type: 'row',
          fields: [
            // value (EN) + valueBN (BN) — short text twins
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Value',
              maxLength: STAT_VALUE_MAX,
              validate: validateShortText('Value', STAT_VALUE_MAX, true),
              admin: {
                width: '50%',
                description: `E.g., “100+”, “1M+”, “24/7”. Max ${STAT_VALUE_MAX} characters.`,
              },
            },
            {
              name: 'valueBN',
              type: 'text',
              required: true,
              label: 'মান (বাংলা)',
              maxLength: STAT_VALUE_MAX,
              validate: validateShortText('Value (BN)', STAT_VALUE_MAX, true),
              admin: {
                width: '50%',
                description: `যেমন, “${bnNum(100)}+”, “${bnNum(1)}M+”, “${bnNum(24)}/${bnNum(7)}”。 সর্বোচ্চ ${bnNum(STAT_VALUE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default ShantaMilestonesUnlockedSchema
