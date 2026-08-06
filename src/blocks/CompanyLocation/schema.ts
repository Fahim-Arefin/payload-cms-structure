import type { Block } from 'payload'

import {
  GET_IN_TOUCH,
  LOCATION_BLOCK_LABEL,
  LOCATION_BLOCK_THUMBNAIL_URL,
  LOCATION_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateAbsoluteHTTPUrl, validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90
const LABEL_MAX = 60
const LOCATION_MAX = 180
const BUTTON_LABEL_MAX = 40
const GOOGLE_MAP_LINK_MAX = 500

const mapImageFields = generateImageFields({
  required: true,
  fieldName: 'mapImage',
  label: 'Map Image',
  description: 'Upload & crop the map preview image. Aspect Ratio: 902 / 540',
  aspectRatio: 902 / 540,
  quality: 0.9,
  maxKB: 700,
  ownerCollection: LOCATION_SLUG_AND_TAG as any,
} as any)

const LocationSchema: Block = {
  slug: LOCATION_SLUG_AND_TAG,

  labels: {
    singular: LOCATION_BLOCK_LABEL,
    plural: LOCATION_BLOCK_LABEL,
  },

  admin: {
    group: GET_IN_TOUCH,
  },

  imageURL: LOCATION_BLOCK_THUMBNAIL_URL,
  imageAltText: `${LOCATION_BLOCK_LABEL} preview`,

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
          defaultBackground: 'white-2',
        }),
      ],
    },

    {
      name: 'sectionHeading',
      type: 'group',
      label: 'Section Heading',
      admin: {
        description: 'Location section tag, heading and highlighted heading text.',
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
      name: 'locationInfo',
      type: 'group',
      label: 'Location Info',
      admin: {
        description: 'Manage office location text, Google Map link and map image.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          defaultValue: 'XynoLab HQ',
          maxLength: LABEL_MAX,
          validate: validateShortText('Location Label', LABEL_MAX, true),
          admin: {
            description: `Example: XynoLab HQ. Max ${LABEL_MAX} characters.`,
          },
        },
        {
          name: 'location',
          type: 'textarea',
          label: 'Location',
          required: true,
          defaultValue: 'Wakil Tower, 131 Gulshan Avenue, Dhaka 1212',
          maxLength: LOCATION_MAX,
          validate: validateShortText('Location', LOCATION_MAX, true),
          admin: {
            description: `Example: Wakil Tower, 131 Gulshan Avenue, Dhaka 1212. Max ${LOCATION_MAX} characters.`,
          },
        },
        {
          name: 'googleMapButtonLabel',
          type: 'text',
          label: 'Google Map Button Label',
          required: true,
          defaultValue: 'Get Directions',
          maxLength: BUTTON_LABEL_MAX,
          validate: validateShortText('Google Map Button Label', BUTTON_LABEL_MAX, true),
          admin: {
            description: `Example: Get Directions. Max ${BUTTON_LABEL_MAX} characters.`,
          },
        },
        {
          name: 'googleMapLink',
          type: 'text',
          label: 'Google Map Link',
          required: true,
          maxLength: GOOGLE_MAP_LINK_MAX,
          validate: validateAbsoluteHTTPUrl(GOOGLE_MAP_LINK_MAX, true),
          admin: {
            description: `Paste the Google Maps direction/location URL. Max ${GOOGLE_MAP_LINK_MAX} characters.`,
          },
        },
        ...mapImageFields,
      ],
    },
  ],
}

export default LocationSchema
