import type { Block } from 'payload'

import {
  ABOUT_US,
  EMPLOYEE_BLOCK_LABEL,
  EMPLOYEE_BLOCK_THUMBNAIL_URL,
  EMPLOYEE_SLUG_AND_TAG,
} from '@/lib/constants'

import { validateShortText } from '@/utils/block/fields-validation'
import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

const TAG_MAX = 40
const HEADING_MAX = 90

const EMPLOYEE_NAME_MAX = 80
const EMPLOYEE_DESIGNATION_MAX = 120

const EmployeeSchema: Block = {
  slug: EMPLOYEE_SLUG_AND_TAG,

  labels: {
    singular: EMPLOYEE_BLOCK_LABEL,
    plural: EMPLOYEE_BLOCK_LABEL,
  },

  admin: {
    group: ABOUT_US,
  },

  imageURL: EMPLOYEE_BLOCK_THUMBNAIL_URL,
  imageAltText: `${EMPLOYEE_BLOCK_LABEL} preview`,

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
      name: 'employeeGroup',
      type: 'group',
      label: 'Employees',
      admin: {
        description: 'Add employee profile cards with name, designation and image.',
      },
      fields: [
        {
          name: 'employees',
          type: 'array',
          label: 'Employees',
          required: true,
          minRows: 1,
          maxRows: 12,
          labels: {
            singular: 'Employee',
            plural: 'Employees',
          },
          admin: {
            description: 'Add up to 12 employees.',
          },
          fields: [
            ...generateArrayImageFields({
              fieldName: 'employeeImage',
              label: 'Employee Image',
              description: 'Upload employee image. Recommended portrait image. Aspect ratio 1:1.',
              aspectRatio: 1 / 1,
              quality: 0.9,
              maxKB: 400,
              required: true,
              ownerCollection: EMPLOYEE_SLUG_AND_TAG as any,
            } as any),

            {
              name: 'employeeName',
              type: 'text',
              label: 'Employee Name',
              required: true,
              maxLength: EMPLOYEE_NAME_MAX,
              validate: validateShortText('Employee Name', EMPLOYEE_NAME_MAX, true),
              admin: {
                description: `Employee name. Max ${EMPLOYEE_NAME_MAX} characters.`,
              },
            },

            {
              name: 'designation',
              type: 'text',
              label: 'Designation',
              required: true,
              maxLength: EMPLOYEE_DESIGNATION_MAX,
              validate: validateShortText('Employee Designation', EMPLOYEE_DESIGNATION_MAX, true),
              admin: {
                description: `Employee designation. Max ${EMPLOYEE_DESIGNATION_MAX} characters.`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default EmployeeSchema
