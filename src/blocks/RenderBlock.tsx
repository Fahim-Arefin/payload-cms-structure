import {
  BASIC_HERO_SLUG_AND_TAG,
  GET_TO_KNOW_SLUG_AND_TAG,
  MISSION_VISION_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INTRO_SLUG_AND_TAG,
} from '@/lib/constants'

import type { Page as PayloadPage } from '@/payload-types'
import BasicHeroBlock from './BasicHero/BasicHeroBlock'
import ProductHeroBlock from './ProductHero/ProductHeroBlock'
import GetToKnowBlock from './GetToKnow/GetToKnowBlock'
import ProductIntroBlock from './ProductIntro/ProductIntroBlock'
import MissionVisionBlock from './MissionVision/MissionVisionBlock'

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
