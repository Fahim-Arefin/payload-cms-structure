import AllNewsClientCard from '@/blocks/AllNews/components/AllNewsClientCard'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { News } from '@/payload-types'
import { SingleNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type NewsItem = NonNullable<News['newsItems']>[number] & {
  category?: {
    label?: string
    key?: string
  } | null
  tag?: {
    label?: string
    key?: string
  } | null
}

type Props = {
  block: SingleNewsBlockType
  data: NewsItem
}

function SingleNewsClient({ block, data }: Props) {
  console.log(block)
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding w-full lg:w-[70%] mx-auto">
        <AllNewsClientCard key={data?.id} item={data} block={block} detailsPage />
      </div>
    </WithHashScroller>
  )
}

export default SingleNewsClient
