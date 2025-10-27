// src/payload/blocks/Plan.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
  PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL,
  PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

/* ------------ limits ------------ */
const CARD_TITLE_MAX = 40
const CARD_SUBTITLE_MAX = 40
const CARD_DESC_MAX = 100
const CTA_TEXT_MAX = 24

/* ------------ validators ------------ */

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

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

/* ------------ Block config ------------ */
const PlanCardSchema: Block = {
  slug: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
  labels: {
    singular: PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
    plural: PLAN_PAGE_PLAN_CARD_BLOCK_LABEL,
  },

  imageURL: PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PLAN_PAGE_PLAN_CARD_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'planCards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: { description: 'Add at least 1 card.' },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'bgImage',
          label: 'Background Image',
          description: 'Upload & crop a 13:12 image.',
          aspectRatio: 13 / 12,
          quality: 0.9,
          maxKB: 400,
          ownerCollection: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG as any,
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
              name: 'subTitle',
              type: 'text',
              required: false,
              label: 'Card SubTitle',
              maxLength: CARD_SUBTITLE_MAX,
              validate: validateShortText('Card SubTitle', CARD_SUBTITLE_MAX, false),
              admin: { width: '50%', description: `Max ${CARD_SUBTITLE_MAX} characters.` },
            },
            {
              name: 'subTitleBN',
              type: 'text',
              required: false,
              label: 'কার্ড উপ-শিরোনাম (বাংলা)',
              maxLength: CARD_SUBTITLE_MAX,
              validate: validateShortText('Card SubTitle (BN)', CARD_SUBTITLE_MAX, false),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_SUBTITLE_MAX)} অক্ষর।` },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'text',
              required: true,
              label: 'Card Description',
              maxLength: CARD_DESC_MAX,
              validate: validateShortText('Card Description', CARD_DESC_MAX, true),
              admin: { width: '50%', description: `Max ${CARD_DESC_MAX} characters.` },
            },
            {
              name: 'descriptionBN',
              type: 'text',
              required: true,
              label: 'কার্ড বর্ণনা (বাংলা)',
              maxLength: CARD_DESC_MAX,
              validate: validateShortText('Card Description (BN)', CARD_DESC_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(CARD_DESC_MAX)} অক্ষর।` },
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
          // required: true,
          validate: validateCTALinkRequiredIfAnyText,
          admin: {
            description:
              'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
          },
        },
      ],
    },
  ],
}

export default PlanCardSchema
