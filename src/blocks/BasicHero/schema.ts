// import type { Block } from 'payload'

// import {
//   BASIC_HERO_BLOCK_LABEL,
//   BASIC_HERO_BLOCK_THUMBNAIL_URL,
//   BASIC_HERO_SLUG_AND_TAG,
//   HERO_BLOCKS,
// } from '@/lib/constants'
// import { validateHighlightedInField, validateShortText } from '@/utils/block/fields-validation'

// import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

// const TITLE_MAX = 40
// const SUB_TITLE_MAX = 40
// const HIGHLIGHT_MAX = 40
// const VIDEO_ASSET_NAME_MAX = 120

// const heroImageFields = generateArrayImageFields({
//   required: false,
//   fieldName: 'image',
//   label: 'Hero Image',
//   description:
//     'Upload & crop an 1:1 hero image. This field is used only when Hero Media Type is set to Image.',
//   aspectRatio: 1 / 1,
//   quality: 0.9,
//   maxKB: 700,
//   ownerCollection: BASIC_HERO_SLUG_AND_TAG as any,
// } as any).map((field: any) => ({
//   ...field,
//   admin: {
//     ...(field?.admin || {}),
//     condition: (_data: any, siblingData: any) => {
//       return siblingData?.heroMediaType === 'image'
//     },
//   },
// }))

// const BasicHeroSchema: Block = {
//   slug: BASIC_HERO_SLUG_AND_TAG,
//   labels: {
//     singular: BASIC_HERO_BLOCK_LABEL,
//     plural: BASIC_HERO_BLOCK_LABEL,
//   },

//   admin: {
//     group: HERO_BLOCKS,
//   },

//   imageURL: BASIC_HERO_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${BASIC_HERO_BLOCK_LABEL} preview`,

//   fields: [
//     {
//       name: 'uploadSessionId',
//       type: 'text',
//       admin: {
//         condition: () => false,
//       },
//     },

//     {
//       name: 'heroes',
//       type: 'array',
//       required: true,
//       minRows: 1,
//       maxRows: 5,
//       labels: {
//         singular: 'Hero Item',
//         plural: 'Hero Items',
//       },

//       fields: [
//         {
//           name: 'heroMediaType',
//           type: 'select',
//           required: true,
//           defaultValue: 'image',
//           label: 'Hero Media Type',
//           options: [
//             {
//               label: 'none',
//               value: 'none',
//             },
//             {
//               label: 'Image',
//               value: 'image',
//             },
//             {
//               label: 'Video / Animation Asset',
//               value: 'video',
//             },
//           ],
//           admin: {
//             description:
//               'Choose Image to upload a cropped hero image. Choose Video / Animation Asset to use a file from public/assets/videos by entering the file name below.',
//           },
//         },

//         ...heroImageFields,

