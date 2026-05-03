import { GetToKnowBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'
import SparkImage from '/public/assets/images/spark.png'
import Link from 'next/link'
import { pageHref, pageHrefWithAnchor, resolvePageSlug } from '@/lib/utils'

type Props = {
  data: GetToKnowBlockType['cards'][number]
  index: number
  className?: React.ReactNode
}

function Card01({ data, index, className }: Props) {
  const hasBgImage = data?.bgImage
  const isActiveAnimation = data?.showAnimation

  // If GlobalButton supports children (you already do in the YT button), render label as child:
  // const href =
  //   data?.sectionId && data?.buttonLink && data?.sectionId
  //     ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
  //     : pageHref(data.buttonLink)

  const href = pageHrefWithAnchor(data?.buttonLink, data?.sectionId)

  const link = href !== '#' ? href : ''

  //  ${isActiveAnimation && ` hover:bg-transparent`}
  const cardContent = (
    <div
      className={`group/card relative flex flex-col justify-between ${hasBgImage && 'group bg-cyan/30 overflow-hidden'}
      transition-all duration-300 ease-in 
      
      ${isActiveAnimation && ` `} 
      ${className}`}
    >
      {/* border effect */}
      {!hasBgImage && isActiveAnimation && (
        <div
          className="opacity-0 group-hover/card:opacity-100 transition-all delay-150 duration-150 ease-in 
      absolute inset-0 w-[2px] md:w-[3px] lg:w-[4px] xl:w-[5px] z-20 pointer-events-none bg-cyan"
        />
      )}

      {/* background image */}
      {typeof hasBgImage === 'object' && hasBgImage?.url && (
        <Image
          src={hasBgImage?.url}
          alt="background image"
          sizes="(max-width: 767px) 100vw, 50vw"
          className="inset-0 z-10 group-hover:scale-125 transition-all duration-300 ease-in"
          fill
          quality={85}
          placeholder="blur"
          blurDataURL={data?.bgImageBlurDataURL || ''}
        />
      )}

      {/* overlay */}
      {hasBgImage && (
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: '#33CCCC80',
          }}
        />
      )}

      {/* spark image */}
      {data?.showSparkImage && (
        <Image
          src={SparkImage}
          alt="background image"
          sizes="(max-width: 767px) 100vw, 50vw"
          className="absolute inset-0 left-1/2 top-[45%] z-30 
          group-hover:scale-125 group-hover:translate-x-8 group-hover:-translate-y-4 transition-all duration-300 ease-in
          w-[30px] md::w-[40px] xl:w-[50px] 
          h-[30px] md:h-[40px] xl:h-[50px]
          "
          quality={85}
          placeholder="blur"
          blurDataURL={SparkImage?.blurDataURL}
        />
      )}

      {/* icons */}
      {data?.icons && data?.icons?.length > 0 && (
        <div className="z-30 flex justify-between">
          <div className={`flex`}>
            {/* multiple icons */}
            {data?.icons?.length > 1 &&
              data?.icons?.map((item, index) => {
                const media = item?.icon
                const moreThanOneIcon = data?.icons && data?.icons?.length > 1

                if (typeof media !== 'object' || !media?.url) return null

                return (
                  <div
                    key={index}
                    className={`relative 
                ${moreThanOneIcon ? 'w-[23px] md:w-[28px] lg:w-[38px] xl:w-[44px]   h-[23px] md:h-[28px] lg:h-[38px] xl:h-[44px]' : 'w-[30px] md:w-[40px] lg:w-[50px] xl:w-[60px] h-[30px] md:h-[40px] lg:h-[50px] xl:h-[60px]'}`}
                  >
                    <Image
                      key={media.id ?? index}
                      src={media.url}
                      alt="icon"
                      fill
                      sizes="100vw"
                      className={`object-cover object-center w-full h-full ${moreThanOneIcon && index === 1 && '-ml-2'} ${moreThanOneIcon && index === 2 && '-ml-4'} ${moreThanOneIcon && index === 3 && '-ml-6'}`}
                      placeholder={item?.iconBlurDataURL ? 'blur' : 'empty'}
                      blurDataURL={item?.iconBlurDataURL || undefined}
                    />
                  </div>
                )
              })}

            {/* single icon */}
            {data?.icons?.length === 1 &&
              data?.icons?.map((item, index) => {
                const media = item?.icon
                if (typeof media !== 'object' || !media?.url) return null
                return (
                  // ${isActiveAnimation && ` group-hover/card:bg-white group-hover/card:border group-hover/card:border-cyan`}
                  <div
                    key={index}
                    className={`rounded-full flex items-center justify-center 
                      transition-all duration-300 ease-in
                      bg-bg-1 ${isActiveAnimation && ` group-hover/card:border group-hover/card:border-cyan`}
                      w-[30px] md:w-[40px] lg:w-[50px] xl:w-[60px] 
                      h-[30px] md:h-[40px] lg:h-[50px] xl:h-[60px]`}
                  >
                    <div
                      className="relative 
                      w-[20px] md:w-[25px] lg:w-[30px] xl:w-[40px] 
                      h-[20px] md:h-[25px] lg:h-[30px] xl:h-[40px]
                    "
                    >
                      <Image
                        key={media.id ?? index}
                        src={media.url}
                        alt="icon"
                        fill
                        sizes="100vw"
                        className={`object-cover object-center w-full h-full`}
                        placeholder={item?.iconBlurDataURL ? 'blur' : 'empty'}
                        blurDataURL={item?.iconBlurDataURL || undefined}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
          {data?.showCardNumber && (
            <div
              className={`font-proxima global-h5 font-bold ${hasBgImage ? 'text-white-1' : 'text-dark-1'} 
              transition-all duration-150 ease-in 
              ${isActiveAnimation && ` group-hover/card:scale-110 xl:group-hover/card:scale-125 group-hover/card:-translate-x-1 xl:group-hover/card:-translate-x-1.5`} 
              `}
            >
              0{index + 1}.
            </div>
          )}
        </div>
      )}
      {/* titles */}
      {(data?.title || data?.subtitle || data?.tertiaryTitle) && (
        <div
          className={`z-30 font-proxima global-h4 font-bold ${hasBgImage ? 'text-white-1' : 'text-dark-1'} `}
        >
          {data?.title && <div>{data?.title}</div>}
          {data?.subtitle && <div>{data?.subtitle}</div>}
          {data?.tertiaryTitle && <div>{data?.tertiaryTitle}</div>}
        </div>
      )}
      {/* description */}
      {data?.description && data?.description?.root?.direction && (
        <div
          className={`z-30 font-manrope global-p4 ${hasBgImage ? 'text-white-1' : 'text-dark-3'}`}
        >
          <LocalizedRichText en={data?.description} bn={data?.description} />
        </div>
      )}
    </div>
  )

  // return <Link className={`${link ? 'cursor-pointer' : 'cursor-default'}`} href={link}></Link>
  return link ? (
    <Link className="cursor-pointer" href={link}>
      {cardContent}
    </Link>
  ) : (
    <React.Fragment>{cardContent}</React.Fragment>
  )
}

export default Card01
