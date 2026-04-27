import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

import {
  GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
  SAGAR_VIDEOS_SLUG_AND_TAG,
} from '@/lib/constants'
import { globalTag } from '@/lib/cacheTags'
import { roleAtLeast } from '@/lib/rbac'

import { validateShortText, validateYouTubeUrl } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

const TITLE_MAX = 120
const CATEGORY_NAME_MAX = 90
const OWNER_NAME_MAX = 90
const VIDEO_URL_MAX = 300
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

const makeMapByKey = (items: any[]) => {
  const entries: [string, any][] = items
    .map((item: any): [string, any] => [String(item?.key ?? '').trim(), item])
    .filter((entry: [string, any]) => Boolean(entry[0]))

  return new Map<string, any>(entries)
}

const enrichNewsItemsWithCategoryAndTagAfterRead = async ({ doc, req }: any) => {
  try {
    const [categoriesGlobal, tagsGlobal] = await Promise.all([
      req.payload.findGlobal({
        slug: GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG,
        depth: 0,
      }),
      req.payload.findGlobal({
        slug: GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
        depth: 0,
      }),
    ])

    const categories = Array.isArray(categoriesGlobal?.categories)
      ? categoriesGlobal.categories
      : []

    const tags = Array.isArray(tagsGlobal?.tags) ? tagsGlobal.tags : []

    const categoryMap = makeMapByKey(categories)
    const tagMap = makeMapByKey(tags)

    const newsItems = Array.isArray(doc?.newsItems) ? doc.newsItems : []

    return {
      ...doc,
      newsItems: newsItems.map((item: any) => {
        const categoryKey = String(item?.categoryKey ?? '').trim()
        const tagKey = String(item?.tagKey ?? '').trim()

        return {
          ...item,

          // Virtual enriched data for frontend/API reads
          category: categoryMap.get(categoryKey) ?? null,
          tag: tagMap.get(tagKey) ?? null,
        }
      }),
    }
  } catch (error) {
    req?.payload?.logger?.warn?.(`News afterRead enrichment failed: ${(error as Error).message}`)

    return doc
  }
}

/**
 * News global media lifecycle
 *
 * Handles:
 * - newsItems[].thumbnailImage
 * - newsItems[].productImage
 */
const newsMediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_NEWS_SLUG_AND_TAG,
  arrayFields: [
    {
      fieldName: 'newsItems',
      mediaFields: ['thumbnailImage', 'productImage'],
      itemLabelField: 'title1',
      mediaFieldLabels: {
        thumbnailImage: 'Thumbnail Image',
        productImage: 'Product Image',
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

const newsBase = pickGlobalHooks(newsMediaHooks)

const News: GlobalConfig = {
  slug: GLOBAL_NEWS_SLUG_AND_TAG,
  label: 'News',

  admin: {
    description: 'Global news manager using category and tag selectors.',
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
      name: 'newsItems',
      type: 'array',
      label: 'News Items',
      minRows: 0,
      maxRows: 200,
      labels: {
        singular: 'News Item',
        plural: 'News Items',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'thumbnailImage',
          label: 'Thumbnail Image',
          description: 'Upload thumbnail image. Recommended aspect ratio 16:9.',
          aspectRatio: 16 / 9,
          quality: 0.92,
          maxKB: 500,
          required: true,
          ownerCollection: GLOBAL_NEWS_SLUG_AND_TAG as any,
        } as any),

        ...generateArrayImageFields({
          fieldName: 'productImage',
          label: 'Product Image',
          description: 'Upload product image. Recommended aspect ratio 1:1.',
          aspectRatio: 1 / 1,
          quality: 0.92,
          maxKB: 500,
          required: true,
          ownerCollection: GLOBAL_NEWS_SLUG_AND_TAG as any,
        } as any),

        {
          type: 'row',
          fields: [
            {
              name: 'title1',
              type: 'text',
              required: true,
              label: 'Title 1',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title 1', TITLE_MAX, true),
              admin: {
                width: '50%',
              },
            },
            {
              name: 'title2',
              type: 'text',
              required: false,
              label: 'Title 2',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title 2', TITLE_MAX, false),
              admin: {
                width: '50%',
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'eventType',
              type: 'select',
              required: true,
              label: 'Event Type',
              defaultValue: 'blog',
              options: [
                { label: 'Blog', value: 'blog' },
                { label: 'Vlog', value: 'vlog' },
              ],
              admin: {
                width: '50%',
              },
            },
            {
              name: 'videoUrl',
              type: 'text',
              required: true,
              label: 'Embedded Video URL',
              validate: validateYouTubeUrl(VIDEO_URL_MAX, true),
              admin: {
                width: '50%',
                condition: (_data, siblingData) => siblingData?.eventType === 'vlog',
                description:
                  'Paste a YouTube link (watch, share, or embed). Example: https://www.youtube.com/watch?v=XXXX or https://youtu.be/XXXX',
              },
            },
          ],
        },

        {
          name: 'categoryTagSelector',
          type: 'ui',
          label: 'Category & Tag',
          admin: {
            components: {
              Field:
                '@/components/payload/NewsCategoryTagSelectorField#NewsCategoryTagSelectorField',
            },
          },
        },

        {
          type: 'row',
          fields: [
            {
              name: 'categoryKey',
              type: 'text',
              required: true,
              label: 'Category Key',
              maxLength: KEY_MAX,
              validate: validateKey('Category', KEY_MAX, true),
              admin: {
                hidden: true,
                width: '50%',
              },
            },
            {
              name: 'tagKey',
              type: 'text',
              required: true,
              label: 'Tag Key',
              maxLength: KEY_MAX,
              validate: validateKey('Tag', KEY_MAX, true),
              admin: {
                hidden: true,
                width: '50%',
              },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              name: 'categoryName',
              type: 'text',
              required: true,
              label: 'Category Name',
              maxLength: CATEGORY_NAME_MAX,
              validate: validateShortText('Category Name', CATEGORY_NAME_MAX, true),
              admin: {
                width: '50%',
                description: 'Independent category display name.',
              },
            },
            {
              name: 'releaseDate',
              type: 'date',
              required: true,
              label: 'Release Date',
              admin: {
                width: '50%',
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
          ],
        },

        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Description',
          admin: {
            description: 'Main description.',
          },
        },

        {
          name: 'quotationDescription',
          type: 'richText',
          required: false,
          label: 'Quotation Description',
          admin: {
            description: 'Quotation / highlighted quote content.',
          },
        },

        {
          type: 'row',
          fields: [
            {
              name: 'quotationDate',
              type: 'date',
              required: false,
              label: 'Quotation Date',
              admin: {
                width: '50%',
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'quotationOwnerName',
              type: 'text',
              required: false,
              label: 'Quotation Owner Name',
              maxLength: OWNER_NAME_MAX,
              validate: validateShortText('Quotation Owner Name', OWNER_NAME_MAX, false),
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Feature this news',
          defaultValue: false,
          admin: {
            description:
              'If you featured a news that means it will show on the homepage news section',
          },
        },
      ],
    },
  ],

  hooks: {
    beforeValidate: [...newsBase.beforeValidate],

    beforeChange: [...newsBase.beforeChange],

    afterRead: [...newsBase.afterRead, enrichNewsItemsWithCategoryAndTagAfterRead],

    afterChange: [
      ...newsBase.afterChange,
      async () => {
        revalidateTag(globalTag(GLOBAL_NEWS_SLUG_AND_TAG))
        revalidateTag(SAGAR_VIDEOS_SLUG_AND_TAG)
      },
    ],
  },
}

export default News
