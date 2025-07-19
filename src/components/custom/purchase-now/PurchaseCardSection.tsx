import { AllPlantDataType } from '@/types'
import React, { FC } from 'react'
import AllPlanCard from '../shared/plans/AllPlanCard'
import PurchaseCard from './PurchaseCard'

type PurchaseCardSectionProps = {
  blur?: boolean
}

const PurchaseCardSection: FC<PurchaseCardSectionProps> = ({ blur }) => {
  const purchasePlanData = [
    {
      title: 'Shanta Endowment Plans',
      description: `Turn today’s choices into tomorrow’s freedom.`,

      image: '/assets/purchase-now/purchaseCard1.jpg',
    },
    {
      title: 'Child Education',
      description: 'A brighter future starts with a thoughtful plan',

      image: '/assets/purchase-now/purchaseCard2.jpg',
    },
    {
      title: 'Shanta Multi-Stage Maturity Plans',
      description: `Life happens. We make sure you're ready.`,

      image: '/assets/purchase-now/purchaseCard3.jpg',
    },
  ]
  return (
    <div className="py-12 lg:py-24">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
     gap-5 md:gap-8 lg:gap-5 xl:gap-12 2xl:gap-16"
      >
        {purchasePlanData?.map((data, index) => (
          <PurchaseCard key={index} data={data} blur={blur} />
        ))}
      </div>
    </div>
  )
}

export default PurchaseCardSection
