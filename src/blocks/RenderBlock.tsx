// app/(frontend)/_components/RenderBlocks.tsx
import FeaturedPlanBlock from '@/blocks/featuredPlan/FeaturedPlanBlock'
import HeroBlock from '@/blocks/hero/HeroBlock'
import LifeAtShantaBlock from '@/blocks/lifeAtShanta/LifeAtShantaBlock'
import LifeInsuranceSimplifiedBlock from '@/blocks/lifeInsuranceSimplified/LifeInsuranceSimplifiedBlock'
import LifeInsuranceVideoBlock from '@/blocks/lifeInsuranceVideo/LifeInsuranceVideoBlock'
import PremiumCalculatorBlock from '@/blocks/premiumCalculator/PremiumCalculatorBlock'
import ShantaIntroBlock from '@/blocks/shantaIntro/ShantaIntroBlock'
import WhyChooseUsBlock from '@/blocks/whyChooseUs/WhyChooseUsBlock'

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
  AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
  AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
  AGENT_ONBOARDING_PAGE_MORE_THAN_A_WORKPLACE_SLUG_AND_TAG,
  APPD_BLOCK_SLUG_AND_TAG,
  BLOGS_DETAILS_SLUG_AND_TAG,
  BLOGS_SLUG_AND_TAG,
  BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG,
  CONTACT_US_BLOCK_SLUG_AND_TAG,
  CORPORATE_INFO_SLUG_AND_TAG,
  CORPORATE_INTRO_SLUG_AND_TAG,
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
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_03_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_04_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_05_SLUG_AND_TAG,
  PLAN_INFO_DESIGN_SLUG_AND_TAG,
} from '@/lib/constants'

import type { Page as PayloadPage } from '@/payload-types'
import AddonsInfoBlock from './AddonsInfoSchema/AddonsInfoBlock'
import BoardOfDirectorsCardBlock from './BoardOfDirectorsCard/BoardOfDirectorsCardBlock'
import BoardOfDirectorsListBlock from './BoardOfDirectorsList/BoardOfDirectorsListBlock'
import LicensedAndLaunchedBlock from './LicensedAndLaunched/LicensedAndLaunchedBlock'
import AgentOnboardingOpportunityBlock from './agentOnboadringOpportunity/AgentOnboardingOpportunityBlock'
import AgentVisionBlock from './agentVision/AgentVisionBlock'
import ContactUsBlock from './contactUs/ContactUsBlock'
import CorporateInfoBlock from './corporateInfo/CorporateInfoBlock'
import CorporateIntroBlock from './corporateIntro/CorporateIntroBlock'
import CorporatePartnersBlock from './corporatePartners/CorporatePartnersBlock'
import CustomCardSectionBlock from './customCardSection/CustomCardSectionBlock'
import DirectorMessageBlock from './directorsMessage/DirectorMessageBlock'
import LeadershipTeamCardBlock from './leadershipTeamCard/LeadershipTeamCardBlock'
import LeadershipTeamListBlock from './leadershipTeamList/LeadershipTeamListBlock'
import MoreThanAWorkplaceBlock from './moreThanAWorkplace/MoreThanAWorkplaceBlock'
import PlanInfoDesignBlock from './planInfoDesign/PlanInfoDesignBlock'
import ShantaFootPrintBlock from './shantaFootprint/ShantaFootPrintBlock'
import ShantaMilestoneUnlockedBlock from './shantaMilestoneUnlocked/ShantaMilestoneUnlockedBlock'
import ShantaVisionBlock from './shantaVision/ShantaVisionBlock'
import ValuesThatShapeUsBlock from './valuesThatShapeUs/ValuesThatShapeUsBlock'
import PlanInfoDesign03Block from './planInfoDesign03/PlanInfoDesign03Block'
import APPDBlock from './APPD/APPDBlock'
import PlanInfoDesign04Block from './planInfoDesign04/PlanInfoDesign04Block'
import PlanInfoDesign05Block from './planInfoDesign05/PlanInfoDesign05Block'
import BlogsBlock from './blogs/BlogsBlock'
import BlockDetailsBlock from './blogDetails/BlockDetailsBlock'

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

    //BOD page
    case BOD_PAGE_BOARD_OF_DIRECTORS_List_SLUG_AND_TAG:
      return <BoardOfDirectorsListBlock key={block.id} block={block} params={params} />

    //leadership team page
    case LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG:
      return <LeadershipTeamListBlock key={block.id} block={block} params={params} />

    // contact us form
    case CONTACT_US_BLOCK_SLUG_AND_TAG:
      return <ContactUsBlock key={block.id} block={block} params={params} />

    // corporate page
    case CORPORATE_INTRO_SLUG_AND_TAG:
      return <CorporateIntroBlock key={block.id} block={block} params={params} />
    case CORPORATE_INFO_SLUG_AND_TAG:
      return <CorporateInfoBlock key={block.id} block={block} params={params} />
    case CORPORATE_PARTNERS_SLUG_AND_TAG:
      return <CorporatePartnersBlock key={block.id} block={block} params={params} />

    // custom card section
    case CUSTOM_CARD_SECTION_SLUG_AND_TAG:
      return <CustomCardSectionBlock key={block.id} block={block} params={params} />

    // add on info
    case EMPLOYEE_WELLNESS_ADDONS_INFO_SLUG_AND_TAG:
      return <AddonsInfoBlock key={block.id} block={block} params={params} />

    // plan info design
    case PLAN_INFO_DESIGN_SLUG_AND_TAG:
      return <PlanInfoDesignBlock key={block.id} block={block} params={params} />

    // plan info design
    case PLAN_INFO_DESIGN_03_SLUG_AND_TAG:
      return <PlanInfoDesign03Block key={block.id} block={block} params={params} />
    // plan info design
    case PLAN_INFO_DESIGN_04_SLUG_AND_TAG:
      return <PlanInfoDesign04Block key={block.id} block={block} params={params} />
    // plan info design
    case PLAN_INFO_DESIGN_05_SLUG_AND_TAG:
      return <PlanInfoDesign05Block key={block.id} block={block} params={params} />

    // APPD
    case APPD_BLOCK_SLUG_AND_TAG:
      return <APPDBlock key={block.id} block={block} params={params} />

    // news and media
    case BLOGS_SLUG_AND_TAG:
      return <BlogsBlock key={block.id} block={block} params={params} />
    case BLOGS_DETAILS_SLUG_AND_TAG:
      return <BlockDetailsBlock key={block.id} block={block} params={params} />

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
