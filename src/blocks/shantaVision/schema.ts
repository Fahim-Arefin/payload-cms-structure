import { bnNum } from '@/lib/utils'
// // collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import {
//   ABOUT_US_PAGE_ADMIN_GROUP,
//   ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 14
// const HILITE_MAX = 14
// const DESC_MAX = 200

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /** Highlight must appear verbatim inside sibling field `targetField` */
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
//     fieldName: 'bgImage',
//     label: 'Background Image',
//     description: 'Large background visual for the section. 2.5:1 recommended.',
//     aspectRatio: 2.5 / 1,
//     quality: 0.8,
//     maxKB: 200,
//   },
// ]

// /* ---------------- collection ---------------- */
// const ShantaVission: CollectionConfig = {
//   slug: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'id',
//     defaultColumns: ['visionTitle', 'missionTitle', 'updatedAt'],
//     group: ABOUT_US_PAGE_ADMIN_GROUP,
//     description: 'About Us → “Vision & Mission” section with background image and localized text.',
//   },

//   access: createSingleDocAccess(ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle (cropper + hooks use this)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Background image (direct upload; cropper will also write bgImageBlurDataURL)
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG, // tag uploads
//         required: true,
//       } as any),
//     ),

//     /* ---------------- Vision ---------------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'visionTitle',
//           type: 'text',
//           required: true,
//           label: 'Vision Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Vision Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading for Vision. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'visionTitleBN',
//           type: 'text',
//           required: true,
//           label: 'ভিশন শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Vision Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `ভিশনের প্রধান শিরোনাম। সর্বোচ্চ ${TITLE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'visionHighlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within vision title)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text',
//             'visionTitle',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear inside the Vision Title exactly. Max ${HILITE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'visionHighlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (ভিশন শিরোনামের মধ্যে)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (BN)',
//             'visionTitleBN',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। ভিশন শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${HILITE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'visionDescription',
//           type: 'textarea',
//           required: true,
//           label: 'Vision Description',
//           maxLength: DESC_MAX,
//           validate: validateShortText('Vision Description', DESC_MAX, true),
//           admin: {
//             width: '50%',
//             placeholder: `Short paragraph (1–3 lines). Max ${DESC_MAX} characters.`,
//           },
//         },
//         {
//           name: 'visionDescriptionBN',
//           type: 'textarea',
//           required: true,
//           label: 'ভিশন বর্ণনা (বাংলা)',
//           maxLength: DESC_MAX,
//           validate: validateShortText('Vision Description (BN)', DESC_MAX, true),
//           admin: {
//             width: '50%',
//             placeholder: `সংক্ষিপ্ত অনুচ্ছেদ (১–৩ লাইন)। সর্বোচ্চ ${DESC_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------------- Mission ---------------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'missionTitle',
//           type: 'text',
//           required: true,
//           label: 'Mission Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Mission Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading for Mission. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'missionTitleBN',
//           type: 'text',
//           required: true,
//           label: 'মিশন শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Mission Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `মিশনের প্রধান শিরোনাম। সর্বোচ্চ ${TITLE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'missionHighlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within mission title)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text',
//             'missionTitle',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear inside the Mission Title exactly. Max ${HILITE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'missionHighlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (মিশন শিরোনামের মধ্যে)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (BN)',
//             'missionTitleBN',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। মিশন শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${HILITE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'missionDescription',
//           type: 'textarea',
//           required: true,
//           label: 'Mission Description',
//           maxLength: DESC_MAX,
//           validate: validateShortText('Mission Description', DESC_MAX, true),

//           admin: {
//             width: '50%',
//             placeholder: `Short paragraph (1–3 lines). Max ${DESC_MAX} characters.`,
//           },
//         },
//         {
//           name: 'missionDescriptionBN',
//           type: 'textarea',
//           required: true,
//           label: 'মিশন বর্ণনা (বাংলা)',
//           maxLength: DESC_MAX,
//           validate: validateShortText('Mission Description (BN)', DESC_MAX, true),
//           admin: {
//             width: '50%',
//             placeholder: `সংক্ষিপ্ত অনুচ্ছেদ (১–৩ লাইন)। সর্বোচ্চ ${DESC_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//   ],

