import {
  CARD_BENEFITS_SLUG_AND_TAG,
  CARD_INFO_SLUG_AND_TAG,
  INTRO_HERO_SLUG_AND_TAG,
} from '@/lib/constants'
import { Page } from '@/payload-types'

export type CardBenefitsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CARD_BENEFITS_SLUG_AND_TAG }
>

export type IntroHeroBlockType = Extract<
  Page['layout'][number],
  {
    blockType: typeof INTRO_HERO_SLUG_AND_TAG
  }
>
export type CardInfoBlockType = Extract<
  Page['layout'][number],
  {
    blockType: typeof CARD_INFO_SLUG_AND_TAG
  }
>
