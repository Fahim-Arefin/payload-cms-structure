// 'use client'

// import { gsap, useGSAP } from '@/lib/gsap'
// import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React, { useRef } from 'react'

// type LanguageImage = NonNullable<
//   NonNullable<CodingLanguageBlockType['languageImages']>['languages']
// >[number]

// type Props = {
//   data: LanguageImage
//   index: number
//   position: {
//     x: number
//     y: number
//   }
// }

// function CodingLanguageImage({ data, index, position }: Props) {
//   const imageRef = useRef<HTMLImageElement | null>(null)
//   const labelRef = useRef<HTMLDivElement | null>(null)
//   const itemRef = useRef<HTMLDivElement | null>(null)

//   const stackImage =
//     typeof data?.transparentColoredImage === 'object' ? data.transparentColoredImage : null

//   useGSAP(() => {
//     gsap.set(imageRef.current, {
//       scale: 1,
//       transformOrigin: 'center center',
//     })

//     gsap.set(labelRef.current, {
//       autoAlpha: 0,
//       y: 8,
//       scale: 0.96,
//     })
//   }, [])

//   const handleMouseEnter = () => {
//     gsap.killTweensOf([imageRef.current, labelRef.current])

//     if (itemRef.current) {
//       itemRef.current.style.zIndex = '80'
//     }

//     gsap.to(imageRef.current, {
//       scale: 1.5,
//       duration: 0.35,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })

//     gsap.to(labelRef.current, {
//       autoAlpha: 1,
//       y: 0,
//       scale: 1,
//       duration: 0.25,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })
//   }

//   const handleMouseLeave = () => {
//     gsap.killTweensOf([imageRef.current, labelRef.current])

//     gsap.to(imageRef.current, {
//       scale: 1,
//       duration: 0.3,
//       ease: 'power3.out',
//       overwrite: 'auto',
//     })

//     gsap.to(labelRef.current, {
//       autoAlpha: 0,
//       y: 8,
//       scale: 0.96,
//       duration: 0.2,
//       ease: 'power2.out',
//       overwrite: 'auto',
//       onComplete: () => {
//         if (itemRef.current) {
//           itemRef.current.style.zIndex = String(index + 1)
//         }
//       },
//     })
//   }

//   if (!stackImage?.url) return null

//   return (
//     <div
//       ref={itemRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onFocus={handleMouseEnter}
//       onBlur={handleMouseLeave}
//       tabIndex={0}
//       className="
//         absolute isolate flex cursor-pointer flex-col items-center justify-center
//         -translate-x-1/2 -translate-y-1/2
//         w-[42px] h-[42px]
//         sm:w-[48px] sm:h-[48px]
//         md:w-[56px] md:h-[56px]
//         lg:w-[64px] lg:h-[64px]
//         xl:w-[72px] xl:h-[72px]
//         2xl:w-[80px] 2xl:h-[80px]
//         outline-none
//       "
//       style={{
//         left: `${position.x}%`,
//         top: `${position.y}%`,
//         zIndex: index + 1,
//       }}
//     >
//       <div
//         className="
//           relative z-10
//           size-[24px]
//           sm:size-[28px]
//           md:size-[33px]
//           lg:size-[38px]
//           xl:size-[44px]
//           2xl:size-[50px]
//         "
//       >
//         <Image
//           ref={imageRef}
//           src={stackImage.url}
//           alt={data?.stackName || 'Stack logo'}
//           fill
//           sizes="100px"
//           quality={100}
//           placeholder={data?.transparentColoredImageBlurDataURL ? 'blur' : 'empty'}
//           blurDataURL={data?.transparentColoredImageBlurDataURL || undefined}
//           className="
//             object-contain
//             will-change-transform
//           "
//         />
//       </div>

//       <div
//         ref={labelRef}
//         className="
//           pointer-events-none absolute left-1/2 top-[100%] z-20
//           -translate-x-1/2 whitespace-nowrap
//           rounded-[4px] lg:rounded-[6px] xl:rounded-[7px]
//           border border-primary-1/30
//           bg-secondary-1/95
//           px-1 lg:px-1.5 xl:px-2 2xl:px-2
//           py-0.5 lg:py-1
//           font-grift text-[10px] font-semibold text-white-1
//           shadow-[0_10px_24px_rgba(10,17,40,0.10)]
//           lg:text-[11px]
//           xl:text-[12px]
//         "
//       >
//         {data?.stackName}
//       </div>
//     </div>
//   )
// }

