import type { Block } from 'payload'

import {
  HERO_BLOCKS,
  HOME_INTRO_LOADER_BLOCK_LABEL,
  HOME_INTRO_LOADER_BLOCK_THUMBNAIL_URL,
  HOME_INTRO_LOADER_SLUG_AND_TAG,
} from '@/lib/constants'

const HomeIntroLoaderSchema: Block = {
  slug: HOME_INTRO_LOADER_SLUG_AND_TAG,

  labels: {
    singular: HOME_INTRO_LOADER_BLOCK_LABEL,
    plural: HOME_INTRO_LOADER_BLOCK_LABEL,
  },

  admin: {
    group: HERO_BLOCKS,
  },

  imageURL: HOME_INTRO_LOADER_BLOCK_THUMBNAIL_URL,

  imageAltText: `${HOME_INTRO_LOADER_BLOCK_LABEL} preview`,

  fields: [
    {
      name: 'showIntroLoader',
      type: 'checkbox',
      label: 'Enable Home Intro Loader',
      defaultValue: true,
      admin: {
        description:
          'Enable this checkbox to show the animated XynoLab intro once to first-time visitors.',
      },
    },
  ],
}

export default HomeIntroLoaderSchema
