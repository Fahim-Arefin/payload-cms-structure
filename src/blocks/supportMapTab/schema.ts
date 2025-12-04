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

// generalized so we can use it for topTitle / label / etc.
const validateHighlightedInField =
  (label: string, targetField: string, max = HIGHLIGHT_MAX) =>
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
    /* ---------------- Top section (optional) ---------------- */
    {
      type: 'row',
      fields: [
        {
          name: 'topTitle',
          type: 'text',
          label: 'Top Title',
          required: false,
          maxLength: LABEL_MAX,
          validate: validateShortText('Top Title', LABEL_MAX, false),
          admin: {
            width: '50%',
            description: `Optional heading above the tabs.`,
          },
        },
        {
          name: 'topTitleBN',
          type: 'text',
          label: 'Top Title (BN)',
          required: false,
          maxLength: LABEL_MAX,
          validate: validateShortText('Top Title (BN)', LABEL_MAX, false),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক শিরোনাম (ট্যাবগুলোর উপরে)।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedTopTitle',
          type: 'text',
          label: 'Highlighted Top Title (within Top Title)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField('Highlighted Top Title', 'topTitle', HIGHLIGHT_MAX),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Top Title.`,
          },
        },
        {
          name: 'highlightedTopTitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (Top Title-এর মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Top Title (BN)',
            'topTitleBN',
            HIGHLIGHT_MAX,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সংশ্লিষ্ট বাংলা Top Title-এর ভিতরে হুবহু থাকতে হবে।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'topDescription',
          type: 'richText',
          label: 'Top Description',
          validate: validateRichText('Top Description', {
            required: false,
            max: RICHTEXT_CHAR_MAX,
          }),
          admin: {
            width: '50%',
            description: `Optional rich text paragraph above the tabs.`,
          },
        },
        {
          name: 'topDescriptionBN',
          type: 'richText',
          label: 'Top Description (BN)',
          validate: validateRichText('Top Description (BN)', {
            required: false,
            max: RICHTEXT_CHAR_MAX,
          }),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক বাংলা বর্ণনা (ট্যাবগুলোর উপরে)।`,
          },
        },
      ],
    },

    /* ---------------- Appearance ---------------- */
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

    /* ---------------- Tab Items (min 1, max 2; branches/hospitals only) ---------------- */
    {
      name: 'tabItems',
      type: 'array',
      label: 'Tab Items',
      minRows: 1,
      maxRows: 2,
      labels: { singular: 'Tab', plural: 'Tabs' },
      admin: {
        description:
          'At least 1 and at most 2 tabs. Values must be either "branches" or "hospitals", each used at most once.',
      },
      validate: (val: unknown) => {
        const arr = Array.isArray(val) ? val : []
        if (arr.length < 1) return 'You must provide at least 1 Tab Item.'
        if (arr.length > 2) return 'You can provide at most 2 Tab Items.'

        const values = arr.map((r: any) => r?.value).filter(Boolean)
        const set = new Set(values)
        if (values.length !== set.size)
          return 'Each tab value must be unique (use "branches" and/or "hospitals" once each).'

        return true
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'select',
              label: 'Value (key)',
              required: true,
              options: [
                { label: 'Branches', value: 'branches' },
                { label: 'Hospitals', value: 'hospitals' },
              ],
              defaultValue: 'branches',
              admin: {
                width: '33%',
                description:
                  'Fixed key used by frontend logic and navigation. Must be either "branches" or "hospitals".',
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
              validate: validateHighlightedInField('Highlighted Text', 'label', HIGHLIGHT_MAX),
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
              validate: validateHighlightedInField('Highlighted Text (BN)', 'labelBN', HIGHLIGHT_MAX),
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
