import {
  ABOUT_US_INTRO_SLUG_AND_TAG,
  BASIC_HERO_SLUG_AND_TAG,
  BOOK_A_CALL_SLUG_AND_TAG,
  CODING_LANGUAGE_SLUG_AND_TAG,
  COLLABORATIVE_METHOD_SLUG_AND_TAG,
  COMPANY_INFO_SLUG_AND_TAG,
  COMPANY_INTRO_SLUG_AND_TAG,
  COMPANY_STATS_SLUG_AND_TAG,
  CONTACT_INFO_SLUG_AND_TAG,
  CONTACT_US_SLUG_AND_TAG,
  CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG,
  CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG,
  CS_DELIVERY_SLUG_AND_TAG,
  CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG,
  EMPLOYEE_SLUG_AND_TAG,
  FAQ_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  LOCATION_SLUG_AND_TAG,
  MAINTENANCE_SLUG_AND_TAG,
  OUR_PROJECT_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INFO_SLUG_AND_TAG,
  PRODUCTION_PIPELINE_SLUG_AND_TAG,
  PROJECT_APPROACH_SLUG_AND_TAG,
  RATING_SLUG_AND_TAG,
  WHY_CHOOSE_US_SLUG_AND_TAG,
} from '@/lib/constants'

import type { Page as PayloadPage } from '@/payload-types'
import BasicHeroBlock from './BasicHero/BasicHeroBlock'
import ProductHeroBlock from './ProductHero/ProductHeroBlock'
import CompanyInfoBlock from './CompanyInfo/CompanyInfoBlock'
import CompanyIntroBlock from './CompanyIntro/CompanyIntroBlock'
import ProjectApproachBlock from './ProjectApproach/ProjectApproachBlock'
import CodingLanguageBlock from './CodingLanguage/CodingLanguageBlock'
import FounderQuoteBlock from './FounderQuote/FounderQuoteBlock'
import ProductInfoBlock from './ProductInfo/ProductInfoBlock'
import ContactUsBlock from './ContactUs/ContactUsBlock'
import CompanyStatsBlock from './CompanyStats/CompanyStatsBlock'
import EmplyeeBlock from './Employee/EmplyeeBlock'
import FAQBlock from './FAQ/FAQBlock'
import AboutUsIntroBlock from './AboutUsIntro/AboutUsIntroBlock'
import OurProjectBlock from './OurProject/OurProjectBlock'
import CS_Collaborative_MobbingBlock from './CS_Collaborative_Mobbing/CS_Collaborative_MobbingBlock'
import CS_CollaborationProtocalBlock from './CS_CollaborationProtocal/CS_CollaborationProtocalBlock'
import CS_DeliveryBlock from './CS_Delivery/CS_DeliveryBlock'
import BookACallBlock from './BookACall/BookACallBlock'
import ContactInfoBlock from './ContactInfo/ContactInfoBlock'
import CompanyLocationBlock from './CompanyLocation/CompanyLocationBlock'
import RatingBlock from './Rating/RatingBlock'
import CS_DevelopmentFrameworkBlock from './CS_DevelopmentFramework/CS_DevelopmentFrameworkBlock'
import MaintainanceBlock from './Maintainance/MaintainanceBlock'
import CollaborativeMethodBlock from './CollaborativeMethod/CollaborativeMethodBlock'
import WhyChooseUsBlock from './WhyChooseUs/WhyChooseUsBlock'
import ProductionPipelineBlock from './ProductionPipeline/ProductionPipelineBlock'

type Params = Record<string, string>

export function renderBlock(block: PayloadPage['layout'][0], params: Params) {
  switch (block.blockType) {
    case BASIC_HERO_SLUG_AND_TAG:
      return <BasicHeroBlock key={block.id} block={block} params={params} />
    // case PRODUCT_HERO_SLUG_AND_TAG:
    //   return <ProductHeroBlock key={block.id} block={block} params={params} />
    case COMPANY_INFO_SLUG_AND_TAG:
      return <CompanyInfoBlock key={block.id} block={block} params={params} />
    case COMPANY_INTRO_SLUG_AND_TAG:
      return <CompanyIntroBlock key={block.id} block={block} params={params} />
    case PROJECT_APPROACH_SLUG_AND_TAG:
      return <ProjectApproachBlock key={block.id} block={block} params={params} />
    case CODING_LANGUAGE_SLUG_AND_TAG:
      return <CodingLanguageBlock key={block.id} block={block} params={params} />
    case FOUNDER_QUOTE_SLUG_AND_TAG:
      return <FounderQuoteBlock key={block.id} block={block} params={params} />
    case PRODUCT_INFO_SLUG_AND_TAG:
      return <ProductInfoBlock key={block.id} block={block} params={params} />
    case CONTACT_US_SLUG_AND_TAG:
      return <ContactUsBlock key={block.id} block={block} params={params} />
    case COMPANY_STATS_SLUG_AND_TAG:
      return <CompanyStatsBlock key={block.id} block={block} params={params} />
    case EMPLOYEE_SLUG_AND_TAG:
      return <EmplyeeBlock key={block.id} block={block} params={params} />
    case FAQ_SLUG_AND_TAG:
      return <FAQBlock key={block.id} block={block} params={params} />
    case ABOUT_US_INTRO_SLUG_AND_TAG:
      return <AboutUsIntroBlock key={block.id} block={block} params={params} />
    case OUR_PROJECT_SLUG_AND_TAG:
      return <OurProjectBlock key={block.id} block={block} params={params} />
    case CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG:
      return <CS_Collaborative_MobbingBlock key={block.id} block={block} params={params} />
    case CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG:
      return <CS_CollaborationProtocalBlock key={block.id} block={block} params={params} />
    case CS_DELIVERY_SLUG_AND_TAG:
      return <CS_DeliveryBlock key={block.id} block={block} params={params} />
    case BOOK_A_CALL_SLUG_AND_TAG:
      return <BookACallBlock key={block.id} block={block} params={params} />
    case CONTACT_INFO_SLUG_AND_TAG:
      return <ContactInfoBlock key={block.id} block={block} params={params} />
    case LOCATION_SLUG_AND_TAG:
      return <CompanyLocationBlock key={block.id} block={block} params={params} />
    case RATING_SLUG_AND_TAG:
      return <RatingBlock key={block.id} block={block} params={params} />
    case CS_DEVELOPMENT_FRAMEWORK_SLUG_AND_TAG:
      return <CS_DevelopmentFrameworkBlock key={block.id} block={block} params={params} />
    case MAINTENANCE_SLUG_AND_TAG:
      return <MaintainanceBlock key={block.id} block={block} params={params} />
    case COLLABORATIVE_METHOD_SLUG_AND_TAG:
      return <CollaborativeMethodBlock key={block.id} block={block} params={params} />
    case WHY_CHOOSE_US_SLUG_AND_TAG:
      return <WhyChooseUsBlock key={block.id} block={block} params={params} />
    case PRODUCTION_PIPELINE_SLUG_AND_TAG:
      return <ProductionPipelineBlock key={block.id} block={block} params={params} />
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
