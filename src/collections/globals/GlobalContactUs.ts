// import type { GlobalConfig } from 'payload'

// import { globalTag } from '@/lib/cacheTags'
// import {
//   CONTACT_US_SLUG_AND_TAG,
//   GLOBAL_CONTACT_US_LABEL,
//   GLOBAL_CONTACT_US_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { roleAtLeast } from '@/lib/rbac'
// import { validateShortText } from '@/utils/block/fields-validation'
// import { revalidateTag } from 'next/cache'

// const OPTION_TEXT_MAX = 100
// const CURRENCY_SIGN_MAX = 10
// const CURRENCY_CODE_MAX = 10

// const GlobalContactUs: GlobalConfig = {
//   slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
//   label: GLOBAL_CONTACT_US_LABEL,

//   admin: {
//     description: 'Global Contact Us options: our solutions, currencies and budget range.',
//   },

//   access: {
//     read: () => true,
//     update: ({ req }) => roleAtLeast(req.user, 'editor'),
//   },

//   fields: [
//     {
//       name: 'ourSolutions',
//       type: 'array',
//       label: 'Our Solutions',
//       minRows: 1,
//       maxRows: 30,
//       labels: {
//         singular: 'Solution',
//         plural: 'Solutions',
//       },
//       admin: {
//         description:
//           'Examples: Software as a Service (SaaS), Web App Development, Mobile App Development.',
//       },
//       fields: [
//         {
//           name: 'text',
//           type: 'text',
//           label: 'Solution Text',
//           required: true,
//           maxLength: OPTION_TEXT_MAX,
//           validate: validateShortText('Solution Text', OPTION_TEXT_MAX, true),
//           admin: {
//             description: `Solution name. Max ${OPTION_TEXT_MAX} characters.`,
//           },
//         },
//       ],
//     },

//     {
//       name: 'currencies',
//       type: 'array',
//       label: 'Currencies',
//       required: true,
//       minRows: 1,
//       maxRows: 20,
//       labels: {
//         singular: 'Currency',
//         plural: 'Currencies',
//       },
//       admin: {
//         description: 'Examples: $, USD / ৳, BDT / ¥, JPY.',
//       },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'currencySign',
//               type: 'text',
//               label: 'Currency Sign',
//               required: true,
//               maxLength: CURRENCY_SIGN_MAX,
//               validate: validateShortText('Currency Sign', CURRENCY_SIGN_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: 'Example: $, ৳, ¥.',
//               },
//             },
//             {
//               name: 'currencyCode',
//               type: 'text',
//               label: 'Currency Code',
//               required: true,
//               maxLength: CURRENCY_CODE_MAX,
//               validate: validateShortText('Currency Code', CURRENCY_CODE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: 'Example: USD, BDT, JPY.',
//               },
//             },
//           ],
//         },
//       ],
//     },

