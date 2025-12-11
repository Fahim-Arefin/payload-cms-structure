// import { Button } from '@/components/ui/button'
// import { pageHref } from '@/lib/utils'
// import { PlanInfoDesignBlockType } from '@/types/payloadCustomTypes'
// import { ArrowUpRight } from 'lucide-react'
// import Image from 'next/image'
// import Link from 'next/link'
// import LocalizedHighlighted from '../LocalizedHighlighted'
// import LocalizedText from '../LocalizedText'

// type Props = {
//   data: PlanInfoDesignBlockType
//   content: 'left' | 'right'
//   bgColor?: string
// }

// function EndowmentSection({ data, content, bgColor }: Props) {
//   return (
//     <div
//       className="container-padding"
//       style={{
//         backgroundColor: bgColor || '',
//       }}
//     >
//       <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 xl:gap-28">
//         <div
//           className={`order-2 w-[80%] mx-auto md:w-full
//                      ${content === 'left' ? 'md:order-2' : 'md:order-1'}
//                      space-y-2 lg:space-y-2 xl:space-y-4 2xl:space-y-6 flex flex-col justify-center`}
//         >
//           <h3 className=" md:text-start global-h3 uppercase text-[#3A3A3C]">
//             <LocalizedText en={data?.title} bn={data?.titleBN} />
//           </h3>
//           <h1 className=" md:text-start global-h1 font-semibold uppercase text-[#3A3A3C]">
//             <LocalizedText en={data?.subtitle} bn={data?.subtitleBN} />
//           </h1>
//           <p className=" md:text-start text-justify global-p1">
//             <LocalizedText en={data?.description} bn={data?.descriptionBN} />
//           </p>
//           <h4 className="md:text-start global-h4 uppercase text-[#3A3A3C] font-semibold ">
//             <LocalizedHighlighted
//               textEn={data?.featuresTitle}
//               highlightEn={data?.featuresTitleHighlighted}
//               textBn={data?.featuresTitleBN}
//               highlightBn={data?.featuresTitleHighlightedBN}
//             />
//           </h4>
//           <div
//             className="
//             md:ml-7 xl:ml-10
//            space-y-1 xl:space-y-4
//            "
//           >
//             {data?.features?.map((value, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-start space-x-1 lg:space-x-2 xl:space-x-3  "
//               >
//                 <div className="relative w-[20px] lg:w-[25px] xl:w-[30px] h-[20px] lg:h-[25px] xl:h-[30px]">
//                   {typeof value?.icon === 'object' && value?.icon?.url && (
//                     <Image
//                       fill
//                       src={value?.icon?.url}
//                       alt={value?.name}
//                       className=""
//                       placeholder="blur"
//                       blurDataURL={value?.iconBlurDataURL || ''}
//                     />
//                   )}
//                 </div>
//                 <div className="global-h4 capitalize">
//                   <LocalizedText en={value?.name} bn={value?.nameBN} />
//                 </div>
//               </div>
//             ))}
//             {(data?.buttonText || data?.buttonTextBN) && data?.buttonLink && (
//               <Button
//                 variant="link"
//                 className="text-[#ED7125] hover:underline w-fit
//            text-[12px] md:text-[14px] xl:text-[14px] 2xl:text-[16px]
//            hover:underline-offset-8 p-0 "
//               >
//                 <Link href={pageHref(data?.buttonLink)} className="flex space-x-1 items-center">
//                   <span>
//                     <LocalizedText en={data?.buttonText} bn={data?.buttonTextBN} />
//                   </span>
//                   <ArrowUpRight />
//                 </Link>
//               </Button>
//             )}
//           </div>
//         </div>

