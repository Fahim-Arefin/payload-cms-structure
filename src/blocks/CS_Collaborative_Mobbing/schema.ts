import type { Block } from 'payload'

import {
  CASE_STUDY,
  CS_COLLABORATIVE_MOBBING_BLOCK_LABEL,
  CS_COLLABORATIVE_MOBBING_BLOCK_THUMBNAIL_URL,
  CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 120

const FEATURE_TITLE_MAX = 80
const FEATURE_DESCRIPTION_MAX = 300

const ROLE_LABEL_MAX = 40
const ROLE_DESCRIPTION_MAX = 120

const CSCollaborativeMobbingSchema: Block = {
  slug: CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG,

  labels: {
    singular: CS_COLLABORATIVE_MOBBING_BLOCK_LABEL,
    plural: CS_COLLABORATIVE_MOBBING_BLOCK_LABEL,
  },

  admin: {
    group: CASE_STUDY,
  },

  imageURL: CS_COLLABORATIVE_MOBBING_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CS_COLLABORATIVE_MOBBING_BLOCK_LABEL} preview`,

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
          'Top section heading. Example: tag, "01. Collaborative Mobbing", and short description.',
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
      name: 'otherInfo',
      type: 'group',
      label: 'Other Info',
      admin: {
        description: 'Main image, feature information, navigator/driver role data and icons.',
      },
      fields: [
        ...generateImageFields({
          fieldName: 'mainImage',
          label: 'Main Image',
          description:
            'Upload the main collaborative mobbing image. Recommended wide image. Aspect ratio 902:540.',
          aspectRatio: 902 / 540,
          quality: 0.9,
          maxKB: 600,
          required: true,
          ownerCollection: CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG as any,
        } as any),

        {
          name: 'feature',
          type: 'group',
          label: 'Feature Info',
          admin: {
            description: 'Right side feature content. Example: 90-Minute Daily Focus.',
          },
          fields: [
            ...generateImageFields({
              fieldName: 'icon',
              label: 'Feature Icon',
              description:
                'Upload feature icon. Example: timer/clock icon. Recommended square icon.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 100,
              required: true,
              ownerCollection: CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG as any,
            } as any),

            {
              name: 'title',
              type: 'text',
              label: 'Feature Title',
              required: true,
              maxLength: FEATURE_TITLE_MAX,
              validate: validateShortText('Feature Title', FEATURE_TITLE_MAX, true),
              admin: {
                description: `Example: 90-Minute Daily Focus. Max ${FEATURE_TITLE_MAX} characters.`,
              },
            },

            {
              name: 'description',
              type: 'textarea',
              label: 'Feature Description',
              required: true,
              maxLength: FEATURE_DESCRIPTION_MAX,
              validate: validateShortText('Feature Description', FEATURE_DESCRIPTION_MAX, true),
              admin: {
                description: `Feature description. Max ${FEATURE_DESCRIPTION_MAX} characters.`,
              },
            },
          ],
        },

        {
          name: 'roles',
          type: 'group',
          label: 'Navigator / Driver Roles',
          admin: {
            description: 'Small bottom role section. Example: Navigator → Driver.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'navigatorLabel',
                  type: 'text',
                  label: 'Navigator Label',
                  required: true,
                  defaultValue: 'Navigator',
                  maxLength: ROLE_LABEL_MAX,
                  validate: validateShortText('Navigator Label', ROLE_LABEL_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Example: Navigator. Max ${ROLE_LABEL_MAX} characters.`,
                  },
                },
                {
                  name: 'navigatorDescription',
                  type: 'text',
                  label: 'Navigator Description',
                  required: true,
                  defaultValue: 'Strategic Intent',
                  maxLength: ROLE_DESCRIPTION_MAX,
                  validate: validateShortText('Navigator Description', ROLE_DESCRIPTION_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Example: Strategic Intent. Max ${ROLE_DESCRIPTION_MAX} characters.`,
                  },
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'driverLabel',
                  type: 'text',
                  label: 'Driver Label',
                  required: true,
                  defaultValue: 'Driver',
                  maxLength: ROLE_LABEL_MAX,
                  validate: validateShortText('Driver Label', ROLE_LABEL_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Example: Driver. Max ${ROLE_LABEL_MAX} characters.`,
                  },
                },
                {
                  name: 'driverDescription',
                  type: 'text',
                  label: 'Driver Description',
                  required: true,
                  defaultValue: 'Tactical Input',
                  maxLength: ROLE_DESCRIPTION_MAX,
                  validate: validateShortText('Driver Description', ROLE_DESCRIPTION_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Example: Tactical Input. Max ${ROLE_DESCRIPTION_MAX} characters.`,
                  },
                },
              ],
            },

            ...generateImageFields({
              fieldName: 'navigatorIcon',
              label: 'Navigator Icon',
              description: 'Upload navigator icon. Recommended square icon.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 100,
              required: true,
              ownerCollection: CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG as any,
            } as any),

            ...generateImageFields({
              fieldName: 'driverIcon',
              label: 'Driver Icon',
              description: 'Upload driver icon. Recommended square icon.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 100,
              required: true,
              ownerCollection: CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG as any,
            } as any),
          ],
        },
      ],
    },
  ],
}

export default CSCollaborativeMobbingSchema
