// import { unstable_cache } from 'next/cache'
// import { getPayload } from 'payload'
// import config from '@/payload.config'
// import { CUSTOMER_FEEDBACK_SLUG_AND_TAG } from '../constants'
// import { logCacheMiss } from '../cacheDebug'

// // export const PUBLISHED_REVIEWS_TAG = 'published-reviews'

// const payloadClient = async () => getPayload({ config: await config })

// export const getPublishedReviews = unstable_cache(
//   async () => {
//     logCacheMiss(`collection:review:${CUSTOMER_FEEDBACK_SLUG_AND_TAG}`)
//     const payload = await payloadClient()

//     const result = await payload.find({
//       collection: 'review',
//       depth: 0,
//       limit: 5,
//       where: {
//         status: {
//           equals: 'published',
//         },
//       },
//       sort: '-updatedAt',
//     })

//     return result.docs
//   },
//   ['published-reviews-cache'],
//   {
//     tags: [CUSTOMER_FEEDBACK_SLUG_AND_TAG],
//   },
// )

// export const getAllReviews = unstable_cache(
//   async () => {
//     logCacheMiss(`collection:review:${CUSTOMER_FEEDBACK_SLUG_AND_TAG}`)
//     const payload = await payloadClient()

//     const result = await payload.find({
//       collection: 'review',
//       depth: 0,
//       limit: 1000,
//       sort: '-updatedAt',
//     })

//     return result.docs
//   },
//   ['all-reviews-cache'],
//   {
//     tags: [CUSTOMER_FEEDBACK_SLUG_AND_TAG],
//   },
// )

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { CUSTOMER_REVIEW_SLUG_AND_TAG } from '../constants'
import { logCacheMiss } from '../cacheDebug'

const REVIEW_FORM_SUBMISSIONS_SLUG = 'review-form-submissions'

const payloadClient = async () => getPayload({ config: await config })

export const getPublishedReviews = unstable_cache(
  async () => {
    logCacheMiss(`collection:${REVIEW_FORM_SUBMISSIONS_SLUG}:${CUSTOMER_REVIEW_SLUG_AND_TAG}`)

    const payload = await payloadClient()

    const result = await payload.find({
      collection: REVIEW_FORM_SUBMISSIONS_SLUG as any,
      depth: 2,
      limit: 30,
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-updatedAt',
      overrideAccess: true,
    })

    return result.docs
  },
  ['published-review-form-submissions-cache'],
  {
    tags: [CUSTOMER_REVIEW_SLUG_AND_TAG, REVIEW_FORM_SUBMISSIONS_SLUG],
  },
)

export const getAllReviews = unstable_cache(
  async () => {
    logCacheMiss(`collection:${REVIEW_FORM_SUBMISSIONS_SLUG}:all`)

    const payload = await payloadClient()

    const result = await payload.find({
      collection: REVIEW_FORM_SUBMISSIONS_SLUG as any,
      depth: 2,
      limit: 1000,
      sort: '-updatedAt',
      overrideAccess: true,
    })

    return result.docs
  },
  ['all-review-form-submissions-cache'],
  {
    tags: [CUSTOMER_REVIEW_SLUG_AND_TAG, REVIEW_FORM_SUBMISSIONS_SLUG],
  },
)
