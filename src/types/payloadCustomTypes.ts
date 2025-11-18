import {
  ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
  ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
  ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG,
  ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG,
  ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG,
  AGENT_ONBOARDING_FORM_SLUG_AND_TAG,
  AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
  AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
  AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
  APPD_BLOCK_SLUG_AND_TAG,
  BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG,
  BLOGS_DETAILS_SLUG_AND_TAG,
  BLOGS_SLUG_AND_TAG,
  BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
  CONTACT_US_BLOCK_SLUG_AND_TAG,
  CORPORATE_INFO_SLUG_AND_TAG,
  CORPORATE_INTRO_SLUG_AND_TAG,
  CORPORATE_PAGE_CARDS_SLUG_AND_TAG,
  CORPORATE_PARTNERS_SLUG_AND_TAG,
  CUSTOM_CARD_SECTION_SLUG_AND_TAG,
  EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG,
  HASHLINK_CARDS_SLUG_AND_TAG,
  HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG,
  CAREER_PAGE_INTRO_SLUG_AND_TAG,
  CAREER_PAGE_OPENINGS_SLUG_AND_TAG,
  CAREER_PAGE_PROCESSING_SLUG_AND_TAG,
  CAREER_PAGE_RESOURCES_SLUG_AND_TAG,
  CAREER_PAGE_SWIPER_SLUG_AND_TAG,
  CUSTOM_ACCORDION_SLUG_AND_TAG,
  HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
  HOME_PAGE_HERO_SLUG_AND_TAG,
  HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
  HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
  HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
  NEWS_SLUG_AND_TAG,
  OFFER_CARDS_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_05_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_SLUG_AND_TAG,
  // PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
  VLOGS_SLUG_AND_TAG,
  MULTI_STAGE_INTRO_SLUG_AND_TAG,
  MULTI_STAGE_PLAN_SLUG_AND_TAG,
  PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
  PREM_CALC_PAGE_SLUG_AND_TAG,
  PURCHASE_FORM_SLUG_AND_TAG,
  SUPPORT_BUZZ_SLUG_AND_TAG,
  SUPPORT_FAQ_TAB_SLUG_AND_TAG,
  SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG,
  SUPPORT_MAP_TAB_SLUG_AND_TAG,
  CUSTOM_TAB_SLUG_AND_TAG,
  DESCRIPTIVE_CONTENT_SLUG_AND_TAG,
  STEP_CONTENT_SLUG_AND_TAG,
  ELIGIBILITY_CONTENT_SLUG_AND_TAG,
  ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG,
  DETAILS_CONTENT_SLUG_AND_TAG,
  LEARN_MORE_BLOG_CONTENT_SLUG_AND_TAG,
  LEARN_MORE_VIDEO_CONTENT_SLUG_AND_TAG,
} from '@/lib/constants'
import { Page } from '@/payload-types'

// home page block types
export type HeroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_HERO_SLUG_AND_TAG }
>
export type WhyChooseUsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG }
>

export type FeaturedPlansBlock = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG }
>

export type PremiumCalculatorBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG }
>

export type LifeInsuranceSimplifiedBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG }
>

export type LifeInsuranceVideoBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG }
>
export type LifeAtShantaBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG }
>

// about us page block types
export type ShantaIntroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG }
>

export type ShantaVisionBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG }
>

export type ValuesThatShapeUsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG }
>

export type LicensedAndLaunchedBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG }
>

export type DirectorMessagesBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG }
>

export type BoardOfDirectorsCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG }
>

export type LeadershipTeamCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG }
>

export type ShantaMilestoneUnlockedBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG }
>

export type ShantaFootprintBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG }
>

// agent onboarding

export type AgentVisionBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG }
>

export type AgentOnboardingOpportunityBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG }
>

export type MoreThanAWorkplaceBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG }
>

// BOD page
export type BoardOfDirectorsListBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG }
>

// Leadership team page
export type LeadershipTeamListBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG }
>

// plan card type
export type PlanCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG }
>
// contact us form
export type ContactUsFormBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CONTACT_US_BLOCK_SLUG_AND_TAG }
>
// corporate page
export type CorporateIntroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CORPORATE_INTRO_SLUG_AND_TAG }
>

export type CorporateInfoBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CORPORATE_INFO_SLUG_AND_TAG }
>

export type CorporatePartnersBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CORPORATE_PARTNERS_SLUG_AND_TAG }
>

// custom card

export type CustomCardSectionBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CUSTOM_CARD_SECTION_SLUG_AND_TAG }
>

export type AddonInfoBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG }
>

// cards
type AnyCard = CustomCardSectionBlockType['card'][number]

export type CorporateBlock = Extract<
  AnyCard,
  { blockType: typeof CORPORATE_PAGE_CARDS_SLUG_AND_TAG }
> & {
  corporateCards: unknown[]
}

export type PlanBlock = Extract<AnyCard, { blockType: typeof PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG }> & {
  planCards: unknown[]
}

export type OfferBlock = Extract<AnyCard, { blockType: typeof OFFER_CARDS_SLUG_AND_TAG }> & {
  offerCards: unknown[]
}

