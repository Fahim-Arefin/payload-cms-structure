import { pageHref, resolvePageSlug } from '@/lib/utils'
import { ProductInfo02BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CardMask from 'public/assets/images/cyanCardMask.png'
import Arrow2 from '/public/assets/icons/arrow2.png'

type Props = {
  data: ProductInfo02BlockType['cards03'][number]
  index?: number
  className?: string
  height?: string
  padding?: string
}

function Card03({ data, index, height, padding, className }: Props) {
  // If GlobalButton supports children (you already do in the YT button), render label as child:
  const href =
    data?.sectionId && data?.buttonLink && data?.sectionId
      ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
      : pageHref(data.buttonLink)

  const link = href !== '#' ? href : ''

  const cardContent = (
    <div
      className={`card02-dash-hover relative z-30
                bg-transparent border border-border-2
                transition-all duration-300 ease-in
                group ${height} ${padding} ${height}
                grid grid-cols-1 md:grid-cols-12
                ${className}
                `}
    >
      {/* left */}
      <div
        className={`z-10 flex flex-col justify-between
        transition-all duration-300 ease-in
        col-span-4
      `}
      >
        {/* icons */}
        {typeof data?.icon === 'object' && data?.icon?.url && (
          <div
            className="border-[1.125px] border-[rgba(16,16,83,0.15)] bg-[linear-gradient(135deg,rgba(16,16,83,0.30)_0%,rgba(16,16,83,0)_50%,rgba(16,16,83,0.30)_100%)]
                        w-[30px] md:w-[35px] lg:w-[40px] xl:w-[50px] 2xl:w-[65px]
                        h-[30px] md:h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[65px]
                        flex items-center justify-center
                        p-1 xl:p-1.5 2xl:p-2
          "
          >
            <div className="relative w-full aspect-[1/1] group-hover:scale-90 transition-all delay-150 duration-300 ease-out">
              <Image
                key={index}
                src={data?.icon?.url}
                alt="icon"
                fill
                sizes="100vw"
                className={`object-cover object-center w-full h-full`}
                placeholder={data?.iconBlurDataURL ? 'blur' : 'empty'}
                blurDataURL={data?.iconBlurDataURL || undefined}
              />
            </div>
          </div>
        )}

        <div>
          {/* titles */}
          {data?.title && (
            <div className={`z-30 font-proxima global-h5 font-bold text-white-2`}>
              {data?.title && <div>{data?.title}</div>}
            </div>
          )}
          {/* subtitle */}
          {data?.subtitle && (
            <div className={`z-30 font-proxima global-h5 font-bold text-white-2`}>
              {data?.subtitle && <div>{data?.subtitle}</div>}
            </div>
          )}
        </div>
      </div>
      {/* right */}
      <div
        className={`col-span-8
        flex flex-col justify-between `}
      >
        <div className="global-p4 text-white-3 font-manrope">{data?.description}</div>
        <div
          className="text-white-3 font-manrope global-p4 font-bold 
        space-y-1 xl:space-y-1.5 2xl:space-y-2"
        >
          {data?.keyPoints?.map((point, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <div className="w-[10px] aspect-auto">
                <Image
                  src={Arrow2}
                  alt="Arrow 2 icon"
                  width={Arrow2?.width}
                  height={Arrow2?.height}
                  quality={90}
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={Arrow2?.blurDataURL}
                />
              </div>
              <div>{point?.text}</div>
            </div>
          ))}
        </div>
      </div>
      {/* mask image */}
      <Image
        src={CardMask}
        alt="card mask"
        width={CardMask.width}
        height={CardMask.height}
        sizes="100vw"
        className="object-cover object-center w-full h-full absolute z-40 left-0 top-0"
        placeholder="blur"
        blurDataURL={CardMask?.blurDataURL}
      />
    </div>
  )

  return link ? (
    <Link className="cursor-pointer" href={link}>
      {cardContent}
    </Link>
  ) : (
    <React.Fragment>{cardContent}</React.Fragment>
  )
}

export default Card03
