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

export const GLOBAL_CONTACT_US_SLUG_AND_TAG = 'global-contact-us-form' as const
export const GLOBAL_CONTACT_US_BLOCK_LABEL = 'Contact Us'
export const GLOBAL_CONTACT_US_CACHE_KEY = 'global-contact-us-form-data'

export const GLOBAL_BLOGS_SLUG_AND_TAG = 'global-blogs' as const
export const GLOBAL_BLOGS_BLOCK_LABEL = 'News and Blogs'
export const GLOBAL_BLOGS_CACHE_KEY = 'global-blogs-data'

export const GLOBAL_VLOGS_SLUG_AND_TAG = 'global-vlogs' as const
export const GLOBAL_VLOGS_BLOCK_LABEL = 'Vlogs'
export const GLOBAL_VLOGS_CACHE_KEY = 'global-vlogs-data'

// thumbnail folder name
const folder = '/assets/block-icons'

// Group
export const HERO = 'Hero Sections'
export const COMMON = 'Common Sections'
export const HOME_PAGE = 'Home Page Unique Sections'

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

// export const PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG = 'plan-card'
// export const PLAN_PAGE_PLAN_CARD_BLOCK_LABEL = 'Plan Card'
// export const PLAN_PAGE_PLAN_CARD_CACHE_KEY = 'plan-card-data'
// export const PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL = `${folder}/plan-card-block-thumbnail.png`

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

export const CALCULATOR_MODAL_SLUG_AND_TAG = 'calculator-modal'
export const CALCULATOR_MODAL_BLOCK_LABEL = 'Calculator Modal'
export const CALCULATOR_MODAL_BLOCK_THUMBNAIL_URL = `${folder}/calculator-modal-block-thumbnail.png`
export const CALCULATOR_MODAL_CACHE_KEY = 'calculator-modal-data'

export const LINK_BUTTON_SLUG_AND_TAG = 'link-button'
export const LINK_BUTTON_BLOCK_LABEL = 'Link Button'
export const LINK_BUTTON_BLOCK_THUMBNAIL_URL = `${folder}/link-button-block-thumbnail.png`
export const LINK_BUTTON_CACHE_KEY = 'link-button-data'

export const CORPORATE_PARTNERS_SLUG_AND_TAG = 'corporate-partners'
export const CORPORATE_PARTNERS_BLOCK_LABEL = 'Corporate Partners'
export const CORPORATE_PARTNERS_BLOCK_THUMBNAIL_URL = `${folder}/corporate-partners-block-thumbnail.png`
export const CORPORATE_PARTNERS_CACHE_KEY = 'corporate-partners'

// custom card section
export const CUSTOM_CARD_SECTION_SLUG_AND_TAG = 'custom-card'
export const CUSTOM_CARD_SECTION_BLOCK_LABEL = 'Custom Card'
export const CUSTOM_CARD_SECTION_BLOCK_THUMBNAIL_URL = `${folder}/custom-card-block-thumbnail.png`
export const CUSTOM_CARD_SECTION_CACHE_KEY = 'custom-card'

// card 01 -> corporate card
export const CORPORATE_PAGE_CARDS_SLUG_AND_TAG = 'corporate-cards'
export const CORPORATE_PAGE_CARDS_CACHE_KEY = 'corporate-cards-data'
export const CORPORATE_PAGE_CARDS_BLOCK_LABEL = 'Corporate Cards'
export const CORPORATE_PAGE_CARDS_BLOCK_THUMBNAIL_URL = `${folder}/corporate-cards-block-thumbnail.png`

// card 02 -> plan card
export const PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG = 'plan-card'
export const PLAN_PAGE_PLAN_CARD_BLOCK_LABEL = 'Plan Cards'
export const PLAN_PAGE_PLAN_CARD_CACHE_KEY = 'plan-card-data'
export const PLAN_PAGE_PLAN_CARD_BLOCK_THUMBNAIL_URL = `${folder}/plan-card-block-thumbnail.png`

