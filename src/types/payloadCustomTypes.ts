import {
  BASIC_HERO_SLUG_AND_TAG,
  GET_TO_KNOW_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
} from '@/lib/constants'
import { Page } from '@/payload-types'

export type BasicHeroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof BASIC_HERO_SLUG_AND_TAG }
>

export type ProductHeroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_HERO_SLUG_AND_TAG }
>

export type GetToKnowBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof GET_TO_KNOW_SLUG_AND_TAG }
>
