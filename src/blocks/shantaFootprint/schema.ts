import { bnNum } from '@/lib/utils'
// // collection config
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

// import {
//   ABOUT_US_PAGE_ADMIN_GROUP,
//   ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 40
// const SUBTITLE_MAX = 60
// const HILITE_MAX = 40
// const DESC_MAX = 300
// const URL_MAX = 400
// const CARD_TITLE_MAX = 60

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /** Highlight must appear verbatim in the target field */
// const validateHighlightedInField =
//   (label: string, targetField: string, max = HILITE_MAX, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
//     return true
//   }

// /** Enforce HTTPS absolute URL (no internal paths, no http) */
// const validateHTTPSOnlyUrl =
//   (label: string, max = URL_MAX, required = true) =>
//   (val: unknown) => {
//     const link = (val ?? '').toString().trim()
//     if (required && !link) return `${label} is required.`
//     if (!link) return true
//     if (link.length > max) return `${label} must be at most ${max} characters.`
//     try {
//       const u = new URL(link)
//       if (u.protocol !== 'https:') return `${label} must be an https URL.`
//       return true
//     } catch {
//       return `${label} must be a valid https URL.`
//     }
//   }

// /* ---------------- collection ---------------- */
// const ShantaFootprint: CollectionConfig = {
//   slug: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'title',
//     group: ABOUT_US_PAGE_ADMIN_GROUP,
//     defaultColumns: ['title', 'subtitle', 'updatedAt'],
//     description:
//       'About Us → “Shanta’s Footprint”: background video + partner/company cards with EN/BN text.',
//   },

//   access: createSingleDocAccess(ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Per-doc temp upload session id for lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     /* --------- Top heading (EN/BN twins + highlights) --------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading (e.g., “Shanta’s FOOTPRINT”). Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: true,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `প্রধান শিরোনাম (বাংলা)। সর্বোচ্চ ${TITLE_MAX} অক্ষর।`,
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
//           label: 'Highlighted Text (within Title)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
//           admin: {
//             width: '50%',
//             description: `Optional: a highlighted part inside Title. Must appear verbatim. Max ${HILITE_MAX} chars.`,
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
//             description: `ঐচ্ছিক: শিরোনামের ভেতরে রঙিন অংশ (হুবহু মিল থাকতে হবে)। সর্বোচ্চ ${HILITE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'subtitle',
//           type: 'text',
//           required: true,
//           label: 'Subtitle',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Supporting line (e.g., “Where Every Venture Connects”). Max ${SUBTITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'subtitleBN',
//           type: 'text',
//           required: true,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `সহায়ক লাইন (বাংলা)। সর্বোচ্চ ${SUBTITLE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* --------- Background video (https only) --------- */
//     {
//       name: 'backgroundVideoUrl',
//       type: 'text',
//       required: true,
//       label: 'Background Video URL (https)',
//       maxLength: URL_MAX,
//       //   validate: validateHTTPSOnlyUrl('Background Video URL', URL_MAX, true),
//       defaultValue: '/assets/about-us/web/footprint.mp4',
//       admin: {
//         description:
//           'Absolute https URL to your MP4/WebM/HLS asset. Internal paths are not allowed. Max 400 characters.',
//       },
//     },

//     /* --------- Cards --------- */
//     {
//       name: 'cards',
//       type: 'array',
//       label: 'Footprint Cards',
//       required: true,
//       minRows: 3,
//       maxRows: 20,
//       labels: { singular: 'Card', plural: 'Cards' },
//       admin: {
//         description:
//           'Add one card per company/venture: image (1:1), https website link, and EN/BN texts.',
//       },
//       fields: [
//         // Card image (not localized)
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Card Image',
//           description: 'Company/brand image (1:1).',
//           aspectRatio: 1,
//           quality: 0.95,
//           maxKB: 200,
//           ownerCollection: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG as any,
//           required: true,
//         } as any),

