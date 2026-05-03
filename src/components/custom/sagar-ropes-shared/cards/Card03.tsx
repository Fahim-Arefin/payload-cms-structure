import { pageHref, pageHrefWithAnchor, resolvePageSlug } from '@/lib/utils'
import { ContactInfoCardBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  data: NonNullable<ContactInfoCardBlockType['contactInfo']>[number]
  index: number
  className?: string
  height?: string
  padding?: string
}

function Card03({ data, index, className, height, padding }: Props) {
  // If GlobalButton supports children (you already do in the YT button), render label as child:
  // const href =
  //   data?.sectionId && data?.buttonLink && data?.sectionId
  //     ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
  //     : pageHref(data.buttonLink)

  const href = pageHrefWithAnchor(data?.buttonLink, data?.sectionId)
  const link = href !== '#' ? href : ''

  const cardContent = (
    <div
      className={`group flex flex-col justify-between items-center
      transition-all duration-300 ease-in
      ${padding}
      ${height}
      ${className}
      `}
    >
      {/* icons */}
      {typeof data?.icon === 'object' &&
        data?.icon?.url &&
        typeof data?.iconWhite === 'object' &&
        data?.iconWhite?.url && (
          <div
            className="relative rounded-full bg-bg-1
                w-[30px] md:w-[40px] lg:w-[60px] xl:w-[80px] 2xl:w-[90px]
                h-[30px] md:h-[40px] lg:h-[60px] xl:h-[80px] 2xl:h-[90px]
                flex items-center justify-center
                group-hover:bg-cyan transition-all duration-300 ease-out"
          >
            {/* icon colored */}
            <div
              className="absolute inset-0 flex items-center justify-center
                   opacity-100 group-hover:opacity-0
                   transition-all delay-150 duration-300 ease-out"
            >
              <div
                className="relative aspect-[1/1]
              w-[16px] md:w-[20px] lg:w-[28px] xl:w-[35px] 2xl:w-[40px]
              "
              >
                <Image
                  key={`${index}-colored`}
                  src={data?.icon?.url}
                  alt="icon"
                  fill
                  sizes="100vw"
                  className="object-contain object-center"
                  placeholder={data?.iconBlurDataURL ? 'blur' : 'empty'}
                  blurDataURL={data?.iconBlurDataURL || undefined}
                />
              </div>
            </div>

            {/* icon white */}
            <div
              className="absolute inset-0 flex items-center justify-center
                   opacity-0 group-hover:opacity-100
                   transition-all delay-150 duration-300 ease-out"
            >
              <div
                className="relative aspect-[1/1]
              w-[16px] md:w-[20px] lg:w-[28px] xl:w-[35px] 2xl:w-[40px]"
              >
                <Image
                  key={`${index}-white`}
                  src={data?.iconWhite?.url}
                  alt="icon"
                  fill
                  sizes="100vw"
                  className="object-contain object-center"
                  placeholder={data?.iconWhiteBlurDataURL ? 'blur' : 'empty'}
                  blurDataURL={data?.iconWhiteBlurDataURL || undefined}
                />
              </div>
            </div>
          </div>
        )}
      <div
        className="text-center 
      lg:space-x-1 xl:space-y-2"
      >
        {/* titles */}
        {data?.displayText && (
          <div className={`font-proxima global-h4 font-bold text-black`}>
            {data?.displayText && <div>{data?.displayText}</div>}
          </div>
        )}
        {data?.description && (
          <div className={`font-manrope global-p4 text-dark-3`}>
            <LocalizedRichText en={data?.description} bn={data?.description} />
          </div>
        )}
      </div>
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

export default Card03
