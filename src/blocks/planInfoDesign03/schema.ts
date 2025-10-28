// src/payload/blocks/PlanInfoDesign03.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  PLAN_INFO_DESIGN_03_BLOCK_LABEL,
  PLAN_INFO_DESIGN_03_BLOCK_THUMBNAIL_URL,
  PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'
import BrochureButtonSchema from '../resourcesButton/BrochureButton/schema'
import LinkButtonSchema from '../resourcesButton/LinkButton/schema'

/* ---------- limits ---------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HIGHLIGHT_MAX = 80
const SUBTITLE_MAX = 120
const DESC_MAX = 600
const CARD_TITLE_MAX = 60
const CARD_SUBTITLE_MAX = 120
const ITEM_DESC_MAX = 200

/* ---------- validators (same style as before) ---------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

const validateShortText =
  (label: string, max: number, required = false) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
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

/** Highlight must appear verbatim inside a target text field */
const validateHighlightedInField =
  (label: string, targetField: string, max = TITLE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

// add this helper (near your other validators)
const validateHexColorOrAlpha = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  // #RRGGBB  OR  #RRGGBBAA
  return /^(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{8})$/.test(s)
    ? true
    : 'Must be #RRGGBB or #RRGGBBAA (e.g., #FFFFFF or #FFFFFF20).'
}