//         // Title (EN/BN) + highlighted part (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               label: 'Card Title',
//               maxLength: CARD_TITLE_MAX,
//               validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Company/brand name (English). Max ${CARD_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'কার্ড শিরোনাম (বাংলা)',
//               maxLength: CARD_TITLE_MAX,
//               validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `কোম্পানি/ব্র্যান্ডের নাম (বাংলা)। সর্বোচ্চ ${CARD_TITLE_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'highlightedText',
//               type: 'text',
//               label: 'Highlighted Text (within Card Title)',
//               maxLength: HILITE_MAX,
//               validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Optional: a highlighted part inside Card Title. Must appear verbatim. Max ${HILITE_MAX} chars.`,
//               },
//             },
//             {
//               name: 'highlightedTextBN',
//               type: 'text',
//               label: 'রঙিন টেক্সট (কার্ড শিরোনামের মধ্যে)',
//               maxLength: HILITE_MAX,
//               validate: validateHighlightedInField(
//                 'Highlighted Text (BN)',
//                 'titleBN',
//                 HILITE_MAX,
//                 false,
//               ),
//               admin: {
//                 width: '50%',
//                 description: `ঐচ্ছিক: কার্ড শিরোনামের ভেতরে রঙিন অংশ (হুবহু মিল থাকতে হবে)। সর্বোচ্চ ${HILITE_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // External website link (https only; not localized)
//         {
//           name: 'link',
//           type: 'text',
//           required: true,
//           label: 'Website (https only)',
//           maxLength: URL_MAX,
//           validate: validateHTTPSOnlyUrl('Website', URL_MAX, true),
//           admin: {
//             description:
//               'Absolute https URL only (e.g., https://example.com). Internal paths are not allowed.',
//           },
//         },

//         // Description (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'textarea',
//               required: true,
//               label: 'Card Description',
//               maxLength: DESC_MAX,
//               validate: validateShortText('Card Description', DESC_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Short description in English (1–3 lines). Max ${DESC_MAX} characters.`,
//               },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'textarea',
//               required: true,
//               label: 'কার্ডের বর্ণনা (বাংলা)',
//               maxLength: DESC_MAX,
//               validate: validateShortText('Card Description (BN)', DESC_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `সংক্ষিপ্ত বিবরণ (বাংলা, ১–৩ লাইন)। সর্বোচ্চ ${DESC_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   // ✅ Media lifecycle: finalize temps on success, purge temps via endpoint, diff-delete on edits
//   hooks: withMediaLifecycle({
//     imageConfigs: [],
//     arrayFields: [
//       {
//         fieldName: 'cards',
//         mediaFields: ['image'],
//         itemLabelField: 'title',
//         mediaFieldLabels: { image: 'Card Image' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
//     collectionSlug: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default ShantaFootprint

// =================================================================================
// =================================================================================
// =================================================================================

// src/collections/AboutUsFootprint.ts
import type { Block } from 'payload'

