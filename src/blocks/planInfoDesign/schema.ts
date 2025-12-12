// // working without more info
// import type { Block } from 'payload'
// import { bnNum } from '@/lib/utils'
// import {
//   COMMON,
//   PLAN_INFO_DESIGN_BLOCK_LABEL,
//   PLAN_INFO_DESIGN_BLOCK_THUMBNAIL_URL,
//   PLAN_INFO_DESIGN_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'

// /* ---------- limits ---------- */
// const COLOR_HEX_LEN = 7
// const TITLE_MAX = 80
// const SUBTITLE_MAX = 120
// const DESC_MAX = 400
// const FEATURE_NAME_MAX = 60
// const CTA_BUTTON_TEXT_MAX = 24

// /* ---------- validators (same style as your other blocks) ---------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

// // CTA text (paired EN/BN) — if either is set, both required and length-limited
// const validateCTAEnglishText = (val: unknown, { siblingData }: any) => {
//   const anySet = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
//   const hasThis = isNonEmpty(val)
//   if (anySet && !hasThis) return 'CTA Button Text (EN) is required when any CTA text is provided.'
//   if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX)
//     return `CTA Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
//   return true
// }
// const validateCTABanglaText = (val: unknown, { siblingData }: any) => {
//   const anySet = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
//   const hasThis = isNonEmpty(val)
//   if (anySet && !hasThis)
//     return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
//   if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX)
//     return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
//   return true
// }
// // CTA link must be set if any CTA text is set (works with relationship)
// const validateCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
//   const anySet = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
//   let hasLink = false
//   if (Array.isArray(val)) hasLink = val.length > 0
//   else if (val && typeof val === 'object') hasLink = Object.keys(val).length > 0
//   else hasLink = Boolean(val)
//   if (anySet && !hasLink) return 'CTA Button Link is required when CTA Button Text is provided.'
//   return true
// }

// const validateHexColor = (val: unknown) => {
//   if (val == null || val === '') return true // optional field
//   const s = String(val).trim()
//   if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
//     return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
//   }
//   return true
// }
// /** Highlight must appear verbatim inside a target text field */
// const validateHighlightedInField =
//   (label: string, targetField: string, max = TITLE_MAX, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
//     return true
//   }

// /* ---------- block ---------- */
// const PlanInfoDesignSchema: Block = {
//   slug: PLAN_INFO_DESIGN_SLUG_AND_TAG,
//   labels: {
//     singular: PLAN_INFO_DESIGN_BLOCK_LABEL,
//     plural: PLAN_INFO_DESIGN_BLOCK_LABEL,
//   },

//   admin: { group: COMMON },
//   imageURL: PLAN_INFO_DESIGN_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${PLAN_INFO_DESIGN_BLOCK_LABEL} preview`,

//   fields: [
//     // Appearance
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'backgroundColor',
//           type: 'text',
//           label: 'Section Background Color',
//           maxLength: COLOR_HEX_LEN,
//           validate: validateHexColor,
//           defaultValue: '#FCF4EB',
//           admin: {
//             width: '50%',
//             description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
//           },
//         },
//         {
//           name: 'imageOrder',
//           type: 'select',
//           label: 'Choose Image Alignment',
//           defaultValue: 'left',
//           options: [
//             { label: 'Show left ', value: 'left' },
//             { label: 'Show right', value: 'right' },
//           ],
//           admin: {
//             width: '50%',
//             description: 'Select where the image align ',
//           },
//         },
//       ],
//     },

