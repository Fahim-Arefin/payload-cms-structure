import {
  HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
  HOME_PAGE_HERO_SLUG_AND_TAG,
  HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
  HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
  HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
  PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
} from '@/lib/constants'
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
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
      mediaFields: ['backgroundImage1', 'backgroundImage2'],
    },
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
      mediaFields: ['thumbnail'],
    },
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
      mediaFields: ['backgroundImage'],
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
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
      arrayKey: 'plans',
      mediaFields: ['icon', 'image'],
      itemLabelField: 'title', // (optional) better alt names
    },
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
      arrayKey: 'sections',
      mediaFields: ['mainImage'],
    },
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
      arrayKey: 'gallery',
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
      arrayKey: 'cards',
      mediaFields: ['bgImage'],
    },
  ],

  // Blocks with nested array (media that inside another array) that contain media fields
  blockGroupFields: [
    // sections[].insuranceCardData[] has a media field: image
    {
      layoutKey: 'layout',
      blockType: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
      groupKey: 'sections',
      arrayKey: 'insuranceCardData',
      mediaFields: ['image'],
    },
  ],

  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
})
