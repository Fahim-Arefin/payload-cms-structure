import type { Field, PayloadRequest } from 'payload'
import { BASIC_HERO_SLUG_AND_TAG } from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  HERO_VIDEO_DESCRIPTION,
  HERO_VIDEO_MAX_BYTES,
  HERO_VIDEO_MIME_TYPES,
  validateHeroVideoFile,
} from './videoUpload'

const heroImageFields = generateArrayImageFields({
  required: false,
  fieldName: 'image',
  label: 'Hero Image',
  description:
    'Upload & crop an 1:1 hero image. This field is used only when Hero Media Type is set to Image.',
  aspectRatio: 1 / 1,
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

export const backgroundFields: Field[] = [
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
        label: 'Video',
        value: 'video',
      },
    ],
    admin: {
      description:
        'Choose Image to upload a cropped hero image, or Video to upload an MP4 or WebM video (maximum 10 MB; recommended ratio 1:1).',
    },
  },

  ...heroImageFields,

  {
    name: 'video',
    type: 'upload',
    relationTo: 'media',
    required: false,
    label: 'Hero Video',
    filterOptions: {
      and: [
        { mimeType: { in: HERO_VIDEO_MIME_TYPES } },
        { filesize: { less_than_equal: HERO_VIDEO_MAX_BYTES } },
      ],
    },
    validate: async (value: unknown, { req }: { req: PayloadRequest }) => {
      if (!value) return true
      try {
        const id = typeof value === 'object' && 'id' in value ? value.id : value
        const media = await req.payload.findByID({
          collection: 'media',
          id: String(id),
          depth: 0,
          req,
        })
        return validateHeroVideoFile(media.mimeType, media.filesize)
      } catch {
        return 'The selected video is missing. Please upload it again.'
      }
    },
    admin: {
      condition: (_data, siblingData) => siblingData?.heroMediaType === 'video',
      description: HERO_VIDEO_DESCRIPTION,
    },
  },
  {
    // Preserve existing published asset references until a video is uploaded.
    name: 'videoAssetName',
    type: 'text',
    admin: { hidden: true },
  },
]
