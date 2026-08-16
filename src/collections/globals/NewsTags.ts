import { revalidateTag } from 'next/cache'
import type { GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cacheTags'
import {
  ALL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_SLUG_AND_TAG,
  GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
  SINGLE_NEWS_SLUG_AND_TAG,
} from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'

import { validateShortText } from '@/utils/block/fields-validation'

const LABEL_MAX = 60
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

const validateUniqueTagKeys = (val: unknown) => {
  if (!Array.isArray(val)) return true

  const keys = val.map((item) => String(item?.key ?? '').trim()).filter(Boolean)
  const unique = new Set(keys)

  if (unique.size !== keys.length) {
    return 'Tag keys must be unique.'
  }

  return true
}

const NewsTags: GlobalConfig = {
  slug: GLOBAL_NEWS_TAGS_SLUG_AND_TAG,
  label: 'News Tags',

  admin: {
    description: 'Global list of news tags.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      minRows: 0,
      maxRows: 100,
      validate: validateUniqueTagKeys,
      labels: {
        singular: 'Tag',
        plural: 'Tags',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Tag Label',
              maxLength: LABEL_MAX,
              validate: validateShortText('Tag Label', LABEL_MAX, true),
              admin: {
                width: '50%',
              },
            },
            {
              name: 'key',
              type: 'text',
              required: true,
              label: 'Tag Key',
              maxLength: KEY_MAX,
              validate: validateKey('Tag Key', KEY_MAX, true),
              admin: {
                width: '50%',
                description: 'Unique key like conference, product-launch, company-news.',
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
        revalidateTag(globalTag(GLOBAL_NEWS_TAGS_SLUG_AND_TAG))
        revalidateTag(globalTag(GLOBAL_NEWS_SLUG_AND_TAG))
        revalidateTag(ALL_NEWS_SLUG_AND_TAG)
        revalidateTag(SINGLE_NEWS_SLUG_AND_TAG)
      },
    ],
  },
}

export default NewsTags
