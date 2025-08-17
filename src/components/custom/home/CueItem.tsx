import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LuArrowUpRight } from 'react-icons/lu'

type Props = {
  card: {
    icon: string
    // mobileIcon: string
    title: string
    subtitle: string
    description: string
    image: string
    // mobileImage: string
    link: string
  }
  index: number
}

function CueItem({ card, index }: Props) {
  return (
    <div className="relative flex flex-col w-full mx-auto shadow-md font-avenir rounded-2xl">
      {/* Top Card */}
      <div
        className={`h-[400px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] z-20 lg:bg-white text-white lg:text-[#404041] absolute inset-0 bottom-0 flex flex-col justify-end lg:inset-auto lg:relative 
          p-6 sm:p-8 md:p-10 lg:p-4 xl:p-8 ${
            index % 2 === 0 ? 'order-1 rounded-t-2xl' : 'order-2 rounded-b-2xl'
          }`}
      >
        <div className="relative h-[80px] w-[80px] lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px] 2xl:h-[80px] 2xl:w-[80px]">
          <Image
            className=""
            src={card.icon}
            alt={card.title}
            fill
            sizes="(max-width: 1023px) 80px, 5vw"
          />
        </div>
        <h1 className="text-xl lg:text-lg xl:text-2xl mt-4 font-semibold ">{card.title}</h1>
        <h2 className="text-lg lg:text-lg xl:text-2xl font-semibold ">{card.subtitle}</h2>
        <p className="global-p2 mt-2 text-white lg:text-[#404041] font-light ">
          {card.description}
        </p>
        <Link href={card.link}>
          <Button
            variant="link"
            className="mt-2 px-0 text-white lg:text-[#ED7125] lg:text-sm xl:text-xl flex justify-start items-center gap-2 underline lg:no-underline"
          >
            Explore Now
            <LuArrowUpRight className="text-[24px] sm:text-[26px] md:text-[30px]" />
          </Button>
        </Link>
      </div>

      {/* Bottom Image */}
      <div
        className={`relative z-0 w-full h-[400px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] ${index % 2 === 0 ? 'order-2 rounded-2xl' : 'order-1 rounded-2xl'}`}
      >
        <Image
          fill
          className={`z-0 object-cover rounded-2xl ${index % 2 === 0 ? 'lg:rounded-b-2xl lg:rounded-t-none' : 'lg:rounded-t-2xl lg:rounded-b-none'}`}
          src={card.image}
          alt={`${card.title} visual`}
          sizes="(max-width: 767px) 100vw,(max-width: 1023px) 50vw, 33vw"
        />
      </div>

      {/* overlay background: #0000005E;*/}
      <div className="lg:hidden absolute inset-0 bg-black/50 rounded-2xl z-10" />
      <div className="hidden lg:block absolute inset-0 bg-black/10 rounded-2xl z-10" />
    </div>
  )
}

export default CueItem
