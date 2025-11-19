import { bnNum } from './../../lib/utils'
// import type { Block } from 'payload'

// /* ---------- limits ---------- */
// const BUTTON_LABEL_MAX = 24
// const URL_MAX = 300

// /* ---------- validators ---------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// /** Absolute http(s) URL and must be a YouTube host. */
// const validateYouTubeUrl =
//   (max = URL_MAX, required = true) =>
//   (val: unknown) => {
//     const link = (val ?? '').toString().trim()
//     if (required && !link) return 'YouTube URL is required.'
//     if (!link) return true
//     if (link.length > max) return `YouTube URL must be at most ${max} characters.`
//     try {
//       const u = new URL(link)
//       const host = u.hostname.toLowerCase()
//       const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
//       const isYouTube =
//         host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')
//       if (!isHttp) return 'URL must be http(s).'
//       if (!isYouTube) return 'Please enter a valid YouTube URL.'
//       return true
//     } catch {
//       return 'Provide a valid absolute http(s) YouTube URL.'
//     }
//   }

// export const youtubeVideoButton: Block = {
//   slug: 'youtubeVideo',
//   labels: {
//     singular: 'YouTube Video Button',
//     plural: 'YouTube Video Button',
//   },
//   fields: [
//     {
//       name: 'label',
//       type: 'text',
//       required: true,
//       label: 'Button Text',
//       defaultValue: 'Watch Video',
//       maxLength: BUTTON_LABEL_MAX,
//       validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
//       admin: { description: `Max ${BUTTON_LABEL_MAX} characters.` },
//     },
//     {
//       name: 'youtubeUrl',
//       type: 'text',
//       required: true,
//       label: 'YouTube URL',
//       maxLength: URL_MAX,
//       validate: validateYouTubeUrl(URL_MAX, true),
//       admin: {
//         description:
//           'Paste a YouTube link (watch, share, or embed). Example: https://www.youtube.com/watch?v=XXXX or https://youtu.be/XXXX',
//       },
//     },
//   ],
// }

// ================================================================================================================================
// ================================================================================================================================
// ================================================================================================================================
// ================================================================================================================================

import type { Block } from 'payload'

/* ---------- limits ---------- */
const BUTTON_LABEL_MAX = 40
const URL_MAX = 300

/* ---------- validators ---------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    return true
  }

/** Absolute http(s) URL and must be a YouTube host. */
const validateYouTubeUrl =
  (max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'YouTube URL is required.'
    if (!link) return true
    if (link.length > max) return `YouTube URL must be at most ${max} characters.`
    try {
      const u = new URL(link)
      const host = u.hostname.toLowerCase()
      const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
      const isYouTube =
        host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')
      if (!isHttp) return 'URL must be http(s).'
      if (!isYouTube) return 'Please enter a valid YouTube URL.'
      return true
    } catch {
      return 'Provide a valid absolute http(s) YouTube URL.'
    }
  }

export const youtubeVideoButton: Block = {
  slug: 'youtubeVideo',
  labels: {
    singular: 'YouTube Video Button',
    plural: 'YouTube Video Button',
  },
  fields: [
    {
      type: 'row',
      fields: [
        // EN
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Button Text',
          defaultValue: 'From The Expert',
          maxLength: BUTTON_LABEL_MAX,
          validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
          admin: { width: '50%', description: `Max ${BUTTON_LABEL_MAX} characters.` },
        },

        // BN twins
        {
          name: 'labelBN',
          type: 'text',
          required: true,
          label: 'বাটনের টেক্সট (বাংলা)',
          defaultValue: 'আরো জানুন',
          maxLength: BUTTON_LABEL_MAX,
          validate: validateShortText('Button Text (BN)', BUTTON_LABEL_MAX, true),
          admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(BUTTON_LABEL_MAX)} অক্ষর।` },
        },
      ],
    },

    {
      name: 'youtubeUrl',
      type: 'text',
      required: true,
      label: 'YouTube URL',
      maxLength: URL_MAX,
      validate: validateYouTubeUrl(URL_MAX, true),
      admin: {
        description:
          'Paste a YouTube link (watch, share, or embed). Example: https://www.youtube.com/watch?v=XXXX or https://youtu.be/XXXX',
      },
      defaultValue: 'https://www.youtube.com/embed/YbnlDrexiGE',
    },
  ],
}
