import { OnboardingRoleType } from '@/types'
import RolesCardList from './RolesCardList'

type Props = {
  onboardingRoleData: OnboardingRoleType[]
}

function RolesSection({ onboardingRoleData }: Props) {
  return (
    <div className="container-padding bg-[#FCF4EBCC] relative overflow-hidden">
      <h1 className="global-h1 font-semibold text-[#434342] uppercase">
        Where Freedom Meets <span className="text-[#ED7125]">Opportunity</span>
      </h1>
      <div className="mt-6 md:mt-10">
        {/* left side */}
        <div className="flex lg:gap-12 xl:gap-20 2xl:gap-x-20">
          {/* image with gradient */}
          <div
            className="flex flex-col items-center gap-4 relative overflow-hidden
           w-[140px] md:w-[200px] lg:w-[300px] xl:w-[300px] 2xl:w-[375px] 
           h-[195px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[520px]
          "
          >
            <img
              src="/assets/agent-onboarding/web/agentOnboardingBanner.jpg"
              alt="All About"
              className="object-cover w-full h-full"
            />

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black/25 rounded-[15px] z-10"></div> */}
          </div>
        </div>
        {/* right-side */}
        <div
          className="absolute z-40
        top-[45%] md:top-[45%] lg:top-[22%] xl:top-[23%] 2xl:top-1/4 
        left-[20%] md:left-[16%] lg:left-[200px] xl:left-[220px] 2xl:left-[400px] 
        w-[91%] md:w-[90%] lg:w-[80%] xl:w-[83%] 2xl:w-[1500px]"
        >
          <RolesCardList onboardingRoleData={onboardingRoleData} />
        </div>
      </div>
    </div>
  )
}

export default RolesSection
