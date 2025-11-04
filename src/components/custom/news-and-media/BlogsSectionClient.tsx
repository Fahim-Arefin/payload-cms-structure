import { GlobalBlog } from '@/payload-types'
import { AllBlogsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'
import HashScroller from './HashScroller'
import AllNewsSection from './AllNewsSection'
import SearchNews from './SearchNews'

type Props = {
  data: GlobalBlog
  block: AllBlogsSectionType
}
function BlogsSectionClient({ data, block }: Props) {
  return (
    <div
      id={block?.sectionId}
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      <HashScroller blogSectionId={block?.sectionId} />
      <SearchNews paddingOn block={block} allContent={data?.blogs} />
      <AllNewsSection allNewsData={data?.blogs} block={block} />
    </div>
  )
}

export default BlogsSectionClient
