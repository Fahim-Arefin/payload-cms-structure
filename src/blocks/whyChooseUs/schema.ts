// // collection config
// import { HOME_PAGE_ADMIN_GROUP, HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG } from '@/lib/constants'
// import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
// import { ImageConfig } from '@/utils/media/mediaUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

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
//   if (typeof val !== 'string') return 'হাইলাইটেড টেক্সট অবশ্যই টেক্সট হতে হবে।'
//   if (typeof siblingData?.subtitleBN === 'string' && !siblingData.subtitleBN.includes(val)) {
//     return 'হাইলাইটেড টেক্সটটি সাবটাইটেলের ভেতরে হুবহু থাকতে হবে।'
//   }
//   return true
// }

// const validateButtonText = (val: unknown) => {
//   if (val == null) return true
//   const t = String(val)
//   if (t.length > 24) return 'CTA Button Text must be at most 24 characters.'
//   return true
// }

// const validateButtonTextBN = (val: unknown) => {
//   if (val == null) return true
//   const t = String(val)
//   if (t.length > 24) return 'CTA বাটনের টেক্সট সর্বোচ্চ ২৪ অক্ষর হতে পারবে।'
//   return true
// }

// const validateCTAButtonLink = (val: unknown, { siblingData }: any) => {
//   const text = (siblingData?.buttonText ?? '').toString().trim()
//   const link = typeof val === 'string' ? val.trim() : ''
//   if (text && !link) return 'CTA Button Link is required when CTA Button Text is provided.'
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

// // images
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'mainImage',
//     label: 'Main Background Image',
//     description:
//       'Used as the background on mobile; on larger screens it appears on the left side of this section. Maintain aspect ratio 16:9 ',
//     aspectRatio: 16 / 9,
//     quality: 0.75,
//     maxKB: 200,
//   },
//   {
//     fieldName: 'sideImage',
//     label: 'Side Image (beside stats)',
//     description:
//       'Shown to the left of the statistics on desktop/larger screens. Maintain aspect ratio 4:5',
//     aspectRatio: 4 / 5,
//     quality: 0.75,
//     maxKB: 100,
//   },
// ]

// const WhyChooseUs: CollectionConfig = {
//   slug: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//   admin: {
//     useAsTitle: 'title',
//     defaultColumns: ['heading', 'title', 'description', 'updatedAt'],
//     group: HOME_PAGE_ADMIN_GROUP,
//     description:
//       'Homepage → “Why Choose Us”. This single document controls the headline, images, and four key statistics.',
//   },
//   access: createSingleDocAccess(HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG),

//   fields: [
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Heading / HeadingBN
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'heading',
//           type: 'text',
//           required: true,
//           label: 'Section Heading',
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
//           label: 'সেকশন হেডিং (বাংলা)',
//           maxLength: 40,
//           admin: {
//             width: '50%',
//             description: 'মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Title / TitleBN
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Main Title',
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
//           label: 'মূল শিরোনাম (বাংলা)',
//           maxLength: 80,
//           admin: {
//             width: '50%',
//             description: 'এই সেকশনের মূল শিরোনাম। সর্বোচ্চ ৮০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Subtitle / SubtitleBN + Highlighted / HighlightedBN
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'subtitle',
//           type: 'text',
//           required: true,
//           label: 'Subtitle',
//           maxLength: 120,
//           admin: {
//             width: '50%',
//             description: 'Supporting line under the main title. Max 120 characters.',
//           },
//         },
//         {
//           name: 'subtitleBN',
//           type: 'text',
//           required: true,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: 120,
//           admin: {
//             width: '50%',
//             description: 'মূল শিরোনামের নিচে সহায়ক লাইন। সর্বোচ্চ ১২০ অক্ষর।',
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
//           label: 'Highlighted Text (within subtitle)',
//           maxLength: 40,
//           validate: validateHighlightedInSubtitle,
//           admin: {
//             width: '50%',
//             description: 'Optional. Must appear verbatim inside the Subtitle. Max 40 characters.',
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
//           maxLength: 40,
//           validate: validateHighlightedInSubtitleBN,
//           admin: {
//             width: '50%',
//             description: 'ঐচ্ছিক। সাবটাইটেলের ভেতরে হুবহু থাকতে হবে। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Description / DescriptionBN
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
//             description: '2–3 short sentences about why customers choose us. Max 300 characters.',
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
//             description:
//               'গ্রাহকরা কেন আমাদের বেছে নেন—এই বিষয়ে ২–৩টি সংক্ষিপ্ত বাক্য লিখুন। সর্বোচ্চ ৩০০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Images (no BN)
//     ...IMAGE_CONFIGS.flatMap((config) =>
//       generateImageFields({
//         ...config,
//         ownerCollection: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//       } as any),
//     ),

//     // Stats
//     {
//       name: 'stats',
//       type: 'array',
//       label: 'Key Statistics (exactly 4)',
//       required: true,
//       minRows: 4,
//       maxRows: 4,
//       labels: { singular: 'Stat Item', plural: 'Stat Items' },
//       admin: {
//         description:
//           'Provide exactly four highlights (e.g., Settlement Rate, Branches, Years of Service, Happy Customers).',
//       },
//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'icon',
//           label: 'Stat Icon/Image',
//           description: 'Upload a small square icon (1:1).',
//           aspectRatio: 1,
//           quality: 0.9,
//           maxKB: 20,
//           ownerCollection: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG as any,
//         } as any),

