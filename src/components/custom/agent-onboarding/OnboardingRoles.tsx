import React, { FC } from 'react'

type Role = {
  icon: string
  text: string
}

type OnboardingRolesProps = {
  rolesData: Role[]
}

const OnboardingRoles: FC<OnboardingRolesProps> = ({ rolesData }: OnboardingRolesProps) => {
  return (
    <div className="w-full ">
      {/* Desktop / Laptop */}
      <div className="hidden lg:grid lg:grid-cols-2 items-center bg-white">
        {/* Left image */}
        <div className="">
          <img
            src="/assets/onboardingRoles1.png"
            alt="Roles Image"
            className="h-[180px] md:h-full lg:max-h-[640px] xl:max-h-[720px] 2xl:max-h-[720px] object-cover
          w-full md:w-[90%] lg:w-[90%] 2xl:w-[75%]"
          />
        </div>

        {/* Right content */}
        <div className="flex flex-col justify-evenly bg-white h-full p-2 lg:p-4">
          {rolesData.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center lg:gap-2 xl:gap-4">
              <div className="md:w-[150px] md:h-[140px] 2xl:h-[140px]">
                <img src={item.icon} alt={`icon-${idx}`} className="w-full h-auto " />
              </div>
              <p className="whitespace-pre-line global-h3 text-['#434343']">{item?.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="relative block lg:hidden w-full ">
        {/* Mobile background image full height */}
        <div className="">
          <img
            src="/assets/onboardingRoles1.png"
            alt="Mobile Background"
            className="w-full h-[540px] object-cover"
          />
        </div>

        {/* Overlay content inside the image, not overflowing */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 ">
          <div className="bg-[#FCF4EB] rounded-md px-5 py-6 flex flex-col gap-5">
            {rolesData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-[50px] h-[50px]">
                  <img src={item.icon} alt={`icon-${idx}`} className="w-full h-auto mt-1" />
                </div>
                <p className="whitespace-pre-line text-sm text-gray-800">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingRoles
