import type { Block } from 'payload'

import {
  COMMON,
  QUERY_FORM_BLOCK_LABEL,
  QUERY_FORM_BLOCK_THUMBNAIL_URL,
  QUERY_FORM_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import {
  EMAIL_MAX,
  validateAtLeastOneRecipientEmail,
  validateEmail,
} from '@/utils/block/fields-validation'

const TAG_MAX = 40
const HEADING_MAX = 90

const QueryFormSchema: Block = {
  slug: QUERY_FORM_SLUG_AND_TAG,
  labels: {
    singular: QUERY_FORM_BLOCK_LABEL,
    plural: QUERY_FORM_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: QUERY_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${QUERY_FORM_BLOCK_LABEL} preview`,

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'bg-1' }),

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      ctaMaxRows: 1,
      includeHeading3: false,
    }),

    {
      type: 'row',
      fields: [
        {
          name: 'showPatternDesign',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'showQueryForm',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'recipientEmails',
      label: 'Recipient Emails (1–5)',
      admin: {
        description:
          'Provide at least one email address. All valid ones will receive the query message through email.',
      },
      validate: validateAtLeastOneRecipientEmail,
      fields: [
        {
          name: 'email1',
          type: 'text',
          label: 'Recipient Email 1',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 1', true),
          admin: { width: '33%' },
        },
        {
          name: 'email2',
          type: 'text',
          label: 'Recipient Email 2',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 2', false),
          admin: { width: '33%' },
        },
        {
          name: 'email3',
          type: 'text',
          label: 'Recipient Email 3',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 3', false),
          admin: { width: '33%' },
        },
        {
          name: 'email4',
          type: 'text',
          label: 'Recipient Email 4',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 4', false),
          admin: { width: '33%' },
        },
        {
          name: 'email5',
          type: 'text',
          label: 'Recipient Email 5',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 5', false),
          admin: { width: '33%' },
        },
      ],
    },
  ],
}

export default QueryFormSchema
