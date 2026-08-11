// 'use client'

// import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
// import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
// import React, { useRef } from 'react'
// import ProjectApproachCardSection from './ProjectApproachCardSection'
// import { useGSAP, gsap } from '@/lib/gsap'

// type Props = {
//   block: ProjectApproachBlockType
// }

// function ProjectApproachSection({ block }: Props) {
//   const projectApproachContainerRef = useRef<HTMLDivElement | null>(null)
//   const cardsRef = useRef<HTMLDivElement | null>(null)

//   const getProjectApproachStart = () => {
//     // below lg: < 1024px
//     if (window.innerWidth < 1024) return 'top 10%'

//     // above lg but below xl: 1024px - 1438px
//     if (window.innerWidth < 1439) return 'top -15%'

//     // above xl: >= 1439px
//     return 'top -27%'
//   }

//   useGSAP(
//     () => {
//       const container = projectApproachContainerRef.current
//       const cardsWrapper = cardsRef.current

//       if (!container || !cardsWrapper) return

//       const cards = gsap.utils.toArray<HTMLElement>(
//         cardsWrapper.querySelectorAll('.project-approach-card'),
//       )

//       if (!cards.length) return

//       // Initial state: all cards stay below original position
//       gsap.set(cards, {
//         y: 1000,
//         opacity: 0,
//       })

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: container,
//           // start: 'top -27%',
//           start: getProjectApproachStart,
//           end: '+=220%',
//           scrub: true,
//           pin: true,
//           anticipatePin: 1,
//           invalidateOnRefresh: true,
//           // markers: true,
//           // lower than CompanyIntro
//           refreshPriority: 1,
//         },
//       })

//       // Small pause after pin starts
//       tl.to({}, { duration: 0.15 })

//       // ✅ Card 1 fully appears, then Card 2 starts, then Card 3...
//       cards.forEach((card) => {
//         tl.to(card, {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           // ease: 'none',
//           ease: 'power2.out',
//         })
//       })

//       // Small pause after all cards are visible
//       tl.to({}, { duration: 0.15 })
//     },
//     { scope: projectApproachContainerRef },
//   )

//   return (
//     <div
//       ref={projectApproachContainerRef}
//       className="container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]"
//     >
//       <SectionHeading01 data={block?.sectionHeading} align="middle" />

//       <ProjectApproachCardSection data={block?.projectApproach} cardsRef={cardsRef} />
//     </div>
//   )
// }

// export default ProjectApproachSection

import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProjectApproachCardSection from './ProjectApproachCardSection'

type Props = {
  block: ProjectApproachBlockType
}

function ProjectApproachSection({ block }: Props) {
  return (
    <div className="container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <SectionHeading01 data={block?.sectionHeading} align="middle" />

      <ProjectApproachCardSection data={block?.projectApproach} />
    </div>
  )
}

export default ProjectApproachSection
