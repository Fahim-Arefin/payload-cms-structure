'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogOverlay,
} from '@/components/ui/dialog'
import React from 'react'
import GlobalButton from '../shared/GlobalButton'

// Import or copy your tabContent here:
const tabContent = [
  // Original tab (Child Plan)
  {
    content: [
      {
        title: 'Customizable Coverage',
        description: 'Choose a sum assured based on your child’s future needs.',
        image: '/assets/childTabIcon1.png',
      },
      {
        title: 'Maturity Benefit',
        description:
          'Receive the full sum assured at the end of the policy term to support higher education goals.',
        image: '/assets/childTabIcon2.png',
      },
      {
        title: 'Tax Benefits',
        description: 'Enjoy tax rebates on premiums, avail upto 15% tax rebate. ',
        image: '/assets/childTabIcon3.png',
      },
      {
        title: 'Partner Discounts',
        description:
          'Avail exclusive discounts on medical and diagnostic services at partnered hospitals and diagnostic centers.',
        image: '/assets/childTabIcon4.png',
      },
      {
        title: 'Life Coverage',
        description: 'In the event of the parent’s death, the plan ensures:',
        listItems: [
          "Monthly stipend (1%, 2%, or 3% of the sum assured, based on plan choice) till policy maturity to ensure the child's education quality.",
          'Waiver of all future premiums while continuing full coverage.',
          'Full maturity benefit paid at term-end.',
        ],
        image: '/assets/childTabIcon5.png',
      },
      {
        title: 'Flexible Premium Payments',
        description: 'Opt for monthly, quarterly, half-yearly, or annual premium modes.',
        image: '/assets/childTabIcon6.png',
      },
    ],
  },

  // Tab 2: Multiple Guaranteed Payouts, Maturity Benefit, Life Coverage, Tax Benefits, Flexible Premium Payments, Healthcare Partner Discounts
  {
    content: [
      {
        title: 'Multiple Guaranteed Payouts',
        description: 'Choose a sum assured based on your child’s future needs.', // You can update this description as needed
        image: '/assets/childTabIcon1.png',
      },
      {
        title: 'Maturity Benefit',
        description:
          'Receive the full sum assured at the end of the policy term to support higher education goals.',
        image: '/assets/childTabIcon2.png',
      },
      {
        title: 'Life Coverage',
        description: 'In the event of the parent’s death, the plan ensures:',
        listItems: [
          "Monthly stipend (1%, 2%, or 3% of the sum assured, based on plan choice) till policy maturity to ensure the child's education quality.",
          'Waiver of all future premiums while continuing full coverage.',
          'Full maturity benefit paid at term-end.',
        ],
        image: '/assets/childTabIcon5.png',
      },
      {
        title: 'Tax Benefits',
        description: 'Enjoy tax rebates on premiums, avail upto 15% tax rebate. ',
        image: '/assets/childTabIcon3.png',
      },
      {
        title: 'Flexible Premium Payments',
        description: 'Opt for monthly, quarterly, half-yearly, or annual premium modes.',
        image: '/assets/childTabIcon6.png',
      },
      {
        title: 'Healthcare Partner Discounts',
        description:
          'Avail exclusive discounts on medical and diagnostic services at partnered hospitals and diagnostic centers.',
        image: '/assets/childTabIcon4.png',
      },
    ],
  },

  // Tab 3: Maturity Benefit, Life Coverage, Tax Benefits, Flexible Premium Payments, Healthcare Partner Discounts
  {
    content: [
      {
        title: 'Maturity Benefit',
        description:
          'Receive the full sum assured at the end of the policy term to support higher education goals.',
        image: '/assets/childTabIcon2.png',
      },
      {
        title: 'Life Coverage',
        description: 'In the event of the parent’s death, the plan ensures:',
        listItems: [
          "Monthly stipend (1%, 2%, or 3% of the sum assured, based on plan choice) till policy maturity to ensure the child's education quality.",
          'Waiver of all future premiums while continuing full coverage.',
          'Full maturity benefit paid at term-end.',
        ],
        image: '/assets/childTabIcon5.png',
      },
      {
        title: 'Tax Benefits',
        description: 'Enjoy tax rebates on premiums, avail upto 15% tax rebate. ',
        image: '/assets/childTabIcon3.png',
      },
      {
        title: 'Flexible Premium Payments',
        description: 'Opt for monthly, quarterly, half-yearly, or annual premium modes.',
        image: '/assets/childTabIcon6.png',
      },
      {
        title: 'Healthcare Partner Discounts',
        description:
          'Avail exclusive discounts on medical and diagnostic services at partnered hospitals and diagnostic centers.',
        image: '/assets/childTabIcon4.png',
      },
    ],
  },
]

type PurchaseCardModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedIndex: number
  selectedPlanTitle?: string
}

export const PurchaseCardModal = ({
  open,
  onOpenChange,
  selectedIndex,
  selectedPlanTitle,
}: PurchaseCardModalProps) => {
  const content = tabContent[selectedIndex]?.content || []
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="backdrop-blur-sm bg-black/30" />
      <DialogContent className="w-full h-[80vh] lg:h-fit overflow-scroll lg:overflow-hidden md:max-w-lg lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl bg-white rounded-lg px-0 py-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#ED7125] text-center">
            {selectedPlanTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="px-8 py-4 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-6 md:gap-y-6">
          {/* Left column: First 4 */}
          <div className="flex flex-col gap-4 xl:gap-12">
            {content.slice(0, 3).map((content, idx) => (
              <div key={content.title + idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 h-[38px] w-[38px] md:h-[48px] md:w-[48px] flex items-center justify-center">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                  <h3 className="text-[#434342] text-base md:text-lg font-semibold uppercase">
                    {content.title}
                  </h3>
                  <p className="text-[#434342] text-[15px] md:text-base leading-normal font-normal">
                    {content.description}
                  </p>
                  {content.listItems && Array.isArray(content.listItems) && (
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-[#434342] text-[15px] md:text-base">
                      {content.listItems.map((item: string, liIdx: number) => (
                        <li key={liIdx} className="leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Right column: Last 2 */}
          <div className="flex flex-col gap-8">
            {content.slice(3).map((content, idx) => (
              <div key={content.title + idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 h-[38px] w-[38px] md:h-[48px] md:w-[48px] flex items-center justify-center">
                  <img
                    src={content.image}
                    alt={content.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 max-w-[370px]">
                  <h3 className="text-[#434342] text-base md:text-lg font-semibold uppercase">
                    {content.title}
                  </h3>
                  <p className="text-[#434342] text-[15px] md:text-base leading-normal font-normal">
                    {content.description}
                  </p>
                  {content.listItems && Array.isArray(content.listItems) && (
                    <ul className="list-disc pl-4 mt-2 space-y-1 text-[#434342] text-[15px] md:text-base">
                      {content.listItems.map((item: string, liIdx: number) => (
                        <li key={liIdx} className="leading-snug">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-x-4 mt-8">
          <GlobalButton
            size="large"
            text="Download Brochure"
            variant="primary"
            className="min-w-[200px] cursor-not-allowed"
          />
          <GlobalButton
            size="large"
            text="Calculate Premium"
            variant="outline"
            className="min-w-[200px] cursor-not-allowed text-[#9C8639] hover:text-[#9C8637] border-[#9C8639]"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
