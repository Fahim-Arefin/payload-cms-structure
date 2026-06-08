import type { Block } from 'payload'

import {
  BASIC_HERO_BLOCK_LABEL,
  BASIC_HERO_BLOCK_THUMBNAIL_URL,
  BASIC_HERO_SLUG_AND_TAG,
  HERO_BLOCKS,
} from '@/lib/constants'
import {
  validateHighlightedInField,
  validateSectionIdOptional,
  validateShortText,
} from '@/utils/block/fields-validation'

import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const TITLE_MAX = 40
const SUB_TITLE_MAX = 40
const HIGHLIGHT_MAX = 40
const WEB_SOLUTION_MAX = 40
const VIDEO_ASSET_NAME_MAX = 120

const heroImageFields = generateArrayImageFields({
  required: false,
  fieldName: 'image',
  label: 'Hero Image',
  description:
    'Upload & crop a 20:18 hero image. This field is used only when Hero Media Type is set to Image.',
  aspectRatio: 20 / 18,
  quality: 0.9,
  maxKB: 700,
  ownerCollection: BASIC_HERO_SLUG_AND_TAG as any,
} as any).map((field: any) => ({
  ...field,
  admin: {
    ...(field?.admin || {}),
    condition: (_data: any, siblingData: any) => {
      return siblingData?.heroMediaType === 'image'
    },
  },
}))

const BasicHeroSchema: Block = {
  slug: BASIC_HERO_SLUG_AND_TAG,
  labels: {
    singular: BASIC_HERO_BLOCK_LABEL,
    plural: BASIC_HERO_BLOCK_LABEL,
  },

  admin: {
    group: HERO_BLOCKS,
  },

  imageURL: BASIC_HERO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BASIC_HERO_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle (used by the cropper + hooks)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    {
      name: 'heroes',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Hero Item', plural: 'Hero Items' },

      fields: [
        {
          name: 'heroMediaType',
          type: 'select',
          required: true,
          defaultValue: 'image',
          label: 'Hero Media Type',
          options: [
            {
              label: 'none',
              value: 'none',
            },
            {
              label: 'Image',
              value: 'image',
            },

            {
              label: 'Video / Animation Asset',
              value: 'video',
            },
          ],
          admin: {
            description:
              'Choose Image to upload a cropped hero image. Choose Video / Animation Asset to use a file from public/assets/videos by entering the file name below.',
          },
        },

        ...heroImageFields,

        {
          name: 'videoAssetName',
          type: 'text',
          required: false,
          label: 'Video / Animation Asset File Name',
          maxLength: VIDEO_ASSET_NAME_MAX,
          validate: validateShortText(
            'Video / Animation Asset File Name',
            VIDEO_ASSET_NAME_MAX,
            false,
          ),
          admin: {
            condition: (_data, siblingData) => siblingData?.heroMediaType === 'video',
            description:
              'Enter the exact file name from public/assets/videos, including extension. Example: hero-video.mp4, hero-animation.webm, hero-lottie.json, hero-animation.lottie. The frontend will load it from /assets/videos/{fileName}.',
          },
        },

        // ===== Heading 1 (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'heading1',
              type: 'text',
              required: true,
              label: 'Heading 1',
              maxLength: TITLE_MAX,
              validate: validateShortText('Heading 1', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Heading 1 (English). Max ${TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading1Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 1)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 1)',
                'heading1',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 1. Max ${HIGHLIGHT_MAX}.`,
              },
            },
          ],
        },

        // ===== Heading 2 (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'heading2',
              type: 'text',
              required: false,
              label: 'Heading 2',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 2', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `Heading 2 (English). Max ${SUB_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading2Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 2)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 2)',
                'heading2',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 2. Max ${HIGHLIGHT_MAX}.`,
              },
            },
          ],
        },

        // ===== Heading 3 (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'heading3',
              type: 'text',
              required: false,
              label: 'Heading 3',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 3', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `Heading 3 (English). Max ${SUB_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading3Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 3)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 3)',
                'heading3',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 3. Max ${HIGHLIGHT_MAX}.`,
              },
            },
          ],
        },

        // ===== Description (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              admin: {
                width: '100%',
                description: ``,
              },
            },
          ],
        },

        // ===== Web Solutions We Provide =====
        {
          name: 'webSolutionsWeProvide',
          type: 'array',
          required: false,
          minRows: 0,
          maxRows: 10,
          label: 'Web Solutions We Provide',
          labels: {
            singular: 'Web Solution',
            plural: 'Web Solutions',
          },
          admin: {
            description:
              'Add short service/solution labels that will appear in the hero section, such as Web Design, Web Development, E-Commerce, SEO Optimization, CMS Development, UI/UX Design, or Maintenance Support. You can optionally link each solution to an internal page or a specific section on that page.',
          },
          fields: [
            {
              name: 'solution',
              type: 'text',
              required: true,
              label: 'Solution Name',
              maxLength: WEB_SOLUTION_MAX,
              validate: validateShortText('Solution Name', WEB_SOLUTION_MAX, true),
              admin: {
                description: `Enter one short web solution/service name. Max ${WEB_SOLUTION_MAX} characters.`,
              },
            },

            {
              type: 'row',
              fields: [
                {
                  name: 'buttonLink',
                  label: 'Link to (internal page)',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: false,
                  admin: {
                    width: '50%',
                    description:
                      'Optional. Pick an internal page to link this web solution chip to. External URLs are not allowed.',
                  },
                },
                {
                  name: 'sectionId',
                  type: 'text',
                  label: 'Section ID (anchor)',
                  required: false,
                  admin: {
                    width: '50%',
                    description:
                      'Optional. Used for direct jump links to a section on the selected page. Example: "service-section". No spaces. Use "-" to separate words.',
                  },
                  validate: validateSectionIdOptional,
                },
              ],
            },
          ],
        },

        CtaButtonsField({ maxRows: 2 }),
      ],
    },
  ],
}

export default BasicHeroSchema
