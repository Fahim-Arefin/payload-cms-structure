import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { Article, ArticleTag } from '@/payload-types'
import { AllArticlesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ArticleTab from './ArticleTab'

type Props = {
  block: AllArticlesBlockType
  data: Article
  tagsData: ArticleTag
}

function AllArticlesClient({ block, data, tagsData }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[60px]
      "
    >
      <SectionHeading01 data={block?.sectionHeading} align="middle" />
      <ArticleTab data={data} tagsData={tagsData} block={block} />
    </div>
  )
}

export default AllArticlesClient
