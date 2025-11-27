// // collection config
// import { HOME_PAGE_ADMIN_GROUP, HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG } from '@/lib/constants'
// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

// /* ------------ validators ------------ */

// const validateHighlightedInTitle = (val: unknown, { siblingData }: any) => {
//   if (!val) return true
//   if (typeof val !== 'string') return 'Highlighted Text must be text.'
//   if (typeof siblingData?.title === 'string' && !siblingData.title.includes(val)) {
//     return 'Highlighted Text must exist within the Title exactly.'
//   }
//   return true
// }

// // BN version: ensure highlightedTextBN exists within titleBN
// const validateHighlightedInTitleBN = (val: unknown, { siblingData }: any) => {
//   if (!val) return true
//   if (typeof val !== 'string') return 'রঙিন টেক্সট অবশ্যই টেক্সট হতে হবে।'
//   if (typeof siblingData?.titleBN === 'string' && !siblingData.titleBN.includes(val)) {
//     return 'রঙিন টেক্সট অবশ্যই শিরোনামের ভিতর হুবহু থাকতে হবে।'
//   }
//   return true
// }

// const validateLink = (val: unknown) => {
//   const link = typeof val === 'string' ? val.trim() : ''
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

// /* ------------ collection ------------ */

// const FeaturedPlans: CollectionConfig = {
//   slug: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'title',
//     defaultColumns: ['title', 'heading', 'updatedAt'],
//     group: HOME_PAGE_ADMIN_GROUP,
//     description: 'Featured insurance plans section for the homepage',
//   },

//   access: createSingleDocAccess(HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle (used by cropper + hooks)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     /* -------- Header (EN/BN pairs) -------- */

//     // Heading + HeadingBN
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'heading',
//           type: 'text',
//           required: true,
//           label: 'Heading',
//           maxLength: 40,
//           admin: {
//             width: '50%',
//             description: 'Short label above the main title. Max 40 characters.',
//           },
//         },
//         {
//           name: 'headingBN',
//           type: 'text',
//           required: true,
//           label: 'হেডিং (বাংলা)',
//           maxLength: 40,
//           admin: {
//             width: '50%',
//             description: 'মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Title + TitleBN
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Title',
//           maxLength: 80,
//           admin: {
//             width: '50%',
//             description: 'Primary headline for the section. Max 80 characters.',
//           },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: true,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: 80,
//           admin: {
//             width: '50%',
//             description: 'সেকশনের প্রধান শিরোনাম। সর্বোচ্চ ৮০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // HighlightedText + HighlightedTextBN
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within title)',
//           maxLength: 40,
//           validate: validateHighlightedInTitle,
//           admin: {
//             width: '50%',
//             description: 'Optional. Must appear verbatim inside the Title. Max 40 characters.',
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//           maxLength: 40,
//           validate: validateHighlightedInTitleBN,
//           admin: {
//             width: '50%',
//             description: 'ঐচ্ছিক। অবশ্যই শিরোনামের ভিতর হুবহু থাকতে হবে। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Description + DescriptionBN
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'description',
//           type: 'textarea',
//           required: true,
//           label: 'Short Description',
//           maxLength: 300,
//           admin: {
//             width: '50%',
//             description: '2–3 short sentences about plans. Max 300 characters.',
//           },
//         },
//         {
//           name: 'descriptionBN',
//           type: 'textarea',
//           required: true,
//           label: 'সংক্ষিপ্ত বর্ণনা (বাংলা)',
//           maxLength: 300,
//           admin: {
//             width: '50%',
//             description: 'প্ল্যান সম্পর্কে ২–৩টি সংক্ষিপ্ত বাক্য। সর্বোচ্চ ৩০০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     /* -------- Plans array -------- */

