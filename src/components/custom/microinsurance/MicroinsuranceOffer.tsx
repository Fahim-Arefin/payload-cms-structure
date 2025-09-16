import React, { FC } from 'react'
import Image from 'next/image'

type Offer = {
  icon: string
  title: string
  summary: string
  bullets: string[]
}

type MicroinsuranceOfferProps = {
  data: {
    title: string
    coloredTitle: string
    description: string
    offers: Offer[]
  }
}

const MicroinsuranceOffer: FC<MicroinsuranceOfferProps> = ({ data }) => {
  return (
    <div className="container-padding">
      {/* Heading */}
      <div className="flex flex-col space-y-2 md:space-y-4 lg:space-y-6 xl:space-y-8">
        <div className="flex items-baseline space-x-2">
          <h3 className="global-h2 uppercase font-bold text-[#434343]">{data?.title}</h3>
          <h3 className="global-h2 uppercase font-bold text-[#ED7125]">{data?.coloredTitle}</h3>
        </div>
        <div className="global-span text-[#434343] font-light">{data?.description}</div>
      </div>

      {/* Cards grid: 1 / 2 / 3 / 4 */}
      <div className="mt-4 md:mt-6 lg:mt-10 xl:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {data?.offers?.map((offer, idx) => (
          <div
            key={offer.title + idx}
            className="h-full rounded-2xl bg-white border border-[#F0EAE1] shadow-[0_8px_24px_#0000000D] p-6 md:p-8"
          >
            {/* Equal-height internals via grid */}
            <div className="grid grid-rows-[auto_auto_1fr_1fr] gap-y-3 md:gap-y-4 h-full">
              {/* Category icon (fill) */}
              <div className="relative w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]">
                <Image
                  src={offer.icon}
                  alt={`${offer.title} icon`}
                  fill
                  sizes="(min-width:1280px) 24px, (min-width:1024px) 24px, (min-width:768px) 20px, 20px"
                  className="object-contain"
                  priority={idx === 0}
                />
              </div>

              {/* Title */}
              <h4 className="text-[16px] leading-7 md:text-[20px] md:leading-8 font-bold text-[#3A3A3A]">
                {offer.title}
              </h4>

              {/* Summary (expands to fill to keep bullets aligned bottom) */}
              <p className="text-[12px] md:text-[15px] leading-7 font-normal text-[#3A3A3A] w-[85%]">
                {offer.summary}
              </p>

              {/* Bullets (bottom-aligned across all cards) */}
              <ul className="space-y-1 md:space-y-2 pt-1">
                {offer.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="relative mt-0.5 shrink-0 w-[18px] h-[18px] md:w-[20px] md:h-[20px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/microinsurance/web/offer-tick-icon.png`}
                        alt=""
                        fill
                        sizes="(min-width:1280px) 20px, (min-width:1024px) 20px, (min-width:768px) 18px, 18px"
                        className="object-contain"
                      />
                    </span>
                    <span className="text-[13px] md:text-[15px] leading-7 font-bold text-[#3A3A3A]">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MicroinsuranceOffer
