// src/payload/blocks/CustomAccordion.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils' // optional; remove if you don't show BN counts in admin
import {
  CUSTOM,
  CUSTOM_ACCORDION_BLOCK_LABEL,
  CUSTOM_ACCORDION_BLOCK_THUMBNAIL_URL,
  CUSTOM_ACCORDION_SLUG_AND_TAG,
} from '@/lib/constants'

/* ---------------- limits ---------------- */
const TITLE_MAX = 120
const DESC_MAX_WORDS = 800
const RICHTEXT_DESC_MAX = 1600

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Word-limit validator for plain text fields */
const validateMaxWords =
  (label: string, maxWords: number, required = false) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    const words = s.split(/\s+/).filter(Boolean)
    return words.length <= maxWords
      ? true
      : `${label} must be at most ${maxWords} words (currently ${words.length}).`
  }

/* ---------------- rich text (Lexical) validators — same technique as BOD/Leaders ---------------- */
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
    if (Array.isArray(node)) {
      for (const c of node) stack.push(c)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push((node as any)[k])
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
      for (const c of node) stack.push(c)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push((node as any)[k])
      }
    }
  }
  return count
}

/** Single source-of-truth validator for richText fields (handles required + max) */
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

/* ---------------- block ---------------- */
const CustomAccordionSchema: Block = {
  // swap to your constants if you have them:
  slug: CUSTOM_ACCORDION_SLUG_AND_TAG,

  labels: {
    singular: CUSTOM_ACCORDION_BLOCK_LABEL,
    plural: CUSTOM_ACCORDION_BLOCK_LABEL,
  },

  admin: {
    group: CUSTOM,
  },

  imageURL: CUSTOM_ACCORDION_BLOCK_THUMBNAIL_URL,
  imageAltText: CUSTOM_ACCORDION_BLOCK_LABEL,

  fields: [
    /* -------- top description (plain text, max 800 words) -------- */
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          required: false,
          validate: validateMaxWords('Description', DESC_MAX_WORDS, false),
          admin: {
            width: '50%',
            description: `Plain text. Maximum ${DESC_MAX_WORDS} words.`,
          },
        },
        {
          name: 'descriptionBN',
          type: 'text',
          label: 'বর্ণনা (বাংলা)',
          required: false,
          validate: validateMaxWords('বর্ণনা (বাংলা)', DESC_MAX_WORDS, false),
          admin: {
            width: '50%',
            description: `প্লেইন টেক্সট। সর্বোচ্চ ${bnNum?.(DESC_MAX_WORDS) ?? DESC_MAX_WORDS} শব্দ।`,
          },
        },
      ],
    },

    /* -------- accordion items -------- */
    {
      name: 'data',
      type: 'array',
      label: 'Accordion Items',
      minRows: 1,
      labels: { singular: 'Accordion Item', plural: 'Accordion Items' },
      admin: {
        description: 'Each item has EN/BN main titles and EN/BN rich-text “points”.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'mainTitle',
              type: 'text',
              label: 'Main Title',
              required: true,
              maxLength: TITLE_MAX,
              validate: validateShortText('Main Title', TITLE_MAX, true),
              admin: { width: '50%' },
            },
            {
              name: 'mainTitleBN',
              type: 'text',
              label: 'মূল শিরোনাম (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShortText('Main Title (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'points',
              type: 'richText',
              label: 'Points (Rich Text)',
              required: true,
              validate: validateRichText('Points', { required: true, max: RICHTEXT_DESC_MAX }),
              admin: {
                width: '50%',
                description: 'Add paragraphs / bullet points.',
              },
            },
            {
              name: 'pointsBN',
              type: 'richText',
              label: 'পয়েন্টসমূহ (রিচ টেক্সট)',
              required: false,
              validate: validateRichText('পয়েন্টসমূহ', { required: false, max: RICHTEXT_DESC_MAX }),
              admin: {
                width: '50%',
                description: 'অনুচ্ছেদ / বুলেট পয়েন্ট যোগ করুন।',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CustomAccordionSchema
