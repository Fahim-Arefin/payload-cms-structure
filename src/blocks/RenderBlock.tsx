import {
  CARD_BENEFITS_SLUG_AND_TAG,
  CARD_PRIVILEGES_SLUG_AND_TAG,
  CARD_INFO_SLUG_AND_TAG,
  INTRO_HERO_SLUG_AND_TAG,
} from '@/lib/constants'
import type { Page as PayloadPage } from '@/payload-types'
import IntroHeroBlock from './IntroHeroBlock/IntroHeroBlock'
import CardInfoBlock from './CardInfo/CardInfoBlock'
import CardBenefitsBlock from './CardBenefits/CardBenefitsBlock'
import CardPrivilegesBlock from './CardCardPrivileges/CardPrivilegesBlock'
import { ActiveCardProvider } from '@/contexts/ActiveCardContext'

type Params = Record<string, string>

export function renderBlock(block: PayloadPage['layout'][0], params: Params) {
  switch (block.blockType) {
    case CARD_PRIVILEGES_SLUG_AND_TAG:
      return <CardPrivilegesBlock key={block.id} block={block} />
    case CARD_BENEFITS_SLUG_AND_TAG:
      return <CardBenefitsBlock key={block.id} block={block} />
    case INTRO_HERO_SLUG_AND_TAG:
      return <IntroHeroBlock key={block.id} block={block} params={params} />
    case CARD_INFO_SLUG_AND_TAG:
      return <CardInfoBlock key={block.id} block={block} params={params} />

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
  const cardInfo = layout?.find((block) => block.blockType === CARD_INFO_SLUG_AND_TAG)
  const selector = cardInfo?.cardSelector

  return (
    <ActiveCardProvider
      key={cardInfo?.id ?? 'page-cards'}
      worldSectionId={selector?.worldElite?.sectionId}
      visaSectionId={selector?.visaInfinite?.sectionId}
      defaultCard={selector?.defaultCard ?? 'worldElite'}
    >
      {layout?.map((b) => renderBlock(b, params))}
    </ActiveCardProvider>
  )
}
