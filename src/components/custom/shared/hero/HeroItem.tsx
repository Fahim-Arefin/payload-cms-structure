import Image from 'next/image'
import Link from 'next/link'

import { HeroContentType } from '@/types'
import CallNowButton from '../CallNowButton'
import GlobalButton from '../GlobalButton'

type Props = {
  slide: HeroContentType
  top?: string
  position?: string
}

const HeroItem = ({ slide, top, position }: Props) => {
  return (
    <>
      {/* Background image */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        priority
        className={`object-cover ${position}`}
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* Content */}
      <div
        className={`absolute
        inset-x-0 lg:left-[120px] xl:left-[200px] 2xl:left-[270px] lg:right-auto
       space-y-4 md:space-y-6 xl:space-y-10 2xl:space-y-20
       z-20
       lg:w-[920px] xl:w-[1205px] 2xl:w-[1405px]
        ${top ? top : ' top-[100px] md:top-[150px] lg:top-[35%] '}`}
      >
        {/* Title & subtitle */}
        <div
          className="text-left
        hero-content-width
        tracking-[3%] lg:tracking-[0%]
        font-semibold text-white
        hero-h1 uppercase"
        >
          <h1>{slide.title ? slide.title : ''}</h1>
          <h1 className="lg:mt-2">{slide.subtitle ? slide.subtitle : ''}</h1>
        </div>

        {/* description */}
        {slide?.description && (
          <>
            <div
              className="
              block lg:hidden
          hero-description-bg-sm
          font-[350]
         hero-content-width
          p-2 md:p-3 lg:p-4
          hero-h5"
            >
              <div className="text-white">
                {slide?.description?.split('. ')?.map((line, i) => (
                  <h5 key={i}>{line.trim()}</h5>
                ))}
              </div>
            </div>

            {/* description style after lg screen */}
            <div
              className="
              hidden lg:block
          hero-description-bg-lg
          font-[350]
         w-fit
          p-2 md:p-3 lg:p-4
          hero-h5
          "
            >
              <div className="text-white">
                {slide?.description?.split('. ')?.map((line, i) => (
                  <h5 key={i}>{line.trim()}</h5>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        {(slide?.showPurchaseButton || slide?.showCallButton) && (
          <div className="hero-content-width mt-4 lg:mt-6 flex flex-col md:flex-row gap-2 w-fit">
            {slide?.showPurchaseButton && (
              <Link href="/purchase" target="_blank">
                <GlobalButton text="Purchase" variant="primary" size="large" />
              </Link>
            )}
            {slide?.showCallButton && <CallNowButton />}
          </div>
        )}

        {/* Button */}
        {/* <div
          className="
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <Button
            variant="primary"
            className="px-4 md:px-6 py-1 md:py-2 2xl:px-10 2xl:py-6 rounded-[4px] lg:rounded-[8px]
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px]
            text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] font-normal"
          >
            Explore Now
          </Button>
          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <div className="p-1 rounded-full border-2 border-white 2xl:p-2">
              <BsPlay />
            </div>
            <div className="text-[12px] md:text-[14px] lg:text-[16px] 2xl:text-[18px] font-normal">
              From the Expert
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default HeroItem
