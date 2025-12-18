// import { revalidateTag } from 'next/cache'
// import type { GlobalConfig } from 'payload'

// import {
//   ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
//   BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
//   GLOBAL_BOARD_OF_DIRECTORS_BLOCK_LABEL,
//   GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { globalTag } from '@/lib/cacheTags'
// import { bnNum } from '@/lib/utils'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 60
// const SUBTITLE_MAX = 100
// const MAINDESC_MAX = 200
// const NAME_MAX = 100
// const DESIGNATION_MAX = 80
// const DESC_MAX = 3000

// /* ---------------- text validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /* ---------------- rich text (Lexical) validators — same as DirectorsMessages ---------------- */
// /** True if there is ANY real (non-zero-width, non-whitespace) text node in the Lexical tree */
// function lexicalHasRealText(root: any): boolean {
//   if (!root) return false
//   const stack = [root]
//   while (stack.length) {
//     const node = stack.pop()
//     if (!node) continue

//     // Text node with real characters?
//     if (node.type === 'text' && typeof node.text === 'string') {
//       const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
//       if (stripped.length > 0) return true
//     }

//     // Traverse children/fields
//     if (Array.isArray(node)) {
//       for (const child of node) stack.push(child)
//     } else if (typeof node === 'object') {
//       for (const k of Object.keys(node)) {
//         if (k === 'text') continue
//         stack.push(node[k])
//       }
//     }
//   }
//   return false
// }

// /** Count characters in Lexical tree (ignores zero-width chars but keeps normal spaces) */
// function lexicalCharCount(root: any): number {
//   let count = 0
//   const stack = [root]
//   while (stack.length) {
//     const node = stack.pop()
//     if (!node) continue
//     if (node.type === 'text' && typeof node.text === 'string') {
//       count += node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').length
//     }
//     if (Array.isArray(node)) {
//       for (const child of node) stack.push(child)
//     } else if (typeof node === 'object') {
//       for (const k of Object.keys(node)) {
//         if (k === 'text') continue
//         stack.push(node[k])
//       }
//     }
//   }
//   return count
// }

// /** Single source of truth validator for richText fields */
// const validateRichText =
//   (label: string, { required, max }: { required: boolean; max: number }) =>
//   (val: unknown) => {
//     const root = (val as any)?.root ?? val
//     if (required && !lexicalHasRealText(root)) {
//       return `${label} is required.`
//     }
//     if (!root) return true
//     const chars = lexicalCharCount(root)
//     if (max && chars > max) {
//       return `${label} must be at most ${max} characters.`
//     }
//     return true
//   }

// const BoardOfDirectors: GlobalConfig = {
//   slug: GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
//   label: GLOBAL_BOARD_OF_DIRECTORS_BLOCK_LABEL,
//   admin: {
//     description:
//       'This collection powers BOTH pages: About Us + BOD. About Us uses ROOT fields (Section Title, Section Subtitle, Section Description) and the aboutImage (transparent, BG-removed, 4:5 PNG). BOD page uses directors[] items (portrait image 4:5, EN/BN name, EN/BN designation, rich bio). Note: aboutImage must be background-removed (transparent PNG) for About Us overlays.',
//   },

