// import { revalidateTag } from 'next/cache'
// import type { GlobalConfig } from 'payload'

// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'

// /* ---------------- max length constants ---------------- */
// const UPLOAD_SESSION_ID_MAX = 64
// const EMAIL_MAX = 120
// const PHONE_MAX = 40
// const PHONE_NOTE_MAX = 80
// const ADDRESS_MAX = 200
// const LABEL_MAX = 40
// const URL_MAX = 300
// const COPYRIGHT_MAX = 200
// const COPYRIGHT_HILITE_MAX = 120

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// const validateEmail =
//   (max = EMAIL_MAX, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return 'Email is required.'
//     if (!s) return true
//     if (s.length > max) return `Email must be at most ${max} characters.`
//     const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
//     return ok ? true : 'Provide a valid email address.'
//   }

// const validatePhone =
//   (max = PHONE_MAX, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return 'Phone is required.'
//     if (!s) return true
//     if (s.length > max) return `Phone must be at most ${max} characters.`
//     // allow +, digits, spaces, dashes, parentheses; 6–20 chars; at least 6 digits overall
//     if (!/^\+?[0-9 ()-]{6,20}$/.test(s)) return 'Provide a valid phone number.'
//     const digits = s.replace(/\D/g, '')
//     if (digits.length < 6) return 'Phone must contain at least 6 digits.'
//     return true
//   }

// /** Require absolute http(s) URL. Internal paths are NOT allowed. */
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

// /** Allow either internal path (starts with "/") OR absolute http(s) URL. */
// const validateNavUrl =
//   (max = URL_MAX, required = true) =>
//   (val: unknown) => {
//     const link = (val ?? '').toString().trim()
//     if (required && !link) return 'Link is required.'
//     if (!link) return true
//     if (link.length > max) return `Link must be at most ${max} characters.`

//     // Allow internal path:
//     if (link.startsWith('/')) return true

//     // Or absolute http(s) URL:
//     try {
//       const u = new URL(link)
//       if (u.protocol === 'http:' || u.protocol === 'https:') return true
//     } catch {
//       /* fall through */
//     }

//     // ✅ Clear, accurate error for both cases
//     return 'Link must start with "/" or be a valid http(s) URL.'
//   }

// const validateMaxItems = (labelPlural: string, max: number) => (val: unknown) => {
//   if (!Array.isArray(val)) return true
//   if (val.length > max) return `Provide at most ${max} ${labelPlural.toLowerCase()}.`
//   return true
// }

// /** "Highlighted" text must appear verbatim inside the target text field */
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

// /* ---------------- images ---------------- */
// /** Only the logo remains. */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'logo',
//     label: 'Footer Logo',
//     description: 'Primary footer logo.',
//     aspectRatio: 1,
//     quality: 0.9,
//     maxKB: 50,
//   },
// ]

// /* ---------------- global ---------------- */
// const Footer: GlobalConfig = {
//   slug: GLOBAL_FOOTER_SLUG_AND_TAG,
//   label: 'Footer',
//   admin: {
//     description:
//       'Site-wide footer: logo & contact, Explore & Legal links, Social URLs, and Copyright.',
//   },

//   fields: [
//     // Hidden session id for temp upload lifecycle (used by cropper + hooks)
//     {
//       name: 'uploadSessionId',
//       type: 'text',
//       maxLength: UPLOAD_SESSION_ID_MAX,
//       validate: validateShortText('Upload Session ID', UPLOAD_SESSION_ID_MAX, false),
//       admin: { condition: () => false },
//     },

