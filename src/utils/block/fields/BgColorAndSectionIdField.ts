import type { Field } from 'payload'

import { validateHexColor, validateSectionIdOptional } from '@/utils/block/fields-validation'

type Props = {
  backgroundFieldName?: string // default: "backgroundColor"
  sectionIdFieldName?: string // default: "sectionId"
  defaultBackground?: string // default: "#E7E7EE"
  labelBg?: string // default: "Section Background Color"
  labelSectionId?: string // default: "Section ID (anchor)"
  hexLen?: number // default: 7
}

export const BgColorAndSectionIdField = ({
  backgroundFieldName = 'backgroundColor',
  sectionIdFieldName = 'sectionId',
  defaultBackground = '#E7E7EE',
  labelBg = 'Section Background Color',
  labelSectionId = 'Section ID (anchor)',
  hexLen = 7,
}: Props = {}): Field => {
  return {
    type: 'row',
    fields: [
      {
        name: backgroundFieldName,
        type: 'text',
        label: labelBg,
        maxLength: hexLen,
        validate: validateHexColor,
        defaultValue: defaultBackground,
        admin: {
          width: '50%',
          description: `Hex color in #RRGGBB (e.g., ${defaultBackground}). Length ${hexLen}.`,
        },
      },
      {
        name: sectionIdFieldName,
        type: 'text',
        label: labelSectionId,
        required: false,
        validate: validateSectionIdOptional,
        admin: {
          width: '50%',
          description:
            'Used for direct jump links to this section (e.g., "blog-section"). No spaces. Use "-" to separate words.',
        },
      },
    ],
  }
}
