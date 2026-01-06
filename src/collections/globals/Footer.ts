// import type { GlobalConfig } from 'payload'
// import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
// import { bnNum } from '@/lib/utils'
// import { revalidateTag } from 'next/cache'
// import { globalTag } from '@/lib/cacheTags'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { generateImageFields } from '@/utils/media/fieldGenerators'

// /* ---------------- max length constants ---------------- */
// const EMAIL_MAX = 120
// const PHONE_MAX = 40
// const PHONE_NOTE_MAX = 80
// const ADDRESS_MAX = 200
// const LABEL_MAX = 40
// const URL_MAX = 300
// const COPYRIGHT_MAX = 200
// const COPYRIGHT_HILITE_MAX = 120
// const CTA_TEXT_MAX = 24

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

// // BN twin (Bangla messages)
// const validateShortTextBN =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} আবশ্যক।`
//     if (!s) return true
//     if (s.length > max) return `${label} সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`
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
//     if (!/^\+?[0-9 ()-]{6,20}$/.test(s)) return 'Provide a valid phone number.'
//     const digits = s.replace(/\D/g, '')
//     if (digits.length < 6) return 'Phone must contain at least 6 digits.'
//     return true
//   }
// // ✨ add near the other validators/helpers
// const normalizeDigits = (s: string) =>
//   s.replace(/[০-৯]/g, (ch) => '0123456789'['০১২৩৪৫৬৭৮৯'.indexOf(ch)])

// /** BN-side phone validator: allows Bangla or ASCII digits, +, spaces, (), -; requires ≥6 digits */
// const validatePhoneBN =
//   (max = PHONE_MAX, required = true) =>
//   (val: unknown) => {
//     const raw = (val ?? '').toString().trim()
//     if (required && !raw) return 'ফোন নম্বর আবশ্যক।'
//     if (!raw) return true
//     if (raw.length > max) return `ফোন নম্বর সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`

//     // allow Bangla digits too: ০-৯
//     const allowed = /^\+?[0-9০-৯ ()-]{6,20}$/.test(raw)
//     if (!allowed) return 'একটি বৈধ ফোন নম্বর প্রদান করুন।'

//     // normalize to ASCII for digit count
//     const ascii = normalizeDigits(raw)
//     const digits = ascii.replace(/\D/g, '')
//     if (digits.length < 6) return 'ফোন নম্বরে অন্তত ৬টি সংখ্যা থাকতে হবে।'
//     return true
//   }

// /** Absolute http(s) URL only */
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

// /** Internal path ("/…") OR absolute http(s) URL */
// const validateNavUrl =
//   (max = URL_MAX, required = true) =>
//   (val: unknown) => {
//     const link = (val ?? '').toString().trim()
//     if (required && !link) return 'Link is required.'
//     if (!link) return true
//     if (link.length > max) return `Link must be at most ${max} characters.`
//     if (link.startsWith('/')) return true
//     try {
//       const u = new URL(link)
//       if (u.protocol === 'http:' || u.protocol === 'https:') return true
//     } catch {}
//     return 'Link must start with "/" or be a valid http(s) URL.'
//   }

// const validateMaxItems = (labelPlural: string, max: number) => (val: unknown) => {
//   if (!Array.isArray(val)) return true
//   if (val.length > max) return `Provide at most ${max} ${labelPlural.toLowerCase()}.`
//   return true
// }

// /** Highlighted must exist in target text (EN) */
// const validateHighlightedInField =
//   (label: string, targetField: string, max = COPYRIGHT_HILITE_MAX, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
//     return true
//   }

// /** Highlighted must exist in target text (BN) */
// const validateHighlightedInFieldBN =
//   (label: string, targetField: string, max = COPYRIGHT_HILITE_MAX, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} আবশ্যক।`
//     if (!s) return true
//     if (s.length > max) return `${label} সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} অবশ্যই ${targetField} এর ভিতরে হুবহু থাকতে হবে।`
//     return true
//   }

// // ✨ ADD

// const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

// const validateFooterCTAEnglishText = (val: unknown, { siblingData }: any) => {
//   const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
//   const hasThis = isNonEmpty(val)
//   if (hasAnyText && !hasThis)
//     return 'CTA Button Text (EN) is required when any CTA text is provided.'
//   if (hasThis && String(val).length > CTA_TEXT_MAX)
//     return `CTA Button Text must be at most ${CTA_TEXT_MAX} characters.`
//   return true
// }

