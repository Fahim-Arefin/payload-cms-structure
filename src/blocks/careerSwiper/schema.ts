// src/payload/blocks/CareerSwiper.ts
import type { Block } from 'payload'
import {
  CAREER_PAGE_SWIPER_SLUG_AND_TAG,
  CAREER_PAGE_SWIPER_BLOCK_LABEL,
  CAREER_PAGE_SWIPER_BLOCK_THUMBNAIL_URL,
  CAREER_PAGE,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateImageFields, generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 30
const SUBTITLE_MAX = 40
const DESC_MAX = 80

const CARD_TITLE_MAX = 50
const CARD_DESC_MAX = 200
const URL_MAX = 400 // ⬅️ added for GIF URL max length

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Background video URL: allow absolute http(s) OR internal /assets path. */
const validateBackgroundVideoUrl =
  (max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'URL is required.'
    if (!link) return true
    if (link.length > max) return `URL must be at most ${max} characters.`

    // Allow internal asset paths like "/assets/bg.mp4"
    if (link.startsWith('/assets')) {
      return true
    }

    // Otherwise, require absolute http(s) URL
    try {
      const u = new URL(link)
      const ok = u.protocol === 'http:' || u.protocol === 'https:'
      if (!ok) {
        return 'URL must be an absolute http(s) URL or start with /assets.'
      }
      return true
    } catch {
      return 'Provide a valid URL that is either an absolute http(s) URL or starts with /assets.'
    }
  }

/* ---------------- block ---------------- */
const CareerSwiperSchema: Block = {
  slug: CAREER_PAGE_SWIPER_SLUG_AND_TAG,
  labels: {
    singular: CAREER_PAGE_SWIPER_BLOCK_LABEL,
    plural: CAREER_PAGE_SWIPER_BLOCK_LABEL,
  },
  admin: {
    group: CAREER_PAGE,
  },

  imageURL: CAREER_PAGE_SWIPER_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CAREER_PAGE_SWIPER_BLOCK_LABEL} preview`,

  fields: [
    // Title (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'FAST TRACK',
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary headline. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          defaultValue: 'ক্যারিয়ার এ এগিয়ে থাকুন',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Subtitle (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
          defaultValue: 'YOUR CAREER',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Supporting line. Max ${SUBTITLE_MAX} characters.`,
          },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          defaultValue: 'অনন্য গতিতে',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Description (plain text; NOT textarea) EN/BN
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Description',
          defaultValue: 'Discover a purpose with endless opportunity',
          maxLength: DESC_MAX,
          validate: validateShortText('Description', DESC_MAX, true),
          admin: {
            width: '50%',
            description: `1–2 short sentences. Max ${DESC_MAX} characters.`,
          },
        },
        {
          name: 'descriptionBN',
          type: 'text',
          required: true,
          label: 'বর্ণনা (বাংলা)',
          defaultValue: 'আবিষ্কার করুন এক অভূতপূর্ণ যাত্রা যেখানে সম্ভাবনা অফুরন্ত',
          maxLength: DESC_MAX,
          validate: validateShortText('Description (BN)', DESC_MAX, true),
          admin: {
            width: '50%',
            description: `১–২টি সংক্ষিপ্ত বাক্য। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // // Background Image (cropper-based field)
    // ...generateImageFields({
    //   fieldName: 'backgroundImage',
    //   label: 'Background Image',
    //   description: 'Background image for the swiper section. Recommended 16:9.',
    //   aspectRatio: 16 / 9,
    //   quality: 0.93,
    //   maxKB: 500,
    //   ownerCollection: CAREER_PAGE_SWIPER_SLUG_AND_TAG as any,
    // } as any),

    /* --------- Background GIF (https only) --------- */
    {
      name: 'backgroundGifUrl',
      type: 'text',
      required: true,
      label: 'Background GIF URL (https)',
      maxLength: URL_MAX,
      validate: validateBackgroundVideoUrl(URL_MAX, true),
      defaultValue: '/assets/videos/careerSwiperBanner.gif',
      admin: {
        description: `Either an internal path starting with “/assets” or an absolute http(s) video URL (MP4/WebM/HLS). Max ${URL_MAX}. (/assets/videos/footprint.mp4)`,
      },
    },

    // Cards array
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        description: 'Add one or more cards to display in the swiper.',
      },
      fields: [
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
              admin: {
                width: '50%',
                description: `Short heading for the card. Max ${CARD_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'কার্ড শিরোনাম (বাংলা)',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `কার্ডের সংক্ষিপ্ত শিরোনাম। সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
              },
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
              admin: {
                width: '50%',
                description: `Brief supporting copy. Max ${CARD_DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'text',
              required: true,
              label: 'কার্ড বর্ণনা (বাংলা)',
              maxLength: CARD_DESC_MAX,
              validate: validateShortText('Card Description (BN)', CARD_DESC_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত সহায়ক বর্ণনা। সর্বোচ্চ ${bnNum(CARD_DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CareerSwiperSchema
