'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { LuArrowUpRight, LuChevronDown } from 'react-icons/lu'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  card: {
    icon: string
    title: string
    titleBN: string
    subtitle?: string
    subtitleBN?: string
    description: string
    descriptionBN: string
    image: string
    link?: string
    moreItem?: { description: string; descriptionBN: string }[]
  }
  index: number
  bg?: string
}

function CueItem({ card, index, bg }: Props) {
  const bgStyle = bg ? ({ '--cue-bg': bg } as React.CSSProperties) : undefined

  const [showMore, setShowMore] = useState(false)
  return (
    <div className="relative flex flex-col w-[95%] lg:w-full mx-auto shadow-md font-avenir rounded-2xl ">
      {/* Top Card */}

      <div
        className={`transition-all duration-500 ease-in-out  h-[300px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] lg:bg-[var(--cue-bg)] z-20 text-white lg:text-[#404041] absolute inset-0 bottom-0 flex flex-col justify-end lg:inset-auto lg:relative 
          p-6 sm:p-8 lg:p-4 xl:p-8 
          ${index % 2 === 0 ? 'order-1 rounded-t-2xl' : 'order-2 rounded-b-2xl'}
          `}
        style={bgStyle}
      >
        <div
          className={`transition-all duration-300 ease-linear  ${showMore ? 'opacity-0 lg:opacity-100' : 'opacity-100 '} relative 
          w-[60px]
           lg:lg:w-[50px]
            xl:xl:w-[60px]
             2xl:2xl:w-[70px]
             aspect-[1/1]`}
        >
          <Image
            className=""
            src={card.icon}
            alt={card.title}
            fill
            sizes="(max-width: 1023px) 80px, 5vw"
          />
        </div>
        <h1
          className={`transition-all duration-300 ease-linear ${showMore ? 'opacity-0 lg:opacity-100' : 'opacity-100 '} text-xl lg:text-lg xl:text-2xl mt-4 font-semibold `}
        >
          <LocalizedText en={card.title} bn={card.titleBN || ''} />
        </h1>
        <h2
          className={`transition-all duration-300 ease-linear ${showMore ? 'opacity-0 lg:opacity-100' : 'opacity-100 '} text-lg lg:text-lg xl:text-2xl font-semibold `}
        >
          <LocalizedText en={card.subtitle} bn={card.subtitleBN || ''} />
        </h2>
        <p
          className={`transition-all duration-300 ease-linear ${showMore ? 'opacity-0 lg:opacity-100' : 'opacity-100 '} global-p2 mt-2 text-white lg:text-[#404041] font-light `}
        >
          <LocalizedText en={card.description || ''} bn={card.descriptionBN || ''} />
        </p>
        {card.link && (
          <Link href={card.link}>
            <Button
              variant="link"
              className="mt-2 px-0 text-white lg:text-[#ED7125] lg:text-sm xl:text-[16px] flex justify-start items-center gap-2 underline lg:no-underline"
            >
              <LocalizedText en="Explore Now" bn="এক্সপ্লোর করুন" />
              <LuArrowUpRight className="text-[24px] sm:text-[26px] md:text-[30px]" />
            </Button>
          </Link>
        )}
        {card.moreItem && card.moreItem.length > 0 && (
          <>
            <div>
              <Button
                onClick={() => {
                  setShowMore(!showMore)
                }}
                variant="link"
                className={`transition-all duration-300 ease-linear ${showMore ? 'text-[#ED7125]' : 'text-white'} mt-2 px-0  lg:text-[#ED7125] 
                lg:text-sm xl:text-[16px] flex justify-start items-center gap-2 underline lg:no-underline`}
              >
                {showMore ? (
                  <LocalizedText en="Show Less" bn="কম দেখান" />
                ) : (
                  <LocalizedText en="Show More" bn="আরও দেখান" />
                )}

                {/* <LuArrowUpRight className="text-[24px] sm:text-[26px] md:text-[30px]" /> */}
                <LuChevronDown
                  className={`text-[18px] sm:text-[20px] md:text-[22px] transition-transform duration-300 ${
                    showMore ? 'rotate-0 lg:rotate-180' : 'rotate-180 lg:rotate-0'
                  }`}
                />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Image */}
      {!showMore && (
        <div
          className={`relative z-0 w-full h-[300px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] 
            ${index % 2 === 0 ? 'order-2 rounded-2xl' : 'order-1 rounded-2xl'}`}
        >
          <Image
            fill
            className={`z-0 object-cover object-center rounded-2xl ${index % 2 === 0 ? 'lg:rounded-b-2xl lg:rounded-t-none' : 'lg:rounded-t-2xl lg:rounded-b-none'}`}
            src={card.image}
            alt={`${card.title} visual`}
            sizes="(max-width: 767px) 100vw,(max-width: 1023px) 50vw, 33vw"
          />
        </div>
      )}
      {showMore && card.moreItem && (
        <div
          className={` space-y-2 p-6 sm:p-8 lg:p-4 xl:p-8 relative z-0  w-full h-[300px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] 
             flex flex-col 
            ${index % 2 === 0 ? 'order-2 rounded-2xl lg:rounded-b-2xl lg:rounded-t-none ' : 'order-1 rounded-2xl lg:rounded-t-2xl lg:rounded-b-none lg:justify-end'}
            `}
          style={{
            backgroundColor: bg,
          }}
        >
          {card.moreItem.map((item, idx) => (
            <div key={idx} className="  flex items-center gap-3 ">
              <div className="relative min-w-[15px] xl:min-w-[20px] aspect-[1/1] h-fit ">
                <Image
                  src="/assets/solutions/microinsurance/web/tick.png"
                  alt="icon"
                  sizes="50vw"
                  quality={80}
                  fill
                />
              </div>
              <div
                key={idx}
                className="text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] lg:text-[#434342] font-light "
              >
                <LocalizedText en={item.description || ''} bn={item.descriptionBN || ''} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* overlay background: #0000005E;*/}
      {!showMore && (
        <>
          <div className="lg:hidden absolute inset-0 bg-black/50 rounded-2xl z-10" />
          <div className="hidden lg:block absolute inset-0 bg-black/10 rounded-2xl z-10" />
        </>
      )}
    </div>
  )
}

export default CueItem
