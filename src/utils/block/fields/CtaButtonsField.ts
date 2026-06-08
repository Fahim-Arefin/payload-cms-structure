import type { Field } from 'payload'
import { validateSectionIdOptional, validateShortText } from '../fields-validation'

export const CTA_BUTTON_LABEL_MAX = 40

type Options = {
  name?: string
  label?: string
  maxRows?: number
  minRows?: number
  required?: boolean
}

export const CtaButtonsField = ({
  name = 'ctaButtons',
  label = 'Section CTA Buttons',
  minRows = 0,
  maxRows = 2,
  required = false,
}: Options = {}): Field => {
  return {
    name,
    type: 'array',
    required,
    minRows,
    maxRows,
    label,
    labels: { singular: 'CTA Button', plural: 'CTA Buttons' },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'label',
            type: 'text',
            required: true,
            label: 'Button Text',
            maxLength: CTA_BUTTON_LABEL_MAX,
            validate: validateShortText('Button Text', CTA_BUTTON_LABEL_MAX, true),
            admin: { width: '50%', description: `Max ${CTA_BUTTON_LABEL_MAX} characters.` },
          },
          {
            name: 'style',
            type: 'select',
            label: 'Button Style',
            options: [
              { label: 'Button 01', value: 'btn01' },
              { label: 'Button 02', value: 'btn02' },
            ],
            defaultValue: 'btn01',
            admin: {
              width: '50%',
              description: 'Select the button style',
            },
          },
        ],
      },

      {
        type: 'row',
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'buttonLink',
                label: 'Link to (internal page)',
                type: 'relationship',
                relationTo: 'pages',
                required: true,
                admin: {
                  width: '50%',
                  description:
                    'Pick an internal Page to link to. External URLs are not allowed. Do not select this same page.',
                },
              },
              {
                name: 'sectionId',
                type: 'text',
                label: 'Section ID (anchor)',
                required: false,
                admin: {
                  width: '50%',
                  description:
                    'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
                },
                validate: validateSectionIdOptional,
              },
            ],
          },
        ],
      },
    ],
  }
}
