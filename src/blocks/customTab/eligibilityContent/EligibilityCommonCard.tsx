import LocalizedText from '@/components/custom/shared/LocalizedText'
import { EligibilityContentBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'

type Props = {
  data: EligibilityContentBlockType['eligibilityData'][number]
}

export const EligibilityCommonCard = ({ data }: Props) => {
  return (
    <div
      // xl:h-[535px] xl:w-[347px]
      // w-full md:w-[300px] mx-auto lg:mx-0 xl:w-[347px]
      className="rounded-md xl:rounded-lg 2xl:rounded-xl p-4 lg:p-6 2xl:p-8 
      w-full md:max-w-[300px] mx-auto lg:mx-0 xl:max-w-[400px]
      h-fit
      overflow-hidden 
      shadow-lg
      flex flex-col 
      "
      style={{
        backgroundColor: data?.backGroundColor || '',
        border: `3px solid ${data?.borderColor}`,
      }}
    >
      <div className="flex flex-col gap-2 items-center">
        <div className="relative w-14 aspect-[1/1]">
          {typeof data?.icon === 'object' && data?.icon?.url && (
            <Image
              fill
              src={data?.icon?.url}
              alt={data?.iconTitle || 'Icon'}
              className="object-cover object-center"
              quality={90}
              placeholder="blur"
              blurDataURL={data?.iconBlurDataURL || ''}
            />
          )}
        </div>
        <p className="uppercase text-[#434343] font-bold global-p1 mt-2">
          <LocalizedText en={data?.iconTitle} bn={data?.iconTitleBN} />
        </p>
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 mt-4 ">
        {/* Entry Age */}
        {data?.age && (
          <div
            className=" px-2 2xl:px-6 py-4 w-full flex flex-col items-center shadow-md"
            style={{
              borderRadius: '6.667px',
              // background: 'rgba(156, 134, 57, 0.10)',
              background: '#434343',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="text-[#FCF4EB]/70 global-p2 uppercase mb-1 font-light">
              <LocalizedText en={data?.age?.title} bn={data?.age?.titleBN} />
            </div>
            <div className="flex justify-between w-full px-2 text-white">
              <div className="flex flex-col items-center">
                <p className="text-sm font-light text-[#FCF4EB]/70">
                  <LocalizedText en={data?.age?.minAgeLabel} bn={data?.age?.minAgeLabelBN} />
                </p>
                <p className="global-span font-bold">
                  <LocalizedText en={data?.age?.minAgeValue} bn={data?.age?.minAgeValueBN} />
                </p>
                <p className="text-base -mt-2 font-light text-[#FCF4EB]/70">
                  <LocalizedText
                    en={data?.age?.minAgeValuePeriod}
                    bn={data?.age?.minAgeValuePeriodBN}
                  />
                </p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-sm font-light text-[#FCF4EB]/70">
                  <LocalizedText en={data?.age?.maxAgeLabel} bn={data?.age?.maxAgeLabelBN} />
                </p>
                <p className="global-span font-bold">
                  <LocalizedText en={data?.age?.maxAgeValue} bn={data?.age.maxAgeValueBN} />
                </p>
                <p className="text-base -mt-2 font-light text-[#FCF4EB]/70">
                  <LocalizedText
                    en={data?.age?.maxAgeValuePeriod}
                    bn={data?.age?.maxAgeValuePeriodBN}
                  />
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Policy Term */}
        {data?.policyTerm && data?.policyTerm?.title && data?.policyTerm?.value && (
          <div
            className=" px-2 2xl:px-6 py-4 w-full flex flex-col items-center shadow-md"
            style={{
              borderRadius: '6.667px',
              // background: 'rgba(156, 134, 57, 0.10)',
              background: '#434343',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="global-p2 uppercase mb-1 font-light text-[#FCF4EB]/70">
              <LocalizedText en={data?.policyTerm?.title} bn={data?.policyTerm?.titleBN} />
            </div>
            <div className="text-white font-medium global-p1">
              <LocalizedText en={data?.policyTerm?.value} bn={data?.policyTerm?.valueBN} />
            </div>
          </div>
        )}
        {/* Maturity Age */}
        {data?.maturityAge && data?.maturityAge?.title && data?.maturityAge?.value && (
          <div
            className=" px-2 2xl:px-6 py-4 w-full flex flex-col items-center shadow-md"
            style={{
              borderRadius: '6.667px',
              // background: 'rgba(156, 134, 57, 0.10)',
              background: '#434343',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="global-p2 uppercase mb-1 font-light text-[#FCF4EB]/70">
              <LocalizedText en={data?.maturityAge?.title} bn={data?.maturityAge?.titleBN} />
            </div>
            <div className="text-white font-medium global-p1">
              <LocalizedText en={data?.maturityAge?.value} bn={data?.maturityAge?.valueBN} />
            </div>
          </div>
        )}
        {/* Physical Condition */}
        {data?.physicalCondition &&
          data?.physicalCondition?.title &&
          data?.physicalCondition?.value && (
            <div
              className=" px-2 2xl:px-6 py-4 w-full flex flex-col items-center shadow-md"
              style={{
                borderRadius: '6.667px',
                // background: 'rgba(156, 134, 57, 0.10)',
                background: '#434343',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="global-p2 uppercase mb-1 font-light text-[#FCF4EB]/70">
                <LocalizedText
                  en={data?.physicalCondition?.title}
                  bn={data?.physicalCondition?.titleBN}
                />
              </div>
              <div className="text-white font-medium global-p1">
                <LocalizedText
                  en={data?.physicalCondition?.value}
                  bn={data?.physicalCondition?.valueBN}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
