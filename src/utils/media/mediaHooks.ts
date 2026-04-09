// import {
//   ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
//   ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
//   ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
//   ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
//   ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
//   ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
//   ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
//   AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//   AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
//   AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
//   CONTACT_US_BLOCK_SLUG_AND_TAG,
//   CORPORATE_INFO_SLUG_AND_TAG,
//   CORPORATE_PARTNERS_SLUG_AND_TAG,
//   CUSTOM_CARD_SECTION_SLUG_AND_TAG,
//   EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
//   HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
//   HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//   HOME_PAGE_HERO_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//   HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
//   HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//   HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//   PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
//   PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
//   PLAN_INFO_DESIGN_05_SLUG_AND_TAG,
//   PLAN_INFO_DESIGN_SLUG_AND_TAG,
//   PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
//   CAREER_PAGE_SWIPER_SLUG_AND_TAG,
//   CAREER_PAGE_RESOURCES_SLUG_AND_TAG,
//   CAREER_PAGE_PROCESSING_SLUG_AND_TAG,
//   MULTI_STAGE_PLAN_SLUG_AND_TAG,
//   SUPPORT_BUZZ_SLUG_AND_TAG,
//   SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG,
//   CUSTOM_TAB_SLUG_AND_TAG,
//   DESCRIPTIVE_CONTENT_SLUG_AND_TAG,
//   ELIGIBILITY_CONTENT_SLUG_AND_TAG,
//   ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG,
//   LEARN_MORE_BLOG_CONTENT_SLUG_AND_TAG,
//   LEARN_MORE_VIDEO_CONTENT_SLUG_AND_TAG,
//   CAREER_PAGE_OPENINGS_SLUG_AND_TAG,
//   MICROINSURANCE_SERVICE_SLUG_AND_TAG,
//   MICRO_INSURANCE_STRATEGIC_PARTNERS_SLUG_AND_TAG,
//   LEARNING_MEDIA_SECTION_SLUG_AND_TAG,
//   SUPPORT_FAQ_TAB_SLUG_AND_TAG,
//   HERO_SMALL_SLUG_AND_TAG,
//   PLAN_INFO_DESIGN_07_SLUG_AND_TAG,
//   PLAN_INFO_DESIGN_06_SLUG_AND_TAG,
//   CAREER_SHAPE_SLUG_AND_TAG,
//   CAREER_AURA_PROGRAM_INSIDERS_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { triggerMediaTemporaryPurge } from './triggerMediaTemporaryPurge'
// import { withMediaLifecycle } from './withMediaLifecycle'

// export const mediaHooks = withMediaLifecycle({
//   collectionSlug: 'pages',

//   // Blocks with a media field on the block row itself:
//   blockSimpleFields: [
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//       mediaFields: ['mainImage', 'sideImage'], // cropper-based fields on the block row
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage1', 'backgroundImage2'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
//       mediaFields: ['thumbnail'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
//       mediaFields: ['bgImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
//       mediaFields: ['image'], // background image on the block row
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
//       mediaFields: ['licensedImage', 'launchedImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
//       mediaFields: ['image'], // section main image on the block row
//     },
//     {
//       layoutKey: 'layout',
//       blockType: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage'],
//     },
//     {
//       // Block row media (background image)
//       layoutKey: 'layout',
//       blockType: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CONTACT_US_BLOCK_SLUG_AND_TAG,
//       mediaFields: ['image'], // generator also creates imageOriginal; our hook handles both
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CORPORATE_INFO_SLUG_AND_TAG,
//       mediaFields: ['image'], // generated field pair (image + imageOriginal handled internally)
//     },
//     {
//       layoutKey: 'layout',
//       blockType: EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
//       // the hook already knows how to handle the *Original fields, so just list the primary names
//       mediaFields: ['imageSquare', 'imageWide'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_SLUG_AND_TAG,
//       mediaFields: ['bgImageMobile', 'bgImageDesktop'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
//       mediaFields: ['imageTall', 'imageWide'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
//       mediaFields: ['imageTall', 'imageWide'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_05_SLUG_AND_TAG,
//       mediaFields: ['imageTall', 'imageWide'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
//       mediaFields: ['trendingBanner'],
//     },
//     // {
//     //   layoutKey: 'layout',
//     //   blockType: CAREER_PAGE_SWIPER_SLUG_AND_TAG,
//     //   mediaFields: ['backgroundImage'],
//     // },
//     {
//       layoutKey: 'layout',
//       blockType: CAREER_PAGE_RESOURCES_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: MULTI_STAGE_PLAN_SLUG_AND_TAG,
//       mediaFields: ['planIcon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: SUPPORT_BUZZ_SLUG_AND_TAG,
//       mediaFields: ['mainImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: SUPPORT_BUZZ_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage'],
//     },

