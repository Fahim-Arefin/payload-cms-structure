// src/payload/blocks/AgentOnboardingForm.ts
import type { Block } from 'payload'

import {
  AGENT_ONBOARDING_FORM_SLUG_AND_TAG,
  AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL,
  AGENT_ONBOARDING_FORM_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

/* ---------------- limits ---------------- */
const HEADING_MAX = 120
const SUBDESC_MAX = 300

/* ---------------- validators ---------------- */
const validateShort =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be ≤ ${max} characters.`
  }

const validateHexColor =
  (label = 'Background Color') =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (!s) return true
    return /^#[0-9A-Fa-f]{6}$/.test(s)
      ? true
      : `${label} must be a valid hex color in #RRGGBB (e.g., #FFFFFF).`
  }

/** Minimal Lexical RT validator */
const hasRealLexicalText = (val: any): boolean => {
  if (!val) return false
  const root = (val as any)?.root
  const children = Array.isArray(root?.children) ? root.children : []
  const walk = (nodes: any[]): boolean =>
    nodes.some(
      (n) =>
        (n?.type === 'text' && typeof n.text === 'string' && n.text.trim().length > 0) ||
        (Array.isArray(n?.children) && walk(n.children)),
    )
  return walk(children)
}

const validateRichTextRequired =
  (label = 'Description') =>
  (val: unknown) =>
    hasRealLexicalText(val) ? true : `${label} must contain some text.`

/* ---------------- block ---------------- */
const AgentOnboardingFormSchema: Block = {
  slug: AGENT_ONBOARDING_FORM_SLUG_AND_TAG,
  labels: {
    singular: AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL,
    plural: AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL,
  },
  imageURL: AGENT_ONBOARDING_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL} preview`,

  fields: [
    // Hidden per-doc session id (kept for parity with your lifecycle)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Appearance ---------- */
    {
      name: 'bgColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#f6eddd',
      required: false,
      validate: validateHexColor('Background Color'),
      admin: {
        description: 'Hex color in #RRGGBB. Default: #f6eddd',
        width: '25%',
      },
    },


    /* ---------- Description (Rich Text) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'richText',
          label: 'Description (Rich Text)',
          required: true,
          validate: validateRichTextRequired('Description'),
          admin: { width: '50%' },
        },
        {
          name: 'descriptionBN',
          type: 'richText',
          label: 'বিবরণ (রিচ টেক্সট)',
          required: false,
          validate: (val) => (!val ? true : validateRichTextRequired('Description (BN)')(val)),
          admin: { width: '50%' },
        },
      ],
    },

    /* ---------- Subdescription (Plain Text) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'subdescription',
          type: 'text',
          label: 'Subdescription',
          required: false,
          maxLength: SUBDESC_MAX,
          validate: validateShort('Subdescription', SUBDESC_MAX, false),
          admin: { width: '50%' },
        },
        {
          name: 'subdescriptionBN',
          type: 'text',
          label: 'সাবডিসক্রিপশন (বাংলা)',
          required: false,
          maxLength: SUBDESC_MAX,
          validate: validateShort('Subdescription (BN)', SUBDESC_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },
  ],
}

export default AgentOnboardingFormSchema
