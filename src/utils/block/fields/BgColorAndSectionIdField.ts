// import type { Field } from 'payload'
// import { validateSectionIdOptional } from '@/utils/block/fields-validation'

// type Props = {
//   backgroundFieldName?: string // default: "backgroundColor"
//   sectionIdFieldName?: string // default: "sectionId"
//   labelBg?: string
//   labelSectionId?: string
//   defaultBackground?: string // default: "white-2"
//   // ✅ NEW
//   disableBgColor?: boolean
// }

// export const BgColorAndSectionIdField = ({
//   backgroundFieldName = 'backgroundColor',
//   sectionIdFieldName = 'sectionId',
//   labelBg = 'Section Background',
//   labelSectionId = 'Section ID (anchor)',
//   defaultBackground = 'white-2', // maps to bg-white-2
//   disableBgColor = false,
// }: Props = {}): Field => {
//   return {
//     type: 'row',
//     fields: [
//       {
//         name: backgroundFieldName,
//         type: 'select',
//         label: labelBg,
//         required: false,
//         defaultValue: defaultBackground,
//         options: [
//           { label: 'Cyan (#33CCCC)', value: 'cyan' },
//           { label: 'BG 1 (#F2F2F3)', value: 'bg-1' },

//           { label: 'White 1 (#FFFFFF)', value: 'white-1' },
//           { label: 'White 2 (#E7E7EE)', value: 'white-2' },
//           { label: 'White 3 (#686893)', value: 'white-3' },

//           { label: 'Dark 1 (#070725)', value: 'dark-1' },
//           { label: 'Dark 2 (#0E0E47)', value: 'dark-2' },
//           { label: 'Dark 2b (#09092F)', value: 'dark-2b' },
//           { label: 'Dark 3 (#0B0B3B)', value: 'dark-3' },
//         ],
//         admin: {
//           width: '50%',
//           description: 'Select a background color from the design system.',
//         },
//       },
//       {
//         name: sectionIdFieldName,
//         type: 'text',
//         label: labelSectionId,
//         required: false,
//         validate: validateSectionIdOptional,
//         admin: {
//           width: '50%',
//           description:
//             'Used for direct jump links to this section (e.g., "blog-section"). No spaces. Use "-" to separate words.',
//         },
//       },
//     ],
//   }
// }

import type { Field } from 'payload'
import { validateSectionIdOptional } from '@/utils/block/fields-validation'

type Props = {
  backgroundFieldName?: string // default: "backgroundColor"
  sectionIdFieldName?: string // default: "sectionId"
  labelBg?: string
  labelSectionId?: string
  defaultBackground?: string // default: "white-2"
  // ✅ NEW
  disableBgColor?: boolean
}

export const BgColorAndSectionIdField = ({
  backgroundFieldName = 'backgroundColor',
  sectionIdFieldName = 'sectionId',
  labelBg = 'Section Background',
  labelSectionId = 'Section ID (anchor)',
  defaultBackground = 'white-2', // maps to bg-white-2
  disableBgColor = false,
}: Props = {}): Field => {
  return {
    type: 'row',
    fields: [
      {
        name: backgroundFieldName,
        type: 'select',
        label: labelBg,
        required: false,
        defaultValue: defaultBackground,
        options: [
          { label: 'White 1 (#FFFBFC)', value: 'white-1' },
          { label: 'White 2 (#F3F8F6)', value: 'white-2' },
          { label: 'White 3 (#F1F4EB)', value: 'white-3' },
          { label: 'Secondary 1 (#0A1128)', value: 'secondary-1' },
          { label: 'Secondary 2 (#0B0537)', value: 'secondary-2' },
        ],
        admin: {
          width: '50%',
          description: 'Select a background color from the design system.',
          // dont hide just disable it
          condition: disableBgColor ? () => false : undefined,
        },
      },
      {
        name: sectionIdFieldName,
        type: 'text',
        label: labelSectionId,
        required: false,
        validate: validateSectionIdOptional,
        admin: {
          width: '50%',
          description:
            'Used for direct jump links to this section (e.g., "blog-section"). No spaces. Use "-" to separate words.',
        },
      },
    ],
  }
}