//     /* ---------- Title / Subtitle ---------- */
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
//           admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
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
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'subtitle',
//           type: 'text',
//           required: true,
//           label: 'Subtitle',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
//           admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
//         },
//         {
//           name: 'subtitleBN',
//           type: 'text',
//           required: true,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Description (plain text) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'description',
//           type: 'text',
//           required: true,
//           label: 'Description',
//           maxLength: DESC_MAX,
//           validate: validateShortText('Description', DESC_MAX, true),
//           admin: { width: '50%', description: `Short text. Max ${DESC_MAX} characters.` },
//         },
//         {
//           name: 'descriptionBN',
//           type: 'text',
//           required: true,
//           label: 'বর্ণনা (বাংলা)',
//           maxLength: DESC_MAX,
//           validate: validateShortText('Description (BN)', DESC_MAX, true),
//           admin: {
//             width: '50%',
//             description: `সংক্ষিপ্ত টেক্সট। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Background Image ---------- */
//     ...generateImageFields({
//       fieldName: 'bgImageDesktop',
//       label: 'Background Image Desktop(516:705)',
//       description: 'Main background image. 516:705 recommended.',
//       aspectRatio: 516 / 705,
//       quality: 0.9,
//       maxKB: 500,
//       // ownerCollection stamped by lifecycle
//     } as any),

//     ...generateImageFields({
//       fieldName: 'bgImageMobile',
//       label: 'Background Image Mobile (300:200)',
//       description: 'Main background image. 300:200 recommended.',
//       aspectRatio: 300 / 200,
//       quality: 0.9,
//       maxKB: 500,
//       // ownerCollection stamped by lifecycle
//     } as any),
//     /* ---------- Key Features ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'featuresTitle',
//           type: 'text',
//           required: true,
//           label: 'Key Features Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Key Features Title', TITLE_MAX, true),
//           admin: { width: '50%', description: `Heading above features. Max ${TITLE_MAX} chars.` },
//         },
//         {
//           name: 'featuresTitleBN',
//           type: 'text',
//           required: true,
//           label: 'কী ফিচার শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Key Features Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `ফিচার শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'featuresTitleHighlighted',
//           type: 'text',
//           label: 'Highlighted Text (within Key Features Title)',
//           maxLength: TITLE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (Key Features Title)',
//             'featuresTitle',
//             TITLE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear verbatim inside Key Features Title. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'featuresTitleHighlightedBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (কী ফিচার শিরোনামের মধ্যে)',
//           maxLength: TITLE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (Key Features Title BN)',
//             'featuresTitleBN',
//             TITLE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। কী ফিচার শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     {
//       name: 'features',
//       type: 'array',
//       label: 'Key Features',
//       required: true,
//       minRows: 1,
//       maxRows: 10,
//       admin: { description: 'Each feature needs an icon and a short name (EN/BN).' },
//       labels: { singular: 'Feature', plural: 'Features' },
//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'icon',
//           label: 'Icon (1:1)',
//           description: 'Square icon. 1:1 recommended.',
//           aspectRatio: 1,
//           quality: 0.9,
//           maxKB: 200,
//         } as any),
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'name',
//               type: 'text',
//               required: true,
//               label: 'Feature Name',
//               maxLength: FEATURE_NAME_MAX,
//               validate: validateShortText('Feature Name', FEATURE_NAME_MAX, true),
//               admin: { width: '50%', description: `Max ${FEATURE_NAME_MAX} characters.` },
//             },
//             {
//               name: 'nameBN',
//               type: 'text',
//               required: true,
//               label: 'ফিচারের নাম (বাংলা)',
//               maxLength: FEATURE_NAME_MAX,
//               validate: validateShortText('Feature Name (BN)', FEATURE_NAME_MAX, true),
//               admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(FEATURE_NAME_MAX)} অক্ষর।` },
//             },
//           ],
//         },
//       ],
//     },

//     /* ---------- CTA (outside array) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'buttonText',
//           type: 'text',
//           label: 'CTA Button Text',
//           maxLength: CTA_BUTTON_TEXT_MAX,
//           validate: validateCTAEnglishText,
//           admin: {
//             width: '50%',
//             description: `Text shown on the button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
//           },
//         },
//         {
//           name: 'buttonTextBN',
//           type: 'text',
//           label: 'CTA বাটনের টেক্সট (বাংলা)',
//           maxLength: CTA_BUTTON_TEXT_MAX,
//           validate: validateCTABanglaText,
//           admin: {
//             width: '50%',
//             description: `বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       name: 'buttonLink',
//       label: 'Link to (internal page)',
//       type: 'relationship',
//       relationTo: 'pages',
//       validate: validateCTALinkRequiredIfAnyText,
//       admin: {
//         description:
//           'Pick an internal Page to navigate to when the CTA button is clicked (required if CTA text is set).',
//       },
//     },
//   ],
// }

