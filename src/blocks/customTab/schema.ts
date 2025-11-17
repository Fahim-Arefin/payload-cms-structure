// // src/payload/blocks/Plan.ts
// import {
//   CUSTOM_TAB_PAGE_BLOCK_LABEL,
//   CUSTOM_TAB_BLOCK_THUMBNAIL_URL,
//   CUSTOM_TAB_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { bnNum } from '@/lib/utils'
// import type { Block } from 'payload'
// import DescriptiveContent from './descriptiveContent/schema'
// import StepContent from './stepContent/schema'
// import EligibilityContentSchema from './eligibilityContent/schema'
// import AdditionalBenfitContent from './additionalBenefitContent/schema'
// import DetailsContent from './detailsContent/schema'
// import { generateImageFields } from '@/utils/media/fieldGenerators'

// /* ------------ limits ------------ */
// const TITLE_MAX = 100
// const SUBTITLE_MAX = 100
// const DESC_MAX = 500
// const HIGHLIGHT_MAX = 100
// const COLOR_HEX_LEN = 7

// /* ------------ validators ------------ */
// const validateHexColor = (val: unknown) => {
//   if (val == null || val === '') return true
//   const s = String(val).trim()
//   return /^#[0-9A-Fa-f]{6}$/.test(s)
//     ? true
//     : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
// }

// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// const validateHighlightedInTitle =
//   (label: string, targetField: 'title' | 'titleBN', max = HIGHLIGHT_MAX) =>
//   (val: unknown, { siblingData }: any) => {
//     const hl = (val ?? '').toString().trim()
//     if (!hl) return true
//     if (hl.length > max) return `${label} must be at most ${max} characters.`
//     const title = (siblingData?.[targetField] ?? '').toString()
//     return title.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
//   }

// const validateHighlightedInSubtitle =
//   (label: string, targetField: 'subtitle' | 'subtitleBN', max = HIGHLIGHT_MAX) =>
//   (val: unknown, { siblingData }: any) => {
//     const hl = (val ?? '').toString().trim()
//     if (!hl) return true
//     if (hl.length > max) return `${label} must be at most ${max} characters.`
//     const sub = (siblingData?.[targetField] ?? '').toString()
//     return sub.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
//   }

// // rich text validator

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

// /** one word: letters/digits only (no spaces,-,_) */
// const ONE_WORD_RE = /^[A-Za-z0-9]+$/
// const validateOneWordKey = (val: unknown) => {
//   const s = String(val ?? '').trim()
//   if (!s) return 'Value key is required.'
//   if (!ONE_WORD_RE.test(s)) return 'Use a single word with letters/digits only (no spaces).'
//   return true
// }

// /** Array-level validator for uniqueness of tab.value (and one-word enforcement) */
// const validateTabsUniqueValues = (val: unknown) => {
//   // const arr = Array.isArray(val) ? (val as any[]) : []
//   // if (!arr.length) return 'At least one tab is required.'

//   const arr = Array.isArray(val) ? (val as any[]) : []
//   if (arr.length < 2) return 'At least two tab is required'

//   const values = arr.map((t) => String(t?.value ?? '').trim())

//   // empty guard
//   if (values.some((v) => !v)) return 'Every tab must have a non-empty value key.'

//   // one-word pattern (defensive; field-level already checks this)
//   const invalid = values.filter((v) => !ONE_WORD_RE.test(v))
//   if (invalid.length) {
//     const uniq = [...new Set(invalid)]
//     return `Tab value must be a single word (letters/digits only). Invalid: ${uniq.join(', ')}.`
//   }

//   // uniqueness
//   const dups = values.filter((v, i) => values.indexOf(v) !== i)
//   if (dups.length) {
//     const uniq = [...new Set(dups)]
//     return `Duplicate tab value keys: ${uniq.join(', ')}. Each value must be unique.`
//   }
//   return true
// }

// /* ------------ Block config ------------ */
// const CustomTabSchema: Block = {
//   slug: CUSTOM_TAB_SLUG_AND_TAG,
//   labels: {
//     singular: CUSTOM_TAB_PAGE_BLOCK_LABEL,
//     plural: CUSTOM_TAB_PAGE_BLOCK_LABEL,
//   },

//   imageURL: CUSTOM_TAB_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${CUSTOM_TAB_PAGE_BLOCK_LABEL} preview`,

