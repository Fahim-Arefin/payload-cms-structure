// src/payload/blocks/MultiStageIntro.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  MULTI_STAGE_INTRO_SLUG_AND_TAG,
  MULTI_STAGE_INTRO_BLOCK_LABEL,
  MULTI_STAGE_INTRO_BLOCK_THUMBNAIL_URL,
  COMMON,
} from '@/lib/constants'

/* ------------ limits ------------ */
const TEXT_MAX = 500
const SUBTITLE_MAX = 500
const HILITE_MAX = 500
const COLOR_HEX_LEN = 7
const DESC_MAX = 500

/* ------------ validators ------------ */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHighlightedInField =
  (label: string, targetField: any, max = HILITE_MAX) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true // optional
    if (hl.length > max) return `${label} must be at most ${max} characters.`
    const base = (siblingData?.[targetField] ?? '').toString()
    return base.includes(hl) ? true : `${label} must exist within ${targetField} exactly.`
  }

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
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

/* ------------ block ------------ */
const MultiStageIntroSchema: Block = {
  slug: MULTI_STAGE_INTRO_SLUG_AND_TAG,
  labels: {
    singular: MULTI_STAGE_INTRO_BLOCK_LABEL,
    plural: MULTI_STAGE_INTRO_BLOCK_LABEL,
  },
  admin: {
    group: COMMON,
  },

  imageURL: MULTI_STAGE_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${MULTI_STAGE_INTRO_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#F6EDDD',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Text',
          required: true,
          maxLength: TEXT_MAX,
          validate: validateShortText('Text', TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `Main line. Max ${TEXT_MAX} characters.`,
          },
        },
        {
          name: 'textBN',
          type: 'text',
          label: 'টেক্সট (বাংলা)',
          required: true,
          maxLength: TEXT_MAX,
          validate: validateShortText('Text (BN)', TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `মূল লাইন। সর্বোচ্চ ${bnNum(TEXT_MAX)} অক্ষর।`,
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
          label: 'Highlighted Text (within Text)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'text', HILITE_MAX),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside “Text”. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'হাইলাইটেড টেক্সট (টেক্সটের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text (BN)', 'textBN', HILITE_MAX),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। “টেক্সট (বাংলা)” এর ভেতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
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
          label: 'Subtitle',
          required: false,
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, false),
          admin: {
            width: '50%',
            description: `Secondary line. Max ${SUBTITLE_MAX} characters.`,
          },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          label: 'সাবটাইটেল (বাংলা)',
          required: false,
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, false),
          admin: {
            width: '50%',
            description: `সেকেন্ডারি লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
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
          label: 'Highlighted Subtitle (within Subtitle)',
          maxLength: HILITE_MAX,
          // validate: validateHighlightedInField('Highlighted Subtitle', 'subtitle', HILITE_MAX),
          validate: validateHighlightedInField('Highlighted Subtitle', 'subtitle', HILITE_MAX),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside “Subtitle”. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedSubtitleBN',
          type: 'text',
          label: 'হাইলাইটেড সাবটাইটেল (সাবটাইটেলের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Subtitle (BN)',
            'subtitleBN',
            HILITE_MAX,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। “সাবটাইটেল (বাংলা)” এর ভেতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
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
  ],
}

export default MultiStageIntroSchema
