// src/payload/blocks/AgentOnboardingForm.ts
import type { Block } from 'payload'

import {
  AGENT_ONBOARDING_FORM_SLUG_AND_TAG,
  AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL,
  AGENT_ONBOARDING_FORM_BLOCK_THUMBNAIL_URL,
  AGENT_ONBOARDING_PAGE,
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

/* ---------------- defaults (Lexical JSON) ---------------- */
const lexicalParagraph = (text: string) => ({
  root: {
    type: 'root',
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
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
      },
    ],
  },
})

const validateSectionId = (val: unknown) => {
  const raw = String(val ?? '')

  // required
  if (!raw.trim()) {
    return 'Section ID is required.'
  }

  // no leading/trailing spaces
  if (raw !== raw.trim()) {
    return 'Section ID must not have leading or trailing spaces.'
  }

  const s = raw.trim()

  // no spaces at all
  if (/\s/.test(s)) {
    return 'No spaces allowed. Use "-" to separate words (e.g., "blog-section", not "blog section").'
  }

  // allowed chars: letters, numbers, hyphen
  if (!/^[A-Za-z0-9-]+$/.test(s)) {
    return 'Section ID can only contain letters, numbers, and hyphens (e.g., "blog-section").'
  }

  return true
}

const DEFAULT_CONSENT_EN = lexicalParagraph(
  'By clicking Submit, you agree to our terms and conditions and privacy policy.',
)
const DEFAULT_CONSENT_BN = lexicalParagraph(
  'সাবমিট বাটনে ক্লিক করলে, আপনি আমাদের শর্তাবলি এবং প্রাইভেসি পলিসি মেনে নিচ্ছেন।',
)

/* ---------------- block ---------------- */
const AgentOnboardingFormSchema: Block = {
  slug: AGENT_ONBOARDING_FORM_SLUG_AND_TAG,
  labels: {
    singular: AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL,
    plural: AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL,
  },

  admin: {
    group: AGENT_ONBOARDING_PAGE,
  },

  imageURL: AGENT_ONBOARDING_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL} preview`,

  fields: [
    // Hidden per-doc session id (kept for parity with your lifecycle)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Appearance ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'bgColor',
          type: 'text',
          label: 'Background Color',
          defaultValue: '#f6eddd',
          required: false,
          validate: validateHexColor('Background Color'),
          admin: {
            description: 'Hex color in #RRGGBB. Default: #f6eddd',
            width: '50%',
          },
        },
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (anchor)',
          required: true,
          admin: {
            width: '50%',
            description:
              'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
          },
          validate: validateSectionId,
        },
      ],
    },

    /* ---------- Agent Form Section (Header) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'formHeader',
          type: 'text',
          label: 'Agent Form Section (Header)',
          required: false,
          defaultValue: 'Agent Form Section',
          maxLength: HEADING_MAX,
          validate: validateShort('Agent Form Section (Header)', HEADING_MAX, false),
          admin: { width: '50%' },
        },
        {
          name: 'formHeaderBN',
          type: 'text',
          label: 'এজেন্ট ফর্ম সেকশন (হেডার)',
          required: false,
          defaultValue: 'এজেন্ট ফর্ম সেকশন',
          maxLength: HEADING_MAX,
          validate: validateShort('Agent Form Section (Header) (BN)', HEADING_MAX, false),
          admin: { width: '50%' },
        },
      ],
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

    /* ---------- Consent (Rich Text, optional) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'consentText',
          type: 'richText',
          label: 'Agent Form Section — Consent Text',
          required: false,
          admin: {
            width: '50%',
            description:
              'Shown near the submit action on the Agent form. Default provided; you can customize.',
          },
          // defaultValue: DEFAULT_CONSENT_EN,
        },
        {
          name: 'consentTextBN',
          type: 'richText',
          label: 'এজেন্ট ফর্ম সেকশন — কনসেন্ট টেক্সট (বাংলা)',
          required: false,
          admin: {
            width: '50%',
            description:
              'এজেন্ট ফর্মের সাবমিট বাটনের কাছে প্রদর্শিত হবে। ডিফল্ট দেয়া আছে; প্রয়োজনে সম্পাদনা করুন।',
          },
          // defaultValue: DEFAULT_CONSENT_BN,
        },
      ],
    },
  ],
}

export default AgentOnboardingFormSchema