//   // ✅ media lifecycle: finalize temps on success, purge temps via endpoint, diff delete on edits
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [],
//     skipOnDraft: true,
//     singleDocSlug: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
//     collectionSlug: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req) // fire-and-forget cleanup for temporary:true media
//     },
//   }),
// }

// export default ShantaVission

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// block
import type { Block } from 'payload'

import {
  ABOUT_US_PAGE_SHANTA_VISION_BLOCK_LABEL,
  ABOUT_US_PAGE_SHANTA_VISION_BLOCK_THUMBNAIL_URL,
  ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 14
const HILITE_MAX = 14
const DESC_MAX = 200

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Highlight must appear verbatim inside sibling field `targetField` */
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
const ShantaVisionSchema: Block = {
  slug: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,

  labels: {
    singular: ABOUT_US_PAGE_SHANTA_VISION_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_SHANTA_VISION_BLOCK_LABEL,
  },

  imageURL: ABOUT_US_PAGE_SHANTA_VISION_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ABOUT_US_PAGE_SHANTA_VISION_BLOCK_LABEL} preview`,

  fields: [
    // Background image (direct upload; cropper will also write bgImageBlurDataURL)
    // {
    //   name: 'bgImage',
    //   label: 'Background Image',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description: 'Large background visual for the section. 2.5:1 recommended.',
    //   },
    // },
    ...generateImageFields({
      fieldName: 'bgImage',
      label: 'Background Image',
      description: 'Large background visual for the section. 2.5:1 recommended.',
      aspectRatio: 2.5 / 1, // ≈ 2.5 : 1
      quality: 0.92, // high quality webp
      maxKB: 500, // adjust if you want tighter size
      ownerCollection: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG as any,
    } as any),

    /* ---------------- Vision ---------------- */
    {
      type: 'row',
      fields: [
        {
          name: 'visionTitle',
          type: 'text',
          required: true,
          label: 'Vision Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Vision Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading for Vision. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'visionTitleBN',
          type: 'text',
          required: true,
          label: 'ভিশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Vision Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `ভিশনের প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visionHighlightedText',
          type: 'text',
          label: 'Highlighted Text (within vision title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text',
            'visionTitle',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear inside the Vision Title exactly. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'visionHighlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (ভিশন শিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'visionTitleBN',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। ভিশন শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'visionDescription',
          type: 'textarea',
          required: true,
          label: 'Vision Description',
          maxLength: DESC_MAX,
          validate: validateShortText('Vision Description', DESC_MAX, true),
          admin: {
            width: '50%',
            placeholder: `Short paragraph (1–3 lines). Max ${DESC_MAX} characters.`,
          },
        },
        {
          name: 'visionDescriptionBN',
          type: 'textarea',
          required: true,
          label: 'ভিশন বর্ণনা (বাংলা)',
          maxLength: DESC_MAX,
          validate: validateShortText('Vision Description (BN)', DESC_MAX, true),
          admin: {
            width: '50%',
            placeholder: `সংক্ষিপ্ত অনুচ্ছেদ (১–৩ লাইন)। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------------- Mission ---------------- */
    {
      type: 'row',
      fields: [
        {
          name: 'missionTitle',
          type: 'text',
          required: true,
          label: 'Mission Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Mission Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading for Mission. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'missionTitleBN',
          type: 'text',
          required: true,
          label: 'মিশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Mission Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `মিশনের প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'missionHighlightedText',
          type: 'text',
          label: 'Highlighted Text (within mission title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text',
            'missionTitle',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear inside the Mission Title exactly. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'missionHighlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (মিশন শিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'missionTitleBN',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। মিশন শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'missionDescription',
          type: 'textarea',
          required: true,
          label: 'Mission Description',
          maxLength: DESC_MAX,
          validate: validateShortText('Mission Description', DESC_MAX, true),

          admin: {
            width: '50%',
            placeholder: `Short paragraph (1–3 lines). Max ${DESC_MAX} characters.`,
          },
        },
        {
          name: 'missionDescriptionBN',
          type: 'textarea',
          required: true,
          label: 'মিশন বর্ণনা (বাংলা)',
          maxLength: DESC_MAX,
          validate: validateShortText('Mission Description (BN)', DESC_MAX, true),
          admin: {
            width: '50%',
            placeholder: `সংক্ষিপ্ত অনুচ্ছেদ (১–৩ লাইন)। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },
  ],
}

export default ShantaVisionSchema
