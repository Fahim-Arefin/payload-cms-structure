import type { Block } from 'payload'

import {
  INTRO_HERO_BLOCK_LABEL,
  INTRO_HERO_BLOCK_THUMBNAIL_URL,
  INTRO_HERO_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateSectionIdOptional, validateShortText } from '@/utils/block/fields-validation'

import { generateImageFields } from '@/utils/media/fieldGenerators'

const TITLE_MAX = 80
const SUBTITLE_MAX = 180

const VIDEO_MAX_BYTES = 10 * 1024 * 1024

/* =========================================================
   THUMBNAIL

   Same aspect ratio as video:
   16 : 9
========================================================= */

const thumbnailFields = generateImageFields({
  required: true,

  fieldName: 'thumbnail',

  label: 'Video Thumbnail',

  description:
    'Upload the poster/thumbnail displayed before the hero video loads. Recommended ratio: 16:9. Recommended size: 1920×1080. WebP/JPEG preferred.',

  aspectRatio: 16 / 9,

  quality: 0.92,

  maxKB: 700,

  ownerCollection: INTRO_HERO_SLUG_AND_TAG as any,
} as any)

const groovyDesignFields = generateImageFields({
  required: false,
  fieldName: 'groovyDesign',
  label: 'Groovy Design',
  description:
    'Optional decorative overlay above the Dora light. Crop ratio: 4:3 landscape. Recommended size: 1920 x 1440 px. Upload a transparent PNG or WebP. Covers the entire hero, including its padding, with centered cropping on different screen sizes. Keep important details away from the edges.',
  aspectRatio: 4 / 3,
  quality: 0.95,
  maxKB: 1000,
  ownerCollection: INTRO_HERO_SLUG_AND_TAG,
})

/* =========================================================
   VIDEO VALIDATION

   Enforces:
   - MP4 media item
   - maximum 10 MB

   Important:
   MIME validation can verify the MP4 container, but not
   the codec inside that container.

   For Safari/iOS compatibility the uploaded MP4 should
   specifically be encoded using H.264 / AVC.
========================================================= */

const validateHeroVideo = async (value: unknown, { req }: any) => {
  if (!value) {
    return 'Hero video is required.'
  }

  try {
    let media: any = null

    /*
     * Sometimes Payload may give us the populated
     * relationship object directly.
     */
    if (
      typeof value === 'object' &&
      value !== null &&
      ('mimeType' in value || 'filesize' in value)
    ) {
      media = value
    } else {
      const mediaId =
        typeof value === 'object' && value !== null && 'id' in value ? (value as any).id : value

      if (!mediaId) {
        return 'Hero video is required.'
      }

      media = await req.payload.findByID({
        collection: 'media',

        id: mediaId,

        depth: 0,
      })
    }

    const mimeType = String(media?.mimeType ?? '').toLowerCase()

    if (mimeType !== 'video/mp4') {
      return 'Hero video must be an MP4 file. Encode it with H.264/AVC for Safari, iPhone, Chrome, Edge and Firefox compatibility.'
    }

    const fileSize = Number(media?.filesize ?? 0)

    if (fileSize > VIDEO_MAX_BYTES) {
      return 'Hero video must not exceed 10 MB.'
    }

    return true
  } catch {
    return 'Unable to validate the selected hero video.'
  }
}

/* =========================================================
   SCHEMA
========================================================= */

const IntroHeroSchema: Block = {
  slug: INTRO_HERO_SLUG_AND_TAG,

  labels: {
    singular: INTRO_HERO_BLOCK_LABEL,

    plural: INTRO_HERO_BLOCK_LABEL,
  },

  admin: {
    group: 'Hero',
  },

  imageURL: INTRO_HERO_BLOCK_THUMBNAIL_URL,

  imageAltText: `${INTRO_HERO_BLOCK_LABEL} preview`,

  fields: [
    /* =====================================================
       UPLOAD SESSION

       Same media lifecycle pattern as your existing blocks.
    ===================================================== */

    {
      name: 'uploadSessionId',

      type: 'text',

      admin: {
        condition: () => false,
      },
    },

    /* =====================================================
       SECTION SETTINGS
    ===================================================== */

    {
      name: 'sectionSettings',

      type: 'group',

      label: 'Section Settings',

      fields: [
        {
          name: 'sectionId',

          type: 'text',

          label: 'Section ID (anchor)',

          required: false,

          validate: validateSectionIdOptional,

          admin: {
            description: 'Optional section ID for direct navigation. Example: introducing.',
          },
        },
      ],
    },

    /* =====================================================
       CONTENT
    ===================================================== */

    {
      name: 'title',

      type: 'text',

      label: 'Hero Title',

      required: true,

      defaultValue: 'Introducing',

      maxLength: TITLE_MAX,

      validate: validateShortText('Hero Title', TITLE_MAX, true),

      admin: {
        description: `Example: Introducing. Max ${TITLE_MAX} characters.`,
      },
    },

    {
      name: 'subtitle',

      type: 'text',

      label: 'Hero Subtitle',

      required: true,

      defaultValue: 'The Premiumness that beholds your class.',

      maxLength: SUBTITLE_MAX,

      validate: validateShortText('Hero Subtitle', SUBTITLE_MAX, true),

      admin: {
        description: `Example: The Premiumness that beholds your class. Max ${SUBTITLE_MAX} characters.`,
      },
    },

    /* =====================================================
       VIDEO

       Required format:
       MP4

       Required encoding for maximum compatibility:
       H.264 / AVC

       Recommended:
       1920 × 1080
       16:9
       <= 10 MB
    ===================================================== */

    {
      name: 'video',

      type: 'upload',

      relationTo: 'media',

      label: 'Hero Video',

      required: true,

      filterOptions: {
        mimeType: {
          equals: 'video/mp4',
        },
      },

      validate: validateHeroVideo as any,

      admin: {
        description:
          'Upload an MP4 hero video. Ratio: 16:9. Recommended: 1920×1080, H.264/AVC encoding, no audio track, maximum 10 MB. H.264 MP4 provides the widest support including Safari and iPhone.',
      },
    },

    /* =====================================================
       VIDEO POSTER / THUMBNAIL
    ===================================================== */

    ...thumbnailFields,
    ...groovyDesignFields,
  ],
}

export default IntroHeroSchema
