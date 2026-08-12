import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

import {
  ALL_ARTICLE_SLUG_AND_TAG,
  ARTICLES,
  GLOBAL_ARTICLE_SLUG_AND_TAG,
  GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG,
  SINGLE_ARTICLE_SLUG_AND_TAG,
} from '@/lib/constants'
import { globalTag } from '@/lib/cacheTags'
import { roleAtLeast } from '@/lib/rbac'

import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'

const TITLE_MAX = 140
const ESTIMATED_READING_TIME_MAX = 40
const KEY_MAX = 60

const validateKey =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = String(val ?? '').trim()

    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`

    if (!/^[a-z0-9-]+$/.test(s)) {
      return `${label} can only contain lowercase letters, numbers, and hyphens.`
    }

    return true
  }

const validateTagKeys = (val: unknown) => {
  if (!Array.isArray(val)) return 'Please select at least one tag.'

  const keys = val.map((item) => String(item ?? '').trim()).filter(Boolean)

  if (!keys.length) return 'Please select at least one tag.'

  const invalidKey = keys.find((key) => validateKey('Tag Key', KEY_MAX, true)(key) !== true)

  if (invalidKey) return `Invalid tag key: ${invalidKey}`

  const unique = new Set(keys)

  if (unique.size !== keys.length) {
    return 'Tag keys must be unique.'
  }

  return true
}

const makeMapByKey = (items: any[]) => {
  const entries: [string, any][] = items
    .map((item: any): [string, any] => [String(item?.key ?? '').trim(), item])
    .filter((entry: [string, any]) => Boolean(entry[0]))

  return new Map<string, any>(entries)
}

const enrichArticleItemsWithTagsAfterRead = async ({ doc, req }: any) => {
  try {
    const tagsGlobal = await req.payload.findGlobal({
      slug: GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG,
      depth: 0,
    })

    const tags = Array.isArray(tagsGlobal?.tags) ? tagsGlobal.tags : []
    const tagMap = makeMapByKey(tags)

    const articles = Array.isArray(doc?.articles) ? doc.articles : []

    return {
      ...doc,
      articles: articles.map((item: any) => {
        const tagKeys = Array.isArray(item?.tagKeys)
          ? item.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
          : []

        return {
          ...item,

          // Virtual enriched data for frontend/API reads
          tags: tagKeys.map((key: string) => tagMap.get(key)).filter(Boolean),
        }
      }),
    }
  } catch (error) {
    req?.payload?.logger?.warn?.(
      `Article afterRead tag enrichment failed: ${(error as Error).message}`,
    )

    return doc
  }
}

/**
 * Article global media lifecycle
 *
 * Handles:
 * - articles[].cardImage
 * - articles[].detailPageImage
 */
const articleMediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_ARTICLE_SLUG_AND_TAG,
  arrayFields: [
    {
      fieldName: 'articles',
      mediaFields: ['cardImage', 'detailPageImage'],
      itemLabelField: 'title',
      mediaFieldLabels: {
        cardImage: 'Card Image',
        detailPageImage: 'Detail Page Image',
      },
    } as any,
  ],
  onAfterChange: async ({ req }) => {
    await triggerMediaTemporaryPurge(req)
  },
})

const pickGlobalHooks = (h: any) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
  afterRead: h?.afterRead ?? [],
})

const articleBase = pickGlobalHooks(articleMediaHooks)

const Article: GlobalConfig = {
  slug: GLOBAL_ARTICLE_SLUG_AND_TAG,
  label: ARTICLES,

  admin: {
    description: 'Global article manager using article tag selector.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
        readOnly: true,
      },
    },

    {
      name: 'articles',
      type: 'array',
      label: 'Articles',
      minRows: 0,
      maxRows: 200,
      labels: {
        singular: 'Article',
        plural: 'Articles',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'cardImage',
          label: 'Card Image',
          description: 'Upload card image. Recommended aspect ratio 310:182.',
          aspectRatio: 310 / 182,
          quality: 0.92,
          maxKB: 500,
          required: true,
          ownerCollection: GLOBAL_ARTICLE_SLUG_AND_TAG as any,
        } as any),

        ...generateArrayImageFields({
          fieldName: 'detailPageImage',
          label: 'Detail Page Image',
          description: 'Upload detail page image. Recommended aspect ratio 500:700.',
          aspectRatio: 500 / 700,
          quality: 0.92,
          maxKB: 700,
          required: true,
          ownerCollection: GLOBAL_ARTICLE_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'publishDate',
              type: 'date',
              required: true,
              label: 'Publish Date',
              admin: {
                width: '50%',
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'estimatedReadingTime',
              type: 'text',
              required: true,
              label: 'Estimated Reading Time',
              maxLength: ESTIMATED_READING_TIME_MAX,
              validate: validateShortText(
                'Estimated Reading Time',
                ESTIMATED_READING_TIME_MAX,
                true,
              ),
              admin: {
                width: '50%',
                description: 'Example: 5 min read.',
              },
            },
          ],
        },

        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Article Title', TITLE_MAX, true),
          admin: {
            description: `Article title. Max ${TITLE_MAX} characters.`,
          },
        },

        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Description',
          admin: {
            description: 'Article detail content / description.',
          },
        },

        {
          name: 'articleTagSelector',
          type: 'ui',
          label: 'Article Tags',
          admin: {
            components: {
              Field: '@/components/payload/ArticleTagSelectorField#ArticleTagSelectorField',
            },
          },
        },

        {
          name: 'tagKeys',
          type: 'json',
          required: true,
          label: 'Tag Keys',
          validate: validateTagKeys,
          admin: {
            hidden: true,
            description: 'Stores selected article tag keys from the Article Tags global.',
          },
        },

        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Feature this article',
          defaultValue: false,
          admin: {
            description: 'If enabled, this article can be shown in featured article sections.',
          },
        },
      ],
    },
  ],

  hooks: {
    beforeValidate: [...articleBase.beforeValidate],

    beforeChange: [...articleBase.beforeChange],

    afterRead: [...articleBase.afterRead, enrichArticleItemsWithTagsAfterRead],

    afterChange: [
      ...articleBase.afterChange,
      async () => {
        // own tag
        revalidateTag(globalTag(GLOBAL_ARTICLE_SLUG_AND_TAG))
        // related blocks tags
        revalidateTag(globalTag(GLOBAL_ARTICLE_TAGS_SLUG_AND_TAG))
        revalidateTag(ALL_ARTICLE_SLUG_AND_TAG)
        revalidateTag(SINGLE_ARTICLE_SLUG_AND_TAG)
      },
    ],
  },
}

export default Article