// const validateFooterCTABanglaText = (val: unknown, { siblingData }: any) => {
//   const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
//   const hasThis = isNonEmpty(val)
//   if (hasAnyText && !hasThis)
//     return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
//   if (hasThis && String(val).length > CTA_TEXT_MAX)
//     return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর হতে পারবে।`
//   return true
// }

// /**
//  * Footer CTA link rule:
//  * - If any CTA text exists → require EITHER `buttonLink` (relationship) OR `url` (text).
//  * - Keeps existing `url` semantics; we made `url` not required and enforce via this rule.
//  */
// const validateFooterCTALinkRequiredIfAnyText = (_val: unknown, { siblingData }: any) => {
//   const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

//   if (!hasAnyText) return true

//   // relationship present?
//   const link = siblingData?.buttonLink
//   let hasRel = false
//   if (Array.isArray(link)) hasRel = link.length > 0
//   else if (link && typeof link === 'object') hasRel = Object.keys(link).length > 0
//   else hasRel = Boolean(link)

//   const hasUrl = isNonEmpty(siblingData?.url)

//   if (!hasRel && !hasUrl) {
//     return 'CTA Button Link is required when CTA Button Text is provided (use internal page or URL).'
//   }
//   return true
// }

// // ✨ ADD: lifecycle for Footer (handles branding.logo as a group image via dot-path)
// const footerMediaHooks = withMediaLifecycle({
//   collectionSlug: GLOBAL_FOOTER_SLUG_AND_TAG,
//   imageConfigs: [
//     {
//       fieldName: 'branding.logo',
//       aspectRatio: 1.48,
//       quality: 0.92,
//       maxKB: 500,
//       required: true,
//       label: 'Footer Logo',
//       description: 'Primary footer logo. Recommended square.',
//     },
//   ],
//   onAfterChange: async ({ req }) => {
//     await triggerMediaTemporaryPurge(req)
//   },
// })

// // ✨ ADD: accept Global-style hook shape from withMediaLifecycle
// const pickGlobalHooks = (h: any) => ({
//   beforeValidate: h?.beforeValidate ?? [],
//   beforeChange: h?.beforeChange ?? [],
//   afterChange: h?.afterChange ?? [],
// })

// const footerBase = pickGlobalHooks(footerMediaHooks)

// /* ---------------- global ---------------- */
// const Footer: GlobalConfig = {
//   slug: GLOBAL_FOOTER_SLUG_AND_TAG,
//   label: 'Footer',
//   admin: {
//     description:
//       'Site-wide footer: logo & contact, Explore & Legal links, Social URLs, and Copyright.',
//   },

