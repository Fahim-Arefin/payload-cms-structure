'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

type Director = {
  id: number
  title: string
  designation: string
  description: string
  image: string
}

type Props = {
  director: Director
  reverse?: boolean // Controls image/desc order for desktop
}

export const ProfileSection: React.FC<Props> = ({ director, reverse = false }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="container-padding">
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-start',
          reverse && 'md:grid-cols-[1.8fr_1.2fr] lg:grid-cols-[2fr_1fr]',
        )}
      >
        {/* Image block */}
        <div className={cn('w-full flex justify-start items-start', reverse ? 'md:order-2' : 'md:order-1')}>
          <img
            src={director.image}
            alt={director.title}
            className="rounded-[20px] w-full max-w-[400px] h-[400px] md:h-[250px] lg:h-[300px] xl:h-[480px] object-cover shadow-md"
            style={{ minHeight: '200px' }}
          />
        </div>
        {/* Content block */}
        <div className={cn(
          'flex flex-col justify-start items-start h-full',
          reverse ? 'md:order-1' : 'md:order-2'
        )}>
          <h2 className="global-h2 font-semibold text-[#ED7125] mb-1 uppercase">
            {director.title}
          </h2>
          <div className="font-medium global-span text-[#444] mb-1 uppercase">
            {director.designation}
          </div>
          <div className='border w-full border-[#000000] mb-4 xl:mb-8'/>
          <div className="transition-all duration-300 overflow-hidden">
            <p
              className={cn(
                'text-[#444] font-[350] text-justify text-base leading-7 xl:leading-10 md:global-p1',
                !expanded && 'line-clamp-5 lg:line-clamp-6 xl:line-clamp-[7]'
              )}
            >
              {director.description}
            </p>
          </div>
          {/* Show "See More" only if description is longer than 4 lines */}
          {/* Use JS to check, or just always show if you want safe fallback */}
          <button
            className="mt-2 text-[#ED7125] hover:underline text-sm font-semibold w-fit"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? 'See Less' : 'See More'}
          </button>
        </div>
      </div>
    </div>
  )
}
