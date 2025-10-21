import { MoreThanAWorkplaceBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import { FC } from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import WayWeAreSlider from './WayWeAreSlider'

type OnboardingWayProps = {
  wayWeAreData: MoreThanAWorkplaceBlockType
}

const OnboardingWay: FC<OnboardingWayProps> = ({ wayWeAreData }: OnboardingWayProps) => {
  return (
    <div className="relative">
      <div
        // h-[200px] md:h-[400px] lg:h-[500px] xl:h-[650px] 2xl:h-[750px]
        className="relative
            h-[200px] md:h-[350px] lg:h-[400px] xl:h-[550px] 2xl:h-[650px]
             bg-white overflow-hidden"
      >
        {/* image */}
        {typeof wayWeAreData?.backgroundImage === 'object' &&
          wayWeAreData?.backgroundImage?.url && (
            <Image
              src={wayWeAreData?.backgroundImage?.url}
              alt={wayWeAreData?.title}
              fill
              className="object-cover object-center"
              sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
              placeholder="blur"
              blurDataURL={wayWeAreData?.backgroundImageBlurDataURL || ''}
              quality={80}
            />
          )}
        {/* Content */}
        <div
          //  py-5 md:py-[50px] lg:py-[80px] xl:py-[90px]
          className="w-full md:w-[95%] mx-auto uppercase relative z-10 py-5 md:py-[50px] lg:py-[80px] xl:py-[90px]"
        >
          <div className="text-center">
            <h1 className="global-h1 lg:font-normal uppercase">
              {/* {wayWeAreData?.title} -{' '}
              <span className="text-[#ED7125]">{wayWeAreData?.coloredTitle}</span>  */}
              <LocalizedHighlighted
                textEn={wayWeAreData?.title}
                textBn={wayWeAreData?.titleBN}
                highlightEn={wayWeAreData?.highlightedText}
                highlightBn={wayWeAreData?.highlightedTextBN}
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
        <WayWeAreSlider wayWeAreData={wayWeAreData?.gallery ?? []} />
      </div>
    </div>
  )
}

export default OnboardingWay
