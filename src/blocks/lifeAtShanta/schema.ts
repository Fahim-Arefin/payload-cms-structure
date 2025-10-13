// // collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import { HOME_PAGE_ADMIN_GROUP, HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG } from '@/lib/constants'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// /* ---------- validators ---------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// const validateHighlightedInSubtitle = (val: unknown, { siblingData }: any) => {
//   if (!val) return true
//   if (typeof val !== 'string') return 'Highlighted Text must be text.'
//   if (typeof siblingData?.subtitle === 'string' && !siblingData.subtitle.includes(val)) {
//     return 'Highlighted Text must exist within the Subtitle exactly.'
//   }
//   return true
// }

// const validateHighlightedInSubtitleBN = (val: unknown, { siblingData }: any) => {
//   if (!val) return true
//   if (typeof val !== 'string') return 'Highlighted Text (BN) must be text.'
//   if (typeof siblingData?.subtitleBN === 'string' && !siblingData.subtitleBN.includes(val)) {
//     return 'Highlighted Text (BN) must exist within the Subtitle (BN) exactly.'
//   }
//   return true
// }

// const validateCTAButtonText = (val: unknown) => {
//   if (val == null) return true
//   const t = String(val).trim()
//   if (!t) return true
//   if (t.length > 24) return 'CTA Button Text must be at most 24 characters.'
//   return true
// }

// /** Require link if either EN or BN CTA text is provided; allow internal path or absolute http(s) */
// const validateCTAButtonLink = (val: unknown, { siblingData }: any) => {
//   const textEN = (siblingData?.buttonText ?? '').toString().trim()
//   const textBN = (siblingData?.buttonTextBN ?? '').toString().trim()
//   const link = typeof val === 'string' ? val.trim() : ''

//   if ((textEN || textBN) && !link)
//     return 'CTA Button Link is required when CTA Button Text is provided.'
//   if (!link) return true
//   if (link.length > 100) return 'CTA Button Link must be at most 100 characters.'
//   if (/^\s*javascript:/i.test(link)) return 'CTA Button Link cannot use the "javascript:" protocol.'
//   if (link.startsWith('/')) return true

//   try {
//     const u = new URL(link)
//     if (u.protocol === 'http:' || u.protocol === 'https:') return true
//   } catch {}
//   return 'CTA Button Link must start with "/" or be a valid http(s) URL.'
// }

// /* ---------- images ---------- */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'backgroundImage',
//     label: 'Background Image',
//     description: 'Displayed above the CTA button for this section.',
//     aspectRatio: 16 / 9,
//     quality: 0.8,
//     maxKB: 200,
//   },
// ]

// /* ---------- collection ---------- */
// const LifeAtShanta: CollectionConfig = {
//   slug: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//   admin: {
//     useAsTitle: 'title',
//     defaultColumns: ['title', 'subtitle', 'updatedAt'],
//     group: HOME_PAGE_ADMIN_GROUP,
//     description: 'Homepage → “Life at Shanta” section with a gallery grid and CTA.',
//   },
//   access: createSingleDocAccess(HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG),

//   fields: [
//     // 🔐 hidden per-doc session id used for temp upload lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Title / Subtitle (EN + BN)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Title',
//           maxLength: 80,
//           admin: { width: '50%', description: 'Primary headline. Max 80 characters.' },
//           validate: validateShortText('Title', 80, true),
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: true,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: 80,
//           admin: { width: '50%', description: 'প্রধান শিরোনাম। সর্বোচ্চ ৮০ অক্ষর।' },
//           validate: validateShortText('Title (BN)', 80, true),
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'subtitle',
//           type: 'text',
//           required: true,
//           label: 'Subtitle',
//           maxLength: 120,
//           admin: { width: '50%', description: 'Supporting line. Max 120 characters.' },
//           validate: validateShortText('Subtitle', 120, true),
//         },
//         {
//           name: 'subtitleBN',
//           type: 'text',
//           required: true,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: 120,
//           admin: { width: '50%', description: 'সহায়ক লাইন। সর্বোচ্চ ১২০ অক্ষর।' },
//           validate: validateShortText('Subtitle (BN)', 120, true),
//         },
//       ],
//     },