//         <div
//           className={`
//         order-1
//         ${content === 'left' ? 'md:order-1 justify-start' : 'md:order-2 justify-end'}
//          flex `}
//         >
//           {/* mobile */}
//           <div
//             className="relative w-full md:w-[90%] lg:w-[90%] 2xl:w-[85%]
//           md:hidden rounded-md aspect-[300/200]"
//           >
//             {typeof data?.bgImageMobile === 'object' && data?.bgImageMobile?.url && (
//               <Image
//                 fill
//                 src={data?.bgImageMobile?.url}
//                 alt={data?.title}
//                 className="rounded-md object-center object-cover"
//                 sizes="100vw"
//                 placeholder="blur"
//                 blurDataURL={data?.bgImageMobileBlurDataURL || ''}
//                 quality={80}
//               />
//             )}
//           </div>
//           {/* web */}
//           <div
//             className="relative hidden md:block
//             rounded-md lg:rounded-lg xl:rounded-xl
//           w-full md:w-[90%] lg:w-[90%] xl:w-full aspect-[516/705] "
//           >
//             {typeof data?.bgImageDesktop === 'object' && data?.bgImageDesktop?.url && (
//               <Image
//                 fill
//                 src={data?.bgImageDesktop?.url}
//                 alt={data?.title}
//                 className="w-full h-full object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl"
//                 sizes="50vw"
//                 placeholder="blur"
//                 blurDataURL={data?.bgImageDesktopBlurDataURL || ''}
//                 quality={85}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EndowmentSection

