// with localization
import type { Block } from 'payload'

import {
  BASIC_HERO_BLOCK_LABEL,
  BASIC_HERO_BLOCK_THUMBNAIL_URL,
  BASIC_HERO_SLUG_AND_TAG,
  HERO_BLOCKS,
} from '@/lib/constants'
import { validateHighlightedInField, validateShortText } from '@/utils/block/fields-validation'

import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { CtaButtonsField } from '@/utils/block/fields/CtaButtonsField'

const TITLE_MAX = 40
const SUB_TITLE_MAX = 40
const HIGHLIGHT_MAX = 40
const WEB_SOLUTION_MAX = 40

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
              'Add short service/solution labels that will appear in the hero section, such as Web Design, Web Development, E-Commerce, SEO Optimization, CMS Development, UI/UX Design, or Maintenance Support. Keep each item short and clear.',
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
          ],
        },

        CtaButtonsField({ maxRows: 2 }),
      ],
    },
  ],
}

export default BasicHeroSchema
