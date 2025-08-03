import { FC } from 'react'
import WayWeAreSlider from './WayWeAreSlider'

type wayWeAreData = {
  image: string
  mobileImage: string
  title: string
  description: string
}

type OnboardingWayProps = {
  wayWeAreData?: wayWeAreData[]
}

const OnboardingWay: FC<OnboardingWayProps> = ({ wayWeAreData }: OnboardingWayProps) => {
  return (
    <div className="relative">
      <div
        className="relative
            h-[180px] md:h-[360px] lg:h-[470px] xl:h-[620px] 2xl:h-[750px] bg-white overflow-hidden bg-[url('/assets/wayBgBanner.png')] bg-cover bg-no-repeat"
      >
        {/* Content */}
        <div
          className="w-[95%] mx-auto uppercase relative z-10
        py-5 md:py-[50px] lg:py-[80px] xl:py-[100px] "
        >
          <div className="text-center">
            <h1 className="global-h1 lg:font-normal">
              More than a Workplace- <span className="text-[#ED7125]">A Movement</span> 
            </h1>
          </div>
        </div>
      </div>
      {/* Slider */}
      <div
        // className="-mt-[90px] md:-mt-[100px] lg:-mt-[170px] 2xl:-mt-[270px]
        //   z-20 bg-white"
        // bg-[#F6EDDD]
        className=" bg-transparent
          z-20 "
      >
        <WayWeAreSlider wayWeAreData={wayWeAreData ?? []} />
      </div>
    </div>
  )
}

export default OnboardingWay