//     /* 1) Branding & contact */
//     {
//       name: 'branding',
//       type: 'group',
//       label: 'Branding & Contact',
//       admin: {
//         description: 'Footer logo and basic contact details shown at the top of the footer.',
//       },
//       fields: [
//         // Logo (direct-upload cropper; writes logoBlurDataURL on the doc)
//         ...generateImageFields({
//           ...(IMAGE_CONFIGS[0] as ImageConfig),
//           ownerCollection: GLOBAL_FOOTER_SLUG_AND_TAG,
//         } as any),

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'email',
//               type: 'text',
//               label: 'Email',
//               required: true,
//               maxLength: EMAIL_MAX,
//               validate: validateEmail(EMAIL_MAX, true),
//               admin: { width: '50%' },
//               defaultValue: 'info@shantalife.com',
//             },
//             {
//               name: 'phone',
//               type: 'text',
//               label: 'Phone',
//               required: true,
//               maxLength: PHONE_MAX,
//               validate: validatePhone(PHONE_MAX, true),
//               admin: { width: '50%' },
//               defaultValue: '+88 09610889900',
//             },
//           ],
//         },
//         {
//           name: 'phoneNote',
//           type: 'text',
//           label: 'Phone Note',
//           maxLength: PHONE_NOTE_MAX,
//           validate: validateShortText('Phone Note', PHONE_NOTE_MAX, false),
//           defaultValue: '(10 am-6 pm, Sunday-Thursday)',
//           admin: {
//             description: 'Shown under the phone number, e.g., service hours or days (optional).',
//           },
//         },
//         {
//           name: 'address',
//           type: 'text',
//           label: 'Address',
//           required: true,
//           maxLength: ADDRESS_MAX,
//           validate: validateShortText('Address', ADDRESS_MAX, true),
//           defaultValue:
//             'Shanta Western Tower, Level 10, 186 Bir Uttam Mir Shawkat Sarak, Dhaka 1208',
//         },
//       ],
//     },

//     /* 2) Explore links (max 9) */
//     {
//       name: 'explore',
//       type: 'array',
//       label: 'Explore Links',
//       minRows: 0,
//       maxRows: 9,
//       validate: validateMaxItems('Explore links', 9),
//       admin: {
//         description:
//           'Navigation links for the “Explore” column. You can use internal paths (e.g., /plans) or full http(s) URLs.',
//       },
//       labels: { singular: 'Explore Link', plural: 'Explore Links' },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'label',
//               type: 'text',
//               required: true,
//               label: 'Label',
//               maxLength: LABEL_MAX,
//               validate: validateShortText('Label', LABEL_MAX, true),
//               admin: { width: '50%' },
//             },
//             {
//               name: 'url',
//               type: 'text',
//               required: true,
//               label: 'URL',
//               maxLength: URL_MAX,
//               validate: validateNavUrl(URL_MAX, true),
//               admin: { width: '50%' },
//             },
//           ],
//         },
//       ],
//     },

//     /* 3) Legal links (max 9) */
//     {
//       name: 'legal',
//       type: 'array',
//       label: 'Legal Links',
//       minRows: 0,
//       maxRows: 9,
//       validate: validateMaxItems('Legal links', 9),
//       admin: {
//         description:
//           'Links for the “Legal” column (e.g., Privacy Policy, Terms). Internal paths or http(s) URLs are allowed.',
//       },
//       labels: { singular: 'Legal Link', plural: 'Legal Links' },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'label',
//               type: 'text',
//               required: true,
//               label: 'Label',
//               maxLength: LABEL_MAX,
//               validate: validateShortText('Label', LABEL_MAX, true),
//               admin: { width: '50%' },
//             },
//             {
//               name: 'url',
//               type: 'text',
//               required: true,
//               label: 'URL',
//               maxLength: URL_MAX,
//               validate: validateNavUrl(URL_MAX, true),
//               admin: { width: '50%' },
//             },
//           ],
//         },
//       ],
//     },

//     /* 4) Social (URLs only) */
//     {
//       name: 'social',
//       type: 'group',
//       label: 'Find Us',
//       admin: {
//         description: 'Public social profile links (must be absolute http(s) URLs).',
//       },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'facebookUrl',
//               type: 'text',
//               label: 'Facebook URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.facebook.com/profile.php?id=61566152682701',
//             },
//             {
//               name: 'youtubeUrl',
//               type: 'text',
//               label: 'YouTube URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.youtube.com/@ShantaLifeInsurance',
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'linkedinUrl',
//               type: 'text',
//               label: 'LinkedIn URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.linkedin.com/company/shanta-life-insurance',
//             },
//             {
//               name: 'instagramUrl',
//               type: 'text',
//               label: 'Instagram URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.instagram.com/shanta_life_insurance',
//             },
//           ],
//         },
//       ],
//     },

