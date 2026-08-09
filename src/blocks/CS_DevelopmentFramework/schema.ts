import type { Block } from 'payload'

import {
  CASE_STUDY,
  CS_DEVELOPMENT_FRAMEWORK_BLOCK_LABEL,
  CS_DEVELOPMENT_FRAMEWORK_BLOCK_THUMBNAIL_URL,
  CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const LIFECYCLE_TITLE_MAX = 40
const LIFECYCLE_SUBTITLE_MAX = 80

const MENU_LABEL_MAX = 40
const MAIN_TITLE_MAX = 80
const MAIN_DESCRIPTION_MAX = 260

const CARD_TITLE_MAX = 80
const CARD_DESCRIPTION_MAX = 360

const timelineIconFields = [
  ...generateArrayImageFields({
    required: false,
    fieldName: 'mainIconColored',
    label: 'Main Icon Colored',
    description:
      'Upload the colored icon for this lifecycle item. This icon is used in the menu and the timeline marker.',
    aspectRatio: 1 / 1,
    quality: 0.9,
    maxKB: 80,
    ownerCollection: CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG as any,
  } as any),

  ...generateArrayImageFields({
    required: false,
    fieldName: 'mainIconWhite',
    label: 'Main Icon White',
    description:
      'Upload the white icon for this lifecycle item active/hover state. This icon is used in the menu and the active timeline marker.',
    aspectRatio: 1 / 1,
    quality: 0.9,
    maxKB: 80,
    ownerCollection: CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG as any,
  } as any),
]

const CSDevelopmentFrameworkSchema: Block = {
  slug: CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG,

  labels: {
    singular: CS_DEVELOPMENT_FRAMEWORK_BLOCK_LABEL,
    plural: CS_DEVELOPMENT_FRAMEWORK_BLOCK_LABEL,
  },

  admin: {
    group: CASE_STUDY,
  },

  imageURL: CS_DEVELOPMENT_FRAMEWORK_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CS_DEVELOPMENT_FRAMEWORK_BLOCK_LABEL} preview`,

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
        description:
          'Development framework section heading, description, CTA button and downloadable case study button.',
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

          includeHeading3: false,

          // One normal CTA: "Let’s Discuss"
          noCTA: false,
          ctaMaxRows: 1,

          // One downloadable PDF button: "Download Case Study"
          includeDownloadButton: true,
          downloadButtonLabelMax: 40,
        }),
      ],
    },

    {
      name: 'lifecycle',
      type: 'group',
      label: 'Lifecycle',
      admin: {
        description:
          'Controls the lifecycle menu and connected rope/timeline items. Each lifecycle item contains its menu label, main content, related info card and icons.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Lifecycle Title',
          required: true,
          defaultValue: 'Lifecycle',
          maxLength: LIFECYCLE_TITLE_MAX,
          validate: validateShortText('Lifecycle Title', LIFECYCLE_TITLE_MAX, true),
          admin: {
            description: `Example: Lifecycle. Max ${LIFECYCLE_TITLE_MAX} characters.`,
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Lifecycle Subtitle',
          required: false,
          defaultValue: 'Process Tracking',
          maxLength: LIFECYCLE_SUBTITLE_MAX,
          validate: validateShortText('Lifecycle Subtitle', LIFECYCLE_SUBTITLE_MAX, false),
          admin: {
            description: `Example: Process Tracking. Max ${LIFECYCLE_SUBTITLE_MAX} characters.`,
          },
        },

        {
          name: 'items',
          type: 'array',
          label: 'Lifecycle Items',
          minRows: 1,
          maxRows: 8,
          labels: {
            singular: 'Lifecycle Item',
            plural: 'Lifecycle Items',
          },
          admin: {
            description:
              'Each row is one connected lifecycle step. Example: Ideation → Functional Ideation → Innovation & Discovery.',
          },
          fields: [
            {
              name: 'menu',
              type: 'group',
              label: 'Left Menu Item',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Menu Label',
                      required: true,
                      maxLength: MENU_LABEL_MAX,
                      validate: validateShortText('Menu Label', MENU_LABEL_MAX, true),
                      admin: {
                        width: '100%',
                        description: `Example: Ideation, Strategy, Development, Deployment. Max ${MENU_LABEL_MAX} characters.`,
                      },
                    },
                    {
                      name: 'defaultActive',
                      type: 'checkbox',
                      label: 'Default Active Item',
                      defaultValue: false,
                      admin: {
                        width: '100%',
                        description:
                          'Optional. If enabled, this item can be used as the initially active lifecycle item.',
                      },
                    },
                  ],
                },
              ],
            },

            {
              name: 'mainContent',
              type: 'group',
              label: 'Main Timeline Content',
              admin: {
                description:
                  'This is the large title and paragraph connected to the selected lifecycle menu item.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Main Title',
                  required: true,
                  maxLength: MAIN_TITLE_MAX,
                  validate: validateShortText('Main Title', MAIN_TITLE_MAX, true),
                  admin: {
                    description: `Example: Functional Ideation. Max ${MAIN_TITLE_MAX} characters.`,
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Main Description',
                  required: true,
                  maxLength: MAIN_DESCRIPTION_MAX,
                  validate: validateShortText('Main Description', MAIN_DESCRIPTION_MAX, true),
                  admin: {
                    description: `Short paragraph under the main title. Max ${MAIN_DESCRIPTION_MAX} characters.`,
                  },
                },
              ],
            },

            {
              name: 'infoCard',
              type: 'group',
              label: 'Related Info Card',
              admin: {
                description:
                  'This card belongs to the same lifecycle item. Example: Innovation & Discovery card belongs to Functional Ideation.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      label: 'Card Title',
                      required: true,
                      maxLength: CARD_TITLE_MAX,
                      validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
                      admin: {
                        width: '50%',
                        description: `Example: Innovation & Discovery. Max ${CARD_TITLE_MAX} characters.`,
                      },
                    },
                    {
                      name: 'position',
                      type: 'select',
                      label: 'Card Position',
                      required: true,
                      defaultValue: 'right',
                      options: [
                        {
                          label: 'Left',
                          value: 'left',
                        },
                        {
                          label: 'Right',
                          value: 'right',
                        },
                      ],
                      admin: {
                        width: '50%',
                        description:
                          'Controls whether this related card appears on the left or right side of the rope/timeline.',
                      },
                    },
                  ],
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Card Description',
                  required: true,
                  maxLength: CARD_DESCRIPTION_MAX,
                  validate: validateShortText('Card Description', CARD_DESCRIPTION_MAX, true),
                  admin: {
                    description: `Short paragraph inside the related info card. Max ${CARD_DESCRIPTION_MAX} characters.`,
                  },
                },
              ],
            },

            {
              name: 'mainIcon',
              type: 'group',
              label: 'Main Icon',
              admin: {
                description:
                  'Single icon set for this lifecycle item. Frontend will use this icon for both lifecycle menu and timeline marker.',
              },
              fields: [...timelineIconFields],
            },
          ],
        },
      ],
    },
  ],
}

export default CSDevelopmentFrameworkSchema
