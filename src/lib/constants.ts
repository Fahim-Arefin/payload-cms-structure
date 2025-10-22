/** UI hint */
export const MAX_TOTAL_SIZE_KB = 1000
/** Keep a margin under Next.js’s ~1 MB request cap */
export const SAFE_MAX_KB = 950

/** ---- helpers ---- */
export const bytesOfJSON = (v: unknown): number => {
  try {
    const json = JSON.stringify(v ?? null)
    return new TextEncoder().encode(json).length
  } catch {
    return 0
  }
}
export const toKB = (n: number) => Math.round(n / 1024)

// ----------------------------------------------------------------------------------------------

// GLOBAL API
// in src/lib/constants.ts
export const GLOBAL_HEADER_SLUG_AND_TAG = 'global-header' as const
export const GLOBAL_HEADER_CACHE_KEY = 'global-header-data'

export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'global-navbar' as const
export const GLOBAL_NAVBAR_CACHE_KEY = 'global-navbar-data'

export const GLOBAL_FOOTER_SLUG_AND_TAG = 'global-footer' as const
export const GLOBAL_FOOTER_CACHE_KEY = 'global-footer-data'

export const GLOBAL_BOARD_OF_DIRECTORS_SLUG_AND_TAG = 'board-of-directors' as const
export const GLOBAL_BOARD_OF_DIRECTORS_BLOCK_LABEL = 'Board Of Directors'
export const GLOBAL_BOARD_OF_DIRECTORS_CACHE_KEY = 'board-of-directors-data'

export const GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG = 'leadership-team' as const
export const GLOBAL_LEADERSHIP_TEAM_BLOCK_LABEL = 'Leadership Team'
export const GLOBAL_LEADERSHIP_TEAM_CACHE_KEY = 'leadership-team-data'

// thumbnail folder name
const folder = '/assets/block-icons'

// home page constants
// ----------------------------------------------------------------------------------------------
export const HOME_PAGE_ADMIN_GROUP = 'Home Page'

export const HOME_PAGE_HERO_SLUG_AND_TAG = 'hero'
export const HOME_PAGE_HERO_BLOCK_LABEL = 'Hero'
export const HOME_PAGE_HERO_CACHE_KEY = 'hero-data'
export const HOME_PAGE_HERO_BLOCK_THUMBNAIL_URL = `${folder}/hero-block-thumbnail.png`

export const HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG = 'why-choose-us'
export const HOME_PAGE_WHY_CHOOSE_US_BLOCK_LABEL = 'Why Choose Us'
export const HOME_PAGE_WHY_CHOOSE_US_CACHE_KEY = 'why-choose-us-data'
export const HOME_PAGE_WHY_CHOOSE_US_BLOCK_THUMBNAIL_URL = `${folder}/why-choose-us-block-thumbnail.png`

export const HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG = 'featured-plans'
export const HOME_PAGE_FEATURED_PLANS_BLOCK_LABEL = 'Featured Plans'
export const HOME_PAGE_FEATURED_PLANS_CACHE_KEY = 'featured-plans-data'
export const HOME_PAGE_FEATURED_PLANS_BLOCK_THUMBNAIL_URL = `${folder}/featured-plan-block-thumbnail.png`

export const HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG = 'home-premium-calculator'
export const HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_LABEL = 'Premium Calculator'
export const HOME_PAGE_PREMIUM_CALCULATOR_CACHE_KEY = 'home-premium-calculator'
export const HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_THUMBNAIL_URL = `${folder}/premium-calculator-block-thumbnail.png`

export const HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG = 'life-insurance-simplified'
export const HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_LABEL = 'Life Insurance Simplified'
export const HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_CACHE_KEY = 'life-insurance-simplified-data'
export const HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_THUMBNAIL_URL = `${folder}/life-insurance-simplified-block-thumbnail.png`

export const HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG = 'home-video'
export const HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_LABEL = 'Life Insurance Video'
export const HOME_PAGE_LIFE_INSURANCE_VIDEO_CACHE_KEY = 'home-video-data'
export const HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_THUMBNAIL_URL = `${folder}/life-insurance-video-block-thumbnail.png`

export const HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG = 'life-at-shanta'
export const HOME_PAGE_LIFE_AT_SHANTA_BLOCK_LABEL = 'Life at Shanta'
export const HOME_PAGE_LIFE_AT_SHANTA_CACHE_KEY = 'life-at-shanta-data'
export const HOME_PAGE_LIFE_AT_SHANTA_BLOCK_THUMBNAIL_URL = `${folder}/life-at-shanta-block-thumbnail.png`
// ----------------------------------------------------------------------------------------------

// About us page constants
// ----------------------------------------------------------------------------------------------
export const ABOUT_US_PAGE_ADMIN_GROUP = 'About Us Page'

