import {
  BASIC_HERO_SLUG_AND_TAG,
  CODING_LANGUAGE_SLUG_AND_TAG,
  COMPANY_INFO_SLUG_AND_TAG,
  COMPANY_INTRO_SLUG_AND_TAG,
  COMPANY_STATS_SLUG_AND_TAG,
  CONTACT_US_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INFO_SLUG_AND_TAG,
  PROJECT_APPROACH_SLUG_AND_TAG,
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

type Params = Record<string, string>

export function renderBlock(block: PayloadPage['layout'][0], params: Params) {
  switch (block.blockType) {
    case BASIC_HERO_SLUG_AND_TAG:
      return <BasicHeroBlock key={block.id} block={block} params={params} />
    case PRODUCT_HERO_SLUG_AND_TAG:
      return <ProductHeroBlock key={block.id} block={block} params={params} />
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