//     /* 5) Copyright + highlight */
//     {
//       name: 'copyright',
//       type: 'text',
//       label: 'Copyright Text',
//       required: true,
//       maxLength: COPYRIGHT_MAX,
//       validate: validateShortText('Copyright', COPYRIGHT_MAX, true),
//       defaultValue: 'Copyright © 2025 Shanta Life Insurance PLC. All Rights Reserved',
//       admin: {
//         description: 'Main copyright line shown at the bottom of the footer.',
//       },
//     },
//     {
//       name: 'copyrightHighlightedText',
//       type: 'text',
//       label: 'Copyright Highlight (within copyright)',
//       maxLength: COPYRIGHT_HILITE_MAX,
//       validate: validateHighlightedInField(
//         'Copyright Highlight',
//         'copyright',
//         COPYRIGHT_HILITE_MAX,
//         false,
//       ),
//       admin: {
//         description:
//           'Optional. Must appear verbatim somewhere inside the Copyright Text (e.g., a company name to style).',
//       },
//     },
//   ],

//   // finalize/purge + diff-delete flow (only the logo image now)
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [], // poweredByImages removed
//     skipOnDraft: true,
//     collectionSlug: GLOBAL_FOOTER_SLUG_AND_TAG,
//     onAfterChange: async () => {
//       revalidateTag(GLOBAL_FOOTER_SLUG_AND_TAG)
//     },
//   }) as any,
// }

// export default Footer

// =============================================================================
// =============================================================================
// =============================================================================

// import type { GlobalConfig } from 'payload'

// import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'

// /* ---------------- max length constants ---------------- */
// const EMAIL_MAX = 120
// const PHONE_MAX = 40
// const PHONE_NOTE_MAX = 80
// const ADDRESS_MAX = 200
// const LABEL_MAX = 40
// const URL_MAX = 300
// const COPYRIGHT_MAX = 200
// const COPYRIGHT_HILITE_MAX = 120

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// const validateEmail =
//   (max = EMAIL_MAX, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return 'Email is required.'
//     if (!s) return true
//     if (s.length > max) return `Email must be at most ${max} characters.`
//     const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
//     return ok ? true : 'Provide a valid email address.'
//   }

// const validatePhone =
//   (max = PHONE_MAX, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return 'Phone is required.'
//     if (!s) return true
//     if (s.length > max) return `Phone must be at most ${max} characters.`
//     // allow +, digits, spaces, dashes, parentheses; 6–20 chars; at least 6 digits overall
//     if (!/^\+?[0-9 ()-]{6,20}$/.test(s)) return 'Provide a valid phone number.'
//     const digits = s.replace(/\D/g, '')
//     if (digits.length < 6) return 'Phone must contain at least 6 digits.'
//     return true
//   }

// /** Require absolute http(s) URL. Internal paths are NOT allowed. */
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

// /** Allow either internal path (starts with "/") OR absolute http(s) URL. */
// const validateNavUrl =
//   (max = URL_MAX, required = true) =>
//   (val: unknown) => {
//     const link = (val ?? '').toString().trim()
//     if (required && !link) return 'Link is required.'
//     if (!link) return true
//     if (link.length > max) return `Link must be at most ${max} characters.`

//     // Allow internal path:
//     if (link.startsWith('/')) return true

//     // Or absolute http(s) URL:
//     try {
//       const u = new URL(link)
//       if (u.protocol === 'http:' || u.protocol === 'https:') return true
//     } catch {
//       /* fall through */
//     }

//     // ✅ Clear, accurate error for both cases
//     return 'Link must start with "/" or be a valid http(s) URL.'
//   }

// const validateMaxItems = (labelPlural: string, max: number) => (val: unknown) => {
//   if (!Array.isArray(val)) return true
//   if (val.length > max) return `Provide at most ${max} ${labelPlural.toLowerCase()}.`
//   return true
// }

// /** "Highlighted" text must appear verbatim inside the target text field */
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

// /* ---------------- global ---------------- */
// const Footer: GlobalConfig = {
//   slug: GLOBAL_FOOTER_SLUG_AND_TAG,
//   label: 'Footer',
//   admin: {
//     description:
//       'Site-wide footer: logo & contact, Explore & Legal links, Social URLs, and Copyright.',
//   },

