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
  AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
  CONTACT_US_BLOCK_SLUG_AND_TAG,
  CORPORATE_INFO_SLUG_AND_TAG,
  CORPORATE_PARTNERS_SLUG_AND_TAG,
  CUSTOM_CARD_SECTION_SLUG_AND_TAG,
  EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
  HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
  HOME_PAGE_HERO_SLUG_AND_TAG,
  HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
  HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
  HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_05_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_SLUG_AND_TAG,
  PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
} from '@/lib/constants'
import { triggerMediaTemporaryPurge } from './triggerMediaTemporaryPurge'
import { withMediaLifecycle } from './withMediaLifecycle'

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
    {
      // Block row media (background image)
      layoutKey: 'layout',
      blockType: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
      mediaFields: ['backgroundImage'],
    },
    {
      layoutKey: 'layout',
      blockType: CONTACT_US_BLOCK_SLUG_AND_TAG,
      mediaFields: ['image'], // generator also creates imageOriginal; our hook handles both
    },
    {
      layoutKey: 'layout',
      blockType: CORPORATE_INFO_SLUG_AND_TAG,
      mediaFields: ['image'], // generated field pair (image + imageOriginal handled internally)
    },
    {
      layoutKey: 'layout',
      blockType: EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
      // the hook already knows how to handle the *Original fields, so just list the primary names
      mediaFields: ['imageSquare', 'imageWide'],
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_SLUG_AND_TAG,
      mediaFields: ['bgImageMobile', 'bgImageDesktop'],
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
      mediaFields: ['imageTall', 'imageWide'],
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
      mediaFields: ['imageTall', 'imageWide'],
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_05_SLUG_AND_TAG,
      mediaFields: ['imageTall', 'imageWide'],
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
    {
      layoutKey: 'layout',
      blockType: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
      arrayKey: 'gallery',
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: CORPORATE_INFO_SLUG_AND_TAG,
      arrayKey: 'infos',
      mediaFields: ['icon'],
      itemLabelField: 'title',
    },
    // ⬇️ ADD THIS to blockArrayFields resource img
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    {
      layoutKey: 'layout',
      blockType: CORPORATE_INFO_SLUG_AND_TAG, // the parent block row
      arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
      mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
      itemLabelField: 'label', // optional, helps alt naming
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_03_SLUG_AND_TAG, // the parent block row
      arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
      mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
      itemLabelField: 'label', // optional, helps alt naming
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_04_SLUG_AND_TAG, // the parent block row
      arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
      mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
      itemLabelField: 'label', // optional, helps alt naming
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_05_SLUG_AND_TAG, // the parent block row
      arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
      mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
      itemLabelField: 'label', // optional, helps alt naming
    },
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    {
      layoutKey: 'layout',
      blockType: CORPORATE_PARTNERS_SLUG_AND_TAG,
      arrayKey: 'partners',
      mediaFields: ['image'], // generated array image field
      itemLabelField: 'name', // optional, improves alt/ownerField naming
    },
    {
      layoutKey: 'layout',
      blockType: EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
      arrayKey: 'keyFeatures',
      mediaFields: ['icon'],
      itemLabelField: 'name',
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_SLUG_AND_TAG,
      arrayKey: 'features',
      mediaFields: ['icon'],
      itemLabelField: 'name',
    },
    {
      layoutKey: 'layout',
      blockType: PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
      arrayKey: 'cardItems',
      mediaFields: ['icon'],
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
    {
      layoutKey: 'layout',
      blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
      groupKey: 'card', // the nested "blocks" field inside the outer block
      arrayKey: 'corporateCards', // array inside the nested CorporateCards block
      mediaFields: ['bgImage', 'icon'],
    },
    {
      layoutKey: 'layout',
      blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
      groupKey: 'card', // the nested "blocks" field inside the outer block
      arrayKey: 'planCards', // array inside the nested CorporateCards block
      mediaFields: ['bgImage'],
    },
    {
      layoutKey: 'layout',
      blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
      groupKey: 'card', // the nested "blocks" field inside the outer block
      arrayKey: 'offerCards', // array inside the nested CorporateCards block
      mediaFields: ['bgImage', 'icon'],
    },
    // plan card modal pdf hook
    {
      layoutKey: 'layout',
      blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
      groupKey: 'card', // nested blocks field on the parent block row
      arrayKey: 'planCards', // the array inside PlanCardSchema
      mediaFields: ['brochurePDF'], // 👈 PDF upload on each plan card (non-image is fine)
    },
  ],

  // otherUploadFields: [
  //   'brochurePDF', // 👈 top-level upload fields to Media (PDFs)
  // ],
  // src/utils/media/mediaHooks.ts (where you build export const mediaHooks = withMediaLifecycle({...}))
  blockNestedDeepFields: [
    {
      layoutKey: 'layout',
      blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG, // outer block
      blocksKey: 'card', // nested blocks field on the outer block
      nestedBlockType: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG, // the inner block to target
      firstArrayKey: 'planCards', // array on inner block
      secondArrayKey: 'modalItems', // nested array inside each planCards item
      mediaFields: ['icon'], // media on modalItems[]
    },
  ],

  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
})