// export const ABOUT_US_PAGE_HERO_SLUG_AND_TAG = 'about-us-hero'
// export const ABOUT_US_PAGE_HERO_CACHE_KEY = 'about-us-hero-data'

export const ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG = 'shanta-intro'
export const ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_LABEL = 'Shanta Intro'
export const ABOUT_US_PAGE_SHANTA_INTRO_CACHE_KEY = 'shanta-intro-data'
export const ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_THUMBNAIL_URL = `${folder}/shanta-intro-block-thumbnail.png`

export const ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG = 'shanta-vision'
export const ABOUT_US_PAGE_SHANTA_VISION_BLOCK_LABEL = 'Shanta Vision'
export const ABOUT_US_PAGE_SHANTA_VISION_CACHE_KEY = 'shanta-vision-data'
export const ABOUT_US_PAGE_SHANTA_VISION_BLOCK_THUMBNAIL_URL = `${folder}/shanta-vision-block-thumbnail.png`

export const ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG = 'values-that-shape-us'
export const ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_BLOCK_LABEL = 'Values That Shape Us'
export const ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_CACHE_KEY = 'values-that-shape-us-data'
export const ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_BLOCK_THUMBNAIL_URL = `${folder}/values-that-shape-us-block-thumbnail.png`

export const ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG = 'licensed-launched'
export const ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_LABEL = 'Licensed & Launched'
export const ABOUT_US_PAGE_LICENSED_LAUNCHED_CACHE_KEY = 'licensed-launched-data'
export const ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_THUMBNAIL_URL = `${folder}/licensed-launched-block-thumbnail.png`

export const ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG = 'directors-message'
export const ABOUT_US_PAGE_DIRECTORS_MESSAGES_BLOCK_LABEL = 'Directors Message'
export const ABOUT_US_PAGE_DIRECTORS_MESSAGES_CACHE_KEY = 'directors-message-data'
export const ABOUT_US_PAGE_DIRECTORS_MESSAGES_BLOCK_THUMBNAIL_URL = `${folder}/directors-message-block-thumbnail.png`

export const ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG = 'bod-card'
export const ABOUT_US_PAGE_BOD_CARD_BLOCK_LABEL = 'Board Of Directors Card'
export const ABOUT_US_PAGE_BOD_CARD_CACHE_KEY = 'bod-card-data'
export const ABOUT_US_PAGE_BOD_CARD_BLOCK_THUMBNAIL_URL = `${folder}/board-of-directors-card-block-thumbnail.png`

export const ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG = 'leadership-card'
export const ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_LABEL = 'Leadership Team Card'
export const ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_CACHE_KEY = 'leadership-card-data'
export const ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_BLOCK_THUMBNAIL_URL = `${folder}/leadership-card-block-thumbnail.png`

export const ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG = 'shanta-milestone-unloacked'
export const ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_LABEL = 'Shanta Milestones Unlocked'
export const ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_CACHE_KEY = 'shanta-milestone-unloacked-data'
export const ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_BLOCK_THUMBNAIL_URL = `${folder}/shanta-milestone-unloacked-block-thumbnail.png`

export const ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG = 'shanta-footprint'
export const ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_LABEL = 'shanta-footprint'
export const ABOUT_US_PAGE_SHANTA_FOOTPRINT_CACHE_KEY = 'shanta-footprint-data'
export const ABOUT_US_PAGE_SHANTA_FOOTPRINT_BLOCK_THUMBNAIL_URL = `${folder}/shanta-footprint-block-thumbnail.png`

// ----------------------------------------------------------------------------------------------

// BOD page constants
// ----------------------------------------------------------------------------------------------
export const BOD_PAGE_ADMIN_GROUP = 'BOD Page'

export const BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG = 'board-of-directors-list'
export const BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_LABEL = 'Board Of Directors List'
export const BOD_PAGE_BOARD_OF_DIRECTORS_List_CACHE_KEY = 'board-of-directors-list-data'
export const BOD_PAGE_BOARD_OF_DIRECTORS_List_BLOCK_THUMBNAIL_URL = `${folder}/board-of-directors-list-block-thumbnail.png`

// ----------------------------------------------------------------------------------------------

// Leader page constants
// ----------------------------------------------------------------------------------------------
export const LEADERS_PAGE_ADMIN_GROUP = 'Leaders Page'

export const LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG = 'leadership-team-list'
export const LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_LABEL = 'Leadership Team List'
export const LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_CACHE_KEY = 'leadership-team-list-data'
export const LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_BLOCK_THUMBNAIL_URL = `${folder}/leadership-team-list-block-thumbnail.png`
// ----------------------------------------------------------------------------------------------

// Agent OnBoarding page constants
// ----------------------------------------------------------------------------------------------
export const AGENT_ONBOARDING_PAGE_ADMIN_GROUP = 'Agent Onboarding Page'

// export const AGENT_ONBOARDING_PAGE_HERO_SLUG_AND_TAG = 'agent-onboarding-hero'
// export const AGENT_ONBOARDING_PAGE_HERO_CACHE_KEY = 'agent-onboarding-data'

// export const AGENT_ONBOARDING_PAGE_AGENT_INTRO_SLUG_AND_TAG = 'agent-onboarding-intro'
// export const AGENT_ONBOARDING_PAGE_AGENT_INTRO_CACHE_KEY = 'agent-onboarding-intro-data'

// export const AGENT_ONBOARDING_PAGE_WHY_THIS_ROLE_WORKS_FOR_YOU_SLUG_AND_TAG =
//   'why-this-role-works-for-you'
// export const AGENT_ONBOARDING_PAGE_WHY_THIS_ROLE_WORKS_FOR_YOU_CACHE_KEY =
//   'why-this-role-works-for-you-data'

export const AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG = 'agent-vision'
export const AGENT_ONBOARDING_PAGE_AGENT_VISION_BLOCK_LABEL = 'Agent Vision'
export const AGENT_ONBOARDING_PAGE_AGENT_VISION_CACHE_KEY = 'agent-vision-data'
export const AGENT_ONBOARDING_PAGE_AGENT_VISION_BLOCK_THUMBNAIL_URL = `${folder}/agent-vision-block-thumbnail.png`

export const AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG =
  'agent-onboarding-opportunity'
export const AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_LABEL =
  'Agent Onboarding Opportunity'
export const AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_CACHE_KEY =
  'agent-onboarding-opportunity-data'
export const AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_THUMBNAIL_URL = `${folder}/agent-onboarding-opportunity-block-thumbnail.png`

export const AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG = 'more-than-a-workplace'
export const AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_LABEL = 'More Than A Workplace'
export const AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_CACHE_KEY = 'more-than-a-workplace-data'
export const AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_BLOCK_THUMBNAIL_URL = `${folder}/more-than-a-workplace-block-thumbnail.png`

// plan page
//  --------------------------------------------------------------------------------------------------

export const PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG = 'plan-card'
export const PLAN_PAGE_PLAN_CARD_BLOCK_LABEL = 'Plan Card'
export const PLAN_PAGE_PLAN_CARD_CACHE_KEY = 'plan-card-data'
export const PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL = `${folder}/plan-card-block-thumbnail.png`

// contact us block
// ------------------------------------------------------------------------------------------------------

export const CONTACT_US_BLOCK_SLUG_AND_TAG = 'contact-us-form'
export const CONTACT_US_BLOCK_LABEL = 'Contact Us Form'
export const CONTACT_US_BLOCK_THUMBNAIL_URL = `${folder}/contact-us-form-block-thumbnail.png`
export const CONTACT_US_BLOCK_CACHE_KEY = 'contact-us-form-data'

// corporate page
// ------------------------------------------------------------------------------------------------------

export const CORPORATE_INTRO_SLUG_AND_TAG = 'corporate-intro'
export const CORPORATE_INTRO_BLOCK_LABEL = 'Corporate Intro'
export const CORPORATE_INTRO_BLOCK_THUMBNAIL_URL = `${folder}/corporate-intro-block-thumbnail.png`
export const CORPORATE_INTRO_CACHE_KEY = 'corporate-intro-data'

export const CORPORATE_INFO_SLUG_AND_TAG = 'corporate-info'
export const CORPORATE_INFO_BLOCK_LABEL = 'Corporate Info'
export const CORPORATE_INFO_BLOCK_THUMBNAIL_URL = `${folder}/corporate-info-block-thumbnail.png`
export const CORPORATE_INFO_CACHE_KEY = 'corporate-info-data'

// Resoure button blocks
export const BROCHURE_BUTTON_SLUG_AND_TAG = 'brochure-button'
export const BROCHURE_BUTTON_BLOCK_LABEL = 'Brochure Button'
export const BROCHURE_BUTTON_BLOCK_THUMBNAIL_URL = `${folder}/brochure-button-block-thumbnail.png`
export const BROCHURE_BUTTON_CACHE_KEY = 'brochure-button-data'

export const LINK_BUTTON_SLUG_AND_TAG = 'link-button'
export const LINK_BUTTON_BLOCK_LABEL = 'Link Button'
export const LINK_BUTTON_BLOCK_THUMBNAIL_URL = `${folder}/link-button-block-thumbnail.png`
export const LINK_BUTTON_CACHE_KEY = 'link-button-data'