//   fields: [
//     {
//       name: 'backgroundColor',
//       type: 'text',
//       label: 'Section Background Color',
//       maxLength: COLOR_HEX_LEN,
//       validate: validateHexColor,
//       defaultValue: '#FCF4EB',
//       admin: {
//         width: '33%',
//         description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(
//           COLOR_HEX_LEN,
//         )}).`,
//       },
//     },

//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: false,
//           label: 'Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title', TITLE_MAX, false),
//           admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: false,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title (BN)', TITLE_MAX, false),
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
//           name: 'highlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within title)',
//           maxLength: HIGHLIGHT_MAX,
//           validate: validateHighlightedInTitle('Highlighted Text', 'title', HIGHLIGHT_MAX),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear verbatim inside Title. Max ${HIGHLIGHT_MAX} chars.`,
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//           maxLength: HIGHLIGHT_MAX,
//           validate: validateHighlightedInTitle('Highlighted Text (BN)', 'titleBN', HIGHLIGHT_MAX),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। শিরোনামের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
//               HIGHLIGHT_MAX,
//             )} অক্ষর।`,
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
//           required: false,
//           label: 'Subtitle',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Subtitle', SUBTITLE_MAX, false),
//           admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
//         },
//         {
//           name: 'subtitleBN',
//           type: 'text',
//           required: false,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, false),
//           admin: {
//             width: '50%',
//             description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedSubtitle',
//           type: 'text',
//           label: 'Highlighted Text (within subtitle)',
//           maxLength: HIGHLIGHT_MAX,
//           validate: validateHighlightedInSubtitle(
//             'Highlighted Text (Subtitle)',
//             'subtitle',
//             HIGHLIGHT_MAX,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear verbatim inside Subtitle. Max ${HIGHLIGHT_MAX} chars.`,
//           },
//         },
//         {
//           name: 'highlightedSubtitleBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
//           maxLength: HIGHLIGHT_MAX,
//           validate: validateHighlightedInSubtitle(
//             'Highlighted Text (Subtitle BN)',
//             'subtitleBN',
//             HIGHLIGHT_MAX,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। সাবটাইটেলের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
//               HIGHLIGHT_MAX,
//             )} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'description',
//           type: 'richText',
//           label: 'Description',
//           validate: validateRichText('Description', { required: false, max: DESC_MAX }),
//           admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
//         },
//         {
//           name: 'descriptionBN',
//           type: 'richText',
//           label: 'বর্ণনা (বাংলা)',
//           validate: validateRichText('Description (BN)', { required: false, max: DESC_MAX }),
//           admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।` },
//         },
//       ],
//     },
//     {
//       name: 'halfWidth',
//       type: 'checkbox',
//       label: 'Half Width',
//       defaultValue: false,
//       admin: {
//         description:
//           'If half width checbox is true it will take half width otherwise it will take full width, And if u choose half width then u can display image on the other half.',
//       },
//     },
//     {
//       type: 'row',
//       fields: [
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
//             width: '33%',
//             description: 'Select where the image align ',
//           },
//         },
//         {
//           name: 'desktopImageChoice',
//           type: 'select',
//           label: 'Desktop Image',
//           defaultValue: 'tall',
//           options: [
//             { label: 'Use 630×700 (tall)', value: 'tall' },
//             { label: 'Use 500×370 (wide)', value: 'wide' },
//           ],
//           admin: { width: '33%', description: 'Which image to display on desktop layouts.' },
//         },
//         {
//           name: 'mobileImageChoice',
//           type: 'select',
//           label: 'Mobile Image',
//           defaultValue: 'wide',
//           options: [
//             { label: 'Use 630×700 (tall)', value: 'tall' },
//             { label: 'Use 500×370 (wide)', value: 'wide' },
//           ],
//           admin: { width: '33%', description: 'Which image to display on mobile layouts.' },
//         },
//       ],
//     },
//     // 1) 630 x 700  (aspect ≈ 0.9)
//     ...generateImageFields({
//       fieldName: 'imageTall',
//       label: 'Image Tall (630×650)',
//       description: 'Tall image (630×650). Required.',
//       aspectRatio: 630 / 650,
//       quality: 0.9,
//       maxKB: 700,
//       required: true,
//     } as any),