//   fields: [
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },
//     /* 1) Branding & contact */
//     {
//       name: 'branding',
//       type: 'group',
//       label: 'Branding & Contact',
//       admin: {
//         description: 'Footer logo and basic contact details shown at the top of the footer.',
//       },
//       fields: [
//         // {
//         //   name: 'logo',
//         //   label: 'Footer Logo',
//         //   type: 'upload',
//         //   relationTo: 'media',
//         //   required: true,
//         //   admin: { description: 'Primary footer logo. Recommended square, ~50KB.' },
//         // },
//         // ✅ ADD this generated cropper set (drop-in replacement)
//         ...generateImageFields({
//           fieldName: 'logo',
//           label: 'Footer Logo',
//           description: 'Primary footer logo. Recommended square.',
//           aspectRatio: 1.48, // 1.48 / 1
//           quality: 0.92,
//           maxKB: 500,
//           required: true,
//           ownerCollection: GLOBAL_FOOTER_SLUG_AND_TAG as any, // ok to pass; lifecycle also stamps via collectionSlug
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
//               name: 'mapUrl',
//               type: 'text',
//               label: 'Google Maps URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, false),
//               defaultValue:
//                 'https://www.google.com/maps?ll=23.770282,90.40626&z=16&t=m&hl=en-GB&gl=US&mapclient=embed&cid=8200627424099091507',
//               admin: {
//                 width: '50%',
//                 description:
//                   'Public Google Maps link to your location. Must be an absolute http(s) URL.',
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
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
//             {
//               name: 'phoneBN',
//               type: 'text',
//               label: 'ফোন (বাংলা)',
//               required: true,
//               maxLength: PHONE_MAX,
//               validate: validatePhoneBN(PHONE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `বাংলা নম্বরে দিতে পারেন। সর্বোচ্চ ${bnNum(PHONE_MAX)} অক্ষর।`,
//               },
//               defaultValue: '+88 ০৯৬১০৮৮৯৯০০',
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'phoneNote',
//               type: 'text',
//               label: 'Phone Note',
//               maxLength: PHONE_NOTE_MAX,
//               validate: validateShortText('Phone Note', PHONE_NOTE_MAX, false),
//               defaultValue: '(10 am-6 pm, Sunday-Thursday)',
//               admin: {
//                 width: '50%',
//                 description: `Shown under the phone number (optional). Max ${PHONE_NOTE_MAX} chars (${bnNum(PHONE_NOTE_MAX)}).`,
//               },
//             },
//             {
//               name: 'phoneNoteBN',
//               type: 'text',
//               label: 'ফোন নোট (বাংলা)',
//               maxLength: PHONE_NOTE_MAX,
//               validate: validateShortTextBN('ফোন নোট', PHONE_NOTE_MAX, false),
//               defaultValue: '(সকাল ১০টা-সন্ধ্যা ৬টা, রবিবার-বৃহস্পতিবার)',
//               admin: {
//                 width: '50%',
//                 description: `ফোন নম্বরের নিচে দেখানো হবে (ঐচ্ছিক)। সর্বোচ্চ ${bnNum(PHONE_NOTE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'address',
//               type: 'text',
//               label: 'Address',
//               required: true,
//               maxLength: ADDRESS_MAX,
//               validate: validateShortText('Address', ADDRESS_MAX, true),
//               defaultValue:
//                 'Shanta Western Tower, Level 10, 186 Bir Uttam Mir Shawkat Sarak, Dhaka 1208',
//               admin: {
//                 width: '50%',
//                 description: `Mailing/visit address. Max ${ADDRESS_MAX} chars (${bnNum(ADDRESS_MAX)}).`,
//               },
//             },
//             {
//               name: 'addressBN',
//               type: 'text',
//               label: 'ঠিকানা (বাংলা)',
//               required: true,
//               maxLength: ADDRESS_MAX,
//               validate: validateShortTextBN('ঠিকানা', ADDRESS_MAX, true),
//               defaultValue:
//                 'শান্তা ওয়েস্টার্ন টাওয়ার, লেভেল ১০, ১৮৬ বীর উত্তম মীর শওকত সড়ক, ঢাকা ১২০৮।',
//               admin: {
//                 width: '50%',
//                 description: `বাংলায় ঠিকানা। সর্বোচ্চ ${bnNum(ADDRESS_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//       ],
//     },

//     /* 2) Explore links (max 9) */
//     {
//       name: 'exploreSection',
//       type: 'group',
//       label: 'Explore (Section)',
//       admin: {
//         description:
//           'Header + links for the “Explore” column. Internal paths (e.g., /plans) or full http(s) URLs.',
//       },
//       fields: [
//         // Header (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'exploreHeader',
//               type: 'text',
//               label: 'Explore Header',
//               maxLength: LABEL_MAX,
//               defaultValue: 'Explore',
//               required: true,
//               validate: validateShortText('Explore Header', LABEL_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Overrides the Explore column title. Max ${LABEL_MAX} chars (${bnNum(
//                   LABEL_MAX,
//                 )}).`,
//               },
//             },
//             {
//               name: 'exploreHeaderBN',
//               type: 'text',
//               label: 'হেডার (Explore)',
//               maxLength: LABEL_MAX,
//               defaultValue: 'এক্সপ্লোর',
//               required: true,
//               validate: validateShortTextBN('Explore হেডার', LABEL_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Explore কলামের শিরোনাম। সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Links
//         {
//           name: 'explore',
//           type: 'array',
//           label: 'Explore Links',
//           minRows: 0,
//           maxRows: 9,
//           validate: validateMaxItems('Explore links', 9),
//           labels: { singular: 'Explore Link', plural: 'Explore Links' },
//           fields: [
//             // label rows
//             // ✨ CTA texts (EN/BN) — mirrors CorporateCards names & rules
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'buttonText',
//                   type: 'text',
//                   label: 'CTA Button Text',
//                   maxLength: CTA_TEXT_MAX,
//                   validate: validateFooterCTAEnglishText,
//                   admin: {
//                     width: '50%',
//                     description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
//                   },
//                 },
//                 {
//                   name: 'buttonTextBN',
//                   type: 'text',
//                   label: 'CTA বাটনের টেক্সট (বাংলা)',
//                   maxLength: CTA_TEXT_MAX,
//                   validate: validateFooterCTABanglaText,
//                   admin: {
//                     width: '50%',
//                     description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
//                   },
//                 },
//               ],
//             },

