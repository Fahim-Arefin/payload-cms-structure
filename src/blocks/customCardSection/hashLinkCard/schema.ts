import {
  HASHLINK_CARDS_BLOCK_LABEL,
  HASHLINK_CARDS_BLOCK_THUMBNAIL_URL,
  HASHLINK_CARDS_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

// ---- limits ----
const CARDS_MIN = 1
const CARDS_MAX = 12
const CARD_TITLE_MAX = 100

// ---- validators ----
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }
const validateSingleWordId = (val: unknown) => {
  const s = String(val ?? '')
  if (!s) return 'Section ID is required.'
  if (!/^[A-Za-z0-9]+$/.test(s)) {
    return 'Section ID must be one word: letters and numbers only (no spaces, -, _ or symbols).'
  }
  return true
}

// near other validators
const validateRequiredNoEdgeSpaces = (val: unknown) => {
  const s = String(val ?? '')
  if (!s.trim()) return 'Section ID is required.'
  if (s !== s.trim()) return 'No leading or trailing spaces are allowed.'
  return validateSingleWordId(s)
}

const HashLinkCardsSchema: Block = {
  slug: HASHLINK_CARDS_SLUG_AND_TAG,
  labels: {
    singular: HASHLINK_CARDS_BLOCK_LABEL,
    plural: HASHLINK_CARDS_BLOCK_LABEL,
  },

  imageURL: HASHLINK_CARDS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HASHLINK_CARDS_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'hashLinkCards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: CARDS_MIN,
      maxRows: CARDS_MAX,
      admin: {
        description: `Add ${CARDS_MIN}–${CARDS_MAX} cards. Each card needs a background image, an icon, and description lines (EN/BN).`,
      },
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        // Background image (cropper)
        ...generateArrayImageFields({
          fieldName: 'bgImage',
          label: 'Background Image',
          description: 'Main background of the card. Recommended 1:1.',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 600,
          ownerCollection: HASHLINK_CARDS_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Card Title',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
              admin: { width: '50%', description: `Max ${CARD_TITLE_MAX} characters.` },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'কার্ড শিরোনাম (বাংলা)',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।` },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'buttonLink',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              admin: {
                width: '50%',
                description:
                  'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
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
                  'Used for direct jump links to this section (e.g., blog-section). Must not have leading/trailing spaces.',
              },
              validate: validateRequiredNoEdgeSpaces, // any string allowed, but no before/after space
            },
          ],
        },
      ],
    },
  ],
}

export default HashLinkCardsSchema
