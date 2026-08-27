import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

import { globalTag } from '@/lib/cacheTags'
import {
  ALL_NEWS_SLUG_AND_TAG,
  FEATURED_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
  NEWS,
  RELATED_NEWS_SLUG_AND_TAG,
  SINGLE_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'

import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'

const TITLE_MAX = 140
const ESTIMATED_READING_TIME_MAX = 40
const KEY_MAX = 60

type EventStatus = 'upcoming-events' | 'past-events' | 'todays-events'

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

const getDhakaTodayKey = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())

  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  if (!year || !month || !day) return ''

  return `${year}-${month}-${day}`
}

const getDateKeyFromPublishDate = (dateValue?: string | Date | null) => {
  if (!dateValue) return ''

  if (typeof dateValue === 'string') {
    const match = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/)

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`
    }
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) return ''

  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  if (!year || !month || !day) return ''

  return `${year}-${month}-${day}`
}

const getEventStatusFromPublishDate = (publishDate?: string | Date | null): EventStatus => {
  const publishDateKey = getDateKeyFromPublishDate(publishDate)
  const todayKey = getDhakaTodayKey()

  if (!publishDateKey || !todayKey) return 'todays-events'

  if (publishDateKey > todayKey) return 'upcoming-events'
  if (publishDateKey < todayKey) return 'past-events'

  return 'todays-events'
}

const applyEventStatus = async ({ data }: any) => {
  const newsItems = Array.isArray(data?.news) ? data.news : []

  return {
    ...data,
    news: newsItems.map((item: any) => ({
      ...item,
      eventStatus: getEventStatusFromPublishDate(item?.publishDate),
    })),
  }
}

const enrichNewsItemsAfterRead = async ({ doc, req }: any) => {
  try {
    const tagsGlobal = await req.payload.findGlobal({
      slug: GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
      depth: 0,
    })

    const tags = Array.isArray(tagsGlobal?.tags) ? tagsGlobal.tags : []
    const tagMap = makeMapByKey(tags)

    const newsItems = Array.isArray(doc?.news) ? doc.news : []

    return {
      ...doc,
      news: newsItems.map((item: any) => {
        const tagKeys = Array.isArray(item?.tagKeys)
          ? item.tagKeys.map((key: unknown) => String(key ?? '').trim()).filter(Boolean)
          : []

        return {
          ...item,
          eventStatus: getEventStatusFromPublishDate(item?.publishDate),
          tags: tagKeys.map((key: string) => tagMap.get(key)).filter(Boolean),
        }
      }),
    }
  } catch (error) {
    req?.payload?.logger?.warn?.(
      `News afterRead tag enrichment failed: ${(error as Error).message}`,
    )

    return doc
  }
}

const newsMediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_NEWS_SLUG_AND_TAG,
  arrayFields: [
    {
      fieldName: 'news',
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

const newsBase = pickGlobalHooks(newsMediaHooks)

const News: GlobalConfig = {
  slug: GLOBAL_NEWS_SLUG_AND_TAG,
  label: NEWS,

  admin: {
    description: 'Global news manager using news tag selector.',
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
      name: 'news',
      type: 'array',
      label: 'News',
      minRows: 0,
      maxRows: 200,
      labels: {
        singular: 'News Item',
        plural: 'News Items',
      },
      fields: [
        ...generateArrayImageFields({
          fieldName: 'cardImage',
          label: 'Card Image',
          description: 'Upload card image. Recommended aspect ratio 265:302.',
          aspectRatio: 265 / 302,
          quality: 0.92,
          maxKB: 700,
          required: true,
          ownerCollection: GLOBAL_NEWS_SLUG_AND_TAG as any,
        } as any),

        ...generateArrayImageFields({
          fieldName: 'detailPageImage',
          label: 'Detail Page Image',
          description: 'Upload detail page image. Recommended aspect ratio 1200:406.',
          aspectRatio: 1200 / 406,
          quality: 0.92,
          maxKB: 900,
          required: true,
          ownerCollection: GLOBAL_NEWS_SLUG_AND_TAG as any,
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
                description:
                  'Event status is automatically detected from this date: future = Upcoming Events, past = Past Events, today = Todays Events.',
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
          name: 'eventStatus',
          type: 'select',
          label: 'Event Status',
          required: true,
          defaultValue: 'todays-events',
          options: [
            {
              label: 'Upcoming Events',
              value: 'upcoming-events',
            },
            {
              label: 'Past Events',
              value: 'past-events',
            },
            {
              label: 'Todays Events',
              value: 'todays-events',
            },
          ],
          admin: {
            readOnly: true,
            description:
              'Automatically generated from Publish Date after save. Future = Upcoming Events, Past = Past Events, Today = Todays Events.',
          },
        },

        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('News Title', TITLE_MAX, true),
          admin: {
            description: `News title. Max ${TITLE_MAX} characters.`,
          },
        },

        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Description',
          admin: {
            description: 'News detail content / description.',
          },
        },

        {
          name: 'newsTagSelector',
          type: 'ui',
          label: 'News Tags',
          admin: {
            components: {
              Field: '@/components/payload/NewsTagMultiSelectorField#NewsTagMultiSelectorField',
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
            description: 'Stores selected news tag keys from the News Tags global.',
          },
        },

        {
          name: 'isFeatured',
          type: 'checkbox',
          label: 'Feature this news',
          defaultValue: false,
          admin: {
            description: 'If enabled, this news item can be shown in featured news sections.',
          },
        },
      ],
    },
  ],

  hooks: {
    beforeValidate: [...newsBase.beforeValidate, applyEventStatus],

    beforeChange: [...newsBase.beforeChange, applyEventStatus],

    afterRead: [...newsBase.afterRead, enrichNewsItemsAfterRead],

    afterChange: [
      ...newsBase.afterChange,
      async () => {
        revalidateTag(globalTag(GLOBAL_NEWS_SLUG_AND_TAG))
        revalidateTag(globalTag(GLOBAL_NEWS_TAGS_SLUG_AND_TAG))
        revalidateTag(ALL_NEWS_SLUG_AND_TAG)
        revalidateTag(SINGLE_NEWS_SLUG_AND_TAG)
        revalidateTag(RELATED_NEWS_SLUG_AND_TAG)
        revalidateTag(FEATURED_NEWS_SLUG_AND_TAG)
      },
    ],
  },
}

export default News