//     // 2) 500 x 370 (aspect ≈ 1.351)
//     ...generateImageFields({
//       fieldName: 'imageWide',
//       label: 'Image Wide (500×370)',
//       description: 'Wide image (500×370, aspect ≈ 1.351). Required.',
//       aspectRatio: 500 / 370,
//       quality: 0.9,
//       maxKB: 600,
//       required: true,
//     } as any),

//     // custom tabs
//     {
//       name: 'tabs',
//       type: 'array',
//       label: 'Tabs',
//       minRows: 2,
//       maxRows: 6,
//       required: true,
//       labels: { singular: 'Tab', plural: 'Tabs' },
//       admin: {
//         description:
//           'Add each tab header with a one-word “value” key, then choose exactly one content block.',
//       },
//       // ⬇️ NEW: array-level uniqueness validator
//       validate: validateTabsUniqueValues,
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'value',
//               type: 'text',
//               label: 'Value key (one word, used as tab id)',
//               required: true,
//               validate: validateOneWordKey,
//               admin: { width: '25%', description: 'e.g., features, eligibility, benefits' },
//             },
//             {
//               name: 'label',
//               type: 'text',
//               label: 'Label (EN)',
//               required: true,
//               maxLength: 120,
//               validate: validateShortText('Label', 120, true),
//               admin: { width: '37.5%' },
//             },
//             {
//               name: 'labelBN',
//               type: 'text',
//               label: 'লেবেল (বাংলা)',
//               required: false,
//               maxLength: 120,
//               validate: validateShortText('Label (BN)', 120, false),
//               admin: { width: '37.5%' },
//             },
//           ],
//         },

//         // exactly one content block per tab
//         {
//           name: 'content',
//           type: 'blocks',
//           label: 'Tab Content',
//           minRows: 1,
//           maxRows: 1,
//           required: true,
//           admin: {
//             description: 'Pick ONE content block for this tab.',
//           },
//           blocks: [
//             DescriptiveContent,
//             EligibilityContentSchema,
//             AdditionalBenfitContent,
//             StepContent,
//             DetailsContent,
//           ],
//         },
//       ],
//     },
//   ],
// }

// export default CustomTabSchema

// ======================================================================
// ======================================================================
// ======================================================================

// src/payload/blocks/Plan.ts
import {
  CUSTOM_TAB_PAGE_BLOCK_LABEL,
  CUSTOM_TAB_BLOCK_THUMBNAIL_URL,
  CUSTOM_TAB_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'
import DescriptiveContent from './descriptiveContent/schema'
import StepContent from './stepContent/schema'
import EligibilityContentSchema from './eligibilityContent/schema'
import AdditionalBenfitContent from './additionalBenefitContent/schema'
import DetailsContent from './detailsContent/schema'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ------------ limits ------------ */
const TITLE_MAX = 100
const SUBTITLE_MAX = 100
const DESC_MAX = 500
const HIGHLIGHT_MAX = 100
const COLOR_HEX_LEN = 7

/* ------------ validators ------------ */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHighlightedInTitle =
  (label: string, targetField: 'title' | 'titleBN', max = HIGHLIGHT_MAX) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true
    if (hl.length > max) return `${label} must be at most ${max} characters.`
    const title = (siblingData?.[targetField] ?? '').toString()
    return title.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
  }

const validateHighlightedInSubtitle =
  (label: string, targetField: 'subtitle' | 'subtitleBN', max = HIGHLIGHT_MAX) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true
    if (hl.length > max) return `${label} must be at most ${max} characters.`
    const sub = (siblingData?.[targetField] ?? '').toString()
    return sub.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
  }

// rich text validator

/** True if there is ANY real (non-zero-width, non-whitespace) text node in the Lexical tree */
function lexicalHasRealText(root: any): boolean {
  if (!root) return false
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue

    // Text node with real characters?
    if (node.type === 'text' && typeof node.text === 'string') {
      const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
      if (stripped.length > 0) return true
    }

    // Traverse children/fields
    if (Array.isArray(node)) {
      for (const child of node) stack.push(child)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push(node[k])
      }
    }
  }
  return false
}

/** Count characters in Lexical tree (ignores zero-width chars but keeps normal spaces) */
function lexicalCharCount(root: any): number {
  let count = 0
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      count += node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').length
    }
    if (Array.isArray(node)) {
      for (const child of node) stack.push(child)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push(node[k])
      }
    }
  }
  return count
}

