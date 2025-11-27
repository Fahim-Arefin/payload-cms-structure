// // src/payload/blocks/Plan.ts
// import type { Block } from 'payload'
// import { bnNum } from '@/lib/utils'
// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import {
//   PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
//   PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL,
//   PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
// } from '@/lib/constants'

// /* ------------ limits ------------ */
// const CARD_TITLE_MAX = 40
// const CARD_SUBTITLE_MAX = 40
// const CARD_DESC_MAX = 100
// const CTA_TEXT_MAX = 24

// /* ------------ validators ------------ */

// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

// const validateCardCTAEnglishText = (val: unknown, { siblingData }: any) => {
//   const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
//   const hasThis = isNonEmpty(val)
//   if (hasAnyText && !hasThis)
//     return 'CTA Button Text (EN) is required when any CTA text is provided.'
//   if (hasThis && String(val).length > CTA_TEXT_MAX)
//     return `CTA Button Text must be at most ${CTA_TEXT_MAX} characters.`
//   return true
// }

// const validateCardCTABanglaText = (val: unknown, { siblingData }: any) => {
//   const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
//   const hasThis = isNonEmpty(val)
//   if (hasAnyText && !hasThis)
//     return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
//   if (hasThis && String(val).length > CTA_TEXT_MAX)
//     return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর হতে পারবে।`
//   return true
// }
// // Works for relationship or text/url fields
// const validateCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
//   const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

//   // presence check for relationship or text
//   let hasLink = false
//   if (Array.isArray(val)) {
//     hasLink = val.length > 0
//   } else if (val && typeof val === 'object') {
//     hasLink = Object.keys(val as Record<string, unknown>).length > 0
//   } else {
//     hasLink = Boolean(val)
//   }

//   if (hasAnyText && !hasLink) {
//     return 'CTA Button Link is required when CTA Button Text is provided.'
//   }
//   return true
// }

// /* ------------ Block config ------------ */
// const PlanCardSchema: Block = {
//   slug: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
//   labels: {
//     singular: PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
//     plural: PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
//   },

//   imageURL: PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${PLAN_PAGE_PLAN_CARD_BLOCK_LABEL} preview`,

//   fields: [
//     {
//       name: 'planCards',
//       type: 'array',
//       label: 'Cards',
//       required: true,
//       minRows: 1,
//       maxRows: 12,
//       labels: { singular: 'Card', plural: 'Cards' },
//       admin: { description: 'Add at least 1 card.' },
//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'bgImage',
//           label: 'Background Image',
//           description: 'Upload & crop a 13:12 image.',
//           aspectRatio: 13 / 12,
//           quality: 0.9,
//           maxKB: 400,
//           ownerCollection: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG as any,
//         } as any),

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
//               admin: { width: '50%', description: `Max ${CARD_TITLE_MAX} characters.` },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'কার্ড শিরোনাম (বাংলা)',
//               maxLength: CARD_TITLE_MAX,
//               validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
//               admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।` },
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'subTitle',
//               type: 'text',
//               required: false,
//               label: 'Card SubTitle',
//               maxLength: CARD_SUBTITLE_MAX,
//               validate: validateShortText('Card SubTitle', CARD_SUBTITLE_MAX, false),
//               admin: { width: '50%', description: `Max ${CARD_SUBTITLE_MAX} characters.` },
//             },
//             {
//               name: 'subTitleBN',
//               type: 'text',
//               required: false,
//               label: 'কার্ড উপ-শিরোনাম (বাংলা)',
//               maxLength: CARD_SUBTITLE_MAX,
//               validate: validateShortText('Card SubTitle (BN)', CARD_SUBTITLE_MAX, false),
//               admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_SUBTITLE_MAX)} অক্ষর।` },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'text',
//               required: true,
//               label: 'Card Description',
//               maxLength: CARD_DESC_MAX,
//               validate: validateShortText('Card Description', CARD_DESC_MAX, true),
//               admin: { width: '50%', description: `Max ${CARD_DESC_MAX} characters.` },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'text',
//               required: true,
//               label: 'কার্ড বর্ণনা (বাংলা)',
//               maxLength: CARD_DESC_MAX,
//               validate: validateShortText('Card Description (BN)', CARD_DESC_MAX, true),
//               admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_DESC_MAX)} অক্ষর।` },
//             },
//           ],
//         },