// card 03 -> OFFER card
export const OFFER_CARDS_SLUG_AND_TAG = 'offer-card'
export const OFFER_CARDS_BLOCK_LABEL = 'Offer Cards'
export const OFFER_CARDS_CACHE_KEY = 'offer-card-data'
export const OFFER_CARDS_BLOCK_THUMBNAIL_URL = `${folder}/offer-card-block-thumbnail.png`

// card 04 -> OFFER card
export const HASHLINK_CARDS_SLUG_AND_TAG = 'hash-link-card'
export const HASHLINK_CARDS_BLOCK_LABEL = 'Hash Link Cards'
export const HASHLINK_CARDS_CACHE_KEY = 'hash-link-card-data'
export const HASHLINK_CARDS_BLOCK_THUMBNAIL_URL = `${folder}/hash-link-card-block-thumbnail.png`

// corporate Add on info
export const EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG = 'add-on-info'
export const EMPLOYEE_WELLNESS_ADDONS_INFO_CACHE_KEY = 'add-on-info-data'
export const EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_LABEL = 'Plan Info Design 01'
export const EMPLOYEE_WELLNESS_ADDONS_INFO_BLOCK_THUMBNAIL_URL = `${folder}/add-on-info-block-thumbnail.png`

// plan info design
export const PLAN_INFO_DESIGN_SLUG_AND_TAG = 'plan-info-design'
export const PLAN_INFO_DESIGN_CACHE_KEY = 'plan-info-design-data'
export const PLAN_INFO_DESIGN_BLOCK_LABEL = 'Plan Info Design 02'
export const PLAN_INFO_DESIGN_BLOCK_THUMBNAIL_URL = `${folder}/plan-info-design-block-thumbnail.png`

// plan info design
export const PLAN_INFO_DESIGN_03_SLUG_AND_TAG = 'plan-info-design-03'
export const PLAN_INFO_DESIGN_03_CACHE_KEY = 'plan-info-design-03-data'
export const PLAN_INFO_DESIGN_03_BLOCK_LABEL = 'Plan Info Design 03'
export const PLAN_INFO_DESIGN_03_BLOCK_THUMBNAIL_URL = `${folder}/plan-info-design-03-block-thumbnail.png`

// plan info design
export const PLAN_INFO_DESIGN_04_SLUG_AND_TAG = 'plan-info-design-04'
export const PLAN_INFO_DESIGN_04_CACHE_KEY = 'plan-info-design-04-data'
export const PLAN_INFO_DESIGN_04_BLOCK_LABEL = 'Plan Info Design 04'
export const PLAN_INFO_DESIGN_04_BLOCK_THUMBNAIL_URL = `${folder}/plan-info-design-04-block-thumbnail.png`

// plan info design
export const PLAN_INFO_DESIGN_05_SLUG_AND_TAG = 'plan-info-design-05'
export const PLAN_INFO_DESIGN_05_CACHE_KEY = 'plan-info-design-05-data'
export const PLAN_INFO_DESIGN_05_BLOCK_LABEL = 'Plan Info Design 05'
export const PLAN_INFO_DESIGN_05_BLOCK_THUMBNAIL_URL = `${folder}/plan-info-design-05-block-thumbnail.png`

//
export const APPD_BLOCK_SLUG_AND_TAG = 'accidental-permanent-partial-disability'
export const APPD_BLOCK_SLUG_AND_TAG_CACHE_KEY = 'accidental-permanent-partial-disability-data'
export const APPD_BLOCK_LABEL = 'Accidental Permanent Partial DisabilitySection'
export const APPD_BLOCK_THUMBNAIL_URL = `${folder}/accidental-permanent-partial-disability-block-thumbnail.png`

