import {
  BASIC_HERO_SLUG_AND_TAG,
  GET_TO_KNOW_SLUG_AND_TAG,
  MISSION_VISION_SLUG_AND_TAG,
  PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INTRO_SLUG_AND_TAG,
  QUERIES_SLUG_AND_TAG,
  TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG,
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

export type ProductIntroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_INTRO_SLUG_AND_TAG }
>

export type MissionVisionBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof MISSION_VISION_SLUG_AND_TAG }
>

export type ProductAdvantageCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG }
>

export type TechnicalSpecificationBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG }
>

export type QueriesBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof QUERIES_SLUG_AND_TAG }
>
