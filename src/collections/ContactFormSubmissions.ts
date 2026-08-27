import type { CollectionConfig } from 'payload'

import { CONTACT_FORM_SUBMISSIONS_SLUG, FORMS } from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'

const TEXT_MAX = 120
const PHONE_MAX = 40
const DESCRIPTION_MAX = 1000

const ContactFormSubmissions: CollectionConfig = {
  slug: CONTACT_FORM_SUBMISSIONS_SLUG,

  labels: {
    singular: 'Contact Form Submission',
    plural: 'Contact Form Submissions',
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name',
      'email',
      'phone',
      'city',
      'selectedBudgetLabel',
      'status',
      'createdAt',
    ],
    description: 'Submitted data from the frontend Contact Us form.',
    group: FORMS,
  },

  access: {
    read: ({ req }) => roleAtLeast(req.user, 'editor'),
    create: () => false,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
    delete: ({ req }) => roleAtLeast(req.user, 'admin'),
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      maxLength: TEXT_MAX,
    },

    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      required: true,
      maxLength: PHONE_MAX,
    },

    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
    },

    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: true,
      maxLength: TEXT_MAX,
    },

    {
      name: 'description',
      type: 'textarea',
      label: "What's On Your Mind?",
      required: false,
      maxLength: DESCRIPTION_MAX,
    },

    {
      name: 'selectedSolutions',
      type: 'array',
      label: 'Selected Services',
      required: false,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Service',
          required: true,
          maxLength: TEXT_MAX,
        },
      ],
    },

    {
      name: 'selectedBudgetLabel',
      type: 'text',
      label: 'Selected Budget',
      required: false,
      maxLength: TEXT_MAX,
    },

    {
      type: 'row',
      fields: [
        {
          name: 'selectedCurrencySign',
          type: 'text',
          label: 'Currency Sign',
          required: false,
          maxLength: 10,
          admin: {
            width: '33.33%',
          },
        },

        {
          name: 'selectedCurrencyCode',
          type: 'text',
          label: 'Currency Code',
          required: false,
          maxLength: 10,
          admin: {
            width: '33.33%',
          },
        },

        {
          name: 'budget',
          type: 'number',
          label: 'Budget',
          required: false,
          min: 0,
          admin: {
            width: '33.33%',
          },
        },
      ],
    },

    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'Contacted',
          value: 'contacted',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}

export default ContactFormSubmissions
