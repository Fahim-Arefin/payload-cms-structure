import { bnNum } from '@/lib/utils'
// // collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import {
//   ABOUT_US_PAGE_ADMIN_GROUP,
//   ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// /* ---------------- limits ---------------- */
// const DATE_MAX = 20 // free-form date labels (e.g., "November 7, 2023")

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /* ---------------- images ---------------- */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'licensedImage',
//     label: 'Licensed Icon',
//     description: 'Small square icon (1:1).',
//     aspectRatio: 1,
//     quality: 0.9,
//     maxKB: 50,
//   },
//   {
//     fieldName: 'launchedImage',
//     label: 'Launched Icon',
//     description: 'Small square icon (1:1).',
//     aspectRatio: 1,
//     quality: 0.9,
//     maxKB: 50,
//   },
// ]

// const LicensedLaunched: CollectionConfig = {
//   slug: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'id',
//     defaultColumns: ['licensedDate', 'launchedDate', 'updatedAt'],
//     group: ABOUT_US_PAGE_ADMIN_GROUP,
//     description: 'About Us → “Licensed & Launched” dates with two icons (EN/BN twins).',
//   },

//   // Single-doc behavior consistent with your other sections
//   access: createSingleDocAccess(ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle (used by cropper + hooks)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Licensed block
//     ...generateImageFields({
//       ...IMAGE_CONFIGS.find((i) => i.fieldName === 'licensedImage')!,
//       ownerCollection: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
//       required: true,
//     } as any),
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'licensedDate',
//           type: 'text',
//           required: true,
//           label: 'Licensed Date',
//           maxLength: DATE_MAX,
//           validate: validateShortText('Licensed Date', DATE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Free-form date label (e.g., "November 7, 2023"). Max ${DATE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'licensedDateBN',
//           type: 'text',
//           required: true,
//           label: 'লাইসেন্সপ্রাপ্তির তারিখ (বাংলা)',
//           maxLength: DATE_MAX,
//           validate: validateShortText('Licensed Date (BN)', DATE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `বাংলা তারিখ লেবেল (উদাহরণ: “৭ নভেম্বর, ২০২৩”). সর্বোচ্চ ${DATE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     // Launched block
//     ...generateImageFields({
//       ...IMAGE_CONFIGS.find((i) => i.fieldName === 'launchedImage')!,
//       ownerCollection: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
//       required: true,
//     } as any),
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'launchedDate',
//           type: 'text',
//           required: true,
//           label: 'Launched Date',
//           maxLength: DATE_MAX,
//           validate: validateShortText('Launched Date', DATE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Free-form date label (e.g., "December 1, 2024"). Max ${DATE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'launchedDateBN',
//           type: 'text',
//           required: true,
//           label: 'লঞ্চের তারিখ (বাংলা)',
//           maxLength: DATE_MAX,
//           validate: validateShortText('Launched Date (BN)', DATE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `বাংলা তারিখ লেবেল (উদাহরণ: “১ ডিসেম্বর, ২০২৪”). সর্বোচ্চ ${DATE_MAX} অক্ষর।`,
//           },
//         },
//       ],
//     },
//   ],

//   // ✅ media lifecycle: finalize temps on success, purge temps via endpoint, diff delete on edits
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [],
//     skipOnDraft: true,
//     singleDocSlug: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
//     collectionSlug: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req) // fire-and-forget cleanup for temporary:true media
//     },
//   }),
// }

// export default LicensedLaunched

// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------

// block
import type { Block } from 'payload'

