import {
  ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
  ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
  ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
  AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
  AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
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
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
      mediaFields: ['bgImage'],
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
      mediaFields: ['image'], // background image on the block row
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
      mediaFields: ['licensedImage', 'launchedImage'],
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
      mediaFields: ['image'], // section main image on the block row
    },
    {
      layoutKey: 'layout',
      blockType: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
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
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
      arrayKey: 'values',
      mediaFields: ['image', 'hoverImage'], // icons inside the array items
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
      arrayKey: 'cards',
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
      arrayKey: 'stats',
      mediaFields: ['icon'], // icon inside stats[]
      itemLabelField: 'label',
    },
    {
      layoutKey: 'layout',
      blockType: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
      arrayKey: 'cards',
      mediaFields: ['image'],
      itemLabelField: 'title',
    },
    {
      layoutKey: 'layout',
      blockType: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
      arrayKey: 'items',
      mediaFields: ['icon'],
      itemLabelField: 'title',
    },
    {
      layoutKey: 'layout',
      blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
      arrayKey: 'audienceCards',
      mediaFields: ['image'],
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
    {
      layoutKey: 'layout',
      blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
      groupKey: 'expectations',
      arrayKey: 'left',
      mediaFields: ['icon'],
    },
    {
      layoutKey: 'layout',
      blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
      groupKey: 'expectations',
      arrayKey: 'right',
      mediaFields: ['avatar'],
    },
  ],

  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
})