/** Single source of truth validator for richText fields */
const validateRichText =
  (label: string, { required, max }: { required: boolean; max: number }) =>
  (val: unknown) => {
    const root = (val as any)?.root ?? val
    if (required && !lexicalHasRealText(root)) {
      return `${label} is required.`
    }
    if (!root) return true
    const chars = lexicalCharCount(root)
    if (max && chars > max) {
      return `${label} must be at most ${max} characters.`
    }
    return true
  }

/** one word: letters/digits only (no spaces,-,_) */
const ONE_WORD_RE = /^[A-Za-z0-9]+$/
const validateOneWordKey = (val: unknown) => {
  const s = String(val ?? '').trim()
  if (!s) return 'Value key is required.'
  if (!ONE_WORD_RE.test(s)) return 'Use a single word with letters/digits only (no spaces).'
  return true
}

/** Array-level validator for uniqueness of tab.value (and one-word enforcement) */
const validateTabsUniqueValues = (val: unknown) => {
  const arr = Array.isArray(val) ? (val as any[]) : []
  if (arr.length < 2) return 'At least two tab is required'

  const values = arr.map((t) => String(t?.value ?? '').trim())

  // empty guard
  if (values.some((v) => !v)) return 'Every tab must have a non-empty value key.'

  // one-word pattern (defensive; field-level already checks this)
  const invalid = values.filter((v) => !ONE_WORD_RE.test(v))
  if (invalid.length) {
    const uniq = [...new Set(invalid)]
    return `Tab value must be a single word (letters/digits only). Invalid: ${uniq.join(', ')}.`
  }

  // uniqueness
  const dups = values.filter((v, i) => values.indexOf(v) !== i)
  if (dups.length) {
    const uniq = [...new Set(dups)]
    return `Duplicate tab value keys: ${uniq.join(', ')}. Each value must be unique.`
  }
  return true
}

// ✅ Only require image when halfWidth is enabled
const validateImageRequiredIfHalfWidth = (label: string) => (val: unknown, options: any) => {
  // halfWidth can be on siblingData or data depending on nesting
  const isHalf = !!(options?.siblingData?.halfWidth ?? options?.data?.halfWidth)
  if (!isHalf) return true
  if (!val) return `${label} is required when Half Width is enabled.`
  return true
}

// ✅ Wrap generateImageFields so we can inject validate + condition
const buildTallImageFields = () => {
  const fields = generateImageFields({
    fieldName: 'imageTall',
    label: 'Image Tall (630×650)',
    description: 'Tall image (630×650). Required when Half Width is enabled.',
    aspectRatio: 630 / 650,
    quality: 0.9,
    maxKB: 700,
    // global required false – we handle it via validate
    required: false,
  } as any)

  const [first, ...rest] = fields as any[]
  const base = (first || {}) as any

  return [
    {
      ...base,
      required: false,
      validate: validateImageRequiredIfHalfWidth('Image Tall'),
      admin: {
        ...(base.admin || {}),
        // show only when halfWidth is true
        condition: (data: any, siblingData: any) => !!(data?.halfWidth ?? siblingData?.halfWidth),
      },
    },
    ...rest,
  ]
}

const buildWideImageFields = () => {
  const fields = generateImageFields({
    fieldName: 'imageWide',
    label: 'Image Wide (500×370)',
    description: 'Wide image (500×370, aspect ≈ 1.351). Required when Half Width is enabled.',
    aspectRatio: 500 / 370,
    quality: 0.9,
    maxKB: 600,
    required: false,
  } as any)

  const [first, ...rest] = fields as any[]
  const base = (first || {}) as any

  return [
    {
      ...base,
      required: false,
      validate: validateImageRequiredIfHalfWidth('Image Wide'),
      admin: {
        ...(base.admin || {}),
        condition: (data: any, siblingData: any) => !!(data?.halfWidth ?? siblingData?.halfWidth),
      },
    },
    ...rest,
  ]
}

