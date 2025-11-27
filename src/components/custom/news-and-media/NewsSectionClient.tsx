'use client'
import { GlobalBlog } from '@/payload-types'
import { AllNewsSectionType } from '@/types/payloadCustomTypes'
import AllNewsAccordianSection from '@/components/custom/news-and-media/AllNewsAccordianSection'
import React from 'react'
import HashScroller from './HashScroller'
import NoDataFound from '../shared/NoDataFound'
import { BLOGS_BLOCK_LABEL } from '@/lib/constants'

type Props = {
  data: GlobalBlog
  block: AllNewsSectionType
}

function NewsSectionClient({ data, block }: Props) {
  const newsData = data?.blogs?.filter((blog) => blog?.category === 'news')
  return (
    <>
      {newsData && newsData?.length > 0 ? (
        <div
          id={block?.sectionId}
          style={{
            backgroundColor: block?.backgroundColor || '',
          }}
        >
          <HashScroller newsSectionId={block?.sectionId} />
          <AllNewsAccordianSection allNewsData={newsData} allContent={data?.blogs} block={block} />
        </div>
      ) : (
        <NoDataFound
          message="No News Data Found"
          description={`In the admin panel, open the “${BLOGS_BLOCK_LABEL}” block and give some News data.`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </>
  )
}

export default NewsSectionClient