import {
  ABOUT_US_PAGE,
  ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_LABEL,
  ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_THUMBNAIL_URL,
  ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 40
const SUBTITLE_MAX = 60
const HILITE_MAX = 40
const DESC_MAX = 300
const URL_MAX = 400
const CARD_TITLE_MAX = 60

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Highlight must appear verbatim in the target field */
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

/** Enforce HTTPS absolute URL (no internal paths, no http) */
const validateHTTPSOnlyUrl =
  (label: string, max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return `${label} is required.`
    if (!link) return true
    if (link.length > max) return `${label} must be at most ${max} characters.`
    try {
      const u = new URL(link)
      if (u.protocol !== 'https:') return `${label} must be an https URL.`
      return true
    } catch {
      return `${label} must be a valid https URL.`
    }
  }

/* ---------------- collection ---------------- */
const ShantaFootprintSchema: Block = {
  slug: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,

  labels: {
    singular: ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_LABEL,
  },
  admin: {
    group: ABOUT_US_PAGE,
  },

  imageURL: ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_LABEL} preview`,

  fields: [
    /* --------- Top heading (EN/BN twins + highlights) --------- */
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading (e.g., “Shanta’s FOOTPRINT”). Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within Title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
          admin: {
            width: '50%',
            description: `Optional: a highlighted part inside Title. Must appear verbatim. Max ${HILITE_MAX} chars.`,
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
            description: `ঐচ্ছিক: শিরোনামের ভেতরে রঙিন অংশ (হুবহু মিল থাকতে হবে)। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Supporting line (e.g., “Where Every Venture Connects”). Max ${SUBTITLE_MAX} characters.`,
          },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন (বাংলা)। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* --------- Background video (https only) --------- */
    {
      name: 'backgroundVideoUrl',
      type: 'text',
      required: true,
      label: 'Background Video URL (https)',
      maxLength: URL_MAX,
      //   validate: validateHTTPSOnlyUrl('Background Video URL', URL_MAX, true),
      defaultValue: '/assets/about-us/web/footprint.mp4',
      admin: {
        description:
          'Absolute https URL to your MP4/WebM/HLS asset. Internal paths are not allowed. Max 400 characters.',
      },
    },

    /* --------- Cards --------- */
    {
      name: 'cards',
      type: 'array',
      label: 'Footprint Cards',
      required: true,
      minRows: 3,
      maxRows: 20,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        description:
          'Add one card per company/venture: image (1:1), https website link, and EN/BN texts.',
      },
      fields: [
        // Card image (not localized)
        // {
        //   name: 'image',
        //   label: 'Card Image',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        //   admin: {
        //     description: 'Company/brand image (1:1).',
        //   },
        // },
        // ✅ generator-based image field (handles original, crop, blur, temp lifecycle)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Card Image',
          description: 'Company/brand image (1:1).',
          aspectRatio: 1,
          quality: 0.93,
          maxKB: 400,
          ownerCollection: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG as any,
        } as any),
        // Title (EN/BN) + highlighted part (EN/BN)
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
                description: `Company/brand name (English). Max ${CARD_TITLE_MAX} characters.`,
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
                description: `কোম্পানি/ব্র্যান্ডের নাম (বাংলা)। সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'highlightedText',
              type: 'text',
              label: 'Highlighted Text (within Card Title)',
              maxLength: HILITE_MAX,
              validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
              admin: {
                width: '50%',
                description: `Optional: a highlighted part inside Card Title. Must appear verbatim. Max ${HILITE_MAX} chars.`,
              },
            },
            {
              name: 'highlightedTextBN',
              type: 'text',
              label: 'রঙিন টেক্সট (কার্ড শিরোনামের মধ্যে)',
              maxLength: HILITE_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (BN)',
                'titleBN',
                HILITE_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `ঐচ্ছিক: কার্ড শিরোনামের ভেতরে রঙিন অংশ (হুবহু মিল থাকতে হবে)। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // External website link (https only; not localized)
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Website (https only)',
          maxLength: URL_MAX,
          validate: validateHTTPSOnlyUrl('Website', URL_MAX, true),
          admin: {
            description:
              'Absolute https URL only (e.g., https://example.com). Internal paths are not allowed.',
          },
        },

        // Description (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Card Description',
              maxLength: DESC_MAX,
              validate: validateShortText('Card Description', DESC_MAX, true),
              admin: {
                width: '50%',
                description: `Short description in English (1–3 lines). Max ${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'textarea',
              required: true,
              label: 'কার্ডের বর্ণনা (বাংলা)',
              maxLength: DESC_MAX,
              validate: validateShortText('Card Description (BN)', DESC_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত বিবরণ (বাংলা, ১–৩ লাইন)। সর্বোচ্চ ${bnNum(DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default ShantaFootprintSchema
