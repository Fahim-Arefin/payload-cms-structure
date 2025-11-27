// collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import { ABOUT_US_PAGE_ADMIN_GROUP, ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG } from '@/lib/constants'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'

// /* ---------- limits ---------- */
// const HEADING_MAX = 20
// const SUBHEADING_MAX = 35
// const PTITLE_MAX = 80
// const PARA_MAX = 350 // long blurb

// /* ---------- validators ---------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// const validateTextarea =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /* ---------- image config ---------- */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'image',
//     label: 'Intro Image',
//     description: 'Primary visual for the intro section. 2.15 : 1 recommended.',
//     aspectRatio: 2.15 / 1,
//     quality: 0.85,
//     maxKB: 100,
//     // required handled when generating fields below
//   },
// ]

// /* ---------- collection ---------- */
// const ShantaIntro: CollectionConfig = {
//   slug: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'heading',
//     defaultColumns: ['heading', 'subheading', 'updatedAt'],
//     group: ABOUT_US_PAGE_ADMIN_GROUP,
//     description:
//       'About Us → “Shanta Intro” section with headline, subheadline, paragraph title, image, and paragraph.',
//   },

//   access: createSingleDocAccess(ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle (used by cropper + hooks)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Heading / Subheading
//     {
//       type: 'row',
//       fields: [
//         // EN
//         {
//           name: 'heading',
//           type: 'text',
//           required: true,
//           label: 'Heading',
//           maxLength: HEADING_MAX,
//           validate: validateShortText('Heading', HEADING_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Short, strong opener. Max ${HEADING_MAX} characters.`,
//           },
//         },
//         // BN
//         {
//           name: 'headingBN',
//           type: 'text',
//           required: true,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: HEADING_MAX,
//           validate: validateShortText('Heading (BN)', HEADING_MAX, true),
//           admin: {
//             width: '50%',
//             description: `সংক্ষিপ্ত, শক্তিশালী সূচনা। সর্বোচ্চ ${HEADING_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         // EN
//         {
//           name: 'subheading',
//           type: 'text',
//           required: true,
//           label: 'Subheading',
//           maxLength: SUBHEADING_MAX,
//           validate: validateShortText('Subheading', SUBHEADING_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Secondary line below the heading. Max ${SUBHEADING_MAX} characters.`,
//           },
//         },
//         // BN
//         {
//           name: 'subheadingBN',
//           type: 'text',
//           required: true,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: SUBHEADING_MAX,
//           validate: validateShortText('Subheading (BN)', SUBHEADING_MAX, true),
//           admin: {
//             width: '50%',
//             description: `শিরোনামের নিচে দ্বিতীয় লাইন। সর্বোচ্চ ${SUBHEADING_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     // Paragraph title
//     {
//       type: 'row',
//       fields: [
//         // EN
//         {
//           name: 'paragraphTitle',
//           type: 'text',
//           required: true,
//           label: 'Paragraph Title',
//           maxLength: PTITLE_MAX,
//           validate: validateShortText('Paragraph Title', PTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Lead-in title above the paragraph. Max ${PTITLE_MAX} characters.`,
//           },
//         },
//         // BN
//         {
//           name: 'paragraphTitleBN',
//           type: 'text',
//           required: true,
//           label: 'অনুচ্ছেদের শিরোনাম (বাংলা)',
//           maxLength: PTITLE_MAX,
//           validate: validateShortText('Paragraph Title (BN)', PTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `অনুচ্ছেদের উপরে লিড-ইন শিরোনাম। সর্বোচ্চ ${PTITLE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     // Paragraph
//     {
//       type: 'row',
//       fields: [
//         // EN
//         {
//           name: 'paragraph',
//           type: 'textarea',
//           required: true,
//           label: 'Paragraph',
//           maxLength: PARA_MAX,
//           validate: validateTextarea('Paragraph', PARA_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Main descriptive text. Max ${PARA_MAX} characters.`,
//             placeholder:
//               'Born from a vision to redefine life insurance in Bangladesh, Shanta Life is backed by a powerful consortium...',
//           },
//         },
//         // BN
//         {
//           name: 'paragraphBN',
//           type: 'textarea',
//           required: true,
//           label: 'অনুচ্ছেদ (বাংলা)',
//           maxLength: PARA_MAX,
//           validate: validateTextarea('Paragraph (BN)', PARA_MAX, true),
//           admin: {
//             width: '50%',
//             description: `মূল বর্ণনামূলক টেক্সট। সর্বোচ্চ ${PARA_MAX} অক্ষর।`,
//             placeholder:
//               'বাংলাদেশে জীবনবিমাকে নতুনভাবে সংজ্ঞায়িত করার লক্ষ্যে জন্ম নেওয়া শানতা লাইফ শক্তিশালী একটি কনসোর্টিয়ামের সহযোগিতায় পরিচালিত...',
//           },
//         },
//       ],
//     },

//     // Image (direct upload via cropper; ...BlurDataURL will be set by your field generator/hook)
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG, // tag uploads to this collection
//         required: true,
//       } as any),
//     ),
//   ],

