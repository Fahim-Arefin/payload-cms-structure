import {
  ABOUT_US_INTRO_SLUG_AND_TAG,
  BASIC_HERO_SLUG_AND_TAG,
  BOOK_A_CALL_SLUG_AND_TAG,
  CLIENT_SUCCESS_STORIES_SLUG_AND_TAG,
  CODING_LANGUAGE_SLUG_AND_TAG,
  COMPANY_INFO_SLUG_AND_TAG,
  COMPANY_INTRO_SLUG_AND_TAG,
  COMPANY_STATS_SLUG_AND_TAG,
  CONTACT_INFO_SLUG_AND_TAG,
  CONTACT_US_SLUG_AND_TAG,
  CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG,
  CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG,
  CS_DELIVERY_SLUG_AND_TAG,
  EMPLOYEE_SLUG_AND_TAG,
  FAQ_SLUG_AND_TAG,
  FOUNDER_QUOTE_SLUG_AND_TAG,
  LOCATION_SLUG_AND_TAG,
  OUR_PROJECT_SLUG_AND_TAG,
  PRODUCT_HERO_SLUG_AND_TAG,
  PRODUCT_INFO_SLUG_AND_TAG,
  PROJECT_APPROACH_SLUG_AND_TAG,
  RATING_SLUG_AND_TAG,
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

export type ProductInfoBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof PRODUCT_INFO_SLUG_AND_TAG }
>

export type ContactUsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CONTACT_US_SLUG_AND_TAG }
>
export type ClientSuccessStoriesBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CLIENT_SUCCESS_STORIES_SLUG_AND_TAG }
>

export type CompanyStatsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof COMPANY_STATS_SLUG_AND_TAG }
>

export type EmployeeBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof EMPLOYEE_SLUG_AND_TAG }
>

export type FAQBlockType = Extract<Page['layout'][number], { blockType: typeof FAQ_SLUG_AND_TAG }>

export type AboutUsIntroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof ABOUT_US_INTRO_SLUG_AND_TAG }
>

export type OurProjectBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof OUR_PROJECT_SLUG_AND_TAG }
>

export type CS_Collaborative_MobbingBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CS_COLLABORATIVE_MOBBING_SLUG_AND_TAG }
>

export type CS_CollaborationProtocalBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CS_COLLABORATION_PROTOCAL_SLUG_AND_TAG }
>

export type CS_DeliveryBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CS_DELIVERY_SLUG_AND_TAG }
>

export type BookACallBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof BOOK_A_CALL_SLUG_AND_TAG }
>

export type ContactInfoBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof CONTACT_INFO_SLUG_AND_TAG }
>

export type LocationBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof LOCATION_SLUG_AND_TAG }
>
export type RatingBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof RATING_SLUG_AND_TAG }
>