// news and media page
export const BLOGS_SLUG_AND_TAG = 'blogs'
export const BLOGS_BLOCK_LABEL = 'All Blogs'
export const BLOGS_BLOCK_THUMBNAIL_URL = `${folder}/blogs-block-thumbnail.png`
export const BLOGS_CACHE_KEY = 'blogs-data'

export const BLOGS_DETAILS_SLUG_AND_TAG = 'blogs-details'
export const BLOGS_DETAILS_BLOCK_LABEL = 'Blog Details'
export const BLOGS_DETAILS_BLOCK_THUMBNAIL_URL = `${folder}/blogs-details-block-thumbnail.png`
export const BLOGS_DETAILS_CACHE_KEY = 'blogs-details-data'

export const BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG = 'all-blogs-card'
export const BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_LABEL = 'All Blogs Card'
export const BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_BLOCK_THUMBNAIL_URL = `${folder}/all-blogs-card-block-thumbnail.png`
export const BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_CACHE_KEY = 'all-blogs-card-data'

export const NEWS_SLUG_AND_TAG = 'news'
export const NEWS_BLOCK_LABEL = 'All News'
export const NEWS_BLOCK_THUMBNAIL_URL = `${folder}/news-block-thumbnail.png`
export const NEWS_CACHE_KEY = 'news-data'

// Vlogs
export const VLOGS_SLUG_AND_TAG = 'vlogs'
export const VLOGS_BLOCK_LABEL = 'All Vlogs'
export const VLOGS_BLOCK_THUMBNAIL_URL = `${folder}/vlogs-block-thumbnail.png`
export const VLOGS_CACHE_KEY = 'vlogs-data'

// Home featureds news
export const HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG = 'featured-blog-vlog-and-news'
export const HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_LABEL = 'Featured Blogs, Vlogs and News'
export const HOME_FEATURED_BLOG_VLOG_AND_NEWS_BLOCK_THUMBNAIL_URL = `${folder}/featured-blog-vlog-and-news-block-thumbnail.png`
export const HOME_FEATURED_BLOG_VLOG_AND_NEWS_CACHE_KEY = 'featured-blog-vlog-and-news-data'
// career page
//  --------------------------------------------------------------------------------------------------

export const CAREER_PAGE_INTRO_SLUG_AND_TAG = 'career-intro'
export const CAREER_PAGE_INTRO_BLOCK_LABEL = 'Career Intro Card'
export const CAREER_PAGE_INTRO_CACHE_KEY = 'career-intro-data'
export const CAREER_PAGE_INTRO_BLOCK_THUMBNAIL_URL = `${folder}/career-page-intro-thumbnail.png`

export const CAREER_PAGE_SWIPER_SLUG_AND_TAG = 'career-swiper'
export const CAREER_PAGE_SWIPER_BLOCK_LABEL = 'Career Swiper Card'
export const CAREER_PAGE_SWIPER_CACHE_KEY = 'career-swiper-data'
export const CAREER_PAGE_SWIPER_BLOCK_THUMBNAIL_URL = `${folder}/career-page-swiper-thumbnail.png`

export const CAREER_PAGE_RESOURCES_SLUG_AND_TAG = 'career-resources'
export const CAREER_PAGE_RESOURCES_BLOCK_LABEL = 'Career Resources Card'
export const CAREER_PAGE_RESOURCES_CACHE_KEY = 'career-resources-data'
export const CAREER_PAGE_RESOURCES_BLOCK_THUMBNAIL_URL = `${folder}/career-page-resources-thumbnail.png`

export const CAREER_PAGE_OPENINGS_SLUG_AND_TAG = 'career-opening'
export const CAREER_PAGE_OPENINGS_BLOCK_LABEL = 'Career Opening Card'
export const CAREER_PAGE_OPENINGS_CACHE_KEY = 'career-opening-data'
export const CAREER_PAGE_OPENINGS_BLOCK_THUMBNAIL_URL = `${folder}/career-page-opening-thumbnail.png`