//   fields: [
//     /* 1) Branding & contact */
//     {
//       name: 'branding',
//       type: 'group',
//       label: 'Branding & Contact',
//       admin: {
//         description: 'Footer logo and basic contact details shown at the top of the footer.',
//       },
//       fields: [
//         // Logo (direct-upload cropper; writes logoBlurDataURL on the doc)
//         {
//           name: 'logo',
//           label: 'Footer Logo',
//           type: 'upload',
//           relationTo: 'media',
//           required: true,
//           admin: { description: 'Primary footer logo. Recommended square, ~50KB.' },
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'email',
//               type: 'text',
//               label: 'Email',
//               required: true,
//               maxLength: EMAIL_MAX,
//               validate: validateEmail(EMAIL_MAX, true),
//               admin: { width: '50%' },
//               defaultValue: 'info@shantalife.com',
//             },
//             {
//               name: 'phone',
//               type: 'text',
//               label: 'Phone',
//               required: true,
//               maxLength: PHONE_MAX,
//               validate: validatePhone(PHONE_MAX, true),
//               admin: { width: '50%' },
//               defaultValue: '+88 09610889900',
//             },
//           ],
//         },
//         {
//           name: 'phoneNote',
//           type: 'text',
//           label: 'Phone Note',
//           maxLength: PHONE_NOTE_MAX,
//           validate: validateShortText('Phone Note', PHONE_NOTE_MAX, false),
//           defaultValue: '(10 am-6 pm, Sunday-Thursday)',
//           admin: {
//             description: 'Shown under the phone number, e.g., service hours or days (optional).',
//           },
//         },
//         {
//           name: 'address',
//           type: 'text',
//           label: 'Address',
//           required: true,
//           maxLength: ADDRESS_MAX,
//           validate: validateShortText('Address', ADDRESS_MAX, true),
//           defaultValue:
//             'Shanta Western Tower, Level 10, 186 Bir Uttam Mir Shawkat Sarak, Dhaka 1208',
//         },
//       ],
//     },

//     /* 2) Explore links (max 9) */
//     {
//       name: 'explore',
//       type: 'array',
//       label: 'Explore Links',
//       minRows: 0,
//       maxRows: 9,
//       validate: validateMaxItems('Explore links', 9),
//       admin: {
//         description:
//           'Navigation links for the “Explore” column. You can use internal paths (e.g., /plans) or full http(s) URLs.',
//       },
//       labels: { singular: 'Explore Link', plural: 'Explore Links' },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'label',
//               type: 'text',
//               required: true,
//               label: 'Label',
//               maxLength: LABEL_MAX,
//               validate: validateShortText('Label', LABEL_MAX, true),
//               admin: { width: '50%' },
//             },
//             {
//               name: 'url',
//               type: 'text',
//               required: true,
//               label: 'URL',
//               maxLength: URL_MAX,
//               validate: validateNavUrl(URL_MAX, true),
//               admin: { width: '50%' },
//             },
//           ],
//         },
//       ],
//     },

//     /* 3) Legal links (max 9) */
//     {
//       name: 'legal',
//       type: 'array',
//       label: 'Legal Links',
//       minRows: 0,
//       maxRows: 9,
//       validate: validateMaxItems('Legal links', 9),
//       admin: {
//         description:
//           'Links for the “Legal” column (e.g., Privacy Policy, Terms). Internal paths or http(s) URLs are allowed.',
//       },
//       labels: { singular: 'Legal Link', plural: 'Legal Links' },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'label',
//               type: 'text',
//               required: true,
//               label: 'Label',
//               maxLength: LABEL_MAX,
//               validate: validateShortText('Label', LABEL_MAX, true),
//               admin: { width: '50%' },
//             },
//             {
//               name: 'url',
//               type: 'text',
//               required: true,
//               label: 'URL',
//               maxLength: URL_MAX,
//               validate: validateNavUrl(URL_MAX, true),
//               admin: { width: '50%' },
//             },
//           ],
//         },
//       ],
//     },

//     /* 4) Social (URLs only) */
//     {
//       name: 'social',
//       type: 'group',
//       label: 'Find Us',
//       admin: {
//         description: 'Public social profile links (must be absolute http(s) URLs).',
//       },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'facebookUrl',
//               type: 'text',
//               label: 'Facebook URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.facebook.com/profile.php?id=61566152682701',
//             },
//             {
//               name: 'youtubeUrl',
//               type: 'text',
//               label: 'YouTube URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.youtube.com/@ShantaLifeInsurance',
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'linkedinUrl',
//               type: 'text',
//               label: 'LinkedIn URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.linkedin.com/company/shanta-life-insurance',
//             },
//             {
//               name: 'instagramUrl',
//               type: 'text',
//               label: 'Instagram URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true), // absolute only
//               admin: { width: '50%' },
//               defaultValue: 'https://www.instagram.com/shanta_life_insurance',
//             },
//           ],
//         },
//       ],
//     },

