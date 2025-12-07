import { BlogDetailsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'
import NoDataFound from '../shared/NoDataFound'
import {
  BLOGS_DETAILS_SLUG_AND_TAG,
  GLOBAL_BLOGS_BLOCK_LABEL,
  GLOBAL_BLOGS_SLUG_AND_TAG,
} from '@/lib/constants'
import { GlobalBlog } from '@/payload-types'
import { getGlobalCached } from '@/lib/cachedGlobals'
import BlogDetailsClientSection from './BlogDetailsClientSection'

type Props = {
  block: BlogDetailsSectionType
  params: string
}

async function BlogDetailsServerSection({ block, params }: Props) {
  const data = await getGlobalCached<GlobalBlog>(
    GLOBAL_BLOGS_SLUG_AND_TAG,
    2,
    BLOGS_DETAILS_SLUG_AND_TAG,
  )
  const findItem = data?.blogs?.find((item, _) => item?.id === params)
  return (
    <div>
      {data && data?.blogs && data?.blogs?.length > 0 ? (
        findItem ? (
          <BlogDetailsClientSection data={findItem} block={block} />
        ) : (
          <NoDataFound
            message="Please Give Valid Slug"
            description={`This slug item is not exits in your Global ${GLOBAL_BLOGS_BLOCK_LABEL} collection data`}
            bgColor={block?.backgroundColor || ''}
          />
        )
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

export default BlogDetailsServerSection
