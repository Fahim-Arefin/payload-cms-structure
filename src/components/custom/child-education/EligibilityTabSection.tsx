import React, { FC } from 'react'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { EligibilityCard } from './EligibilityCard'

type EligibilityTabSectionProps = {
  value: string
}

const EligibilityTabSection: FC<EligibilityTabSectionProps> = ({ value }) => {
  return (
    <TabsContent value={value} className="flex flex-col">
      <div className="">
        <span className="global-h1 md:global-h3 font-bold text-[#434342]">METRICS THAT MATTER</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-4 lg:pt-10 justify-center items-center">
        {/* CHILD CARD */}

        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 xl:gap-16 2xl:gap-20 justify-center items-center mb-10">
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
            bgImage="/assets/eligibilityImage2.jpg"
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
              <Button
                variant="primary"
                className="
                  cursor-not-allowed
                  px-2 md:px-6 2xl:px-10
                  py-1 md:py-2 2xl:py-6
                  h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
                  rounded-[4px] lg:rounded-[6px] 
                  w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
                  global-h4 font-normal"
              >
                Download Brochure
              </Button>
              <Button
                variant="primary"
                className="
                  cursor-not-allowed
                  px-2 md:px-6 2xl:px-10
                  bg-[#9C8639]
                  py-1 md:py-2 2xl:py-6
                  h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
                  rounded-[4px] lg:rounded-[6px] 
                  
                  global-h4 font-normal"
              >
                Calculate Premium
              </Button>
            </div>
    </TabsContent>
  )
}

export default EligibilityTabSection
