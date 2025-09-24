import { FC } from 'react'
import WayWeAreSlider from './WayWeAreSlider'
import { WayWeAreDataType } from '@/types'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

type wayWeAreData = {
  image: string
  title: string
  titleBN: string
  coloredTitle: string
  coloredTitleBN: string
  data: WayWeAreDataType[]
}

type OnboardingWayProps = {
  wayWeAreData: wayWeAreData
}

const OnboardingWay: FC<OnboardingWayProps> = ({ wayWeAreData }: OnboardingWayProps) => {
  return (
    <div className="relative">
      <div
        className="relative 
            h-[200px] md:h-[400px] lg:h-[500px] xl:h-[650px] 2xl:h-[750px]
             bg-white overflow-hidden"
      >
        {/* image */}
        <Image
          src={wayWeAreData?.image}
          alt={wayWeAreData?.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
        />
        {/* Content */}
        <div
          className="w-full md:w-[95%] mx-auto uppercase relative z-10
        py-5 md:py-[50px] lg:py-[80px] xl:py-[90px] "
        >
          <div className="text-center">
            <h1 className="global-h1 lg:font-normal uppercase">
              {/* {wayWeAreData?.title} -{' '}
              <span className="text-[#ED7125]">{wayWeAreData?.coloredTitle}</span>  */}
              <LocalizedHighlighted
                textEn={wayWeAreData?.title}
                textBn={wayWeAreData?.titleBN}
                highlightBn={wayWeAreData?.coloredTitleBN}
                highlightEn={wayWeAreData?.coloredTitle}
                highlightClassName="text-[#ED7125]"
              />
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
        <WayWeAreSlider wayWeAreData={wayWeAreData?.data ?? []} />
      </div>
    </div>
  )
}

export default OnboardingWay
