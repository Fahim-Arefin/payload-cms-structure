// src/payload/blocks/CareerAuraShape.ts
import type { Block } from 'payload'
import {
  COMMON,
  CAREER_SHAPE_BLOCK_LABEL,
  CAREER_SHAPE_BLOCK_THUMBNAIL_URL,
  CAREER_SHAPE_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TITLE_MAX = 80
const DESC_MAX = 600
const CTA_BUTTON_TEXT_MAX = 24

/* ---------- basic validators ---------- */
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

/* ---------- rich text helpers (Lexical) ---------- */
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
    if (Array.isArray(node)) stack.push(...node)
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
    if (Array.isArray(node)) stack.push(...node)
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

/* ---------- block ---------- */
const CareerShapeSchema: Block = {
  slug: CAREER_SHAPE_SLUG_AND_TAG,
  labels: {
    singular: CAREER_SHAPE_BLOCK_LABEL,
    plural: CAREER_SHAPE_BLOCK_LABEL,
  },

  admin: { group: COMMON },
  imageURL: CAREER_SHAPE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CAREER_SHAPE_BLOCK_LABEL} preview`,

  fields: [
    /* ---------- Background Image (full-width hero) ---------- */
    ...generateImageFields({
      fieldName: 'backgroundImage',
      label: 'Background Image (16:9)',
      description: 'Full-width background image behind the overlay content. 16:9 recommended.',
      aspectRatio: 16 / 9,
      quality: 0.9,
      maxKB: 800,
    } as any),

    /* ---------- Leading Title (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'leadingTitle',
          type: 'text',
          label: 'Leading Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Leading Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Main heading (e.g., "READY TO SHAPE YOUR FUTURE?"). Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'leadingTitleBN',
          type: 'text',
          label: 'লিডিং শিরোনাম (বাংলা)',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Leading Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Leading Description (EN/BN, rich text) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'leadingDescription',
          type: 'richText',
          label: 'Leading Description',
          validate: validateRichText('Leading Description', { required: true, max: DESC_MAX }),
          admin: {
            width: '50%',
            description: `Main paragraph under the title. Up to ~${DESC_MAX} characters.`,
          },
        },
        {
          name: 'leadingDescriptionBN',
          type: 'richText',
          label: 'লিডিং বর্ণনা (বাংলা)',
          validate: validateRichText('Leading Description (BN)', {
            required: true,
            max: DESC_MAX,
          }),
          admin: {
            width: '50%',
            description: `প্রধান বর্ণনা। সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Optional CTA Button (EN/BN) ---------- */
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
            description: `Optional. Text shown on the button (e.g., "Apply Now"). Max ${CTA_BUTTON_TEXT_MAX} characters.`,
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
            description: `ঐচ্ছিক। বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(
              CTA_BUTTON_TEXT_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },
    {
      name: 'buttonLink',
      label: 'CTA Link (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      validate: validateCTALinkRequiredIfAnyText,
      admin: {
        description:
          'Pick an internal Page to navigate to when the CTA button is clicked (required only if CTA text is set).',
      },
    },
  ],
}

export default CareerShapeSchema
