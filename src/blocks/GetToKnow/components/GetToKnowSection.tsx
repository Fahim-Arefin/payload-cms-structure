'use client'

import Card01 from '@/components/custom/sagar-ropes-shared/cards/Card01'
import { GetToKnowBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  data: GetToKnowBlockType
}

function GetToKnowSection({ data }: Props) {
  const cards = data?.cards ?? []

  const card1 = cards?.[0]
  const card2 = cards?.[1]
  const bgCard = cards?.[2]
  const card3 = cards?.[3]
  const card4 = cards?.[4]

  const mainImage =
    typeof (data as any)?.mainImage === 'object'
      ? (data as any).mainImage
      : (data as any)?.mainImage?.[0]

  return (
    <section className="bg-bg-1">
      <div className="container-padding">
        {/* ===== DESKTOP (lg+) : 12-col, 3-row grid ===== */}
        <div className="hidden lg:grid grid-cols-12 gap-6 auto-rows-[260px]">
          {/* Card 01 */}
          <div className="col-span-4 row-span-1 order-1 bg-white-1">
            <div className="">
              <Card01 data={card1} index={0} />
            </div>
          </div>

          {/* Heading */}
          <div className="col-span-4 row-span-2 order-2 bg-white-1 h-full">
            <div className="p-2">
              <div className="">
                <div className="text-cyan text-xs tracking-widest">{data?.tag}</div>
                <h2 className="text-dark-1 text-4xl font-bold leading-tight">{data?.heading}</h2>
              </div>
            </div>
          </div>

          {/* Main Image (spans 2 rows) */}
          <div className="col-span-4 row-span-2 order-3 bg-white-2 overflow-hidden">
            <div className="relative w-full h-full">
              {mainImage?.url ? (
                <Image
                  src={mainImage.url}
                  alt="main"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 33vw, 100vw"
                />
              ) : null}
            </div>
          </div>

          {/* Card 02 */}
          <div className="col-span-4 row-span-1 order-4 bg-white-1">
            <div className="">
              <Card01 data={card2} index={1} />
            </div>
          </div>

          {/* BG card (cyan tile) */}
          <div className="col-span-4 row-span-1 order-5 bg-cyan/30 overflow-hidden">
            <div className="">
              <Card01 data={bgCard} index={2} />
            </div>
          </div>

          {/* Card 03 */}
          <div className="col-span-4 row-span-1 order-6 bg-white-1">
            <div className="">
              <Card01 data={card3} index={3} />
            </div>
          </div>

          {/* Card 04 */}
          <div className="col-span-4 row-span-1 order-7 bg-white-1">
            <div className="">
              <Card01 data={card3} index={4} />
            </div>
          </div>
        </div>

        {/* ===== MOBILE (below lg) : order-based stacking ===== */}
        <div className="grid lg:hidden grid-cols-2 gap-4">
          {/* Heading full width */}
          <div className="col-span-2 order-1 bg-white-1 p-5">
            <div className="text-cyan text-[10px] tracking-widest">{data?.tag}</div>
            <h2 className="mt-2 text-dark-1 text-2xl font-bold leading-tight">{data?.heading}</h2>
          </div>

          {/* Main Image full width */}
          <div className="col-span-2 order-2 bg-white-2 overflow-hidden">
            <div className="relative w-full aspect-[316/543]">
              {mainImage?.url ? (
                <Image src={mainImage.url} alt="main" fill className="object-cover" />
              ) : null}
            </div>
          </div>

          {/* Cards in 2-col flow */}
          <div className="order-3 bg-white-1 h-[160px] p-4">{card1?.title}</div>
          <div className="order-4 bg-white-1 h-[160px] p-4">{card2?.title}</div>

          {/* BG Card spans 2 cols */}
          <div className="col-span-2 order-5 bg-cyan/30 h-[160px] p-4">{bgCard?.title}</div>

          <div className="order-6 bg-white-1 h-[160px] p-4">{card3?.title}</div>
          <div className="order-7 bg-white-1 h-[160px] p-4">{card4?.title}</div>
        </div>
      </div>
    </section>
  )
}

export default GetToKnowSection
