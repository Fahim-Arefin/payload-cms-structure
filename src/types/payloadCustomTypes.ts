import {
  ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG,
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
  HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
  HOME_PAGE_HERO_SLUG_AND_TAG,
  HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG,
  HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG,
  HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
  HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
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