//     {
//       name: 'plans',
//       type: 'array',
//       label: 'Featured Plans',
//       required: true,
//       minRows: 3,
//       maxRows: 5,
//       fields: [
//         // Media (no BN)
//         ...generateArrayImageFields({
//           fieldName: 'icon',
//           label: 'Icon',
//           description: 'Plan icon. Maintain aspect ratio 1:1',
//           aspectRatio: 1,
//           quality: 0.9,
//           maxKB: 50,
//           ownerCollection: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG as any,
//         } as any),
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Image',
//           description: 'Plan image. Maintain aspect ratio 451:350 (aspectRatio: 451 / 350)',
//           aspectRatio: 451 / 350,
//           quality: 0.9,
//           maxKB: 100,
//           ownerCollection: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG as any,
//         } as any),

//         // Plan Title + TitleBN
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               label: 'Plan Title',
//               maxLength: 20,
//               admin: {
//                 width: '50%',
//                 description: 'Main plan title. Max 20 characters.',
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'প্ল্যান শিরোনাম (বাংলা)',
//               maxLength: 20,
//               admin: {
//                 width: '50%',
//                 description: 'প্রধান প্ল্যান টাইটেল। সর্বোচ্চ ২০ অক্ষর।',
//               },
//             },
//           ],
//         },

//         // Plan Subtitle + SubtitleBN
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'subtitle',
//               type: 'text',
//               required: true,
//               label: 'Plan Subtitle',
//               maxLength: 80,
//               admin: {
//                 width: '50%',
//                 description: 'Secondary plan title. Max 80 characters.',
//               },
//             },
//             {
//               name: 'subtitleBN',
//               type: 'text',
//               required: true,
//               label: 'প্ল্যান উপশিরোনাম (বাংলা)',
//               maxLength: 80,
//               admin: {
//                 width: '50%',
//                 description: 'দ্বিতীয় প্ল্যান টাইটেল। সর্বোচ্চ ৮০ অক্ষর।',
//               },
//             },
//           ],
//         },

//         // Link (EN only, NO BN) – keep its own row per your rule
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'link',
//               type: 'text',
//               label: 'Plan Link',
//               required: true,
//               defaultValue: '/plans/individual/child-education',
//               maxLength: 100,
//               validate: validateLink,
//               admin: {
//                 width: '50%',
//                 description:
//                   'Must be an internal path (e.g., /plans/individual/child-education) or a full http(s) URL. Max 100 characters.',
//               },
//             },
//           ],
//         },

//         // Plan Description + DescriptionBN
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'textarea',
//               required: true,
//               label: 'Plan Description',
//               maxLength: 300,
//               admin: {
//                 width: '50%',
//                 description: 'Brief description of the plan. Max 300 characters.',
//               },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'textarea',
//               required: true,
//               label: 'প্ল্যানের বিবরণ (বাংলা)',
//               maxLength: 300,
//               admin: {
//                 width: '50%',
//                 description: 'প্ল্যানের সংক্ষিপ্ত বর্ণনা। সর্বোচ্চ ৩০০ অক্ষর।',
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   /* -------- media lifecycle hooks -------- */

//   hooks: withMediaLifecycle({
//     imageConfigs: [], // no top-level images in this collection
//     arrayFields: [
//       {
//         fieldName: 'plans',
//         mediaFields: ['icon', 'image'],
//         itemLabelField: 'title',
//         mediaFieldLabels: { icon: 'Icon', image: 'Image' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//     collectionSlug: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req) // fire-and-forget cleanup for temporary:true
//     },
//   }),
// }

// export default FeaturedPlans

// =========================================================================
// =========================================================================
// =========================================================================
// =========================================================================

// block
import {
  HOME_PAGE,
  HOME_PAGE_FEATURED_PLANS_BLOCK_LABEL,
  HOME_PAGE_FEATURED_PLANS_BLOCK_THUMBNAIL_URL,
  HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

/* ------------ limits (keep these at top; reuse in admin descriptions) ------------ */
const COLOR_HEX_LEN = 7
const HEADING_MAX = 40
const TITLE_MAX = 80
const HIGHLIGHTED_TEXT_MAX = 40
const DESCRIPTION_MAX = 300

const PLAN_TITLE_MAX = 20
const PLAN_SUBTITLE_MAX = 80
const LINK_MAX = 100
const PLANS_MIN = 3
const PLANS_MAX = 5

const CTA_BUTTON_TEXT_MAX = 24
const CTA_BUTTON_LINK_MAX = 100

/* ------------ validators ------------ */

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const validateHighlightedInTitle = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'Highlighted Text must be text.'
  if (typeof siblingData?.title === 'string' && !siblingData.title.includes(val)) {
    return 'Highlighted Text must exist within the Title exactly.'
  }
  return true
}