//             // ✨ CTA relationship link (internal page). Either this or URL must exist if CTA text present.
//             {
//               name: 'buttonLink',
//               label: 'Link to (internal page)',
//               type: 'relationship',
//               relationTo: 'pages',
//               validate: validateFooterCTALinkRequiredIfAnyText,
//               admin: {
//                 description:
//                   'Pick an internal Page to link to. If CTA text is provided, either this or URL (below) is required.',
//               },
//             },
//           ],
//         },
//       ],
//     },

//     /* 3) Legal links (max 9) */
//     {
//       name: 'legalSection',
//       type: 'group',
//       label: 'Legal (Section)',
//       admin: {
//         description:
//           'Header + links for the “Legal” column (e.g., Privacy Policy, Terms). Internal paths or full http(s) URLs.',
//       },
//       fields: [
//         // Header (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'legalHeader',
//               type: 'text',
//               label: 'Legal Header',
//               maxLength: LABEL_MAX,
//               defaultValue: 'Legal',
//               validate: validateShortText('Legal Header', LABEL_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Overrides the Legal column title. Max ${LABEL_MAX} chars (${bnNum(
//                   LABEL_MAX,
//                 )}).`,
//               },
//             },
//             {
//               name: 'legalHeaderBN',
//               type: 'text',
//               label: 'হেডার (Legal)',
//               maxLength: LABEL_MAX,
//               defaultValue: 'লিগ্যাল',
//               validate: validateShortTextBN('Legal হেডার', LABEL_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Legal কলামের শিরোনাম। সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Links
//         {
//           name: 'legal',
//           type: 'array',
//           label: 'Legal Links',
//           minRows: 0,
//           maxRows: 9,
//           validate: validateMaxItems('Legal links', 9),
//           labels: { singular: 'Legal Link', plural: 'Legal Links' },
//           admin: {
//             description:
//               'Links for the “Legal” column (e.g., Privacy Policy, Terms). Internal paths or http(s) URLs.',
//           },
//           fields: [
//             // ✨ CTA texts (EN/BN) — same naming as CorporateCards
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'buttonText',
//                   type: 'text',
//                   label: 'CTA Button Text',
//                   maxLength: CTA_TEXT_MAX,
//                   validate: validateFooterCTAEnglishText,
//                   admin: {
//                     width: '50%',
//                     description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
//                   },
//                 },
//                 {
//                   name: 'buttonTextBN',
//                   type: 'text',
//                   label: 'CTA বাটনের টেক্সট (বাংলা)',
//                   maxLength: CTA_TEXT_MAX,
//                   validate: validateFooterCTABanglaText,
//                   admin: {
//                     width: '50%',
//                     description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
//                   },
//                 },
//               ],
//             },

//             // ✨ CTA relationship link (internal)
//             {
//               name: 'buttonLink',
//               label: 'Link to (internal page)',
//               type: 'relationship',
//               relationTo: 'pages',
//               validate: validateFooterCTALinkRequiredIfAnyText,
//               admin: {
//                 description:
//                   'Pick an internal Page to link to. If CTA text is provided, either this or URL (below) is required.',
//               },
//             },
//           ],
//         },
//       ],
//     },

