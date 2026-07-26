// import type { Block } from 'payload'

// import {
//   HOME_PAGE,
//   COMPANY_INTRO_BLOCK_LABEL,
//   COMPANY_INTRO_BLOCK_THUMBNAIL_URL,
//   COMPANY_INTRO_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
// import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

// /* ---------- limits ---------- */
// const TAG_MAX = 40
// const HEADING_MAX = 90

// const CompanyIntroSchema: Block = {
//   slug: COMPANY_INTRO_SLUG_AND_TAG,
//   labels: {
//     singular: COMPANY_INTRO_BLOCK_LABEL,
//     plural: COMPANY_INTRO_BLOCK_LABEL,
//   },

//   admin: { group: HOME_PAGE },

//   imageURL: COMPANY_INTRO_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${COMPANY_INTRO_BLOCK_LABEL} preview`,

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     {
//       name: 'sectionSettings',
//       type: 'group',
//       label: 'Section Settings',
//       fields: [
//         BgColorAndSectionIdField({
//           defaultBackground: 'white-2',
//         }),
//       ],
//     },
//     {
//       name: 'sectionHeading',
//       type: 'group',
//       label: 'Section Heading',
//       admin: {
//         description: 'Main intro heading, highlighted text, description and optional CTA.',
//       },
//       fields: [
//         ...SectionHeadingFields({
//           tagMax: TAG_MAX,
//           heading1Max: HEADING_MAX,
//           heading1HighlightMax: HEADING_MAX,
//           heading2Max: HEADING_MAX,
//           heading2HighlightMax: HEADING_MAX,
//           heading3Max: HEADING_MAX,
//           heading3HighlightMax: HEADING_MAX,
//           noCTA: true,
//           includeHeading3: false,
//         }),
//       ],
//     },
//     {
//       name: 'companyIntroDescription',
//       type: 'group',
//       label: 'Company Intro Description',
//       admin: {
//         description: 'Additional company intro description content.',
//       },
//       fields: [
//         {
//           name: 'description',
//           type: 'richText',
//           label: 'Description',
//           admin: {
//             description: 'Write the company intro description text.',
//           },
//         },
//       ],
//     },
//   ],
// }

// export default CompanyIntroSchema

import type { Block } from 'payload'

import {
  COMPANY_INTRO_BLOCK_LABEL,
  COMPANY_INTRO_BLOCK_THUMBNAIL_URL,
  COMPANY_INTRO_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const PARAGRAPH_MAX = 1200

const CompanyIntroSchema: Block = {
  slug: COMPANY_INTRO_SLUG_AND_TAG,

  labels: {
    singular: COMPANY_INTRO_BLOCK_LABEL,
    plural: COMPANY_INTRO_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: COMPANY_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${COMPANY_INTRO_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
      },
    },

    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Section Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-2',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Main intro heading, highlighted text, description and optional CTA.',
      },
      fields: [
        ...SectionHeadingFields({
          tagMax: TAG_MAX,
          heading1Max: HEADING_MAX,
          heading1HighlightMax: HEADING_MAX,
          heading2Max: HEADING_MAX,
          heading2HighlightMax: HEADING_MAX,
          heading3Max: HEADING_MAX,
          heading3HighlightMax: HEADING_MAX,
          noCTA: true,
          includeHeading3: false,
        }),
      ],
    },

    {
      name: 'companyIntroDescription',
      type: 'group',
      label: 'Company Intro Description',
      admin: {
        description: 'Additional company intro paragraph content.',
      },
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
          label: 'Paragraph',
          required: true,
          maxLength: PARAGRAPH_MAX,
          validate: validateShortText('Company Intro Paragraph', PARAGRAPH_MAX, true),
          admin: {
            description: `Write the company intro paragraph. Max ${PARAGRAPH_MAX} characters.`,
          },
        },
      ],
    },
  ],
}

export default CompanyIntroSchema
