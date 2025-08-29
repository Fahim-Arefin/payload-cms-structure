import type { Field } from 'payload'

export const planCardSectionSchema: Field = {
  type: 'group',
  name: 'OnYourTermsSchema',
  label: 'Home Plan Card Section',
  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: true,
        },
        {
          name: 'mobileIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Mobile Icon',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Mobile Image',
        },
        {
          name: 'link',
          type: 'text',
          label: 'Link',
          required: true,
        },
      ],
    },
  ],
}
