// src/payload/blocks/CorporateIntro.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  CORPORATE_INTRO_BLOCK_LABEL,
  CORPORATE_INTRO_BLOCK_THUMBNAIL_URL,
  CORPORATE_INTRO_SLUG_AND_TAG,
} from '@/lib/constants'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const DESC_MAX = 400 // ~1–3 short paragraphs, adjust as you like
const STAT_LABEL_MAX = 50

/* ---------------- validators (same style as your other blocks) ---------------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional
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

/* ---------- rich text (Lexical) helpers: same technique you used before ---------- */
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
const CorporateIntroSchema: Block = {
  slug: CORPORATE_INTRO_SLUG_AND_TAG,
  labels: {
    singular: CORPORATE_INTRO_BLOCK_LABEL,
    plural: CORPORATE_INTRO_BLOCK_LABEL,
  },

  imageURL: CORPORATE_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CORPORATE_INTRO_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#9A4E46',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #9A4E46). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    /* ---------- Title (EN/BN) ---------- */
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
          admin: {
            width: '50%',
            description: `Primary heading. Max ${TITLE_MAX} characters.`,
          },
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

    /* ---------- Description (EN/BN, rich text) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          validate: validateRichText('Description', { required: true, max: DESC_MAX }),
          admin: {
            width: '50%',
            description: `Rich text (about 1–3 short paragraphs). Up to ~${DESC_MAX} characters.`,
          },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'বর্ণনা (বাংলা)',
          validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
          admin: {
            width: '50%',
            description: `রিচ টেক্সট (১–৩টি সংক্ষিপ্ত অনুচ্ছেদ)। সর্বোচ্চ প্রায় ${bnNum(
              DESC_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Stats Title (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'statsTitle',
          type: 'text',
          required: false,
          label: 'Stats Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Stats Title', TITLE_MAX, false),
          admin: {
            width: '50%',
            description: `Heading above the stats section. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'statsTitleBN',
          type: 'text',
          required: false,
          label: 'স্ট্যাটস শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Stats Title (BN)', TITLE_MAX, false),
          admin: {
            width: '50%',
            description: `স্ট্যাটস সেকশনের শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      required: false,
      minRows: 0,
      maxRows: 6,
      labels: { singular: 'Stat', plural: 'Stats' },
      admin: {
        description: 'Add key metrics. Each item has a value and a short label (both EN/BN).',
      },
      fields: [
        // Value (EN/BN) — now TEXT like label
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
              label: 'Value',
              maxLength: STAT_LABEL_MAX,
              validate: validateShortText('Value', STAT_LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `Displayed metric value (e.g., “1.2M” or “25+”). Max ${STAT_LABEL_MAX} characters.`,
              },
            },
            {
              name: 'valueBN',
              type: 'text',
              required: true,
              label: 'ভ্যালু (বাংলা)',
              maxLength: STAT_LABEL_MAX,
              validate: validateShortText('Value (BN)', STAT_LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `প্রদর্শিত মান (যেমন “১.২M” বা “২৫+”). সর্বোচ্চ ${bnNum(
                  STAT_LABEL_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        // Label (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
              maxLength: STAT_LABEL_MAX,
              validate: validateShortText('Label', STAT_LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `Short label (e.g., “Policies Issued”). Max ${STAT_LABEL_MAX} characters.`,
              },
            },
            {
              name: 'labelBN',
              type: 'text',
              required: true,
              label: 'লেবেল (বাংলা)',
              maxLength: STAT_LABEL_MAX,
              validate: validateShortText('Label (BN)', STAT_LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত লেবেল। সর্বোচ্চ ${bnNum(STAT_LABEL_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CorporateIntroSchema