//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG,
//       mediaFields: ['imageTall'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG,
//       mediaFields: ['imageWide'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: LEARNING_MEDIA_SECTION_SLUG_AND_TAG,
//       mediaFields: ['instagramIcon', 'facebookIcon', 'linkedinIcon', 'youtubeIcon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_07_SLUG_AND_TAG,
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_06_SLUG_AND_TAG,
//       mediaFields: ['imageTall', 'imageWide'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_06_SLUG_AND_TAG,
//       mediaFields: ['stampImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CAREER_SHAPE_SLUG_AND_TAG,
//       mediaFields: ['backgroundImage'],
//     },
//   ],

//   // Blocks with arrays that contain media fields:
//   blockArrayFields: [
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_HERO_SLUG_AND_TAG,
//       arrayKey: 'heroes',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HERO_SMALL_SLUG_AND_TAG,
//       arrayKey: 'heroes',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
//       arrayKey: 'stats',
//       mediaFields: ['icon'],
//       // itemLabelField: 'label', // optional, helps with alt naming
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
//       arrayKey: 'plans',
//       mediaFields: ['icon', 'image'],
//       // itemLabelField: 'title', // (optional) better alt names
//     },
//     {
//       layoutKey: 'layout',
//       blockType: MICROINSURANCE_SERVICE_SLUG_AND_TAG,
//       arrayKey: 'plans',
//       mediaFields: ['icon', 'image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//       arrayKey: 'sections',
//       mediaFields: ['mainImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
//       arrayKey: 'gallery',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
//       arrayKey: 'cards',
//       mediaFields: ['bgImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
//       arrayKey: 'values',
//       mediaFields: ['image', 'hoverImage'], // icons inside the array items
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
//       arrayKey: 'cards',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
//       arrayKey: 'stats',
//       mediaFields: ['icon'], // icon inside stats[]
//       // itemLabelField: 'label',
//     },
//     {
//       layoutKey: 'layout',
//       blockType: ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
//       arrayKey: 'cards',
//       mediaFields: ['image'],
//       // itemLabelField: 'title',
//     },
//     {
//       layoutKey: 'layout',
//       blockType: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
//       arrayKey: 'items',
//       mediaFields: ['icon'],
//       // itemLabelField: 'title',
//     },
//     {
//       layoutKey: 'layout',
//       blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//       arrayKey: 'audienceCards',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//       arrayKey: 'expectationsLeft',
//       mediaFields: ['icon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//       arrayKey: 'expectationsRight',
//       mediaFields: ['avatar'],
//     },

//     {
//       layoutKey: 'layout',
//       blockType: AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
//       arrayKey: 'gallery',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CORPORATE_INFO_SLUG_AND_TAG,
//       arrayKey: 'infos',
//       mediaFields: ['icon'],
//       // itemLabelField: 'title',
//     },
//     // ⬇️ ADD THIS to blockArrayFields resource img
//     // -------------------------------------------------------------------------------------------
//     // -------------------------------------------------------------------------------------------
//     {
//       layoutKey: 'layout',
//       blockType: CORPORATE_INFO_SLUG_AND_TAG, // the parent block row
//       arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
//       mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
//       // itemLabelField: 'label', // optional, helps alt naming
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_03_SLUG_AND_TAG, // the parent block row
//       arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
//       mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
//       // itemLabelField: 'label', // optional, helps alt naming
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_04_SLUG_AND_TAG, // the parent block row
//       arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
//       mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
//       // itemLabelField: 'label', // optional, helps alt naming
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_05_SLUG_AND_TAG, // the parent block row
//       arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
//       mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
//       // itemLabelField: 'label', // optional, helps alt naming
//     },

