import { INTRO_HERO_SLUG_AND_TAG } from '@/lib/constants'
import { Page } from '@/payload-types'

export type IntroHeroBlockType = Extract<
  Page['layout'][number],
  {
    blockType: typeof INTRO_HERO_SLUG_AND_TAG
  }
>