// export default PlanInfoDesignSchema

// ===========================================================================
// ===========================================================================
// ===========================================================================

import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  COMMON,
  PLAN_INFO_DESIGN_BLOCK_LABEL,
  PLAN_INFO_DESIGN_BLOCK_THUMBNAIL_URL,
  PLAN_INFO_DESIGN_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const DESC_MAX = 400
const FEATURE_NAME_MAX = 60
const CTA_BUTTON_TEXT_MAX = 24
const VALUE_MAX = 40

/* ---------- validators (same style as your other blocks) ---------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

// CTA text (paired EN/BN) — if either is set, both required and length-limited
const validateCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const anySet = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (anySet && !hasThis) return 'CTA Button Text (EN) is required when any CTA text is provided.'
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX)
    return `CTA Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  return true
}
const validateCTABanglaText = (val: unknown, { siblingData }: any) => {
  const anySet = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (anySet && !hasThis)
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX)
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  return true
}
// CTA link must be set if any CTA text is set (works with relationship)
const validateCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const anySet = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  let hasLink = false
  if (Array.isArray(val)) hasLink = val.length > 0
  else if (val && typeof val === 'object') hasLink = Object.keys(val).length > 0
  else hasLink = Boolean(val)
  if (anySet && !hasLink) return 'CTA Button Link is required when CTA Button Text is provided.'
  return true
}

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}
/** Highlight must appear verbatim inside a target text field */
const validateHighlightedInField =
  (label: string, targetField: string, max = TITLE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

const isEligibilityVariant = (data?: any, siblingData?: any) => {
  const src = (siblingData ?? data ?? {}) as any
  const variant = src?.ctaVariant ?? 'link'
  return variant === 'eligibility'
}

/* ---------- block ---------- */
const PlanInfoDesignSchema: Block = {
  slug: PLAN_INFO_DESIGN_SLUG_AND_TAG,
  labels: {
    singular: PLAN_INFO_DESIGN_BLOCK_LABEL,
    plural: PLAN_INFO_DESIGN_BLOCK_LABEL,
  },

  admin: { group: COMMON },
  imageURL: PLAN_INFO_DESIGN_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PLAN_INFO_DESIGN_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#FCF4EB',
          admin: {
            width: '50%',
            description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(
              COLOR_HEX_LEN,
            )}).`,
          },
        },
        {
          name: 'imageOrder',
          type: 'select',
          label: 'Choose Image Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Show left ', value: 'left' },
            { label: 'Show right', value: 'right' },
          ],
          admin: {
            width: '50%',
            description: 'Select where the image align ',
          },
        },
      ],
    },

    /* ---------- Title / Subtitle ---------- */
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
          admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
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
    {
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
          admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Description (plain text) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Description',
          maxLength: DESC_MAX,
          validate: validateShortText('Description', DESC_MAX, true),
          admin: { width: '50%', description: `Short text. Max ${DESC_MAX} characters.` },
        },
        {
          name: 'descriptionBN',
          type: 'text',
          required: true,
          label: 'বর্ণনা (বাংলা)',
          maxLength: DESC_MAX,
          validate: validateShortText('Description (BN)', DESC_MAX, true),
          admin: {
            width: '50%',
            description: `সংক্ষিপ্ত টেক্সট। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Background Images ---------- */
    ...generateImageFields({
      fieldName: 'bgImageDesktop',
      label: 'Background Image Desktop(516:705)',
      description: 'Main background image. 516:705 recommended.',
      aspectRatio: 516 / 705,
      quality: 0.9,
      maxKB: 500,
    } as any),

    ...generateImageFields({
      fieldName: 'bgImageMobile',
      label: 'Background Image Mobile (300:200)',
      description: 'Main background image. 300:200 recommended.',
      aspectRatio: 300 / 200,
      quality: 0.9,
      maxKB: 500,
    } as any),

    /* ---------- Key Features ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'featuresTitle',
          type: 'text',
          required: true,
          label: 'Key Features Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Key Features Title', TITLE_MAX, true),
          admin: { width: '50%', description: `Heading above features. Max ${TITLE_MAX} chars.` },
        },
        {
          name: 'featuresTitleBN',
          type: 'text',
          required: true,
          label: 'কী ফিচার শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Key Features Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `ফিচার শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'featuresTitleHighlighted',
          type: 'text',
          label: 'Highlighted Text (within Key Features Title)',
          maxLength: TITLE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (Key Features Title)',
            'featuresTitle',
            TITLE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Key Features Title. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'featuresTitleHighlightedBN',
          type: 'text',
          label: 'রঙিন টেক্সট (কী ফিচার শিরোনামের মধ্যে)',
          maxLength: TITLE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (Key Features Title BN)',
            'featuresTitleBN',
            TITLE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। কী ফিচার শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              TITLE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    {
      name: 'features',
      type: 'array',
      label: 'Key Features',
      required: true,
      minRows: 1,
      maxRows: 10,
      admin: { description: 'Each feature needs an icon and a short name (EN/BN).' },
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon (1:1)',
          description: 'Square icon. 1:1 recommended.',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 200,
          ownerCollection: PLAN_INFO_DESIGN_SLUG_AND_TAG as any,
        } as any),
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Feature Name',
              maxLength: FEATURE_NAME_MAX,
              validate: validateShortText('Feature Name', FEATURE_NAME_MAX, true),
              admin: { width: '50%', description: `Max ${FEATURE_NAME_MAX} characters.` },
            },
            {
              name: 'nameBN',
              type: 'text',
              required: true,
              label: 'ফিচারের নাম (বাংলা)',
              maxLength: FEATURE_NAME_MAX,
              validate: validateShortText('Feature Name (BN)', FEATURE_NAME_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(FEATURE_NAME_MAX)} অক্ষর।` },
            },
          ],
        },
      ],
    },

    /* ---------- CTA vs Eligibility Mode ---------- */
    {
      name: 'ctaVariant',
      type: 'select',
      label: 'Action Type',
      defaultValue: 'link',
      options: [
        { label: 'CTA Link', value: 'link' },
        { label: 'Eligibility Card', value: 'eligibility' },
      ],
      admin: {
        width: '50%',
        description: 'Choose between a simple CTA button or a detailed eligibility card section.',
      },
    },

    /* ---------- CTA MODE (default) ---------- */
    {
      type: 'row',
      admin: {
        condition: (data: any, siblingData: any) => !isEligibilityVariant(data, siblingData),
      },
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'CTA Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateCTAEnglishText,
          admin: {
            width: '50%',
            description: `Text shown on the button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
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
            description: `বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      name: 'buttonLink',
      label: 'Link to (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      validate: validateCTALinkRequiredIfAnyText,
      admin: {
        description:
          'Pick an internal Page to navigate to when the CTA button is clicked (required if CTA text is set).',
        condition: (data: any, siblingData: any) => !isEligibilityVariant(data, siblingData),
      },
    },

    /* ---------- ELIGIBILITY MODE ---------- */
    // more
    {
      type: 'row',
      admin: {
        condition: (data: any, siblingData: any) => isEligibilityVariant(data, siblingData),
      },
      fields: [
        {
          name: 'detailsText',
          type: 'text',
          label: 'Details Button Text',
          required: false,
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateShortText('Details Text', CTA_BUTTON_TEXT_MAX, false),
          admin: {
            width: '50%',
            description: `Text shown on the details button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'detailsTextBN',
          type: 'text',
          label: 'ডিটেইলস বাটনের টেক্সট (বাংলা)',
          required: false,
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateShortText('Details Text (BN)', CTA_BUTTON_TEXT_MAX, false),
          admin: {
            width: '50%',
            description: `বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    // see less
    {
      type: 'row',
      admin: {
        condition: (data: any, siblingData: any) => isEligibilityVariant(data, siblingData),
      },
      fields: [
        {
          name: 'seeLessText',
          type: 'text',
          label: 'See Less Button Text',
          required: false,
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateShortText('See Less Button Text', CTA_BUTTON_TEXT_MAX, false),
          admin: {
            width: '50%',
            description: `Text shown on the see less button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'seeLessTextBN',
          type: 'text',
          label: 'কম দেখুন বোতামের লেখা (বাংলা)',
          required: false,
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateShortText('See Less Button Text (BN)', CTA_BUTTON_TEXT_MAX, false),
          admin: {
            width: '50%',
            description: `কম দেখুন বোতামের টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    // title above eligibility cards
    {
      type: 'row',
      admin: {
        condition: (data: any, siblingData: any) => isEligibilityVariant(data, siblingData),
      },
      fields: [
        {
          name: 'eligibilityTitle',
          type: 'text',
          label: 'Eligibility Cards Title',
          required: false,
          maxLength: TITLE_MAX,
          validate: validateShortText('Eligibility Cards Title', TITLE_MAX, false),
          admin: {
            width: '50%',
            description: `eligibility cards Title. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'eligibilityTitleBN',
          type: 'text',
          label: 'যোগ্যতার কার্ডগুলির শিরোনাম।',
          required: false,
          maxLength: TITLE_MAX,
          validate: validateShortText('Eligibility Cards Title (BN)', TITLE_MAX, false),
          admin: {
            width: '50%',
            description: `যোগ্যতার কার্ডগুলির শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    // highlighted text within eligibility title
    {
      type: 'row',
      admin: {
        condition: (data: any, siblingData: any) => isEligibilityVariant(data, siblingData),
      },
      fields: [
        {
          name: 'eligibilityTitleHighlighted',
          type: 'text',
          label: 'Highlighted Text (within Eligibility Cards Title)',
          maxLength: TITLE_MAX,
          validate: validateHighlightedInField(
            'Eligibility Cards Highlighted Text',
            'eligibilityTitle',
            TITLE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Eligibility Cards Title. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'eligibilityTitleHighlightedBN',
          type: 'text',
          label: 'রঙিন টেক্সট (যোগ্যতার কার্ড শিরোনামের মধ্যে)',
          maxLength: TITLE_MAX,
          validate: validateHighlightedInField(
            'Eligibility Cards Highlighted Text (BN)',
            'eligibilityTitleBN',
            TITLE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। যোগ্যতার কার্ডগুলির শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              TITLE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // array of eligibility items
    {
      name: 'eligibilityData',
      type: 'array',
      label: 'Eligibility Data',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Item', plural: 'Items' },
      admin: {
        description: 'Each item may carry its own icon and age/condition fields.',
        condition: (data: any, siblingData: any) => isEligibilityVariant(data, siblingData),
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'backGroundColor',
              type: 'text',
              label: 'Background Color',
              maxLength: COLOR_HEX_LEN,
              validate: validateHexColor,
              defaultValue: '#FCF4EB',
              admin: {
                width: '50%',
                description: `Hex color in #FCF4EB. Length ${bnNum(COLOR_HEX_LEN)}.`,
              },
            },
            {
              name: 'borderColor',
              type: 'text',
              label: 'Border Color',
              maxLength: COLOR_HEX_LEN,
              validate: validateHexColor,
              defaultValue: '#FFFFFF',
              admin: {
                width: '50%',
                description: `Hex color in #FFFFFF. Length ${bnNum(COLOR_HEX_LEN)}.`,
              },
            },
          ],
        },

        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon (1:1)',
          description:
            'Square icon (PNG/SVG). Blur placeholder generated automatically. Aspect 1:1.',
          aspectRatio: 1,
          quality: 0.95,
          maxKB: 300,
          ownerCollection: PLAN_INFO_DESIGN_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'iconTitle',
              type: 'text',
              label: 'Icon Title (EN)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Title', TITLE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'iconTitleBN',
              type: 'text',
              label: 'আইকন শিরোনাম (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Title (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'iconSubtitle',
              type: 'text',
              label: 'Icon Subtitle (EN)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Subtitle', TITLE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'iconSubtitleBN',
              type: 'text',
              label: 'আইকন সাবটাইটেল (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Icon Subtitle (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },

        /* ---- Age group ---- */
        {
          name: 'age',
          type: 'group',
          label: 'Age',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Age Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Age Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'এজ টাইটেল (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Age Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },

            // Min
            {
              type: 'row',
              fields: [
                {
                  name: 'minAgeLabel',
                  type: 'text',
                  label: 'Minimum Label (EN)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Minimum Label', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'minAgeLabelBN',
                  type: 'text',
                  label: 'সর্বনিম্ন লেবেল (বাংলা)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Minimum Label (BN)', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'minAgeValue',
                  type: 'text',
                  label: 'Minimum Age (EN digits)',
                  required: false,
                  maxLength: 4,
                  validate: validateShortText('Minimum Age', 4, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'minAgeValueBN',
                  type: 'text',
                  label: 'সর্বনিম্ন বয়স (বাংলা সংখ্যা)',
                  required: false,
                  maxLength: 8,
                  validate: validateShortText('Minimum Age (BN)', 8, false),
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'minAgeValuePeriod',
                  type: 'text',
                  label: 'Minimum Period (EN)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Minimum Period', 16, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'minAgeValuePeriodBN',
                  type: 'text',
                  label: 'সর্বনিম্ন পিরিয়ড (বাংলা)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Minimum Period (BN)', 16, false),
                  admin: { width: '50%' },
                },
              ],
            },

            // Max
            {
              type: 'row',
              fields: [
                {
                  name: 'maxAgeLabel',
                  type: 'text',
                  label: 'Maximum Label (EN)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Maximum Label', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'maxAgeLabelBN',
                  type: 'text',
                  label: 'সর্বোচ্চ লেবেল (বাংলা)',
                  required: false,
                  maxLength: 40,
                  validate: validateShortText('Maximum Label (BN)', 40, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'maxAgeValue',
                  type: 'text',
                  label: 'Maximum Age (EN digits)',
                  required: false,
                  maxLength: 4,
                  validate: validateShortText('Maximum Age', 4, false),
                  admin: { width: '25%' },
                },
                {
                  name: 'maxAgeValueBN',
                  type: 'text',
                  label: 'সর্বোচ্চ বয়স (বাংলা সংখ্যা)',
                  required: false,
                  maxLength: 8,
                  validate: validateShortText('Maximum Age (BN)', 8, false),
                  admin: { width: '25%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'maxAgeValuePeriod',
                  type: 'text',
                  label: 'Maximum Period (EN)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Maximum Period', 16, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'maxAgeValuePeriodBN',
                  type: 'text',
                  label: 'সর্বোচ্চ পিরিয়ড (বাংলা)',
                  required: false,
                  maxLength: 16,
                  validate: validateShortText('Maximum Period (BN)', 16, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        /* ---- Policy Term (optional) ---- */
        {
          name: 'policyTerm',
          type: 'group',
          label: 'Policy Term',
          admin: { description: 'Optional. Example: value = "10-20 Years".' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Policy Term Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Policy Term Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value (EN)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Policy Term Value', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'valueBN',
                  type: 'text',
                  label: 'মান (বাংলা)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Policy Term Value (BN)', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        /* ---- Maturity Age (optional) ---- */
        {
          name: 'maturityAge',
          type: 'group',
          label: 'Maturity Age',
          admin: { description: 'Optional. Example: value = "25 Years".' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Maturity Age Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Maturity Age Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value (EN)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Maturity Age Value', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'valueBN',
                  type: 'text',
                  label: 'মান (বাংলা)',
                  required: false,
                  maxLength: VALUE_MAX,
                  validate: validateShortText('Maturity Age Value (BN)', VALUE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },

        /* ---- Physical Condition (optional) ---- */
        {
          name: 'physicalCondition',
          type: 'group',
          label: 'Physical Condition',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Title (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Title', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Title (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Value (EN)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Value', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
                {
                  name: 'valueBN',
                  type: 'text',
                  label: 'মান (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShortText('Physical Value (BN)', TITLE_MAX, false),
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default PlanInfoDesignSchema
