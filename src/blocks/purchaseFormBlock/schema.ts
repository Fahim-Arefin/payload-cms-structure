// src/payload/blocks/PurchaseForm.ts
import type { Block } from 'payload'
import {
  PURCHASE_FORM_SLUG_AND_TAG,
  PURCHASE_FORM_PAGE_BLOCK_LABEL,
  PURCHASE_FORM_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'

/* ---------------- limits ---------------- */
const TITLE_MAX = 120
const COLOR_MAX = 9 // allow #RRGGBB or #RRGGBBAA

/* ---------------- validators ---------------- */
const validateShort =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be ≤ ${max} characters.`
  }

// Accept #RRGGBB or #RRGGBBAA
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(s)
    ? true
    : 'Must be a valid hex color: #RRGGBB or #RRGGBBAA.'
}

/* ---------------- block ---------------- */
const PurchaseFormSchema: Block = {
  slug: PURCHASE_FORM_SLUG_AND_TAG,
  labels: {
    singular: PURCHASE_FORM_PAGE_BLOCK_LABEL,
    plural: PURCHASE_FORM_PAGE_BLOCK_LABEL,
  },
  imageURL: PURCHASE_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PURCHASE_FORM_PAGE_BLOCK_LABEL} preview`,

  fields: [
    // keep parity with your other blocks; reserved for future use
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    /* ---------- Cards (min 1, max 4) ---------- */
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 4,
      labels: {
        singular: 'Card',
        plural: 'Cards',
      },
      admin: {
        description:
          'Add 1–4 cards. Each card has text (EN/BN), rich text description (EN/BN), and a background color.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'cardText',
              type: 'text',
              label: 'Card Text',
              required: true,
              maxLength: TITLE_MAX,
              validate: validateShort('Card Text', TITLE_MAX, true),
              admin: { width: '50%' },
            },
            {
              name: 'cardTextBN',
              type: 'text',
              label: 'Card Text (BN)',
              required: false,
              maxLength: TITLE_MAX,
              validate: validateShort('Card Text (BN)', TITLE_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'cardDesc',
              type: 'richText',
              label: 'Card Description',
              required: false,
              admin: { width: '50%' },
            },
            {
              name: 'cardDescBN',
              type: 'richText',
              label: 'Card Description (BN)',
              required: false,
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'cardBg',
          type: 'text',
          label: 'Card Background Color (#RRGGBB or #RRGGBBAA)',
          required: false,
          maxLength: COLOR_MAX,
          validate: validateHexColor,
          admin: {
            description: 'Example: #9C863940 (with alpha) or #CCBF95 (solid).',
          },
        },
      ],
      // Seed defaults that mirror your current UI tone
      defaultValue: [
        {
          cardText: 'For their future',
          cardTextBN: 'তাদের ভবিষ্যতের জন্য',
          cardBg: '#e6e0ce',
        },
        {
          cardText: 'For your growth',
          cardTextBN: 'আপনার উন্নতির জন্য',
          cardBg: '#ccbf95',
        },
        {
          cardText: 'When life throws a curveball',
          cardTextBN: 'যখন জীবন হঠাৎ আঘাত হানে',
          cardBg: '#baaa76',
        },
      ],
    },

    /* ---------- Purchase Now Form (Consent RichText EN/BN) ---------- */
    {
      name: 'purchaseNowForm',
      type: 'group',
      label: 'Purchase Now Form',
      admin: {
        description: 'Consent text shown under the Purchase form submit button (localized EN/BN).',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'consentText',
              type: 'richText',
              label: 'Consent (EN)',
              admin: {
                width: '50%',
                description: 'Rich text consent displayed in English under the form submit area.',
              },
              // Minimal Lexical JSON default
              defaultValue: {
                root: {
                  type: 'root',
                  direction: null,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      direction: null,
                      version: 1,
                      children: [
                        {
                          type: 'text',
                          text: 'By clicking Purchase Now, you agree to our terms and conditions and privacy policy.',
                          format: 0,
                          detail: 0,
                          mode: 'normal',
                          style: '',
                          version: 1,
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              name: 'consentTextBN',
              type: 'richText',
              label: 'Consent (BN)',
              admin: {
                width: '50%',
                description: 'বাংলা কনসেন্ট টেক্সট (ফর্ম সাবমিট অংশে দেখানো হবে)।',
              },
              defaultValue: {
                root: {
                  type: 'root',
                  direction: null,
                  format: '',
                  indent: 0,
                  version: 1,
                  children: [
                    {
                      type: 'paragraph',
                      format: '',
                      indent: 0,
                      direction: null,
                      version: 1,
                      children: [
                        {
                          type: 'text',
                          text: 'পলিসি কিনতে রিকুয়েস্ট করুন বাটনে ক্লিক করলে আপনি আমাদের টার্মস এন্ড কন্ডিশনস ও শান্তা লাইফের প্রাইভেসি পলিসি মেনে নিচ্ছেন।',
                          format: 0,
                          detail: 0,
                          mode: 'normal',
                          style: '',
                          version: 1,
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

export default PurchaseFormSchema
