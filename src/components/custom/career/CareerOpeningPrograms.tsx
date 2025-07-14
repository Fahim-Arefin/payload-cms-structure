'use client'
import Image from 'next/image'
import React from 'react'

const programOpenings = [
  {
    img: '/assets/Internship.png',
    title: 'INTERNSHIP',
  },
  {
    img: '/assets/managementTrainee.png',
    title: 'MANAGEMENT TRAINEE',
  },
  {
    img: '/assets/campusAmbassador.png',
    title: 'CAMPUS AMBASSADOR',
  },
]

function CareerOpeningPrograms() {
  return (
    <section className="container-padding w-full bg-[#FCF4EB] flex flex-col gap-4 ">
      {/* HEADER */}
      <div>
        <span className="global-h3 text-[#343434] font-light block mb-0">FIND OUT THE</span>
        <h2 className="global-h1 font-bold">
          OPENING <span className="text-[#ED7125]">PROGRAMS</span>
        </h2>
      </div>
      {/* CONTENT */}
      <div
        className="
        grid grid-cols-[0.8fr_1.2fr] md:grid-cols-2
        items-center
        text-center
        mt-1 md:mt-10 gap-6 md:gap-10 2xl:px-10
      "
      >
        {/* Cards List */}
        <div
          className="
            w-full md:w-auto flex flex-col md:items-start
            md:justify-center gap-2 md:gap-6 lg:gap-10 z-10
            order-1 md:order-2
          "
        >
          {programOpenings.map((item: any) => (
            <div key={item.title} className="flex flex-col md:flex-row items-center gap-4 md:gap-5">
              <img
                src={item.img}
                alt={item.title}
                className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[167px] lg:h-[167px] select-none"
                draggable={false}
              />
              <span className="text-[#343434] text-[12px] md:text-[20px] xl:text-[32px] font-semibold">
                {item.title}
              </span>
            </div>
          ))}
        </div>
        {/* Banner */}
        <div
          className="
              relative
              order-2 md:order-1
          "
        >
          <img
            src="/assets/programOpeningsBanner.png"
            alt="Programs Banner"
            className="w-[400px] h-[360px] md:h-[361px]
              lg:w-[547px] lg:h-[550px]
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
