import { roleAtLeast } from '@/lib/rbac'
import type { CollectionConfig } from 'payload'

export const Resume: CollectionConfig = {
  slug: 'resume',
  access: {
    read: () => true, // public read
    create: ({ req }) => roleAtLeast(req.user, 'editor'),
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
    delete: ({ req }) => roleAtLeast(req.user, 'editor'),
  },
  // admin: {
  //   group: MEDIA,
  // },
  fields: [],
  upload: {
    staticDir: 'resumes',
    mimeTypes: ['application/pdf', 'application/msword'],
  },
}
