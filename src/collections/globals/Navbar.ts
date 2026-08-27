// import type { Field, GlobalConfig } from 'payload'

// import { globalTag } from '@/lib/cacheTags'
// import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants'
// import { roleAtLeast } from '@/lib/rbac'
// import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { revalidateTag } from 'next/cache'

// const CTA_TEXT_MAX = 100
// const SEARCH_TITLE_MAX = 140
// const SEARCH_DESCRIPTION_MAX = 260
// const DEPTH_MAX = 1

// const mediaHooks = withMediaLifecycle({
//   collectionSlug: GLOBAL_NAVBAR_SLUG_AND_TAG,
//   imageConfigs: [
//     {
//       fieldName: 'logo',
//       aspectRatio: 1,
//       quality: 0.92,
//       maxKB: 500,
//       required: true,
//       label: 'Navbar Logo',
//       description: 'Primary navbar logo. Transparent PNG/SVG preferred.',
//     },
//   ],
//   onAfterChange: async ({ req }) => {
//     await triggerMediaTemporaryPurge(req)
//   },
// })

// const pickGlobalHooks = (h: any) => ({
//   beforeValidate: h?.beforeValidate ?? [],
//   beforeChange: h?.beforeChange ?? [],
//   afterChange: h?.afterChange ?? [],
// })

// const base = pickGlobalHooks(mediaHooks)

// const navItemFields = (
//   levelLabel: string = 'Item',
//   depth: number = 0,
//   maxDepth: number = 4,
// ): Field[] => {
//   const base: Field[] = [
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'label',
//           type: 'text',
//           label: `${levelLabel} Label`,
//           maxLength: CTA_TEXT_MAX,
//           required: true,
//           validate: validateShortText(`${levelLabel} Label`, CTA_TEXT_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Required. Max ${CTA_TEXT_MAX} characters.`,
//           },
//         },
//       ],
//     },

//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'href',
//           label: 'Link to (internal page)',
//           type: 'relationship',
//           relationTo: 'pages',
//           required: true,
//           admin: {
//             description: 'Pick an internal Page to link to.',
//           },
//         },
//         {
//           name: 'sectionId',
//           type: 'text',
//           label: 'Section ID (anchor)',
//           required: false,
//           admin: {
//             width: '50%',
//             description:
//               'Used for direct jump links to this section. No spaces. Use "-" to separate words.',
//           },
//           validate: validateSectionIdOptional,
//         },
//       ],
//     },
//   ]

//   if (depth < maxDepth) {
//     base.push({
//       name: 'children',
//       type: 'array',
//       label: 'Children',
//       minRows: 0,
//       maxRows: 20,
//       labels: { singular: 'Child', plural: 'Children' },
//       admin: {
//         description: `Optional submenu items. You can nest up to ${maxDepth + 1} levels.`,
//       },
//       fields: navItemFields('Child', depth + 1, maxDepth),
//     })
//   }

//   return base
// }

// const Navbar: GlobalConfig = {
//   slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
//   label: 'Navbar',

//   admin: {
//     description:
//       'Global navbar: logo and multi-level navigation, plus search drawer rotating content.',
//   },

//   access: {
//     read: () => true,
//     update: ({ req }) => roleAtLeast(req.user, 'editor'),
//   },

//   fields: [
//     {
//       name: 'uploadSessionId',
//       type: 'text',
//       admin: {
//         condition: () => false,
//         readOnly: true,
//       },
//     },

//     ...generateImageFields({
//       fieldName: 'logo',
//       label: 'Navbar Logo',
//       description: 'Primary navbar logo. Transparent PNG/SVG preferred. (919:512) recommended.',
//       aspectRatio: 919 / 512,
//       quality: 0.92,
//       maxKB: 500,
//       required: true,
//       ownerCollection: GLOBAL_NAVBAR_SLUG_AND_TAG as any,
//     } as any),

