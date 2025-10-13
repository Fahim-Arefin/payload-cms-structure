import Image from 'next/image'
import award1 from '/public/assets/homepage/web/award1.png'
import award2 from '/public/assets/homepage/web/award2.png'
import award3 from '/public/assets/homepage/web/award3.png'
import award4 from '/public/assets/homepage/web/award4.png'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import { ShantaMilestoneUnlockedBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: ShantaMilestoneUnlockedBlockType
}

function AwardSection({ data }: Props) {
  return (
    // <div className="bg-white pb-24 pt-12 md:py-24 lg:py-[110px] 2xl:py-[150px]">
    <div
      className="container-padding-y"
      style={{
        backgroundColor: data?.backgroundColor || '',
      }}
    >
      <div className="relative">
        {/* linear linear-gradient */}
        <div className="md:hidden absolute top-[135px] w-full h-[4px]">
          <div className="w-full h-[4px] bg-gradient-to-r from-transparent via-white to-transparent mx-auto" />
        </div>

        <h1
          className="global-h1 w-full lg:w-[85%] 2xl:w-[70%] mx-auto font-medium lg:font-semibold text-[#4A4A4A]
        text-center lg:text-start
        mb-5 md:mb-8 lg:mb-16  2xl:mb-24"
        >
          <LocalizedHighlighted
            textEn={data?.sectionTitle}
            textBn={data?.sectionTitleBN}
            highlightEn={data?.highlightedText}
            highlightBn={data?.highlightedTextBN}
            highlightClassName="text-[#ED7125]"
          />
        </h1>
        <div className="z-20 relative w-full lg:w-[85%] 2xl:w-[70%] mx-auto lg:min-h-[500px] grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section aligned to right */}
          <div className="flex justify-end items-center rounded-t-[14px] lg:rounded-t-[24px]">
            <div
              className="relative
            w-[70%] mx-auto lg:mx-0 lg:w-full rounded-2xl
            h-[200px] md:h-[300px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px]"
            >
              {/* web */}
              {typeof data?.image === 'object' && data?.image?.url && (
                <Image
                  fill
                  className="rounded-2xl object-cover"
                  // src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/about_milestone_2.jpg`}
                  src={data?.image?.url}
                  alt="why choose us"
                  sizes="(max-width: 767px) 300px, (max-width: 1023px) 50vw , (max-width: 1349px) 600px , 100vw"
                />
              )}
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col font-avenir">
            {/* top section */}
            <div className="hidden lg:flex h-[250px] 2xl:h-[300px] justify-center lg:justify-end items-center rounded-tl-2xl">
              <div className="flex justify-center lg:justify-end items-center flex-wrap w-full">
                {data?.stats?.map((stat, index) => (
                  <div className="w-[48%] md:w-[40%] lg:w-[45%] grid grid-cols-3" key={index}>
                    {/* icon */}
                    <div
                      className={`col-span-1 p-2 2xl:p-4 border-2 border-white lg:border-[#9A4E46] bg-white lg:bg-none 
                                      ${index === 0 || index === 1 ? 'rounded-t-sm md:rounded-t-md lg:rounded-t-lg xl:rounded-t-xl' : 'rounded-b-sm md:rounded-b-md lg:rounded-b-lg xl:rounded-b-xl '}`}
                    >
                      {typeof stat?.icon === 'object' && stat?.icon?.url && (
                        <div className="relative w-full aspect-square">
                          <Image
                            fill
                            src={stat?.icon?.url || ''}
                            alt="stat-icon"
                            className="object-cover object-center"
                            sizes="30vw"
                            // placeholder="blur"
                            // blurDataURL={stat?.iconBlurDataURL || ''}
                          />
                        </div>
                      )}
                    </div>

                    {/* value + label */}
                    <div
                      className={`col-span-2 text-white lg:text-[#434343] p-2 2xl:p-4 ${index === 0 || index === 1 ? 'border-b-2' : 'border-t-2'} border-white lg:border-[#9A4E46] w-full`}
                    >
                      <LocalizedText
                        as="div"
                        className="text-[30px] lg:text-[18px] 2xl:text-[38px] lg:h-[25px] 2xl:h-[50px] font-bold"
                        en={stat?.value}
                        bn={stat?.valueBN}
                      />
                      <LocalizedText
                        as="div"
                        className="text-white lg:text-[#9A4E46] text-[10px] md:text-[13px] lg:text-[11px] 2xl:text-[15px] font-light"
                        en={stat?.label}
                        bn={stat?.labelBN}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* bottom section */}
            <div
              className=" lg:h-[50%] absolute 
              inset-x-0 mx-auto top-[60%] 
              lg:bottom-0 lg:top-auto lg:right-0 lg:left-auto
            w-[90%] lg:w-[70%] xl:w-[67%] 2xl:w-[900px]"
            >
              <div
                className=" lg:h-[250px] 2xl:h-[300px] text-center lg:text-start
               p-2 md:p-6 lg:p-12 text-white space-y-2 lg:space-y-6
              rounded-[8px] bg-[rgba(156,134,57,0.5)] backdrop-blur-[15px]
              "
              >
                <div>
                  <h1 className="global-h2 font-bold">
                    <LocalizedText en={data?.milestoneTitle} bn={data?.milestoneTitleBN} />
                  </h1>
                  <h5 className="global-h4 font-light">
                    <LocalizedText en={data?.milestoneDate} bn={data?.milestoneDateBN} />
                  </h5>
                </div>
                <p className="global-p2 font-light">
                  <LocalizedText
                    en={data?.milestoneDescription}
                    bn={data?.milestoneDescriptionBN}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AwardSection
