'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { LuArrowUpRight, LuChevronDown } from 'react-icons/lu'
import LocalizedText from '../shared/LocalizedText'
import LocalizedString from '../shared/LocalizedString'
import { pageHref } from '@/lib/utils'
import { MicroinsuranceServiceBlockType } from '@/types/payloadCustomTypes'

type PlanType = MicroinsuranceServiceBlockType['plans'][number]

type Props = {
  card: PlanType & {
    icon?: { url?: string } | string
    image?: { url?: string } | string
    iconBlurDataURL?: string
    imageBlurDataURL?: string
    // tolerate legacy props
    plansButtonLink?: string
    link?: string
  }
  data?: MicroinsuranceServiceBlockType
  index: number
  bg?: string
}

export default function CueItem2({ card, data, index, bg }: Props) {
  const [isFlipped, setIsFlipped] = useState(false)
  console.log(data?.cardBg, 'Card bg:')

  const listItems = useMemo(
    () => (Array.isArray((card as any)?.listItems) ? (card as any).listItems : []),
    [card],
  )

  const btnText = (data?.plansButtonText ?? '').trim()
  const btnTextBN = (data?.plansButtonTextBN ?? '').trim()
  const hasButtonText = btnText.length > 0 && btnTextBN.length > 0
  const hasLink = Boolean(card?.plansButtonLink || card?.link)

  const bgStyle = data?.cardBg ? ({ '--cue-bg': data?.cardBg } as React.CSSProperties) : undefined
  const showFlipControl = listItems.length > 0

  // Shared top header (identical on both faces)
  const TopHeader = (
    <div
      style={{ backgroundColor: data?.cardBg || '#f6eddd' }}
      className={`h-[300px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] z-20 flex flex-col justify-end relative inset-0 bottom-0 text-[#404041] 
        p-6 sm:p-8 md:p-10 lg:p-4 xl:p-8 
        ${index % 2 === 0 ? 'order-1 rounded-t-2xl' : 'order-2 rounded-b-2xl '}
        `}
    >
      <div className="relative h-[80px] w-[80px] lg:h-[50px] lg:w-[50px] xl:h-[60px] xl:w-[60px] 2xl:h-[80px] 2xl:w-[80px]">
        {typeof card.icon === 'object' && (card.icon?.url as string) && (
          <Image
            src={(card.icon as any)?.url || ''}
            alt={card.title}
            fill
            className="object-cover object-center"
            placeholder="blur"
            blurDataURL={card?.iconBlurDataURL || ''}
            sizes="(max-width: 1023px) 80px, 5vw"
          />
        )}
      </div>

      <LocalizedText
        className="text-xl lg:text-lg xl:text-2xl mt-4 font-semibold"
        as="h1"
        en={card?.title}
        bn={card?.titleBN}
      />

      {/* optional legacy subtitle */}
      {('subtitle' in card || 'subtitleBN' in card) && (
        <LocalizedText
          as="h2"
          className="text-lg lg:text-lg xl:text-2xl font-semibold"
          en={card?.subtitle}
          bn={card?.subtitleBN}
        />
      )}

      <LocalizedText
        className="global-p2 mt-2 text-[#404041] font-light"
        as="p"
        en={card?.description}
        bn={card?.descriptionBN}
      />

      {/* CTA (text only per schema; link optional) */}
      {/* {hasButtonText &&
        (hasLink ? (
          <Link href={pageHref(card.plansButtonLink || card.link || '')}>
            <Button
              variant="link"
              className="mt-2 px-0 text-white lg:text-[#ED7125] lg:text-sm xl:text-[16px] flex justify-start items-center gap-2 underline lg:no-underline"
            >
              <LocalizedString en={card?.plansButtonText} bn={card?.plansButtonTextBN} />
              <LuArrowUpRight className="text-[24px] sm:text-[26px] md:text-[30px]" />
            </Button>
          </Link>
        ) : (
          <Button
            type="button"
            variant="link"
            className="mt-2 px-0 text-white lg:text-[#ED7125] lg:text-sm xl:text-[16px] flex justify-start items-center gap-2 underline lg:no-underline"
          >
            <LocalizedString en={card?.plansButtonText} bn={card?.plansButtonTextBN} />
          </Button>
        ))} */}

      {/* Flip control */}
      {showFlipControl && (
        <Button
          onClick={() => setIsFlipped((v) => !v)}
          variant="link"
          className={`transition-all duration-300 ease-linear ${
            isFlipped ? 'text-[#ED7125]' : 'text-[#ED7125]'
          } mt-2 px-0  lg:text-[#ED7125] 
            lg:text-sm xl:text-[16px] flex justify-start items-center gap-2 underline lg:no-underline`}
        >
          {isFlipped ? (
            <LocalizedText
              en={data?.plansSecondaryButtonText}
              bn={data?.plansSecondaryButtonTextBN}
            />
          ) : (
            <LocalizedText en={data?.plansButtonText} bn={data?.plansButtonTextBN} />
          )}
          <LuChevronDown
            className={`text-[18px] sm:text-[20px] md:text-[22px] transition-transform duration-300 ${
              isFlipped ? 'rotate-0 lg:rotate-180' : 'rotate-180 lg:rotate-0'
            }`}
          />
        </Button>
      )}
    </div>
  )

  return (
    <div
      className="relative flex flex-col w-full mx-auto shadow-md font-avenir rounded-2xl"
      style={{ backgroundColor: data?.cardBg || '' }}
    >
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedFrontToBack={1}
        flipSpeedBackToFront={1}
      >
        {/* FRONT */}
        <div className="flex flex-col">
          {/* top header */}
          {TopHeader}

          {/* bottom image (front) */}
          <div
            className={`relative z-0 w-full h-[300px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] ${
              index % 2 === 0 ? 'order-2 rounded-2xl' : 'order-1 rounded-2xl'
            }`}
          >
            {typeof card.image === 'object' && (card.image?.url as string) && (
              <Image
                fill
                className={`z-0 object-cover object-center ${
                  index % 2 === 0 ? 'rounded-b-2xl rounded-t-none' : 'rounded-t-2xl rounded-b-none'
                }`}
                src={(card.image as any)?.url || ''}
                alt={`${card.title} visual`}
                placeholder="blur"
                blurDataURL={card?.imageBlurDataURL || ''}
                sizes="(max-width: 767px) 100vw,(max-width: 1023px) 50vw, 33vw"
                quality={90}
              />
            )}

            {/* overlays for contrast */}
            <div className="lg:hidden absolute inset-0 bg-black/50 rounded-2xl z-10" />
            <div className="hidden lg:block absolute inset-0 bg-black/10 rounded-2xl z-10" />
          </div>
        </div>

        {/* BACK */}
        <div className="flex flex-col ">
          {/* top header (same style/text) */}
          {TopHeader}

          {/* list items panel (back) */}
          <div
            className={`space-y-2 p-6 sm:p-8 lg:p-4 xl:p-8 relative z-0 w-full h-[300px] lg:h-[280px] xl:h-[330px] 2xl:h-[350px] 
              flex flex-col 
              ${
                index % 2 === 0
                  ? 'order-1 rounded-2xl lg:rounded-b-2xl lg:rounded-t-none'
                  : 'order-2 rounded-2xl lg:rounded-t-2xl lg:rounded-b-none'
              }`}
          >
            {listItems.map((item: PlanType['listItems'][number], idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="relative min-w-[15px] xl:min-w-[20px] aspect-[1/1] h-fit">
                  <Image src="/assets/icons/tick.png" alt="icon" sizes="50vw" quality={80} fill />
                </div>
                <div className="text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] lg:text-[#434342] font-light">
                  <LocalizedText en={item?.listItemText || ''} bn={item?.listItemTextBN || ''} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ReactCardFlip>
    </div>
  )
}
