// import NoDataFound from '@/components/custom/shared/NoDataFound'
// import { CustomerReviewBlockType } from '@/types/payloadCustomTypes'
// import config from '@payload-config'
// import { getPayload } from 'payload'
// import React from 'react'
// import CustomerReviewTabClient, { CustomerReviewItem } from './CustomerReviewTabClient'

// type Props = { block: CustomerReviewBlockType }

// type PlainImage = {
//   url: string
//   alt?: string | null
//   blurDataURL?: string | null
// } | null

// function getPlainImage(media: any, blurDataURL?: string | null): PlainImage {
//   if (!media || typeof media !== 'object') return null

//   const url = media?.url || media?.sizes?.thumbnail?.url || media?.sizes?.card?.url || ''

//   if (!url) return null

//   return {
//     url,
//     alt: media?.alt || '',
//     blurDataURL: blurDataURL || media?.blurDataURL || null,
//   }
// }

// async function getPublishedReviews(): Promise<CustomerReviewItem[]> {
//   const payload = await getPayload({ config })

//   const result = await payload.find({
//     collection: 'review-form-submissions' as any,
//     where: {
//       status: {
//         equals: 'published',
//       },
//     },
//     sort: '-createdAt',
//     limit: 30,
//     depth: 2,
//     overrideAccess: true,
//   })

//   return result.docs.map((review: any) => {
//     const adminImages = review?.adminImages || {}

//     return {
//       id: String(review?.id || ''),
//       buyersFullName: review?.buyersFullName || '',
//       companyName: review?.companyName || '',
//       position: review?.position || '',
//       rating: Number(review?.rating || 5),
//       review: review?.review || '',
//       companyIcon: getPlainImage(adminImages?.companyIcon, adminImages?.companyIconBlurDataURL),
//       userProfileImage: getPlainImage(
//         adminImages?.userProfileImage,
//         adminImages?.userProfileImageBlurDataURL,
//       ),
//     }
//   })
// }

// async function CustomerReviewTab({ block }: Props) {
//   const reviews = await getPublishedReviews()

//   if (!reviews.length) {
//     return (
//       <NoDataFound
//         message="No Publish Review Found"
//         description={`Please publish some review from Global 'Review Form submission' collection data`}
//         bgColor={block?.sectionSettings?.backgroundColor || ''}
//       />
//     )
//   }

//   return <CustomerReviewTabClient reviews={reviews} />
// }

// export default CustomerReviewTab

import NoDataFound from '@/components/custom/shared/NoDataFound'
import { CustomerReviewBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CustomerReviewTabClient, { CustomerReviewItem } from './CustomerReviewTabClient'
import { getPublishedReviews } from '@/lib/CollectionLocalApi/reviewsCache'

type Props = { block: CustomerReviewBlockType }

type PlainImage = {
  url: string
  alt?: string | null
  blurDataURL?: string | null
} | null

function getPlainImage(media: any, blurDataURL?: string | null): PlainImage {
  if (!media || typeof media !== 'object') return null

  const url = media?.url || media?.sizes?.thumbnail?.url || media?.sizes?.card?.url || ''

  if (!url) return null

  return {
    url,
    alt: media?.alt || '',
    blurDataURL: blurDataURL || media?.blurDataURL || null,
  }
}

async function CustomerReviewTab({ block }: Props) {
  const docs = await getPublishedReviews()

  const reviews: CustomerReviewItem[] = docs.map((review: any) => {
    const adminImages = review?.adminImages || {}

    return {
      id: String(review?.id || ''),
      buyersFullName: review?.buyersFullName || '',
      companyName: review?.companyName || '',
      position: review?.position || '',
      rating: Number(review?.rating || 5),
      review: review?.review || '',
      companyIcon: getPlainImage(adminImages?.companyIcon, adminImages?.companyIconBlurDataURL),
      userProfileImage: getPlainImage(
        adminImages?.userProfileImage,
        adminImages?.userProfileImageBlurDataURL,
      ),
    }
  })

  if (!reviews.length) {
    return (
      <NoDataFound
        message="No Publish Review Found"
        description={`Please publish some review from Global 'Review Form submission' collection data`}
        bgColor={block?.sectionSettings?.backgroundColor || ''}
      />
    )
  }

  return <CustomerReviewTabClient reviews={reviews} />
}

export default CustomerReviewTab