//     /* 5) Copyright + highlight */
//     {
//       name: 'copyright',
//       type: 'text',
//       label: 'Copyright Text',
//       required: true,
//       maxLength: COPYRIGHT_MAX,
//       validate: validateShortText('Copyright', COPYRIGHT_MAX, true),
//       defaultValue: 'Copyright © 2025 Shanta Life Insurance PLC. All Rights Reserved',
//       admin: {
//         description: 'Main copyright line shown at the bottom of the footer.',
//       },
//     },
//     {
//       name: 'copyrightHighlightedText',
//       type: 'text',
//       label: 'Copyright Highlight (within copyright)',
//       maxLength: COPYRIGHT_HILITE_MAX,
//       validate: validateHighlightedInField(
//         'Copyright Highlight',
//         'copyright',
//         COPYRIGHT_HILITE_MAX,
//         false,
//       ),
//       admin: {
//         description:
//           'Optional. Must appear verbatim somewhere inside the Copyright Text (e.g., a company name to style).',
//       },
//     },
//   ],
// }

// export default Footer

// ============================================================================
// ============================================================================
// ============================================================================
// src/globals/Footer.ts
import type { GlobalConfig } from 'payload'
import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { revalidateTag } from 'next/cache'
import { globalTag } from '@/lib/cacheTags'

/* ---------------- max length constants ---------------- */
const EMAIL_MAX = 120
const PHONE_MAX = 40
const PHONE_NOTE_MAX = 80
const ADDRESS_MAX = 200
const LABEL_MAX = 40
const URL_MAX = 300
const COPYRIGHT_MAX = 200
const COPYRIGHT_HILITE_MAX = 120

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    return true
  }

// BN twin (Bangla messages)
const validateShortTextBN =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} আবশ্যক।`
    if (!s) return true
    if (s.length > max) return `${label} সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`
    return true
  }

const validateEmail =
  (max = EMAIL_MAX, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return 'Email is required.'
    if (!s) return true
    if (s.length > max) return `Email must be at most ${max} characters.`
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
    return ok ? true : 'Provide a valid email address.'
  }

const validatePhone =
  (max = PHONE_MAX, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return 'Phone is required.'
    if (!s) return true
    if (s.length > max) return `Phone must be at most ${max} characters.`
    if (!/^\+?[0-9 ()-]{6,20}$/.test(s)) return 'Provide a valid phone number.'
    const digits = s.replace(/\D/g, '')
    if (digits.length < 6) return 'Phone must contain at least 6 digits.'
    return true
  }
// ✨ add near the other validators/helpers
const normalizeDigits = (s: string) =>
  s.replace(/[০-৯]/g, (ch) => '0123456789'['০১২৩৪৫৬৭৮৯'.indexOf(ch)])

/** BN-side phone validator: allows Bangla or ASCII digits, +, spaces, (), -; requires ≥6 digits */
const validatePhoneBN =
  (max = PHONE_MAX, required = true) =>
  (val: unknown) => {
    const raw = (val ?? '').toString().trim()
    if (required && !raw) return 'ফোন নম্বর আবশ্যক।'
    if (!raw) return true
    if (raw.length > max) return `ফোন নম্বর সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`

    // allow Bangla digits too: ০-৯
    const allowed = /^\+?[0-9০-৯ ()-]{6,20}$/.test(raw)
    if (!allowed) return 'একটি বৈধ ফোন নম্বর প্রদান করুন।'

    // normalize to ASCII for digit count
    const ascii = normalizeDigits(raw)
    const digits = ascii.replace(/\D/g, '')
    if (digits.length < 6) return 'ফোন নম্বরে অন্তত ৬টি সংখ্যা থাকতে হবে।'
    return true
  }

/** Absolute http(s) URL only */
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

/** Internal path ("/…") OR absolute http(s) URL */
const validateNavUrl =
  (max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'Link is required.'
    if (!link) return true
    if (link.length > max) return `Link must be at most ${max} characters.`
    if (link.startsWith('/')) return true
    try {
      const u = new URL(link)
      if (u.protocol === 'http:' || u.protocol === 'https:') return true
    } catch {}
    return 'Link must start with "/" or be a valid http(s) URL.'
  }

const validateMaxItems = (labelPlural: string, max: number) => (val: unknown) => {
  if (!Array.isArray(val)) return true
  if (val.length > max) return `Provide at most ${max} ${labelPlural.toLowerCase()}.`
  return true
}

/** Highlighted must exist in target text (EN) */
const validateHighlightedInField =
  (label: string, targetField: string, max = COPYRIGHT_HILITE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

/** Highlighted must exist in target text (BN) */
const validateHighlightedInFieldBN =
  (label: string, targetField: string, max = COPYRIGHT_HILITE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} আবশ্যক।`
    if (!s) return true
    if (s.length > max) return `${label} সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} অবশ্যই ${targetField} এর ভিতরে হুবহু থাকতে হবে।`
    return true
  }

