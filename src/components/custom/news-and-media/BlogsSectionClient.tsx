'use client'
import { GLOBAL_BLOGS_BLOCK_LABEL } from '@/lib/constants'
import { GlobalBlog } from '@/payload-types'
import { AllBlogsSectionType } from '@/types/payloadCustomTypes'
import NoDataFound from '../shared/NoDataFound'
import AllNewsSection from './AllNewsSection'
import HashScroller from './HashScroller'
import SearchNews from './SearchNews'

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
          message="No Blog Category Found"
          description={`In the admin panel, open the Global “${GLOBAL_BLOGS_BLOCK_LABEL}” collection and give some Blogs data.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </>
  )
}

export default BlogsSectionClient
