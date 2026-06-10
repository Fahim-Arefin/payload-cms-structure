// import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React from 'react'

// type Props = {
//   data: CodingLanguageBlockType['languageImages']['languages'][number]
// }

// function CodingLanguageImage({ data }: Props) {
//   return (
//     <div className="relative w-[160px] aspect-[1/1] ">
//       {typeof data?.transparentNormalImage === 'object' && data?.transparentNormalImage?.url && (
//         <Image
//           src={data?.transparentNormalImage?.url}
//           alt="Normal language image"
//           fill
//           sizes="100vw"
//           quality={90}
//           placeholder="blur"
//           blurDataURL={data?.transparentNormalImageBlurDataURL || ''}
//           className="w-full h-full"
//         />
//       )}
//     </div>
//   )
// }

// export default CodingLanguageImage

'use client'

import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import { gsap, useGSAP } from '@/lib/gsap'
import Image from 'next/image'
import React, { useRef } from 'react'

type LanguageImage = NonNullable<
  NonNullable<CodingLanguageBlockType['languageImages']>['languages']
>[number]

type Props = {
  data: LanguageImage
}

function CodingLanguageImage({ data }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const normalRef = useRef<HTMLDivElement | null>(null)
  const coloredRef = useRef<HTMLDivElement | null>(null)

  const normalImage =
    typeof data?.transparentNormalImage === 'object' ? data.transparentNormalImage : null

  const coloredImage =
    typeof data?.transparentColoredImage === 'object' ? data.transparentColoredImage : null

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const normal = normalRef.current
      const colored = coloredRef.current

      if (!wrapper || !normal || !colored) return

      gsap.set(normal, {
        opacity: 1,
      })

      gsap.set(colored, {
        opacity: 0,
      })

      const enter = () => {
        gsap.to(normal, {
          opacity: 0,
          duration: 0.32,
          ease: 'power1.out',
          overwrite: 'auto',
        })

        gsap.to(colored, {
          opacity: 1,
          duration: 0.32,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      }

      const leave = () => {
        gsap.to(normal, {
          opacity: 1,
          duration: 0.32,
          ease: 'power1.out',
          overwrite: 'auto',
        })

        gsap.to(colored, {
          opacity: 0,
          duration: 0.32,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      }

      wrapper.addEventListener('mouseenter', enter)
      wrapper.addEventListener('mouseleave', leave)

      return () => {
        wrapper.removeEventListener('mouseenter', enter)
        wrapper.removeEventListener('mouseleave', leave)
      }
    },
    { scope: wrapperRef },
  )

  if (!normalImage?.url && !coloredImage?.url) return null

  return (
    <div
      ref={wrapperRef}
      className="
        relative shrink-0 
        w-[100px] lg:w-[135px] xl:w-[165px] 2xl:w-[170px] aspect-[1/1] 
      "
    >
      {normalImage?.url && (
        <div ref={normalRef} className="absolute inset-0 will-change-[opacity]">
          <Image
            src={normalImage.url}
            alt={'Normal language image'}
            fill
            sizes="(max-width: 640px) 130px, (max-width: 1024px) 145px, (max-width: 1439px) 155px, (max-width: 1700px) 165px, 175px"
            quality={90}
            placeholder={data?.transparentNormalImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={data?.transparentNormalImageBlurDataURL || undefined}
            className="object-contain"
          />
        </div>
      )}

      {coloredImage?.url && (
        <div ref={coloredRef} className="absolute inset-0 will-change-[opacity]">
          <Image
            src={coloredImage.url}
            alt={'Colored language image'}
            fill
            sizes="(max-width: 640px) 130px, (max-width: 1024px) 145px, (max-width: 1439px) 155px, (max-width: 1700px) 165px, 175px"
            quality={90}
            placeholder={data?.transparentColoredImageBlurDataURL ? 'blur' : 'empty'}
            blurDataURL={data?.transparentColoredImageBlurDataURL || undefined}
            className="object-contain"
          />
        </div>
      )}
    </div>
  )
}

export default CodingLanguageImage
