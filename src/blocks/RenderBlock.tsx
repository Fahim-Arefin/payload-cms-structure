// app/(frontend)/_components/RenderBlocks.tsx
import FeaturedPlanBlock from '@/blocks/featuredPlan/FeaturedPlanBlock'
import HeroBlock from '@/blocks/hero/HeroBlock'
import LifeAtShantaBlock from '@/blocks/lifeAtShanta/LifeAtShantaBlock'
import LifeInsuranceSimplifiedBlock from '@/blocks/lifeInsuranceSimplified/LifeInsuranceSimplifiedBlock'
import LifeInsuranceVideoBlock from '@/blocks/lifeInsuranceVideo/LifeInsuranceVideoBlock'
import PremiumCalculatorBlock from '@/blocks/premiumCalculator/PremiumCalculatorBlock'
import WhyChooseUsBlock from '@/blocks/whyChooseUs/WhyChooseUsBlock'
import ShantaIntroBlock from '@/blocks/shantaIntro/ShantaIntroBlock'

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

import type { Page as PayloadPage } from '@/payload-types'
import ShantaVisionBlock from './shantaVision/ShantaVisionBlock'
import ValuesThatShapeUsBlock from './valuesThatShapeUs/ValuesThatShapeUsBlock'
import LicensedAndLaunchedBlock from './LicensedAndLaunched/LicensedAndLaunchedBlock'
import DirectorMessageBlock from './directorsMessage/DirectorMessageBlock'
import ShantaMilestoneUnlockedBlock from './shantaMilestoneUnlocked/ShantaMilestoneUnlockedBlock'
import ShantaFootPrintBlock from './shantaFootprint/ShantaFootPrintBlock'
import AgentVisionBlock from './agentVision/AgentVisionBlock'
import AgentOnboardingOpportunityBlock from './agentOnboadringOpportunity/AgentOnboardingOpportunityBlock'
import MoreThanAWorkplaceBlock from './moreThanAWorkplace/MoreThanAWorkplaceBlock'
import BoardOfDirectorsCardBlock from './BoardOfDirectorsCard/BoardOfDirectorsCardBlock'

type Params = Record<string, string>

export function renderBlock(block: PayloadPage['layout'][0], params: Params) {
  switch (block.blockType) {
    // home page
    case HOME_PAGE_HERO_SLUG_AND_TAG:
      return <HeroBlock key={block.id} block={block} params={params} />
    case HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG:
      return <WhyChooseUsBlock key={block.id} block={block} params={params} />
    case HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG:
      return <FeaturedPlanBlock key={block.id} block={block} params={params} />
    case HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG:
      return <PremiumCalculatorBlock key={block.id} block={block} params={params} />
    case HOME_PAGE_LIFE_INSURANCE_SIMPLIFIED_SLUG_AND_TAG:
      return <LifeInsuranceSimplifiedBlock key={block.id} block={block} params={params} />
    case HOME_PAGE_LIFE_INSURANCE_VIDEO_SLUG_AND_TAG:
      return <LifeInsuranceVideoBlock key={block.id} block={block} params={params} />
    case HOME_PAGE_LIFE_AT_SHANTA_SLUG_AND_TAG:
      return <LifeAtShantaBlock key={block.id} block={block} params={params} />

    // about us page
    case ABOUT_US_PAGE_SHANTA_INTRO_SLUG_AND_TAG:
      return <ShantaIntroBlock key={block.id} block={block} params={params} />
    case ABOUT_US_PAGE_SHANTA_VISION_SLUG_AND_TAG:
      return <ShantaVisionBlock key={block.id} block={block} params={params} />
    case ABOUT_US_PAGE_VALUES_THAT_SHAPE_US_SLUG_AND_TAG:
      return <ValuesThatShapeUsBlock key={block.id} block={block} params={params} />
    case ABOUT_US_PAGE_LICENSED_LAUNCHED_SLUG_AND_TAG:
      return <LicensedAndLaunchedBlock key={block.id} block={block} params={params} />
    case ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG:
      return <DirectorMessageBlock key={block.id} block={block} params={params} />
    case ABOUT_US_PAGE_BOD_CARD_SLUG_AND_TAG:
      return <BoardOfDirectorsCardBlock key={block.id} block={block} params={params} />
    case ABOUT_US_PAGE_SHANTA_MILESTONES_UNLOCKED_SLUG_AND_TAG:
      return <ShantaMilestoneUnlockedBlock key={block.id} block={block} params={params} />
    case ABOUT_US_PAGE_SHANTA_FOOTPRINT_SLUG_AND_TAG:
      return <ShantaFootPrintBlock key={block.id} block={block} params={params} />

    // agent onboaring page
    case AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG:
      return <AgentVisionBlock key={block.id} block={block} params={params} />
    case AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG:
      return <AgentOnboardingOpportunityBlock key={block.id} block={block} params={params} />
    case AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG:
      return <MoreThanAWorkplaceBlock key={block.id} block={block} params={params} />

    default:
      return null
  }
}

export default function RenderBlocks({
  layout,
  params = {},
}: {
  layout: PayloadPage['layout']
  params?: Params
}) {
  return <>{layout?.map((b) => renderBlock(b, params))}</>
}
