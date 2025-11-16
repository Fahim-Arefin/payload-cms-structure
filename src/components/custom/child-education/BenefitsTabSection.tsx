'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { LuArrowUpRight } from 'react-icons/lu'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import LocalizedString from '../shared/LocalizedString'
import { AdditionalBenefitContentBlockType } from '@/types/payloadCustomTypes'
import LocalizedRichText from '../shared/LocalizedRichText'
import { pageHref } from '@/lib/utils'

type Props = {
  data: AdditionalBenefitContentBlockType
}

export function BenefitsTabSection({ data }: Props) {
  const benefitData = data?.additionalBenefits[0] || []
  return (
    <div className="p-2 lg:p-3 xl:p-4">
      {/* <div className="w-full flex flex-col lg:flex-row md:items-start gap-8 mt-[15px] md:mt-0 "> */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-8 mt-[15px] md:mt-0 ">
        {/* Right Image - top on mobile/tablet, right on desktop */}
        <div className="w-full h-auto order-1 lg:order-2 col-span-1 lg:col-span-2 xl:col-span-1">
          {/* mobile */}
          <div className="relative lg:hidden rounded-md w-full aspect-[4/3] ">
            {typeof benefitData?.mobileImage === 'object' && benefitData?.mobileImage?.url && (
              <Image
                fill
                src={benefitData?.mobileImage?.url}
                alt="Benifit Section Image"
                className="object-cover object-center rounded-md"
                sizes="100vw"
                quality={80}
                placeholder="blur"
                blurDataURL={benefitData?.mobileImageBlurDataURL || ''}
              />
            )}
          </div>
          {/* web */}
          <div className="relative hidden lg:block w-full aspect-[500/700] rounded-md lg:rounded-lg xl:rounded-xl">
            {typeof benefitData?.desktopImage === 'object' && benefitData?.desktopImage?.url && (
              <Image
                fill
                src={benefitData?.desktopImage?.url}
                alt="Benifit Section Image"
                className="object-cover lg:object-[83%] xl:object-[88%] rounded-md lg:rounded-lg xl:rounded-xl"
                sizes="50vw"
                quality={80}
                placeholder="blur"
                blurDataURL={benefitData?.desktopImageBlurDataURL || ''}
              />
            )}
          </div>
        </div>

        {/* Left Content */}
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 xl:col-span-2">
          <h2 className="global-h1 font-semibold uppercase mb-2 lg:mb-10 text-[#434343]">
            <LocalizedHighlighted
              textEn={benefitData?.title}
              textBn={benefitData?.titleBN}
              highlightEn={benefitData?.highlightedText}
              highlightBn={benefitData?.highlightedTextBN}
            />
            <br />
            <LocalizedHighlighted
              textEn={benefitData?.subtitle}
              textBn={benefitData?.subtitleBN}
              highlightEn={benefitData?.highlightedSubtitle}
              highlightBn={benefitData?.highlightedSubtitleBN}
            />
          </h2>
          <div className="space-y-4 lg:space-y-8 mt-6 text-[#434343] ">
            <div className="global-p2">
              <LocalizedRichText en={benefitData?.description} bn={benefitData?.descriptionBN} />
            </div>
            {benefitData?.benefits && benefitData?.benefits?.length > 0 && (
              <ul className="flex flex-col gap-2 md:gap-4 justify-center px-4 md:px-8 lg:px-16 xl:px-24">
                {benefitData?.benefits?.map((r, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-5 h-5 md:w-6 md:h-6 xl:h-8 rounded bg-[#ED7125] text-white font-light flex items-center justify-center text-[12px] md:text-base mr-2">
                      {idx + 1}
                    </span>
                    <span className="global-p2">
                      <LocalizedText en={r.benefit} bn={r.benefitBN} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <ul className="flex flex-col gap-2 md:gap-4 justify-center text-center px-4 md:px-8 lg:px-16 xl:px-24">
              <li className="flex items-center gap-1 lg:gap-2">
                <Link href={pageHref(benefitData?.plansButtonLink)}>
                  <Button
                    variant="link"
                    className="px-0 text-[#ED7125] flex justify-start items-center gap-1 lg:gap-2 hover:underline hover:underline-offset-8 global-p2 font-normal"
                  >
                    <LocalizedString
                      en={benefitData?.plansButtonText}
                      bn={benefitData?.plansButtonTextBN}
                    />
                    <LuArrowUpRight className="global-h4" />
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
