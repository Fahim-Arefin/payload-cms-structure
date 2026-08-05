import type { Block } from 'payload'

import {
  CONTACT_INFO_BLOCK_LABEL,
  CONTACT_INFO_BLOCK_THUMBNAIL_URL,
  CONTACT_INFO_SLUG_AND_TAG,
  GET_IN_TOUCH,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const LABEL_MAX = 40
const PHONE_MAX = 40
const EMAIL_MAX = 100
const LINK_MAX = 300

const ContactInfoSchema: Block = {
  slug: CONTACT_INFO_SLUG_AND_TAG,

  labels: {
    singular: CONTACT_INFO_BLOCK_LABEL,
    plural: CONTACT_INFO_BLOCK_LABEL,
  },

  admin: {
    group: GET_IN_TOUCH,
  },

  imageURL: CONTACT_INFO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CONTACT_INFO_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
      },
    },

    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Section Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-2',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Contact info section tag, heading and highlighted heading text.',
      },
      fields: [
        ...SectionHeadingFields({
          tagMax: TAG_MAX,
          heading1Max: HEADING_MAX,
          heading1HighlightMax: HEADING_MAX,
          heading2Max: HEADING_MAX,
          heading2HighlightMax: HEADING_MAX,
          heading3Max: HEADING_MAX,
          heading3HighlightMax: HEADING_MAX,
          noCTA: true,
          includeHeading3: false,
        }),
      ],
    },

    {
      name: 'contacts',
      type: 'group',
      label: 'Contacts',
      admin: {
        description: 'Manage contact cards for phone, email, WhatsApp, LinkedIn and Facebook.',
      },
      fields: [
        {
          name: 'callUs',
          type: 'group',
          label: 'Call Us',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              defaultValue: 'Call Us',
              maxLength: LABEL_MAX,
              validate: validateShortText('Call Us Label', LABEL_MAX, true),
              admin: {
                description: `Example: Call Us. Max ${LABEL_MAX} characters.`,
              },
            },
            {
              name: 'phoneNumber',
              type: 'text',
              label: 'Phone Number',
              required: true,
              defaultValue: '+880 1777-189611',
              maxLength: PHONE_MAX,
              validate: validateShortText('Phone Number', PHONE_MAX, true),
              admin: {
                description: `Example: +880 1777-189611. Max ${PHONE_MAX} characters.`,
              },
            },
          ],
        },

        {
          name: 'emailUs',
          type: 'group',
          label: 'Email Us',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              defaultValue: 'Email Us',
              maxLength: LABEL_MAX,
              validate: validateShortText('Email Us Label', LABEL_MAX, true),
              admin: {
                description: `Example: Email Us. Max ${LABEL_MAX} characters.`,
              },
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              required: true,
              defaultValue: 'contact@xynolab.com',
              admin: {
                description: `Example: contact@xynolab.com. Max ${EMAIL_MAX} characters.`,
              },
            },
          ],
        },

        {
          name: 'whatsApp',
          type: 'group',
          label: 'WhatsApp',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              defaultValue: 'Live Chat',
              maxLength: LABEL_MAX,
              validate: validateShortText('WhatsApp Label', LABEL_MAX, true),
              admin: {
                description: `Example: Live Chat. Max ${LABEL_MAX} characters.`,
              },
            },
            {
              name: 'link',
              type: 'text',
              label: 'WhatsApp Link',
              required: true,
              maxLength: LINK_MAX,
              validate: validateShortText('WhatsApp Link', LINK_MAX, true),
              defaultValue:
                'https://api.whatsapp.com/send?phone=%2B8801777189611&brid=YQYMKgmDKn-ZQ3Gbr7U7AA',
              admin: {
                description: `Example: https://api.whatsapp.com/send?phone=%2B8801777189611&brid=YQYMKgmDKn-ZQ3Gbr7U7AA. Max ${LINK_MAX} characters.`,
              },
            },
          ],
        },

        {
          name: 'linkedIn',
          type: 'group',
          label: 'LinkedIn',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              defaultValue: 'LinkedIn',
              maxLength: LABEL_MAX,
              validate: validateShortText('LinkedIn Label', LABEL_MAX, true),
              admin: {
                description: `Example: LinkedIn. Max ${LABEL_MAX} characters.`,
              },
            },
            {
              name: 'link',
              type: 'text',
              label: 'LinkedIn Link',
              required: true,
              maxLength: LINK_MAX,
              validate: validateShortText('LinkedIn Link', LINK_MAX, true),
              defaultValue: 'https://www.linkedin.com/company/101714006/admin/dashboard/',
              admin: {
                description: `Example: https://www.linkedin.com/company/101714006/admin/dashboard/. Max ${LINK_MAX} characters.`,
              },
            },
          ],
        },

        {
          name: 'facebook',
          type: 'group',
          label: 'Facebook',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              defaultValue: 'Facebook',
              maxLength: LABEL_MAX,
              validate: validateShortText('Facebook Label', LABEL_MAX, true),
              admin: {
                description: `Example: Facebook. Max ${LABEL_MAX} characters.`,
              },
            },
            {
              name: 'link',
              type: 'text',
              label: 'Facebook Link',
              required: true,
              maxLength: LINK_MAX,
              validate: validateShortText('Facebook Link', LINK_MAX, true),
              defaultValue: 'https://www.facebook.com/share/17mQMjauXM/',
              admin: {
                description: `Example: https://www.facebook.com/share/17mQMjauXM/. Max ${LINK_MAX} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default ContactInfoSchema
