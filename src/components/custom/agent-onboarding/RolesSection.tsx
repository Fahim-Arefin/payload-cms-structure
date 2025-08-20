import { OnboardingRoleType } from '@/types'
import RolesCardList from './RolesCardList'
import Image from 'next/image'

type OnboardingRoleData = {
  image: string
  mobileImage?: string
  title: string
  coloredTitle: string
  data: OnboardingRoleType[]
}

type Props = {
  onboardingRoleData: OnboardingRoleData
}

function RolesSection({ onboardingRoleData }: Props) {
  return (
    <div className="container-padding bg-[#FCF4EBCC] relative overflow-hidden">
      <h1 className="global-h1 font-medium lg:font-semibold text-[#434342] uppercase">
        {onboardingRoleData?.title}{' '}
        <span className="text-[#ED7125]">{onboardingRoleData?.coloredTitle}</span>
      </h1>
      <div className="mt-6 md:mt-10">
        {/* left side */}
        <div className="flex lg:gap-12 xl:gap-20 2xl:gap-x-20">
          {/* image with gradient */}
          {/* h-[195px] md:h-[330px] lg:h-[400px] xl:h-[450px] 2xl:h-[520px] */}
          <div
            className="flex flex-col items-center gap-4 relative overflow-hidden
           w-[140px] md:w-[250px] lg:w-[300px] xl:w-[380px] 2xl:w-[450px] 
           aspect-[3/4] 
           rounded-[6px] lg:rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15px]
          "
          >
            <Image
              fill
              src={onboardingRoleData?.image}
              alt="All About"
              className="object-cover"
              // sizes="(max-width: 767px) 300px, (max-width: 1023px) 50vw , (max-width: 1349px) 350px, 500px"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 rounded-[6px] lg:rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15px] z-10"></div>
          </div>
        </div>
        {/* right-side */}
        <div
          className="absolute z-40
        top-[45%] md:top-[45%] lg:top-[22%] xl:top-[23%] 2xl:top-1/4 
        left-[20%] md:left-[16%] lg:left-[200px] xl:left-[220px] 2xl:left-[400px] 
        w-[91%] md:w-[90%] lg:w-[80%] xl:w-[83%] 2xl:w-[1500px]"
        >
          <RolesCardList onboardingRoleData={onboardingRoleData?.data} />
        </div>
      </div>
    </div>
  )
}

export default RolesSection
