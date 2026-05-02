// import type { Block } from 'payload'

// import {
//   ABOUT_US,
//   SAGAR_VIDEOS_BLOCK_LABEL,
//   SAGAR_VIDEOS_BLOCK_THUMBNAIL_URL,
//   SAGAR_VIDEOS_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
// import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
// import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
// import { validateYouTubeUrl } from '@/utils/block/fields-validation'

// /* ---------- limits ---------- */
// const TAG_MAX = 40
// const HEADING_MAX = 90
// const VIDEO_URL_MAX = 300

// const SagarVideosSchema: Block = {
//   slug: SAGAR_VIDEOS_SLUG_AND_TAG,
//   labels: {
//     singular: SAGAR_VIDEOS_BLOCK_LABEL,
//     plural: SAGAR_VIDEOS_BLOCK_LABEL,
//   },

//   admin: { group: ABOUT_US },

//   imageURL: SAGAR_VIDEOS_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${SAGAR_VIDEOS_BLOCK_LABEL} preview`,

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     BgColorAndSectionIdField({ defaultBackground: 'white-2' }),

//     ...SectionHeadingFields({
//       tagMax: TAG_MAX,
//       heading1Max: HEADING_MAX,
//       heading1HighlightMax: HEADING_MAX,
//       heading2Max: HEADING_MAX,
//       heading2HighlightMax: HEADING_MAX,
//       heading3Max: HEADING_MAX,
//       heading3HighlightMax: HEADING_MAX,
//       ctaMaxRows: 1,
//       // noCTA: true,
//       includeHeading3: false, // ✅ disables heading 3 fields in admin
//     }),

//     {
//       type: 'row',
//       fields: [
//         // image alignment field
//         {
//           name: 'videoAlignment',
//           type: 'select',
//           options: [
//             { label: 'Left', value: 'left' },
//             { label: 'Right', value: 'right' },
//           ],
//           defaultValue: 'right',
//           admin: {
//             description: 'Select the alignment of the video',
//             width: '50%',
//           },
//         },
//       ],
//     },

//     {
//       name: 'videos',
//       type: 'array',
//       label: 'Videos',
//       required: true,
//       minRows: 1,
//       maxRows: 10,
//       labels: {
//         singular: 'Video',
//         plural: 'Videos',
//       },
//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'thumbnail',
//           label: 'Thumbnail',
//           description: 'Upload the video thumbnail image.',
//           aspectRatio: 16 / 9,
//           quality: 0.93,
//           maxKB: 500,
//           required: true,
//           ownerCollection: SAGAR_VIDEOS_SLUG_AND_TAG as any,
//         } as any),

//         {
//           name: 'videoUrl',
//           type: 'text',
//           required: true,
//           label: 'Embedded Video URL',
//           validate: validateYouTubeUrl(VIDEO_URL_MAX, true),
//           admin: {
//             description:
//               'Paste a YouTube link (watch, share, or embed). Example: https://www.youtube.com/watch?v=XXXX or https://youtu.be/XXXX',
//           },
//         },
//       ],
//     },
//   ],
// }

// export default SagarVideosSchema
import type { Block } from 'payload'

import {
  ABOUT_US,
  SAGAR_VIDEOS_BLOCK_LABEL,
  SAGAR_VIDEOS_BLOCK_THUMBNAIL_URL,
  SAGAR_VIDEOS_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
import {
  validateSectionIdOptional,
  validateShortText,
  validateYouTubeUrl,
} from '@/utils/block/fields-validation'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const CTA_BUTTON_LABEL_MAX = 40

const SagarVideosSchema: Block = {
  slug: SAGAR_VIDEOS_SLUG_AND_TAG,
  labels: {
    singular: SAGAR_VIDEOS_BLOCK_LABEL,
    plural: SAGAR_VIDEOS_BLOCK_LABEL,
  },

  admin: { group: ABOUT_US },

  imageURL: SAGAR_VIDEOS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${SAGAR_VIDEOS_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'white-2' }),

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      ctaMaxRows: 1,
      // noCTA: true,
      includeHeading3: false, // ✅ disables heading 3 fields in admin
    }),

    // CtaButtonsField({
    //   name: 'detailsPageLink',
    //   label: 'News Details Page Link',
    //   minRows: 1,
    //   maxRows: 1,
    // }),

    {
      name: 'detailsPageLink',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 1,
      label: 'News Details Page Link',
      labels: {
        singular: 'News Details Page Link',
        plural: 'News Details Page Link',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Link Label',
              maxLength: CTA_BUTTON_LABEL_MAX,
              validate: validateShortText('Link Label', CTA_BUTTON_LABEL_MAX, true),
              admin: {
                width: '50%',
                description: `Max ${CTA_BUTTON_LABEL_MAX} characters.`,
              },
            },
            {
              name: 'buttonLink',
              label: 'Link to News Details Page',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              admin: {
                width: '50%',
                description: 'Pick the internal News Details page. External URLs are not allowed.',
              },
            },
          ],
        },
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (anchor)',
          required: false,
          admin: {
            description:
              'Optional. Used for direct jump links to a section. No spaces. Use "-" to separate words.',
          },
          validate: validateSectionIdOptional,
        },
      ],
    },

    {
      type: 'row',
      fields: [
        // image alignment field
        {
          name: 'videoAlignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'right',
          admin: {
            description: 'Select the alignment of the video',
            width: '50%',
          },
        },
      ],
    },

    // Data source toggle
    {
      name: 'useSharedData',
      type: 'checkbox',
      label: 'Use shared News (Global)',
      defaultValue: true,
      required: true,
      admin: {
        description: `When ON, this block renders data from **Global → News**.

**Before enabling:** fill up the Global → News data.

**Notes:**
• This block only stores presentation options (e.g., background color , section heading etc.).
• News Videos comes from the single shared Global to keep pages in sync.`,
      },
    },
  ],
}

export default SagarVideosSchema
