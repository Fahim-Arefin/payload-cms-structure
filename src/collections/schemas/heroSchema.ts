// src/schemas/partials/heroSchema.ts
import type { Field } from 'payload'

/**
 * Reusable Hero schema (title, subtitle, description, up to 5 images).
 * Use this inside any page/global as a group field.
 */
export const makeHeroSchema = (name: string, label: string): Field => ({
  type: 'group',
  name,
  label,
  admin: {
    description: 'Hero area content',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'subtitle', type: 'text' },
    { name: 'description', type: 'textarea' },

    {
      name: 'images',
      label: 'Images',
      type: 'array',
      minRows: 1,
      maxRows: 5, // ✅ limit to 5 images
      labels: { singular: 'Image', plural: 'Images' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // your existing Media collection
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          admin: { description: 'Optional alt text' },
        },
      ],
    },
  ],
})
