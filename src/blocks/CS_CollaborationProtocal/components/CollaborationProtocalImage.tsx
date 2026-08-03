// import { CS_CollaborationProtocalBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React from 'react'

// type Props = { block: CS_CollaborationProtocalBlockType }

// function CollaborationProtocalImage({ block }: Props) {
//   return (
//     <div
//       className="relative rounded-sm lg:rounded-[6px] xl:rounded-[8px]
//                w-full aspect-[1200/425] "
//     >
//       {typeof block?.protocolInfo?.image === 'object' && block?.protocolInfo?.image?.url && (
//         <Image
//           fill
//           src={block?.protocolInfo?.image?.url}
//           alt={'Feature Icon'}
//           className="object-contain object-center z-10  rounded-sm lg:rounded-[6px] xl:rounded-[8px]"
//           quality={100}
//           placeholder="blur"
//           blurDataURL={block?.protocolInfo?.imageBlurDataURL || ''}
//         />
//       )}
//     </div>
//   )
// }

// export default CollaborationProtocalImage

'use client'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { CS_CollaborationProtocalBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useRef } from 'react'

type Props = {
  block: CS_CollaborationProtocalBlockType
}

function CollaborationProtocalImage({ block }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const maskRef = useRef<HTMLDivElement | null>(null)

  const image = typeof block?.protocolInfo?.image === 'object' ? block.protocolInfo.image : null

  useGSAP(
    () => {
      const section = sectionRef.current
      const mask = maskRef.current

      if (!section || !mask) return

      gsap.registerPlugin(ScrollTrigger)

      const maxInset = 12
      const rounded = 8

      gsap.set(mask, {
        clipPath: `inset(0% ${maxInset}% 0% ${maxInset}% round ${rounded}px)`,
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
          const visibleStrength = Math.sin(self.progress * Math.PI)
          const easedStrength = gsap.parseEase('power2.inOut')(visibleStrength)
          const inset = maxInset * (1 - easedStrength)

          setClip(`inset(0% ${inset}% 0% ${inset}% round ${rounded}px)`)
        },
      })

      return () => {
        trigger.kill()
      }
    },
    {
      scope: sectionRef,
      dependencies: [image?.url],
    },
  )

  if (!image?.url) return null

  return (
    <div ref={sectionRef}>
      <div
        ref={maskRef}
        className="
          relative w-full aspect-[1200/425]
          overflow-hidden
          rounded-sm lg:rounded-[6px] xl:rounded-[8px]
        "
      >
        <Image
          fill
          src={image.url}
          alt="Collaboration protocol"
          className="
            object-cover object-center
            rounded-sm lg:rounded-[6px] xl:rounded-[8px]
          "
          quality={100}
          placeholder={block?.protocolInfo?.imageBlurDataURL ? 'blur' : 'empty'}
          blurDataURL={block?.protocolInfo?.imageBlurDataURL || undefined}
          sizes="100vw"
        />
      </div>
    </div>
  )
}

export default CollaborationProtocalImage