export const CAREER_PAGE_PROCESSING_SLUG_AND_TAG = 'career-processing'
export const CAREER_PAGE_PROCESSING_BLOCK_LABEL = 'Career Processing'
export const CAREER_PAGE_PROCESSING_CACHE_KEY = 'career-processing-data'
export const CAREER_PAGE_PROCESSING_BLOCK_THUMBNAIL_URL = `${folder}/career-page-processing-thumbnail.png`

// multistage page
//  --------------------------------------------------------------------------------------------------
export const MULTI_STAGE_INTRO_SLUG_AND_TAG = 'multistage-intro'
export const MULTI_STAGE_INTRO_BLOCK_LABEL = 'Multistage Intro'
export const MULTI_STAGE_INTRO_CACHE_KEY = 'multistage-intro-data'
export const MULTI_STAGE_INTRO_BLOCK_THUMBNAIL_URL = `${folder}/multistage-page-intro-thumbnail.png`

export const MULTI_STAGE_PLAN_SLUG_AND_TAG = 'multistage-plan'
export const MULTI_STAGE_PLAN_BLOCK_LABEL = 'Multistage Plan'
export const MULTI_STAGE_PLAN_CACHE_KEY = 'multistage-plan-data'
export const MULTI_STAGE_PLAN_BLOCK_THUMBNAIL_URL = `${folder}/multistage-page-plan-thumbnail.png`

// terms and privacy page
//  --------------------------------------------------------------------------------------------------
export const CUSTOM_ACCORDION_SLUG_AND_TAG = 'custom-accordion'
export const CUSTOM_ACCORDION_BLOCK_LABEL = 'Custom Accordion'
export const CUSTOM_ACCORDION_CACHE_KEY = 'custom-accordion-data'
export const CUSTOM_ACCORDION_BLOCK_THUMBNAIL_URL = `${folder}/custom-accordion-block-thumbnail.png`

// support page
//  --------------------------------------------------------------------------------------------------
export const SUPPORT_MAP_TAB_SLUG_AND_TAG = 'support-map-tab'
export const SUPPORT_MAP_TAB_BLOCK_LABEL = 'Support Map Tab'
export const SUPPORT_MAP_TAB_CACHE_KEY = 'support-map-tab-data'
export const SUPPORT_MAP_TAB_BLOCK_THUMBNAIL_URL = `${folder}/support-map-page-block-thumbnail.png`

export const SUPPORT_FAQ_TAB_SLUG_AND_TAG = 'support-faq-tab'
export const SUPPORT_FAQ_TAB_BLOCK_LABEL = 'Support FAQ Tab'
export const SUPPORT_FAQ_TAB_CACHE_KEY = 'support-faq-tab-data'
export const SUPPORT_FAQ_TAB_BLOCK_THUMBNAIL_URL = `${folder}/support-faq-page-block-thumbnail.png`

export const SUPPORT_BUZZ_SLUG_AND_TAG = 'support-buzz'
export const SUPPORT_BUZZ_BLOCK_LABEL = 'Support Buzz'
export const SUPPORT_BUZZ_CACHE_KEY = 'support-buzz-data'
export const SUPPORT_BUZZ_BLOCK_THUMBNAIL_URL = `${folder}/support-buzz-page-block-thumbnail.png`

export const SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG = 'support-feedback-form'
export const SUPPORT_FEEDBACK_FORM_BLOCK_LABEL = 'Support Feedback Form'
export const SUPPORT_FEEDBACK_FORM_CACHE_KEY = 'support-feedback-form-data'
export const SUPPORT_FEEDBACK_FORM_BLOCK_THUMBNAIL_URL = `${folder}/support-feedback-form-page-block-thumbnail.png`

//prem calc page
export const PREM_CALC_PAGE_SLUG_AND_TAG = 'prem-calculator-card'
export const PREM_CALC_PAGE_BLOCK_LABEL = 'Premium Calculator Card'
export const PREM_CALC_PAGE_CACHE_KEY = 'prem-calculator-card-data'
export const PREM_CALC_PAGE_BLOCK_THUMBNAIL_URL = `${folder}/premium-calculator-card-page-block-thumbnail.png`

