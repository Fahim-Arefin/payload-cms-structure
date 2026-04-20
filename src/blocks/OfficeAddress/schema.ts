// import type { Block } from 'payload'

// import {
//   GET_IN_TOUCH,
//   OFFICE_ADDRESS_BLOCK_LABEL,
//   OFFICE_ADDRESS_BLOCK_THUMBNAIL_URL,
//   OFFICE_ADDRESS_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
// import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

// /* ---------- limits ---------- */
// const TAG_MAX = 40
// const HEADING_MAX = 90

// const OfficeAddressSchema: Block = {
//   slug: OFFICE_ADDRESS_SLUG_AND_TAG,
//   labels: {
//     singular: OFFICE_ADDRESS_BLOCK_LABEL,
//     plural: OFFICE_ADDRESS_BLOCK_LABEL,
//   },

//   admin: { group: GET_IN_TOUCH },

//   imageURL: OFFICE_ADDRESS_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${OFFICE_ADDRESS_BLOCK_LABEL} preview`,

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     BgColorAndSectionIdField({ defaultBackground: 'bg-1' }),

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
//       name: 'showPatternDesign',
//       type: 'checkbox',
//       defaultValue: true,
//     },

//     {
//       type: 'row',
//       fields: [
//         // image alignment field
//         {
//           name: 'addressAlignment',
//           type: 'select',
//           options: [
//             { label: 'Left', value: 'left' },
//             { label: 'Right', value: 'right' },
//           ],
//           defaultValue: 'left',
//           admin: {
//             description: 'Select the alignment of the Map',
//             width: '50%',
//           },
//         },
//       ],
//     },
//   ],
// }

// export default OfficeAddressSchema
import type { Block } from 'payload'

import {
  GET_IN_TOUCH,
  OFFICE_ADDRESS_BLOCK_LABEL,
  OFFICE_ADDRESS_BLOCK_THUMBNAIL_URL,
  OFFICE_ADDRESS_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const TAG_MAX = 40
const HEADING_MAX = 90

const OfficeAddressSchema: Block = {
  slug: OFFICE_ADDRESS_SLUG_AND_TAG,
  labels: {
    singular: OFFICE_ADDRESS_BLOCK_LABEL,
    plural: OFFICE_ADDRESS_BLOCK_LABEL,
  },

  admin: { group: GET_IN_TOUCH },

  imageURL: OFFICE_ADDRESS_BLOCK_THUMBNAIL_URL,
  imageAltText: `${OFFICE_ADDRESS_BLOCK_LABEL} preview`,

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'bg-1' }),

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      ctaMaxRows: 1,
      includeHeading3: false,
    }),
    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'addressAlignment',
          type: 'select',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'left',
          admin: {
            description: 'Select the alignment of the map',
            width: '50%',
          },
        },
        {
          name: 'mapLink',
          type: 'textarea',
          required: true,
          admin: {
            width: '50%',
            description: 'Paste Google Maps embed iframe code or only the embed src link',
          },
        },
      ],
    },
  ],
}

export default OfficeAddressSchema
