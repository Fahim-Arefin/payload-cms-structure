import { EligibilityCard } from './EligibilityCard'

const EligibilityTabSection = () => {
  return (
    <div>
      <div className="mt-4 md:mt-0">
        <div className="global-h3 font-semibold text-center text-[#434342]">
          METRICS THAT MATTER
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 pt-4 lg:pt-10 lg:justify-center lg:items-center">
        {/* CHILD CARD */}

        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 xl:gap-16 2xl:gap-20 mb-10">
          <EligibilityCard
            title="Child"
            icon="/assets/childIcon.svg"
            // bgImage="/assets/eligibilityImage1.jpg"
            entryMin="30"
            entryMinLabel="Days"
            entryMax="15"
            entryMaxLabel="Years"
            policyTerm="10-20"
            policyTermLabel="Years"
            maturityAge="25"
            maturityAgeLabel="Years"
          />
          <EligibilityCard
            title="Parents"
            icon="/assets/parentIcon.svg"
            // bgImage="/assets/parentsTab.jpg"
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
    </div>
  )
}

export default EligibilityTabSection
