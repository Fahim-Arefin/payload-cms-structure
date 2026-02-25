import type { Block } from 'payload'

import {
  HERO_BLOCKS,
  PRODUCT_HERO_BLOCK_LABEL,
  PRODUCT_HERO_BLOCK_THUMBNAIL_URL,
  PRODUCT_HERO_SLUG_AND_TAG,
} from '@/lib/constants'
import { validateHighlightedInField, validateShortText } from '@/utils/block'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const TITLE_MAX = 40
const SUB_TITLE_MAX = 40
const HIGHLIGHT_MAX = 40

const ProductHeroSchema: Block = {
  slug: PRODUCT_HERO_SLUG_AND_TAG,
  labels: {
    singular: PRODUCT_HERO_BLOCK_LABEL,
    plural: PRODUCT_HERO_BLOCK_LABEL,
  },

  admin: {
    group: HERO_BLOCKS,
  },

  imageURL: PRODUCT_HERO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PRODUCT_HERO_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle (used by the cropper + hooks)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    {
      name: 'heroes',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 1,
      labels: { singular: 'Hero Item', plural: 'Hero Items' },

      fields: [
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Hero Image',
          description: 'Upload & crop a 16:9 hero image.',
          aspectRatio: 16 / 9,
          quality: 0.9,
          maxKB: 700, // UI hint only; server accepts big files now
          ownerCollection: PRODUCT_HERO_SLUG_AND_TAG as any, // pass through to cropper
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

        // --- Product quick features (below “Explore More”) ---
        {
          name: 'productHighlights',
          type: 'array',
          label: 'Product Highlights',
          required: false,
          minRows: 1,
          maxRows: 4,
          labels: { singular: 'Highlight', plural: 'Highlights' },
          admin: {
            description:
              'Shown as small spec items below the hero (e.g., DIAMETER RANGE, DENSITY, ISO).',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: 'Value',
                  admin: {
                    width: '50%',
                    description: 'Main value text (e.g., "0.8-2.0 mm", "~0.924 g/cm³", "ISO").',
                  },
                },
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                  admin: {
                    width: '50%',
                    description:
                      'Supporting label (e.g., "DIAMETER RANGE", "DENSITY (FULLY BUOYANT)", "9001:2015 CERTIFIED").',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default ProductHeroSchema
