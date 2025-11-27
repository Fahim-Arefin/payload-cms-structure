import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import { ShantaVisionBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: ShantaVisionBlockType
}

async function VisionMissionSection({ data }: Props) {
  const vissionMissionContent = {
    bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/vision.png`,
    // bgMobileImage: '/assets/about-us/mobile/vision.png',
    visionDescription:
      'To be the most trusted insurance brand by protecting the uncertainties of life through simple solutions and delivering maximum value.',
    missionDescription:
      'To promote the desired quality of life through innovation, digitalization and customer centricity.',
  }

  return (
    <>
      {/* lg:margin-bottom */}
      <div
        className="container-padding relative
        flex items-center text-white
        h-[200px] md:h-[250px] lg:h-[480px] xl:h-[480px] 2xl:h-[580px]
      "
      >
        {/* convert into Image component */}
        {typeof data?.bgImage === 'object' && data?.bgImage?.url && (
          <Image
            src={data?.bgImage?.url}
            alt="Vision and Mission Background"
            fill
            className="object-cover object-center inset-0"
            sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
            placeholder="blur"
            blurDataURL={data?.bgImageBlurDataURL || ''}
            quality={85}
          />
        )}

        {/* backgroun linear effect */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6))`,
          }}
        />

        <div className="w-full grid grid-cols-2 gap-2 md:gap-4 lg:gap-7 xl:gap-10 z-30">
          {/* Vision */}
          <div className="space-y-2 md:space-y-6 pr-2 md:pr-12 ">
            <h1 className="global-h1 font-medium lg:font-semibold uppercase ">
              {/* Our <span className="text-[#ED7125]">Vision</span> */}
              <LocalizedHighlighted
                textEn={data?.visionTitle}
                textBn={data?.visionTitleBN}
                highlightEn={data?.visionHighlightedText}
                highlightBn={data?.visionHighlightedTextBN}
              />
            </h1>
            <p
              className="global-p2 md:global-p1 max-w-[550px] 
          font-light text-justify 
          "
            >
              {/* {vissionMissionContent?.visionDescription} */}
              <LocalizedText en={data?.visionDescription} bn={data?.visionDescriptionBN} />
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-2 md:space-y-6 pl-2 md:pl-12 ">
            <h1 className="global-h1 font-medium lg:font-semibold uppercase ">
              {/* Our <span className="text-[#ED7125]">Mission</span> */}
              <LocalizedHighlighted
                textEn={data?.missionTitle}
                textBn={data?.missionTitleBN}
                highlightEn={data?.missionHighlightedText}
                highlightBn={data?.missionHighlightedTextBN}
              />
            </h1>
            <p
              className="global-p2 md:global-p1 max-w-[550px]
          font-light text-justify"
            >
              {/* {vissionMissionContent?.missionDescription} */}
              <LocalizedText en={data?.missionDescription} bn={data?.missionDescriptionBN} />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default VisionMissionSection
