import type { CollectionConfig } from 'payload'

export const Resume: CollectionConfig = {
  slug: 'resume',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [],
  upload: {
    staticDir: 'resumes',
    mimeTypes: ['application/pdf', 'application/msword'],
  },
}
