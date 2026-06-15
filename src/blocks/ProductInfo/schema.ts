import type { Block } from 'payload'

import {
  HOME_PAGE,
  PRODUCT_INFO_BLOCK_LABEL,
  PRODUCT_INFO_BLOCK_THUMBNAIL_URL,
  PRODUCT_INFO_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'

const PRODUCT_TITLE_MAX = 80
const PRODUCT_TAG_MAX = 40
const TAG_MAX = 40
const HEADING_MAX = 90

const internalLinkFields = [
  {
    type: 'row' as const,
    fields: [
      {
        name: 'buttonLink',
        label: 'Link to (internal page)',
        type: 'relationship' as const,
        relationTo: 'pages' as const,
        required: false,
        admin: {
          width: '50%',
          description:
            'Pick an internal Page to link to. External URLs are not allowed. Do not select this same page.',
        },
      },
      {
        name: 'sectionId',
        type: 'text' as const,
        label: 'Section ID (anchor)',
        required: false,
        admin: {
          width: '50%',
          description:
            'Used for direct jump links to this section. No spaces. Use "-" to separate words.',
        },
        validate: validateSectionIdOptional,
      },
    ],
  },
]

const ProductInfoSchema: Block = {
  slug: PRODUCT_INFO_SLUG_AND_TAG,

  labels: {
    singular: PRODUCT_INFO_BLOCK_LABEL,
    plural: PRODUCT_INFO_BLOCK_LABEL,
  },

  admin: {
    group: HOME_PAGE,
  },

  imageURL: PRODUCT_INFO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${PRODUCT_INFO_BLOCK_LABEL} preview`,

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
        description: 'Main intro heading, highlighted text, description.',
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
      name: 'productInfo',
      type: 'group',
      label: 'Product Info',
      admin: {
        description: 'Add product info cards with product-level and tag-level internal links.',
      },
      fields: [
        {
          name: 'products',
          type: 'array',
          label: 'Products',
          required: true,
          minRows: 1,
          maxRows: 6,
          labels: {
            singular: 'Product',
            plural: 'Products',
          },
          admin: {
            description: 'Maximum 6 products.',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Product Title',
              required: true,
              maxLength: PRODUCT_TITLE_MAX,
              validate: validateShortText('Product Title', PRODUCT_TITLE_MAX, true),
              admin: {
                description: `Product title. Max ${PRODUCT_TITLE_MAX} characters.`,
              },
            },

            ...internalLinkFields,

            {
              name: 'productTags',
              type: 'array',
              label: 'Product Tags',
              required: false,
              minRows: 0,
              maxRows: 12,
              labels: {
                singular: 'Product Tag',
                plural: 'Product Tags',
              },
              admin: {
                description:
                  'Add tags for this product. Each tag can also link to an internal page/section.',
              },
              fields: [
                {
                  name: 'tag',
                  type: 'text',
                  label: 'Tag',
                  required: true,
                  maxLength: PRODUCT_TAG_MAX,
                  validate: validateShortText('Product Tag', PRODUCT_TAG_MAX, true),
                  admin: {
                    description: `Product tag text. Max ${PRODUCT_TAG_MAX} characters.`,
                  },
                },

                ...internalLinkFields,
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default ProductInfoSchema
