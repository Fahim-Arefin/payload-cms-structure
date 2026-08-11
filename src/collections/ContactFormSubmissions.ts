import type { CollectionConfig } from 'payload'

import { CONTACT_FORM_SUBMISSIONS_SLUG, FORMS } from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'

const TEXT_MAX = 120
const PHONE_MAX = 40

const ContactFormSubmissions: CollectionConfig = {
  slug: CONTACT_FORM_SUBMISSIONS_SLUG,

  labels: {
    singular: 'Contact Form Submission',
    plural: 'Contact Form Submissions',
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'selectedBudgetLabel', 'createdAt'],
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
      name: 'selectedSolutions',
      type: 'array',
      label: 'Selected Solutions',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Solution',
          required: true,
          maxLength: TEXT_MAX,
        },
      ],
    },

    {
      name: 'selectedBudgetLabel',
      type: 'text',
      label: 'Selected Budget',
      required: true,
      maxLength: TEXT_MAX,
    },

    {
      type: 'row',
      fields: [
        {
          name: 'selectedCurrencySign',
          type: 'text',
          label: 'Currency Sign',
          required: true,
          maxLength: 10,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'selectedCurrencyCode',
          type: 'text',
          label: 'Currency Code',
          required: true,
          maxLength: 10,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'budgetMin',
          type: 'number',
          label: 'Budget Min',
          required: true,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'budgetMax',
          type: 'number',
          label: 'Budget Max',
          required: true,
          admin: {
            width: '25%',
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