//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG, // the parent block row
//       arrayKey: 'resourceButtons', // the blocks[] inside CorporateInfo
//       mediaFields: ['brochurePDF'], // the upload field on the BrochureButton block
//       // itemLabelField: 'label', // optional, helps alt naming
//     },
//     // -------------------------------------------------------------------------------------------
//     // -------------------------------------------------------------------------------------------
//     {
//       layoutKey: 'layout',
//       blockType: CORPORATE_PARTNERS_SLUG_AND_TAG,
//       arrayKey: 'partners',
//       mediaFields: ['image'], // generated array image field
//       // itemLabelField: 'name', // optional, improves alt/ownerField naming
//     },
//     {
//       layoutKey: 'layout',
//       blockType: EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
//       arrayKey: 'keyFeatures',
//       mediaFields: ['icon'],
//       // itemLabelField: 'name',
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_SLUG_AND_TAG,
//       arrayKey: 'features',
//       mediaFields: ['icon'],
//       // itemLabelField: 'name',
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
//       arrayKey: 'cardItems',
//       mediaFields: ['icon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CAREER_PAGE_RESOURCES_SLUG_AND_TAG,
//       arrayKey: 'cards',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CAREER_PAGE_PROCESSING_SLUG_AND_TAG,
//       arrayKey: 'processingCards',
//       mediaFields: ['image'],
//     },

//     {
//       layoutKey: 'layout',
//       blockType: CAREER_PAGE_OPENINGS_SLUG_AND_TAG,
//       arrayKey: 'cards',
//       mediaFields: ['filename'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: MICRO_INSURANCE_STRATEGIC_PARTNERS_SLUG_AND_TAG,
//       arrayKey: 'partners',
//       mediaFields: ['logo'],
//       itemLabelField: 'name',
//     },
//     {
//       layoutKey: 'layout',
//       blockType: LEARNING_MEDIA_SECTION_SLUG_AND_TAG,
//       arrayKey: 'instagramImages',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: LEARNING_MEDIA_SECTION_SLUG_AND_TAG,
//       arrayKey: 'facebookImages',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: LEARNING_MEDIA_SECTION_SLUG_AND_TAG,
//       arrayKey: 'linkedinImages',
//       mediaFields: ['image'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: SUPPORT_FAQ_TAB_SLUG_AND_TAG,
//       arrayKey: 'forms',
//       mediaFields: ['formPDF'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_SLUG_AND_TAG,
//       arrayKey: 'eligibilityData',
//       mediaFields: ['icon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_07_SLUG_AND_TAG,
//       arrayKey: 'eligibilityData',
//       mediaFields: ['icon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: PLAN_INFO_DESIGN_06_SLUG_AND_TAG,
//       arrayKey: 'features',
//       mediaFields: ['icon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CAREER_AURA_PROGRAM_INSIDERS_SLUG_AND_TAG,
//       arrayKey: 'images',
//       mediaFields: ['image'],
//     },
//   ],

//   // Blocks with nested array (media that inside another array) that contain media fields
//   blockGroupFields: [
//     // sections[].insuranceCardData[] has a media field: image
//     {
//       layoutKey: 'layout',
//       blockType: HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
//       groupKey: 'sections',
//       arrayKey: 'insuranceCardData',
//       mediaFields: ['image'],
//     },
//     // {
//     //   layoutKey: 'layout',
//     //   blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//     //   groupKey: 'expectations',
//     //   arrayKey: 'left',
//     //   mediaFields: ['icon'],
//     // },
//     // {
//     //   layoutKey: 'layout',
//     //   blockType: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//     //   groupKey: 'expectations',
//     //   arrayKey: 'right',
//     //   mediaFields: ['avatar'],
//     // },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
//       groupKey: 'card', // the nested "blocks" field inside the outer block
//       arrayKey: 'corporateCards', // array inside the nested CorporateCards block
//       mediaFields: ['bgImage', 'icon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
//       groupKey: 'card', // the nested "blocks" field inside the outer block
//       arrayKey: 'planCards', // array inside the nested CorporateCards block
//       mediaFields: ['bgImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
//       groupKey: 'card', // the nested "blocks" field inside the outer block
//       arrayKey: 'offerCards', // array inside the nested CorporateCards block
//       mediaFields: ['bgImage', 'icon'],
//     },
//     // plan card modal pdf hook
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
//       groupKey: 'card', // nested blocks field on the parent block row
//       arrayKey: 'planCards', // the array inside PlanCardSchema
//       mediaFields: ['brochurePDF'], // 👈 PDF upload on each plan card (non-image is fine)
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
//       groupKey: 'card', // the nested "blocks" field inside the outer block
//       arrayKey: 'hashLinkCards', // array inside the nested CorporateCards block
//       mediaFields: ['bgImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG,
//       groupKey: 'card', // the nested "blocks" field inside the outer block
//       arrayKey: 'careerCards', // array inside the nested CorporateCards block
//       mediaFields: ['bgImage', 'icon'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: SUPPORT_BUZZ_SLUG_AND_TAG,
//       groupKey: 'allTab',
//       arrayKey: 'newsItems',
//       mediaFields: ['image'],
//     },
//   ],

//   // otherUploadFields: [
//   //   'brochurePDF', // 👈 top-level upload fields to Media (PDFs)
//   // ],

//   // arrays -> arrays -> arrays --> arrays
//   blockNestedDeepFields: [
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_CARD_SECTION_SLUG_AND_TAG, // outer block
//       blocksKey: 'card', // nested blocks field on the outer block
//       nestedBlockType: PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG, // the inner block to target
//       firstArrayKey: 'planCards', // array on inner block
//       secondArrayKey: 'modalItems', // nested array inside each planCards item
//       mediaFields: ['icon'], // media on modalItems[]
//     },
//   ],

//   // ✅ NEW: block → tabs[] → content (blocks) → (descriptive-content) items[] → icon
//   blockArrayBlocksFields: [
//     // descriptive content image
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG, // outer block
//       arrayKey: 'tabs',
//       blocksKey: 'content',
//       nestedBlockType: DESCRIPTIVE_CONTENT_SLUG_AND_TAG, // the inner block to target
//       nestedArrayKey: 'items',
//       mediaFields: ['icon'],
//     },

//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG,
//       arrayKey: 'tabs',
//       blocksKey: 'content',
//       nestedBlockType: ELIGIBILITY_CONTENT_SLUG_AND_TAG,
//       nestedArrayKey: 'eligibilityData',
//       mediaFields: ['icon'],
//     },

//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG,
//       arrayKey: 'tabs',
//       blocksKey: 'content',
//       nestedBlockType: ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG,
//       nestedArrayKey: 'additionalBenefits',
//       mediaFields: ['mobileImage'],
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG,
//       arrayKey: 'tabs',
//       blocksKey: 'content',
//       nestedBlockType: ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG,
//       nestedArrayKey: 'additionalBenefits',
//       mediaFields: ['desktopImage'],
//     },
//   ],

//   blockArrayBlocksGroupFields: [
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG,
//       arrayKey: 'tabs',
//       blocksKey: 'content',
//       nestedBlockType: LEARN_MORE_BLOG_CONTENT_SLUG_AND_TAG,
//       groupKey: 'groups', // groups[] (array is supported)
//       nestedArrayKey: 'blogs', // blogs[] inside each group
//       mediaFields: ['image'], // generated via generateArrayImageFields
//     },
//     {
//       layoutKey: 'layout',
//       blockType: CUSTOM_TAB_SLUG_AND_TAG,
//       arrayKey: 'tabs',
//       blocksKey: 'content',
//       nestedBlockType: LEARN_MORE_VIDEO_CONTENT_SLUG_AND_TAG,
//       groupKey: 'groups', // groups[] (array is supported)
//       nestedArrayKey: 'blogs', // blogs[] inside each group
//       mediaFields: ['image'], // generated via generateArrayImageFields
//     },
//   ],

