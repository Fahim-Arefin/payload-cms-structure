// 'use client'

// import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
// import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
// import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React, { useRef } from 'react'
// import Eclipse from 'public/assets/images/introDesign.png'

// type Props = {
//   block: CompanyIntroBlockType
// }

// function CompanyIntroSection({ block }: Props) {
//   const containerRef = useRef<HTMLElement | null>(null)
//   const descriptionRef = useRef<HTMLParagraphElement | null>(null)
//   const designRef = useRef<HTMLDivElement | null>(null)
//   const hasAnimatedRef = useRef(false)

//   const paragraph = block?.companyIntroDescription?.paragraph || ''
//   const hasDesc = typeof paragraph === 'string' && paragraph.trim().length > 0

//   useGSAP(
//     () => {
//       const description = descriptionRef.current

//       if (!description || !hasDesc || hasAnimatedRef.current) return

//       gsap.registerPlugin(ScrollTrigger)

//       gsap.set(description, {
//         autoAlpha: 0,
//         y: 45,
//       })

//       const trigger = ScrollTrigger.create({
//         trigger: description,
//         start: 'top 75%',
//         once: true,
//         onEnter: () => {
//           hasAnimatedRef.current = true

//           gsap.to(description, {
//             autoAlpha: 1,
//             y: 0,
//             duration: 0.85,
//             ease: 'power3.out',
//           })
//         },
//       })

//       return () => {
//         trigger.kill()
//       }
//     },
//     {
//       scope: containerRef,
//       dependencies: [hasDesc, paragraph],
//     },
//   )

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen flex flex-col justify-center items-center w-full h-full overflow-hidden"
//     >
//       <div className="relative z-10 container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
//         <SectionHeading01 data={block?.sectionHeading} align="middle" />

//         {hasDesc && (
//           <p
//             ref={descriptionRef}
//             className="
//               font-grift text-justify text-secondary-1 global-p1
//               whitespace-pre-line
//             "
//           >
//             {paragraph}
//           </p>
//         )}
//       </div>

//       <div
//         ref={designRef}
//         className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[100%] lg:h-[80%]"
//       >
//         <Image
//           src={Eclipse}
//           alt="Eclipse"
//           sizes="100vw"
//           quality={90}
//           placeholder="blur"
//           fill
//           blurDataURL={Eclipse?.blurDataURL}
//           className="h-full w-full object-cover"
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
      className="relative container-padding flex flex-col justify-center items-center w-full h-full overflow-hidden"
    >
      <div className="relative z-10  space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
        <SectionHeading01 data={block?.sectionHeading} align="middle" />

        {hasDesc && (
          <p
            ref={descriptionRef}
            className="
              font-grift text-justify text-secondary-1 global-p2
              whitespace-pre-line
            "
          >
            {paragraph}
          </p>
        )}
      </div>

      <div
        ref={designRef}
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[100%] "
      >
        <Image
          src={Eclipse}
          alt="Eclipse"
          sizes="100vw"
          quality={100}
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
