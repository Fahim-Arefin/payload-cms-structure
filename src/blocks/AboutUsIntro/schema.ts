import type { Block } from 'payload'

import {
  ABOUT_US,
  ABOUT_US_INTRO_BLOCK_LABEL,
  ABOUT_US_INTRO_BLOCK_THUMBNAIL_URL,
  ABOUT_US_INTRO_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { validateAbsoluteHTTPUrl, validateShortText } from '@/utils/block/fields-validation'
import { generateImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const MAIN_DESCRIPTION_MAX = 700
const SECONDARY_DESCRIPTION_MAX = 500
const YOUTUBE_EMBED_URL_MAX = 300

const AboutUsIntroSchema: Block = {
  slug: ABOUT_US_INTRO_SLUG_AND_TAG,

  labels: {
    singular: ABOUT_US_INTRO_BLOCK_LABEL,
    plural: ABOUT_US_INTRO_BLOCK_LABEL,
  },

  admin: {
    group: ABOUT_US,
  },

  imageURL: ABOUT_US_INTRO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${ABOUT_US_INTRO_BLOCK_LABEL} preview`,

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
          defaultBackground: 'white-3',
        }),
      ],
    },

    {
      name: 'companyInfo',
      type: 'group',
      label: 'Company Info',
      admin: {
        description:
          'About Us intro content with tag, main description, secondary description, thumbnail image and optional YouTube embed link.',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          label: 'Tag',
          required: true,
          maxLength: TAG_MAX,
          validate: validateShortText('Tag', TAG_MAX, true),
          admin: {
            description: `Example: About Our Studio. Max ${TAG_MAX} characters.`,
          },
        },

        {
          name: 'mainDescription',
          type: 'textarea',
          label: 'Main Description',
          required: true,
          maxLength: MAIN_DESCRIPTION_MAX,
          validate: validateShortText('Main Description', MAIN_DESCRIPTION_MAX, true),
          admin: {
            description: `Large intro description shown on the left. Max ${MAIN_DESCRIPTION_MAX} characters.`,
          },
        },

        {
          name: 'secondaryDescription',
          type: 'textarea',
          label: 'Secondary Description',
          required: true,
          maxLength: SECONDARY_DESCRIPTION_MAX,
          validate: validateShortText('Secondary Description', SECONDARY_DESCRIPTION_MAX, true),
          admin: {
            description: `Smaller supporting description shown on the right. Max ${SECONDARY_DESCRIPTION_MAX} characters.`,
          },
        },

        ...generateImageFields({
          fieldName: 'thumbnailImage',
          label: 'Thumbnail Image',
          description:
            'Upload About Us intro thumbnail image. Recommended wide image. Aspect ratio 1200:425.',
          aspectRatio: 1200 / 425,
          quality: 0.9,
          maxKB: 700,
          required: true,
          ownerCollection: ABOUT_US_INTRO_SLUG_AND_TAG as any,
        } as any),

        {
          name: 'youtubeEmbedLink',
          type: 'text',
          label: 'YouTube Embed Link',
          required: false,
          maxLength: YOUTUBE_EMBED_URL_MAX,
          validate: validateAbsoluteHTTPUrl(YOUTUBE_EMBED_URL_MAX, false),
          admin: {
            description:
              'Optional YouTube embed URL. Example: https://www.youtube.com/embed/VIDEO_ID',
          },
        },
      ],
    },
  ],
}

export default AboutUsIntroSchema
