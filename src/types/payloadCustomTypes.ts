import {
  HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG,
  HOME_PAGE_HERO_SLUG_AND_TAG,
  HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG,
} from '@/lib/constants'
import { Page } from '@/payload-types'

export type HeroBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_HERO_SLUG_AND_TAG }
>
export type WhyChooseUsBlockType = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_WHY_CHOOSE_US_SLUG_AND_TAG }
>

export type FeaturedPlansBlock = Extract<
  Page['layout'][number],
  { blockType: typeof HOME_PAGE_FEATURED_PLANS_SLUG_AND_TAG }
>
