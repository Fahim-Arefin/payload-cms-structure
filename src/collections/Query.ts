import { FORMS } from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'
import { ValidationError } from 'payload'
import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'

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

export const Query: CollectionConfig = {
  slug: 'query',
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
      'query',
      'status',
    ],
  },

  access: {
    read: () => true,
    create: ({ req }) => roleAtLeast(req.user, 'admin'),
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
    delete: ({ req }) => roleAtLeast(req.user, 'admin'),
  },

  hooks: {
    beforeChange: [limitPublishedReviews],
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
      name: 'query',
      type: 'text',
      required: true,
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
