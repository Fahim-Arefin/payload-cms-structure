import { GlobalBlog } from '@/payload-types'
import { BlogDetailsSectionType } from '@/types/payloadCustomTypes'
import React from 'react'
import NewsDetailsSection from './NewsDetailsSection'

type Props = {
  data: GlobalBlog['blogs'][number]
  block: BlogDetailsSectionType
}

function BlogDetailsClientSection({ data, block }: Props) {
  return (
    <div>
      <NewsDetailsSection data={data} block={block} />
    </div>
  )
}

export default BlogDetailsClientSection
