'use client'

import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
import { gsap, useGSAP } from '@/lib/gsap'
import React, { useRef } from 'react'

type Props = {
  tag: CompanyIntroBlockType['sectionHeading']['tag']
  dark?: boolean
}

function Tags({ tag, dark = false }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const leftArrowRef = useRef<HTMLSpanElement | null>(null)
  const rightArrowRef = useRef<HTMLSpanElement | null>(null)

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const leftArrow = leftArrowRef.current
      const rightArrow = rightArrowRef.current

      if (!wrapper || !leftArrow || !rightArrow) return

      gsap.set([leftArrow, rightArrow], {
        x: 0,
      })

      const handleMouseEnter = () => {
        gsap.to(leftArrow, {
          x: -5,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        gsap.to(rightArrow, {
          x: 5,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      const handleMouseLeave = () => {
        gsap.to([leftArrow, rightArrow], {
          x: 0,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }

      wrapper.addEventListener('mouseenter', handleMouseEnter)
      wrapper.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        wrapper.removeEventListener('mouseenter', handleMouseEnter)
        wrapper.removeEventListener('mouseleave', handleMouseLeave)
      }
    },
    {
      scope: wrapperRef,
    },
  )

  if (!tag) return null

  return (
    <div
      ref={wrapperRef}
      className={`
        group inline-flex w-fit cursor-default items-center gap-2
        font-grift global-p5 font-semibold ${dark ? 'text-primary-2' : 'text-primary-1 '} 
      `}
    >
      <span ref={leftArrowRef} className="inline-block will-change-transform">
        &lt;
      </span>

      <span>{tag}</span>

      <span ref={rightArrowRef} className="inline-block will-change-transform">
        &gt;
      </span>
    </div>
  )
}

export default Tags