//     {
//       name: 'desktop',
//       type: 'group',
//       label: 'Navigation',
//       fields: [
//         {
//           name: 'items',
//           type: 'array',
//           label: 'Menu Items',
//           minRows: 1,
//           maxRows: 20,
//           labels: {
//             singular: 'Menu Item',
//             plural: 'Menu Items',
//           },
//           admin: {
//             description:
//               'Top-level nav items for desktop and mobile. Each item can optionally have children.',
//           },
//           fields: navItemFields('Item', 0, DEPTH_MAX),
//         },
//       ],
//     },

//     {
//       name: 'searchContent',
//       type: 'group',
//       label: 'Search Drawer Content',
//       admin: {
//         description:
//           'Rotating title and description content shown at the bottom of the desktop search drawer.',
//       },
//       fields: [
//         {
//           name: 'items',
//           type: 'array',
//           label: 'Search Content Items',
//           minRows: 1,
//           maxRows: 10,
//           defaultValue: [
//             {
//               title: '“Big growth steps often bring big challenges”',
//               description:
//                 'but our team is here to make the transition seamless. Reach out today so we can kickstart your success together.',
//             },
//           ],
//           labels: {
//             singular: 'Search Content Item',
//             plural: 'Search Content Items',
//           },
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               label: 'Title',
//               required: true,
//               maxLength: SEARCH_TITLE_MAX,
//               validate: validateShortText('Search Content Title', SEARCH_TITLE_MAX, true),
//               admin: {
//                 description: `Max ${SEARCH_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'description',
//               type: 'textarea',
//               label: 'Description',
//               required: true,
//               maxLength: SEARCH_DESCRIPTION_MAX,
//               validate: validateShortText(
//                 'Search Content Description',
//                 SEARCH_DESCRIPTION_MAX,
//                 true,
//               ),
//               admin: {
//                 description: `Max ${SEARCH_DESCRIPTION_MAX} characters.`,
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   hooks: {
//     beforeValidate: [...(base.beforeValidate ?? [])],

//     beforeChange: [...(base.beforeChange ?? [])],

//     afterChange: [
//       ...(base.afterChange ?? []),
//       async () => {
//         revalidateTag(globalTag(GLOBAL_NAVBAR_SLUG_AND_TAG))
//       },
//     ],
//   },
// }

// export default Navbar

import type { Field, GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cacheTags'
import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { revalidateTag } from 'next/cache'

const CTA_TEXT_MAX = 100
const SEARCH_TITLE_MAX = 140
const SEARCH_DESCRIPTION_MAX = 260
const DEPTH_MAX = 1

const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_NAVBAR_SLUG_AND_TAG,
  imageConfigs: [
    {
      fieldName: 'logo',
      aspectRatio: 1,
      quality: 0.92,
      maxKB: 500,
      required: true,
      label: 'Navbar Logo',
      description: 'Primary navbar logo. Transparent PNG/SVG preferred.',
    },
  ],
  onAfterChange: async ({ req }) => {
    await triggerMediaTemporaryPurge(req)
  },
})

const pickGlobalHooks = (h: any) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})

const base = pickGlobalHooks(mediaHooks)

const navItemFields = (
  levelLabel: string = 'Item',
  depth: number = 0,
  maxDepth: number = 4,
): Field[] => {
  const base: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: `${levelLabel} Label`,
          maxLength: CTA_TEXT_MAX,
          required: true,
          validate: validateShortText(`${levelLabel} Label`, CTA_TEXT_MAX, true),
          admin: {
            width: '50%',
            description: `Required. Max ${CTA_TEXT_MAX} characters.`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'href',
          label: 'Link to (internal page)',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            description: 'Pick an internal Page to link to.',
          },
        },
        {
          name: 'sectionId',
          type: 'text',
          label: 'Section ID (anchor)',
          required: false,
          admin: {
            width: '50%',
            description:
              'Used for direct jump links to this section. No spaces. Use "-" to separate words.',
          },
          validate: validateSectionIdOptional,
        },
      ],
    },
  ]

  if (depth < maxDepth) {
    base.push({
      name: 'children',
      type: 'array',
      label: 'Children',
      minRows: 0,
      maxRows: 20,
      labels: { singular: 'Child', plural: 'Children' },
      admin: {
        description: `Optional submenu items. You can nest up to ${maxDepth + 1} levels.`,
      },
      fields: navItemFields('Child', depth + 1, maxDepth),
    })
  }

  return base
}

