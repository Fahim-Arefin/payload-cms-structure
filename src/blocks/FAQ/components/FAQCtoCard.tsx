// import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
// import { pageHrefWithAnchor } from '@/lib/utils'
// import { FAQBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import Link from 'next/link'
// import React from 'react'

// type CtoInfo = FAQBlockType['ctoInfo']

// type Props = {
//   data?: CtoInfo
// }

// function FAQCtoCard({ data }: Props) {
//   if (!data) return null

//   const ctaHref = pageHrefWithAnchor(data?.buttonLink, data?.sectionId)
//   const ctaLink = ctaHref !== '#' ? ctaHref : ''

//   return (
//     <div
//       className="
//         relative overflow-hidden
//         rounded-[14px]
//         border border-primary-1/35
//         bg-white-1/30
//         px-[20px] py-[18px]
//         shadow-[0_18px_45px_rgba(10,17,40,0.04)]
//         lg:px-[24px] lg:py-[24px]
//         xl:rounded-[18px]
//         xl:px-[28px] xl:py-[28px]
//         2xl:px-[32px] 2xl:py-[30px]
//       "
//     >
//       {/* soft background glow */}
//       <div
//         className="
//           pointer-events-none absolute
//           bottom-[-45%] left-[22%]
//           h-[220px] w-[220px]
//           rounded-full bg-primary-2/40 blur-[55px]
//           lg:h-[260px] lg:w-[260px]
//           xl:h-[300px] xl:w-[300px]
//         "
//       />

//       <div className="relative z-10">
//         <div className="flex items-center gap-[14px] xl:gap-[18px]">
//           {typeof data?.image === 'object' && data?.image?.url && (
//             <div
//               className="
//                 relative shrink-0 overflow-hidden
//                 size-[58px]
//                 rounded-[8px]
//                 lg:size-[66px]
//                 xl:size-[74px]
//                 2xl:size-[82px]
//               "
//             >
//               <Image
//                 src={data.image.url}
//                 alt={data?.name || 'CTO image'}
//                 fill
//                 className="object-cover object-center"
//                 sizes="100px"
//                 quality={100}
//                 placeholder={data?.imageBlurDataURL ? 'blur' : 'empty'}
//                 blurDataURL={data?.imageBlurDataURL || undefined}
//               />
//             </div>
//           )}

//           <div>
//             <div className="font-grift global-p2 font-bold text-secondary-1">{data?.name}</div>

//             <div className="font-grift global-p5 text-secondary-1">{data?.designation}</div>
//           </div>
//         </div>

//         {data?.description && (
//           <p
//             className="
//               mt-[18px]
//               font-grift global-p5
//               leading-[1.55]
//               text-secondary-1
//               xl:mt-[24px]
//             "
//           >
//             {data.description}
//           </p>
//         )}

//         {data?.buttonLabel && ctaLink && (
//           <div className="mt-[22px] xl:mt-[30px]">
//             <Link href={ctaLink} className="inline-flex">
//               <Button01 type="button">{data.buttonLabel}</Button01>
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default FAQCtoCard

import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import { pageHrefWithAnchor } from '@/lib/utils'
import { FAQBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import Frame from 'public/assets/images/Imgframe.png'
import React from 'react'

type CtoInfo = FAQBlockType['ctoInfo']

type Props = {
  data?: CtoInfo
}

function FAQCtoCard({ data }: Props) {
  if (!data) return null

  const ctaHref = pageHrefWithAnchor(data?.buttonLink, data?.sectionId)
  const ctaLink = ctaHref !== '#' ? ctaHref : ''

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[14px]
        border border-primary-1/35
        bg-white-1/30
        px-[20px] py-[18px]
        shadow-[0_18px_45px_rgba(10,17,40,0.04)]
        lg:px-[24px] lg:py-[24px]
        xl:rounded-[18px]
        xl:px-[28px] xl:py-[28px]
        2xl:px-[32px] 2xl:py-[30px]
      "
    >
      {/* soft background glow */}
      <div
        className="
          pointer-events-none absolute
          bottom-[-45%] left-[22%]
          h-[220px] w-[220px]
          rounded-full bg-primary-2/40 blur-[55px]
          lg:h-[260px] lg:w-[260px]
          xl:h-[300px] xl:w-[300px]
        "
      />

      <div className="relative z-10">
        <div className="flex items-center gap-[14px] xl:gap-[18px]">
          {/* image frame */}
          <div
            className="
              relative shrink-0
              size-[78px]
              lg:size-[88px]
              xl:size-[96px]
              2xl:size-[104px]
            "
          >
            <Image
              src={Frame}
              alt="Image frame"
              fill
              className="z-0 object-cover object-center"
              sizes="120px"
              priority
              quality={100}
              placeholder="blur"
              blurDataURL={Frame?.blurDataURL}
            />

            {typeof data?.image === 'object' && data?.image?.url && (
              <div
                className="
                  absolute left-1/2 top-1/2 z-10
                  h-[56%] w-[56%]
                  -translate-x-1/2 -translate-y-1/2
                  overflow-hidden
                "
              >
                <Image
                  src={data.image.url}
                  alt={data?.name || 'CTO image'}
                  fill
                  className="object-cover object-center"
                  sizes="90px"
                  quality={100}
                  placeholder={data?.imageBlurDataURL ? 'blur' : 'empty'}
                  blurDataURL={data?.imageBlurDataURL || undefined}
                />
              </div>
            )}
          </div>

          <div>
            <div className="font-grift global-p2 font-bold text-secondary-1">{data?.name}</div>

            <div className="font-grift global-p5 text-secondary-1">{data?.designation}</div>
          </div>
        </div>

        {data?.description && (
          <p
            className="
              mt-[18px]
              font-grift global-p5
              leading-[1.55]
              text-secondary-1
              xl:mt-[24px]
            "
          >
            {data.description}
          </p>
        )}

        {data?.buttonLabel && ctaLink && (
          <div className="mt-[22px] xl:mt-[30px]">
            <Link
              href={ctaLink}
              className="
                inline-flex overflow-hidden
                rounded-[8px]
              "
            >
              <Button01 type="button">{data.buttonLabel}</Button01>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQCtoCard
