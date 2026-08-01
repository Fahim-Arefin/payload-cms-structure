import type { Block } from 'payload'

import {
  ABOUT_US,
  OUR_PROJECT_BLOCK_LABEL,
  OUR_PROJECT_BLOCK_THUMBNAIL_URL,
  OUR_PROJECT_SLUG_AND_TAG,
} from '@/lib/constants'

import {
  validateAbsoluteHTTPUrl,
  validateSectionIdOptional,
  validateShortText,
} from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 90

const PROJECT_NAME_MAX = 120
const PROJECT_DESCRIPTION_MAX = 500
const BUTTON_LABEL_MAX = 40
const URL_MAX = 300
const SITE_NAME_HEADING_MAX = 80

const contactUsLinkFields = [
  {
    type: 'row' as const,
    fields: [
      {
        name: 'buttonLink',
        label: 'Contact Button Link to (internal page)',
        type: 'relationship' as const,
        relationTo: 'pages' as const,
        required: true,
        admin: {
          width: '50%',
          description: 'Pick an internal page for the Contact Us button.',
        },
      },
      {
        name: 'sectionId',
        type: 'text' as const,
        label: 'Section ID (anchor)',
        required: false,
        admin: {
          width: '50%',
          description: 'Optional direct jump section ID. No spaces. Use "-" to separate words.',
        },
        validate: validateSectionIdOptional,
      },
    ],
  },
]

const OurProjectSchema: Block = {
  slug: OUR_PROJECT_SLUG_AND_TAG,

  labels: {
    singular: OUR_PROJECT_BLOCK_LABEL,
    plural: OUR_PROJECT_BLOCK_LABEL,
  },

  admin: {
    group: ABOUT_US,
  },

  imageURL: OUR_PROJECT_BLOCK_THUMBNAIL_URL,
  imageAltText: `${OUR_PROJECT_BLOCK_LABEL} preview`,

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
          defaultBackground: 'secondary-1',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Main section heading, highlighted text and description.',
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
      name: 'projectGroup',
      type: 'group',
      label: 'Projects',
      admin: {
        description:
          'Add project showcase items with project name, description, site link and device screenshots.',
      },
      fields: [
        {
          name: 'projects',
          type: 'array',
          label: 'Projects',
          required: true,
          minRows: 1,
          maxRows: 12,
          labels: {
            singular: 'Project',
            plural: 'Projects',
          },
          admin: {
            description: 'Add project showcase items.',
          },
          fields: [
            {
              name: 'projectName',
              type: 'text',
              label: 'Project Name',
              required: true,
              maxLength: PROJECT_NAME_MAX,
              validate: validateShortText('Project Name', PROJECT_NAME_MAX, true),
              admin: {
                description: `Example: XynoLab Collabs With SAGAR Rope. Max ${PROJECT_NAME_MAX} characters.`,
              },
            },

            {
              name: 'description',
              type: 'textarea',
              label: 'Project Description',
              required: true,
              maxLength: PROJECT_DESCRIPTION_MAX,
              validate: validateShortText('Project Description', PROJECT_DESCRIPTION_MAX, true),
              admin: {
                description: `Project description. Max ${PROJECT_DESCRIPTION_MAX} characters.`,
              },
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'siteLinkButtonLabel',
                  type: 'text',
                  label: 'Site Link Button Label',
                  required: true,
                  defaultValue: 'View Site',
                  maxLength: BUTTON_LABEL_MAX,
                  validate: validateShortText('Site Link Button Label', BUTTON_LABEL_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Example: View Site. Max ${BUTTON_LABEL_MAX} characters.`,
                  },
                },
                {
                  name: 'siteLink',
                  type: 'text',
                  label: 'Site Link',
                  required: true,
                  maxLength: URL_MAX,
                  validate: validateAbsoluteHTTPUrl(URL_MAX, true),
                  admin: {
                    width: '50%',
                    description: 'External project/site URL. Example: https://example.com',
                  },
                },
              ],
            },

            ...generateArrayImageFields({
              fieldName: 'desktopSiteImage',
              label: 'Desktop Site Image',
              description:
                'Upload desktop/laptop project screenshot. Transparent PNG preferred if using device mockup. Recommended aspect ratio 16:10.',
              aspectRatio: 16 / 10,
              quality: 0.9,
              maxKB: 700,
              required: true,
              ownerCollection: OUR_PROJECT_SLUG_AND_TAG as any,
            } as any),

            ...generateArrayImageFields({
              fieldName: 'mobileSiteImage',
              label: 'Mobile Site Image',
              description:
                'Upload mobile project screenshot. Transparent PNG preferred if using phone mockup. Recommended aspect ratio 174:368.',
              aspectRatio: 174 / 368,
              quality: 0.9,
              maxKB: 500,
              required: true,
              ownerCollection: OUR_PROJECT_SLUG_AND_TAG as any,
            } as any),
          ],
        },
      ],
    },

    {
      name: 'otherInfo',
      type: 'group',
      label: 'Other Info',
      admin: {
        description:
          'Extra project section info such as site name heading and shared Contact Us button.',
      },
      fields: [
        {
          name: 'siteNameHeading',
          type: 'text',
          label: 'Site Name Heading',
          required: true,
          maxLength: SITE_NAME_HEADING_MAX,
          validate: validateShortText('Site Name Heading', SITE_NAME_HEADING_MAX, true),
          admin: {
            description: `Example: Sagar Rope. Max ${SITE_NAME_HEADING_MAX} characters.`,
          },
        },

        {
          name: 'contactUsButtonLabel',
          type: 'text',
          label: 'Contact Us Button Label',
          required: true,
          defaultValue: 'Contact Us',
          maxLength: BUTTON_LABEL_MAX,
          validate: validateShortText('Contact Us Button Label', BUTTON_LABEL_MAX, true),
          admin: {
            description: `Example: Contact Us. Max ${BUTTON_LABEL_MAX} characters.`,
          },
        },

        ...contactUsLinkFields,
      ],
    },
  ],
}

export default OurProjectSchema
