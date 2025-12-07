// src/payload/blocks/FaqTabs.ts
import type { Block } from 'payload'
import {
  SUPPORT_FAQ_TAB_SLUG_AND_TAG,
  SUPPORT_FAQ_TAB_BLOCK_LABEL,
  SUPPORT_FAQ_TAB_BLOCK_THUMBNAIL_URL,
  SUPPORT_PAGE,
} from '@/lib/constants'
import { faqData } from '@/lib/faqData'

const TITLE_MAX = 200
const BTN_TEXT_MAX = 24

const validateShort =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be ≤ ${max} characters.`
  }

// ✅ Hex color validator
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

// Very simple Lexical JSON from an array of paragraphs
const makeLexicalFromStrings = (paras: string[] | undefined | null): any => {
  const safe = (paras ?? []).map((p) => (p ?? '').toString().trim()).filter(Boolean)

  if (!safe.length) {
    // empty Lexical state
    return {
      root: {
        type: 'root',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [],
      },
    }
  }

  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: safe.map((text) => ({
        type: 'paragraph',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            text,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      })),
    },
  }
}

const FAQ_CATEGORIES_DEFAULT = [
  {
    key: 'general',
    title: 'General Query',
    titleBN: 'সাধারণ জিজ্ঞাসা',
    items: faqData.general.map((item) => ({
      title: item.title,
      titleBN: item.titleBN ?? '',
      desc: makeLexicalFromStrings(item.content),
      descBN: makeLexicalFromStrings(item.contentBN),
    })),
  },
  {
    key: 'claims',
    title: 'Claim',
    titleBN: 'ক্লেইম',
    items: faqData.claims.map((item) => ({
      title: item.title,
      titleBN: item.titleBN ?? '',
      desc: makeLexicalFromStrings(item.content),
      descBN: makeLexicalFromStrings(item.contentBN),
    })),
  },
  {
    key: 'policy',
    title: 'New Policy',
    titleBN: 'নতুন পলিসি',
    items: faqData.policy.map((item) => ({
      title: item.title,
      titleBN: item.titleBN ?? '',
      desc: makeLexicalFromStrings(item.content),
      descBN: makeLexicalFromStrings(item.contentBN),
    })),
  },
  {
    key: 'customer',
    title: 'Customer Care',
    titleBN: 'কাস্টমার কেয়ার',
    items: faqData.customer.map((item) => ({
      title: item.title,
      titleBN: item.titleBN ?? '',
      desc: makeLexicalFromStrings(item.content),
      descBN: makeLexicalFromStrings(item.contentBN),
    })),
  },
  {
    key: 'product',
    title: 'Product',
    titleBN: 'পণ্য',
    items: faqData.product.map((item) => ({
      title: item.title,
      titleBN: item.titleBN ?? '',
      desc: makeLexicalFromStrings(item.content),
      descBN: makeLexicalFromStrings(item.contentBN),
    })),
  },
  {
    key: 'insurance',
    title: 'Group Insurance',
    titleBN: 'গ্রুপ ইন্স্যুরেন্স',
    items: faqData.insurance.map((item) => ({
      title: item.title,
      titleBN: item.titleBN ?? '',
      desc: makeLexicalFromStrings(item.content),
      descBN: makeLexicalFromStrings(item.contentBN),
    })),
  },
] as const

const VALID_FAQ_KEYS = [
  { label: 'General Query', value: 'general' },
  { label: 'Claim', value: 'claims' },
  { label: 'New Policy', value: 'policy' },
  { label: 'Customer Care', value: 'customer' },
  { label: 'Product', value: 'product' },
  { label: 'Group Insurance', value: 'insurance' },
] as const

const FaqTabsSchema: Block = {
  slug: SUPPORT_FAQ_TAB_SLUG_AND_TAG,
  admin: {
    group: SUPPORT_PAGE,
  },
  labels: { singular: SUPPORT_FAQ_TAB_BLOCK_LABEL, plural: SUPPORT_FAQ_TAB_BLOCK_LABEL },
  imageURL: SUPPORT_FAQ_TAB_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SUPPORT_FAQ_TAB_BLOCK_LABEL} preview`,

  fields: [
    /* ---------------------- FAQ TAB (unchanged) ---------------------- */
    {
      name: 'faqTab',
      type: 'group',
      label: 'FAQ Tab',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Section ID (key)',
              required: true,
              defaultValue: 'general',
              maxLength: TITLE_MAX,
              validate: validateShort('Section ID', TITLE_MAX, true),
              admin: {
                width: '25%',
                description:
                  'Internal key used by frontend routing. Typically "general" for this FAQ tab.',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              defaultValue: 'General Forms',
              maxLength: TITLE_MAX,
              validate: validateShort('Label', TITLE_MAX, true),
              admin: { width: '37.5%' },
            },
            {
              name: 'labelBN',
              type: 'text',
              label: 'লেবেল (বাংলা)',
              required: true,
              defaultValue: 'সাধারণ জিজ্ঞাসা',
              maxLength: TITLE_MAX,
              validate: validateShort('Label (BN)', TITLE_MAX, true),
              admin: { width: '37.5%' },
            },
          ],
        },

        {
          name: 'backgroundColor',
          type: 'text',
          label: 'FAQ Background Color',
          defaultValue: '#F6EDDD',
          validate: validateHexColor,
          admin: {
            description: 'Hex color in #RRGGBB (e.g., #F6EDDD).',
            width: '33%',
          },
        },

        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'FAQ Title',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShort('FAQ Title', TITLE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'titleBN',
              type: 'text',
              label: 'FAQ Title (BN)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShort('FAQ Title (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },

        {
          name: 'categories',
          type: 'array',
          label: 'FAQ Categories (exactly 6, unique)',
          minRows: 6,
          maxRows: 6,
          admin: {
            description: 'Pick each category once. Then add many Q&A items under each category.',
          },
          defaultValue: FAQ_CATEGORIES_DEFAULT,
          validate: (value) => {
            const arr = (value ?? []) as any[]
            if (!Array.isArray(arr)) return true
            const keys = arr.map((r) => r?.key).filter(Boolean)
            const set = new Set(keys)
            if (keys.length !== set.size) return 'Each category can be selected only once.'
            return true
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'key',
                  type: 'select',
                  label: 'Category',
                  required: true,
                  options: [VALID_FAQ_KEYS].flat(),
                  admin: { width: '30%' },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Category Title',
                  required: true,
                  maxLength: TITLE_MAX,
                  validate: validateShort('Category Title', TITLE_MAX, true),
                  admin: { width: '35%' },
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'ক্যাটাগরি শিরোনাম (বাংলা)',
                  required: false,
                  maxLength: TITLE_MAX,
                  validate: validateShort('Category Title (BN)', TITLE_MAX, false),
                  admin: { width: '35%' },
                },
              ],
            },
            {
              name: 'items',
              type: 'array',
              label: 'Q&A Items',
              minRows: 1,
              admin: { description: 'Add as many questions as needed for this category.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Question Title',
                      required: true,
                      maxLength: TITLE_MAX,
                      validate: validateShort('Question Title', TITLE_MAX, true),
                      admin: { width: '50%' },
                    },
                    {
                      name: 'titleBN',
                      type: 'text',
                      label: 'প্রশ্ন (বাংলা)',
                      required: false,
                      maxLength: TITLE_MAX,
                      validate: validateShort('Question Title (BN)', TITLE_MAX, false),
                      admin: { width: '50%' },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'desc',
                      type: 'richText',
                      label: 'Answer (Rich Text)',
                      required: false,
                      admin: { width: '50%' },
                    },
                    {
                      name: 'descBN',
                      type: 'richText',
                      label: 'উত্তর (রিচ টেক্সট)',
                      required: false,
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
          // defaultValue: [
          //   { key: 'general', title: 'General Query', titleBN: 'সাধারণ জিজ্ঞাসা' },
          //   { key: 'claims', title: 'Claim', titleBN: 'ক্লেইম' },
          //   { key: 'policy', title: 'New Policy', titleBN: 'নতুন পলিসি' },
          //   { key: 'customer', title: 'Customer Care', titleBN: 'কাস্টমার কেয়ার' },
          //   { key: 'product', title: 'Product', titleBN: 'পণ্য' },
          //   { key: 'insurance', title: 'Group Insurance', titleBN: 'গ্রুপ ইন্স্যুরেন্স' },
          // ],
        },
      ],
    },

    /* ---------------------- DOWNLOAD FORMS TAB (flattened) ---------------------- */

    // Small heading-style field (optional)
    {
      name: 'formsTabSectionLabel',
      type: 'text',
      label: 'Download Forms Tab – Admin Label (optional)',
      required: false,
      defaultValue: 'Download Forms Tab',
      admin: {
        description: 'Purely for editor clarity. Not used on frontend.',
        width: '50%',
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'formsTabValue',
          type: 'text',
          label: 'Download Forms Tab Value (key)',
          required: true,
          defaultValue: 'form',
          maxLength: TITLE_MAX,
          validate: validateShort('Tab Value', TITLE_MAX, true),
          admin: {
            width: '25%',
            description:
              'Internal key used by frontend routing. Typically "form" for this Download Forms tab.',
          },
        },
        {
          name: 'formsTabLabel',
          type: 'text',
          label: 'Download Forms Tab Label',
          required: true,
          defaultValue: 'Download Forms',
          maxLength: TITLE_MAX,
          validate: validateShort('Label', TITLE_MAX, true),
          admin: { width: '37.5%' },
        },
        {
          name: 'formsTabLabelBN',
          type: 'text',
          label: 'Download Forms Tab Label (BN)',
          required: true,
          defaultValue: 'ডাউনলোড ফরম',
          maxLength: TITLE_MAX,
          validate: validateShort('Label (BN)', TITLE_MAX, true),
          admin: { width: '37.5%' },
        },
      ],
    },

    {
      name: 'formsBackgroundColor',
      type: 'text',
      label: 'Forms Table Background Color',
      defaultValue: '#F6EDDD',
      validate: validateHexColor,
      admin: {
        description: 'Hex color in #RRGGBB (e.g., #F6EDDD).',
        width: '33%',
      },
    },

    {
      name: 'formsTableHeaderBgColor',
      type: 'text',
      label: 'Table Header Background Color',
      defaultValue: '#a08d2c',
      validate: validateHexColor,
      admin: {
        description: 'Hex color in #RRGGBB (e.g., #a08d2c).',
        width: '33%',
      },
    },

    {
      type: 'row',
      fields: [
        {
          name: 'formsButtonText',
          type: 'text',
          label: 'Button Text',
          required: false,
          defaultValue: 'Download',
          maxLength: BTN_TEXT_MAX,
          validate: validateShort('Button Text', BTN_TEXT_MAX, false),
          admin: {
            width: '50%',
            description: 'Used for all rows. No links/IDs stored here.',
          },
        },
        {
          name: 'formsButtonTextBN',
          type: 'text',
          label: 'বোতামের লেখা (বাংলা)',
          required: false,
          defaultValue: 'ডাউনলোড',
          maxLength: BTN_TEXT_MAX,
          validate: validateShort('Button Text (BN)', BTN_TEXT_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },

    {
      name: 'forms',
      type: 'array',
      label: 'Forms',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              maxLength: TITLE_MAX,
              validate: validateShort('Title', TITLE_MAX, true),
              admin: { width: '50%' },
            },
            {
              name: 'titleBN',
              type: 'text',
              label: 'শিরোনাম (বাংলা)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShort('Title (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
            {
              name: 'formPDF',
              label: 'Upload Form PDF',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { description: 'Upload/select the brochure PDF.' },
            },
          ],
        },
      ],
    },
  ],
}

export default FaqTabsSchema
