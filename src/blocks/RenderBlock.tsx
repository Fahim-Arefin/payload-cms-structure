import { INTRO_HERO_SLUG_AND_TAG } from '@/lib/constants'
import type { Page as PayloadPage } from '@/payload-types'
import IntroHeroBlock from './IntroHeroBlock/IntroHeroBlock'

type Params = Record<string, string>

export function renderBlock(block: PayloadPage['layout'][0], params: Params) {
  switch (block.blockType) {
    case INTRO_HERO_SLUG_AND_TAG:
      return <IntroHeroBlock key={block.id} block={block} params={params} />
    // case BASIC_HERO_SLUG_AND_TAG:
    //   return <BasicHeroBlock key={block.id} block={block} params={params} />

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