//     // Highlight + Description (EN + BN)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedSubtitle',
//           type: 'text',
//           label: 'Highlighted Text (within subtitle)',
//           maxLength: 40,
//           admin: {
//             width: '50%',
//             description: 'Optional. Must appear verbatim inside the Subtitle. Max 40 characters.',
//           },
//           validate: validateHighlightedInSubtitle,
//         },
//         {
//           name: 'highlightedSubtitleBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
//           maxLength: 40,
//           admin: {
//             width: '50%',
//             description: 'ঐচ্ছিক। অবশ্যই সাবটাইটেলের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//           validate: validateHighlightedInSubtitleBN,
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'description',
//           type: 'textarea',
//           required: true,
//           label: 'Short Description',
//           maxLength: 200,
//           admin: {
//             width: '50%',
//             placeholder: '2–3 short sentences about life at Shanta. Max 200 characters.',
//           },
//           validate: validateShortText('Short Description', 200, true),
//         },
//         {
//           name: 'descriptionBN',
//           type: 'textarea',
//           required: true,
//           label: 'সংক্ষিপ্ত বর্ণনা (বাংলা)',
//           maxLength: 200,
//           admin: {
//             width: '50%',
//             placeholder: 'শান্তায় জীবনের বিষয়ে ২–৩টি ছোট বাক্য। সর্বোচ্চ ২০০ অক্ষর।',
//           },
//           validate: validateShortText('Short Description (BN)', 200, true),
//         },
//       ],
//     },
//     // CTA button (BN twin for text only; link remains single)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'buttonText',
//           type: 'text',
//           label: 'CTA Button Text',
//           maxLength: 24,
//           admin: { width: '50%', description: 'Optional. Max 24 characters.' },
//           validate: validateCTAButtonText,
//         },
//         {
//           name: 'buttonTextBN',
//           type: 'text',
//           label: 'বাটনের টেক্সট (বাংলা)',
//           maxLength: 24,
//           admin: { width: '50%', description: 'ঐচ্ছিক। সর্বোচ্চ ২৪ অক্ষর।' },
//           validate: validateCTAButtonText,
//         },
//       ],
//     },
//     {
//       name: 'buttonLink',
//       type: 'text',
//       label: 'CTA Button Link (URL or Path)',
//       maxLength: 100,
//       admin: {
//         description:
//           'Required if CTA Text is set. Must be an internal path (e.g., /careers) or a full http(s) URL. Max 100 characters.',
//       },
//       validate: validateCTAButtonLink,
//     },
//     // Background image (before CTA)
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({ ...c, ownerCollection: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG } as any),
//     ),

//     // Gallery (array of images)
//     {
//       name: 'gallery',
//       type: 'array',
//       label: 'Gallery Images',
//       required: true,
//       minRows: 10,
//       maxRows: 20,
//       labels: { singular: 'Image', plural: 'Images' },
//       admin: { description: 'Add 10–20 images that showcase life at Shanta.' },
//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Image (16:9)',
//           description: 'Square image recommended for grid. 16:9',
//           aspectRatio: 16 / 9,
//           quality: 0.9,
//           maxKB: 200,
//           ownerCollection: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG as any,
//         } as any),
//       ],
//     },
//   ],

//   // media lifecycle
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [
//       { fieldName: 'gallery', mediaFields: ['image'], mediaFieldLabels: { image: 'Image' } },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//     collectionSlug: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default LifeAtShanta

// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================

// src/blocks/lifeAtShanta/schema.ts
import type { Block } from 'payload'
import {
  HOME_PAGE_LIFE_AT_SHANTA_BLOCK_LABEL,
  HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const HILITE_MAX = 40
const DESC_MAX = 200
const CTA_TEXT_MAX = 24
const CTA_LINK_MAX = 100

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

const validateHighlightedInSubtitle = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'Highlighted Text must be text.'
  if (typeof siblingData?.subtitle === 'string' && !siblingData.subtitle.includes(val)) {
    return 'Highlighted Text must exist within the Subtitle exactly.'
  }
  return true
}

const validateHighlightedInSubtitleBN = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'হাইলাইটেড টেক্সট অবশ্যই টেক্সট হতে হবে।'
  if (typeof siblingData?.subtitleBN === 'string' && !siblingData.subtitleBN.includes(val)) {
    return 'হাইলাইটেড টেক্সটটি সাবটাইটেলের ভেতরে হুবহু থাকতে হবে।'
  }
  return true
}

