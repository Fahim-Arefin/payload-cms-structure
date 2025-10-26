// src/payload/blocks/Plan.ts
import {
  CUSTOM_CARD_SECTION_BLOCK_LABEL,
  CUSTOM_CARD_SECTION_BLOCK_THUMBNAIL_URL,
  CUSTOM_CARD_SECTION_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'
import CorporateCardsSchema from './corporateCard/schema'
import CustomCardsThumbField from './CustomCardsThumbField'

/* ------------ limits ------------ */
const TITLE_MAX = 100
const SUBTITLE_MAX = 100
const DESC_MAX = 200
const HIGHLIGHT_MAX = 40
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

/* ------------ Block config ------------ */
const CustomCardSectionSchema: Block = {
  slug: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
  labels: {
    singular: CUSTOM_CARD_SECTION_BLOCK_LABEL,
    plural: CUSTOM_CARD_SECTION_BLOCK_LABEL,
  },

  imageURL: CUSTOM_CARD_SECTION_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CUSTOM_CARD_SECTION_BLOCK_LABEL} preview`,

  fields: [
    // {
    //   type: 'ui',
    //   name: 'layoutPreview',
    //   label: 'Layout Preview',
    //   admin: {
    //     components: {
    //       Field: CustomCardsThumbField, // <- pass the component, not JSX
    //     },
    //   },
    // },
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

    // ⬇️ Layout options (2 checkboxes in one row)
    {
      type: 'row',
      fields: [
        {
          name: 'displayAsCarousel',
          type: 'checkbox',
          label: 'Display as Carousel?',
          defaultValue: true,
          admin: {
            width: '50%',
            description:
              'If checked, render cards in a horizontal carousel on desktop & mobile. If unchecked, render as a responsive grid. / চেক করা থাকলে কার্ডগুলো ক্যারোসেলে দেখাবে, না হলে গ্রিডে দেখাবে।',
          },
        },
        {
          name: 'addHorizontalPadding',
          type: 'checkbox',
          label: 'Add horizontal padding around cards?',
          defaultValue: true,
          admin: {
            width: '50%',
            description:
              'Adds padding on the left/right of the card container (padding-x). / কার্ড কন্টেইনারের বাম/ডানে প্যাডিং যোগ করবে।',
          },
        },
      ],
    },

    // ⬇️ NEW: cards-per-view controls (numbers 1–4)
    // Place this block before the `card` field
    {
      type: 'row',
      fields: [
        {
          name: 'mobileCardsPerView',
          type: 'number',
          label: 'Mobile — cards per view',
          defaultValue: 2,
          min: 1,
          max: 4,
          validate: (val: unknown) =>
            Number.isInteger(val) && (val as number) >= 1 && (val as number) <= 4
              ? true
              : 'Enter a whole number between 1 and 4.',
          admin: {
            width: '25%',
            step: 1,
            placeholder: '1–4',
            description:
              'How many cards should be visible on a small phone screen at once? Type a number from 1 to 4. Example: 1 shows one big card; 2 shows two smaller cards side-by-side.',
          },
        },
        {
          name: 'tabletCardsPerView',
          type: 'number',
          label: 'Tablet (md:) — cards per view',
          defaultValue: 2,
          min: 1,
          max: 4,
          validate: (val: unknown) =>
            Number.isInteger(val) && (val as number) >= 1 && (val as number) <= 4
              ? true
              : 'Enter a whole number between 1 and 4.',
          admin: {
            width: '25%',
            step: 1,
            placeholder: '1–4',
            description:
              'How many cards should be visible on tablet screens? Type 1–4. Example: 2 shows two cards across; 3 shows three smaller cards.',
          },
        },
        {
          name: 'laptopCardsPerView',
          type: 'number',
          label: 'Laptop (lg:) — cards per view',
          defaultValue: 3,
          min: 1,
          max: 4,
          validate: (val: unknown) =>
            Number.isInteger(val) && (val as number) >= 1 && (val as number) <= 4
              ? true
              : 'Enter a whole number between 1 and 4.',
          admin: {
            width: '25%',
            step: 1,
            placeholder: '1–4',
            description:
              'How many cards should be visible on laptop screens? Type 1–4. Example: 3 fits three cards neatly in a row.',
          },
        },
        {
          name: 'desktopCardsPerView',
          type: 'number',
          label: 'Desktop (xl/2xl:) — cards per view',
          defaultValue: 4,
          min: 1,
          max: 4,
          validate: (val: unknown) =>
            Number.isInteger(val) && (val as number) >= 1 && (val as number) <= 4
              ? true
              : 'Enter a whole number between 1 and 4.',
          admin: {
            width: '25%',
            step: 1,
            placeholder: '1–4',
            description:
              'How many cards should be visible on large desktop screens? Type 1–4. Example: 3 shows three balanced cards; 4 makes them smaller but fits more.',
          },
        },
      ],
    },

    // ⬇️ replace the previous "corporateCards" field with this:
    {
      name: 'card', // <-- singular name, can hold many cards
      type: 'blocks',
      label: 'Cards',
      required: true,
      minRows: 1,
      maxRows: 1,
      admin: {
        description: 'Please add a card',
      },
      blocks: [CorporateCardsSchema],
    },
  ],
}

export default CustomCardSectionSchema