//         // Label / LabelBN
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'label',
//               type: 'text',
//               required: true,
//               label: 'Stat Label',
//               maxLength: 32,
//               admin: {
//                 width: '50%',
//                 description:
//                   'Short descriptive label. Allowed: letters, numbers, spaces, "&", "-", "/". Max 32 characters.',
//               },
//             },
//             {
//               name: 'labelBN',
//               type: 'text',
//               required: true,
//               label: 'পরিসংখ্যান লেবেল (বাংলা)',
//               maxLength: 32,
//               admin: {
//                 width: '50%',
//                 description:
//                   'সংক্ষিপ্ত বর্ণনামূলক লেবেল। ব্যবহারযোগ্য: অক্ষর, সংখ্যা, স্পেস, “&”, “-”, “/”। সর্বোচ্চ ৩২ অক্ষর।',
//               },
//             },
//           ],
//         },

//         // Value / ValueBN
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'value',
//               type: 'text',
//               required: true,
//               label: 'Stat Value',
//               maxLength: 16,
//               admin: {
//                 width: '50%',
//                 description: 'e.g., 100%, 112+, 25 yrs, 1.2M+, 3,000+, 98.5%. Max 16 characters.',
//               },
//             },
//             {
//               name: 'valueBN',
//               type: 'text',
//               required: true,
//               label: 'পরিসংখ্যান মান (বাংলা)',
//               maxLength: 16,
//               admin: {
//                 width: '50%',
//                 description: 'যেমন: 100%, 112+, 25 yrs, 1.2M+, 3,000+, 98.5%। সর্বোচ্চ ১৬ অক্ষর।',
//               },
//             },
//           ],
//         },
//       ],
//     },

//     // CTA text (localized) + link (NOT localized)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'buttonText',
//           type: 'text',
//           label: 'CTA Button Text',
//           maxLength: 24,
//           validate: validateButtonText,
//           admin: {
//             width: '50%',
//             description: 'Text shown on the call-to-action button. Max 24 characters.',
//           },
//         },
//         {
//           name: 'buttonTextBN',
//           type: 'text',
//           label: 'CTA বাটনের টেক্সট (বাংলা)',
//           maxLength: 24,
//           validate: validateButtonTextBN,
//           admin: {
//             width: '50%',
//             description: 'কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ২৪ অক্ষর।',
//           },
//         },
//       ],
//     },
//     {
//       name: 'buttonLink',
//       type: 'text',
//       label: 'CTA Button Link (URL or Path)',
//       maxLength: 100,
//       validate: validateCTAButtonLink,
//       admin: {
//         description:
//           'Provide only if you want a clickable CTA. If CTA Text is set, this becomes required. Must be an internal path (e.g., /about-us) or a full http(s) URL. Max 100 characters.',
//       },
//     },
//   ],

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
//     singleDocSlug: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//     collectionSlug: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default WhyChooseUs

// ==========================================================================
// ==========================================================================
// ==========================================================================
// ==========================================================================