//   fields: [
//     /* ----- Root ----- */
//     // section header
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
//             description: `Primary heading for this section. Max ${TITLE_MAX} characters.`,
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
//     // section Subtitle
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'sectionSubtitle',
//           type: 'text',
//           required: true,
//           label: 'Section Subtitle',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Section Subtitle', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Supporting line under the title. Max ${SUBTITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'sectionSubtitleBN',
//           type: 'text',
//           required: true,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Section Subtitle (BN)', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `শিরোনামের সহায়ক লাইন (বাংলা)। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     // section description
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'sectionDescription',
//           type: 'textarea',
//           required: true,
//           label: 'Section Description',
//           maxLength: MAINDESC_MAX,
//           validate: validateShortText('Section Description', MAINDESC_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Short intro paragraph (1–3 lines). Max ${MAINDESC_MAX} characters.`,
//           },
//         },
//         {
//           name: 'sectionDescriptionBN',
//           type: 'textarea',
//           required: true,
//           label: 'সেকশন বর্ণনা (বাংলা)',
//           maxLength: MAINDESC_MAX,
//           validate: validateShortText('Section Description (BN)', MAINDESC_MAX, true),
//           admin: {
//             width: '50%',
//             description: `সংক্ষিপ্ত পরিচিতি (১–৩ লাইন)। সর্বোচ্চ ${bnNum(MAINDESC_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     /* ----- Card Section Title (EN/BN twins) ----- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'cardSectionTitle',
//           type: 'text',
//           required: true,
//           label: 'Card Section Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Card Section Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Heading shown above the cards. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'cardSectionTitleBN',
//           type: 'text',
//           required: true,
//           label: 'কার্ড সেকশনের শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Card Section Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `কার্ড অংশের উপরের শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     /* ----- CTA Link: label (EN/BN) + INTERNAL link to a Page ----- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'linkLabel',
//           type: 'text',
//           required: true,
//           label: 'Link Label',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Link Label', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `CTA text (e.g., “View all directors”). Max ${SUBTITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'linkLabelBN',
//           type: 'text',
//           required: true,
//           label: 'লিংক লেবেল (বাংলা)',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Link Label (BN)', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `CTA টেক্সট (যেমন, “সব পরিচালক দেখুন”). সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       name: 'linkTarget',
//       label: 'Link to (internal page)',
//       type: 'relationship',
//       relationTo: 'pages', // ✅ internal only
//       required: true,
//       admin: {
//         description: 'Pick an internal Page to link to. External URLs are not allowed.',
//       },
//     },
//     // cards
//     {
//       name: 'directors',
//       type: 'array',
//       label: 'Directors',
//       minRows: 1,
//       maxRows: 30,
//       required: true,
//       labels: { singular: 'Director', plural: 'Directors' },
//       admin: {
//         description: 'Add one card per director.',
//       },
//       fields: [
//         // Portrait (direct upload)
//         {
//           name: 'image',
//           label: 'Portrait Image',
//           type: 'upload',
//           relationTo: 'media',
//           required: true,
//           admin: {
//             description:
//               'Director portrait (4:5 recommended). Optimized and blur placeholder generated automatically.',
//           },
//         },

//         // Portrait (About page, BG-removed)
//         // same 4:5 aspect; PNG with transparent background strongly recommended
//         {
//           name: 'aboutImage',
//           label: 'Portrait Image (About Us • BG-removed)',
//           type: 'upload',
//           relationTo: 'media',
//           required: true,
//           admin: {
//             description:
//               'Used on the About Us page overlays. Upload a background-removed PNG (transparent background) of the director, framed 4:5 (e.g., 560×700). Keep subject centered; same person/pose as the main Portrait Image.',
//           },
//         },

//         // Name (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title', // keep your source key
//               type: 'text',
//               required: true,
//               label: 'Name',
//               maxLength: NAME_MAX,
//               validate: validateShortText('Name', NAME_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Director’s full name (English). Max ${NAME_MAX} characters.`,
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'নাম (বাংলা)',
//               maxLength: NAME_MAX,
//               validate: validateShortText('Name (BN)', NAME_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `পরিচালকের পূর্ণ নাম (বাংলা)। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Designation (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'designation',
//               type: 'text',
//               required: true,
//               label: 'Designation',
//               maxLength: DESIGNATION_MAX,
//               validate: validateShortText('Designation', DESIGNATION_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Official designation (English). Max ${DESIGNATION_MAX} characters.`,
//               },
//             },
//             {
//               name: 'designationBN',
//               type: 'text',
//               required: true,
//               label: 'পদবি (বাংলা)',
//               maxLength: DESIGNATION_MAX,
//               validate: validateShortText('Designation (BN)', DESIGNATION_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `আনুষ্ঠানিক পদবি (বাংলা)। সর্বোচ্চ ${bnNum(DESIGNATION_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Bio / Description (EN/BN) — rich text with same validator as DirectorsMessages
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'richText',
//               label: 'Bio / Description',
//               validate: validateRichText('Description', { required: true, max: DESC_MAX }),
//               admin: {
//                 width: '50%',
//                 description: `Long bio (English). Up to ~${DESC_MAX} characters.`,
//               },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'richText',
//               label: 'বায়ো / বর্ণনা (বাংলা)',
//               validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
//               admin: {
//                 width: '50%',
//                 description: `দীর্ঘ বায়ো (বাংলা)। প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।`,
//               },
//             },
//           ],
//         },
//       ],
//       hooks: {
//         // Auto-assign id = index + 1 on every validate/save.
//         beforeValidate: [
//           ({ data }) => {
//             if (Array.isArray(data?.directors)) {
//               data.directors = data.directors.map((item: any, idx: number) => ({
//                 ...item,
//                 id: idx + 1,
//               }))
//             }
//           },
//         ],
//       },
//     },
//   ],

//   hooks: {
//     afterChange: [
//       async () => {
//         revalidateTag(globalTag(GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG))
//         revalidateTag(ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG)
//         revalidateTag(BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG)
//       },
//     ],
//   },
// }