//purchase page
export const PURCHASE_FORM_SLUG_AND_TAG = 'purchase-form'
export const PURCHASE_FORM_PAGE_BLOCK_LABEL = 'Purchase Now Form'
export const PURCHASE_FORM_CACHE_KEY = 'purchase-form-data'
export const PURCHASE_FORM_BLOCK_THUMBNAIL_URL = `${folder}/purchase-form-page-block-thumbnail.png`

// agent onboarding form
export const AGENT_ONBOARDING_FORM_SLUG_AND_TAG = 'agent-form'
export const AGENT_ONBOARDING_FORM_PAGE_BLOCK_LABEL = 'Agent Onboarding Form'
export const AGENT_ONBOARDING_FORM_CACHE_KEY = 'agent-form-data'
export const AGENT_ONBOARDING_FORM_BLOCK_THUMBNAIL_URL = `${folder}/agent-form-page-block-thumbnail.png`

// Custom Tab
export const CUSTOM_TAB_SLUG_AND_TAG = 'custom-tab'
export const CUSTOM_TAB_PAGE_BLOCK_LABEL = 'Custom Tab'
export const CUSTOM_TAB_CACHE_KEY = 'custom-tab-data'
export const CUSTOM_TAB_BLOCK_THUMBNAIL_URL = `${folder}/custom-tab-block-thumbnail.png`

// conten 01 --> descriptive content
export const DESCRIPTIVE_CONTENT_SLUG_AND_TAG = 'descriptive-content'
export const DESCRIPTIVE_CONTENT_PAGE_BLOCK_LABEL = 'Descriptive Content'
export const DESCRIPTIVE_CONTENT_CACHE_KEY = 'descriptive-content-data'
export const DESCRIPTIVE_CONTENT_BLOCK_THUMBNAIL_URL = `${folder}/descriptive-content-block-thumbnail.png`

// conten 02 --> step content
export const STEP_CONTENT_SLUG_AND_TAG = 'step-content'
export const STEP_CONTENT_PAGE_BLOCK_LABEL = 'Step Content'
export const STEP_CONTENT_CACHE_KEY = 'step-content-data'
export const STEP_CONTENT_BLOCK_THUMBNAIL_URL = `${folder}/step-content-block-thumbnail.png`

// conten 03 --> ELIGIBILITY content
export const ELIGIBILITY_CONTENT_SLUG_AND_TAG = 'eligibility-content'
export const ELIGIBILITY_CONTENT_PAGE_BLOCK_LABEL = 'Eligibility Content'
export const ELIGIBILITY_CONTENT_CACHE_KEY = 'eligibility-content-data'
export const ELIGIBILITY_CONTENT_BLOCK_THUMBNAIL_URL = `${folder}/eligibility-content-block-thumbnail.png`

// conten 04 --> step content
export const ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG = 'additional-benefit-content'
export const ADDITIONAL_BENEFIT_CONTENT_PAGE_BLOCK_LABEL = 'Additional Benefit Content'
export const ADDITIONAL_BENEFIT_CONTENT_CACHE_KEY = 'additional-benefit-content-data'
export const ADDITIONAL_BENEFIT_CONTENT_BLOCK_THUMBNAIL_URL = `${folder}/additional-benefit-content-block-thumbnail.png`

// conten 05 --> step content
export const DETAILS_CONTENT_SLUG_AND_TAG = 'details-benefit-content'
export const DETAILS_CONTENT_PAGE_BLOCK_LABEL = 'Details Content'
export const DETAILS_CONTENT_CACHE_KEY = 'details-benefit-content-data'
export const DETAILS_CONTENT_BLOCK_THUMBNAIL_URL = `${folder}/details-benefit-content-block-thumbnail.png`
