// 'use client'

// import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
// import React, { useRef } from 'react'
// import Eclipse from 'public/assets/images/introDesign.png'
// import Image from 'next/image'
// import { gsap, useGSAP } from '@/lib/gsap'
// import { SplitText } from 'gsap/SplitText'

// type Props = {
//   block: CompanyIntroBlockType
// }

// const XL_BREAKPOINT = 1439

// function CompanyIntroSection({ block }: Props) {
//   const containerRef = useRef<HTMLDivElement | null>(null)
//   const paragraphRef = useRef<HTMLDivElement | null>(null)

//   const hasDesc =
//     !!block?.companyIntroDescription?.description &&
//     !!block?.companyIntroDescription?.description?.root?.direction

//   useGSAP(
//     () => {
//       const container = containerRef.current
//       const paragraphWrapper = paragraphRef.current

//       if (!container || !paragraphWrapper || !hasDesc) return

//       gsap.registerPlugin(SplitText)

//       let split: SplitText | null = null
//       let tl: gsap.core.Timeline | null = null

//       const timer = window.setTimeout(() => {
//         const paragraph = paragraphWrapper.querySelector<HTMLElement>('.rt .payload-richtext p')

//         if (!paragraph) {
//           console.log('paragraph not found')
//           return
//         }

//         split = new SplitText(paragraph, {
//           type: 'words',
//           wordsClass: 'intro-word',
//         })

//         console.log('words found:', split.words.length)

//         if (!split.words.length) return

//         gsap.set(split.words, {
//           opacity: 0.1,
//         })

//         tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: container,

//             // Below your custom xl 1439px: starts at top 25%
//             // xl and above: starts at top top
//             // start: () => (window.innerWidth < XL_BREAKPOINT ? 'top 25%' : 'top top'),
//             start: 'top top',
//             end: '+=150%',
//             pin: true,
//             scrub: true,
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//             // markers: true,
//             refreshPriority: 2,
//           },
//         })

//         tl.to(split.words, {
//           opacity: 1,
//           duration: 1,
//           stagger: 1,
//           ease: 'none',
//         })
//       }, 150)

//       return () => {
//         window.clearTimeout(timer)

//         if (tl) {
//           tl.kill()
//         }

//         if (split) {
//           split.revert()
//         }
//       }
//     },
//     {
//       scope: containerRef,
//       dependencies: [hasDesc],
//     },
//   )

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen flex flex-col justify-center items-center w-full h-full"
//     >
//       <div className=" container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
//         <SectionHeading01 data={block?.sectionHeading} align="middle" />

//         {hasDesc && (
//           <div ref={paragraphRef} className="font-grift text-justify text-secondary-1 global-p1">
//             <LocalizedRichText
//               en={block?.companyIntroDescription?.description}
//               bn={block?.companyIntroDescription?.description}
//             />
//           </div>
//         )}
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 h-[100%] lg:h-[80%]">
//         <Image
//           src={Eclipse}
//           alt="Eclipse"
//           sizes="100vw"
//           quality={90}
//           placeholder="blur"
//           fill
//           blurDataURL={Eclipse?.blurDataURL}
//           className="w-full h-full"
//         />
//       </div>
//     </section>
//   )
// }

// export default CompanyIntroSection

'use client'

import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useRef } from 'react'
import Eclipse from 'public/assets/images/introDesign.png'

type Props = {
  block: CompanyIntroBlockType
}

function CompanyIntroSection({ block }: Props) {
  const containerRef = useRef<HTMLElement | null>(null)
  const descriptionRef = useRef<HTMLParagraphElement | null>(null)
  const designRef = useRef<HTMLDivElement | null>(null)
  const hasAnimatedRef = useRef(false)

  const paragraph = block?.companyIntroDescription?.paragraph || ''
  const hasDesc = typeof paragraph === 'string' && paragraph.trim().length > 0

  useGSAP(
    () => {
      const description = descriptionRef.current

      if (!description || !hasDesc || hasAnimatedRef.current) return

      gsap.registerPlugin(ScrollTrigger)

      gsap.set(description, {
        autoAlpha: 0,
        y: 45,
      })

      const trigger = ScrollTrigger.create({
        trigger: description,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          hasAnimatedRef.current = true

          gsap.to(description, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
          })
        },
      })

      return () => {
        trigger.kill()
      }
    },
    {
      scope: containerRef,
      dependencies: [hasDesc, paragraph],
    },
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center w-full h-full overflow-hidden"
    >
      <div className="relative z-10 container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
        <SectionHeading01 data={block?.sectionHeading} align="middle" />

        {hasDesc && (
          <p
            ref={descriptionRef}
            className="
              font-grift text-justify text-secondary-1 global-p1
              whitespace-pre-line
            "
          >
            {paragraph}
          </p>
        )}
      </div>

      <div
        ref={designRef}
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[100%] lg:h-[80%]"
      >
        <Image
          src={Eclipse}
          alt="Eclipse"
          sizes="100vw"
          quality={90}
          placeholder="blur"
          fill
          blurDataURL={Eclipse?.blurDataURL}
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

export default CompanyIntroSection
