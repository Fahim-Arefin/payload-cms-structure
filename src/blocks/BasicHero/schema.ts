import { bnNum } from './../../lib/utils'
// with localization
import type { Block } from 'payload'

import {
  HERO_BLOCKS,
  BASIC_HERO_BLOCK_LABEL,
  BASIC_HERO_BLOCK_THUMBNAIL_URL,
  BASIC_HERO_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  validateHighlightedInField,
  validateSectionIdOptional,
  validateShortText,
} from '@/utils/block'

const TITLE_MAX = 40
const SUB_TITLE_MAX = 40
const HIGHLIGHT_MAX = 40
const BUTTON_LABEL_MAX = 40

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
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Hero Image',
          description: 'Upload & crop a 16:9 hero image.',
          aspectRatio: 16 / 9,
          quality: 0.9,
          maxKB: 700, // UI hint only; server accepts big files now
          ownerCollection: BASIC_HERO_SLUG_AND_TAG as any, // pass through to cropper
        } as any),

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

        {
          name: 'exploreMoreBadge',
          type: 'checkbox',
          label: 'Show Explore More Badge',
          defaultValue: false,
          admin: {
            width: '50%',
            description: 'Show or hide the Explore More Badge',
          },
        },

        // ===== CTA Buttons (array format, exactly like the block fields) =====
        {
          name: 'ctaButtons',
          type: 'array',
          required: false,
          minRows: 0,
          maxRows: 2,
          labels: { singular: 'CTA Button', plural: 'CTA Buttons' },
          fields: [
            {
              type: 'row',
              fields: [
                // EN
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Button Text',
                  maxLength: BUTTON_LABEL_MAX,
                  validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
                  admin: { width: '50%', description: `Max ${BUTTON_LABEL_MAX} characters.` },
                },
                {
                  name: 'style',
                  type: 'select',
                  label: 'Button Style',
                  options: [
                    { label: 'Button 01', value: 'btn01' },
                    { label: 'Button 02', value: 'btn02' },
                    { label: 'Button 03', value: 'btn03' },
                  ],
                  defaultValue: 'btn01',
                  admin: {
                    width: '50%',
                    description: 'Select the button style',
                  },
                },
              ],
            },

            {
              type: 'row',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'buttonLink',
                      label: 'Link to (internal page)',
                      type: 'relationship',
                      relationTo: 'pages',
                      required: true,
                      admin: {
                        width: '50%',
                        description:
                          'Pick an internal Page to link to. External URLs are not allowed. Do not select this same page.',
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
                          'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
                      },
                      validate: validateSectionIdOptional,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default BasicHeroSchema
