// import type { Field } from 'payload'

// import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
// import { validateHighlightedInField, validateShortText } from '@/utils/block/fields-validation'

// type Args = {
//   tagMax: number
//   heading1Max: number
//   heading1HighlightMax: number
//   heading2Max: number
//   heading2HighlightMax: number
//   ctaMaxRows?: number
//   noCTA?: boolean // ✅ new
// }

// /**
//  * Always returns:
//  *  - tag
//  *  - heading1 + heading1Highlighted
//  *  - heading2 + heading2Highlighted
//  *  - description
//  *  - ctaButtons (common field)
//  */
// export const SectionHeadingFields = ({
//   tagMax,
//   heading1Max,
//   heading1HighlightMax,
//   heading2Max,
//   heading2HighlightMax,
//   ctaMaxRows = 1,
//   noCTA = false,
// }: Args): Field[] => {
//   return [
//     // ===== Tag =====
//     {
//       name: 'tag',
//       type: 'text',
//       required: false,
//       label: 'Tag',
//       maxLength: tagMax,
//       validate: validateShortText('Tag', tagMax, false),
//       admin: {
//         description: `Small label above heading. Max ${tagMax} characters.`,
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
//           maxLength: heading1Max,
//           validate: validateShortText('Heading 1', heading1Max, true),
//           admin: {
//             width: '50%',
//             description: `Main heading line 1. Max ${heading1Max} characters.`,
//           },
//         },
//         {
//           name: 'heading1Highlighted',
//           type: 'text',
//           required: false,
//           label: 'Highlighted Text (within heading 1)',
//           maxLength: heading1HighlightMax,
//           validate: validateHighlightedInField(
//             'Highlighted Text (Heading 1)',
//             'heading1',
//             heading1HighlightMax,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must be inside Heading 1. Max ${heading1HighlightMax}.`,
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
//           maxLength: heading2Max,
//           validate: validateShortText('Heading 2', heading2Max, false),
//           admin: {
//             width: '50%',
//             description: `Secondary heading line. Max ${heading2Max} characters.`,
//           },
//         },
//         {
//           name: 'heading2Highlighted',
//           type: 'text',
//           required: false,
//           label: 'Highlighted Text (within heading 2)',
//           maxLength: heading2HighlightMax,
//           validate: validateHighlightedInField(
//             'Highlighted Text (Heading 2)',
//             'heading2',
//             heading2HighlightMax,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `Optional. Must be inside Heading 2. Max ${heading2HighlightMax}.`,
//           },
//         },
//       ],
//     },

//     // ===== Body content =====
//     {
//       name: 'description',
//       type: 'richText',
//       label: 'Description',
//       admin: {
//         description: 'Write the paragraph text (you can add multiple paragraphs).',
//       },
//     },

//     // ===== CTA Buttons (common source) =====
//     // CtaButtonsField({ maxRows: ctaMaxRows }),
//   ]
// }

import type { Field } from 'payload'

import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { validateHighlightedInField, validateShortText } from '@/utils/block/fields-validation'

type Args = {
  tagMax: number
  heading1Max: number
  heading1HighlightMax: number
  heading2Max: number
  heading2HighlightMax: number
  heading3Max: number
  heading3HighlightMax: number

  ctaMaxRows?: number
  noCTA?: boolean // ✅ new
}

/**
 * Returns:
 *  - tag
 *  - heading1 + heading1Highlighted
 *  - heading2 + heading2Highlighted
 *  - description
 *  - (optional) ctaButtons
 */