/* ---------------- global ---------------- */
const Footer: GlobalConfig = {
  slug: GLOBAL_FOOTER_SLUG_AND_TAG,
  label: 'Footer',
  admin: {
    description:
      'Site-wide footer: logo & contact, Explore & Legal links, Social URLs, and Copyright.',
  },

  fields: [
    /* 1) Branding & contact */
    {
      name: 'branding',
      type: 'group',
      label: 'Branding & Contact',
      admin: {
        description: 'Footer logo and basic contact details shown at the top of the footer.',
      },
      fields: [
        {
          name: 'logo',
          label: 'Footer Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { description: 'Primary footer logo. Recommended square, ~50KB.' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              type: 'text',
              label: 'Email',
              required: true,
              maxLength: EMAIL_MAX,
              validate: validateEmail(EMAIL_MAX, true),
              admin: { width: '50%' },
              defaultValue: 'info@shantalife.com',
            },
            {
              name: 'mapUrl',
              type: 'text',
              label: 'Google Maps URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, false),
              defaultValue:
                'https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507',
              admin: {
                width: '50%',
                description:
                  'Public Google Maps link to your location. Must be an absolute http(s) URL.',
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Phone',
              required: true,
              maxLength: PHONE_MAX,
              validate: validatePhone(PHONE_MAX, true),
              admin: { width: '50%' },
              defaultValue: '+88 09610889900',
            },
            {
              name: 'phoneBN',
              type: 'text',
              label: 'ফোন (বাংলা)',
              required: true,
              maxLength: PHONE_MAX,
              validate: validatePhoneBN(PHONE_MAX, true),
              admin: {
                width: '50%',
                description: `বাংলা নম্বরে দিতে পারেন। সর্বোচ্চ ${bnNum(PHONE_MAX)} অক্ষর।`,
              },
              defaultValue: '+88 ০৯৬১০৮৮৯৯০০',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phoneNote',
              type: 'text',
              label: 'Phone Note',
              maxLength: PHONE_NOTE_MAX,
              validate: validateShortText('Phone Note', PHONE_NOTE_MAX, false),
              defaultValue: '(10 am-6 pm, Sunday-Thursday)',
              admin: {
                width: '50%',
                description: `Shown under the phone number (optional). Max ${PHONE_NOTE_MAX} chars (${bnNum(PHONE_NOTE_MAX)}).`,
              },
            },
            {
              name: 'phoneNoteBN',
              type: 'text',
              label: 'ফোন নোট (বাংলা)',
              maxLength: PHONE_NOTE_MAX,
              validate: validateShortTextBN('ফোন নোট', PHONE_NOTE_MAX, false),
              admin: {
                width: '50%',
                description: `ফোন নম্বরের নিচে দেখানো হবে (ঐচ্ছিক)। সর্বোচ্চ ${bnNum(PHONE_NOTE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Address',
              required: true,
              maxLength: ADDRESS_MAX,
              validate: validateShortText('Address', ADDRESS_MAX, true),
              defaultValue:
                'Shanta Western Tower, Level 10, 186 Bir Uttam Mir Shawkat Sarak, Dhaka 1208',
              admin: {
                width: '50%',
                description: `Mailing/visit address. Max ${ADDRESS_MAX} chars (${bnNum(ADDRESS_MAX)}).`,
              },
            },
            {
              name: 'addressBN',
              type: 'text',
              label: 'ঠিকানা (বাংলা)',
              required: true,
              maxLength: ADDRESS_MAX,
              validate: validateShortTextBN('ঠিকানা', ADDRESS_MAX, true),
              admin: {
                width: '50%',
                description: `বাংলায় ঠিকানা। সর্বোচ্চ ${bnNum(ADDRESS_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },

    /* 2) Explore links (max 9) */
    {
      name: 'exploreSection',
      type: 'group',
      label: 'Explore (Section)',
      admin: {
        description:
          'Header + links for the “Explore” column. Internal paths (e.g., /plans) or full http(s) URLs.',
      },
      fields: [
        // Header (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'exploreHeader',
              type: 'text',
              label: 'Explore Header',
              maxLength: LABEL_MAX,
              defaultValue: 'Explore',
              required: true,
              validate: validateShortText('Explore Header', LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `Overrides the Explore column title. Max ${LABEL_MAX} chars (${bnNum(
                  LABEL_MAX,
                )}).`,
              },
            },
            {
              name: 'exploreHeaderBN',
              type: 'text',
              label: 'হেডার (Explore)',
              maxLength: LABEL_MAX,
              defaultValue: 'এক্সপ্লোর',
              required: true,
              validate: validateShortTextBN('Explore হেডার', LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `Explore কলামের শিরোনাম। সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Links
        {
          name: 'explore',
          type: 'array',
          label: 'Explore Links',
          minRows: 0,
          maxRows: 9,
          validate: validateMaxItems('Explore links', 9),
          labels: { singular: 'Explore Link', plural: 'Explore Links' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                  maxLength: LABEL_MAX,
                  validate: validateShortText('Label', LABEL_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
                  },
                },
                {
                  name: 'labelBN',
                  type: 'text',
                  required: true,
                  label: 'লেবেল (বাংলা)',
                  maxLength: LABEL_MAX,
                  validate: validateShortTextBN('লেবেল', LABEL_MAX, true),
                  admin: {
                    width: '50%',
                    description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL / Path',
              maxLength: URL_MAX,
              validate: validateNavUrl(URL_MAX, true),
              admin: {
                description: `Starts with "/" or a full http(s) URL. Max ${URL_MAX} chars (${bnNum(
                  URL_MAX,
                )}).`,
              },
            },
          ],
        },
      ],
    },

    /* 3) Legal links (max 9) */
    {
      name: 'legalSection',
      type: 'group',
      label: 'Legal (Section)',
      admin: {
        description:
          'Header + links for the “Legal” column (e.g., Privacy Policy, Terms). Internal paths or full http(s) URLs.',
      },
      fields: [
        // Header (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'legalHeader',
              type: 'text',
              label: 'Legal Header',
              maxLength: LABEL_MAX,
              defaultValue: 'Legal',
              validate: validateShortText('Legal Header', LABEL_MAX, false),
              admin: {
                width: '50%',
                description: `Overrides the Legal column title. Max ${LABEL_MAX} chars (${bnNum(
                  LABEL_MAX,
                )}).`,
              },
            },
            {
              name: 'legalHeaderBN',
              type: 'text',
              label: 'হেডার (Legal)',
              maxLength: LABEL_MAX,
              defaultValue: 'লিগ্যাল',
              validate: validateShortTextBN('Legal হেডার', LABEL_MAX, false),
              admin: {
                width: '50%',
                description: `Legal কলামের শিরোনাম। সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Links
        {
          name: 'legal',
          type: 'array',
          label: 'Legal Links',
          minRows: 0,
          maxRows: 9,
          validate: validateMaxItems('Legal links', 9),
          labels: { singular: 'Legal Link', plural: 'Legal Links' },
          admin: {
            description:
              'Links for the “Legal” column (e.g., Privacy Policy, Terms). Internal paths or http(s) URLs.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                  maxLength: LABEL_MAX,
                  validate: validateShortText('Label', LABEL_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
                  },
                },
                {
                  name: 'labelBN',
                  type: 'text',
                  required: true,
                  label: 'লেবেল (বাংলা)',
                  maxLength: LABEL_MAX,
                  validate: validateShortTextBN('লেবেল', LABEL_MAX, true),
                  admin: {
                    width: '50%',
                    description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'URL / Path',
              maxLength: URL_MAX,
              validate: validateNavUrl(URL_MAX, true),
              admin: {
                description: `Starts with "/" or a full http(s) URL. Max ${URL_MAX} chars (${bnNum(
                  URL_MAX,
                )}).`,
              },
            },
          ],
        },
      ],
    },

    /* 4) Social (absolute URLs only) */
    {
      name: 'social',
      type: 'group',
      label: 'Find Us (Section)',
      admin: {
        description:
          'Section header + public social profile links (must be absolute http(s) URLs).',
      },
      fields: [
        // Section header (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'socialHeader',
              type: 'text',
              label: 'Social Header',
              maxLength: LABEL_MAX,
              defaultValue: 'Find us on',
              validate: validateShortText('Social Header', LABEL_MAX, false),
              admin: {
                width: '50%',
                description: `Overrides the Social column title. Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
              },
            },
            {
              name: 'socialHeaderBN',
              type: 'text',
              label: 'হেডার (Social)',
              maxLength: LABEL_MAX,
              defaultValue: 'আমাদের সোশ্যাল মিডিয়া প্ল্যাটফর্মসমূহ',
              validate: validateShortTextBN('Social হেডার', LABEL_MAX, false),
              admin: {
                width: '50%',
                description: `Social কলামের শিরোনাম। সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Absolute URLs
        {
          type: 'row',
          fields: [
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Facebook URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
              defaultValue: 'https://www.facebook.com/profile.php?id=61566152682701',
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'YouTube URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
              defaultValue: 'https://www.youtube.com/@ShantaLifeInsurance',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'linkedinUrl',
              type: 'text',
              label: 'LinkedIn URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
              defaultValue: 'https://www.linkedin.com/company/shanta-life-insurance',
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Instagram URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
              defaultValue: 'https://www.instagram.com/shanta_life_insurance',
            },
          ],
        },
      ],
    },

    /* 5) Copyright + highlight (EN/BN twins) */
    {
      type: 'row',
      fields: [
        {
          name: 'copyright',
          type: 'text',
          label: 'Copyright Text',
          required: true,
          maxLength: COPYRIGHT_MAX,
          validate: validateShortText('Copyright', COPYRIGHT_MAX, true),
          defaultValue: 'Copyright © 2025 Shanta Life Insurance PLC. All Rights Reserved',
          admin: {
            width: '50%',
            description: `Main copyright line. Max ${COPYRIGHT_MAX} chars (${bnNum(COPYRIGHT_MAX)}).`,
          },
        },
        {
          name: 'copyrightBN',
          type: 'text',
          label: 'কপিরাইট (বাংলা)',
          required: true,
          maxLength: COPYRIGHT_MAX,
          validate: validateShortTextBN('কপিরাইট', COPYRIGHT_MAX, true),
          admin: {
            width: '50%',
            description: `বাংলা কপিরাইট টেক্সট। সর্বোচ্চ ${bnNum(COPYRIGHT_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'copyrightHighlightedText',
          type: 'text',
          label: 'Copyright Highlight (within copyright)',
          maxLength: COPYRIGHT_HILITE_MAX,
          validate: validateHighlightedInField(
            'Copyright Highlight',
            'copyright',
            COPYRIGHT_HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `Optional; must appear verbatim inside Copyright. Max ${COPYRIGHT_HILITE_MAX} chars (${bnNum(
              COPYRIGHT_HILITE_MAX,
            )}).`,
          },
        },
        {
          name: 'copyrightHighlightedTextBN',
          type: 'text',
          label: 'কপিরাইট হাইলাইট (বাংলা)',
          maxLength: COPYRIGHT_HILITE_MAX,
          validate: validateHighlightedInFieldBN(
            'কপিরাইট হাইলাইট',
            'copyrightBN',
            COPYRIGHT_HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক; কপিরাইট (বাংলা)-এর মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
              COPYRIGHT_HILITE_MAX,
            )} অক্ষর।`,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag(globalTag(GLOBAL_FOOTER_SLUG_AND_TAG))
      },
    ],
  },
}

export default Footer
