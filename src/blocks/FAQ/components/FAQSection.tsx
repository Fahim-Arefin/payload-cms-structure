// import { FAQBlockType } from '@/types/payloadCustomTypes'

// type Props = { block: FAQBlockType }

// function FAQSection({ block }: Props) {
//   return <div className="container-padding "></div>
// }

// export default FAQSection

import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { FAQBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import FAQCtoCard from './FAQCtoCard'
import FAQAccordion from './FAQAccordion'

type Props = {
  block: FAQBlockType
}

function FAQSection({ block }: Props) {
  const faqItems = block?.qaGroup?.items ?? []

  return (
    <section className="container-padding">
      <div
        className="
          grid grid-cols-1 
          lg:grid-cols-12 lg:items-start
          gap-[28px]
          lg:gap-[20px]
          xl:gap-[26px]
          2xl:gap-[85px]
        "
      >
        {/* heading */}
        <div className="lg:col-span-7 xl:space-x-6 2xl:col-span-7  my-auto">
          <SectionHeading01 data={block?.sectionHeading as any} align="left" />
        </div>

        {/* cto card */}
        <div className="lg:col-span-5 xl:space-x-6 2xl:col-span-5  my-auto">
          <FAQCtoCard data={block?.ctoInfo} />
        </div>
      </div>

      <div
        className="
          mt-[34px]
          lg:mt-[70px]
          xl:mt-[86px]
          2xl:mt-[96px]
        "
      >
        <FAQAccordion items={faqItems} />
      </div>
    </section>
  )
}

export default FAQSection
