import NoDataFound from '@/components/custom/shared/NoDataFound'
import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  GLOBAL_ARTICLE_SLUG_AND_TAG,
  GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG,
  RELATED_ARTICLE_SLUG_AND_TAG,
} from '@/lib/constants'
import { Article, ArticleTag } from '@/payload-types'
import { RelatedArticlesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import RelatedArticleCarousel from './RelatedArticleCarousel'

type Props = {
  block: RelatedArticlesBlockType
  id: string
}

type ArticleItem = NonNullable<Article['articles']>[number]

type TagRuntime = {
  id?: string | null
  label?: string | null
  key?: string | null
}

function getArticleTagKeys(article?: ArticleItem | null) {
  const articleAny = article as any

  if (Array.isArray(articleAny?.tagKeys)) {
    return articleAny.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
  }

  if (Array.isArray(articleAny?.tags)) {
    return articleAny.tags.map((tag: TagRuntime) => String(tag?.key ?? '').trim()).filter(Boolean)
  }

  return []
}

function getArticleSortTime(article?: ArticleItem | null) {
  const date = new Date(article?.publishDate || '')

  if (Number.isNaN(date.getTime())) return 0

  return date.getTime()
}

function getRelatedArticles(articles: ArticleItem[], selectedArticle: ArticleItem) {
  const selectedTagKeys = getArticleTagKeys(selectedArticle)

  if (!selectedTagKeys.length) return []

  const selectedTagKeySet = new Set(selectedTagKeys)

  return articles
    .filter((article) => article?.id && article.id !== selectedArticle?.id)
    .map((article, index) => {
      const articleTagKeys = getArticleTagKeys(article)
      const matchCount = articleTagKeys.filter((key: string) => selectedTagKeySet.has(key)).length

      return {
        article,
        index,
        matchCount,
      }
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => {
      if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount

      const bTime = getArticleSortTime(b.article)
      const aTime = getArticleSortTime(a.article)

      if (bTime !== aTime) return bTime - aTime

      return a.index - b.index
    })
    .map((item) => item.article)
}

function getLatestFallbackArticles(articles: ArticleItem[], selectedArticle: ArticleItem) {
  return articles
    .filter((article) => article?.id && article.id !== selectedArticle?.id)
    .map((article, index) => ({
      article,
      index,
    }))
    .sort((a, b) => {
      const bTime = getArticleSortTime(b.article)
      const aTime = getArticleSortTime(a.article)

      if (bTime !== aTime) return bTime - aTime

      return b.index - a.index
    })
    .slice(0, 6)
    .map((item) => item.article)
}

async function RelatedArticleServer({ block, id }: Props) {
  const bgColor = block?.sectionSettings?.backgroundColor || 'white-3'

  const [articleData, tagsData] = await Promise.all([
    getGlobalCached<Article>(GLOBAL_ARTICLE_SLUG_AND_TAG, 2, RELATED_ARTICLE_SLUG_AND_TAG),
    getGlobalCached<ArticleTag>(GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG, 1, RELATED_ARTICLE_SLUG_AND_TAG),
  ])

  const articles = Array.isArray(articleData?.articles) ? articleData.articles : []
  const selectedArticle = articles.find((item) => item?.id === id)

  if (!articles.length) {
    return (
      <NoDataFound
        message="No Data Found"
        description={`Please fill up Global '${GLOBAL_ARTICLE_SLUG_AND_TAG}' collection data`}
        bgColor={bgColor}
      />
    )
  }

  if (!selectedArticle) {
    return (
      <NoDataFound
        message="Please Give Valid Slug"
        description={`This slug item does not exist in your Global '${GLOBAL_ARTICLE_SLUG_AND_TAG}' collection data`}
        bgColor={bgColor}
      />
    )
  }

  const sameTagRelatedArticles = getRelatedArticles(articles, selectedArticle)

  const relatedArticles =
    sameTagRelatedArticles.length > 0
      ? sameTagRelatedArticles
      : getLatestFallbackArticles(articles, selectedArticle)

  if (!relatedArticles.length) {
    return (
      <NoDataFound
        message="No Related Articles Found"
        description="No related articles were found. Add more articles in the global Articles collection."
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

      <RelatedArticleCarousel block={block} articles={relatedArticles} tagsData={tagsData} />
    </section>
  )
}

export default RelatedArticleServer
