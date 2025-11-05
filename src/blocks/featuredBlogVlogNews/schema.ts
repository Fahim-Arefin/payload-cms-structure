// src/payload/blocks/FeaturedBlogVlogNews.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_LABEL,
  HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_THUMBNAIL_URL,
  HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateImageFields } from '@/utils/media/fieldGenerators' // ⬅️ ADD

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 120
const HIGHLIGHTED_TEXT_MAX = 120
const SUBTITLE_MAX = 120
const CTA_BUTTON_TEXT_MAX = 24

/* ---------------- validators ---------------- */
const validateHexColor = (val: unknown) => {
  const s = String(val ?? '').trim()
  if (!s) return true
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

const validateHighlightedInTitle = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'Highlighted Text must be text.'
  if (typeof siblingData?.title === 'string' && !siblingData.title.includes(val)) {
    return 'Highlighted Text must exist within the Title exactly.'
  }
  return true
}
const validateHighlightedInTitleBN = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'রঙিন টেক্সট অবশ্যই টেক্সট হতে হবে।'
  if (typeof siblingData?.titleBN === 'string' && !siblingData.titleBN.includes(val)) {
    return 'রঙিন টেক্সট অবশ্যই শিরোনামের ভিতর হুবহু থাকতে হবে।'
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
/* ---------- SECTION/GLOBAL CTA (bottom fields) ---------- */
const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateRootCTAEnglishText = (val: unknown, { siblingData }: any) => {
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

const validateRootCTABanglaText = (val: unknown, { siblingData }: any) => {
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

const validateRootCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

  let hasLink = false
  if (Array.isArray(val)) hasLink = val.length > 0
  else if (val && typeof val === 'object')
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  else hasLink = Boolean(val)

  if (hasAnyText && !hasLink) {
    return 'CTA Button Link is required when CTA Button Text is provided.'
  }
  return true
}

/* ---------- SEE-ALL CTA (secondary) ---------- */
const validateSeeAllCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.seeAllText) || isNonEmpty(siblingData?.seeAllTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'See All Button Text (EN) is required when any See All text is provided.'
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX)
    return `See All Button Text must be at most ${CTA_BUTTON_TEXT_MAX} characters.`
  return true
}
const validateSeeAllCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.seeAllText) || isNonEmpty(siblingData?.seeAllTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'সব দেখুন বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  if (hasThis && String(val).length > CTA_BUTTON_TEXT_MAX)
    return `সব দেখুন বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
  return true
}
const validateSeeAllCTALinkRequiredIfAnyText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.seeAllText) || isNonEmpty(siblingData?.seeAllTextBN)
  let hasLink = false
  if (Array.isArray(val)) hasLink = val.length > 0
  else if (val && typeof val === 'object')
    hasLink = Object.keys(val as Record<string, unknown>).length > 0
  else hasLink = Boolean(val)
  if (hasAnyText && !hasLink)
    return 'See All Button Link is required when See All Button Text is provided.'
  return true
}

/* ---------------- block ---------------- */
const FeaturedBlogVlogNewsSchema: Block = {
  slug: HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
  labels: {
    singular: HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_LABEL,
    plural: HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_LABEL,
  },

  imageURL: HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      defaultValue: '#FFFFFF',
      validate: validateHexColor,
      admin: {
        width: '50%',
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    // heading
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: false,
          label: 'Heading',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Heading', SUBTITLE_MAX, false),
          admin: { width: '50%', description: `heading. Max ${SUBTITLE_MAX} chars.` },
        },
        {
          name: 'headingBN',
          type: 'text',
          required: false,
          label: 'হেডিং (ঐচ্ছিক)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Heading (BN)', SUBTITLE_MAX, false),
          admin: {
            width: '50%',
            description: `হেডিং সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Ttle
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: { width: '50%', description: `Primary heading. Max ${TITLE_MAX} characters.` },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'সেকশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    // HighlightedText + HighlightedTextBN
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInTitle,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HIGHLIGHTED_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInTitleBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই শিরোনামের ভিতর হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHTED_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Optional “Trending” heading
    {
      type: 'row',
      fields: [
        {
          name: 'trendingTitle',
          type: 'text',
          required: false,
          label: 'Trending Heading (optional)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Trending Heading', SUBTITLE_MAX, false),
          admin: { width: '50%', description: `Optional sub-heading. Max ${SUBTITLE_MAX} chars.` },
        },
        {
          name: 'trendingTitleBN',
          type: 'text',
          required: false,
          label: 'ট্রেন্ডিং শিরোনাম (ঐচ্ছিক)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Trending Heading (BN)', SUBTITLE_MAX, false),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক উপ-শিরোনাম। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    // ✅ NEW: Trending Banner (single image with cropper flow)
    ...generateImageFields({
      fieldName: 'trendingBanner',
      label: 'Trending Banner Image',
      description: '16:9 recommended (e.g., 1600×900). Blur placeholder generated automatically.',
      aspectRatio: 16 / 9,
      quality: 0.9,
      maxKB: 700,
      ownerCollection: HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG as any,
    } as any),

    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'CTA Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateRootCTAEnglishText,
          admin: {
            width: '50%',
            description: `Text shown on the call-to-action button. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'buttonTextBN',
          type: 'text',
          label: 'CTA বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateRootCTABanglaText,
          admin: {
            width: '50%',
            description: `কলে-টু-অ্যাকশন বাটনে দেখানো টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
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
      validate: validateRootCTALinkRequiredIfAnyText,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
      },
    },

    /* ---------- See-All CTA (NEW) ---------- */
    {
      type: 'row',
      fields: [
        {
          name: 'seeAllText',
          type: 'text',
          label: 'See All Button Text',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateSeeAllCTAEnglishText,
          admin: {
            width: '50%',
            description: `Optional "See all posts" button text. Max ${CTA_BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'seeAllTextBN',
          type: 'text',
          label: 'সব দেখুন বাটনের টেক্সট (বাংলা)',
          maxLength: CTA_BUTTON_TEXT_MAX,
          validate: validateSeeAllCTABanglaText,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক "সব দেখুন" বাটন টেক্সট। সর্বোচ্চ ${bnNum(CTA_BUTTON_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      name: 'seeAllLink',
      label: 'See All → Link to (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      validate: validateSeeAllCTALinkRequiredIfAnyText,
      admin: {
        description:
          'Pick an internal Page to link to. Required if any See All button text is provided.',
      },
    },

    // Data source toggles
    {
      type: 'row',
      fields: [
        {
          name: 'useSharedBlogAndNewsData',
          type: 'checkbox',
          label: 'Use shared data (Global Blogs + News)',
          defaultValue: true,
          required: true,
          admin: {
            width: '50%',
            description: `When ON, this section reads **global Blog And News** items from global sources.`,
          },
        },
        {
          name: 'useSharedVlogData',
          type: 'checkbox',
          label: 'Use shared data (Vlogs)',
          defaultValue: true,
          required: true,
          admin: {
            width: '50%',
            description: `When ON, this section reads **global Vlog** items from global sources.`,
          },
        },
      ],
    },
  ],
}

export default FeaturedBlogVlogNewsSchema