//     {
//       name: 'budgetRange',
//       type: 'group',
//       label: 'Budget Range',
//       admin: {
//         description: 'Controls the default frontend budget range values.',
//       },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'defaultMinValue',
//               type: 'number',
//               label: 'Default Minimum Budget',
//               required: true,
//               defaultValue: 1000,
//               min: 0,
//               admin: {
//                 width: '50%',
//                 description: 'Example: 1000.',
//               },
//             },
//             {
//               name: 'defaultMaxValue',
//               type: 'number',
//               label: 'Default Maximum Budget',
//               required: true,
//               defaultValue: 10000,
//               min: 1,
//               admin: {
//                 width: '50%',
//                 description: 'Example: 10000.',
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   hooks: {
//     afterChange: [
//       async () => {
//         revalidateTag(globalTag(GLOBAL_CONTACT_US_SLUG_AND_TAG))
//         revalidateTag(CONTACT_US_SLUG_AND_TAG)
//       },
//     ],
//   },
// }

// export default GlobalContactUs
import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cacheTags'
import {
  CONTACT_US_SLUG_AND_TAG,
  GLOBAL_CONTACT_US_LABEL,
  GLOBAL_CONTACT_US_SLUG_AND_TAG,
} from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'
import { validateShortText } from '@/utils/block/fields-validation'
import { revalidateTag } from 'next/cache'

const OPTION_TEXT_MAX = 100
const CURRENCY_SIGN_MAX = 10
const CURRENCY_CODE_MAX = 10
const FORM_LABEL_MAX = 100

const GlobalContactUs: GlobalConfig = {
  slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
  label: GLOBAL_CONTACT_US_LABEL,

  admin: {
    description: 'Global Contact Us options: form labels, solutions and currencies.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    {
      name: 'formLabels',
      type: 'group',
      label: 'Form Labels',
      admin: {
        description: 'Controls the frontend Contact Us form section labels.',
      },
      fields: [
        {
          name: 'contactInfoHeading',
          type: 'text',
          label: 'Who Are We Reaching Out To Label',
          required: true,
          defaultValue: 'WHO ARE WE REACHING OUT TO?',
          maxLength: FORM_LABEL_MAX,
          validate: validateShortText('Who Are We Reaching Out To Label', FORM_LABEL_MAX, true),
        },
        {
          name: 'descriptionHeading',
          type: 'text',
          label: 'What’s On Your Mind Label',
          required: true,
          defaultValue: 'WHATS ON YOUR MIND?',
          maxLength: FORM_LABEL_MAX,
          validate: validateShortText('What’s On Your Mind Label', FORM_LABEL_MAX, true),
        },
        {
          name: 'servicesHeading',
          type: 'text',
          label: 'Services Label',
          required: true,
          defaultValue: 'WHAT SERVICES MATCH YOUR PROJECT?',
          maxLength: FORM_LABEL_MAX,
          validate: validateShortText('Services Label', FORM_LABEL_MAX, true),
        },
        {
          name: 'budgetHeading',
          type: 'text',
          label: 'Budget Label',
          required: true,
          defaultValue: 'WHAT’S YOUR COMFORTABLE BUDGET?',
          maxLength: FORM_LABEL_MAX,
          validate: validateShortText('Budget Label', FORM_LABEL_MAX, true),
        },
      ],
    },

    {
      name: 'ourSolutions',
      type: 'array',
      label: 'Our Solutions',
      minRows: 1,
      maxRows: 30,
      labels: {
        singular: 'Solution',
        plural: 'Solutions',
      },
      admin: {
        description:
          'Examples: Software as a Service (SaaS), Web App Development, Mobile App Development.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Solution Text',
          required: true,
          maxLength: OPTION_TEXT_MAX,
          validate: validateShortText('Solution Text', OPTION_TEXT_MAX, true),
          admin: {
            description: `Solution name. Max ${OPTION_TEXT_MAX} characters.`,
          },
        },
      ],
    },

    {
      name: 'currencies',
      type: 'array',
      label: 'Currencies',
      required: true,
      minRows: 1,
      maxRows: 20,
      labels: {
        singular: 'Currency',
        plural: 'Currencies',
      },
      admin: {
        description: 'Examples: $, USD / ৳, BDT / ¥, JPY.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'currencySign',
              type: 'text',
              label: 'Currency Sign',
              required: true,
              maxLength: CURRENCY_SIGN_MAX,
              validate: validateShortText('Currency Sign', CURRENCY_SIGN_MAX, true),
              admin: {
                width: '50%',
                description: 'Example: $, ৳, ¥.',
              },
            },
            {
              name: 'currencyCode',
              type: 'text',
              label: 'Currency Code',
              required: true,
              maxLength: CURRENCY_CODE_MAX,
              validate: validateShortText('Currency Code', CURRENCY_CODE_MAX, true),
              admin: {
                width: '50%',
                description: 'Example: USD, BDT, JPY.',
              },
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    afterChange: [
      async () => {
        revalidateTag(globalTag(GLOBAL_CONTACT_US_SLUG_AND_TAG))
        revalidateTag(CONTACT_US_SLUG_AND_TAG)
      },
    ],
  },
}

export default GlobalContactUs