//         {
//           name: 'videoAssetName',
//           type: 'text',
//           required: false,
//           label: 'Video / Animation Asset File Name',
//           maxLength: VIDEO_ASSET_NAME_MAX,
//           validate: validateShortText(
//             'Video / Animation Asset File Name',
//             VIDEO_ASSET_NAME_MAX,
//             false,
//           ),
//           admin: {
//             condition: (_data, siblingData) => siblingData?.heroMediaType === 'video',
//             description:
//               'Enter the exact file name from public/assets/videos, including extension. Example: hero-video.mp4, hero-animation.webm, hero-lottie.json, hero-animation.lottie. The frontend will load it from /assets/videos/{fileName}.',
//           },
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'heading1',
//               type: 'text',
//               required: true,
//               label: 'Heading 1',
//               maxLength: TITLE_MAX,
//               validate: validateShortText('Heading 1', TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Heading 1 (English). Max ${TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'heading1Highlighted',
//               type: 'text',
//               required: false,
//               label: 'Highlighted Text (within heading 1)',
//               maxLength: HIGHLIGHT_MAX,
//               validate: validateHighlightedInField(
//                 'Highlighted Text (Heading 1)',
//                 'heading1',
//                 HIGHLIGHT_MAX,
//                 false,
//               ),
//               admin: {
//                 width: '50%',
//                 description: `Optional. Must be inside Heading 1. Max ${HIGHLIGHT_MAX}.`,
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'heading2',
//               type: 'text',
//               required: false,
//               label: 'Heading 2',
//               maxLength: SUB_TITLE_MAX,
//               validate: validateShortText('Heading 2', SUB_TITLE_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Heading 2 (English). Max ${SUB_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'heading2Highlighted',
//               type: 'text',
//               required: false,
//               label: 'Highlighted Text (within heading 2)',
//               maxLength: HIGHLIGHT_MAX,
//               validate: validateHighlightedInField(
//                 'Highlighted Text (Heading 2)',
//                 'heading2',
//                 HIGHLIGHT_MAX,
//                 false,
//               ),
//               admin: {
//                 width: '50%',
//                 description: `Optional. Must be inside Heading 2. Max ${HIGHLIGHT_MAX}.`,
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'heading3',
//               type: 'text',
//               required: false,
//               label: 'Heading 3',
//               maxLength: SUB_TITLE_MAX,
//               validate: validateShortText('Heading 3', SUB_TITLE_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Heading 3 (English). Max ${SUB_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'heading3Highlighted',
//               type: 'text',
//               required: false,
//               label: 'Highlighted Text (within heading 3)',
//               maxLength: HIGHLIGHT_MAX,
//               validate: validateHighlightedInField(
//                 'Highlighted Text (Heading 3)',
//                 'heading3',
//                 HIGHLIGHT_MAX,
//                 false,
//               ),
//               admin: {
//                 width: '50%',
//                 description: `Optional. Must be inside Heading 3. Max ${HIGHLIGHT_MAX}.`,
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'richText',
//               label: 'Description',
//               admin: {
//                 width: '100%',
//                 description: '',
//               },
//             },
//           ],
//         },

//         CtaButtonsField({ maxRows: 2 }),
//       ],
//     },
//   ],
// }

// export default BasicHeroSchema

import type { Block } from 'payload'

import {
  BASIC_HERO_BLOCK_LABEL,
  BASIC_HERO_BLOCK_THUMBNAIL_URL,
  BASIC_HERO_SLUG_AND_TAG,
  HERO_BLOCKS,
} from '@/lib/constants'
import { validateHighlightedInField, validateShortText } from '@/utils/block/fields-validation'

import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const TITLE_MAX = 40
const SUB_TITLE_MAX = 40
const HIGHLIGHT_MAX = 40
const VIDEO_ASSET_NAME_MAX = 120

const ANIMATED_HEADING_STATIC_MAX = 80
const ANIMATED_HEADING_TEXT_MAX = 40

const heroImageFields = generateArrayImageFields({
  required: false,
  fieldName: 'image',
  label: 'Hero Image',
  description:
    'Upload & crop an 1:1 hero image. This field is used only when Hero Media Type is set to Image.',
  aspectRatio: 1 / 1,
  quality: 0.9,
  maxKB: 700,
  ownerCollection: BASIC_HERO_SLUG_AND_TAG as any,
} as any).map((field: any) => ({
  ...field,
  admin: {
    ...(field?.admin || {}),
    condition: (_data: any, siblingData: any) => {
      return siblingData?.heroMediaType === 'image'
    },
  },
}))

