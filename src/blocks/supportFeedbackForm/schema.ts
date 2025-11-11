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
const EMAIL_MAX = 120
const FROM_NAME_MAX = 80

/* ---------------- validators ---------------- */
const validateShort =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be ≤ ${max} characters.`
  }

const validateEmail =
  (label = 'Email', required = false) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > EMAIL_MAX) return `${label} must be at most ${EMAIL_MAX} characters.`
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? true : `Provide a valid email for ${label}.`
  }

/** Minimal helper to seed a Lexical rich text default with a single paragraph. */
const makeLexicalDoc = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            version: 1,
            text,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
  },
})

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

    /* ---------- Recipient Emails (1–5) ---------- */
    {
      type: 'group',
      name: 'recipientEmails',
      label: 'Recipient Emails (1–5)',
      admin: {
        description:
          'Provide at least one email address. All valid ones will receive the feedback submission.',
      },
      validate: (_val, { siblingData }: any) => {
        const g = siblingData?.recipientEmails ?? {}
        const any =
          !!(g.email1 && String(g.email1).trim()) ||
          !!(g.email2 && String(g.email2).trim()) ||
          !!(g.email3 && String(g.email3).trim()) ||
          !!(g.email4 && String(g.email4).trim()) ||
          !!(g.email5 && String(g.email5).trim())
        return any ? true : 'Provide at least one recipient email.'
      },
      fields: [
        {
          name: 'email1',
          type: 'text',
          label: 'Recipient Email 1',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 1', false),
          admin: { width: '33%' },
        },
        {
          name: 'email2',
          type: 'text',
          label: 'Recipient Email 2',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 2', false),
          admin: { width: '33%' },
        },
        {
          name: 'email3',
          type: 'text',
          label: 'Recipient Email 3',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 3', false),
          admin: { width: '33%' },
        },
        {
          name: 'email4',
          type: 'text',
          label: 'Recipient Email 4',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 4', false),
          admin: { width: '33%' },
        },
        {
          name: 'email5',
          type: 'text',
          label: 'Recipient Email 5',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 5', false),
          admin: { width: '33%' },
        },
      ],
    },

    /* ---------- Sender Override (optional) ---------- */
    {
      type: 'group',
      name: 'senderOverride',
      label: 'Sender Override (optional)',
      admin: {
        description:
          'If set, feedback emails will use this Sender Name / Reply Email instead of the default SMTP sender.',
      },
      fields: [
        {
          name: 'fromName',
          type: 'text',
          label: 'Sender Name',
          maxLength: FROM_NAME_MAX,
          validate: validateShort('Sender Name', FROM_NAME_MAX, false),
          admin: { width: '50%' },
        },
        {
          name: 'fromEmail',
          type: 'text',
          label: 'Reply Email Address',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Reply Email Address', false),
          admin: { width: '50%' },
        },
      ],
    },

    /* ---------- Consent (rich text EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'consentText',
          type: 'richText',
          label: 'Consent Text',
          required: true,
          defaultValue: makeLexicalDoc(
            'By clicking Send Feedback, you agree to our terms and conditions and privacy policy.'
          ),
          admin: {
            description:
              'Shown near the submit button. You can bold or link “terms and conditions” and “privacy policy”.',
            width: '50%',
          },
        },
        {
          name: 'consentTextBN',
          type: 'richText',
          label: 'সম্মতি টেক্সট (বাংলা)',
          required: true,
          defaultValue: makeLexicalDoc(
            'এখানে ক্লিক করার মাধ্যমে, আপনি আমাদের টার্মস এন্ড কন্ডিশনস , ও প্রাইভেসি পলিসিতে সম্মত করছেন।'
          ),
          admin: {
            description:
              'সাবমিট বাটনের কাছে দেখানো হবে। “টার্মস এন্ড কন্ডিশনস” ও “প্রাইভেসি পলিসি”তে লিংক যোগ করতে পারেন।',
            width: '50%',
          },
        },
      ],
    },
  ],
}

export default SupportFeedbackSchema
