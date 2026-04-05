// import type { Block } from 'payload'

// import {
//   COMMON,
//   PRODUCT_INTRO_BLOCK_LABEL,
//   PRODUCT_INTRO_BLOCK_THUMBNAIL_URL,
//   PRODUCT_INTRO_SLUG_AND_TAG,
// } from '@/lib/constants'

// import {
//   validateHexColor,
//   validateHighlightedInField,
//   validateSectionIdOptional,
//   validateShortText,
// } from '@/utils/block/fields-validation'
// import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
// import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'

// /* ---------- limits ---------- */
// const TAG_MAX = 40
// const HEADING_1_MAX = 90
// const HEADING_1_HIGHLIGHT_MAX = 60
// const COLOR_HEX_LEN = 7
// const HEADING_2_MAX = 90
// const HEADING_2_HIGHLIGHT_MAX = 60

// const ProductIntroSchema: Block = {
//   slug: PRODUCT_INTRO_SLUG_AND_TAG,
//   labels: {
//     singular: PRODUCT_INTRO_BLOCK_LABEL,
//     plural: PRODUCT_INTRO_BLOCK_LABEL,
//   },

//   admin: { group: COMMON },

//   imageURL: PRODUCT_INTRO_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${PRODUCT_INTRO_BLOCK_LABEL} preview`,

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // {
//     //   type: 'row',
//     //   fields: [
//     //     {
//     //       name: 'backgroundColor',
//     //       type: 'text',
//     //       label: 'Section Background Color',
//     //       maxLength: COLOR_HEX_LEN,
//     //       validate: validateHexColor,
//     //       defaultValue: '#E7E7EE',
//     //       admin: {
//     //         width: '50%',
//     //         description: `Hex color in #RRGGBB (e.g., #E7E7EE). Length ${COLOR_HEX_LEN}.`,
//     //       },
//     //     },
//     //     {
//     //       name: 'sectionId',
//     //       type: 'text',
//     //       label: 'Section ID (anchor)',
//     //       required: false,
//     //       admin: {
//     //         width: '50%',
//     //         description:
//     //           'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
//     //       },
//     //       validate: validateSectionIdOptional,
//     //     },
//     //   ],
//     // },
//     BgColorAndSectionIdField({ defaultBackground: '#E7E7EE' }),

//     // ===== Tag =====
//     {
//       name: 'tag',
//       type: 'text',
//       required: false,
//       label: 'Tag',
//       maxLength: TAG_MAX,
//       validate: validateShortText('Tag', TAG_MAX, false),
//       admin: {
//         description: `Small label above heading (e.g., "SAGAR QUALITY ASSURANCE"). Max ${TAG_MAX}.`,
//       },
//     },

//     // ===== Heading 1 + highlighted =====
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'heading1',
//           type: 'text',
//           required: true,
//           label: 'Heading 1',
//           maxLength: HEADING_1_MAX,
//           validate: validateShortText('Heading 1', HEADING_1_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Main heading line 1. Max ${HEADING_1_MAX} characters.`,
//           },
//         },
//         {
//           name: 'heading1Highlighted',
//           type: 'text',
//           required: false,
//           label: 'Highlighted Text (within heading 1)',
//           maxLength: HEADING_1_HIGHLIGHT_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (Heading 1)',
//             'heading1',
//             HEADING_1_HIGHLIGHT_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must be inside Heading 1. Max ${HEADING_1_HIGHLIGHT_MAX}.`,
//           },
//         },
//       ],
//     },

//     // ===== Heading 2 + highlighted =====
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'heading2',
//           type: 'text',
//           required: false,
//           label: 'Heading 2',
//           maxLength: HEADING_2_MAX,
//           validate: validateShortText('Heading 2', HEADING_2_MAX, false),
//           admin: {
//             width: '50%',
//             description: `Secondary heading line. Max ${HEADING_2_MAX} characters.`,
//           },
//         },
//         {
//           name: 'heading2Highlighted',
//           type: 'text',
//           required: false,
//           label: 'Highlighted Text (within heading 2)',
//           maxLength: HEADING_2_HIGHLIGHT_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (Heading 2)',
//             'heading2',
//             HEADING_2_HIGHLIGHT_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must be inside Heading 2. Max ${HEADING_2_HIGHLIGHT_MAX}.`,
//           },
//         },
//       ],
//     },

//     // ===== Body content (multi paragraphs) =====
//     {
//       name: 'description',
//       type: 'richText',
//       label: 'description',
//       admin: {
//         description: 'Write the paragraph text (you can add multiple paragraphs).',
//       },
//     },

//     // ===== CTA Buttons (common source) =====
//     CtaButtonsField({ maxRows: 1 }),
//   ],
// }

// export default ProductIntroSchema

import type { Block } from 'payload'

import {
  COMMON,
  PRODUCT_INTRO_BLOCK_LABEL,
  PRODUCT_INTRO_BLOCK_THUMBNAIL_URL,
  PRODUCT_INTRO_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const ProductIntroSchema: Block = {
  slug: PRODUCT_INTRO_SLUG_AND_TAG,
  labels: {
    singular: PRODUCT_INTRO_BLOCK_LABEL,
    plural: PRODUCT_INTRO_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: PRODUCT_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PRODUCT_INTRO_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // BgColorAndSectionIdField({ defaultBackground: '#E7E7EE' }),
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
    }),

    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default ProductIntroSchema