// block
import {
  HOME_PAGE,
  HOME_PAGE_WHY_CHOOSE_US_BLOCK_LABEL,
  HOME_PAGE_WHY_CHOOSE_US_BLOCK_THUMBNAIL_URL,
  HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

// --- validators (unchanged logic, just inlined here) ---

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
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

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateCTAEnglishText = (val: unknown, { siblingData }: any) => {
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

const validateCTABanglaText = (val: unknown, { siblingData }: any) => {
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

// Works for relationship or text/url fields
const validateCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

  // presence check for relationship or text
  let hasLink = false
  if (Array.isArray(val)) {
    hasLink = val.length > 0
  } else if (val && typeof val === 'object') {
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  } else {
    hasLink = Boolean(val)
  }

  if (hasAnyText && !hasLink) {
    return 'CTA Button Link is required when CTA Button Text is provided.'
  }
  return true
}

const COLOR_HEX_LEN = 7
const HEADING_MAX = 40
const TITLE_MAX = 80
const SUB_TITLE_MAX = 120
const HIGHLIGHTED_TEXT_MAX = 40
const DESCRIPTION_MAX = 300
const STAT_LABEL_MAX = 32
const STAT_VALUE_MAX = 20
const CTA_BUTTON_TEXT_MAX = 24
const CTA_BUTTON_LINK_MAX = 100

// --- Block schema using default Payload media (relationTo: 'media') ---
const WhyChooseUsSchema: Block = {
  slug: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
  labels: {
    singular: HOME_PAGE_WHY_CHOOSE_US_BLOCK_LABEL,
    plural: HOME_PAGE_WHY_CHOOSE_US_BLOCK_LABEL,
  },
  admin: {
    group: HOME_PAGE,
  },

  imageURL: HOME_PAGE_WHY_CHOOSE_US_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HOME_PAGE_WHY_CHOOSE_US_BLOCK_LABEL} preview`,

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

    // Heading / HeadingBN
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Section Heading',
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
          label: 'সেকশন হেডিং (বাংলা)',
          maxLength: HEADING_MAX,
          admin: {
            width: '50%',
            description: `মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ${bnNum(HEADING_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Title / TitleBN
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Main Title',
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
          label: 'মূল শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          admin: {
            width: '50%',
            description: `এই সেকশনের মূল শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Subtitle / SubtitleBN
    {
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
          maxLength: SUB_TITLE_MAX,
          admin: {
            width: '50%',
            description: `Supporting line under the main title. Max ${SUB_TITLE_MAX} characters.`,
          },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUB_TITLE_MAX,
          admin: {
            width: '50%',
            description: `মূল শিরোনামের নিচে সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUB_TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Highlighted / HighlightedBN
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within subtitle)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInSubtitle,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Subtitle. Max ${HIGHLIGHTED_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInSubtitleBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সাবটাইটেলের ভেতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHTED_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Description / DescriptionBN
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
            description: `2–3 short sentences about why customers choose us. Max ${DESCRIPTION_MAX} characters.`,
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
            description: `গ্রাহকরা কেন আমাদের বেছে নেন—এই বিষয়ে ২–৩টি সংক্ষিপ্ত বাক্য লিখুন। সর্বোচ্চ ${bnNum(DESCRIPTION_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Images (default Payload Media)
    // {
    //   name: 'mainImage',
    //   label: 'Main Background Image',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description:
    //       'Used as the background on mobile; on larger screens it appears on the left side. Recommended aspect ratio 16:9; ~200KB.',
    //   },
    // },
    // {
    //   name: 'sideImage',
    //   label: 'Side Image (beside stats)',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description:
    //       'Shown left of the statistics on desktop. Recommended aspect ratio 4:5; ~100KB.',
    //   },
    // },

    // Images — use cropper generators
    ...generateImageFields({
      fieldName: 'mainImage',
      label: 'Main Background Image',
      description:
        'Used as the background on mobile; on larger screens it appears on the left side. Recommended aspect ratio 16:9; ~400KB.',
      aspectRatio: 16 / 9,
      quality: 0.92,
      maxKB: 400,
      ownerCollection: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG as any,
    } as any),

    ...generateImageFields({
      fieldName: 'sideImage',
      label: 'Side Image (beside stats)',
      description: 'Shown left of the statistics on desktop. Recommended aspect ratio 4:5; ~200KB.',
      aspectRatio: 4 / 5,
      quality: 0.92,
      maxKB: 200,
      ownerCollection: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG as any,
    } as any),

    // Stats
    {
      name: 'stats',
      type: 'array',
      label: 'Key Statistics (exactly 4)',
      required: true,
      minRows: 4,
      maxRows: 4,
      labels: { singular: 'Stat Item', plural: 'Stat Items' },
      admin: {
        description:
          'Provide exactly four highlights (e.g., Settlement Rate, Branches, Years of Service, Happy Customers).',
      },
      fields: [
        // {
        //   name: 'icon',
        //   label: 'Stat Icon/Image',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        //   admin: {
        //     description: 'Upload a small square icon (1:1).',
        //   },
        // },
        // Use cropper generator for icon (1:1)
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Stat Icon/Image',
          description: 'Upload a small square icon (1:1).',
          aspectRatio: 1,
          quality: 0.92,
          maxKB: 120,
          ownerCollection: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG as any,
        } as any),
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Stat Label',
              maxLength: STAT_LABEL_MAX,
              admin: {
                width: '50%',
                description: `Short descriptive label. Allowed: letters, numbers, spaces, "&", "-", "/". Max ${STAT_LABEL_MAX} characters.`,
              },
            },
            {
              name: 'labelBN',
              type: 'text',
              required: true,
              label: 'পরিসংখ্যান লেবেল (বাংলা)',
              maxLength: STAT_LABEL_MAX,
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত বর্ণনামূলক লেবেল। ব্যবহারযোগ্য: অক্ষর, সংখ্যা, স্পেস, “&”, “-”, “/”। সর্বোচ্চ ${bnNum(STAT_LABEL_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Stat Value',
              maxLength: STAT_VALUE_MAX,
              admin: {
                width: '50%',
                description: `e.g., 100%, 112+, 25 yrs, 1.2M+, 3,000+, 98.5%. Max ${STAT_VALUE_MAX} characters.`,
              },
            },
            {
              name: 'valueBN',
              type: 'text',
              required: true,
              label: 'পরিসংখ্যান মান (বাংলা)',
              maxLength: STAT_VALUE_MAX,
              admin: {
                width: '50%',
                description: `যেমন: 100%, 112+, 25 yrs, 1.2M+, 3,000+, 98.5%। সর্বোচ্চ ${bnNum(STAT_VALUE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
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
          validate: validateCTAEnglishText,
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
          validate: validateCTABanglaText,
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
      validate: validateCTALinkRequiredIfAnyText,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
      },
    },
  ],
}

export default WhyChooseUsSchema
