// import { FORMS } from '@/lib/constants'
// import { roleAtLeast } from '@/lib/rbac'
// import type { CollectionConfig } from 'payload'

// export const Review: CollectionConfig = {
//   slug: 'review',
//   admin: {
//     useAsTitle: 'name',
//     group: FORMS,
//     defaultColumns: [
//       'name',
//       'email',
//       'position',
//       'companyName',
//       'country',
//       'countryDialCode',
//       'phone',
//       'rating',
//       'review',
//       'status',
//     ],
//   },

//   access: {
//     read: () => true, // public read
//     create: ({ req }) => roleAtLeast(req.user, 'admin'),
//     update: ({ req }) => roleAtLeast(req.user, 'editor'),
//     delete: ({ req }) => roleAtLeast(req.user, 'admin'),
//   },
//   fields: [
//     {
//       name: 'name',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'email',
//       type: 'email',
//       required: true,
//     },
//     {
//       name: 'companyName',
//       type: 'text',
//     },
//     {
//       name: 'position',
//       type: 'text',
//     },
//     {
//       name: 'country',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'countryDialCode',
//       type: 'text',
//     },
//     {
//       name: 'phone',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'rating',
//       type: 'number',
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     {
//       name: 'review',
//       type: 'textarea',
//       required: true,
//     },
//     {
//       name: 'status',
//       type: 'select',
//       defaultValue: 'new',
//       options: [
//         { label: 'New', value: 'new' },
//         { label: 'Reviewed', value: 'reviewed' },
//         { label: 'Published', value: 'published' },
//       ],
//     },
//   ],
// }

import { CUSTOMER_FEEDBACK_SLUG_AND_TAG, FORMS } from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'
import { revalidateTag } from 'next/cache'
import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { ValidationError } from 'payload'

const limitPublishedReviews: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  if (data?.status !== 'published') {
    return data
  }

  if (operation === 'update' && originalDoc?.status === 'published') {
    return data
  }

  const result = await req.payload.find({
    collection: 'review',
    depth: 0,
    limit: 5,
    where: {
      status: {
        equals: 'published',
      },
    },
  })

  const publishedCount = result.totalDocs

  if (publishedCount >= 5) {
    throw new ValidationError({
      errors: [
        {
          path: 'status',
          message: 'You can publish a maximum of 5 reviews.',
        },
      ],
    })
  }

  return data
}

export const Review: CollectionConfig = {
  slug: 'review',
  admin: {
    useAsTitle: 'name',
    group: FORMS,
    defaultColumns: [
      'name',
      'email',
      'position',
      'companyName',
      'country',
      'countryDialCode',
      'phone',
      'rating',
      'review',
      'status',
    ],
  },

  access: {
    read: () => true,
    create: ({ req }) => roleAtLeast(req.user, 'admin'),
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
    delete: ({ req }) => roleAtLeast(req.user, 'admin'),
  },

  // hooks: {
  //   beforeChange: [limitPublishedReviews],
  // },

  hooks: {
    beforeChange: [limitPublishedReviews],

    afterChange: [
      async () => {
        revalidateTag(CUSTOMER_FEEDBACK_SLUG_AND_TAG)
      },
    ],

    afterDelete: [
      async () => {
        revalidateTag(CUSTOMER_FEEDBACK_SLUG_AND_TAG)
      },
    ],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
    },
    {
      name: 'position',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'countryDialCode',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
