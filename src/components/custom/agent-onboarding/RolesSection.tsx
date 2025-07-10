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
      <div className="mt-10">
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
              src="/assets/onboardingRolesBanner.jpg"
              alt="All About"
              className="object-cover w-full h-full"
            />

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black/25 rounded-[15px] z-10"></div> */}
          </div>
        </div>
        {/* right-side */}
        <div
          className="absolute 
        top-[25%] md:top-[22%] lg:top-[22%] 
        left-[100px] md:left-[100px] lg:left-[200px] 2xl:left-[450px]
        w-[95%] md:w-[90%] lg:w-[800px] xl:w-[1200px] 2xl:w-[1800px]"
        >
          <RolesCardList onboardingRoleData={onboardingRoleData} />
        </div>
      </div>
    </div>
  )
}

export default RolesSection
