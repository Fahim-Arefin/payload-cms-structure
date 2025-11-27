// src/payload/blocks/CorporateInfo.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  CORPORATE_INFO_BLOCK_LABEL,
  CORPORATE_INFO_BLOCK_THUMBNAIL_URL,
  CORPORATE_INFO_SLUG_AND_TAG,
  CORPORATE_PLAN_PAGE,
} from '@/lib/constants'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
import BrochureButtonSchema from '../resourcesButton/BrochureButton/schema'
import LinkButtonSchema from '../resourcesButton/LinkButton/schema'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const HILITE_MAX = 40
const INFO_TITLE_MAX = 60
const INFO_DESC_MAX = 200

/* ---------------- validators ---------------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
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
const CorporateInfoSchema: Block = {
  slug: CORPORATE_INFO_SLUG_AND_TAG,

  labels: {
    singular: CORPORATE_INFO_BLOCK_LABEL,
    plural: CORPORATE_INFO_BLOCK_LABEL,
  },

  admin: {
    group: CORPORATE_PLAN_PAGE,
  },

  imageURL: CORPORATE_INFO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CORPORATE_INFO_BLOCK_LABEL} preview`,

  fields: [
    // Hidden: upload session id (for media lifecycle)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FFFFFF',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(
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
            description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Section Image (generated) ---------- */
    ...generateImageFields({
      fieldName: 'image',
      label: 'Section Image (628:820)',
      description: 'Main visual for the section. 628:820 recommended.',
      aspectRatio: 628 / 820,
      quality: 0.9,
      maxKB: 500,
      // ownerCollection will be stamped via withMediaLifecycle (on "pages")
    } as any),

    /* ---------- Infos (array) ---------- */
    {
      name: 'infos',
      type: 'array',
      label: 'Infos',
      required: true,
      minRows: 3,
      maxRows: 6,
      labels: { singular: 'Info', plural: 'Infos' },
      admin: { description: 'Add items with icon, title, and description (EN/BN).' },
      fields: [
        // Icon upload
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon',
          description: 'Main visual for the section. 16:9 recommended.',
          aspectRatio: 1 / 1,
          quality: 0.92,
          maxKB: 200,
          // ownerCollection will be stamped via withMediaLifecycle (on "pages")
        } as any),

        // Title (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              maxLength: INFO_TITLE_MAX,
              validate: validateShortText('Title', INFO_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Short heading. Max ${INFO_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'শিরোনাম (বাংলা)',
              maxLength: INFO_TITLE_MAX,
              validate: validateShortText('Title (BN)', INFO_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত শিরোনাম। সর্বোচ্চ ${bnNum(INFO_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Description (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Description',
              maxLength: INFO_DESC_MAX,
              validate: validateShortText('Description', INFO_DESC_MAX, true),
              admin: {
                width: '50%',
                description: `Short supporting copy. Max ${INFO_DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'textarea',
              required: true,
              label: 'বর্ণনা (বাংলা)',
              maxLength: INFO_DESC_MAX,
              validate: validateShortText('Description (BN)', INFO_DESC_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত সহায়ক বর্ণনা। সর্বোচ্চ ${bnNum(INFO_DESC_MAX)} অক্ষর।`,
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

export default CorporateInfoSchema
