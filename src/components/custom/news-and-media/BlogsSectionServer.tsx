import React from 'react'
import NoDataFound from '../shared/NoDataFound'
import { AllBlogsSectionType } from '@/types/payloadCustomTypes'
import {
  BLOGS_SLUG_AND_TAG,
  GLOBAL_BLOGS_BLOCK_LABEL,
  GLOBAL_BLOGS_SLUG_AND_TAG,
} from '@/lib/constants'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GlobalBlog } from '@/payload-types'
import BlogsSectionClient from './BlogsSectionClient'

type Props = {
  block: AllBlogsSectionType
}

async function BlogsSectionServer({ block }: Props) {
  const data = await getGlobalCached<GlobalBlog>(GLOBAL_BLOGS_SLUG_AND_TAG, 2, BLOGS_SLUG_AND_TAG)
  return (
    <div>
      {data && data?.blogs && data?.blogs?.length > 0 ? (
        <BlogsSectionClient data={data} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up Global ${GLOBAL_BLOGS_BLOCK_LABEL} collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default BlogsSectionServer
