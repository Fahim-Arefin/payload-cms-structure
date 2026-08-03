// import { CS_DeliveryBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React from 'react'

// type Props = {
//   block: CS_DeliveryBlockType
// }

// function CS_DeliveryImage({ block }: Props) {
//   return (
//     <div
//       className="grid grid-cols-2
//     gap-4 md:gap-6 lg:gap-10 xl:gap-12 2xl:gap-16"
//     >
//       <div
//         className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
//                  w-full aspect-[571/386] "
//       >
//         {typeof block?.deliveryInfo?.imageOneWrapper?.imageOne === 'object' &&
//           block?.deliveryInfo?.imageOneWrapper?.imageOne?.url && (
//             <Image
//               fill
//               src={block?.deliveryInfo?.imageOneWrapper?.imageOne?.url}
//               alt={'Feature Icon'}
//               className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
//               quality={100}
//               placeholder="blur"
//               blurDataURL={block?.deliveryInfo?.imageOneWrapper?.imageOneBlurDataURL || ''}
//             />
//           )}
//       </div>
//       <div
//         className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
//                  w-full aspect-[571/386] "
//       >
//         {typeof block?.deliveryInfo?.imageTwoWrapper?.imageTwo === 'object' &&
//           block?.deliveryInfo?.imageTwoWrapper?.imageTwo?.url && (
//             <Image
//               fill
//               src={block?.deliveryInfo?.imageTwoWrapper?.imageTwo?.url}
//               alt={'Feature Icon'}
//               className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
//               quality={100}
//               placeholder="blur"
//               blurDataURL={block?.deliveryInfo?.imageTwoWrapper?.imageTwoBlurDataURL || ''}
//             />
//           )}
//       </div>
//     </div>
//   )
// }

// export default CS_DeliveryImage

'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { CS_DeliveryBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useRef } from 'react'

type Props = {
  block: CS_DeliveryBlockType
}

type DeliveryImageItem = {
  url: string
  blurDataURL?: string | null
  alt: string
}

function AnimatedDeliveryImage({ image, index }: { image: DeliveryImageItem; index: number }) {
  return (
    <div
      className="
        delivery-image-mask
        relative w-full aspect-[571/386]
        overflow-hidden
        rounded-sm lg:rounded-[6px] xl:rounded-[8px]
        will-change-[clip-path]
      "
      data-index={index}
    >
      <Image
        fill
        src={image.url}
        alt={image.alt}
        className="
          delivery-image-inner
          object-cover object-center
          rounded-sm lg:rounded-[6px] xl:rounded-[8px]
          will-change-transform
        "
        quality={100}
        placeholder={image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={image.blurDataURL || undefined}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
    </div>
  )
}

function CS_DeliveryImage({ block }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const imageOne =
    typeof block?.deliveryInfo?.imageOneWrapper?.imageOne === 'object'
      ? block.deliveryInfo.imageOneWrapper.imageOne
      : null

  const imageTwo =
    typeof block?.deliveryInfo?.imageTwoWrapper?.imageTwo === 'object'
      ? block.deliveryInfo.imageTwoWrapper.imageTwo
      : null

  const images: DeliveryImageItem[] = [
    imageOne?.url
      ? {
          url: imageOne.url,
          blurDataURL: block?.deliveryInfo?.imageOneWrapper?.imageOneBlurDataURL,
          alt: 'Delivery process image one',
        }
      : null,
    imageTwo?.url
      ? {
          url: imageTwo.url,
          blurDataURL: block?.deliveryInfo?.imageTwoWrapper?.imageTwoBlurDataURL,
          alt: 'Delivery process image two',
        }
      : null,
  ].filter(Boolean) as DeliveryImageItem[]

  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section || !images.length) return

      gsap.registerPlugin(ScrollTrigger)

      const masks = gsap.utils.toArray<HTMLElement>('.delivery-image-mask')
      const innerImages = gsap.utils.toArray<HTMLElement>('.delivery-image-inner')

      const maxInset = 10
      const rounded = 8

      masks.forEach((mask, index) => {
        gsap.set(mask, {
          clipPath: `inset(0% ${maxInset}% 0% ${maxInset}% round ${rounded}px)`,
          willChange: 'clip-path',
        })

        gsap.set(innerImages[index], {
          scale: 1.035,
          y: 10,
          transformOrigin: 'center center',
          willChange: 'transform',
        })
      })

      const setClips = masks.map((mask) => gsap.quickSetter(mask, 'clipPath'))
      const setScales = innerImages.map((image) => gsap.quickSetter(image, 'scale'))
      const setY = innerImages.map((image) => gsap.quickSetter(image, 'y'))

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.15,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const visibleStrength = Math.sin(self.progress * Math.PI)
          const easedStrength = gsap.parseEase('power2.inOut')(visibleStrength)

          masks.forEach((_mask, index) => {
            const staggerOffset = index * 0.08
            const staggeredStrength = Math.min(1, Math.max(0, easedStrength - staggerOffset))
            const inset = maxInset * (1 - staggeredStrength)
            const scale = 1 + 0.035 * (1 - staggeredStrength)
            const y = 10 * (1 - staggeredStrength)

            setClips[index]?.(`inset(0% ${inset}% 0% ${inset}% round ${rounded}px)`)
            setScales[index]?.(scale)
            setY[index]?.(y)
          })
        },
      })

      return () => {
        trigger.kill()
      }
    },
    {
      scope: sectionRef,
      dependencies: [images.length],
    },
  )

  if (!images.length) return null

  return (
    <div
      ref={sectionRef}
      className="
        grid grid-cols-2
        gap-4 md:gap-6 lg:gap-10 xl:gap-12 2xl:gap-16
      "
    >
      {images.map((image, index) => (
        <AnimatedDeliveryImage key={index} image={image} index={index} />
      ))}
    </div>
  )
}

export default CS_DeliveryImage
