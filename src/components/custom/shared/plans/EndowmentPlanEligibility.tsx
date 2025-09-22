// import { EligibilityCard } from '../../child-education/EligibilityCard'

// const EndowmentPlanEligibility = () => {
//   return (
//     <div className="mt-[15px] md:mt-0">
//       <div className="p-2 lg:p-3 xl:p-4">
//         <div className="global-h3 font-semibold text-center text-[#434342]">
//           METRICS THAT MATTER
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6 pt-4 lg:pt-10 lg:justify-center lg:items-center mb-6">
//         {/* CHILD CARD */}

//         <div className="flex flex-col md:flex-row gap-4 lg:gap-10 xl:gap-16 2xl:gap-20 md:mx-auto lg:mx-0">
//           <EligibilityCard
//             title="Eligibility"
//             icon={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/childIcon.svg`}
//             // mobileIcon="/assets/icons/mobile/childIcon.svg"
//             // bgImage="/assets/eligibilityImage1.jpg"
//             entryMin="30"
//             entryMinLabel="Days"
//             entryMax="60"
//             entryMaxLabel="Years"
//             policyTerm="10-25"
//             policyTermLabel="Years"
//             maturityAge="70"
//             maturityAgeLabel="Years"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EndowmentPlanEligibility
import { EligibilityCardProps } from '@/types'
import { EligibilityCard } from '../../child-education/EligibilityCard'
import LocalizedText from '../LocalizedText'

type EndowmentPlanEligibilityProps = {
  data: EligibilityCardProps[]
}

const EndowmentPlanEligibility = ({ data }: EndowmentPlanEligibilityProps) => {
  return (
    <div className="mt-[15px] md:mt-0">
      <div className="p-2 lg:p-3 xl:p-4">
        <div className="global-h3 font-semibold text-center text-[#434342]">
          <LocalizedText en="METRICS THAT MATTER" bn="গুরুত্বপূর্ণ মেট্রিকগুলি" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-4 lg:pt-10 lg:justify-center lg:items-center mb-6">
        {/* CHILD CARD */}

        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 xl:gap-16 2xl:gap-20 md:mx-auto lg:mx-0">
          {data?.map((item, i) => (
            <EligibilityCard key={i} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EndowmentPlanEligibility