export const SectionHeadingFields = ({
  tagMax,
  heading1Max,
  heading1HighlightMax,
  heading2Max,
  heading2HighlightMax,
  heading3Max,
  heading3HighlightMax,
  ctaMaxRows = 1,
  noCTA = false,
}: Args): Field[] => {
  const fields: Field[] = [
    // ===== Tag =====
    {
      name: 'tag',
      type: 'text',
      required: false,
      label: 'Tag',
      maxLength: tagMax,
      validate: validateShortText('Tag', tagMax, false),
      admin: {
        description: `Small label above heading. Max ${tagMax} characters.`,
      },
    },

    // ===== Heading 1 + highlighted =====
    {
      type: 'row',
      fields: [
        {
          name: 'heading1',
          type: 'text',
          required: true,
          label: 'Heading 1',
          maxLength: heading1Max,
          validate: validateShortText('Heading 1', heading1Max, true),
          admin: {
            width: '33.33%',
            description: `Main heading line 1. Max ${heading1Max} characters.`,
          },
        },
        {
          name: 'heading1Highlighted',
          type: 'text',
          required: false,
          label: 'Highlighted Text (within heading 1)',
          maxLength: heading1HighlightMax,
          validate: validateHighlightedInField(
            'Highlighted Text (Heading 1)',
            'heading1',
            heading1HighlightMax,
            false,
          ),
          admin: {
            width: '33.33%',
            description: `Optional. Must be inside Heading 1. Max ${heading1HighlightMax}.`,
          },
        },
        {
          name: 'heading1HighlightColor',
          type: 'select',
          required: false,
          label: 'Highlight Color',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          admin: {
            width: '33.33%',
            description: 'Choose the highlight color style for this heading.',
          },
        },
      ],
    },

    // ===== Heading 2 + highlighted =====
    {
      type: 'row',
      fields: [
        {
          name: 'heading2',
          type: 'text',
          required: false,
          label: 'Heading 2',
          maxLength: heading2Max,
          validate: validateShortText('Heading 2', heading2Max, false),
          admin: {
            width: '33.33%',
            description: `Secondary heading line. Max ${heading2Max} characters.`,
          },
        },
        {
          name: 'heading2Highlighted',
          type: 'text',
          required: false,
          label: 'Highlighted Text (within heading 2)',
          maxLength: heading2HighlightMax,
          validate: validateHighlightedInField(
            'Highlighted Text (Heading 2)',
            'heading2',
            heading2HighlightMax,
            false,
          ),
          admin: {
            width: '33.33%',
            description: `Optional. Must be inside Heading 2. Max ${heading2HighlightMax}.`,
          },
        },
        {
          name: 'heading2HighlightColor',
          type: 'select',
          required: false,
          label: 'Highlight Color',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          admin: {
            width: '33.33%',
            description: 'Choose the highlight color style for this heading.',
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
          maxLength: heading3Max,
          validate: validateShortText('Heading 3', heading3Max, false),
          admin: {
            width: '25%',
            description: `Optional heading line 3. Max ${heading3Max} characters.`,
          },
        },
        {
          name: 'heading3Highlighted',
          type: 'text',
          required: false,
          label: 'Highlighted Text (within heading 3)',
          maxLength: heading3HighlightMax,
          validate: validateHighlightedInField(
            'Highlighted Text (Heading 3)',
            'heading3',
            heading3HighlightMax,
            false,
          ),
          admin: {
            width: '25%',
            description: `Optional. Must be inside Heading 3. Max ${heading3HighlightMax}.`,
          },
        },
        {
          name: 'heading3HighlightColor',
          type: 'select',
          required: false,
          label: 'Highlight Color',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
          ],
          admin: {
            width: '25%',
            description: 'Choose the highlight color style for Heading 3.',
          },
        },
        {
          name: 'heading3Layout',
          type: 'select',
          required: false,
          label: 'Heading 3 Layout',
          defaultValue: 'solo',
          options: [
            { label: 'Solo (new line)', value: 'solo' },
            { label: 'Beside Description', value: 'besideDescription' },
          ],
          admin: {
            width: '25%',
            description:
              'Controls whether Heading 3 is shown alone or aligned beside the description.',
          },
        },
      ],
    },

    // ===== Body content =====
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      admin: {
        description: 'Write the paragraph text (you can add multiple paragraphs).',
      },
    },
  ]

  // ✅ optional CTA
  if (!noCTA) {
    fields.push(CtaButtonsField({ maxRows: ctaMaxRows }) as unknown as Field)
  }

  return fields
}
