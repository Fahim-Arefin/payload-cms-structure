// 'use client'

// import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'
// import React, { useRef } from 'react'
// import Image from 'next/image'
// import SocialSection from './SocialSection'
// import { gsap, useGSAP } from '@/lib/gsap'

// type Props = {
//   data: FounderQuoteBlockType['founderInfo']
// }

// function FounderInfoSection({ data }: Props) {
//   const socialContainerRef = useRef<HTMLDivElement | null>(null)

//   useGSAP(() => {
//     const socialContainer = socialContainerRef.current
//     if (!socialContainer) return

//     gsap.set(socialContainer, {
//       x: -30,
//       y: -70,
//       opacity: 0.75,
//     })
//   }, [])

//   const handleMouseEnter = () => {
//     const socialContainer = socialContainerRef.current
//     if (!socialContainer) return

//     gsap.to(socialContainer, {
//       x: 0,
//       y: 0,
//       opacity: 1,
//       duration: 0.65,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })
//   }

//   const handleMouseLeave = () => {
//     const socialContainer = socialContainerRef.current
//     if (!socialContainer) return

//     gsap.to(socialContainer, {
//       x: -30,
//       y: -70,
//       opacity: 0.75,
//       duration: 0.55,
//       ease: 'power3.inOut',
//       overwrite: 'auto',
//     })
//   }

//   return (
//     <div
//       className="
//         relative overflow-hidden
//         flex flex-col justify-center
//         h-[360px]
//       md:h-[230px]
//       lg:h-[370px]
//       xl:h-[450px]
//       2xl:h-[500px]
//       "
//     >
//       {typeof data?.founderImage === 'object' && data?.founderImage?.url && (
//         <div
//           className="
//             absolute z-20 isolate
//             left-1/2 top-0 -translate-x-1/2
//             w-[300px]
//             md:left-[15%] md:w-[190px] md:translate-x-0
//             lg:left-[10%] lg:w-[320px]
//             xl:left-[20%] xl:w-[385px]
//             2xl:w-[430px]

//             aspect-[525/512]

//           "
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {/* social icons behind founder image */}
//           <div
//             ref={socialContainerRef}
//             className="
//               absolute z-10 rotate-[-30deg]

//               bottom-[45px] right-[30px]
//               w-[150px]
//               md:bottom-5 md:right-2 md:w-[130px]
//               lg:bottom-10 lg:right-6 lg:w-[180px]
//               xl:bottom-[62px] xl:right-8 xl:w-[200px]
//               2xl:bottom-16 2xl:right-9 2xl:w-[220px]
//             "
//           >
//             <SocialSection data={data} />
//           </div>

//           {/* founder image above social icons */}
//           <div className="pointer-events-none absolute inset-0 z-20">
//             <Image
//               src={data.founderImage.url}
//               fill
//               sizes="(max-width: 640px) 88vw, (max-width: 768px) 78vw, (max-width: 1024px) 70vw, 45vw"
//               alt="Founder Image"
//               quality={100}
//               className="object-contain object-bottom"
//               placeholder={data?.founderImageBlurDataURL ? 'blur' : 'empty'}
//               blurDataURL={data?.founderImageBlurDataURL || undefined}
//             />
//           </div>
//         </div>
//       )}

//       {/* founder info text */}
//       <div
//         className="
//           absolute z-30 text-center
//           bottom-[18px] left-1/2 -translate-x-1/2
//           md:bottom-0 md:left-[30%] md:translate-x-0
//         "
//       >
//         <div className="text-secondary-1 font-agency global-h7">{data?.name}</div>
//         <div className="text-secondary-1 font-grift global-p5">{data?.designation}</div>
//       </div>
//     </div>
//   )
// }

// export default FounderInfoSection

'use client'

import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Image from 'next/image'
import SocialSection from './SocialSection'

type Props = {
  data: FounderQuoteBlockType['founderInfo']
}

function FounderInfoSection({ data }: Props) {
  return (
    <div
      className="
        relative overflow-hidden 
        flex flex-col justify-center
        h-[360px]
        md:h-[230px]
        lg:h-[370px]
        xl:h-[450px]
        2xl:h-[500px]
      "
    >
      {typeof data?.founderImage === 'object' && data?.founderImage?.url && (
        <div
          className="
            absolute z-20 isolate
            left-1/2 top-0 -translate-x-1/2
            w-[300px]
            md:left-[15%] md:w-[190px] md:translate-x-0
            lg:left-[10%] lg:w-[320px]
            xl:left-[20%] xl:w-[385px]
            2xl:w-[430px]

            aspect-[525/512]
          "
        >
          {/* social icons always visible behind founder image */}
          <div
            className="
              absolute z-10 rotate-[-30deg]

              bottom-[45px] right-[30px]
              w-[150px]
              md:bottom-5 md:right-2 md:w-[130px]
              lg:bottom-10 lg:right-6 lg:w-[180px]
              xl:bottom-[62px] xl:right-8 xl:w-[200px]
              2xl:bottom-16 2xl:right-9 2xl:w-[220px]
            "
          >
            <SocialSection data={data} />
          </div>

          {/* founder image above social icons */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <Image
              src={data.founderImage.url}
              fill
              sizes="(max-width: 640px) 88vw, (max-width: 768px) 78vw, (max-width: 1024px) 70vw, 45vw"
              alt="Founder Image"
              quality={100}
              className="object-contain object-bottom"
              placeholder={data?.founderImageBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={data?.founderImageBlurDataURL || undefined}
            />
          </div>
        </div>
      )}

      {/* founder info text */}
      <div
        className="
          absolute z-30 text-center
          bottom-[18px] left-1/2 -translate-x-1/2
          md:bottom-0 md:left-[30%] md:translate-x-0
        "
      >
        <div className="text-secondary-1 font-agency global-h7">{data?.name}</div>
        <div className="text-secondary-1 font-grift global-p5">{data?.designation}</div>
      </div>
    </div>
  )
}

export default FounderInfoSection
