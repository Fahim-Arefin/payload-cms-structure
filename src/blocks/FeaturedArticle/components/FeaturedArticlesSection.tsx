import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { Article } from '@/payload-types'
import { FeaturedArticleBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FeaturedArticleCarousal from './FeaturedArticleCarousal'

type Props = {
  block: FeaturedArticleBlockType
  FeturedArticles: Article['articles']
}

function FeaturedArticlesSection({ block, FeturedArticles }: Props) {
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
      <FeaturedArticleCarousal featuredArticle={FeturedArticles} block={block} />
    </div>
  )
}

export default FeaturedArticlesSection
