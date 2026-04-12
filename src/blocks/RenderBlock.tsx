import {
  BASIC_HERO_SLUG_AND_TAG,
  CONTACT_INFO_CARD_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  GET_TO_KNOW_SLUG_AND_TAG,
  MISSION_VISION_SLUG_AND_TAG,
  PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
  PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INFO_01_SLUG_AND_TAG,
  PRODUCT_INTRO_SLUG_AND_TAG,
  QUALITY_BENCHMARK_CARD_SLUG_AND_TAG,
  QUERIES_SLUG_AND_TAG,
  RESULT_CARD_SLUG_AND_TAG,
  SAGAR_VIDEOS_SLUG_AND_TAG,
  TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG,
  TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG,
} from '@/lib/constants'

import type { Page as PayloadPage } from '@/payload-types'
import BasicHeroBlock from './BasicHero/BasicHeroBlock'
import ProductHeroBlock from './ProductHero/ProductHeroBlock'
import GetToKnowBlock from './GetToKnow/GetToKnowBlock'
import ProductIntroBlock from './ProductIntro/ProductIntroBlock'
import MissionVisionBlock from './MissionVision/MissionVisionBlock'
import ProductAdvantageCardBlock from './ProductAdvantageCard/ProductAdvantageCardBlock'
import TechnicalSpecificationBlock from './TechnicalSpecification/TechnicalSpecificationBlock'
import QueriesBlock from './Queries/QueriesBlock'
import ProductInfo01Block from './ProductInfo01/ProductInfo01Block'
import PerformanceAndApplicationCardBlock from './PerformanceAndApplicationCard/PerformanceAndApplicationCardBlock'
import TechnicalDatashheetBlock from './TechnicalDatashheet/TechnicalDatashheetBlock'
import QualityBenchmarkCardBlock from './QualityBenchmarkCard/QualityBenchmarkCardBlock'
import ContactInfoCardBlock from './ContactInfoCard/ContactInfoCardBlock'
import FounderQuoteBlock from './FounderQuote/FounderQuoteBlock'
import ResultCardBlock from './ResultCard/ResultCardBlock'
import SagarVideosBlock from './SagarVideos/SagarVideosBlock'

type Params = Record<string, string>

export function renderBlock(block: PayloadPage['layout'][0], params: Params) {
  switch (block.blockType) {
    case BASIC_HERO_SLUG_AND_TAG:
      return <BasicHeroBlock key={block.id} block={block} params={params} />
    case PRODUCT_HERO_SLUG_AND_TAG:
      return <ProductHeroBlock key={block.id} block={block} params={params} />
    case GET_TO_KNOW_SLUG_AND_TAG:
      return <GetToKnowBlock key={block.id} block={block} params={params} />
    case PRODUCT_INTRO_SLUG_AND_TAG:
      return <ProductIntroBlock key={block.id} block={block} params={params} />
    case MISSION_VISION_SLUG_AND_TAG:
      return <MissionVisionBlock key={block.id} block={block} params={params} />
    case PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG:
      return <ProductAdvantageCardBlock key={block.id} block={block} params={params} />
    case TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG:
      return <TechnicalSpecificationBlock key={block.id} block={block} params={params} />
    case QUERIES_SLUG_AND_TAG:
      return <QueriesBlock key={block.id} block={block} params={params} />
    case PRODUCT_INFO_01_SLUG_AND_TAG:
      return <ProductInfo01Block key={block.id} block={block} params={params} />
    case PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG:
      return <PerformanceAndApplicationCardBlock key={block.id} block={block} params={params} />
    case TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG:
      return <TechnicalDatashheetBlock key={block.id} block={block} params={params} />
    case QUALITY_BENCHMARK_CARD_SLUG_AND_TAG:
      return <QualityBenchmarkCardBlock key={block.id} block={block} params={params} />
    case CONTACT_INFO_CARD_SLUG_AND_TAG:
      return <ContactInfoCardBlock key={block.id} block={block} params={params} />
    case FOUNDER_QUOTE_SLUG_AND_TAG:
      return <FounderQuoteBlock key={block.id} block={block} params={params} />
    case RESULT_CARD_SLUG_AND_TAG:
      return <ResultCardBlock key={block.id} block={block} params={params} />
    case SAGAR_VIDEOS_SLUG_AND_TAG:
      return <SagarVideosBlock key={block.id} block={block} params={params} />

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
