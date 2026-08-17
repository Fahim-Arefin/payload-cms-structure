import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  GLOBAL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
  RELATED_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'
import { News, NewsTag } from '@/payload-types'
import { RelatedNewsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import RelatedNewsCarousel from './RelatedNewsCarousel'

type Props = {
  block: RelatedNewsBlockType
  id: string
}

type NewsItem = NonNullable<News['news']>[number]

type TagRuntime = {
  id?: string | null
  label?: string | null
  key?: string | null
}

function getNewsTagKeys(newsItem?: NewsItem | null) {
  const newsAny = newsItem as any

  if (Array.isArray(newsAny?.tagKeys)) {
    return newsAny.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
  }

  if (Array.isArray(newsAny?.tags)) {
    return newsAny.tags.map((tag: TagRuntime) => String(tag?.key ?? '').trim()).filter(Boolean)
  }

  return []
}

function getNewsSortTime(newsItem?: NewsItem | null) {
  const date = new Date(newsItem?.publishDate || '')

  if (Number.isNaN(date.getTime())) return 0

  return date.getTime()
}

function getRelatedNews(newsItems: NewsItem[], selectedNews: NewsItem) {
  const selectedTagKeys = getNewsTagKeys(selectedNews)

  if (!selectedTagKeys.length) return []

  const selectedTagKeySet = new Set(selectedTagKeys)

  return newsItems
    .filter((newsItem) => newsItem?.id && newsItem.id !== selectedNews?.id)
    .map((newsItem, index) => {
      const newsTagKeys = getNewsTagKeys(newsItem)
      const matchCount = newsTagKeys.filter((key: string) => selectedTagKeySet.has(key)).length

      return {
        newsItem,
        index,
        matchCount,
      }
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount

      const bTime = getNewsSortTime(b.newsItem)
      const aTime = getNewsSortTime(a.newsItem)

      if (bTime !== aTime) return bTime - aTime

      return b.index - a.index
    })
    .map((item) => item.newsItem)
}

function getLatestFallbackNews(newsItems: NewsItem[], selectedNews: NewsItem) {
  return newsItems
    .filter((newsItem) => newsItem?.id && newsItem.id !== selectedNews?.id)
    .map((newsItem, index) => ({
      newsItem,
      index,
    }))
    .sort((a, b) => {
      const bTime = getNewsSortTime(b.newsItem)
      const aTime = getNewsSortTime(a.newsItem)

      if (bTime !== aTime) return bTime - aTime

      return b.index - a.index
    })
    .slice(0, 6)
    .map((item) => item.newsItem)
}

async function RelatedNewsServer({ block, id }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'

  const [newsData, newsTagsData] = await Promise.all([
    getGlobalCached<News>(GLOBAL_NEWS_SLUG_AND_TAG, 2, RELATED_NEWS_SLUG_AND_TAG),
    getGlobalCached<NewsTag>(GLOBAL_NEWS_TAGS_SLUG_AND_TAG, 1, RELATED_NEWS_SLUG_AND_TAG),
  ])

  const newsItems = Array.isArray(newsData?.news) ? newsData.news : []
  const selectedNews = newsItems.find((item) => item?.id === id)

  if (!newsItems.length) {
    return (
      <NoDataFound
        message="No Data Found"
        description={`Please fill up Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
        bgColor={bgColor}
      />
    )
  }

  if (!selectedNews) {
    return (
      <NoDataFound
        message="Please Give Valid Slug"
        description={`This slug item does not exist in your Global '${GLOBAL_NEWS_SLUG_AND_TAG}' collection data`}
        bgColor={bgColor}
      />
    )
  }

  const sameTagRelatedNews = getRelatedNews(newsItems, selectedNews)

  const relatedNews =
    sameTagRelatedNews.length > 0
      ? sameTagRelatedNews
      : getLatestFallbackNews(newsItems, selectedNews)

  if (!relatedNews.length) {
    return (
      <NoDataFound
        message="No Related News Found"
        description="No related news items were found. Add more news items in the global News collection."
        bgColor={bgColor}
      />
    )
  }

  return (
    <section
      className="
        container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[60px]
      "
    >
      <SectionHeading01 data={block?.sectionHeading} align="middle" />

      <RelatedNewsCarousel block={block} newsItems={relatedNews} tagsData={newsTagsData} />
    </section>
  )
}

export default RelatedNewsServer
