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
    <section
      className="container-padding 
    space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]
    "
    >
      <div
        className="
          grid grid-cols-1 
          lg:grid-cols-12 lg:items-start
          gap-[28px]
          lg:gap-[20px]
          xl:gap-[12px]
          2xl:gap-[135px]
        "
      >
        {/* heading */}
        <div className="hidden lg:block lg:col-span-7 xl:col-span-8 2xl:col-span-7  my-auto">
          <SectionHeading01 data={block?.sectionHeading as any} align="left" />
        </div>
        <div className="lg:hidden lg:col-span-7 xl:col-span-8 2xl:col-span-7  my-auto">
          <SectionHeading01 data={block?.sectionHeading as any} align="middle" />
        </div>

        {/* cto card */}
        <div className="lg:col-span-5 xl:col-span-4 2xl:col-span-5  my-auto">
          <FAQCtoCard data={block?.ctoInfo} />
        </div>
      </div>

      <div className="">
        <FAQAccordion items={faqItems} />
      </div>
    </section>
  )
}

export default FAQSection
