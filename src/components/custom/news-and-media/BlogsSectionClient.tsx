'use client'
import { GlobalBlog } from '@/payload-types'
import { AllBlogsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'
import HashScroller from './HashScroller'
import AllNewsSection from './AllNewsSection'
import SearchNews from './SearchNews'
import NoDataFound from '../shared/NoDataFound'
import { BLOGS_BLOCK_LABEL } from '@/lib/constants'

type Props = {
  data: GlobalBlog
  block: AllBlogsSectionType
}
function BlogsSectionClient({ data, block }: Props) {
  const blogsData = data?.blogs?.filter((blog) => blog?.category === 'blog')

  return (
    <>
      {blogsData && blogsData?.length > 0 ? (
        <div
          id={block?.sectionId}
          style={{
            backgroundColor: block?.backgroundColor || '',
          }}
        >
          <HashScroller blogSectionId={block?.sectionId} />
          <SearchNews paddingOn block={block} allContent={data?.blogs} />
          <AllNewsSection allNewsData={blogsData} block={block} />
        </div>
      ) : (
        <NoDataFound
          message="No Blog Data Found"
          description={`In the admin panel, open the “${BLOGS_BLOCK_LABEL}” block and give some blog data.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </>
  )
}

export default BlogsSectionClient
