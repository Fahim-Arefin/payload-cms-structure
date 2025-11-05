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
  BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
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
  MULTI_STAGE_INTRO_SLUG_AND_TAG,
  MULTI_STAGE_PLAN_SLUG_AND_TAG,
  PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
  PREM_CALC_PAGE_SLUG_AND_TAG,
  PURCHASE_FORM_SLUG_AND_TAG,
  SUPPORT_BUZZ_SLUG_AND_TAG,
  SUPPORT_FAQ_TAB_SLUG_AND_TAG,
  SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG,
  SUPPORT_MAP_TAB_SLUG_AND_TAG,
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
import BoardOfDirectorsListBlock from './BoardOfDirectorsList/BoardOfDirectorsListBlock'
import LeadershipTeamCardBlock from './leadershipTeamCard/LeadershipTeamCardBlock'
import LeadershipTeamListBlock from './leadershipTeamList/LeadershipTeamListBlock'
import PlanCardBlock from './planCard/PlanCardBlock'
import CareerIntroBlock from './careerIntro/CareerIntroBlock'
import CareerSwiperBlock from './careerSwiper/CareerSwiperBlock'
import CareerResourcesBlock from './careerResources/CareerResourcesBlock'
import CareerOpeningBlock from './careerOpening/CareerOpeningBlock'
import CareerProcessingBlock from './careerProcessingFlow/CareerProcessingBlock'
import MultiStageTitleBlock from './multiStageTitle/MultiStageTitleBlock'
import MultistagePlanBlock from './multiStagePlan/MultistagePlanBlock'
import CustomAccordionBlock from './customAccordion/CustomAccordionBlock'
import SupportMapTabBlock from './supportMapTab/SupportMapTabBlock'
import SupportFaqTabBlock from './supportFaqTab/SupportFaqTabBlock'
import SupportBuzzBlock from './supportBuzz/SupportBuzzBlock'
import SupportFeedbackFormBlock from './supportFeedbackForm/SupportFeedbackFormBlock'
import PremCalculatorPageBlock from './premCalculatorPage/PremCalculatorPageBlock'
import PurchaseFormBlock from './purchaseFormBlock/PurchaseFormBlock'
import AgentFormBlock from './agentForm/AgentFormBlock'

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
    case ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG:
      return <LeadershipTeamCardBlock key={block.id} block={block} params={params} />
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
    case AGENT_ONBOARDING_FORM_SLUG_AND_TAG:
      return <AgentFormBlock key={block.id} block={block} params={params} />

    //BOD page
    case BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG:
      return <BoardOfDirectorsListBlock key={block.id} block={block} params={params} />

    //leadership team page
    case LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG:
      return <LeadershipTeamListBlock key={block.id} block={block} params={params} />

    // plan
    case PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG:
      return <PlanCardBlock key={block.id} block={block} params={params} />

    //career page
    case CAREER_PAGE_INTRO_SLUG_AND_TAG:
      return <CareerIntroBlock key={block.id} block={block} params={params} />
    case CAREER_PAGE_SWIPER_SLUG_AND_TAG:
      return <CareerSwiperBlock key={block.id} block={block} params={params} />
    case CAREER_PAGE_RESOURCES_SLUG_AND_TAG:
      return <CareerResourcesBlock key={block.id} block={block} params={params} />
    case CAREER_PAGE_OPENINGS_SLUG_AND_TAG:
      return <CareerOpeningBlock key={block.id} block={block} params={params} />
    case CAREER_PAGE_PROCESSING_SLUG_AND_TAG:
      return <CareerProcessingBlock key={block.id} block={block} params={params} />

    //multistage page
    case MULTI_STAGE_INTRO_SLUG_AND_TAG:
      return <MultiStageTitleBlock key={block.id} block={block} params={params} />
    case MULTI_STAGE_PLAN_SLUG_AND_TAG:
      return <MultistagePlanBlock key={block.id} block={block} params={params} />
    //terms & privacy page
    case CUSTOM_ACCORDION_SLUG_AND_TAG:
      return <CustomAccordionBlock key={block.id} block={block} params={params} />
    //support page
    case SUPPORT_MAP_TAB_SLUG_AND_TAG:
      return <SupportMapTabBlock key={block.id} block={block} params={params} />
    case SUPPORT_FAQ_TAB_SLUG_AND_TAG:
      return <SupportFaqTabBlock key={block.id} block={block} params={params} />
    case SUPPORT_BUZZ_SLUG_AND_TAG:
      return <SupportBuzzBlock key={block.id} block={block} params={params} />
    case SUPPORT_FEEDBACK_FORM_SLUG_AND_TAG:
      return <SupportFeedbackFormBlock key={block.id} block={block} params={params} />
    // prem calc page
    case PREM_CALC_PAGE_SLUG_AND_TAG:
      return <PremCalculatorPageBlock key={block.id} block={block} params={params} />
    //purchase page
    case PURCHASE_FORM_SLUG_AND_TAG:
      return <PurchaseFormBlock key={block.id} block={block} params={params} />

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
