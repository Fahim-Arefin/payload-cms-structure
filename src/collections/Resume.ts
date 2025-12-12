import { MEDIA } from '@/lib/constants'
import type { CollectionConfig } from 'payload'

export const Resume: CollectionConfig = {
  slug: 'resume',
  access: {
    read: () => true,
    create: () => true,
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
