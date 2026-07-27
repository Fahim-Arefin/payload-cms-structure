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

// const GlobalContactUs: GlobalConfig = {
//   slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
//   label: GLOBAL_CONTACT_US_LABEL,

//   admin: {
//     description: 'Global Contact Us options: our solutions and budget ranges.',
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
//       name: 'budgets',
//       type: 'array',
//       label: 'Budget Options',
//       minRows: 1,
//       maxRows: 30,
//       labels: {
//         singular: 'Budget',
//         plural: 'Budgets',
//       },
//       admin: {
//         description: 'Examples: BELOW 1K USD, 1K-3K USD, 3K-5K USD.',
//       },
//       fields: [
//         {
//           name: 'text',
//           type: 'text',
//           label: 'Budget Text',
//           required: true,
//           maxLength: OPTION_TEXT_MAX,
//           validate: validateShortText('Budget Text', OPTION_TEXT_MAX, true),
//           admin: {
//             description: `Budget range text. Max ${OPTION_TEXT_MAX} characters.`,
//           },
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
//         description:
//           'Controls the frontend budget range selector. If Max is Infinity is enabled, frontend will show ∞ as the max label but still use Slider Max Value internally.',
//       },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'minValue',
//               type: 'number',
//               label: 'Minimum Budget Value',
//               required: true,
//               defaultValue: 0,
//               min: 0,
//               admin: {
//                 width: '50%',
//                 description: 'Example: 0.',
//               },
//             },
//             {
//               name: 'maxIsInfinity',
//               type: 'checkbox',
//               label: 'Max is Infinity',
//               defaultValue: false,
//               admin: {
//                 width: '50%',
//                 description: 'Turn on if the frontend max label should show ∞.',
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'maxValue',
//               type: 'number',
//               label: 'Maximum Budget Value',
//               required: false,
//               defaultValue: 1000000,
//               min: 1,
//               admin: {
//                 width: '50%',
//                 condition: (_data, siblingData) => !siblingData?.maxIsInfinity,
//                 description: 'Example: 1000000.',
//               },
//             },
//             {
//               name: 'sliderMaxValue',
//               type: 'number',
//               label: 'Slider Max Value When Infinity',
//               required: false,
//               defaultValue: 1000000,
//               min: 1,
//               admin: {
//                 width: '50%',
//                 condition: (_data, siblingData) => !!siblingData?.maxIsInfinity,
//                 description:
//                   'Used only when Max is Infinity is ON. Example: 1000000. Frontend still needs a finite value for slider movement.',
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'defaultMinValue',
//               type: 'number',
//               label: 'Default Selected Minimum',
//               required: false,
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
//               label: 'Default Selected Maximum',
//               required: false,
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

const GlobalContactUs: GlobalConfig = {
  slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
  label: GLOBAL_CONTACT_US_LABEL,

  admin: {
    description: 'Global Contact Us options: our solutions, currencies and budget range.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
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

    {
      name: 'budgetRange',
      type: 'group',
      label: 'Budget Range',
      admin: {
        description: 'Controls the frontend budget range selector.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'minValue',
              type: 'number',
              label: 'Minimum Budget Value',
              required: true,
              defaultValue: 100000,
              min: 0,
              admin: {
                width: '50%',
                description: 'Example: 0.',
              },
            },
            {
              name: 'maxValue',
              type: 'number',
              label: 'Maximum Budget Value',
              required: true,
              defaultValue: 10000000,
              min: 1,
              admin: {
                width: '50%',
                description: 'Example: 10000000.',
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'defaultMinValue',
              type: 'number',
              label: 'Default Selected Minimum',
              required: false,
              defaultValue: 100000,
              min: 0,
              admin: {
                width: '50%',
                description: 'Example: 100000.',
              },
            },
            {
              name: 'defaultMaxValue',
              type: 'number',
              label: 'Default Selected Maximum',
              required: false,
              defaultValue: 10000000,
              min: 1,
              admin: {
                width: '50%',
                description: 'Example: 10000000.',
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