//   // ✅ unified lifecycle: finalize temps on success, purge temporary on demand, diff-delete on edits
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [],
//     skipOnDraft: true,
//     singleDocSlug: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
//     collectionSlug: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req) // fire-and-forget cleanup for temporary:true
//     },
//   }),
// }

// export default ShantaIntro

// ========================================================================================
// ========================================================================================
// ========================================================================================
// ========================================================================================

// block
import type { Block } from 'payload'

import {
  ABOUT_US_PAGE,
  ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_LABEL,
  ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_THUMBNAIL_URL,
  ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
  COMMON,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const COLOR_HEX_LEN = 7
const HEADING_MAX = 20
const SUBHEADING_MAX = 35
const PTITLE_MAX = 80
const PARA_MAX = 400 // long blurb

/* ---------- validators ---------- */

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

const validateTextarea =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/* ---------- collection ---------- */
const ShantaIntroSchema: Block = {
  slug: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
  labels: {
    singular: ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_LABEL,
  },
  admin: {
    group: COMMON,
  },

  imageURL: ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle (used by cropper + hooks)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

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

    // Heading / Subheading
    {
      type: 'row',
      fields: [
        // EN
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          maxLength: HEADING_MAX,
          validate: validateShortText('Heading', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `Short, strong opener. Max ${HEADING_MAX} characters.`,
          },
        },
        // BN
        {
          name: 'headingBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: HEADING_MAX,
          validate: validateShortText('Heading (BN)', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `সংক্ষিপ্ত, শক্তিশালী সূচনা। সর্বোচ্চ ${bnNum(HEADING_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        // EN
        {
          name: 'subheading',
          type: 'text',
          required: true,
          label: 'Subheading',
          maxLength: SUBHEADING_MAX,
          validate: validateShortText('Subheading', SUBHEADING_MAX, true),
          admin: {
            width: '50%',
            description: `Secondary line below the heading. Max ${SUBHEADING_MAX} characters.`,
          },
        },
        // BN
        {
          name: 'subheadingBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBHEADING_MAX,
          validate: validateShortText('Subheading (BN)', SUBHEADING_MAX, true),
          admin: {
            width: '50%',
            description: `শিরোনামের নিচে দ্বিতীয় লাইন। সর্বোচ্চ ${bnNum(SUBHEADING_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Paragraph title
    {
      type: 'row',
      fields: [
        // EN
        {
          name: 'paragraphTitle',
          type: 'text',
          required: true,
          label: 'Paragraph Title',
          maxLength: PTITLE_MAX,
          validate: validateShortText('Paragraph Title', PTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Lead-in title above the paragraph. Max ${PTITLE_MAX} characters.`,
          },
        },
        // BN
        {
          name: 'paragraphTitleBN',
          type: 'text',
          required: true,
          label: 'অনুচ্ছেদের শিরোনাম (বাংলা)',
          maxLength: PTITLE_MAX,
          validate: validateShortText('Paragraph Title (BN)', PTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `অনুচ্ছেদের উপরে লিড-ইন শিরোনাম। সর্বোচ্চ ${bnNum(PTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Paragraph
    {
      type: 'row',
      fields: [
        // EN
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
          label: 'Paragraph',
          maxLength: PARA_MAX,
          validate: validateTextarea('Paragraph', PARA_MAX, true),
          admin: {
            width: '50%',
            description: `Main descriptive text. Max ${PARA_MAX} characters.`,
            placeholder:
              'Born from a vision to redefine life insurance in Bangladesh, Shanta Life is backed by a powerful consortium...',
          },
        },
        // BN
        {
          name: 'paragraphBN',
          type: 'textarea',
          required: true,
          label: 'অনুচ্ছেদ (বাংলা)',
          maxLength: PARA_MAX,
          validate: validateTextarea('Paragraph (BN)', PARA_MAX, true),
          admin: {
            width: '50%',
            description: `মূল বর্ণনামূলক টেক্সট। সর্বোচ্চ ${bnNum(PARA_MAX)} অক্ষর।`,
            placeholder:
              'বাংলাদেশে জীবনবিমাকে নতুনভাবে সংজ্ঞায়িত করার লক্ষ্যে জন্ম নেওয়া শানতা লাইফ শক্তিশালী একটি কনসোর্টিয়ামের সহযোগিতায় পরিচালিত...',
          },
        },
      ],
    },

    // {
    //   name: 'image',
    //   label: 'Intro Image',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description: 'Primary visual for the intro section. 2.15:1 recommended.',
    //   },
    // },
    ...generateImageFields({
      fieldName: 'image',
      label: 'Intro Image',
      description:
        'Primary visual for the intro section. Use tranparent image. 2.15:1 recommended.',
      aspectRatio: 2.15 / 1, // ≈ 2.15 : 1
      quality: 0.9, // high quality webp
      maxKB: 300, // tweak if you want stricter size
      ownerCollection: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG as any,
    } as any),
  ],
}

export default ShantaIntroSchema
