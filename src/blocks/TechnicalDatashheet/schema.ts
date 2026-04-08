import type { Block } from 'payload'

import {
  COMMON,
  TECHNICAL_DATASHHEET_CARD_BLOCK_LABEL,
  TECHNICAL_DATASHHEET_CARD_BLOCK_THUMBNAIL_URL,
  TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const TITLE_MAX = 120

const allowedMimeTypes = [
  'application/pdf',
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'text/csv', // optional, keep if you also want csv
]

const TechnicalDatasheetSchema: Block = {
  slug: TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG,
  labels: {
    singular: TECHNICAL_DATASHHEET_CARD_BLOCK_LABEL,
    plural: TECHNICAL_DATASHHEET_CARD_BLOCK_LABEL,
  },

  admin: { group: COMMON },

  imageURL: TECHNICAL_DATASHHEET_CARD_BLOCK_THUMBNAIL_URL,
  imageAltText: `${TECHNICAL_DATASHHEET_CARD_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // BgColorAndSectionIdField({ defaultBackground: '#E7E7EE' }),
    BgColorAndSectionIdField({ defaultBackground: 'white-2' }),

    ...SectionHeadingFields({
      tagMax: TAG_MAX,
      heading1Max: HEADING_MAX,
      heading1HighlightMax: HEADING_MAX,
      heading2Max: HEADING_MAX,
      heading2HighlightMax: HEADING_MAX,
      heading3Max: HEADING_MAX,
      heading3HighlightMax: HEADING_MAX,
      ctaMaxRows: 1,
      // noCTA: true,
    }),

    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
          validate: validateShortText('Title', TITLE_MAX, true),
          admin: {
            description: `Maximum ${TITLE_MAX} characters.`,
            width: '50%',
          },
        },
        {
          name: 'datasheetFile',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'PDF / Excel Sheet',
          filterOptions: {
            mimeType: {
              in: allowedMimeTypes,
            },
          },
          validate: async (val: any, { req }: any) => {
            if (!val) return 'PDF or Excel file is required.'

            const id =
              typeof val === 'string'
                ? val
                : typeof val === 'object'
                  ? val?.id || val?.value?.id || val?.value
                  : null

            if (!id) return 'Invalid file selected.'

            try {
              const mediaDoc = await req.payload.findByID({
                collection: 'media',
                id: String(id),
              })

              if (!allowedMimeTypes.includes(mediaDoc?.mimeType)) {
                return 'Only PDF, XLS, XLSX, or CSV files are allowed.'
              }

              return true
            } catch {
              return 'Selected file could not be verified.'
            }
          },
          admin: {
            description: 'Upload a PDF, XLS, XLSX, or CSV file.',
            width: '50%',
          },
        },
      ],
    },
  ],
}

export default TechnicalDatasheetSchema
