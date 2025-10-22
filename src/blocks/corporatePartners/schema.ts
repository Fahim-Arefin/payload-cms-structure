// src/payload/blocks/CorporatePartners.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  CORPORATE_PARTNERS_BLOCK_LABEL,
  CORPORATE_PARTNERS_BLOCK_THUMBNAIL_URL,
  CORPORATE_PARTNERS_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HILITE_MAX = 40
const PARTNER_NAME_MAX = 60

/* ---------------- validators (same style as before) ---------------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Require that highlight appears verbatim inside sibling `targetField`. */
const validateHighlightedInField =
  (label: string, targetField: string, max = HILITE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

/* ---------------- block ---------------- */
const CorporatePartnersSchema: Block = {
  slug: CORPORATE_PARTNERS_SLUG_AND_TAG,

  labels: {
    singular: CORPORATE_PARTNERS_BLOCK_LABEL,
    plural: CORPORATE_PARTNERS_BLOCK_LABEL,
  },

  imageURL: CORPORATE_PARTNERS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CORPORATE_PARTNERS_BLOCK_LABEL} preview`,

  fields: [
    // Hidden: upload session id for media lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FCF4EB',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    /* ---------- Title (EN/BN) ---------- */
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
          admin: {
            width: '50%',
            description: `Primary heading. Max ${TITLE_MAX} characters.`,
          },
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

    /* ---------- Highlighted Title (EN/BN) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within Title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'titleBN',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Partners (array) ---------- */
    {
      name: 'partners',
      type: 'array',
      label: 'Partners',
      required: true,
      minRows: 6,
      maxRows: 24,
      labels: { singular: 'Partner', plural: 'Partners' },
      admin: {
        description: 'Add partners with a logo and name (EN/BN).',
      },
      fields: [
        // Partner logo (array image generator)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Partner Logo',
          description: 'Upload the partner logo (square logo recommended 340:250).',
          aspectRatio: 340 / 250,
          quality: 0.9,
          maxKB: 300,
        } as any),

        // Partner name (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Partner Name',
              maxLength: PARTNER_NAME_MAX,
              validate: validateShortText('Partner Name', PARTNER_NAME_MAX, true),
              admin: {
                width: '50%',
                description: `Display name. Max ${PARTNER_NAME_MAX} characters.`,
              },
            },
            {
              name: 'nameBN',
              type: 'text',
              required: true,
              label: 'পার্টনার নাম (বাংলা)',
              maxLength: PARTNER_NAME_MAX,
              validate: validateShortText('Partner Name (BN)', PARTNER_NAME_MAX, true),
              admin: {
                width: '50%',
                description: `প্রদর্শিত নাম। সর্বোচ্চ ${bnNum(PARTNER_NAME_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CorporatePartnersSchema