const validateHighlightedInTitleBN = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'রঙিন টেক্সট অবশ্যই টেক্সট হতে হবে।'
  if (typeof siblingData?.titleBN === 'string' && !siblingData.titleBN.includes(val)) {
    return 'রঙিন টেক্সট অবশ্যই শিরোনামের ভিতর হুবহু থাকতে হবে।'
  }
  return true
}

const validatePlansCTAButtonLink = (val: unknown, { siblingData }: any) => {
  const text = (siblingData?.plansButtonText ?? '').toString().trim()
  const link = typeof val === 'string' ? val.trim() : ''
  if (text && !link) return 'CTA Button Link is required when CTA Button Text is provided.'
  if (!link) return true
  if (link.length > CTA_BUTTON_LINK_MAX) {
    return `CTA Button Link must be at most ${CTA_BUTTON_LINK_MAX} characters.`
  }
  if (/^\s*javascript:/i.test(link)) {
    return 'CTA Button Link cannot use the "javascript:" protocol.'
  }
  if (link.startsWith('/')) return true
  try {
    const u = new URL(link)
    if (u.protocol === 'http:' || u.protocol === 'https:') return true
  } catch {}
  return 'CTA Button Link must start with "/" or be a valid http(s) URL.'
}

const validateButtonText = (val: unknown) => {
  if (val == null) return true
  const t = String(val)
  if (t.length > 24) return 'CTA Button Text must be at most 24 characters.'
  return true
}

const validateButtonTextBN = (val: unknown) => {
  if (val == null) return true
  const t = String(val)
  if (t.length > 24) return 'CTA বাটনের টেক্সট সর্বোচ্চ ২৪ অক্ষর হতে পারবে।'
  return true
}

const validateCTAButtonLink = (val: unknown, { siblingData }: any) => {
  const text = (siblingData?.buttonText ?? '').toString().trim()
  const link = typeof val === 'string' ? val.trim() : ''
  if (text && !link) return 'CTA Button Link is required when CTA Button Text is provided.'
  if (!link) return true
  if (link.length > 100) return 'CTA Button Link must be at most 100 characters.'
  if (/^\s*javascript:/i.test(link)) return 'CTA Button Link cannot use the "javascript:" protocol.'
  if (link.startsWith('/')) return true
  try {
    const u = new URL(link)
    if (u.protocol === 'http:' || u.protocol === 'https:') return true
  } catch {}
  return 'CTA Button Link must start with "/" or be a valid http(s) URL.'
}

/* ---------- shared ---------- */
const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

/* ---------- PLAN-LEVEL CTA (inside plans[] items) ---------- */
const validatePlanCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.plansButtonText) || isNonEmpty(siblingData?.plansButtonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'Plans Button Text (EN) is required when any plan CTA text is provided.'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `Plans Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  }
  return true
}

const validatePlanCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.plansButtonText) || isNonEmpty(siblingData?.plansButtonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'প্ল্যানের CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন প্ল্যানের CTA টেক্সট দেওয়া হয়।'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `প্ল্যান CTA টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  }
  return true
}

const validatePlanCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText =
    isNonEmpty(siblingData?.plansButtonText) || isNonEmpty(siblingData?.plansButtonTextBN)

  let hasLink = false
  if (Array.isArray(val)) hasLink = val.length > 0
  else if (val && typeof val === 'object')
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  else hasLink = Boolean(val)

  if (hasAnyText && !hasLink) {
    return 'Plans Button Link is required when plan CTA text is provided.'
  }
  return true
}

/* ---------- SECTION/GLOBAL CTA (bottom fields) ---------- */
const validateRootCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA Button Text (EN) is required when any CTA button text is provided.'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  }
  return true
}

const validateRootCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  }
  return true
}

const validateRootCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

  let hasLink = false
  if (Array.isArray(val)) hasLink = val.length > 0
  else if (val && typeof val === 'object')
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  else hasLink = Boolean(val)

  if (hasAnyText && !hasLink) {
    return 'CTA Button Link is required when CTA Button Text is provided.'
  }
  return true
}

/* ------------ Block config (default Payload media) ------------ */

const FeaturedPlansSchema: Block = {
  slug: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG, // e.g., 'featured-plans' (ensure this constant is that literal)
  labels: {
    singular: HOME_PAGE_FEATURED_PLANS_BLOCK_LABEL,
    plural: HOME_PAGE_FEATURED_PLANS_BLOCK_LABEL,
  },
  admin: {
    group: HOME_PAGE,
  },

  imageURL: HOME_PAGE_FEATURED_PLANS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HOME_PAGE_FEATURED_PLANS_BLOCK_LABEL} preview`,

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
    /* -------- Header (EN/BN pairs) -------- */
    // Heading + HeadingBN
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          maxLength: HEADING_MAX,
          admin: {
            width: '50%',
            description: `Short label above the main title. Max ${HEADING_MAX} characters.`,
          },
        },
        {
          name: 'headingBN',
          type: 'text',
          required: true,
          label: 'হেডিং (বাংলা)',
          maxLength: HEADING_MAX,
          admin: {
            width: '50%',
            description: `মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ${bnNum(HEADING_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Title + TitleBN
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
            description: `Primary headline for the section. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          admin: {
            width: '50%',
            description: `সেকশনের প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // HighlightedText + HighlightedTextBN
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInTitle,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HIGHLIGHTED_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInTitleBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই শিরোনামের ভিতর হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHTED_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Description + DescriptionBN
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Short Description',
          maxLength: DESCRIPTION_MAX,
          admin: {
            width: '50%',
            description: `2–3 short sentences about plans. Max ${DESCRIPTION_MAX} characters.`,
          },
        },
        {
          name: 'descriptionBN',
          type: 'textarea',
          required: true,
          label: 'সংক্ষিপ্ত বর্ণনা (বাংলা)',
          maxLength: DESCRIPTION_MAX,
          admin: {
            width: '50%',
            description: `প্ল্যান সম্পর্কে ২–৩টি সংক্ষিপ্ত বাক্য। সর্বোচ্চ ${bnNum(DESCRIPTION_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* -------- Plans array -------- */

    {
      name: 'plans',
      type: 'array',
      label: 'Featured Plans',
      required: true,
      minRows: PLANS_MIN,
      maxRows: PLANS_MAX,
      admin: {
        description: `Add ${PLANS_MIN}–${PLANS_MAX} plans to feature on the homepage.`,
      },
      fields: [
        // Media (no BN) — default Payload media
        // {
        //   name: 'icon',
        //   label: 'Icon',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        //   admin: {
        //     description: 'Plan icon. Recommended aspect ratio 1:1; ~50KB.',
        //   },
        // },
        // {
        //   name: 'image',
        //   label: 'Image',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        //   admin: {
        //     description:
        //       'Plan image. Recommended aspect ratio ~451:350 (≈1.2886). Keep under ~100KB when possible.',
        //   },
        // },
        // ⬇️ Icon (1:1)
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon',
          description: 'Plan icon. Upload & crop a square (1:1).',
          aspectRatio: 1,
          quality: 0.95,
          maxKB: 100,
          ownerCollection: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG as any,
        } as any),

        // ⬇️ Image (~451:350 ≈ 1.2886)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image',
          description: 'Plan image. Upload & crop to ~451:350 (≈1.2886). Keep subject centered.',
          aspectRatio: 451 / 350,
          quality: 0.9,
          maxKB: 300,
          ownerCollection: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG as any,
        } as any),

        // Plan Title + TitleBN
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Plan Title',
              maxLength: PLAN_TITLE_MAX,
              admin: {
                width: '50%',
                description: `Main plan title. Max ${PLAN_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'প্ল্যান শিরোনাম (বাংলা)',
              maxLength: PLAN_TITLE_MAX,
              admin: {
                width: '50%',
                description: `প্রধান প্ল্যান টাইটেল। সর্বোচ্চ ${bnNum(PLAN_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Plan Subtitle + SubtitleBN
        {
          type: 'row',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              label: 'Plan Subtitle',
              maxLength: PLAN_SUBTITLE_MAX,
              admin: {
                width: '50%',
                description: `Secondary plan title. Max ${PLAN_SUBTITLE_MAX} characters.`,
              },
            },
            {
              name: 'subtitleBN',
              type: 'text',
              required: true,
              label: 'প্ল্যান উপশিরোনাম (বাংলা)',
              maxLength: PLAN_SUBTITLE_MAX,
              admin: {
                width: '50%',
                description: `দ্বিতীয় প্ল্যান টাইটেল। সর্বোচ্চ ${bnNum(PLAN_SUBTITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Plan Description + DescriptionBN
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Plan Description',
              maxLength: DESCRIPTION_MAX,
              admin: {
                width: '50%',
                description: `Brief description of the plan. Max ${DESCRIPTION_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'textarea',
              required: true,
              label: 'প্ল্যানের বিবরণ (বাংলা)',
              maxLength: DESCRIPTION_MAX,
              admin: {
                width: '50%',
                description: `প্ল্যানের সংক্ষিপ্ত বর্ণনা। সর্বোচ্চ ${bnNum(DESCRIPTION_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        // Per-plan CTA fields (named with "plans" prefix as requested)
        {
          type: 'row',
          fields: [
            {
              name: 'plansButtonText',
              type: 'text',
              label: 'Plans Button Text',
              maxLength: CTA_BUTTON_TEXT_MAX,
              // validate: validateButtonText,
              validate: validatePlanCTAEnglishText,
              admin: {
                width: '50%',
                description: `Text shown on the plan’s call-to-action button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
              },
            },
            {
              name: 'plansButtonTextBN',
              type: 'text',
              label: 'প্ল্যানস বাটনের টেক্সট (বাংলা)',
              maxLength: CTA_BUTTON_TEXT_MAX,
              // validate: validateButtonTextBN,
              validate: validatePlanCTABanglaText,
              admin: {
                width: '50%',
                description: `কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'plansButtonLink',
          label: 'Link to (internal page)',
          type: 'relationship',
          relationTo: 'pages',
          // required: true,
          validate: validatePlanCTALinkRequiredIfAnyText,
          admin: {
            description:
              'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
          },
        },
        // {
        //   name: 'plansButtonLink',
        //   type: 'text',
        //   label: 'Plans Button Link (URL or Path)',
        //   maxLength: CTA_BUTTON_LINK_MAX,
        //   // validate: validatePlansCTAButtonLink,
        //   validate: validateCTALinkRequiredIfAnyText,
        //   admin: {
        //     description: `Provide only if you want a clickable button for this plan. If Plans Button Text is set, this becomes required. Must be an internal path (e.g., /plans/xyz) or a full http(s) URL. Max ${CTA_BUTTON_LINK_MAX} characters.`,
        //   },
        // },
      ],
    },
    // CTA text (localized) + link (NOT localized)
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'CTA Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateRootCTAEnglishText,
          admin: {
            width: '50%',
            description: `Text shown on the call-to-action button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'buttonTextBN',
          type: 'text',
          label: 'CTA বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateRootCTABanglaText,
          admin: {
            width: '50%',
            description: `কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    // {
    //   name: 'buttonLink',
    //   type: 'text',
    //   label: 'CTA Button Link (URL or Path)',
    //   maxLength: CTA_BUTTON_LINK_MAX,
    //   validate: validateCTAButtonLink,
    //   admin: {
    //     description: `Provide only if you want a clickable CTA. If CTA Text is set, this becomes required. Must be an internal path (e.g., /about-us) or a full http(s) URL. Max ${CTA_BUTTON_LINK_MAX} characters.`,
    //   },
    // },
    {
      name: 'buttonLink',
      label: 'Link to (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      // required: true,
      validate: validateRootCTALinkRequiredIfAnyText,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
      },
    },
  ],
}

export default FeaturedPlansSchema
