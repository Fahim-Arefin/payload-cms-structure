import { GlobalBlog } from '@/payload-types'
import { AllNewsSectionType } from '@/types/payloadCustomTypes'
import AllNewsAccordianSection from '@/components/custom/news-and-media/AllNewsAccordianSection'
import React from 'react'
import HashScroller from './HashScroller'

type Props = {
  data: GlobalBlog
  block: AllNewsSectionType
}

function NewsSectionClient({ data, block }: Props) {
  const newsData = data?.blogs?.filter((blog) => blog?.category === 'news')
  return (
    <div
      id={block?.sectionId}
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      <HashScroller newsSectionId={block?.sectionId} />
      <AllNewsAccordianSection allNewsData={newsData} allContent={data?.blogs} block={block} />
    </div>
  )
}

export default NewsSectionClient
