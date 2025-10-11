'use client'

import React, { FC, useState } from 'react'
import PurchaseCard from './PurchaseCard'
import { PurchaseCardModal } from './PurchaseCardModal'

type PurchaseCardSectionProps = {
  blur?: boolean
}

const PurchaseCardSection: FC<PurchaseCardSectionProps> = ({ blur }) => {
  const [open, setOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const purchasePlanData = [
    {
      title: 'Shanta Endowment Plans',
      titleBN: 'শান্তা এনডাওমেন্ট প্ল্যান',
      description: `Turn today’s choices into tomorrow’s freedom.`,
      descriptionBN: 'আজকের সিদ্ধান্তই গড়ে তুলবে আগামীর স্বাধীনতা।',
      image: '/assets/purchase/purchaseCard1.jpg',
      link: '/assets/pdf/Required Brochures/Endowment Plan/Endowment Brochure.pdf',
    },
    {
      title: 'Child Education',
      titleBN: 'চাইল্ড এডুকেশন প্ল্যান',
      description: 'A brighter future starts with a thoughtful plan',
      descriptionBN: 'উজ্জ্বল ভবিষ্যৎ শুরু হয় একটি সঠিক পরিকল্পনা দিয়ে।',
      image: '/assets/purchase/child-education.jpg',
      link: '/assets/pdf/Required Brochures/Child Education Plan/Child Education Security Plan.pdf',
    },
    {
      title: 'Shanta Multi-Stage Maturity Plans',
      titleBN: 'শান্তা মাল্টি-স্টেজ ম্যাচিউরিটি প্ল্যান',
      description: `Life happens. We make sure you're ready.`,
      descriptionBN: 'জীবনে যা-ই আসুক, আমরা নিশ্চিত করি আপনি প্রস্তুত।',
      image: '/assets/purchase/purchaseCard33.jpg',
      link: '/assets/pdf/Required Brochures/Multi-Stage Maturity Plans/Multi Stage Plan (3pp, 4pp). V1 pdf.pdf',
    },
  ]
  return (
    <div className="py-12 lg:py-24">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
     gap-5 md:gap-8 lg:gap-5 xl:gap-12 2xl:gap-16"
      >
        {purchasePlanData?.map((data, index) => (
          <PurchaseCard
            key={index}
            data={data}
            blur={blur}
            onExplore={() => {
              setSelectedIndex(index)
              setOpen(true)
            }}
          />
        ))}
      </div>
      <PurchaseCardModal
        open={open}
        onOpenChange={setOpen}
        selectedIndex={selectedIndex}
        selectedPlanTitle={purchasePlanData[selectedIndex]?.title}
        purchasePlanData={purchasePlanData}
      />
    </div>
  )
}

export default PurchaseCardSection
