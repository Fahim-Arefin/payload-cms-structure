// // collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import {
//   HOME_PAGE_ADMIN_GROUP,
//   HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// // ---------- validators ----------
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// // “highlight must exist verbatim in another field”
// const validateHighlightedInField =
//   (label: string, targetField: string, max = 40, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
//     return true
//   }

// // length-enforced YouTube link validator (keep single EN field for links)
// const validateYouTubeLinkWithMax = (max: number) => (val: unknown) => {
//   const link = (val ?? '').toString().trim()
//   if (!link) return 'Video link is required.'
//   if (link.length > max) return `Video link must be at most ${max} characters.`
//   try {
//     const u = new URL(link)
//     const host = u.hostname.toLowerCase()
//     const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
//     const isYouTube =
//       host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')
//     if (!isHttp) return 'Video link must be http(s).'
//     if (!isYouTube) return 'Only YouTube links are allowed.'
//     return true
//   } catch {
//     return 'Provide a valid URL.'
//   }
// }

// // strict length validator for arrays
// const validateExactlyNItems = (labelPlural: string, n: number) => (val: unknown) => {
//   if (!Array.isArray(val)) return `At least ${n} ${labelPlural.toLowerCase()} are required.`
//   if (val.length !== n) return `Provide exactly ${n} ${labelPlural.toLowerCase()}.`
//   return true
// }

// const LifeInsuranceSimplified: CollectionConfig = {
//   slug: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//   labels: {
//     singular: 'Life Insurance Simplified',
//     plural: 'Life Insurance Simplified',
//   },
//   admin: {
//     useAsTitle: 'id',
//     defaultColumns: ['id', 'updatedAt'],
//     group: HOME_PAGE_ADMIN_GROUP,
//     description: 'Homepage → “Life Insurance Simplified” sections with video + images.',
//   },

//   access: createSingleDocAccess(HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle (used by cropper + hooks)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     /* ===== TOP-LEVEL (outside the sections array) ===== */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'sectionHeading',
//           type: 'text',
//           label: 'Section Heading',
//           maxLength: 40,
//           validate: validateShortText('Section Heading', 40, true),
//           admin: {
//             width: '50%',
//             description: 'Short label above the main title. Max 40 characters.',
//           },
//         },
//         {
//           name: 'sectionHeadingBN',
//           type: 'text',
//           label: 'সেকশন হেডিং (বাংলা)',
//           maxLength: 40,
//           validate: validateShortText('Section Heading (BN)', 40, true),
//           admin: { width: '50%', description: 'মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ৪০ অক্ষর।' },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'sectionHeadingHighlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within Section Heading)',
//           maxLength: 40,
//           validate: validateHighlightedInField('Highlighted Text', 'sectionHeading', 40, false),
//           admin: {
//             width: '50%',
//             description:
//               'Optional. Must appear verbatim inside the Section Heading. Max 40 characters.',
//           },
//         },
//         {
//           name: 'sectionHeadingHighlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (সেকশন হেডিং-এর মধ্যে)',
//           maxLength: 40,
//           validate: validateHighlightedInField(
//             'Highlighted Text (BN)',
//             'sectionHeadingBN',
//             40,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: 'ঐচ্ছিক। অবশ্যই সেকশন হেডিং-এর মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     /* ===== SECTIONS ARRAY ===== */
//     {
//       name: 'sections',
//       type: 'array',
//       label: 'Sections',
//       required: true,
//       minRows: 1,
//       maxRows: 3,
//       labels: { singular: 'Section', plural: 'Sections' },
//       fields: [
//         // Title (EN + BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               label: 'Title',
//               maxLength: 80,
//               validate: validateShortText('Title', 80, true),
//               admin: { width: '50%' },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'শিরোনাম (বাংলা)',
//               maxLength: 80,
//               validate: validateShortText('Title (BN)', 80, true),
//               admin: { width: '50%' },
//             },
//           ],
//         },
//         // Title highlight (EN + BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'titleHighlightedText',
//               type: 'text',
//               label: 'Highlighted Text (within Title)',
//               maxLength: 40,
//               validate: validateHighlightedInField('Highlighted Text', 'title', 40, false),
//               admin: {
//                 width: '50%',
//                 description: 'Optional. Must appear verbatim inside the Title. Max 40 characters.',
//               },
//             },
//             {
//               name: 'titleHighlightedTextBN',
//               type: 'text',
//               label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//               maxLength: 40,
//               validate: validateHighlightedInField('Highlighted Text (BN)', 'titleBN', 40, false),
//               admin: {
//                 width: '50%',
//                 description: 'ঐচ্ছিক। অবশ্যই শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ৪০ অক্ষর।',
//               },
//             },
//           ],
//         },

