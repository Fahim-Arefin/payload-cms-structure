'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Directors } from '@/types'

type Props = {
  data: Directors
  titleColor: string
  reverse?: boolean // Controls image/desc order for desktop
}

export const ProfileSection: React.FC<Props> = ({ data, titleColor, reverse = false }) => {
  const [expanded, setExpanded] = useState(false)
  const [isTextClamped, setIsTextClamped] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkIfTextClamped = () => {
      if (textRef.current) {
        const element = textRef.current
        const isOverflowing = element.scrollHeight > element.clientHeight
        setIsTextClamped(isOverflowing)
      }
    }

    checkIfTextClamped()

    // Check again on window resize to handle responsive changes
    window.addEventListener('resize', checkIfTextClamped)
    return () => window.removeEventListener('resize', checkIfTextClamped)
  }, [data.description])

  return (
    <div id={`id-${data.id}`} className="container-padding">
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-start',
          reverse && 'md:grid-cols-[1.8fr_1.2fr] lg:grid-cols-[2fr_1fr]',
        )}
      >
        {/* Image block */}
        <div
          className={cn(
            'w-full flex justify-start items-start',
            reverse ? 'md:order-2' : 'md:order-1',
          )}
        >
          {/* mobile */}
          <img
            src={data.mobileImage}
            alt={data.title}
            className="lg:hidden rounded-[20px] w-full max-w-[400px] h-[400px] md:h-[250px] lg:h-[300px] xl:h-[480px] object-cover shadow-md"
            style={{ minHeight: '200px' }}
          />
          {/* web */}
          <img
            src={data.image}
            alt={data.title}
            className="hidden lg:block rounded-[20px] w-full max-w-[400px] h-[400px] md:h-[250px] lg:h-[300px] xl:h-[480px] object-cover shadow-md"
            style={{ minHeight: '200px' }}
          />
        </div>
        {/* Content block */}
        <div
          className={cn(
            'flex flex-col justify-start items-start h-full',
            reverse ? 'md:order-1' : 'md:order-2',
          )}
        >
          <h2 className={`global-h2 font-semibold text-[${titleColor}] mb-1 uppercase`}>
            {data.title}
          </h2>
          <div className="font-medium global-span text-[#444] mb-1 uppercase">
            {data.designation}
          </div>
          <div className="border w-full border-[#000000] mb-4 xl:mb-8" />
          <div className="transition-all duration-300 overflow-hidden">
            <p
              ref={textRef}
              className={cn(
                'text-[#444] font-[350] text-justify text-base leading-7 xl:leading-10 md:global-p1',
                !expanded && 'line-clamp-5 lg:line-clamp-5 xl:line-clamp-[7]',
              )}
            >
              {data.description}
            </p>
          </div>

          {isTextClamped && (
            <button
              className="mt-2 text-[#ED7125] hover:underline text-sm font-semibold w-fit"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ? 'See Less' : 'See More'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
