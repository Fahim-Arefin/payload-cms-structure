import { GlobalBlog } from '@/payload-types'
import { AllBlockCardType } from '@/types/payloadCustomTypes'
import React from 'react'
import NewsDetailsSlider from './NewsDetailsSlider'

type Props = {
  data: GlobalBlog
  block: AllBlockCardType
}

function AllBlogsCardClient({ data, block }: Props) {
  return (
    <div>
      <NewsDetailsSlider data={data?.blogs} block={block} />
    </div>
  )
}

export default AllBlogsCardClient
