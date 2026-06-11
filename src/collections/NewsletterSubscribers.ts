import type { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',

  labels: {
    singular: 'Newsletter Subscriber',
    plural: 'Newsletter Subscribers',
  },

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'createdAt'],
    group: 'Form Submissions',
  },

  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      required: true,
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Unsubscribed',
          value: 'unsubscribed',
        },
      ],
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
      defaultValue: 'website-footer',
      admin: {
        description: 'Where this subscriber came from.',
      },
    },
  ],

  timestamps: true,
}

export default NewsletterSubscribers
