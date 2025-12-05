import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  LEARNING_MEDIA_SECTION_SLUG_AND_TAG,
  LEARNING_MEDIA_SECTION_BLOCK_LABEL,
  LEARNING_MEDIA_SECTION_BLOCK_THUMBNAIL_URL,
  // HOME_PAGE, // if you want to group it later, uncomment
} from '@/lib/constants'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'

/* ------------ limits ------------ */
const COLOR_HEX_LEN = 7

const BUTTON_TEXT_MAX = 24
const LEADING_TEXT_MAX = 120
const INPUT_PLACEHOLDER_MAX = 80
const SOCIAL_LINK_MAX = 200

/* ------------ validators ------------ */

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  return /^#[0-9A-Fa-f]{6}$/.test(s)
    ? true
    : 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
}

const validateButtonTextEN = (val: unknown) => {
  if (val == null || val === '') return true
  const t = String(val)
  return t.length <= BUTTON_TEXT_MAX
    ? true
    : `Button Text must be at most ${BUTTON_TEXT_MAX} characters.`
}

const validateButtonTextBN = (val: unknown) => {
  if (val == null || val === '') return true
  const t = String(val)
  return t.length <= BUTTON_TEXT_MAX
    ? true
    : `বাটনের টেক্সট সর্বোচ্চ ${bnNum(BUTTON_TEXT_MAX)} অক্ষর হতে পারবে।`
}

const validateSocialLink = (val: unknown) => {
  if (val == null || val === '') return true
  const s = String(val).trim()
  if (s.length > SOCIAL_LINK_MAX) {
    return `Profile link must be at most ${SOCIAL_LINK_MAX} characters.`
  }
  try {
    const u = new URL(s)
    if (u.protocol === 'http:' || u.protocol === 'https:') return true
    return 'Profile link must be a valid http(s) URL.'
  } catch {
    return 'Profile link must be a valid http(s) URL.'
  }
}

/* ------------ Block config ------------ */

