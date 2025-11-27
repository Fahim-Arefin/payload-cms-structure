// src/payload/blocks/CorporateCards.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import LayoutThumbPreview from '@/components/admin/LayoutThumbPreview'
import {
  CORPORATE_PAGE_CARDS_BLOCK_LABEL,
  CORPORATE_PAGE_CARDS_BLOCK_THUMBNAIL_URL,
  CORPORATE_PAGE_CARDS_SLUG_AND_TAG,
} from '@/lib/constants'
import CorporateCardsThumbField from './CorporateCardsThumbField'

// ---- limits ----
const CARDS_MIN = 1
const CARDS_MAX = 12
const DESC_LINE_MAX = 180
const CTA_TEXT_MAX = 24

// ---- validators ----
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

// CTA btn validator
const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateCardCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'CTA Button Text (EN) is required when any CTA text is provided.'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `CTA Button Text must be at most ${CTA_TEXT_MAX} characters.`
  return true
}

const validateCardCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর হতে পারবে।`
  return true
}
// Works for relationship or text/url fields
const validateCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

  // presence check for relationship or text
  let hasLink = false
  if (Array.isArray(val)) {
    hasLink = val.length > 0
  } else if (val && typeof val === 'object') {
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  } else {
    hasLink = Boolean(val)
  }

  if (hasAnyText && !hasLink) {
    return 'CTA Button Link is required when CTA Button Text is provided.'
  }
  return true
}

const CorporateCardsSchema: Block = {
  slug: CORPORATE_PAGE_CARDS_SLUG_AND_TAG,
  labels: {
    singular: CORPORATE_PAGE_CARDS_BLOCK_LABEL,
    plural: CORPORATE_PAGE_CARDS_BLOCK_LABEL,
  },

  imageURL: CORPORATE_PAGE_CARDS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CORPORATE_PAGE_CARDS_BLOCK_LABEL} preview`,

  fields: [
    // {
    //   type: 'ui',
    //   name: 'layoutPreview',
    //   label: 'Layout Preview',
    //   admin: {
    //     components: {
    //       Field: CorporateCardsThumbField, // <- pass the component, not JSX
    //     },
    //   },
    // },
    {
      name: 'corporateCards',
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
          ownerCollection: CORPORATE_PAGE_CARDS_SLUG_AND_TAG as any,
        } as any),

        // Icon (cropper)
        ...generateArrayImageFields({
          fieldName: 'icon',
          label: 'Icon',
          description: 'Square icon. Recommended 1:1.',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 200,
          ownerCollection: CORPORATE_PAGE_CARDS_SLUG_AND_TAG as any,
        } as any),

        // Description lines array (EN + BN)
        {
          name: 'descriptions',
          type: 'array',
          label: 'Description Lines',
          required: true,
          minRows: 1,
          maxRows: 3,
          admin: {
            description: `Add short bullet/lines to describe the card. Each line must have EN & BN. Max ${DESC_LINE_MAX} (${bnNum(DESC_LINE_MAX)}) chars per field.`,
          },
          labels: { singular: 'Line', plural: 'Lines' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Text',
                  maxLength: DESC_LINE_MAX,
                  validate: validateShortText('Text', DESC_LINE_MAX, true),
                  admin: {
                    width: '50%',
                    description: `One short line. Max ${DESC_LINE_MAX} characters.`,
                  },
                },
                {
                  name: 'textBN',
                  type: 'text',
                  required: true,
                  label: 'টেক্সট (বাংলা)',
                  maxLength: DESC_LINE_MAX,
                  validate: validateShortText('Text (BN)', DESC_LINE_MAX, true),
                  admin: {
                    width: '50%',
                    description: `একটি ছোট লাইন। সর্বোচ্চ ${bnNum(DESC_LINE_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
            // ⬇️ New: Card CTA button texts (EN/BN, optional but paired)
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'CTA Button Text',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateCardCTAEnglishText,
                  admin: {
                    width: '50%',
                    description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
                  },
                },
                {
                  name: 'buttonTextBN',
                  type: 'text',
                  label: 'CTA বাটনের টেক্সট (বাংলা)',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateCardCTABanglaText,
                  admin: {
                    width: '50%',
                    description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
            {
              name: 'buttonLink',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              validate: validateCTALinkRequiredIfAnyText,
              admin: {
                description:
                  'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CorporateCardsSchema