//     /* 4) Social (absolute URLs only) */
//     {
//       name: 'social',
//       type: 'group',
//       label: 'Find Us (Section)',
//       admin: {
//         description:
//           'Section header + public social profile links (must be absolute http(s) URLs).',
//       },
//       fields: [
//         // Section header (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'socialHeader',
//               type: 'text',
//               label: 'Social Header',
//               maxLength: LABEL_MAX,
//               defaultValue: 'Find us on',
//               validate: validateShortText('Social Header', LABEL_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Overrides the Social column title. Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
//               },
//             },
//             {
//               name: 'socialHeaderBN',
//               type: 'text',
//               label: 'হেডার (Social)',
//               maxLength: LABEL_MAX,
//               defaultValue: 'আমাদের সোশ্যাল মিডিয়া প্ল্যাটফর্মসমূহ',
//               validate: validateShortTextBN('Social হেডার', LABEL_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Social কলামের শিরোনাম। সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Absolute URLs
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'facebookUrl',
//               type: 'text',
//               label: 'Facebook URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true),
//               admin: { width: '50%' },
//               defaultValue: 'https://www.facebook.com/profile.php?id=61566152682701',
//             },
//             {
//               name: 'youtubeUrl',
//               type: 'text',
//               label: 'YouTube URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true),
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
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true),
//               admin: { width: '50%' },
//               defaultValue: 'https://www.linkedin.com/company/shanta-life-insurance',
//             },
//             {
//               name: 'instagramUrl',
//               type: 'text',
//               label: 'Instagram URL',
//               required: true,
//               maxLength: URL_MAX,
//               validate: validateAbsoluteHTTPUrl(URL_MAX, true),
//               admin: { width: '50%' },
//               defaultValue: 'https://www.instagram.com/shanta_life_insurance',
//             },
//           ],
//         },
//       ],
//     },

//     /* 5) Copyright + highlight (EN/BN twins) */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'copyright',
//           type: 'text',
//           label: 'Copyright Text',
//           required: true,
//           maxLength: COPYRIGHT_MAX,
//           validate: validateShortText('Copyright', COPYRIGHT_MAX, true),
//           defaultValue: 'Copyright © 2025 Shanta Life Insurance PLC. All Rights Reserved',
//           admin: {
//             width: '50%',
//             description: `Main copyright line. Max ${COPYRIGHT_MAX} chars (${bnNum(COPYRIGHT_MAX)}).`,
//           },
//         },
//         {
//           name: 'copyrightBN',
//           type: 'text',
//           label: 'কপিরাইট (বাংলা)',
//           required: true,
//           maxLength: COPYRIGHT_MAX,
//           validate: validateShortTextBN('কপিরাইট', COPYRIGHT_MAX, true),
//           defaultValue: 'কপিরাইট © ২০২৫ শান্তা লাইফ ইনস্যুরেন্স পিএলসি। সর্বস্বত্ব সংরক্ষিত।',
//           admin: {
//             width: '50%',
//             description: `বাংলা কপিরাইট টেক্সট। সর্বোচ্চ ${bnNum(COPYRIGHT_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'copyrightHighlightedText',
//           type: 'text',
//           label: 'Copyright Highlight (within copyright)',
//           maxLength: COPYRIGHT_HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Copyright Highlight',
//             'copyright',
//             COPYRIGHT_HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional; must appear verbatim inside Copyright. Max ${COPYRIGHT_HILITE_MAX} chars (${bnNum(
//               COPYRIGHT_HILITE_MAX,
//             )}).`,
//           },
//         },
//         {
//           name: 'copyrightHighlightedTextBN',
//           type: 'text',
//           label: 'কপিরাইট হাইলাইট (বাংলা)',
//           maxLength: COPYRIGHT_HILITE_MAX,
//           validate: validateHighlightedInFieldBN(
//             'কপিরাইট হাইলাইট',
//             'copyrightBN',
//             COPYRIGHT_HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক; কপিরাইট (বাংলা)-এর মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
//               COPYRIGHT_HILITE_MAX,
//             )} অক্ষর।`,
//           },
//         },
//       ],
//     },
//   ],
//   // hooks: {
//   //   afterChange: [
//   //     async () => {
//   //       revalidateTag(globalTag(GLOBAL_FOOTER_SLUG_AND_TAG))
//   //     },
//   //   ],
//   // },
//   hooks: {
//     beforeValidate: [...(footerBase.beforeValidate ?? [])],
//     beforeChange: [...(footerBase.beforeChange ?? [])],
//     afterChange: [
//       ...(footerBase.afterChange ?? []),
//       async () => {
//         revalidateTag(globalTag(GLOBAL_FOOTER_SLUG_AND_TAG))
//       },
//     ],
//   },
// }

