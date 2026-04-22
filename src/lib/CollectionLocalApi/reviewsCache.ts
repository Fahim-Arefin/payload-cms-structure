import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { CUSTOMER_FEEDBACK_SLUG_AND_TAG } from '../constants'
import { logCacheMiss } from '../cacheDebug'

// export const PUBLISHED_REVIEWS_TAG = 'published-reviews'

const payloadClient = async () => getPayload({ config: await config })

export const getPublishedReviews = unstable_cache(
  async () => {
    logCacheMiss(`collection:review:${CUSTOMER_FEEDBACK_SLUG_AND_TAG}`)
    const payload = await payloadClient()

    const result = await payload.find({
      collection: 'review',
      depth: 0,
      limit: 5,
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-updatedAt',
    })

    return result.docs
  },
  ['published-reviews-cache'],
  {
    tags: [CUSTOMER_FEEDBACK_SLUG_AND_TAG],
  },
)

export const getAllReviews = unstable_cache(
  async () => {
    logCacheMiss(`collection:review:${CUSTOMER_FEEDBACK_SLUG_AND_TAG}`)
    const payload = await payloadClient()

    const result = await payload.find({
      collection: 'review',
      depth: 0,
      limit: 1000,
      sort: '-updatedAt',
    })

    return result.docs
  },
  ['all-reviews-cache'],
  {
    tags: [CUSTOMER_FEEDBACK_SLUG_AND_TAG],
  },
)