const Navbar: GlobalConfig = {
  slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
  label: 'Navbar',

  admin: {
    description:
      'Global navbar: logo and multi-level navigation, mobile drawer CTA, plus search drawer rotating content.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
        readOnly: true,
      },
    },

    ...generateImageFields({
      fieldName: 'logo',
      label: 'Navbar Logo',
      description: 'Primary navbar logo. Transparent PNG/SVG preferred. (919:512) recommended.',
      aspectRatio: 919 / 512,
      quality: 0.92,
      maxKB: 500,
      required: true,
      ownerCollection: GLOBAL_NAVBAR_SLUG_AND_TAG as any,
    } as any),

    {
      name: 'desktop',
      type: 'group',
      label: 'Navigation',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Menu Items',
          minRows: 1,
          maxRows: 20,
          labels: {
            singular: 'Menu Item',
            plural: 'Menu Items',
          },
          admin: {
            description:
              'Top-level nav items for desktop and mobile. Each item can optionally have children.',
          },
          fields: navItemFields('Item', 0, DEPTH_MAX),
        },
      ],
    },

    {
      name: 'mobileDrawer',
      type: 'group',
      label: 'Mobile Drawer',
      admin: {
        description: 'Controls mobile drawer extra CTA content.',
      },
      fields: [
        {
          name: 'dropQueryCta',
          type: 'group',
          label: 'Drop Your Query CTA',
          admin: {
            description:
              'Controls the mobile drawer “Drop Your Query” button label and internal page/section link.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Button Label',
                  required: true,
                  defaultValue: 'Drop Your Query',
                  maxLength: CTA_TEXT_MAX,
                  validate: validateShortText('Drop Query Button Label', CTA_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Required. Max ${CTA_TEXT_MAX} characters.`,
                  },
                },
                {
                  name: 'href',
                  type: 'relationship',
                  relationTo: 'pages',
                  label: 'Link to (internal page)',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Pick an internal Page to link to.',
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
                  'Optional. Used for direct jump links to a section. Example: contact-form',
              },
              validate: validateSectionIdOptional,
            },
          ],
        },
      ],
    },

    {
      name: 'searchContent',
      type: 'group',
      label: 'Search Drawer Content',
      admin: {
        description:
          'Rotating title and description content shown at the bottom of the desktop search drawer.',
      },
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Search Content Items',
          minRows: 1,
          maxRows: 10,
          defaultValue: [
            {
              title: '“Big growth steps often bring big challenges”',
              description:
                'but our team is here to make the transition seamless. Reach out today so we can kickstart your success together.',
            },
          ],
          labels: {
            singular: 'Search Content Item',
            plural: 'Search Content Items',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title',
              required: true,
              maxLength: SEARCH_TITLE_MAX,
              validate: validateShortText('Search Content Title', SEARCH_TITLE_MAX, true),
              admin: {
                description: `Max ${SEARCH_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
              required: true,
              maxLength: SEARCH_DESCRIPTION_MAX,
              validate: validateShortText(
                'Search Content Description',
                SEARCH_DESCRIPTION_MAX,
                true,
              ),
              admin: {
                description: `Max ${SEARCH_DESCRIPTION_MAX} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    beforeValidate: [...(base.beforeValidate ?? [])],

    beforeChange: [...(base.beforeChange ?? [])],

    afterChange: [
      ...(base.afterChange ?? []),
      async () => {
        revalidateTag(globalTag(GLOBAL_NAVBAR_SLUG_AND_TAG))
      },
    ],
  },
}

export default Navbar
