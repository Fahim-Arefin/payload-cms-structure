import {
  BASIC_HERO_SLUG_AND_TAG,
  CODING_LANGUAGE_SLUG_AND_TAG,
  COMPANY_INFO_SLUG_AND_TAG,
  COMPANY_INTRO_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PROJECT_APPROACH_SLUG_AND_TAG,
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

export type CompanyInfoBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof COMPANY_INFO_SLUG_AND_TAG }
>

export type CompanyIntroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof COMPANY_INTRO_SLUG_AND_TAG }
>

export type ProjectApproachBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PROJECT_APPROACH_SLUG_AND_TAG }
>

export type CodingLanguageBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CODING_LANGUAGE_SLUG_AND_TAG }
>

export type FounderQuoteBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof FOUNDER_QUOTE_SLUG_AND_TAG }
>