// ======================================================================================
// ======================================================================================
// ======================================================================================
'use client'
import { Button } from '@/components/ui/button'
import { pageHref } from '@/lib/utils'
import { PlanInfoDesignBlockType } from '@/types/payloadCustomTypes'
import { ArrowDownNarrowWide, ArrowUpNarrowWide, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedHighlighted from '../LocalizedHighlighted'
import LocalizedText from '../LocalizedText'
import { useState } from 'react'
import EligibilityContentBlock from '@/blocks/customTab/eligibilityContent/EligibilityContentBlock'

type Props = {
  data: PlanInfoDesignBlockType
  content: 'left' | 'right'
  bgColor?: string
}

function EndowmentSection({ data, content, bgColor }: Props) {
  const [showMore, setShowMore] = useState(false)
  const handleMoreClick = () => {
    setShowMore(!showMore)
  }

  return (
    <div
      className="container-padding"
      style={{
        backgroundColor: bgColor || '',
      }}
    >
      {/* main content */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 xl:gap-28">
        <div
          className={`order-2 w-[80%] mx-auto md:w-full 
                     ${content === 'left' ? 'md:order-2' : 'md:order-1'}   
                     space-y-2 lg:space-y-2 xl:space-y-4 2xl:space-y-6 flex flex-col justify-center`}
        >
          <h3 className=" md:text-start global-h3 uppercase text-[#3A3A3C]">
            <LocalizedText en={data?.title} bn={data?.titleBN} />
          </h3>
          <h1 className=" md:text-start global-h1 font-semibold uppercase text-[#3A3A3C]">
            <LocalizedText en={data?.subtitle} bn={data?.subtitleBN} />
          </h1>
          <p className=" md:text-start text-justify global-p1">
            <LocalizedText en={data?.description} bn={data?.descriptionBN} />
          </p>
          <h4 className="md:text-start global-h4 uppercase text-[#3A3A3C] font-semibold ">
            <LocalizedHighlighted
              textEn={data?.featuresTitle}
              highlightEn={data?.featuresTitleHighlighted}
              textBn={data?.featuresTitleBN}
              highlightBn={data?.featuresTitleHighlightedBN}
            />
          </h4>
          <div
            className="
            md:ml-7 xl:ml-10
           space-y-1 xl:space-y-4
           "
          >
            {data?.features?.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-start space-x-1 lg:space-x-2 xl:space-x-3  "
              >
                <div className="relative w-[20px] lg:w-[25px] xl:w-[30px] h-[20px] lg:h-[25px] xl:h-[30px]">
                  {typeof value?.icon === 'object' && value?.icon?.url && (
                    <Image
                      fill
                      src={value?.icon?.url}
                      alt={value?.name}
                      className=""
                      placeholder="blur"
                      blurDataURL={value?.iconBlurDataURL || ''}
                    />
                  )}
                </div>
                <div className="global-h4 capitalize">
                  <LocalizedText en={value?.name} bn={value?.nameBN} />
                </div>
              </div>
            ))}
            {data?.ctaVariant === 'link'
              ? (data?.buttonText || data?.buttonTextBN) &&
                data?.buttonLink && (
                  <Button
                    variant="link"
                    className="text-[#ED7125] hover:underline w-fit 
           text-[12px] md:text-[14px] xl:text-[14px] 2xl:text-[16px] 
           hover:underline-offset-8 p-0 "
                  >
                    <Link href={pageHref(data?.buttonLink)} className="flex space-x-1 items-center">
                      <span>
                        <LocalizedText en={data?.buttonText} bn={data?.buttonTextBN} />
                      </span>
                      <ArrowUpRight />
                    </Link>
                  </Button>
                )
              : data?.detailsText &&
                data?.detailsTextBN && (
                  <Button
                    variant="link"
                    className="text-[#ED7125] hover:underline w-fit 
           text-[12px] md:text-[14px] xl:text-[14px] 2xl:text-[16px] 
           hover:underline-offset-8 p-0 "
                    onClick={handleMoreClick}
                  >
                    <div>
                      <LocalizedText
                        en={!showMore ? data?.detailsText : data?.seeLessText}
                        bn={!showMore ? data?.detailsTextBN : data?.seeLessTextBN}
                      />
                    </div>
                    {!showMore ? <ArrowDownNarrowWide /> : <ArrowUpNarrowWide />}
                  </Button>
                )}
          </div>
        </div>

        <div
          className={`
        order-1 
        ${content === 'left' ? 'md:order-1 justify-start' : 'md:order-2 justify-end'}   
         flex `}
        >
          {/* mobile */}
          <div
            className="relative w-full md:w-[90%] lg:w-[90%] 2xl:w-[85%]
          md:hidden rounded-md aspect-[300/200]"
          >
            {typeof data?.bgImageMobile === 'object' && data?.bgImageMobile?.url && (
              <Image
                fill
                src={data?.bgImageMobile?.url}
                alt={data?.title}
                className="rounded-md object-center object-cover"
                sizes="100vw"
                placeholder="blur"
                blurDataURL={data?.bgImageMobileBlurDataURL || ''}
                quality={80}
              />
            )}
          </div>
          {/* web */}
          <div
            className="relative hidden md:block
            rounded-md lg:rounded-lg xl:rounded-xl
          w-full md:w-[90%] lg:w-[90%] xl:w-full aspect-[516/705] "
          >
            {typeof data?.bgImageDesktop === 'object' && data?.bgImageDesktop?.url && (
              <Image
                fill
                src={data?.bgImageDesktop?.url}
                alt={data?.title}
                className="w-full h-full object-cover object-center rounded-md lg:rounded-lg xl:rounded-xl"
                sizes="50vw"
                placeholder="blur"
                blurDataURL={data?.bgImageDesktopBlurDataURL || ''}
                quality={85}
              />
            )}
          </div>
        </div>
      </div>
      {/* eligibility card */}
      {data?.ctaVariant === 'eligibility' && (
        <div
          className={`w-[80%] mx-auto md:w-full 
            transition-all duration-500 ease-in-out
            overflow-hidden
            ${showMore ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0'}`}
        >
          <div
            className="global-h4 uppercase text-[#3A3A3C] font-semibold 
          py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6"
          >
            <LocalizedHighlighted
              textEn={data?.eligibilityTitle}
              textBn={data?.eligibilityTitleBN}
              highlightEn={data?.eligibilityTitleHighlighted}
              highlightBn={data?.eligibilityTitleHighlightedBN}
            />
          </div>
          <EligibilityContentBlock data={data} showmore />
        </div>
      )}
    </div>
  )
}

export default EndowmentSection
