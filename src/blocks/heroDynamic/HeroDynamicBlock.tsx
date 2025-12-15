import { HeroDynamicBlockType } from '@/types/payloadCustomTypes'
import HeroDynamicClient from './HeroDynamicClient'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GlobalBlog } from '@/payload-types'
import { GLOBAL_BLOGS_SLUG_AND_TAG, HERO_DYNAMIC_SLUG_AND_TAG } from '@/lib/constants'

type Props = {
  block: HeroDynamicBlockType
  params: Record<string, string>
}

async function HeroDynamicBlock({ block }: Props) {
  const data = await getGlobalCached<GlobalBlog>(
    GLOBAL_BLOGS_SLUG_AND_TAG,
    2,
    HERO_DYNAMIC_SLUG_AND_TAG,
  )

  return <HeroDynamicClient data={block} globalBlogData={data} />
}

export default HeroDynamicBlock