const BasicHeroSchema: Block = {
  slug: BASIC_HERO_SLUG_AND_TAG,
  labels: {
    singular: BASIC_HERO_BLOCK_LABEL,
    plural: BASIC_HERO_BLOCK_LABEL,
  },

  admin: {
    group: HERO_BLOCKS,
  },

  imageURL: BASIC_HERO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BASIC_HERO_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
      },
    },

    {
      name: 'heroes',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      labels: {
        singular: 'Hero Item',
        plural: 'Hero Items',
      },

      fields: [
        {
          name: 'heroMediaType',
          type: 'select',
          required: true,
          defaultValue: 'image',
          label: 'Hero Media Type',
          options: [
            {
              label: 'none',
              value: 'none',
            },
            {
              label: 'Image',
              value: 'image',
            },
            {
              label: 'Video / Animation Asset',
              value: 'video',
            },
          ],
          admin: {
            description:
              'Choose Image to upload a cropped hero image. Choose Video / Animation Asset to use a file from public/assets/videos by entering the file name below.',
          },
        },

        ...heroImageFields,

        {
          name: 'videoAssetName',
          type: 'text',
          required: false,
          label: 'Video / Animation Asset File Name',
          maxLength: VIDEO_ASSET_NAME_MAX,
          validate: validateShortText(
            'Video / Animation Asset File Name',
            VIDEO_ASSET_NAME_MAX,
            false,
          ),
          admin: {
            condition: (_data, siblingData) => siblingData?.heroMediaType === 'video',
            description:
              'Enter the exact file name from public/assets/videos, including extension. Example: hero-video.mp4, hero-animation.webm, hero-lottie.json, hero-animation.lottie. The frontend will load it from /assets/videos/{fileName}.',
          },
        },

        {
          type: 'row',
          fields: [
            {
              name: 'heading1',
              type: 'text',
              required: true,
              label: 'Heading 1',
              maxLength: TITLE_MAX,
              validate: validateShortText('Heading 1', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Heading 1 (English). Max ${TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading1Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 1)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 1)',
                'heading1',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 1. Max ${HIGHLIGHT_MAX}.`,
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'heading2',
              type: 'text',
              required: false,
              label: 'Heading 2',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 2', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `Heading 2 (English). Max ${SUB_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading2Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 2)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 2)',
                'heading2',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 2. Max ${HIGHLIGHT_MAX}.`,
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'heading3',
              type: 'text',
              required: false,
              label: 'Heading 3',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 3', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `Heading 3 (English). Max ${SUB_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading3Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 3)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 3)',
                'heading3',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 3. Max ${HIGHLIGHT_MAX}.`,
              },
            },
          ],
        },

        {
          name: 'enableAnimatedHeading',
          type: 'checkbox',
          label: 'Enable Typewriter Heading?',
          defaultValue: false,
          admin: {
            description:
              'Turn this ON to show a typewriter animated heading below the normal heading. Normal Heading 1 / Heading 2 / Heading 3 will always remain visible.',
          },
        },

        {
          name: 'animatedHeading',
          type: 'group',
          label: 'Typewriter Heading',
          admin: {
            condition: (_data, siblingData) => siblingData?.enableAnimatedHeading === true,
            description:
              'This animated heading appears below the normal heading. The animated texts will type and delete one by one.',
          },
          fields: [
            {
              name: 'staticText',
              type: 'text',
              required: false,
              label: 'Static Text Before Typewriter',
              maxLength: ANIMATED_HEADING_STATIC_MAX,
              validate: validateShortText(
                'Typewriter Static Text',
                ANIMATED_HEADING_STATIC_MAX,
                false,
              ),
              admin: {
                description:
                  'Optional. Example: with. This text stays visible before the animated typing text.',
              },
            },

            {
              name: 'animatedTextPlacement',
              type: 'select',
              required: true,
              defaultValue: 'same-line',
              label: 'Animated Text Placement',
              options: [
                {
                  label: 'Same Line After Static Text',
                  value: 'same-line',
                },
                {
                  label: 'New Line',
                  value: 'new-line',
                },
              ],
              admin: {
                description:
                  'Choose whether the typewriter text appears beside the static text or on a new line.',
              },
            },

            {
              name: 'animatedTexts',
              type: 'array',
              label: 'Typewriter Texts',
              minRows: 1,
              maxRows: 12,
              labels: {
                singular: 'Typewriter Text',
                plural: 'Typewriter Texts',
              },
              admin: {
                description:
                  'Add words or short phrases that will type one by one. Example: Laravel, HTML5, CSS3, Bootstrap, Tailwind.',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Text',
                  maxLength: ANIMATED_HEADING_TEXT_MAX,
                  validate: validateShortText('Typewriter Text', ANIMATED_HEADING_TEXT_MAX, true),
                  admin: {
                    description: `Max ${ANIMATED_HEADING_TEXT_MAX} characters.`,
                  },
                },
              ],
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              admin: {
                width: '100%',
                description: '',
              },
            },
          ],
        },

        CtaButtonsField({ maxRows: 2 }),
      ],
    },
  ],
}

export default BasicHeroSchema
