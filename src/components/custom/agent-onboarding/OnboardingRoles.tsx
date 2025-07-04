import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React, { FC } from 'react'

type Role = {
  icon: string
  title: string
}

type OnboardingRolesProps = {
  rolesData: Role[]
}

const OnboardingRoles: FC<OnboardingRolesProps> = ({ rolesData }: OnboardingRolesProps) => {
  return (
    <div className="bg-white container-padding">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left Image */}
        <div className="flex-shrink-0 w-full lg:w-[375px]">
          <img
            src="/assets/onboardingRoles1.jpg"
            alt="Roles Hero"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Right Carousel */}
        <div className="flex-1 w-full overflow-hidden">
          <Carousel
            opts={{
              align: 'start',
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="flex gap-4">
              {rolesData.map((role, idx) => (
                <CarouselItem key={idx} className="basis-[250px] lg:basis-[240px] flex-shrink-0">
                  <div
                    className={`
                      rounded-lg p-6 h-full 
                      flex flex-col items-center justify-center text-center
                      bg-[#FDF5EE] hover:bg-[#B7A46D] 
                      transition-colors duration-200 ease-in-out
                    `}
                  >
                    <img src={role.icon} alt={role.title} className="w-10 h-10 mb-4" />
                    <p className="text-sm font-medium text-black">{role.title}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default OnboardingRoles
