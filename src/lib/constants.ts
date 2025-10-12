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

// home page constants
// ----------------------------------------------------------------------------------------------
export const HOME_PAGE_ADMIN_GROUP = 'Home Page'

export const HOME_PAGE_HERO_SLUG_AND_TAG = 'hero'
export const HOME_PAGE_HERO_BLOCK_LABEL = 'Hero'
export const HOME_PAGE_HERO_CACHE_KEY = 'hero-data'

export const HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG = 'why-choose-us'
export const HOME_PAGE_WHY_CHOOSE_US_BLOCK_LABEL = 'Why Choose Us'
export const HOME_PAGE_WHY_CHOOSE_US_CACHE_KEY = 'why-choose-us-data'

export const HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG = 'featured-plans'
export const HOME_PAGE_FEATURED_PLANS_BLOCK_LABEL = 'Featured Plans'
export const HOME_PAGE_FEATURED_PLANS_CACHE_KEY = 'featured-plans-data'

export const HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG = 'home-premium-calculator'
export const HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_LABEL = 'Premium Calculator'
export const HOME_PAGE_PREMIUM_CALCULATOR_CACHE_KEY = 'home-premium-calculator'

export const HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG = 'life-insurance-simplified'
export const HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_BLOCK_LABEL = 'Life Insurance Simplified'
export const HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_CACHE_KEY = 'life-insurance-simplified-data'

export const HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG = 'home-video'
export const HOME_PAGE_LIFE_INSURANCE_VIDEO_BLOCK_LABEL = 'Life Insurance Video'
export const HOME_PAGE_LIFE_INSURANCE_VIDEO_CACHE_KEY = 'home-video-data'

export const HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG = 'life-at-shanta'
export const HOME_PAGE_LIFE_AT_SHANTA_BLOCK_LABEL = 'Life at Shanta'
export const HOME_PAGE_LIFE_AT_SHANTA_CACHE_KEY = 'life-at-shanta-data'
// ----------------------------------------------------------------------------------------------

// About us page constants
// ----------------------------------------------------------------------------------------------
export const ABOUT_US_PAGE_ADMIN_GROUP = 'About Us Page'

// export const ABOUT_US_PAGE_HERO_SLUG_AND_TAG = 'about-us-hero'
// export const ABOUT_US_PAGE_HERO_CACHE_KEY = 'about-us-hero-data'

export const ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG = 'shanta-intro'
export const ABOUT_US_PAGE_SHANTA_INTRO_BLOCK_LABEL = 'Shanta Intro'
export const ABOUT_US_PAGE_SHANTA_INTRO_CACHE_KEY = 'shanta-intro-data'

export const ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG = 'shanta-vision'
export const ABOUT_US_PAGE_SHANTA_VISION_BLOCK_LABEL = 'Shanta Vision'
export const ABOUT_US_PAGE_SHANTA_VISION_CACHE_KEY = 'shanta-vision-data'

export const ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG = 'values-that-shape-us'
export const ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_BLOCK_LABEL = 'Values That Shape Us'
export const ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_CACHE_KEY = 'values-that-shape-us-data'

export const ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG = 'licensed-launched'
export const ABOUT_US_PAGE_LICENSED_LAUNCHED_BLOCK_LABEL = 'Licensed & Launched'
export const ABOUT_US_PAGE_LICENSED_LAUNCHED_CACHE_KEY = 'licensed-launched-data'

export const ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG = 'directors-message'
export const ABOUT_US_PAGE_DIRECTORS_MESSAGES_CACHE_KEY = 'directors-message-data'

export const ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG = 'shanta-milestone-unloacked'
export const ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_CACHE_KEY = 'shanta-milestone-unloacked-data'

export const ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG = 'shanta-footprint'
export const ABOUT_US_PAGE_SHANTA_FOOTPRINT_CACHE_KEY = 'shanta-footprint-data'

// ----------------------------------------------------------------------------------------------

// BOD page constants
// ----------------------------------------------------------------------------------------------
export const BOD_PAGE_ADMIN_GROUP = 'BOD Page'

export const BOD_PAGE_BOARD_OF_DIRECTORS_SLUG_AND_TAG = 'board-of-directors'
export const BOD_PAGE_BOARD_OF_DIRECTORS_CACHE_KEY = 'board-of-directors-data'

// ----------------------------------------------------------------------------------------------

// Leader page constants
// ----------------------------------------------------------------------------------------------
export const LEADERS_PAGE_ADMIN_GROUP = 'Leaders Page'

export const LEADERS_PAGE_LEADERS_SLUG_AND_TAG = 'leaders'
export const LEADERS_PAGE_LEADERS_CACHE_KEY = 'leaders-data'
// ----------------------------------------------------------------------------------------------

// Agent OnBoarding page constants
// ----------------------------------------------------------------------------------------------
export const AGENT_ONBOARDING_PAGE_ADMIN_GROUP = 'Agent Onboarding Page'

export const AGENT_ONBOARDING_PAGE_HERO_SLUG_AND_TAG = 'agent-onboarding-hero'
export const AGENT_ONBOARDING_PAGE_HERO_CACHE_KEY = 'agent-onboarding-data'

export const AGENT_ONBOARDING_PAGE_AGENT_INTRO_SLUG_AND_TAG = 'agent-onboarding-intro'
export const AGENT_ONBOARDING_PAGE_AGENT_INTRO_CACHE_KEY = 'agent-onboarding-intro-data'

export const AGENT_ONBOARDING_PAGE_WHY_THIS_ROLE_WORKS_FOR_YOU_SLUG_AND_TAG =
  'why-this-role-works-for-you'
export const AGENT_ONBOARDING_PAGE_WHY_THIS_ROLE_WORKS_FOR_YOU_CACHE_KEY =
  'why-this-role-works-for-you-data'

export const AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG = 'agent-vision'
export const AGENT_ONBOARDING_PAGE_AGENT_VISION_CACHE_KEY = 'agent-vision-data'

export const AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG =
  'agent-onboarding-opportunity'
export const AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_CACHE_KEY =
  'agent-onboarding-opportunity-data'

export const AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG = 'more-than-a-workplace'
export const AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_CACHE_KEY = 'more-than-a-workplace-data'
