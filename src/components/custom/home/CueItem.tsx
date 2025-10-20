import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LuArrowUpRight } from 'react-icons/lu'
import LocalizedText from '../shared/LocalizedText'
import { FeaturedPlansBlock } from '@/types/payloadCustomTypes'
import LocalizedString from '../shared/LocalizedString'
import { pageHref } from '@/lib/utils'

type Props = {
  card: FeaturedPlansBlock['plans'][0]
  index: number
}

function CueItem({ card, index }: Props) {
  const btnText = (card?.plansButtonText ?? '').trim()
  const btnTextBN = (card?.plansButtonTextBN ?? '').trim()
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
          {typeof card.icon === 'object' && card.icon?.url && (
            <Image
              src={card.icon?.url || ''}
              alt={card.title}
              fill
              className="object-cover object-center"
              placeholder="blur"
              blurDataURL={card?.iconBlurDataURL || ''}
              sizes="(max-width: 1023px) 80px, 5vw"
            />
          )}
        </div>
        {/* <h1 className="text-xl lg:text-lg xl:text-2xl mt-4 font-semibold ">{card.title}</h1> */}
        <LocalizedText
          className="text-xl lg:text-lg xl:text-2xl mt-4 font-semibold "
          as="h1"
          en={card?.title}
          bn={card?.titleBN}
        />
        {/* <h2 className="text-lg lg:text-lg xl:text-2xl font-semibold ">{card.subtitle}</h2> */}
        <LocalizedText
          as="h2"
          className="text-lg lg:text-lg xl:text-2xl font-semibold "
          en={card?.subtitle}
          bn={card?.subtitleBN}
        />
        {/* <p className="global-p2 mt-2 text-white lg:text-[#404041] font-light ">
          {card.description}
        </p> */}
        <LocalizedText
          className="global-p2 mt-2 text-white lg:text-[#404041] font-light "
          as="p"
          en={card?.description}
          bn={card?.descriptionBN}
        />
        {btnText.length > 0 && btnTextBN.length > 0 && card.plansButtonLink && (
          <Link href={pageHref(card.plansButtonLink)}>
            <Button
              variant="link"
              className="mt-2 px-0 text-white lg:text-[#ED7125] lg:text-sm xl:text-xl flex justify-start items-center gap-2 underline lg:no-underline"
            >
              <LocalizedString en={card?.plansButtonText} bn={card?.plansButtonTextBN} />
              <LuArrowUpRight className="text-[24px] sm:text-[26px] md:text-[30px]" />
            </Button>
          </Link>
        )}
      </div>

      {/* Bottom Image */}
      <div
        className={`relative z-0 w-full h-[400px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] ${index % 2 === 0 ? 'order-2 rounded-2xl' : 'order-1 rounded-2xl'}`}
      >
        {typeof card.image === 'object' && card.image?.url && (
          <Image
            fill
            className={`z-0 object-cover object-center rounded-2xl ${index % 2 === 0 ? 'lg:rounded-b-2xl lg:rounded-t-none' : 'lg:rounded-t-2xl lg:rounded-b-none'}`}
            src={card.image?.url || ''}
            alt={`${card.title} visual`}
            placeholder="blur"
            blurDataURL={card?.imageBlurDataURL || ''}
            sizes="(max-width: 767px) 100vw,(max-width: 1023px) 50vw, 33vw"
            // sizes="100vw"
            quality={90}
          />
        )}
      </div>

      {/* overlay background: #0000005E;*/}
      <div className="lg:hidden absolute inset-0 bg-black/50 rounded-2xl z-10" />
      <div className="hidden lg:block absolute inset-0 bg-black/10 rounded-2xl z-10" />
    </div>
  )
}

export default CueItem