//         // Subtitle (EN + BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'subtitle',
//               type: 'text',
//               required: true,
//               label: 'Subtitle',
//               maxLength: 120,
//               validate: validateShortText('Subtitle', 120, true),
//               admin: { width: '50%' },
//             },
//             {
//               name: 'subtitleBN',
//               type: 'text',
//               required: true,
//               label: 'উপশিরোনাম (বাংলা)',
//               maxLength: 120,
//               validate: validateShortText('Subtitle (BN)', 120, true),
//               admin: { width: '50%' },
//             },
//           ],
//         },

//         // Main video link (link only; no BN twin)
//         {
//           type: 'row',
//           fields: [
//             {
//               // keep original casing to avoid frontend changes
//               name: 'mainVIdeoLink',
//               type: 'text',
//               label: 'Main Video Link (YouTube)',
//               maxLength: 200,
//               required: true,
//               validate: validateYouTubeLinkWithMax(200),
//               admin: {
//                 description: 'Use a YouTube URL (embed, watch, youtu.be, or youtube-nocookie).',
//               },
//             },
//           ],
//         },

//         // main image for the section (array item image → use array generator)
//         ...generateArrayImageFields({
//           fieldName: 'mainImage',
//           label: 'Main Image (4:3)',
//           description: 'Large hero/thumbnail for this section. (4:3) recommended.',
//           aspectRatio: 4 / 3,
//           quality: 0.9,
//           maxKB: 100,
//           ownerCollection: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG as any,
//         } as any),

//         // nested cards
//         {
//           name: 'insuranceCardData',
//           type: 'array',
//           label: 'Cards',
//           // required: true,
//           minRows: 3,
//           maxRows: 3,
//           validate: validateExactlyNItems('Cards', 3),
//           labels: { singular: 'Card', plural: 'Cards' },
//           admin: { description: 'Exactly 3 cards per section.' },
//           fields: [
//             // required card image (media only; no BN twin)
//             ...generateArrayImageFields({
//               fieldName: 'image',
//               label: 'Card Image (4:3)',
//               description: 'Primary thumbnail image for the card (4:3).',
//               aspectRatio: 4 / 3,
//               quality: 0.9,
//               maxKB: 100,
//               ownerCollection: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG as any,
//             } as any),

//             // Card title (optional) EN + BN
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'title',
//                   type: 'text',
//                   label: 'Card Title (optional)',
//                   maxLength: 60,
//                   validate: validateShortText('Card Title', 60, false),
//                   admin: { width: '50%' },
//                 },
//                 {
//                   name: 'titleBN',
//                   type: 'text',
//                   label: 'কার্ড শিরোনাম (ঐচ্ছিক)',
//                   maxLength: 60,
//                   validate: validateShortText('Card Title (BN)', 60, false),
//                   admin: { width: '50%' },
//                 },
//               ],
//             },

//             // Card description (optional) EN + BN
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'description',
//                   type: 'textarea',
//                   label: 'Card Description (optional)',
//                   maxLength: 200,
//                   validate: validateShortText('Card Description', 200, false),
//                   admin: { width: '50%' },
//                 },
//                 {
//                   name: 'descriptionBN',
//                   type: 'textarea',
//                   label: 'কার্ড বর্ণনা (ঐচ্ছিক)',
//                   maxLength: 200,
//                   validate: validateShortText('Card Description (BN)', 200, false),
//                   admin: { width: '50%' },
//                 },
//               ],
//             },