export type HashlinkBlock = Extract<AnyCard, { blockType: typeof HASHLINK_CARDS_SLUG_AND_TAG }> & {
  hashLinkCards: unknown[]
}

export type PlanInfoDesignBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PLAN_INFO_DESIGN_SLUG_AND_TAG }
>
export type PlanInfoDesign03BlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PLAN_INFO_DESIGN_03_SLUG_AND_TAG }
>
export type PlanInfoDesign04BlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PLAN_INFO_DESIGN_04_SLUG_AND_TAG }
>
export type PlanInfoDesign05BlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PLAN_INFO_DESIGN_05_SLUG_AND_TAG }
>

export type APPDBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof APPD_BLOCK_SLUG_AND_TAG }
>

export type AllBlogsSectionType = Extract<
  Page['layout'][number],
  { blockType: typeof BLOGS_SLUG_AND_TAG }
>

export type BlogDetailsSectionType = Extract<
  Page['layout'][number],
  { blockType: typeof BLOGS_DETAILS_SLUG_AND_TAG }
>
export type AllBlockCardType = Extract<
  Page['layout'][number],
  { blockType: typeof BLOGS_DETAILS_PAGE_ALL_NEWS_CARD_SLUG_AND_TAG }
>

export type AllNewsSectionType = Extract<
  Page['layout'][number],
  { blockType: typeof NEWS_SLUG_AND_TAG }
>

export type VlogBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof VLOGS_SLUG_AND_TAG }
>

export type FeaturedBlogVlogNewsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_FEATURED_BLOG_VLOG_AND_NEWS_SLUG_AND_TAG }
>

//career page
export type CareerPageIntroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CAREER_PAGE_INTRO_SLUG_AND_TAG }
>

export type CareerPageSwiperBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CAREER_PAGE_SWIPER_SLUG_AND_TAG }
>

export type CareerPageResourcesBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CAREER_PAGE_RESOURCES_SLUG_AND_TAG }
>

export type CareerPageOpeningBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CAREER_PAGE_OPENINGS_SLUG_AND_TAG }
>

export type CareerPageProcessingBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CAREER_PAGE_PROCESSING_SLUG_AND_TAG }
>

//multistage page
export type MultistageIntroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof MULTI_STAGE_INTRO_SLUG_AND_TAG }
>

export type MultistagePlanBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof MULTI_STAGE_PLAN_SLUG_AND_TAG }
>

// terms and privacy page
export type CustomAccordionBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CUSTOM_ACCORDION_SLUG_AND_TAG }
>

// support page
export type SupportMapTabBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof SUPPORT_MAP_TAB_SLUG_AND_TAG }
>

export type SupportFaqTabBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof SUPPORT_FAQ_TAB_SLUG_AND_TAG }
>

export type SupportBuzzBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof SUPPORT_BUZZ_SLUG_AND_TAG }
>

export type SupportFeedbackFormBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG }
>

//prem calc page
export type PremCalculatorPageBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PREM_CALC_PAGE_SLUG_AND_TAG }
>

//purchase page
export type PurchasePageBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PURCHASE_FORM_SLUG_AND_TAG }
>

//agent onboarding page
export type AgentOnboardingFormBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof AGENT_ONBOARDING_FORM_SLUG_AND_TAG }
>

// Custom Tab
export type CustomTabBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CUSTOM_TAB_SLUG_AND_TAG }
>

// descriptive Content
export type DescriptiveContentBlockType = Extract<
  CustomTabBlockType['tabs'][number]['content'][number],
  { blockType: typeof DESCRIPTIVE_CONTENT_SLUG_AND_TAG }
>

// descriptive Content
export type StepContentBlockType = Extract<
  CustomTabBlockType['tabs'][number]['content'][number],
  { blockType: typeof STEP_CONTENT_SLUG_AND_TAG }
>
// descriptive Content
export type EligibilityContentBlockType = Extract<
  CustomTabBlockType['tabs'][number]['content'][number],
  { blockType: typeof ELIGIBILITY_CONTENT_SLUG_AND_TAG }
>
// descriptive Content
export type AdditionalBenefitContentBlockType = Extract<
  CustomTabBlockType['tabs'][number]['content'][number],
  { blockType: typeof ADDITIONAL_BENEFIT_CONTENT_SLUG_AND_TAG }
>
// descriptive Content
export type DetailsContentBlockType = Extract<
  CustomTabBlockType['tabs'][number]['content'][number],
  { blockType: typeof DETAILS_CONTENT_SLUG_AND_TAG }
>
// descriptive Content
export type LearnMoreBlogContentBlockType = Extract<
  CustomTabBlockType['tabs'][number]['content'][number],
  { blockType: typeof LEARN_MORE_BLOG_CONTENT_SLUG_AND_TAG }
>
// descriptive Content
export type LearnMoreVideoContentBlockType = Extract<
  CustomTabBlockType['tabs'][number]['content'][number],
  { blockType: typeof LEARN_MORE_VIDEO_CONTENT_SLUG_AND_TAG }
>
