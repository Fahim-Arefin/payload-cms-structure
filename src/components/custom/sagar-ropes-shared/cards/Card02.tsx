import { pageHref, resolvePageSlug } from '@/lib/utils'
import { PerformanceAndApplicationCardBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  data: PerformanceAndApplicationCardBlockType['cards02'][number]
  index: number
  className?: React.ReactNode
}

function Card02({ data, index, className }: Props) {
  // If GlobalButton supports children (you already do in the YT button), render label as child:
  const href =
    data?.sectionId && data?.buttonLink && data?.sectionId
      ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
      : pageHref(data.buttonLink)

  const link = href !== '#' ? href : ''

  const cardContent = (
    <div
      className={`group/card relative flex flex-col justify-between 
      transition-all duration-300 ease-in 
      ${className}`}
    >
      {/* border effect */}
      {/* {!hasBgImage && isActiveAnimation && (
        <div
          className="opacity-0 group-hover/card:opacity-100 transition-all delay-150 duration-150 ease-in 
      absolute inset-0 w-[2px] md:w-[3px] lg:w-[4px] xl:w-[5px] z-20 pointer-events-none bg-cyan"
        />
      )} */}

      {/* icons */}
      {typeof data?.icon === 'object' && data?.icon?.url && (
        <div
          className="relative 
                      w-[20px] md:w-[25px] lg:w-[30px] xl:w-[40px] 2xl:w-[45px]  
                      h-[20px] md:h-[25px] lg:h-[30px] xl:h-[40px] 2xl:h-[45px]
                    "
        >
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
      )}

      {/* titles */}
      {data?.title && (
        <div className={`z-30 font-proxima global-h5 font-bold text-white-2`}>
          {data?.title && <div>{data?.title}</div>}
        </div>
      )}
      {/* description */}
      {data?.description && data?.description?.root?.direction && (
        <div className={`z-30 font-manrope global-p5 text-white-3`}>
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

export default Card02
