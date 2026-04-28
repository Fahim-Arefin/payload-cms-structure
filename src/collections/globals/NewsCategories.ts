import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

import {
  ALL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'
import { globalTag } from '@/lib/cacheTags'
import { roleAtLeast } from '@/lib/rbac'

import { validateShortText } from '@/utils/block/fields-validation'

const LABEL_MAX = 90
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

const validateUniqueCategoryKeys = (val: unknown) => {
  if (!Array.isArray(val)) return true

  const keys = val.map((item) => String(item?.key ?? '').trim()).filter(Boolean)
  const unique = new Set(keys)

  if (unique.size !== keys.length) {
    return 'Category keys must be unique.'
  }

  return true
}

const NewsCategories: GlobalConfig = {
  slug: GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG,
  label: 'News Categories',

  admin: {
    description: 'Global list of news categories.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    {
      name: 'categories',
      type: 'array',
      label: 'Categories',
      minRows: 0,
      maxRows: 50,
      validate: validateUniqueCategoryKeys,
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Category Label',
              maxLength: LABEL_MAX,
              validate: validateShortText('Category Label', LABEL_MAX, true),
              admin: {
                width: '50%',
              },
            },
            {
              name: 'key',
              type: 'text',
              required: true,
              label: 'Category Key',
              maxLength: KEY_MAX,
              validate: validateKey('Category Key', KEY_MAX, true),
              admin: {
                width: '50%',
                description: 'Unique key like company-news, awards, events.',
              },
            },
          ],
        },
      ],
    },
  ],

  hooks: {
    afterChange: [
      async () => {
        revalidateTag(globalTag(GLOBAL_NEWS_CATEGORIES_SLUG_AND_TAG))

        // Also revalidate News because news cards may display category label/key.
        revalidateTag(globalTag(GLOBAL_NEWS_SLUG_AND_TAG))
        revalidateTag(ALL_NEWS_SLUG_AND_TAG)
      },
    ],
  },
}

export default NewsCategories
