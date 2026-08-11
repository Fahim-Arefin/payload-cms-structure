// import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import ProjectApproachCard from './ProjectApproachCard'

// type Props = {
//   data: ProjectApproachBlockType['projectApproach']
//   cardsRef: React.RefObject<HTMLDivElement | null>
// }

// function ProjectApproachCardSection({ data, cardsRef }: Props) {
//   const items = data?.approachItems ?? []
//   const totalCards = items.length

//   return (
//     <div
//       ref={cardsRef}
//       className="
//         relative w-full
//         [--card-offset:42px]
//         lg:[--card-offset:60px]
//         xl:[--card-offset:90px]
//         2xl:[--card-offset:100px]

//         [--card-height:220px]
//         lg:[--card-height:240px]
//         xl:[--card-height:260px]
//         2xl:[--card-height:280px]
//       "
//       style={{
//         height: `calc((${totalCards - 1}) * var(--card-offset) + var(--card-height))`,
//       }}
//     >
//       {items.map((item, i) => (
//         <div
//           key={i}
//           className="absolute inset-x-0"
//           style={{
//             top: `calc(${i} * var(--card-offset))`,
//             zIndex: i + 1,
//           }}
//         >
//           <ProjectApproachCard data={item} index={i} />
//         </div>
//       ))}
//     </div>
//   )
// }

// export default ProjectApproachCardSection
'use client'

import { gsap, useGSAP } from '@/lib/gsap'
import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
import React, { useEffect, useRef, useState } from 'react'
import ProjectApproachCard from './ProjectApproachCard'

type Props = {
  data: ProjectApproachBlockType['projectApproach']
}

const HEIGHTS = {
  base: {
    collapsedHeight: 70,
    expandedHeight: 220,
  },
  lg: {
    collapsedHeight: 80,
    expandedHeight: 240,
  },
  xl: {
    collapsedHeight: 125,
    expandedHeight: 260,
  },
  '2xl': {
    collapsedHeight: 140,
    expandedHeight: 280,
  },
}

const getResponsiveHeights = () => {
  if (typeof window === 'undefined') return HEIGHTS.base

  if (window.innerWidth >= 1700) return HEIGHTS['2xl']
  if (window.innerWidth >= 1439) return HEIGHTS.xl
  if (window.innerWidth >= 1024) return HEIGHTS.lg

  return HEIGHTS.base
}

function ProjectApproachCardSection({ data }: Props) {
  const items = data?.approachItems ?? []

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [resizeKey, setResizeKey] = useState(0)

  useEffect(() => {
    if (!items.length) return

    setActiveIndex((prev) => {
      if (prev > items.length - 1) return 0
      return prev
    })
  }, [items.length])

  useEffect(() => {
    const handleResize = () => {
      setResizeKey((prev) => prev + 1)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const animateCards = (nextActiveIndex: number, duration = 0.42) => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    if (!cards.length) return

    const { collapsedHeight, expandedHeight } = getResponsiveHeights()

    cards.forEach((card, index) => {
      const description = card.querySelector<HTMLElement>('.project-approach-card-description')
      const isActive = index === nextActiveIndex

      gsap.to(card, {
        height: isActive ? expandedHeight : collapsedHeight,
        duration,
        ease: 'power3.inOut',
        overwrite: 'auto',
      })

      if (description) {
        gsap.to(description, {
          autoAlpha: isActive ? 1 : 0,
          y: isActive ? 0 : 12,
          duration: duration * 0.75,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      }
    })
  }

  useGSAP(
    () => {
      const wrapper = wrapperRef.current

      if (!wrapper || !items.length) return

      const frame = window.requestAnimationFrame(() => {
        animateCards(activeIndex, resizeKey === 0 ? 0.42 : 0)
      })

      return () => {
        window.cancelAnimationFrame(frame)
      }
    },
    {
      scope: wrapperRef,
      dependencies: [activeIndex, items.length, resizeKey],
    },
  )

  useGSAP(
    () => {
      const wrapper = wrapperRef.current

      if (!wrapper) return

      gsap.fromTo(
        wrapper,
        {
          autoAlpha: 0,
          y: 24,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
      )
    },
    {
      scope: wrapperRef,
    },
  )

  if (!items.length) return null

  return (
    <div
      ref={wrapperRef}
      className="
        flex w-full flex-col items-center justify-center
      "
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            cardRefs.current[index] = el
          }}
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
          tabIndex={0}
          className={`
            project-approach-card
            relative w-full cursor-pointer overflow-hidden
            rounded-[10px] lg:rounded-[12px] xl:rounded-[16px]
            outline-none
            ${index === 0 ? '' : '-mt-[14px] lg:-mt-[16px] xl:-mt-[20px]'}
          `}
          style={{
            zIndex: index + 1,
          }}
        >
          <ProjectApproachCard data={item} index={index} />
        </div>
      ))}
    </div>
  )
}

export default ProjectApproachCardSection
