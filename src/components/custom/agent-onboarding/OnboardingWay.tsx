import React, { FC } from 'react'
import { FootPrintSlider } from '../about-us/FootPrintSlider'
import { WayWeAreSlider } from './WayWeAreSlider'

type wayWeAreData = {
  image: string
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
            h-[230px] md:h-[330px] lg:h-[430px] xl:h-[530px] 2xl:h-[550px] bg-white overflow-hidden "
      >
        {/* Content */}
        <div className="container-padding uppercase relative z-10">
          <div className="text-center lg:text-start">
            <h1 className="global-h1 lg:font-semibold">THE WAY WE ARE</h1>
          </div>
        </div>
      </div>
      {/* Slider */}
      {/* <div className="-mt-[270px] pb-[100px] z-20 bg-white"> */}
      <div
        className="-mt-[90px] md:-mt-[100px] lg:-mt-[170px] 2xl:-mt-[270px] 
          z-20 bg-white"
      >
        <WayWeAreSlider wayWeAreData={wayWeAreData ?? []} />
      </div>
    </div>
  )
}

export default OnboardingWay
