// src/payload/blocks/SupportMapTab.ts
import {
  SUPPORT_MAP_TAB_SLUG_AND_TAG,
  SUPPORT_MAP_TAB_BLOCK_LABEL,
  SUPPORT_MAP_TAB_BLOCK_THUMBNAIL_URL,
  SUPPORT_PAGE,
} from '@/lib/constants'
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'

/* ---------------- limits ---------------- */
const VALUE_MAX = 40
const LABEL_MAX = 80
const HIGHLIGHT_MAX = 40
const RICHTEXT_CHAR_MAX = 4000
const COLOR_HEX_LEN = 7

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateHighlightedInLabel =
  (label: string, targetField: 'label' | 'labelBN', max = HIGHLIGHT_MAX) =>
  (val: unknown, { siblingData }: any) => {
    const hl = (val ?? '').toString().trim()
    if (!hl) return true
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

/** text-present check for Lexical rich text */
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
      for (const k of Object.keys(node)) k !== 'text' && stack.push(node[k])
  }
  return false
}

/** character count for Lexical rich text */
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
      for (const k of Object.keys(node)) k !== 'text' && stack.push(node[k])
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

/* ---------------- block ---------------- */
const SupportMapTabSchema: Block = {
  slug: SUPPORT_MAP_TAB_SLUG_AND_TAG,
  labels: {
    singular: SUPPORT_MAP_TAB_BLOCK_LABEL,
    plural: SUPPORT_MAP_TAB_BLOCK_LABEL,
  },

  admin: {
    group: SUPPORT_PAGE,
  },

  imageURL: SUPPORT_MAP_TAB_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SUPPORT_MAP_TAB_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      type: 'row',
      fields: [
        {
          name: 'primaryLabelColor',
          type: 'text',
          label: 'Primary Label Color',
          defaultValue: '#ED7125',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          admin: {
            width: '33%',
            description: `Hex color in #RRGGBB (default #ED7125). Length ${COLOR_HEX_LEN} (${bnNum(
              COLOR_HEX_LEN,
            )}).`,
          },
        },
        {
          name: 'secondaryLabelColor',
          type: 'text',
          label: 'Secondary Label Color',
          defaultValue: '#9C8639',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          admin: {
            width: '33%',
            description: `Hex color in #RRGGBB (default #9C8639). Length ${COLOR_HEX_LEN} (${bnNum(
              COLOR_HEX_LEN,
            )}).`,
          },
        },
      ],
    },

    // ✅ EXACTLY TWO TAB ITEMS
    {
      name: 'tabItems',
      type: 'array',
      label: 'Tab Items',
      minRows: 2, // CHANGED
      maxRows: 2, // CHANGED
      labels: { singular: 'Tab', plural: 'Tabs' },
      admin: {
        description: 'Exactly 2 tabs are required.',
      },
      validate: (val: unknown) => {
        const arr = Array.isArray(val) ? val : []
        return arr.length === 2
          ? true
          : `You must provide exactly 2 Tab Items (currently ${arr.length}).`
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Value (key)',
              required: true,
              maxLength: VALUE_MAX,
              validate: validateShortText('Value', VALUE_MAX, true),
              admin: {
                width: '33%',
                description:
                  'Unique key for this tab item (e.g., "branches", "hospitals"). Must match usage in code. Also for navigation.',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              maxLength: LABEL_MAX,
              validate: validateShortText('Label', LABEL_MAX, true),
              admin: { width: '33%' },
            },
            {
              name: 'labelBN',
              type: 'text',
              label: 'লেবেল (বাংলা)',
              required: true,
              maxLength: LABEL_MAX,
              validate: validateShortText('Label (BN)', LABEL_MAX, true),
              admin: { width: '34%' },
            },
            {
              name: 'highlightedLabel',
              type: 'text',
              label: 'Highlighted Text (within label)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInLabel('Highlighted Text', 'label', HIGHLIGHT_MAX),
              admin: {
                width: '50%',
                description: `Optional. Must appear verbatim inside the corresponding Label.`,
              },
            },
            {
              name: 'highlightedLabelBN',
              type: 'text',
              label: 'রঙিন টেক্সট (লেবেলের মধ্যে)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInLabel(
                'Highlighted Text (BN)',
                'labelBN',
                HIGHLIGHT_MAX,
              ),
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। সংশ্লিষ্ট বাংলা লেবেলের ভিতরে হুবহু থাকতে হবে।`,
              },
            },
          ],
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Description',
          validate: validateRichText('Description', { required: false, max: RICHTEXT_CHAR_MAX }),
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'বর্ণনা (বাংলা)',
          validate: validateRichText('Description (BN)', {
            required: false,
            max: RICHTEXT_CHAR_MAX,
          }),
        },
      ],
    },
  ],
}

export default SupportMapTabSchema
