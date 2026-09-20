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

export function renderBlock(
  block: PayloadPage['layout'][0],
  params: Params,
  anchorKeys: string[] = [],
) {
  switch (block.blockType) {
    case CARD_PRIVILEGES_SLUG_AND_TAG:
      return <CardPrivilegesBlock key={block.id} block={block} anchorKeys={anchorKeys} />
    case CARD_BENEFITS_SLUG_AND_TAG:
      return <CardBenefitsBlock key={block.id} block={block} />
    case INTRO_HERO_SLUG_AND_TAG:
      return <IntroHeroBlock key={block.id} block={block} params={params} />
    case CARD_INFO_SLUG_AND_TAG:
      return <CardInfoBlock key={block.id} block={block} params={params} anchorKeys={anchorKeys} />

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
  const infoCards = cardInfo?.cards ?? []
  const world = infoCards.find((card) => card.legacyCardType === 'worldElite')
  const visa = infoCards.find((card) => card.legacyCardType === 'visaInfinite')
  const defaultCard =
    infoCards.find((card) => card.cardKey === cardInfo?.defaultCardKey) ?? infoCards[0]
  // Existing Card Info anchors keep their navigation targets. New card keys get
  // an anchor at the first Privileges block that defines them, without duplicate IDs.
  const claimedAnchors = new Set<string>()
  const infoAnchors = new Map<PayloadPage['layout'][number], string[]>()
  for (const block of layout ?? []) {
    if ('sectionSettings' in block && block.sectionSettings?.sectionId) {
      claimedAnchors.add(block.sectionSettings.sectionId)
    }
  }
  for (const block of layout ?? []) {
    if (block.blockType === CARD_INFO_SLUG_AND_TAG) {
      const keys: string[] = []
      for (const card of block.cards ?? []) {
        if (card.cardKey && !claimedAnchors.has(card.cardKey)) {
          claimedAnchors.add(card.cardKey)
          keys.push(card.cardKey)
        }
      }
      infoAnchors.set(block, keys)
    }
  }
  const blocks = layout?.map((block) => {
    const anchorKeys: string[] = infoAnchors.get(block) ?? []
    if (block.blockType === CARD_PRIVILEGES_SLUG_AND_TAG) {
      for (const card of block.cards ?? []) {
        if (card.cardKey && !claimedAnchors.has(card.cardKey)) {
          claimedAnchors.add(card.cardKey)
          anchorKeys.push(card.cardKey)
        }
      }
    }
    return renderBlock(block, params, anchorKeys)
  })

  return (
    <ActiveCardProvider
      key={cardInfo?.id ?? 'page-cards'}
      worldSectionId={world?.cardKey}
      visaSectionId={visa?.cardKey}
      defaultCard={defaultCard?.legacyCardType ?? 'worldElite'}
    >
      {blocks}
    </ActiveCardProvider>
  )
}
