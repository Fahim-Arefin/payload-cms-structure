import {
  ALL_NEWS_SLUG_AND_TAG,
  BASIC_HERO_SLUG_AND_TAG,
  CONTACT_INFO_CARD_SLUG_AND_TAG,
  CUSTOMER_FEEDBACK_SLUG_AND_TAG,
  FEEDBACK_FORM_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  GET_TO_KNOW_SLUG_AND_TAG,
  MISSION_VISION_SLUG_AND_TAG,
  OFFICE_ADDRESS_SLUG_AND_TAG,
  PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG,
  PRODUCT_ADVANTAGE_CARD_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INFO_01_SLUG_AND_TAG,
  PRODUCT_INFO_02_SLUG_AND_TAG,
  PRODUCT_INFO_03_SLUG_AND_TAG,
  PRODUCT_INFO_04_SLUG_AND_TAG,
  PRODUCT_INTRO_SLUG_AND_TAG,
  QUALITY_BENCHMARK_CARD_SLUG_AND_TAG,
  QUERIES_SLUG_AND_TAG,
  QUERY_FORM_SLUG_AND_TAG,
  RESULT_CARD_SLUG_AND_TAG,
  SAGAR_BLOGS_SLUG_AND_TAG,
  SAGAR_VIDEOS_SLUG_AND_TAG,
  SINGLE_NEWS_SLUG_AND_TAG,
  TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG,
  TECHNICAL_SPECIFICATIONS_SLUG_AND_TAG,
  TESTING_PILLARS_SLUG_AND_TAG,
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

export type ProductInfo01BlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_INFO_01_SLUG_AND_TAG }
>

export type PerformanceAndApplicationCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PERFORMANCE_AND_APPLICATION_CARD_SLUG_AND_TAG }
>

export type TechnicalDatasheetCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof TECHNICAL_DATASHHEET_CARD_SLUG_AND_TAG }
>

export type QualityBenchmarkCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof QUALITY_BENCHMARK_CARD_SLUG_AND_TAG }
>

export type ContactInfoCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CONTACT_INFO_CARD_SLUG_AND_TAG }
>

export type FounderQuoteBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof FOUNDER_QUOTE_SLUG_AND_TAG }
>

export type ResultCardBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof RESULT_CARD_SLUG_AND_TAG }
>

export type SagarVideosBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof SAGAR_VIDEOS_SLUG_AND_TAG }
>

export type ProductInfo02BlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_INFO_02_SLUG_AND_TAG }
>

export type ProductInfo03BlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_INFO_03_SLUG_AND_TAG }
>

export type ProductInfo04BlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_INFO_04_SLUG_AND_TAG }
>

export type OfficeAddressBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof OFFICE_ADDRESS_SLUG_AND_TAG }
>

export type FeedbackFormBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof FEEDBACK_FORM_SLUG_AND_TAG }
>

export type QueryFormBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof QUERY_FORM_SLUG_AND_TAG }
>

export type CustomerfeedbackBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CUSTOMER_FEEDBACK_SLUG_AND_TAG }
>

export type TestingPillarsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof TESTING_PILLARS_SLUG_AND_TAG }
>

export type AllNewsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ALL_NEWS_SLUG_AND_TAG }
>

export type SingleNewsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof SINGLE_NEWS_SLUG_AND_TAG }
>

export type SagarBlogBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof SAGAR_BLOGS_SLUG_AND_TAG }
>
