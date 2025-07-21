import React, { FC } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { EligibilityCard } from './EligibilityCard'
import Link from 'next/link'
import GlobalButton from '../shared/GlobalButton'

type EligibilityTabSectionProps = {
  value: string
}

const EligibilityTabSection: FC<EligibilityTabSectionProps> = ({ value }) => {
  return (
    <TabsContent value={value} className="flex flex-col">
      <div className="mt-4 md:mt-0">
        <span className="text-[20px] lg:global-h1 md:global-span font-bold text-[#434342]">
          METRICS THAT MATTER
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-4 lg:pt-10 lg:justify-center lg:items-center">
        {/* CHILD CARD */}

        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 xl:gap-16 2xl:gap-20 mb-10">
          <EligibilityCard
            title="Child"
            icon="/assets/childIcon.svg"
            bgImage="/assets/eligibilityImage1.jpg"
            entryMin="30"
            entryMinLabel="Days"
            entryMax="15"
            entryMaxLabel="Years"
            policyTerm="10-20"
            policyTermLabel="Years"
            maturityAge="55"
            maturityAgeLabel="Years"
          />
          <EligibilityCard
            title="Parents"
            icon="/assets/parentIcon.svg"
            bgImage="/assets/parentsTab.jpg"
            entryMin="21"
            entryMinLabel="Years"
            entryMax="55"
            entryMaxLabel="Years"
            policyTerm="10-20"
            policyTermLabel="Years"
            maturityAge="65"
            maturityAgeLabel="Years"
          />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-center items-center gap-4 mt-4 md:mt-10 lg:mt-20">
        <Link
          href="/assets/pdf/Required Brochures/Child Education Plan/Child Education Security Plan.pdf"
          target="_blank"
        >
          <GlobalButton text="Calculate Premium" variant="primary" />
        </Link>
        <GlobalButton
          className="border-[#9C8639] border-2 text-[#9C8639] cursor-not-allowed"
          text="Download Brochure"
          variant="outline"
        />
      </div>
    </TabsContent>
  )
}

export default EligibilityTabSection
