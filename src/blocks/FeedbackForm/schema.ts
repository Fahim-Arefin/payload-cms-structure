import type { Block } from 'payload'

import {
  GET_IN_TOUCH,
  FEEDBACK_FORM_BLOCK_LABEL,
  FEEDBACK_FORM_BLOCK_THUMBNAIL_URL,
  FEEDBACK_FORM_SLUG_AND_TAG,
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

const FeedbackFormSchema: Block = {
  slug: FEEDBACK_FORM_SLUG_AND_TAG,
  labels: {
    singular: FEEDBACK_FORM_BLOCK_LABEL,
    plural: FEEDBACK_FORM_BLOCK_LABEL,
  },

  admin: { group: GET_IN_TOUCH },

  imageURL: FEEDBACK_FORM_BLOCK_THUMBNAIL_URL,
  imageAltText: `${FEEDBACK_FORM_BLOCK_LABEL} preview`,

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    BgColorAndSectionIdField({ defaultBackground: 'white-2' }),

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
          name: 'showReviewForm',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    // Recipient Emails (now 1–5)
    {
      type: 'group',
      name: 'recipientEmails',
      label: 'Recipient Emails (1–5)', // ← updated label
      admin: {
        description:
          'Provide at least one email address. All valid ones will receive the message through email.',
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
          label: 'Recipient Email 4', // ← new field
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 4', false),
          admin: { width: '33%' },
        },
        {
          name: 'email5',
          type: 'text',
          label: 'Recipient Email 5', // ← new field
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 5', false),
          admin: { width: '33%' },
        },
      ],
    },
  ],
}

export default FeedbackFormSchema
