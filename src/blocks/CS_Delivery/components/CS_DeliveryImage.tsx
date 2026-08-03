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

function AnimatedDeliveryImage({ image }: { image: DeliveryImageItem }) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const maskRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const mask = maskRef.current

      if (!section || !mask) return

      gsap.registerPlugin(ScrollTrigger)

      const maxInset = 12

      const getRoundedValue = () => {
        const radius = window.getComputedStyle(mask).borderTopLeftRadius

        return radius || '8px'
      }

      gsap.set(mask, {
        clipPath: `inset(0% ${maxInset}% 0% ${maxInset}% round ${getRoundedValue()})`,
        willChange: 'clip-path',
      })

      const setClip = gsap.quickSetter(mask, 'clipPath')

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.15,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const rounded = getRoundedValue()

          /**
           * progress:
           * 0   = entering screen, narrow
           * 0.5 = middle of screen, full width
           * 1   = leaving screen, narrow
           */
          const visibleStrength = Math.sin(self.progress * Math.PI)
          const easedStrength = gsap.parseEase('power2.inOut')(visibleStrength)
          const inset = maxInset * (1 - easedStrength)

          setClip(`inset(0% ${inset}% 0% ${inset}% round ${rounded})`)
        },
      })

      return () => {
        trigger.kill()
      }
    },
    {
      scope: sectionRef,
      dependencies: [image.url],
    },
  )

  return (
    <div ref={sectionRef}>
      <div
        ref={maskRef}
        className="
          relative w-full aspect-[571/386]
          overflow-hidden
          rounded-sm lg:rounded-[6px] xl:rounded-[8px]
        "
      >
        <Image
          fill
          src={image.url}
          alt={image.alt}
          className="
            object-cover object-center
            rounded-sm lg:rounded-[6px] xl:rounded-[8px]
          "
          quality={100}
          placeholder={image.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={image.blurDataURL || undefined}
          sizes="(max-width: 767px) 100vw, 50vw"
        />
      </div>
    </div>
  )
}

function CS_DeliveryImage({ block }: Props) {
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

  if (!images.length) return null

  return (
    <div
      className="
        grid grid-cols-2
        gap-4 md:gap-6 lg:gap-10 xl:gap-12 2xl:gap-16
      "
    >
      {images.map((image, index) => (
        <AnimatedDeliveryImage key={index} image={image} />
      ))}
    </div>
  )
}

export default CS_DeliveryImage
