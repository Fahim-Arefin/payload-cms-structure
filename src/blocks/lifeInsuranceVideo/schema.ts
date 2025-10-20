// // collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import { HOME_PAGE_ADMIN_GROUP, HOME_PAGE_VIDEO_SLUG_AND_TAG } from '@/lib/constants'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 80
// const URL_MAX = 300
// const BTN_TEXT_MAX = 24
// const HILITE_MAX = 40

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /** Require absolute http(s) URL (for background video). */
// const validateAbsoluteHTTPUrl =
//   (max = URL_MAX, required = true) =>
//   (val: unknown) => {
//     const link = (val ?? '').toString().trim()
//     if (required && !link) return 'URL is required.'
//     if (!link) return true
//     if (link.length > max) return `URL must be at most ${max} characters.`
//     try {
//       const u = new URL(link)
//       const ok = u.protocol === 'http:' || u.protocol === 'https:'
//       return ok ? true : 'URL must be http(s).'
//     } catch {
//       return 'Provide a valid absolute http(s) URL.'
//     }
//   }

// /** YouTube-only http(s) URL (watch/embed/youtu.be/youtube-nocookie allowed). */
// const validateYouTubeLinkWithMax = (max: number) => (val: unknown) => {
//   const link = (val ?? '').toString().trim()
//   if (!link) return 'YouTube URL is required.'
//   if (link.length > max) return `YouTube URL must be at most ${max} characters.`
//   try {
//     const u = new URL(link)
//     const host = u.hostname.toLowerCase()
//     const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
//     const isYouTube =
//       host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')
//     if (!isHttp) return 'YouTube URL must be http(s).'
//     if (!isYouTube) return 'Only YouTube links are allowed.'
//     return true
//   } catch {
//     return 'Provide a valid YouTube URL.'
//   }
// }

// /** Highlight must appear verbatim inside a target text field */
// const validateHighlightedInField =
//   (label: string, targetField: string, max = 120, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
//     return true
//   }

// /* ---------------- image config (thumbnail) ---------------- */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'thumbnail',
//     label: 'Thumbnail Image',
//     description: 'Poster/thumbnail for the background video (16:9 recommended).',
//     aspectRatio: 16 / 9,
//     quality: 0.8,
//     maxKB: 300,
//   },
// ]

// /* ---------------- collection ---------------- */
// const HomeVideo: CollectionConfig = {
//   slug: HOME_PAGE_VIDEO_SLUG_AND_TAG,
//   admin: {
//     useAsTitle: 'title',
//     defaultColumns: ['title', 'updatedAt'],
//     group: HOME_PAGE_ADMIN_GROUP,
//     description: 'Homepage → Background video (URL) + required thumbnail and YouTube CTA.',
//   },
//   access: createSingleDocAccess(HOME_PAGE_VIDEO_SLUG_AND_TAG),

//   fields: [
//     // hidden per-doc session id for temp upload lifecycle (cropper + hooks)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Title (EN/BN) + Highlight (EN/BN) in paired rows
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           label: 'Section Title',
//           required: true,
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading for this section. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           label: 'সেকশন শিরোনাম (বাংলা)',
//           required: true,
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `এই সেকশনের প্রধান শিরোনাম। সর্বোচ্চ ${TITLE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within title)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear verbatim inside the Section Title. Max ${HILITE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (BN)',
//             'titleBN',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। অবশ্যই সেকশন শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${HILITE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     // YouTube URL (link only) + Button text EN/BN
//     {
//       type: 'row',
//       fields: [
//         // Background video URL (link only; no BN)
//         {
//           name: 'backgroundVideoUrl',
//           type: 'text',
//           label: 'Background Video URL',
//           required: true,
//           maxLength: URL_MAX,
//           validate: validateAbsoluteHTTPUrl(URL_MAX, true),
//           admin: {
//             width: '50%',
//             description:
//               'Absolute http(s) URL to your video file/stream (e.g., MP4/WebM/HLS). Max 300 characters.',
//           },
//           defaultValue: 'https://s3.ap-southeast-1.wasabisys.com/shantalife-static/assets/bg.mp4',
//         },
//         {
//           name: 'youtubeUrl',
//           type: 'text',
//           label: 'YouTube URL',
//           required: true,
//           maxLength: URL_MAX,
//           validate: validateYouTubeLinkWithMax(URL_MAX),
//           defaultValue: 'https://www.youtube.com/embed/YbnlDrexiGE',
//           admin: {
//             width: '50%',
//             description: 'youtube.com / youtu.be / youtube-nocookie.com only. Max 300 characters.',
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'youtubeButtonText',
//           type: 'text',
//           label: 'YouTube Button Text',
//           required: true,
//           maxLength: BTN_TEXT_MAX,
//           validate: validateShortText('YouTube Button Text', BTN_TEXT_MAX, true),
//           admin: { width: '50%', description: `Button label. Max ${BTN_TEXT_MAX} characters.` },
//           defaultValue: 'From The Expert',
//         },
//         {
//           name: 'youtubeButtonTextBN',
//           type: 'text',
//           label: 'বাটনের টেক্সট (বাংলা)',
//           required: true,
//           maxLength: BTN_TEXT_MAX,
//           validate: validateShortText('YouTube Button Text (BN)', BTN_TEXT_MAX, true),
//           admin: { width: '50%', description: `বাটনের লেবেল। সর্বোচ্চ ${BTN_TEXT_MAX} অক্ষর।` },
//           defaultValue: 'বিশেষজ্ঞের কাছ থেকে',
//         },
//       ],
//     },

//     // Thumbnail (required; direct upload from cropper)
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: HOME_PAGE_VIDEO_SLUG_AND_TAG, // tag uploads to this section
//         required: true, // make the image required
//       } as any),
//     ),
//   ],

//   // unified media lifecycle: finalize on success, purge temps on error, diff-delete on edits
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [],
//     skipOnDraft: true,
//     singleDocSlug: HOME_PAGE_VIDEO_SLUG_AND_TAG,
//     collectionSlug: HOME_PAGE_VIDEO_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(HOME_PAGE_VIDEO_SLUG_AND_TAG)
//       // Fire-and-forget cleanup for temporary:true media
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default HomeVideo

// ==========================================================================
// ==========================================================================
// ==========================================================================
// ==========================================================================

// src/payload/blocks/HomeVideo.ts
import {
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

/** Require absolute http(s) URL (for background video). */
const validateAbsoluteHTTPUrl =
  (max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'URL is required.'
    if (!link) return true
    if (link.length > max) return `URL must be at most ${max} characters.`
    try {
      const u = new URL(link)
      const ok = u.protocol === 'http:' || u.protocol === 'https:'
      return ok ? true : 'URL must be http(s).'
    } catch {
      return 'Provide a valid absolute http(s) URL.'
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
          validate: validateAbsoluteHTTPUrl(URL_MAX, true),
          defaultValue: 'https://s3.ap-southeast-1.wasabisys.com/shantalife-static/assets/bg.mp4',
          admin: {
            width: '50%',
            description: `Absolute http(s) video URL (MP4/WebM/HLS). Max ${URL_MAX} (${bnNum(
              URL_MAX,
            )}) chars.`,
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
