import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  CAREER_PAGE_PROCESSING_BLOCK_LABEL,
  CAREER_PAGE_PROCESSING_BLOCK_THUMBNAIL_URL,
  CAREER_PAGE_PROCESSING_SLUG_AND_TAG,
} from '@/lib/constants'

// ----- limits -----
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const CARD_TITLE_MAX = 60

// image size: w-186px x h-157px → aspect ratio:
const PROCESS_IMG_ASPECT = 186 / 157 // ≈ 1.1847

// ----- validators -----
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

// ----- block -----
const CareerProcessingSchema: Block = {
  slug: CAREER_PAGE_PROCESSING_SLUG_AND_TAG,
  labels: {
    singular: CAREER_PAGE_PROCESSING_BLOCK_LABEL,
    plural: CAREER_PAGE_PROCESSING_BLOCK_LABEL,
  },

  imageURL: CAREER_PAGE_PROCESSING_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CAREER_PAGE_PROCESSING_BLOCK_LABEL} preview`,

  fields: [
    // Title (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary headline. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Subtitle (EN/BN)
    {
      type: 'row',
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Supporting line. Max ${SUBTITLE_MAX} characters.`,
          },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Processing cards
    {
      name: 'processingCards',
      type: 'array',
      label: 'Processing Cards',
      required: true,
      minRows: 2, // at least two steps feels right for a process
      maxRows: 8,
      labels: { singular: 'Processing Card', plural: 'Processing Cards' },
      admin: {
        description:
          'Add 2–8 processing steps. Each has a title (EN/BN) and an image (186×157 ratio).',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Card Title',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Short step label. Max ${CARD_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'কার্ড শিরোনাম (বাংলা)',
              maxLength: CARD_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', CARD_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `ধাপের ছোট শিরোনাম। সর্বোচ্চ ${bnNum(CARD_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Image: use cropper generator with the exact aspect ratio (186/157)
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Card Image (186×157 ratio)',
          description:
            'Upload & crop to match 186×157 ratio (≈1.1847). UI target size w-186px h-157px.',
          aspectRatio: PROCESS_IMG_ASPECT,
          quality: 0.92,
          maxKB: 250,
          ownerCollection: CAREER_PAGE_PROCESSING_SLUG_AND_TAG as any,
        } as any),
      ],
    },
  ],
}

export default CareerProcessingSchema