// export default BoardOfDirectors

// =================================================================================
// =================================================================================
// =================================================================================
// src/collections/BoardOfDirectors.ts
import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

import {
  ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
  BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
  GLOBAL_BOARD_OF_DIRECTORS_BLOCK_LABEL,
  GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
} from '@/lib/constants'

import { globalTag } from '@/lib/cacheTags'
import { bnNum } from '@/lib/utils'

// ✅ media lifecycle + purge
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// ✅ generator (cropper + original handling)
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { roleAtLeast } from '@/lib/rbac'

/* ---------------- limits ---------------- */
const TITLE_MAX = 60
const SUBTITLE_MAX = 100
const MAINDESC_MAX = 200
const NAME_MAX = 100
const DESIGNATION_MAX = 80
const DESC_MAX = 3000

/* ---------------- text validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/* ---------------- rich text (Lexical) helpers ---------------- */
function lexicalHasRealText(root: any): boolean {
  if (!root) return false
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
      if (stripped.length > 0) return true
    }
    if (Array.isArray(node)) for (const c of node) stack.push(c)
    else if (typeof node === 'object')
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
  }
  return false
}
function lexicalCharCount(root: any): number {
  let count = 0
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      count += node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').length
    }
    if (Array.isArray(node)) for (const c of node) stack.push(c)
    else if (typeof node === 'object')
      for (const k of Object.keys(node)) if (k !== 'text') stack.push((node as any)[k])
  }
  return count
}
const validateRichText =
  (label: string, { required, max }: { required: boolean; max: number }) =>
  (val: unknown) => {
    const root = (val as any)?.root ?? val
    if (required && !lexicalHasRealText(root)) return `${label} is required.`
    if (!root) return true
    const chars = lexicalCharCount(root)
    if (max && chars > max) return `${label} must be at most ${max} characters.`
    return true
  }

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.linkLabel) || isNonEmpty(siblingData?.linkLabelBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA Button Text (EN) is required when any CTA button text is provided.'
  }
  if (hasThis && String(val).length > SUBTITLE_MAX) {
    return `CTA Button Text must be at most ${SUBTITLE_MAX} characters.`
  }
  return true
}

const validateCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.linkLabel) || isNonEmpty(siblingData?.linkLabelBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  }
  if (hasThis && String(val).length > SUBTITLE_MAX) {
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর হতে পারবে।`
  }
  return true
}

// Works for relationship or text/url fields
const validateCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.linkLabel) || isNonEmpty(siblingData?.linkLabelBN)

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

/* ---------------- media lifecycle (temp upload cleanup + blur propagation) ---------------- */
const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
  arrayFields: [
    { fieldName: 'directors', mediaFields: ['image', 'aboutImage'], itemLabelField: 'title' },
  ],
  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
}) as NonNullable<GlobalConfig['hooks']> | undefined

const pickGlobalHooks = (h: NonNullable<GlobalConfig['hooks']> | undefined) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})
const base = pickGlobalHooks(mediaHooks)

/* ---------------- schema ---------------- */
const BoardOfDirectors: GlobalConfig = {
  slug: GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG,
  label: GLOBAL_BOARD_OF_DIRECTORS_BLOCK_LABEL,
  admin: {
    description:
      'This collection powers BOTH pages: About Us + BOD. About Us uses ROOT fields (Section Title, Section Subtitle, Section Description) and the aboutImage (transparent, BG-removed, 4:5 PNG). BOD page uses directors[] items (portrait image 4:5, EN/BN name, EN/BN designation, rich bio). Note: aboutImage must be background-removed (transparent PNG) for About Us overlays.',
  },
  access: {
    read: () => true, // public read
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    // 🔐 session id for cropper + lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    /* ----- Root ----- */
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
            description: `Primary heading for this section. Max ${TITLE_MAX} characters.`,
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
          name: 'sectionSubtitle',
          type: 'text',
          required: true,
          label: 'Section Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Supporting line under the title. Max ${SUBTITLE_MAX} characters.`,
          },
        },
        {
          name: 'sectionSubtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `শিরোনামের সহায়ক লাইন (বাংলা)। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sectionDescription',
          type: 'textarea',
          required: true,
          label: 'Section Description',
          maxLength: MAINDESC_MAX,
          validate: validateShortText('Section Description', MAINDESC_MAX, true),
          admin: {
            width: '50%',
            description: `Short intro paragraph (1–3 lines). Max ${MAINDESC_MAX} characters.`,
          },
        },
        {
          name: 'sectionDescriptionBN',
          type: 'textarea',
          required: true,
          label: 'সেকশন বর্ণনা (বাংলা)',
          maxLength: MAINDESC_MAX,
          validate: validateShortText('Section Description (BN)', MAINDESC_MAX, true),
          admin: {
            width: '50%',
            description: `সংক্ষিপ্ত পরিচিতি (১–৩ লাইন)। সর্বোচ্চ ${bnNum(MAINDESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'cardSectionTitle',
          type: 'text',
          required: true,
          label: 'Card Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Card Section Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Heading shown above the cards. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'cardSectionTitleBN',
          type: 'text',
          required: true,
          label: 'কার্ড সেকশনের শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Card Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `কার্ড অংশের উপরের শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'linkLabel',
          type: 'text',
          required: true,
          label: 'Link Label',
          maxLength: SUBTITLE_MAX,
          // validate: validateShortText('Link Label', SUBTITLE_MAX, true),
          validate: validateCTAEnglishText,
          admin: {
            width: '50%',
            description: `CTA text (e.g., “View all directors”). Max ${SUBTITLE_MAX} characters.`,
          },
        },
        {
          name: 'linkLabelBN',
          type: 'text',
          required: true,
          label: 'লিংক লেবেল (বাংলা)',
          maxLength: SUBTITLE_MAX,
          // validate: validateShortText('Link Label (BN)', SUBTITLE_MAX, true),
          validate: validateCTABanglaText,
          admin: {
            width: '50%',
            description: `CTA টেক্সট (যেমন, “সব পরিচালক দেখুন”). সর্বোচ্চ ${bnNum(
              SUBTITLE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },
    {
      name: 'linkTarget',
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

    /* ----- Directors (cards) ----- */
    {
      name: 'directors',
      type: 'array',
      label: 'Directors',
      minRows: 1,
      maxRows: 30,
      required: true,
      labels: { singular: 'Director', plural: 'Directors' },
      admin: { description: 'Add one card per director.' },
      fields: [
        // ✅ Portrait (generated image field set; 4:5)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Portrait Image',
          description:
            'Director portrait (4:5 recommended). Optimized and blur placeholder generated automatically.',
          aspectRatio: 4 / 5,
          quality: 0.93,
          maxKB: 400,
          ownerCollection: GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG as any,
        } as any),

        // ✅ About Us portrait (generated; BG-removed PNG, also 4:5)
        ...generateArrayImageFields({
          fieldName: 'aboutImage',
          label: 'Portrait Image (About Us • BG-removed • 4:5)',
          description:
            'Upload a background-removed IMG (transparent), framed 4:5 (e.g., 560×700). Keep subject centered.',
          aspectRatio: 4 / 5,
          quality: 1,
          maxKB: 400,
          ownerCollection: GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Name',
              maxLength: NAME_MAX,
              validate: validateShortText('Name', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `Director’s full name (English). Max ${NAME_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'নাম (বাংলা)',
              maxLength: NAME_MAX,
              validate: validateShortText('Name (BN)', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `পরিচালকের পূর্ণ নাম (বাংলা)। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'designation',
              type: 'text',
              required: true,
              label: 'Designation',
              maxLength: DESIGNATION_MAX,
              validate: validateShortText('Designation', DESIGNATION_MAX, true),
              admin: {
                width: '50%',
                description: `Official designation (English). Max ${DESIGNATION_MAX} characters.`,
              },
            },
            {
              name: 'designationBN',
              type: 'text',
              required: true,
              label: 'পদবি (বাংলা)',
              maxLength: DESIGNATION_MAX,
              validate: validateShortText('Designation (BN)', DESIGNATION_MAX, true),
              admin: {
                width: '50%',
                description: `আনুষ্ঠানিক পদবি (বাংলা)। সর্বোচ্চ ${bnNum(DESIGNATION_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Bio / Description',
              validate: validateRichText('Description', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `Long bio (English). Up to ~${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              label: 'বায়ো / বর্ণনা (বাংলা)',
              validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `দীর্ঘ বায়ো (বাংলা)। প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।`,
              },
            },
          ],
        },
      ],
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (Array.isArray(data?.directors)) {
              data.directors = data.directors.map((item: any, idx: number) => ({
                ...item,
                id: idx + 1,
              }))
            }
          },
        ],
      },
    },
  ],

  hooks: {
    beforeValidate: [...base.beforeValidate],
    beforeChange: [...base.beforeChange],
    afterChange: [
      ...base.afterChange,
      async () => {
        revalidateTag(globalTag(GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG))
        revalidateTag(ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG)
        revalidateTag(BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG)
      },
    ],
  },
}

export default BoardOfDirectors