//         // ⬇️ New: Card CTA button texts (EN/BN, optional but paired)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'buttonText',
//               type: 'text',
//               label: 'CTA Button Text',
//               maxLength: CTA_TEXT_MAX,
//               validate: validateCardCTAEnglishText,
//               admin: {
//                 width: '50%',
//                 description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
//               },
//             },
//             {
//               name: 'buttonTextBN',
//               type: 'text',
//               label: 'CTA বাটনের টেক্সট (বাংলা)',
//               maxLength: CTA_TEXT_MAX,
//               validate: validateCardCTABanglaText,
//               admin: {
//                 width: '50%',
//                 description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//         {
//           name: 'buttonLink',
//           label: 'Link to (internal page)',
//           type: 'relationship',
//           relationTo: 'pages',
//           // required: true,
//           validate: validateCTALinkRequiredIfAnyText,
//           admin: {
//             description:
//               'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
//           },
//         },
//       ],
//     },
//   ],
// }

// export default PlanCardSchema

// ========================================================================================
// ========================================================================================
// ========================================================================================

// src/payload/blocks/Plan.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
  PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL,
  PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

/* ------------ limits ------------ */
const CARD_TITLE_MAX = 100
const CARD_SUBTITLE_MAX = 100
const CARD_DESC_MAX = 200
const CTA_TEXT_MAX = 24
const MODAL_DESC_MAX = 500

/* ------------ validators ------------ */

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

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

