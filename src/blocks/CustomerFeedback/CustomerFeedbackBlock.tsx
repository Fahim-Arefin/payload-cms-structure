import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { getPublishedReviews } from '@/lib/CollectionLocalApi/reviewsCache'
import { CustomerfeedbackBlockType } from '@/types/payloadCustomTypes'
import ImageBanner from './components/ImageBanner'
import ReviewSection from './components/ReviewSection'
import NoDataFound from '@/components/custom/shared/NoDataFound'

type Props = {
  block: CustomerfeedbackBlockType
  params: Record<string, string>
}

async function CustomerFeedbackBlock({ block }: Props) {
  const reviews = await getPublishedReviews()
  // const reviews = await getAllReviews()

  return (
    <>
      {reviews && reviews?.length > 0 ? (
        <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
          <div
            className="container-padding grid grid-cols-1 lg:grid-cols-2 
      gap-4 md:gap-3 lg:gap-5 xl:gap-8 2xl:gap-20
      "
          >
            {/* left */}
            <ImageBanner block={block} reviews={reviews || []} />
            <ReviewSection block={block} reviews={reviews || []} />
          </div>
        </WithHashScroller>
      ) : (
        <NoDataFound
          message="No Publish Review Found"
          description={`Please publish some review from Global 'review' collection data`}
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </>
  )
}

export default CustomerFeedbackBlock