/* ---------- block ---------- */
const PlanInfoDesign03Schema: Block = {
  slug: PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
  labels: {
    singular: PLAN_INFO_DESIGN_03_BLOCK_LABEL,
    plural: PLAN_INFO_DESIGN_03_BLOCK_LABEL,
  },
  imageURL: PLAN_INFO_DESIGN_03_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PLAN_INFO_DESIGN_03_BLOCK_LABEL} preview`,

  fields: [
    // Hidden: upload session id for media lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Appearance ---------- */
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FCF4EB',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },

    /* ---------- Section Title / Subtitle (EN/BN, optional) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, false),
          admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'সেকশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, false),
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
          validate: validateHighlightedInField('Highlighted Text', 'title', HIGHLIGHT_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'titleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
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
          label: 'Section Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle', SUBTITLE_MAX, false),
          admin: { width: '50%', description: `Supporting line. Max ${SUBTITLE_MAX} characters.` },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle (BN)', SUBTITLE_MAX, false),
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
          validate: validateHighlightedInField(
            'Highlighted Subtitle',
            'subtitle',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Subtitle. Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedSubtitleBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সাবটাইটেলের মধ্যে)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Highlighted Subtitle (BN)',
            'subtitleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সাবটাইটেলের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Section Description (rich text, optional EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'richText',
          label: 'Section Description',
          validate: validateRichText('Section Description', { required: false, max: DESC_MAX }),
          admin: { width: '50%', description: `Up to ~${DESC_MAX} characters.` },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'সেকশন বর্ণনা (বাংলা)',
          validate: validateRichText('Section Description (BN)', {
            required: false,
            max: DESC_MAX,
          }),
          admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।` },
        },
      ],
    },

    /* ---------- Required Images ---------- */
    // 1) 630 x 700  (aspect ≈ 0.9)
    ...generateImageFields({
      fieldName: 'imageTall',
      label: 'Image Tall (630×700)',
      description: 'Tall image (630×700, aspect ≈ 0.9). Required.',
      aspectRatio: 630 / 700,
      quality: 0.9,
      maxKB: 700,
      required: true,
    } as any),

    // 2) 500 x 370 (aspect ≈ 1.351)
    ...generateImageFields({
      fieldName: 'imageWide',
      label: 'Image Wide (500×370)',
      description: 'Wide image (500×370, aspect ≈ 1.351). Required.',
      aspectRatio: 500 / 370,
      quality: 0.9,
      maxKB: 600,
      required: true,
    } as any),

    /* ---------- Which image to show on Desktop & Mobile ---------- */
    // Select which of the above two should render on desktop and on mobile.
    {
      type: 'row',
      fields: [
        {
          name: 'imageOrder',
          type: 'select',
          label: 'Choose Image Alignment',
          defaultValue: 'left',
          options: [
            { label: 'Show left ', value: 'left' },
            { label: 'Show right', value: 'right' },
          ],
          admin: {
            width: '33%',
            description: 'Select where the image align ',
          },
        },
        {
          name: 'desktopImageChoice',
          type: 'select',
          label: 'Desktop Image',
          defaultValue: 'tall',
          options: [
            { label: 'Use 630×700 (tall)', value: 'tall' },
            { label: 'Use 500×370 (wide)', value: 'wide' },
          ],
          admin: { width: '33%', description: 'Which image to display on desktop layouts.' },
        },
        {
          name: 'mobileImageChoice',
          type: 'select',
          label: 'Mobile Image',
          defaultValue: 'wide',
          options: [
            { label: 'Use 630×700 (tall)', value: 'tall' },
            { label: 'Use 500×370 (wide)', value: 'wide' },
          ],
          admin: { width: '33%', description: 'Which image to display on mobile layouts.' },
        },
      ],
    },

    /* ---------- Card title/subtitle (optional EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'cardTitle',
          type: 'text',
          label: 'Card Title',
          maxLength: CARD_TITLE_MAX,
          validate: validateShortText('Card Title', CARD_TITLE_MAX, false),
          admin: { width: '50%', description: `Max ${CARD_TITLE_MAX} characters.` },
        },
        {
          name: 'cardTitleBN',
          type: 'text',
          label: 'কার্ড শিরোনাম (বাংলা)',
          maxLength: CARD_TITLE_MAX,
          validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, false),
          admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।` },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'cardTitleHighlighted',
          type: 'text',
          label: 'Card Title Highlighted',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Card Title Highlighted',
            'cardTitle',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Card Title. Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'cardTitleHighlightedBN',
          type: 'text',
          label: 'কার্ড শিরোনামের রঙিন টেক্সট (বাংলা)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Card Title Highlighted (BN)',
            'cardTitleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। কার্ড শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'cardSubtitle',
          type: 'text',
          label: 'Card Subtitle',
          maxLength: CARD_SUBTITLE_MAX,
          validate: validateShortText('Card Subtitle', CARD_SUBTITLE_MAX, false),
          admin: { width: '50%', description: `Max ${CARD_SUBTITLE_MAX} characters.` },
        },
        {
          name: 'cardSubtitleBN',
          type: 'text',
          label: 'কার্ড উপশিরোনাম (বাংলা)',
          maxLength: CARD_SUBTITLE_MAX,
          validate: validateShortText('Card Subtitle (BN)', CARD_SUBTITLE_MAX, false),
          admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_SUBTITLE_MAX)} অক্ষর।` },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'cardSubtitleHighlighted',
          type: 'text',
          label: 'Card Subtitle Highlighted',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Card Subtitle Highlighted',
            'cardSubtitle',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside Card Subtitle. Max ${HIGHLIGHT_MAX} characters.`,
          },
        },
        {
          name: 'cardSubtitleHighlightedBN',
          type: 'text',
          label: 'কার্ড সাবটাইটেলের রঙিন টেক্সট (বাংলা)',
          maxLength: HIGHLIGHT_MAX,
          validate: validateHighlightedInField(
            'Card Subtitle Highlighted (BN)',
            'cardSubtitleBN',
            HIGHLIGHT_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। কার্ড সাবটাইটেলের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Card item border (radio) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'cardItemBorder',
          type: 'radio',
          label: 'Card Item Border',
          defaultValue: 'border',
          options: [
            { label: 'Show Border', value: 'border' },
            { label: 'No Border', value: 'no-border' },
          ],
          admin: {
            description: 'Choose whether individual card items should render with a border.',
            width: '33%',
          },
        },
        {
          name: 'cardItemBorderColor',
          type: 'text',
          label: 'Card Border Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#9C8639',
          admin: {
            width: '33%',
            description: `Hex color in #RRGGBB (e.g., #9C8639).`,
          },
        },
        // 🔁 updated field (replaces your existing cardItemBorderBgColor field)
        {
          name: 'cardItemBorderBgColor',
          type: 'text',
          label: 'Card Border Background Color',
          maxLength: 9, // supports #RRGGBB or #RRGGBBAA
          validate: validateHexColorOrAlpha,
          defaultValue: '#FFFFFF80',
          admin: {
            width: '33%',
            description: `Hex color with optional alpha: #RRGGBB or #RRGGBBAA (e.g., #FFFFFF or #FFFFFF80).`,
          },
        },
      ],
    },

    /* ---------- Card Items (array) ---------- */
    {
      name: 'cardItems',
      type: 'array',
      label: 'Card Items',
      required: false,
      minRows: 1,
      maxRows: 12,
      admin: {
        description: 'Each item has an icon (1:1) and a short description (EN/BN).',
      },
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        // icon (1:1)
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon',
          description: 'Square icon (1:1).',
          aspectRatio: 1 / 1,
          quality: 0.92,
          maxKB: 200,
          required: false,
        } as any),
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'text',
              label: 'Description',
              maxLength: ITEM_DESC_MAX,
              validate: validateShortText('Description', ITEM_DESC_MAX, false),
              admin: { width: '50%', description: `Short line. Max ${ITEM_DESC_MAX} characters.` },
            },
            {
              name: 'descriptionBN',
              type: 'text',
              label: 'বর্ণনা (বাংলা)',
              maxLength: ITEM_DESC_MAX,
              validate: validateShortText('Description (BN)', ITEM_DESC_MAX, false),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত লাইন। সর্বোচ্চ ${bnNum(ITEM_DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
    // CTA Buttons Block Layout (outside of hero items)
    {
      name: 'resourceButtons',
      type: 'blocks',
      label: 'Resources Button',
      admin: {
        description: 'Add resource buttons that appear below the content (maximum 3 buttons)',
      },
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      minRows: 1,
      maxRows: 3,
      blocks: [BrochureButtonSchema, LinkButtonSchema],
    },
  ],
}

export default PlanInfoDesign03Schema