const LearningMediaSectionSchema: Block = {
  slug: LEARNING_MEDIA_SECTION_SLUG_AND_TAG,
  labels: {
    singular: LEARNING_MEDIA_SECTION_BLOCK_LABEL,
    plural: LEARNING_MEDIA_SECTION_BLOCK_LABEL,
  },
  admin: {
    // group: HOME_PAGE,
  },
  imageURL: LEARNING_MEDIA_SECTION_BLOCK_THUMBNAIL_URL,
  imageAltText: `${LEARNING_MEDIA_SECTION_BLOCK_LABEL} preview`,

  fields: [
    /* -------- Section background -------- */
    {
      name: 'bgColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FCF4EB',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

    /* -------- Shared Follow button text (root) -------- */
    {
      type: 'row',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'Follow Button Text',
          maxLength: BUTTON_TEXT_MAX,
          defaultValue: 'Follow',
          validate: validateButtonTextEN,
          admin: {
            width: '50%',
            description: `Text under each social grid (Instagram/Facebook/LinkedIn). Default "Follow". Max ${BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'buttonTextBN',
          type: 'text',
          label: 'ফলো বাটনের টেক্সট (বাংলা)',
          maxLength: BUTTON_TEXT_MAX,
          defaultValue: 'ফলো করুন',
          validate: validateButtonTextBN,
          admin: {
            width: '50%',
            description: `প্রতি সোশ্যাল গ্রিডের নিচে দেখানো টেক্সট। ডিফল্ট "ফলো করুন"। সর্বোচ্চ ${bnNum(
              BUTTON_TEXT_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    /* =========================================================
       Instagram column
       ========================================================= */

    // Icon (single) via generateImageFields – 1:1
    ...generateImageFields({
      fieldName: 'instagramIcon',
      label: 'Instagram Icon',
      description: 'Instagram logo/icon. Upload & crop a square (1:1).',
      aspectRatio: 1,
      quality: 0.95,
      maxKB: 80,
      ownerCollection: LEARNING_MEDIA_SECTION_SLUG_AND_TAG as any,
    } as any),

    // Images grid
    {
      name: 'instagramImages',
      type: 'array',
      label: 'Instagram Images',
      required: true,
      minRows: 3,
      maxRows: 9,
      admin: {
        description: 'Add 3–9 images to show in the Instagram grid.',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image',
          description: 'Grid image. Square / 1:1 works best.',
          aspectRatio: 1,
          quality: 0.95,
          maxKB: 400,
          ownerCollection: LEARNING_MEDIA_SECTION_SLUG_AND_TAG as any,
        } as any),
      ],
    },

    // Instagram profile link (text URL, outside array)
    {
      name: 'instagramLinkText',
      type: 'text',
      label: 'Instagram Profile Link',
      maxLength: SOCIAL_LINK_MAX,
      validate: validateSocialLink,
      admin: {
        width: '50%',
        description: `Optional. Full Instagram profile URL (e.g., https://instagram.com/yourpage). Max ${SOCIAL_LINK_MAX} characters.`,
      },
    },

    /* =========================================================
       Facebook column
       ========================================================= */

    ...generateImageFields({
      fieldName: 'facebookIcon',
      label: 'Facebook Icon',
      description: 'Facebook logo/icon. Upload & crop a square (1:1).',
      aspectRatio: 1,
      quality: 0.95,
      maxKB: 80,
      ownerCollection: LEARNING_MEDIA_SECTION_SLUG_AND_TAG as any,
    } as any),

    {
      name: 'facebookImages',
      type: 'array',
      label: 'Facebook Images',
      required: true,
      minRows: 3,
      maxRows: 9,
      admin: {
        description: 'Add 3–9 images to show in the Facebook grid.',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image',
          description: 'Grid image. Square / 1:1 works best.',
          aspectRatio: 1,
          quality: 0.95,
          maxKB: 400,
          ownerCollection: LEARNING_MEDIA_SECTION_SLUG_AND_TAG as any,
        } as any),
      ],
    },

    // Facebook profile link
    {
      name: 'facebookLinkText',
      type: 'text',
      label: 'Facebook Profile Link',
      maxLength: SOCIAL_LINK_MAX,
      validate: validateSocialLink,
      admin: {
        width: '50%',
        description: `Optional. Full Facebook page URL (e.g., https://facebook.com/yourpage). Max ${SOCIAL_LINK_MAX} characters.`,
      },
    },

    /* =========================================================
       LinkedIn column
       ========================================================= */

    ...generateImageFields({
      fieldName: 'linkedinIcon',
      label: 'LinkedIn Icon',
      description: 'LinkedIn logo/icon. Upload & crop a square (1:1).',
      aspectRatio: 1,
      quality: 0.95,
      maxKB: 80,
      ownerCollection: LEARNING_MEDIA_SECTION_SLUG_AND_TAG as any,
    } as any),

    {
      name: 'linkedinImages',
      type: 'array',
      label: 'LinkedIn Images',
      required: true,
      minRows: 3,
      maxRows: 9,
      admin: {
        description: 'Add 3–9 images to show in the LinkedIn grid.',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Image',
          description: 'Grid image. Square / 1:1 works best.',
          aspectRatio: 1,
          quality: 0.95,
          maxKB: 400,
          ownerCollection: LEARNING_MEDIA_SECTION_SLUG_AND_TAG as any,
        } as any),
      ],
    },

    // LinkedIn profile link
    {
      name: 'linkedinLinkText',
      type: 'text',
      label: 'LinkedIn Profile Link',
      maxLength: SOCIAL_LINK_MAX,
      validate: validateSocialLink,
      admin: {
        width: '50%',
        description: `Optional. Full LinkedIn page URL (e.g., https://linkedin.com/company/yourpage). Max ${SOCIAL_LINK_MAX} characters.`,
      },
    },

    /* =========================================================
       YouTube Subscribe card
       ========================================================= */

    // YouTube icon (single) – 16:9-ish
    ...generateImageFields({
      fieldName: 'youtubeIcon',
      label: 'YouTube Icon',
      description: 'YouTube logo/icon. Upload & crop to a wide rectangle (e.g., 16:9).',
      aspectRatio: 1.42/1,
      quality: 0.95,
      maxKB: 120,
      ownerCollection: LEARNING_MEDIA_SECTION_SLUG_AND_TAG as any,
    } as any),

    {
      type: 'row',
      fields: [
        {
          name: 'youtubeLeadingText',
          type: 'text',
          label: 'YouTube Leading Text',
          maxLength: LEADING_TEXT_MAX,
          required: true,
          admin: {
            width: '50%',
            description: `Short copy above the input (e.g., "Lorem ipsum dolor sit amet"). Max ${LEADING_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'youtubeLeadingTextBN',
          type: 'text',
          label: 'ইউটিউব লিডিং টেক্সট (বাংলা)',
          maxLength: LEADING_TEXT_MAX,
          required: true,
          admin: {
            width: '50%',
            description: `ইনপুটের উপরে ছোট বাক্য। সর্বোচ্চ ${bnNum(LEADING_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'youtubeInputPlaceholder',
          type: 'text',
          label: 'Input Placeholder Text',
          maxLength: INPUT_PLACEHOLDER_MAX,
          required: true,
          admin: {
            width: '50%',
            description: `Placeholder inside the email/input field (e.g., "Lorem ipsum"). Max ${INPUT_PLACEHOLDER_MAX} characters.`,
          },
        },
        {
          name: 'youtubeInputPlaceholderBN',
          type: 'text',
          label: 'ইনপুট প্লেসহোল্ডার (বাংলা)',
          maxLength: INPUT_PLACEHOLDER_MAX,
          required: true,
          admin: {
            width: '50%',
            description: `ইনপুট ফিল্ডের ভেতরের প্লেসহোল্ডার টেক্সট। সর্বোচ্চ ${bnNum(
              INPUT_PLACEHOLDER_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'youtubeButtonText',
          type: 'text',
          label: 'YouTube Button Text',
          maxLength: BUTTON_TEXT_MAX,
          defaultValue: 'Subscribe',
          validate: validateButtonTextEN,
          admin: {
            width: '50%',
            description: `Button label under the input. Default "Subscribe". Max ${BUTTON_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'youtubeButtonTextBN',
          type: 'text',
          label: 'ইউটিউব বাটনের টেক্সট (বাংলা)',
          maxLength: BUTTON_TEXT_MAX,
          defaultValue: 'সাবস্ক্রাইব করুন',
          validate: validateButtonTextBN,
          admin: {
            width: '50%',
            description: `ইনপুটের নিচে থাকা বাটনের লেখা। সর্বোচ্চ ${bnNum(
              BUTTON_TEXT_MAX,
            )} অক্ষর; ডিফল্ট "সাবস্ক্রাইব করুন"।`,
          },
        },
      ],
    },
  ],
}

export default LearningMediaSectionSchema
