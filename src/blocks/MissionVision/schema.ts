import type { Block } from 'payload'

import {
  ABOUT_US,
  MISSION_VISION_BLOCK_LABEL,
  MISSION_VISION_BLOCK_THUMBNAIL_URL,
  MISSION_VISION_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'

/* ---------- limits ---------- */
const TAG_MAX = 40
const HEADING_MAX = 90

const MissionVisionSchema: Block = {
  slug: MISSION_VISION_SLUG_AND_TAG,
  labels: {
    singular: MISSION_VISION_BLOCK_LABEL,
    plural: MISSION_VISION_BLOCK_LABEL,
  },

  admin: { group: ABOUT_US },

  imageURL: MISSION_VISION_BLOCK_THUMBNAIL_URL,
  imageAltText: `${MISSION_VISION_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

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

    // ===== Mission (label + description) =====
    {
      type: 'row',
      fields: [
        {
          name: 'missionLabel',
          type: 'text',
          required: true,
          label: 'Mission Label',
          maxLength: HEADING_MAX,
          validate: validateShortText('Mission Label', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `Short label/title for Mission. Max ${HEADING_MAX} characters.`,
          },
        },
        {
          name: 'visionLabel',
          type: 'text',
          required: true,
          label: 'Vision Label',
          maxLength: HEADING_MAX,
          validate: validateShortText('Vision Label', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `Short label/title for Vision. Max ${HEADING_MAX} characters.`,
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'missionDescription',
          type: 'richText',
          required: true,
          label: 'Mission Description',
          admin: {
            width: '50%',
            description: 'Mission description (you can add multiple paragraphs).',
          },
        },
        {
          name: 'visionDescription',
          type: 'richText',
          required: true,
          label: 'Vision Description',
          admin: {
            width: '50%',
            description: 'Vision description (you can add multiple paragraphs).',
          },
        },
      ],
    },

    {
      name: 'showPatternDesign',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default MissionVisionSchema
