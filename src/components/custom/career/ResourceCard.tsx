'use client'

import { useState } from 'react'
import EllipseDecoration from './EllipseDecoration'
import Image from 'next/image'

type ResourceData = {
  title: string
  image: string
  mobileImage: string
  description: string
  designation: string
}

function ResourceCard({ data }: { data: ResourceData }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="relative bg-[#F9F4EE] rounded-[18px] px-4 py-6 md:py-8 md:px-7 xl:px-8 w-[300px] md:w-[500px] flex flex-col justify-between shadow-[0_2px_8px_0_rgba(51,51,51,0.04)] overflow-visible">
      {/* 4 Ellipse Overlays */}
      <EllipseDecoration />
      {/* Description */}
      <div className="mb-8">
        <p
          className={`text-[#434342] text-[12px] md:text-[14px] xl:text-[16px] ${
            expanded ? '' : 'line-clamp-2'
          }`}
        >
          {data.description}
        </p>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="group flex items-center gap-1 mt-4 text-[#ED7125] font-bold text-[13px] md:text-[14px] uppercase tracking-tight transition-colors hover:text-[#d76420]"
        >
          {expanded ? 'READ LESS' : 'READ MORE'}
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="#ED7125"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
          </svg>
        </button>
      </div>
      {/* Avatar & Name/Designation */}
      <div className="flex items-center mt-auto gap-4">
        <div className="">
          {/* Ellipse overlays around image */}
          <div className="absolute left-[-23px] bottom-[-23px] w-[70px] h-[70px]">
            <Image
              src={data.image}
              alt={data.title}
              fill
              sizes="( min-width: 768px) 70px"
              className="rounded-full hidden md:block relative z-20 object-cover"
            />
            <Image
              src={data.mobileImage}
              alt={data.title}
              fill
              sizes="( max-width: 768px) 70px"
              className="rounded-full block md:hidden relative z-20 w-[70px] h-[70px] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col ml-12 md:ml-10">
          <span className="text-[#434342] font-semibold text-[12px] md:text-[14px] xl:text-[16px]">
            {data.title}
          </span>
          <span className="text-[#434342] font-light uppercase text-[12px] md:text-[15px] xl:text-[16px]">
            {data.designation}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