// export default Footer

// ===================================================================================
// ===================================================================================
// ===================================================================================

// src/globals/Footer.ts
import type { GlobalConfig } from 'payload'
import {
  GLOBAL_FOOTER_SLUG_AND_TAG,
  HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { revalidateTag } from 'next/cache'
import { globalTag } from '@/lib/cacheTags'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import { roleAtLeast } from '@/lib/rbac'

/* ---------------- max length constants ---------------- */
const EMAIL_MAX = 120
const PHONE_MAX = 40
const PHONE_NOTE_MAX = 80
const ADDRESS_MAX = 200
const LABEL_MAX = 40
const URL_MAX = 300
const COPYRIGHT_MAX = 200
const COPYRIGHT_HILITE_MAX = 120
const CTA_TEXT_MAX = 24

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

// ✨ ADD

const isNonEmpty = (v: unknown) => String(v ?? '').trim().length > 0

const validateFooterCTAEnglishText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'CTA Button Text (EN) is required when any CTA text is provided.'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `CTA Button Text must be at most ${CTA_TEXT_MAX} characters.`
  return true
}

const validateFooterCTABanglaText = (val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)
  const hasThis = isNonEmpty(val)
  if (hasAnyText && !hasThis)
    return 'CTA বাটনের (বাংলা) টেক্সট বাধ্যতামূলক, যখন CTA বাটনের যেকোনো টেক্সট দেওয়া হয়।'
  if (hasThis && String(val).length > CTA_TEXT_MAX)
    return `CTA বাটনের টেক্সট সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর হতে পারবে।`
  return true
}

/**
 * Footer CTA link rule:
 * - If any CTA text exists → require EITHER `buttonLink` (relationship) OR `url` (text).
 * - Keeps existing `url` semantics; we made `url` not required and enforce via this rule.
 */
const validateFooterCTALinkRequiredIfAnyText = (_val: unknown, { siblingData }: any) => {
  const hasAnyText = isNonEmpty(siblingData?.buttonText) || isNonEmpty(siblingData?.buttonTextBN)

  if (!hasAnyText) return true

  // relationship present?
  const link = siblingData?.buttonLink
  let hasRel = false
  if (Array.isArray(link)) hasRel = link.length > 0
  else if (link && typeof link === 'object') hasRel = Object.keys(link).length > 0
  else hasRel = Boolean(link)

  const hasUrl = isNonEmpty(siblingData?.url)

  if (!hasRel && !hasUrl) {
    return 'CTA Button Link is required when CTA Button Text is provided (use internal page or URL).'
  }
  return true
}

// ✨ CHANGED: lifecycle for Footer — top-level "logo"
const footerMediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_FOOTER_SLUG_AND_TAG,
  imageConfigs: [
    {
      fieldName: 'logo', // <— moved out of "branding"
      aspectRatio: 1.48,
      quality: 0.92,
      maxKB: 500,
      required: true,
      label: 'Footer Logo',
      description: 'Primary footer logo. Recommended square.',
    },
  ],
  onAfterChange: async ({ req }) => {
    await triggerMediaTemporaryPurge(req)
  },
})

// ✨ accept Global-style hook shape from withMediaLifecycle
const pickGlobalHooks = (h: any) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})

const footerBase = pickGlobalHooks(footerMediaHooks)

