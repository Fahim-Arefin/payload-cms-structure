import type { Block } from 'payload'

import {
  CODING_LANGUAGE_BLOCK_LABEL,
  CODING_LANGUAGE_BLOCK_THUMBNAIL_URL,
  CODING_LANGUAGE_SLUG_AND_TAG,
  HOME_PAGE,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const CodingLanguageSchema: Block = {
  slug: CODING_LANGUAGE_SLUG_AND_TAG,
  labels: {
    singular: CODING_LANGUAGE_BLOCK_LABEL,
    plural: CODING_LANGUAGE_BLOCK_LABEL,
  },

  admin: { group: HOME_PAGE },

  imageURL: CODING_LANGUAGE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CODING_LANGUAGE_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    {
      name: 'sectionSettings',
      type: 'group',
      label: 'Section Settings',
      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-1',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Main intro heading, highlighted text, description and optional CTA.',
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
      name: 'languageImages',
      type: 'group',
      label: 'Language Images',
      admin: {
        description:
          'Add coding language logo images. Each item has a transparent colored version and a white-2 version.',
      },
      fields: [
        {
          name: 'languages',
          type: 'array',
          label: 'Languages',
          required: true,
          minRows: 1,
          maxRows: 20,
          labels: {
            singular: 'Language',
            plural: 'Languages',
          },
          admin: {
            description:
              'Add language logo pairs. Upload both transparent normal and colored images for each language.',
          },
          fields: [
            ...generateArrayImageFields({
              fieldName: 'transparentNormalImage',
              label: 'Transparent Normal Image',
              description:
                'Upload the normal version of the language logo. Recommended square/SVG-like transparent PNG.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 250,
              required: true,
              ownerCollection: CODING_LANGUAGE_SLUG_AND_TAG as any,
            } as any),

            ...generateArrayImageFields({
              fieldName: 'transparentColoredImage',
              label: 'Transparent Colored Image',
              description:
                'Upload the transparent colored version of the language logo. Recommended square/SVG-like transparent PNG.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 250,
              required: true,
              ownerCollection: CODING_LANGUAGE_SLUG_AND_TAG as any,
            } as any),
          ],
        },
      ],
    },
  ],
}

export default CodingLanguageSchema
