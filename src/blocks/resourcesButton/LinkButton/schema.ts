// src/payload/blocks/PlansLinkButton.ts
import {
  LINK_BUTTON_BLOCK_LABEL,
  LINK_BUTTON_BLOCK_THUMBNAIL_URL,
  LINK_BUTTON_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import type { Block } from 'payload'

/* ---------------- limits ---------------- */
const CTA_BUTTON_TEXT_MAX = 60

/* ---------------- validators ---------------- */

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA Button Text (EN) is required when any CTA button text is provided.'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  }
  return true
}

const validateCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)

  if (hasAnyText && !hasThis) {
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  }
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX) {
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  }
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
/* ---------------- block ---------------- */
const LinkButtonSchema: Block = {
  slug: LINK_BUTTON_SLUG_AND_TAG,
  labels: { singular: LINK_BUTTON_BLOCK_LABEL, plural: LINK_BUTTON_BLOCK_LABEL },
  imageURL: LINK_BUTTON_BLOCK_THUMBNAIL_URL,
  imageAltText: `${LINK_BUTTON_BLOCK_LABEL} preview`,
  fields: [
    // CTA text (localized) + link (NOT localized)
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          //   validate: validateCTAEnglishText,
          required: true,
          admin: {
            width: '50%',
            description: `Text shown on the call-to-action button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'buttonTextBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_BUTTON_TEXT_MAX,
          //   validate: validateCTABanglaText,
          required: true,
          admin: {
            width: '50%',
            description: `কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(
              CTA_BUTTON_TEXT_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    {
      name: 'buttonLink',
      label: 'Link to (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      //   validate: validateCTALinkRequiredIfAnyText,
      required: true,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When clicking the button it will navigate to this page.',
      },
    },
  ],
}

export default LinkButtonSchema
