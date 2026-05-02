// import { Review } from '@/payload-types'
// import { CustomerfeedbackBlockType } from '@/types/payloadCustomTypes'

// import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
// import ReviewCarousal from './ReviewCarousal'

// type Props = {
//   block: CustomerfeedbackBlockType
//   reviews: Review[]
// }

// function ReviewSection({ block, reviews }: Props) {
//   return (
//     <div
//       className="bg-white-1
//   xl:py-6 2xl:py-9
//   xl:px-9 2xl:px-11
//   flex flex-col justify-between h-full
//   "
//     >
//       {/* review section */}
//       <div className="min-h-0 flex-1 ">
//         <ReviewCarousal block={reviews} />
//       </div>
//       {/* CTA section */}
//       <div className="flex justify-end">
//         {block?.ctaButtons && block?.ctaButtons?.length > 0 && (
//           <CtaButtons item={block?.ctaButtons} />
//         )}
//       </div>
//     </div>
//   )
// }

// export default ReviewSection

import { Review } from '@/payload-types'
import { CustomerfeedbackBlockType } from '@/types/payloadCustomTypes'
import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import ReviewCarousal from './ReviewCarousal'

type Props = {
  block: CustomerfeedbackBlockType
  reviews: Review[]
}

function ReviewSection({ block, reviews }: Props) {
  return (
    <div
      className="bg-white-1
      flex flex-col justify-between 
      py-3 lg:py-4 xl:px-9 xl:py-6
      px-4 lg:px-6 2xl:px-11 2xl:py-9"
    >
      <div className="min-h-0 flex-1 ">
        <ReviewCarousal reviews={reviews} block={block} />
      </div>

      <div className="flex justify-end">
        {block?.ctaButtons && block?.ctaButtons?.length > 0 && (
          <CtaButtons item={block?.ctaButtons} />
        )}
      </div>
    </div>
  )
}

export default ReviewSection
