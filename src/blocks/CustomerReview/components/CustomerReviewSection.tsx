import SectionHeading02 from '@/components/custom/sagar-ropes-shared/others/SectionHeading02'
import { CustomerReviewBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CustomerReviewTab from './CustomerReviewTab'

type Props = { block: CustomerReviewBlockType }

function CustomerReviewSection({ block }: Props) {
  return (
    <div className="relative isolate overflow-hidden">
      {/* section bottom sun glow */}
      <div
        className="
          pointer-events-none absolute left-1/2 z-0
          bottom-[38px]
          h-[300px] w-[520px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(0,108,103,0.68)_0%,rgba(0,108,103,0.42)_28%,rgba(0,108,103,0.18)_55%,rgba(0,108,103,0.00)_78%)]
          blur-[54px]

          md:bottom-[-20%] md:h-[430px] md:w-[900px] md:blur-[78px]
          lg:bottom-[-22%] lg:h-[520px] lg:w-[1080px] lg:blur-[96px]
          xl:bottom-[-24%] xl:h-[600px] xl:w-[1280px] xl:blur-[115px]
          2xl:bottom-[-26%] 2xl:h-[680px] 2xl:w-[1480px] 2xl:blur-[130px]
        "
      />

      {/* stronger center core glow */}
      <div
        className="
          pointer-events-none absolute left-1/2 z-0
          bottom-[78px]
          h-[210px] w-[360px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(ellipse_at_center,rgba(0,108,103,0.78)_0%,rgba(0,108,103,0.46)_36%,rgba(0,108,103,0.14)_68%,rgba(0,108,103,0.00)_88%)]
          blur-[42px]

          md:bottom-[-10%] md:h-[320px] md:w-[620px] md:blur-[62px]
          lg:bottom-[-12%] lg:h-[390px] lg:w-[780px] lg:blur-[78px]
          xl:bottom-[-14%] xl:h-[460px] xl:w-[900px] xl:blur-[92px]
          2xl:h-[520px] 2xl:w-[1040px] 2xl:blur-[108px]
        "
      />

      <div
        className="
          container-padding relative z-10
          space-y-[35px]
          lg:space-y-[40px]
          xl:space-y-[56px]
          2xl:space-y-[80px]
        "
      >
        <SectionHeading02 data={block?.sectionHeading} align="middle" dark />
        <CustomerReviewTab block={block} />
      </div>
    </div>
  )
}

export default CustomerReviewSection
