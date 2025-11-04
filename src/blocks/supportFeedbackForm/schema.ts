// src/payload/blocks/SupportFeedback.ts
import type { Block } from 'payload'

import {
  SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG,
  SUPPORT_FEEDBACK_FORM_BLOCK_LABEL,
  SUPPORT_FEEDBACK_FORM_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'

import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 120
const HILITE_MAX = 80
const BTN_TEXT_MAX = 40

/* ---------------- validators ---------------- */
const validateShort =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be ≤ ${max} characters.`
  }

/* ---------------- block ---------------- */
const SupportFeedbackSchema: Block = {
  slug: SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG,
  labels: {
    singular: SUPPORT_FEEDBACK_FORM_BLOCK_LABEL,
    plural: SUPPORT_FEEDBACK_FORM_BLOCK_LABEL,
  },
  imageURL: SUPPORT_FEEDBACK_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SUPPORT_FEEDBACK_FORM_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle (used by cropper + hooks)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Left side: Title + HighlightedTitle (EN/BN) ---------- */
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
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedTitle',
          type: 'text',
          label: 'Highlighted Title',
          required: false,
          maxLength: HILITE_MAX,
          validate: validateShort('Highlighted Title', HILITE_MAX, false),
          admin: { width: '50%' },
        },
        {
          name: 'highlightedTitleBN',
          type: 'text',
          label: 'হাইলাইটেড শিরোনাম (বাংলা)',
          required: false,
          maxLength: HILITE_MAX,
          validate: validateShort('Highlighted Title (BN)', HILITE_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },

    /* ---------- Background image (outside any group) ---------- */
    ...generateImageFields({
      ownerCollection: SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG as any,
      fieldName: 'backgroundImage',
      label: 'Background Image — 16:9',
      description: 'Hero/section background. Recommended 16:9.',
      aspectRatio: 16 / 9,
      quality: 0.92,
      maxKB: 700,
    }),

    /* ---------- Right side: Title + Button Text (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'rightTitle',
          type: 'text',
          label: 'Right Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShort('Right Title', TITLE_MAX, true),
          admin: { width: '50%' },
        },
        {
          name: 'rightTitleBN',
          type: 'text',
          label: 'ডান পাশের শিরোনাম (বাংলা)',
          required: false,
          maxLength: TITLE_MAX,
          validate: validateShort('Right Title (BN)', TITLE_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rightButtonText',
          type: 'text',
          label: 'Right Button Text',
          required: true,
          maxLength: BTN_TEXT_MAX,
          validate: validateShort('Right Button Text', BTN_TEXT_MAX, true),
          admin: { width: '50%' },
        },
        {
          name: 'rightButtonTextBN',
          type: 'text',
          label: 'ডান পাশের বাটন টেক্সট (বাংলা)',
          required: false,
          maxLength: BTN_TEXT_MAX,
          validate: validateShort('Right Button Text (BN)', BTN_TEXT_MAX, false),
          admin: { width: '50%' },
        },
      ],
    },
  ],
}

export default SupportFeedbackSchema