/* ------------ Block config ------------ */
const CustomTabSchema: Block = {
  slug: CUSTOM_TAB_SLUG_AND_TAG,
  labels: {
    singular: CUSTOM_TAB_PAGE_BLOCK_LABEL,
    plural: CUSTOM_TAB_PAGE_BLOCK_LABEL,
  },

  imageURL: CUSTOM_TAB_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CUSTOM_TAB_PAGE_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FCF4EB',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: false,
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, false),
          admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: false,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, false),
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
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInTitle('Highlighted Text', 'title', HIGHLIGHT_MAX),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Title. Max ${HIGHLIGHT_MAX} chars.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInTitle('Highlighted Text (BN)', 'titleBN', HIGHLIGHT_MAX),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HIGHLIGHT_MAX,
            )} অক্ষর।`,
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
          required: false,
          label: 'Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, false),
          admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: false,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, false),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedSubtitle',
          type: 'text',
          label: 'Highlighted Text (within subtitle)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInSubtitle(
            'Highlighted Text (Subtitle)',
            'subtitle',
            HIGHLIGHT_MAX,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Subtitle. Max ${HIGHLIGHT_MAX} chars.`,
          },
        },
        {
          name: 'highlightedSubtitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInSubtitle(
            'Highlighted Text (Subtitle BN)',
            'subtitleBN',
            HIGHLIGHT_MAX,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সাবটাইটেলের ভিতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HIGHLIGHT_MAX,
            )} অক্ষর।`,
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
          label: 'Description',
          validate: validateRichText('Description', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'বর্ণনা (বাংলা)',
          validate: validateRichText('Description (BN)', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।` },
        },
      ],
    },
    {
      name: 'halfWidth',
      type: 'checkbox',
      label: 'Half Width',
      defaultValue: false,
      admin: {
        description:
          'If Half Width is true it will take half width, and you can display image on the other half. If unchecked, image options are hidden.',
      },
    },

    {
      type: 'row',
      fields: [
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
            width: '33%',
            description: 'Select where the image align',
            condition: (data: any, siblingData: any) =>
              !!(data?.halfWidth ?? siblingData?.halfWidth),
          },
        },
        {
          name: 'desktopImageChoice',
          type: 'select',
          label: 'Desktop Image',
          defaultValue: 'tall',
          options: [
            { label: 'Use 630×650 (tall)', value: 'tall' },
            { label: 'Use 500×370 (wide)', value: 'wide' },
          ],
          admin: {
            width: '33%',
            description: 'Which image to display on desktop layouts.',
            condition: (data: any, siblingData: any) =>
              !!(data?.halfWidth ?? siblingData?.halfWidth),
          },
        },
        {
          name: 'mobileImageChoice',
          type: 'select',
          label: 'Mobile Image',
          defaultValue: 'wide',
          options: [
            { label: 'Use 630×650 (tall)', value: 'tall' },
            { label: 'Use 500×370 (wide)', value: 'wide' },
          ],
          admin: {
            width: '33%',
            description: 'Which image to display on mobile layouts.',
            condition: (data: any, siblingData: any) =>
              !!(data?.halfWidth ?? siblingData?.halfWidth),
          },
        },
      ],
    },

    // ✅ Images: built via helpers so we can control validate + condition
    ...buildTallImageFields(),
    ...buildWideImageFields(),

    // custom tabs
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      minRows: 2,
      maxRows: 6,
      required: true,
      labels: { singular: 'Tab', plural: 'Tabs' },
      admin: {
        description:
          'Add each tab header with a one-word “value” key, then choose exactly one content block.',
      },
      validate: validateTabsUniqueValues,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Value key (one word, used as tab id)',
              required: true,
              validate: validateOneWordKey,
              admin: { width: '25%', description: 'e.g., features, eligibility, benefits' },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label (EN)',
              required: true,
              maxLength: 120,
              validate: validateShortText('Label', 120, true),
              admin: { width: '37.5%' },
            },
            {
              name: 'labelBN',
              type: 'text',
              label: 'লেবেল (বাংলা)',
              required: false,
              maxLength: 120,
              validate: validateShortText('Label (BN)', 120, false),
              admin: { width: '37.5%' },
            },
          ],
        },

        {
          name: 'content',
          type: 'blocks',
          label: 'Tab Content',
          minRows: 1,
          maxRows: 1,
          required: true,
          admin: {
            description: 'Pick one content block for this tab.',
          },
          blocks: [
            DescriptiveContent,
            EligibilityContentSchema,
            AdditionalBenfitContent,
            StepContent,
            DetailsContent,
          ],
        },
      ],
    },
  ],
}

export default CustomTabSchema