//             // required video link (link only; no BN twin)
//             {
//               name: 'videoLink',
//               type: 'text',
//               required: true,
//               label: 'Card Video Link (YouTube)',
//               maxLength: 200,
//               validate: validateYouTubeLinkWithMax(200),
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   hooks: withMediaLifecycle({
//     imageConfigs: [], // top-level has no images
//     // sections[] mainImage
//     arrayFields: [{ fieldName: 'sections', mediaFields: ['mainImage'], itemLabelField: 'title' }],
//     // sections[].insuranceCardData[] image
//     groupFields: [
//       {
//         groupKey: 'sections',
//         arrayKey: 'insuranceCardData',
//         mediaFields: ['image'],
//         itemLabelField: 'title', // improves alt text when present
//       },
//     ],

//     skipOnDraft: true,
//     singleDocSlug: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//     collectionSlug: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG)
//       // Fire-and-forget cleanup for temporary:true media
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default LifeInsuranceSimplified

// ===========================================================================================
// ===========================================================================================
// ===========================================================================================
// ===========================================================================================

// block
// src/payload/blocks/LifeInsuranceSimplified.ts
import {
  HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_LABEL,
  HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_THUMBNAIL_URL,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

/* =========================
   MAX CONSTANTS (top)
========================= */
const COLOR_HEX_LEN = 7
const MAX_SECTION_HEADING = 40
const MAX_TITLE = 80
const MAX_SUBTITLE = 120
const MAX_HIGHLIGHT = 40
const MAX_VIDEO_LINK = 200
const MAX_CARD_TITLE = 60
const MAX_CARD_DESC = 200

/* =========================
   Validators (same style as WhyChooseUs)
========================= */

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

const validateHighlightedInField =
  (label: string, targetField: string, max = MAX_HIGHLIGHT, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

const validateYouTubeLinkWithMax = (max: number) => (val: unknown) => {
  const link = (val ?? '').toString().trim()
  if (!link) return 'Video link is required.'
  if (link.length > max) return `Video link must be at most ${max} characters.`
  try {
    const u = new URL(link)
    const host = u.hostname.toLowerCase()
    const isHttp = u.protocol === 'http:' || u.protocol === 'https:'
    const isYouTube =
      host === 'youtu.be' || host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')
    if (!isHttp) return 'Video link must be http(s).'
    if (!isYouTube) return 'Only YouTube links are allowed.'
    return true
  } catch {
    return 'Provide a valid URL.'
  }
}

const validateExactlyNItems = (labelPlural: string, n: number) => (val: unknown) => {
  if (!Array.isArray(val)) return `At least ${n} ${labelPlural.toLowerCase()} are required.`
  if (val.length !== n) return `Provide exactly ${n} ${labelPlural.toLowerCase()}.`
  return true
}

/* =========================
   BLOCK (same format as WhyChooseUs)
========================= */
const LifeInsuranceSimplifiedSchema: Block = {
  slug: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
  labels: {
    singular: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_LABEL,
    plural: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_LABEL,
  },

  imageURL: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_LABEL} preview`,

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
    // Section Heading (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'sectionHeading',
          type: 'text',
          label: 'Section Heading',
          maxLength: MAX_SECTION_HEADING,
          required: true,
          admin: {
            width: '50%',
            description: `Short label above the main title. Max ${MAX_SECTION_HEADING} characters.`,
          },
          validate: validateShortText('Section Heading', MAX_SECTION_HEADING, true),
        },
        {
          name: 'sectionHeadingBN',
          type: 'text',
          label: 'সেকশন হেডিং (বাংলা)',
          maxLength: MAX_SECTION_HEADING,
          required: true,
          admin: {
            width: '50%',
            description: `মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ${bnNum(MAX_SECTION_HEADING)} অক্ষর।`,
          },
          validate: validateShortText('Section Heading (BN)', MAX_SECTION_HEADING, true),
        },
      ],
    },

    // Section Heading Highlight (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'sectionHeadingHighlightedText',
          type: 'text',
          label: 'Highlighted Text (within Section Heading)',
          maxLength: MAX_HIGHLIGHT,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Section Heading. Max ${MAX_HIGHLIGHT} characters.`,
          },
          validate: validateHighlightedInField(
            'Highlighted Text',
            'sectionHeading',
            MAX_HIGHLIGHT,
            false,
          ),
        },
        {
          name: 'sectionHeadingHighlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (সেকশন হেডিং-এর মধ্যে)',
          maxLength: MAX_HIGHLIGHT,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই সেকশন হেডিং-এর মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(MAX_HIGHLIGHT)} অক্ষর।`,
          },
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'sectionHeadingBN',
            MAX_HIGHLIGHT,
            false,
          ),
        },
      ],
    },

    /* ===== SECTIONS ARRAY ===== */
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      required: true,
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        description: '1–3 content sections, each with a main image, video link, and 3 cards.',
      },
      fields: [
        // Title (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              maxLength: MAX_TITLE,
              admin: {
                width: '50%',
                description: `Primary headline for this section. Max ${MAX_TITLE} characters.`,
              },
              validate: validateShortText('Title', MAX_TITLE, true),
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'শিরোনাম (বাংলা)',
              maxLength: MAX_TITLE,
              admin: {
                width: '50%',
                description: `এই সেকশনের মূল শিরোনাম। সর্বোচ্চ ${bnNum(MAX_TITLE)} অক্ষর।`,
              },
              validate: validateShortText('Title (BN)', MAX_TITLE, true),
            },
          ],
        },

        // Title Highlight (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'titleHighlightedText',
              type: 'text',
              label: 'Highlighted Text (within Title)',
              maxLength: MAX_HIGHLIGHT,
              admin: {
                width: '50%',
                description: `Optional. Must appear verbatim inside the Title. Max ${MAX_HIGHLIGHT} characters.`,
              },
              validate: validateHighlightedInField(
                'Highlighted Text',
                'title',
                MAX_HIGHLIGHT,
                false,
              ),
            },
            {
              name: 'titleHighlightedTextBN',
              type: 'text',
              label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
              maxLength: MAX_HIGHLIGHT,
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। অবশ্যই শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(MAX_HIGHLIGHT)} অক্ষর।`,
              },
              validate: validateHighlightedInField(
                'Highlighted Text (BN)',
                'titleBN',
                MAX_HIGHLIGHT,
                false,
              ),
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
              maxLength: MAX_SUBTITLE,
              admin: {
                width: '50%',
                description: `Supporting line under the title. Max ${MAX_SUBTITLE} characters.`,
              },
              validate: validateShortText('Subtitle', MAX_SUBTITLE, true),
            },
            {
              name: 'subtitleBN',
              type: 'text',
              required: true,
              label: 'উপশিরোনাম (বাংলা)',
              maxLength: MAX_SUBTITLE,
              admin: {
                width: '50%',
                description: `মূল শিরোনামের নিচে সহায়ক লাইন। সর্বোচ্চ ${bnNum(MAX_SUBTITLE)} অক্ষর।`,
              },
              validate: validateShortText('Subtitle (BN)', MAX_SUBTITLE, true),
            },
          ],
        },

        // Main Video Link (YouTube)
        {
          type: 'row',
          fields: [
            {
              name: 'mainVIdeoLink', // keep original casing to avoid FE changes
              type: 'text',
              label: 'Main Video Link (YouTube)',
              maxLength: MAX_VIDEO_LINK,
              required: true,
              validate: validateYouTubeLinkWithMax(MAX_VIDEO_LINK),
              admin: {
                description: `Use a YouTube URL (embed, watch, youtu.be, or youtube-nocookie). Max ${MAX_VIDEO_LINK} characters.`,
              },
            },
          ],
        },

        // Main Image (default Payload media upload)
        // {
        //   name: 'mainImage',
        //   label: 'Main Thumbnail Image (4:3)',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        //   admin: {
        //     description: 'Large hero/thumbnail for this section. 4:3 recommended; ~100KB.',
        //   },
        // },
        // Main Image (generated, 4:3)
        ...generateArrayImageFields({
          fieldName: 'mainImage',
          label: 'Main Thumbnail Image (4:3)',
          description: 'Large hero/thumbnail for this section. 4:3 recommended.',
          aspectRatio: 4 / 3,
          quality: 0.96,
          maxKB: 300,
          ownerCollection: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG as any,
        } as any),

        // Cards (exactly 3)
        {
          name: 'insuranceCardData',
          type: 'array',
          label: 'Cards',
          minRows: 3,
          maxRows: 3,
          validate: validateExactlyNItems('Cards', 3),
          labels: { singular: 'Card', plural: 'Cards' },
          admin: { description: 'Exactly 3 cards per section.' },
          fields: [
            // Card Image
            // {
            //   name: 'image',
            //   label: 'Card Thumbnail Image (4:3)',
            //   type: 'upload',
            //   relationTo: 'media',
            //   required: true,
            //   admin: {
            //     description: 'Primary thumbnail for the card. 4:3 recommended; ~100KB.',
            //   },
            // },
            // Card Image (generated, 4:3)
            ...generateArrayImageFields({
              fieldName: 'image',
              label: 'Card Thumbnail Image (4:3)',
              description: 'Primary thumbnail for the card. 4:3 recommended.',
              aspectRatio: 4 / 3,
              quality: 0.96,
              maxKB: 300,
              ownerCollection: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG as any,
            } as any),

            // Card Title (optional) EN/BN
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Card Title (optional)',
                  maxLength: MAX_CARD_TITLE,
                  admin: {
                    width: '50%',
                    description: `Short heading for the card. Max ${MAX_CARD_TITLE} characters.`,
                  },
                  validate: validateShortText('Card Title', MAX_CARD_TITLE, false),
                },
                {
                  name: 'titleBN',
                  type: 'text',
                  label: 'কার্ড শিরোনাম (ঐচ্ছিক)',
                  maxLength: MAX_CARD_TITLE,
                  admin: {
                    width: '50%',
                    description: `কার্ডের সংক্ষিপ্ত শিরোনাম। সর্বোচ্চ ${bnNum(MAX_CARD_TITLE)} অক্ষর।`,
                  },
                  validate: validateShortText('Card Title (BN)', MAX_CARD_TITLE, false),
                },
              ],
            },

            // Card Description (optional) EN/BN
            {
              type: 'row',
              fields: [
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Card Description (optional)',
                  maxLength: MAX_CARD_DESC,
                  admin: {
                    width: '50%',
                    description: `Short supporting copy. Max ${MAX_CARD_DESC} characters.`,
                  },
                  validate: validateShortText('Card Description', MAX_CARD_DESC, false),
                },
                {
                  name: 'descriptionBN',
                  type: 'textarea',
                  label: 'কার্ড বর্ণনা (ঐচ্ছিক)',
                  maxLength: MAX_CARD_DESC,
                  admin: {
                    width: '50%',
                    description: `সংক্ষিপ্ত সহায়ক বর্ণনা। সর্বোচ্চ ${bnNum(MAX_CARD_DESC)} অক্ষর।`,
                  },
                  validate: validateShortText('Card Description (BN)', MAX_CARD_DESC, false),
                },
              ],
            },

            // Card Video Link (YouTube)
            {
              name: 'videoLink',
              type: 'text',
              required: true,
              label: 'Card Video Link (YouTube)',
              maxLength: MAX_VIDEO_LINK,
              validate: validateYouTubeLinkWithMax(MAX_VIDEO_LINK),
              admin: {
                description: `Use a YouTube URL (embed, watch, youtu.be, or youtube-nocookie). Max ${MAX_VIDEO_LINK} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default LifeInsuranceSimplifiedSchema
