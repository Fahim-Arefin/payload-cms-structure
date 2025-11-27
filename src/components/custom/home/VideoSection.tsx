import { LifeInsuranceVideoBlockType } from '@/types/payloadCustomTypes'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import HomeVideoArea from './HomeVideoArea'

type Props = {
  homeVideoData: LifeInsuranceVideoBlockType
}

function VideoSection({ homeVideoData }: Props) {
  return (
    <>
      {homeVideoData && (
        <div
          className="container-padding-t"
          style={{
            backgroundColor: homeVideoData?.backgroundColor || '',
          }}
        >
          <div className="relative w-full font-avenir h-[230px] md:h-[350px] lg:h-[400px] xl:h-[550px] 2xl:h-[600px]">
            {/* Background Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
            >
              <source
                // src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/bg.mp4`}
                src={homeVideoData?.backgroundVideoUrl}
                type="video/mp4"
              />
            </video>

            {/* Semi-transparent black overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Foreground content */}
            <HomeVideoArea data={homeVideoData} />
            <div
              className="z-20 absolute inset-x-0
          text-center text-white
          bottom-10 lg:bottom-12 xl:bottom-16 2xl:bottom-20
          global-h2 md:font-medium uppercase"
            >
              {/* Stay Ahead With Our <span className="text-[#ED7125]">Experts </span> */}
              {/* {highlightText(homeVideoData?.title || '', homeVideoData?.highlightedText || '', {
                highlightClassName: 'text-[#ED7125]',
                all: false,
              })} */}
              <LocalizedHighlighted
                textEn={homeVideoData?.title}
                textBn={homeVideoData?.titleBN}
                highlightEn={homeVideoData?.highlightedText}
                highlightBn={homeVideoData?.highlightedTextBN}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default VideoSection
