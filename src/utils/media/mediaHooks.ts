import { HOME_PAGE_HERO_SLUG_AND_TAG, HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG } from '@/lib/constants'
import { withMediaLifecycle } from './withMediaLifecycle'
import { triggerMediaTemporaryPurge } from './triggerMediaTemporaryPurge'

export const mediaHooks = withMediaLifecycle({
  collectionSlug: 'pages',

  // Blocks with a media field on the block row itself:
  blockSimpleFields: [
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
      mediaFields: ['mainImage', 'sideImage'], // cropper-based fields on the block row
    },
  ],

  // Blocks with arrays that contain media fields:
  blockArrayFields: [
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_HERO_SLUG_AND_TAG,
      arrayKey: 'heroes',
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
      arrayKey: 'stats',
      mediaFields: ['icon'],
      itemLabelField: 'label', // optional, helps with alt naming
    },
  ],

  // Blocks with arrays of arrays that contain media fields:

  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
})