//   onAfterChange: async ({ req }) => {
//     triggerMediaTemporaryPurge(req)
//   },
// })

// ==================================================================================
// ==================================================================================
// ==================================================================================

import {
  BASIC_HERO_SLUG_AND_TAG,
  CONTACT_INFO_CARD_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  GET_TO_KNOW_SLUG_AND_TAG,
  PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
  PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INFO_01_SLUG_AND_TAG,
  TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG,
  TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG,
} from '@/lib/constants'
import { triggerMediaTemporaryPurge } from './triggerMediaTemporaryPurge'
import { withMediaLifecycle } from './withMediaLifecycle'

export const mediaHooks = withMediaLifecycle({
  collectionSlug: 'pages',

  // Blocks with a media field on the block row itself:
  blockSimpleFields: [
    {
      layoutKey: 'layout',
      blockType: GET_TO_KNOW_SLUG_AND_TAG,
      mediaFields: ['mainImage'],
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCT_INFO_01_SLUG_AND_TAG,
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG,
      mediaFields: ['datasheetFile'],
    },
    {
      layoutKey: 'layout',
      blockType: FOUNDER_QUOTE_SLUG_AND_TAG,
      mediaFields: ['profileImage'],
    },
  ],

  // Blocks with arrays that contain media fields:
  blockArrayFields: [
    {
      layoutKey: 'layout',
      blockType: BASIC_HERO_SLUG_AND_TAG,
      arrayKey: 'heroes',
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCT_HERO_SLUG_AND_TAG,
      arrayKey: 'heroes',
      mediaFields: ['image'],
    },
    {
      layoutKey: 'layout',
      blockType: GET_TO_KNOW_SLUG_AND_TAG,
      arrayKey: 'cards',
      mediaFields: ['bgImage'],
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
      arrayKey: 'cards',
      mediaFields: ['bgImage'],
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
      arrayKey: 'testLabCards',
      mediaFields: ['icon'],
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
      arrayKey: 'testLabCards',
      mediaFields: ['iconWhite'],
    },
    {
      layoutKey: 'layout',
      blockType: PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
      arrayKey: 'testLabCards',
      mediaFields: ['icon'],
    },
    {
      layoutKey: 'layout',
      blockType: PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
      arrayKey: 'testLabCards',
      mediaFields: ['iconWhite'],
    },
    {
      layoutKey: 'layout',
      blockType: TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG,
      arrayKey: 'specifications',
      mediaFields: ['icon'],
    },
    {
      layoutKey: 'layout',
      blockType: PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
      arrayKey: 'cards02',
      mediaFields: ['icon'],
    },
    {
      layoutKey: 'layout',
      blockType: CONTACT_INFO_CARD_SLUG_AND_TAG,
      arrayKey: 'contactInfo',
      mediaFields: ['icon', 'iconWhite'],
    },
  ],

  // Blocks with nested array (media that inside another array) that contain media fields
  blockGroupFields: [
    // sections[].insuranceCardData[] has a media field: image
    {
      layoutKey: 'layout',
      blockType: GET_TO_KNOW_SLUG_AND_TAG,
      groupKey: 'cards',
      arrayKey: 'icons',
      mediaFields: ['icon'],
    },
    {
      layoutKey: 'layout',
      blockType: PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
      groupKey: 'cards',
      arrayKey: 'icons',
      mediaFields: ['icon'],
    },
  ],

  // otherUploadFields: [
  //   'brochurePDF', // 👈 top-level upload fields to Media (PDFs)
  // ],

  // arrays -> arrays -> arrays --> arrays
  blockNestedDeepFields: [],

  // ✅ NEW: block → tabs[] → content (blocks) → (descriptive-content) items[] → icon
  blockArrayBlocksFields: [],

  blockArrayBlocksGroupFields: [],

  onAfterChange: async ({ req }) => {
    triggerMediaTemporaryPurge(req)
  },
})
