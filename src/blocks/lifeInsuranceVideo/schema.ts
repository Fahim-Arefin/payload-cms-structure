// src/payload/blocks/HomeVideo.ts
import {
  HOME_PAGE,
  HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_LABEL,
  HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_THUMBNAIL_URL,
  HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const URL_MAX = 300
const BTN_TEXT_MAX = 24
const HILITE_MAX = 40

/* ---------------- validators (inline) ---------------- */

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

/** YouTube-only http(s) URL (watch/embed/youtu.be/youtube-nocookie allowed). */
const validateYouTubeLinkWithMax = (max: number) => (val: unknown) => {
  const link = (val ?? '').toString().trim()
  if (!link) return 'YouTube URL is required.'
  if (link.length > max) return `YouTube URL must be at most ${max} characters.`
  try {
    const u = new URL(link)
    const host = u.hostname.toLowerCase()
    const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
    const isYouTube =
      host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')
    if (!isHttp) return 'YouTube URL must be http(s).'
    if (!isYouTube) return 'Only YouTube links are allowed.'
    return true
  } catch {
    return 'Provide a valid YouTube URL.'
  }
}

/** Highlight must appear verbatim inside a target text field */
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
const LifeInsuranceVideoSchema: Block = {
  slug: HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
  labels: {
    singular: HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_LABEL,
    plural: HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_LABEL} preview`,

  fields: [
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
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    // Title (EN / BN)
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Section Title',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading. Max ${TITLE_MAX} (${bnNum(TITLE_MAX)}) characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          label: 'সেকশন শিরোনাম (বাংলা)',
          required: true,
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Highlighted (EN / BN) must exist inside title/titleBN
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the title. Max ${HILITE_MAX} (${bnNum(
              HILITE_MAX,
            )}) characters.`,
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
            description: `ঐচ্ছিক। শিরোনামের ভেতরে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              HILITE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },

    // URLs (background video + YouTube)
    {
      type: 'row',
      fields: [
        {
          name: 'backgroundVideoUrl',
          type: 'text',
          label: 'Background Video URL',
          required: true,
          maxLength: URL_MAX,
          // validate: validateAbsoluteHTTPUrl(URL_MAX, true),
          validate: validateBackgroundVideoUrl(URL_MAX, true),
          defaultValue: '/assets/videos/bg.mp4',
          admin: {
            width: '50%',
            description: `Either an internal path starting with “/assets” or an absolute http(s) video URL (MP4/WebM/HLS). Max ${URL_MAX}. (/assets/videos/bg.mp4)`,
          },
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube URL',
          required: true,
          maxLength: URL_MAX,
          validate: validateYouTubeLinkWithMax(URL_MAX),
          defaultValue: 'https://www.youtube.com/embed/YbnlDrexiGE',
          admin: {
            width: '50%',
            description: `youtube.com / youtu.be / youtube-nocookie.com only. Max ${URL_MAX} (${bnNum(
              URL_MAX,
            )}) chars.`,
          },
        },
      ],
    },

    // Button texts (EN / BN)
    {
      type: 'row',
      fields: [
        {
          name: 'youtubeButtonText',
          type: 'text',
          label: 'YouTube Button Text',
          required: true,
          maxLength: BTN_TEXT_MAX,
          validate: validateShortText('YouTube Button Text', BTN_TEXT_MAX, true),
          defaultValue: 'From The Expert',
          admin: {
            width: '50%',
            description: `Button label. Max ${BTN_TEXT_MAX} (${bnNum(BTN_TEXT_MAX)}) characters.`,
          },
        },
        {
          name: 'youtubeButtonTextBN',
          type: 'text',
          label: 'বাটনের টেক্সট (বাংলা)',
          required: true,
          maxLength: BTN_TEXT_MAX,
          validate: validateShortText('YouTube Button Text (BN)', BTN_TEXT_MAX, true),
          defaultValue: 'এক্সপার্টদের থেকে',
          admin: {
            width: '50%',
            description: `বাটনের লেবেল। সর্বোচ্চ ${bnNum(BTN_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Thumbnail (default media upload)
    // {
    //   name: 'thumbnail',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   label: 'Thumbnail Image',
    //   admin: {
    //     description: `Poster/thumbnail for the background video (16:9 recommended, ~300KB).`,
    //   },
    // },
    // Thumbnail (generated via media lifecycle)
    ...generateImageFields({
      fieldName: 'thumbnail',
      label: 'Thumbnail Image',
      description: 'Poster/thumbnail for the background video (16:9 recommended).',
      aspectRatio: 16 / 9,
      quality: 0.93,
      maxKB: 500,
      ownerCollection: HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG as any,
    } as any),
  ],
}

export default LifeInsuranceVideoSchema
