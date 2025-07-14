'use client'
import Image from 'next/image'
import React from 'react'

const programOpenings = [
  {
    img: '/assets/program-internship.png',
    title: 'INTERNSHIP',
  },
  {
    img: '/assets/program-trainee.png',
    title: 'MANAGEMENT TRAINEE',
  },
  {
    img: '/assets/program-ambassador.png',
    title: 'CAMPUS AMBASSADOR',
  },
]

function CareerOpeningPrograms() {
  return (
    <section className="container-padding w-full bg-[#FCF4EB] flex flex-col gap-4">
      {/* HEADER */}
      <div>
        <span className="global-h3 text-[#343434] font-light block mb-0">FIND OUT THE</span>
        <h2 className="global-h1 font-bold tracking-tight">
          OPENING <span className="text-[#ED7125]">PROGRAMS</span>
        </h2>
      </div>
      {/* CONTENT */}
      <div
        className="
        flex flex-col md:flex-row items-center
        justify-between mt-4 md:mt-10 gap-6 md:gap-10
      "
      >
        {/* Cards List */}
        <div
          className="
            w-full md:w-auto flex flex-col md:items-start
            md:justify-center gap-7 z-10
            order-2 md:order-1
          "
        >
          {programOpenings.map((item: any) => (
            <div key={item.title} className="flex items-center gap-4 md:gap-5">
              <img
                src={item.img}
                alt={item.title}
                className="w-[52px] h-[52px] md:w-[58px] md:h-[58px] select-none"
                draggable={false}
              />
              <span className="text-[#343434] text-[20px] md:text-[23px] font-semibold tracking-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>
        {/* Banner */}
        <div
          className="
             flex justify-center md:justify-end
            w-full md:w-[390px] lg:w-[430px] xl:w-[490px]
            min-w-[230px] max-w-[360px] md:max-w-none
            mx-auto md:mx-0
            relative
          "
        >
          <img
            src="/assets/programOpeningsBanner.png"
            alt="Programs Banner"
            className="
              lg:w-[547px] lg:h-[500px]
              object-cover
            "
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}

export default CareerOpeningPrograms