/* ------------ Block config ------------ */
const PlanCardSchema: Block = {
  slug: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
  labels: {
    singular: PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
    plural: PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
  },

  imageURL: PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PLAN_PAGE_PLAN_CARD_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'planCards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: { description: 'Add at least 1 card.' },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'bgImage',
          label: 'Background Image',
          description: 'Upload & crop a 13:12 image.',
          aspectRatio: 13 / 12,
          quality: 0.9,
          maxKB: 400,
          ownerCollection: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG as any,
        } as any),

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
              admin: { width: '50%', description: `Max ${CARD_TITLE_MAX} characters.` },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'কার্ড শিরোনাম (বাংলা)',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।` },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'subTitle',
              type: 'text',
              required: false,
              label: 'Card SubTitle',
              maxLength: CARD_SUBTITLE_MAX,
              validate: validateShortText('Card SubTitle', CARD_SUBTITLE_MAX, false),
              admin: { width: '50%', description: `Max ${CARD_SUBTITLE_MAX} characters.` },
            },
            {
              name: 'subTitleBN',
              type: 'text',
              required: false,
              label: 'কার্ড উপ-শিরোনাম (বাংলা)',
              maxLength: CARD_SUBTITLE_MAX,
              validate: validateShortText('Card SubTitle (BN)', CARD_SUBTITLE_MAX, false),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_SUBTITLE_MAX)} অক্ষর।` },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'text',
              required: true,
              label: 'Card Description',
              maxLength: CARD_DESC_MAX,
              validate: validateShortText('Card Description', CARD_DESC_MAX, true),
              admin: { width: '50%', description: `Max ${CARD_DESC_MAX} characters.` },
            },
            {
              name: 'descriptionBN',
              type: 'text',
              required: true,
              label: 'কার্ড বর্ণনা (বাংলা)',
              maxLength: CARD_DESC_MAX,
              validate: validateShortText('Card Description (BN)', CARD_DESC_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_DESC_MAX)} অক্ষর।` },
            },
          ],
        },
        /* === NEW: choose CTA vs Modal === */
        {
          name: 'actionType',
          type: 'select',
          label: 'Card Action Type',
          defaultValue: 'cta',
          options: [
            { label: 'CTA Button', value: 'cta' },
            { label: 'Modal (title + items)', value: 'modal' },
          ],
          admin: {
            description: 'Pick whether this card shows a CTA button or opens a modal with items.',
          },
        },

        /* === If CTA is selected, show your existing CTA fields (unchanged) === */
        {
          type: 'row',
          admin: { condition: (_, siblingData) => siblingData?.actionType === 'cta' },
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              label: 'CTA Button Text',
              required: true,
              maxLength: CTA_TEXT_MAX,
              // validate: validateCardCTAEnglishText,
              admin: { width: '50%', description: `Optional. Max ${CTA_TEXT_MAX} characters.` },
            },
            {
              name: 'buttonTextBN',
              type: 'text',
              label: 'CTA বাটনের টেক্সট (বাংলা)',
              required: true,
              maxLength: CTA_TEXT_MAX,
              // validate: validateCardCTABanglaText,
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'buttonLink',
          label: 'Link to (internal page)',
          type: 'relationship',
          relationTo: 'pages',
          // validate: validateCTALinkRequiredIfAnyText,
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.actionType === 'cta',
            description:
              'Pick an internal Page to link to. External URLs are not allowed. Visible only for CTA.',
          },
        },

        /* === If Modal is selected, show modal config === */
        {
          type: 'row',
          admin: { condition: (_, siblingData) => siblingData?.actionType === 'modal' },
          fields: [
            {
              name: 'modalButtonText',
              type: 'text',
              label: 'Modal Trigger Button Text',
              required: true,
              maxLength: CTA_TEXT_MAX,
              // validate: validateCardCTAEnglishText,
              admin: { width: '50%', description: `Optional. Max ${CTA_TEXT_MAX} characters.` },
            },
            {
              name: 'modalButtonTextBN',
              type: 'text',
              label: 'মডাল ট্রিগার বাটন টেক্সট। (বাংলা)',
              required: true,
              maxLength: CTA_TEXT_MAX,
              // validate: validateCardCTABanglaText,
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'brochurePDF',
          label: 'Brochure PDF',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.actionType === 'modal',
            description: 'Upload/select the brochure PDF.',
          },
        },

        {
          admin: { condition: (_, siblingData) => siblingData?.actionType === 'modal' },
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Button Label',
              defaultValue: 'Download Brochure',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Button Label', CARD_TITLE_MAX, true),
              admin: { width: '50%', description: `Max ${CARD_TITLE_MAX} characters.` },
            },
            {
              name: 'labelBN',
              type: 'text',
              label: 'বাটনের টেক্সট (বাংলা)',
              defaultValue: 'ডাউনলোড ব্রোশিউর',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Button Label (BN)', CARD_TITLE_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।` },
            },
          ],
        },
        {
          admin: { condition: (_, siblingData) => siblingData?.actionType === 'modal' },
          name: 'style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          defaultValue: 'primary',
        },
        {
          type: 'row',
          admin: { condition: (_, siblingData) => siblingData?.actionType === 'modal' },
          fields: [
            {
              name: 'modalTitle',
              type: 'text',
              label: 'Modal Title',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Modal Title', CARD_TITLE_MAX, true),
              admin: { width: '50%', description: `Required. Max ${CARD_TITLE_MAX} characters.` },
            },
            {
              name: 'modalTitleBN',
              type: 'text',
              label: 'মোডাল শিরোনাম (বাংলা)',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Modal Title (BN)', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `আবশ্যক। সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          name: 'modalItems',
          type: 'array',
          label: 'Modal Items',
          required: true,
          minRows: 1,
          maxRows: 20,
          admin: {
            condition: (_, siblingData) => siblingData?.actionType === 'modal',
            description: 'Add one or more items shown inside the modal.',
          },
          labels: { singular: 'Item', plural: 'Items' },
          fields: [
            // icon (1:1) — uses existing media pipeline
            ...generateArrayImageFields({
              fieldName: 'icon',
              label: 'Item Icon (1:1)',
              description: 'Square icon (1:1). PNG/SVG recommended.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 200,
              ownerCollection: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG as any,
            } as any),

            // titles
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Item Title',
                  maxLength: CARD_TITLE_MAX,
                  validate: validateShortText('Item Title', CARD_TITLE_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Required. Max ${CARD_TITLE_MAX} characters.`,
                  },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'আইটেম শিরোনাম (বাংলা)',
                  maxLength: CARD_TITLE_MAX,
                  validate: validateShortText('Item Title (BN)', CARD_TITLE_MAX, true),
                  admin: {
                    width: '50%',
                    description: `আবশ্যক। সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
                  },
                },
              ],
            },

            // descriptions (RichText EN/BN) — same validation style as requested
            {
              type: 'row',
              fields: [
                {
                  name: 'description',
                  type: 'richText',
                  label: 'Item Description',
                  validate: validateRichText('Item Description', {
                    required: true,
                    max: MODAL_DESC_MAX,
                  }),
                  admin: { width: '50%', description: `Up to ~${MODAL_DESC_MAX} characters.` },
                },
                {
                  name: 'descriptionBN',
                  type: 'richText',
                  label: 'আইটেম বর্ণনা (বাংলা)',
                  validate: validateRichText('Item Description (BN)', {
                    required: true,
                    max: MODAL_DESC_MAX,
                  }),
                  admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(MODAL_DESC_MAX)} অক্ষর।` },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default PlanCardSchema