import {
  ABOUT_US_PAGE,
  ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_LABEL,
  ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_THUMBNAIL_URL,
  ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const LICENSED_LABEL_MAX = 15
const LAUNCHED_LABEL_MAX = 15
const DATE_MAX = 20 // free-form date labels (e.g., "November 7, 2023")

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const LicensedLaunchedSchema: Block = {
  slug: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,

  labels: {
    singular: ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_LABEL,
  },
  admin: {
    group: ABOUT_US_PAGE,
  },
  imageURL: ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_LABEL} preview`,

  fields: [
    // Licensed block
    // {
    //   name: 'licensedImage',
    //   label: 'Licensed Icon',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description: 'Small square icon (1:1).',
    //   },
    // },
    // with this:
    ...generateImageFields({
      fieldName: 'licensedImage',
      label: 'Licensed Icon',
      description: 'Small square icon (1:1).',
      aspectRatio: 1,
      quality: 0.9,
      maxKB: 150,
      ownerCollection: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG as any,
    } as any),
    {
      type: 'row',
      fields: [
        {
          name: 'licensedLabel',
          type: 'text',
          required: true,
          label: 'Licensed Label',
          maxLength: LICENSED_LABEL_MAX,
          validate: validateShortText('Licensed Label', LICENSED_LABEL_MAX, true),
          admin: {
            width: '50%',
            description: `Short label under the licensed icon (e.g., "Licensed"). Max ${LICENSED_LABEL_MAX} characters.`,
          },
        },
        {
          name: 'licensedLabelBN',
          type: 'text',
          required: true,
          label: 'লাইসেন্সপ্রাপ্তির লেবেল (বাংলা)',
          maxLength: LICENSED_LABEL_MAX,
          validate: validateShortText('Licensed Label (BN)', LICENSED_LABEL_MAX, true),
          admin: {
            width: '50%',
            description: `লাইসেন্স আইকনের নিচের লেবেল (যেমন, “লাইসেন্সপ্রাপ্ত”). সর্বোচ্চ ${bnNum(LICENSED_LABEL_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'licensedDate',
          type: 'text',
          required: true,
          label: 'Licensed Date',
          maxLength: DATE_MAX,
          validate: validateShortText('Licensed Date', DATE_MAX, true),
          admin: {
            width: '50%',
            description: `Free-form date label (e.g., "November 7, 2023"). Max ${DATE_MAX} characters.`,
          },
        },
        {
          name: 'licensedDateBN',
          type: 'text',
          required: true,
          label: 'লাইসেন্সপ্রাপ্তির তারিখ (বাংলা)',
          maxLength: DATE_MAX,
          validate: validateShortText('Licensed Date (BN)', DATE_MAX, true),
          admin: {
            width: '50%',
            description: `বাংলা তারিখ লেবেল (উদাহরণ: “৭ নভেম্বর, ২০২৩”). সর্বোচ্চ ${bnNum(DATE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Launched block

    // {
    //   name: 'launchedImage',
    //   label: 'Launched Icon',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description: 'Small square icon (1:1).',
    //   },
    // },
    // with this:
    ...generateImageFields({
      fieldName: 'launchedImage',
      label: 'Launched Icon',
      description: 'Small square icon (1:1).',
      aspectRatio: 1,
      quality: 0.9,
      maxKB: 150,
      ownerCollection: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG as any,
    } as any),
    {
      type: 'row',
      fields: [
        {
          name: 'launchedLabel',
          type: 'text',
          required: true,
          label: 'Launched Label',
          maxLength: LAUNCHED_LABEL_MAX,
          validate: validateShortText('Launched Label', LAUNCHED_LABEL_MAX, true),
          admin: {
            width: '50%',
            description: `Short label under the launched icon (e.g., "Launched"). Max ${LAUNCHED_LABEL_MAX} characters.`,
          },
        },
        {
          name: 'launchedLabelBN',
          type: 'text',
          required: true,
          label: 'লঞ্চের লেবেল (বাংলা)',
          maxLength: LAUNCHED_LABEL_MAX,
          validate: validateShortText('Launched Label (BN)', LAUNCHED_LABEL_MAX, true),
          admin: {
            width: '50%',
            description: `লঞ্চ আইকনের নিচের লেবেল (যেমন, “লঞ্চ”). সর্বোচ্চ ${bnNum(LAUNCHED_LABEL_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'launchedDate',
          type: 'text',
          required: true,
          label: 'Launched Date',
          maxLength: DATE_MAX,
          validate: validateShortText('Launched Date', DATE_MAX, true),
          admin: {
            width: '50%',
            description: `Free-form date label (e.g., "December 1, 2024"). Max ${DATE_MAX} characters.`,
          },
        },
        {
          name: 'launchedDateBN',
          type: 'text',
          required: true,
          label: 'লঞ্চের তারিখ (বাংলা)',
          maxLength: DATE_MAX,
          validate: validateShortText('Launched Date (BN)', DATE_MAX, true),
          admin: {
            width: '50%',
            description: `বাংলা তারিখ লেবেল (উদাহরণ: “১ ডিসেম্বর, ২০২৪”). সর্বোচ্চ ${bnNum(DATE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
  ],
}

export default LicensedLaunchedSchema