const validateCTAButtonText = (val: unknown) => {
  if (val == null) return true
  const t = String(val).trim()
  if (!t) return true
  if (t.length > CTA_TEXT_MAX) return `CTA Button Text must be at most ${CTA_TEXT_MAX} characters.`
  return true
}

/** Require link if EN/BN CTA text is provided; allow internal path or absolute http(s). */
const validateCTAButtonLink = (val: unknown, { siblingData }: any) => {
  const textEN = (siblingData?.buttonText ?? '').toString().trim()
  const textBN = (siblingData?.buttonTextBN ?? '').toString().trim()
  const link = typeof val === 'string' ? val.trim() : ''

  if ((textEN || textBN) && !link)
    return 'CTA Button Link is required when CTA Button Text is provided.'
  if (!link) return true
  if (link.length > CTA_LINK_MAX)
    return `CTA Button Link must be at most ${CTA_LINK_MAX} characters.`
  if (/^\s*javascript:/i.test(link)) return 'CTA Button Link cannot use the "javascript:" protocol.'
  if (link.startsWith('/')) return true

  try {
    const u = new URL(link)
    if (u.protocol === 'http:' || u.protocol === 'https:') return true
  } catch {}
  return 'CTA Button Link must start with "/" or be a valid http(s) URL.'
}

/* ---------------- block ---------------- */
const LifeAtShantaSchema: Block = {
  slug: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
  labels: {
    singular: HOME_PAGE_LIFE_AT_SHANTA_BLOCK_LABEL,
    plural: HOME_PAGE_LIFE_AT_SHANTA_BLOCK_LABEL,
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
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    // Title / Subtitle (EN + BN)
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          admin: {
            width: '50%',
            description: `Primary headline. Max ${TITLE_MAX} characters.`,
          },
          validate: validateShortText('Title', TITLE_MAX, true),
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
          maxLength: SUBTITLE_MAX,
          admin: {
            width: '50%',
            description: `Supporting line. Max ${SUBTITLE_MAX} characters.`,
          },
          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
        },
      ],
    },

    // Highlight (within subtitle) EN + BN
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedSubtitle',
          type: 'text',
          label: 'Highlighted Text (within subtitle)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInSubtitle,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Subtitle. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedSubtitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInSubtitleBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই সাবটাইটেলের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // Description EN + BN
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Short Description',
          maxLength: DESC_MAX,
          admin: {
            width: '50%',
            placeholder: `2–3 short sentences about life at Shanta. Max ${DESC_MAX} characters.`,
          },
          validate: validateShortText('Short Description', DESC_MAX, true),
        },
        {
          name: 'descriptionBN',
          type: 'textarea',
          required: true,
          label: 'সংক্ষিপ্ত বর্ণনা (বাংলা)',
          maxLength: DESC_MAX,
          admin: {
            width: '50%',
            placeholder: `শান্তায় জীবনের বিষয়ে ২–৩টি ছোট বাক্য। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
          },
          validate: validateShortText('Short Description (BN)', DESC_MAX, true),
        },
      ],
    },

    // CTA text (localized) + link (single)
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'CTA Button Text',
          maxLength: CTA_TEXT_MAX,
          validate: validateCTAButtonText,
          admin: {
            width: '50%',
            description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'buttonTextBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_TEXT_MAX,
          validate: validateCTAButtonText,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'CTA Button Link (URL or Path)',
      maxLength: CTA_LINK_MAX,
      validate: validateCTAButtonLink,
      admin: {
        description: `Required if CTA text is set. Internal path (e.g., /careers) or http(s) URL. Max ${CTA_LINK_MAX} characters.`,
      },
    },

    // Background Image (default media flow)
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Displayed above the CTA button for this section. Recommended 16:9, ~200KB.',
      },
    },

    // Gallery (array of images, default media flow)
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery Images',
      required: true,
      minRows: 10,
      maxRows: 20,
      labels: { singular: 'Image', plural: 'Images' },
      admin: { description: 'Add 10–20 images that showcase life at Shanta.' },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Shown in the grid. Recommended 16:9; ~200KB.',
          },
        },
      ],
    },
  ],
}

export default LifeAtShantaSchema
