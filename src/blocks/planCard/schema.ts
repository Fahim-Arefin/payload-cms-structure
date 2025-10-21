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
const TITLE_MAX = 40
const SUBTITLE_MAX = 40
const CARD_TITLE_MAX = 40
const DESC_MAX = 200
const CARD_DESC_MAX = 100
const HIGHLIGHT_MAX = 40
const COLOR_HEX_LEN = 7
const CTA_TEXT_MAX = 24

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

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateCardCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'CTA Button Text (EN) is required when any CTA text is provided.'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `CTA Button Text must be at most ${CTA_TEXT_MAX} characters.`
  return true
}

const validateCardCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর হতে পারবে।`
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
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#F6EDDD',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(
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

    // {
    //   type: 'row',
    //   fields: [
    //     {
    //       name: 'description',
    //       type: 'text',
    //       required: true,
    //       label: 'Description',
    //       maxLength: DESC_MAX,
    //       validate: validateShortText('Description', DESC_MAX, true),
    //       admin: {
    //         width: '50%',
    //         description: `1–2 concise lines. Max ${DESC_MAX} characters.`,
    //       },
    //     },
    //     {
    //       name: 'descriptionBN',
    //       type: 'text',
    //       required: true,
    //       label: 'বর্ণনা (বাংলা)',
    //       maxLength: DESC_MAX,
    //       validate: validateShortText('Description (BN)', DESC_MAX, true),
    //       admin: {
    //         width: '50%',
    //         description: `১–২টি সংক্ষিপ্ত লাইন। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
    //       },
    //     },
    //   ],
    // },
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
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
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

        // ⬇️ New: Card CTA button texts (EN/BN, optional but paired)
        {
          type: 'row',
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              label: 'CTA Button Text',
              maxLength: CTA_TEXT_MAX,
              validate: validateCardCTAEnglishText,
              admin: {
                width: '50%',
                description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
              },
            },
            {
              name: 'buttonTextBN',
              type: 'text',
              label: 'CTA বাটনের টেক্সট (বাংলা)',
              maxLength: CTA_TEXT_MAX,
              validate: validateCardCTABanglaText,
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
          // required: true,
          validate: validateCTALinkRequiredIfAnyText,
          admin: {
            description:
              'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
          },
        },
      ],
    },
  ],
}

export default PlanCardSchema