/* ---------------- global ---------------- */
const Footer: GlobalConfig = {
  slug: GLOBAL_FOOTER_SLUG_AND_TAG,
  label: 'Footer',
  admin: {
    description:
      'Site-wide footer: logo & contact, Explore & Legal links, Social URLs, and Copyright.',
  },

  access: {
    read: () => true, // public read
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    // ✨ NEW: Top-level logo (not in branding group)
    ...generateImageFields({
      fieldName: 'logo',
      label: 'Footer Logo',
      description: 'Primary footer logo. Recommended square.',
      aspectRatio: 1.48, // 1.48 / 1
      quality: 0.92,
      maxKB: 500,
      required: true,
      ownerCollection: GLOBAL_FOOTER_SLUG_AND_TAG as any,
    } as any),

    /* 1) Branding & contact */
    {
      name: 'branding',
      type: 'group',
      label: 'Branding & Contact',
      admin: {
        description: 'Contact details shown at the top of the footer.',
      },
      fields: [
        // ❌ removed logo from here (moved to top-level)

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
                description: `Shown under the phone number (optional). Max ${PHONE_NOTE_MAX} chars (${bnNum(
                  PHONE_NOTE_MAX,
                )}).`,
              },
            },
            {
              name: 'phoneNoteBN',
              type: 'text',
              label: 'ফোন নোট (বাংলা)',
              maxLength: PHONE_NOTE_MAX,
              validate: validateShortTextBN('ফোন নোট', PHONE_NOTE_MAX, false),
              defaultValue: '(সকাল ১০টা-সন্ধ্যা ৬টা, রবিবার-বৃহস্পতিবার)',
              admin: {
                width: '50%',
                description: `ফোন নম্বরের নিচে দেখানো হবে (ঐচ্ছিক)। সর্বোচ্চ ${bnNum(
                  PHONE_NOTE_MAX,
                )} অক্ষর।`,
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
                description: `Mailing/visit address. Max ${ADDRESS_MAX} chars (${bnNum(
                  ADDRESS_MAX,
                )}).`,
              },
            },
            {
              name: 'addressBN',
              type: 'text',
              label: 'ঠিকানা (বাংলা)',
              required: true,
              maxLength: ADDRESS_MAX,
              validate: validateShortTextBN('ঠিকানা', ADDRESS_MAX, true),
              defaultValue:
                'শান্তা ওয়েস্টার্ন টাওয়ার, লেভেল ১০, ১৮৬ বীর উত্তম মীর শওকত সড়ক, ঢাকা ১২০৮।',
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
            // CTA texts (EN/BN)
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'CTA Button Text',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateFooterCTAEnglishText,
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
                  validate: validateFooterCTABanglaText,
                  admin: {
                    width: '50%',
                    description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
                  },
                },
              ],
            },

            // CTA relationship link (internal page). Either this or URL must exist if CTA text present.
            {
              name: 'buttonLink',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              validate: validateFooterCTALinkRequiredIfAnyText,
              admin: {
                description:
                  'Pick an internal Page to link to. If CTA text is provided, either this or URL (below) is required.',
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
            // CTA texts (EN/BN)
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'CTA Button Text',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateFooterCTAEnglishText,
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
                  validate: validateFooterCTABanglaText,
                  admin: {
                    width: '50%',
                    description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
                  },
                },
              ],
            },

            // CTA relationship link (internal)
            {
              name: 'buttonLink',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              validate: validateFooterCTALinkRequiredIfAnyText,
              admin: {
                description:
                  'Pick an internal Page to link to. If CTA text is provided, either this or URL (below) is required.',
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
                description: `Overrides the Social column title. Max ${LABEL_MAX} chars (${bnNum(
                  LABEL_MAX,
                )}).`,
              },
            },
            {
              name: 'socialHeaderBN',
              type: 'text',
              label: 'ஹেডার (Social)', // NOTE: keep your BN string — left as-is
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
            description: `Main copyright line. Max ${COPYRIGHT_MAX} chars (${bnNum(
              COPYRIGHT_MAX,
            )}).`,
          },
        },
        {
          name: 'copyrightBN',
          type: 'text',
          label: 'কপিরাইট (বাংলা)',
          required: true,
          maxLength: COPYRIGHT_MAX,
          validate: validateShortTextBN('কপিরাইট', COPYRIGHT_MAX, true),
          defaultValue: 'কপিরাইট © ২০২৫ শান্তা লাইফ ইনস্যুরেন্স পিএলসি। সর্বস্বত্ব সংরক্ষিত।',
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
    beforeValidate: [...(footerBase.beforeValidate ?? [])],
    beforeChange: [...(footerBase.beforeChange ?? [])],
    afterChange: [
      ...(footerBase.afterChange ?? []),
      async () => {
        revalidateTag(globalTag(GLOBAL_FOOTER_SLUG_AND_TAG))
        revalidateTag(HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG)
      },
    ],
  },
}

export default Footer