// export default CodingLanguageImage

'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useRef } from 'react'

type LanguageImage = NonNullable<
  NonNullable<CodingLanguageBlockType['languageImages']>['languages']
>[number]

type Props = {
  data: LanguageImage
  index: number
  position: {
    x: number
    y: number
  }
}

function CodingLanguageImage({ data, index, position }: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const itemRef = useRef<HTMLDivElement | null>(null)
  const motionLayerRef = useRef<HTMLDivElement | null>(null)

  const stackImage =
    typeof data?.transparentColoredImage === 'object' ? data.transparentColoredImage : null

  useGSAP(() => {
    gsap.set(motionLayerRef.current, {
      x: 0,
      y: 0,
      transformOrigin: 'center center',
    })

    gsap.set(imageRef.current, {
      scale: 1,
      transformOrigin: 'center center',
    })

    gsap.set(labelRef.current, {
      autoAlpha: 0,
      y: 8,
      scale: 0.96,
    })
  }, [])

  const handleMouseEnter = () => {
    gsap.killTweensOf([imageRef.current, labelRef.current, motionLayerRef.current])

    if (itemRef.current) {
      itemRef.current.style.zIndex = '80'
      itemRef.current.dataset.hovered = 'true'
    }

    gsap.to(motionLayerRef.current, {
      x: 0,
      y: 0,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(imageRef.current, {
      scale: 1.5,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(labelRef.current, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    gsap.killTweensOf([imageRef.current, labelRef.current])

    if (itemRef.current) {
      itemRef.current.dataset.hovered = 'false'
    }

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    gsap.to(labelRef.current, {
      autoAlpha: 0,
      y: 8,
      scale: 0.96,
      duration: 0.2,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => {
        if (itemRef.current) {
          itemRef.current.style.zIndex = String(index + 1)
        }
      },
    })
  }

  if (!stackImage?.url) return null

  return (
    <div
      ref={itemRef}
      data-coding-language-item
      data-hovered="false"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      tabIndex={0}
      className="
        absolute isolate flex cursor-pointer flex-col items-center justify-center
        -translate-x-1/2 -translate-y-1/2
        w-[42px] h-[42px]
        sm:w-[48px] sm:h-[48px]
        md:w-[56px] md:h-[56px]
        lg:w-[64px] lg:h-[64px]
        xl:w-[72px] xl:h-[72px]
        2xl:w-[80px] 2xl:h-[80px]
        outline-none
      "
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        zIndex: index + 1,
      }}
    >
      <div
        ref={motionLayerRef}
        data-index={index}
        className="
          coding-language-motion-layer
          relative flex size-full items-center justify-center
          will-change-transform
        "
      >
        <div
          className="
            relative z-10
            size-[24px]
            sm:size-[28px]
            md:size-[33px]
            lg:size-[38px]
            xl:size-[44px]
            2xl:size-[50px]
          "
        >
          <Image
            ref={imageRef}
            src={stackImage.url}
            alt={data?.stackName || 'Stack logo'}
            fill
            sizes="100px"
            quality={100}
            placeholder={data?.transparentColoredImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={data?.transparentColoredImageBlurDataURL || undefined}
            className="
              object-contain
              will-change-transform
            "
          />
        </div>

        <div
          ref={labelRef}
          className="
            pointer-events-none absolute left-1/2 top-[100%] z-20
            -translate-x-1/2 whitespace-nowrap
            rounded-[4px] lg:rounded-[6px] xl:rounded-[7px]
            border border-primary-1/30
            bg-secondary-1/95
            px-1 lg:px-1.5 xl:px-2 2xl:px-2
            py-0.5 lg:py-1
            font-grift text-[10px] font-semibold text-white-1
            shadow-[0_10px_24px_rgba(10,17,40,0.10)]
            lg:text-[11px]
            xl:text-[12px]
          "
        >
          {data?.stackName}
        </div>
      </div>
    </div>
  )
}

export default CodingLanguageImage
