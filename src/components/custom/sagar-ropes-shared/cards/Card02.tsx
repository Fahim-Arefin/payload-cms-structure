import { pageHref, pageHrefWithAnchor, resolvePageSlug } from '@/lib/utils'
import { PerformanceAndApplicationCardBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'
import CardMask from 'public/assets/images/cyanCardMask.png'

type Props = {
  data: PerformanceAndApplicationCardBlockType['cards02'][number]
  index: number
  className?: React.ReactNode
  height?: string
  padding?: string
}

function Card02({ data, index, className, height, padding }: Props) {
  // If GlobalButton supports children (you already do in the YT button), render label as child:
  // const href =
  //   data?.sectionId && data?.buttonLink && data?.sectionId
  //     ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
  //     : pageHref(data.buttonLink)

  const href = pageHrefWithAnchor(data?.buttonLink, data?.sectionId)
  const link = href !== '#' ? href : ''

  const cardContent = (
    <div
      className={`card02-dash-hover relative z-30
              bg-transparent border border-border-2
              transition-all duration-300 ease-in
              group ${height}`}
    >
      <div
        className={`z-10 flex flex-col justify-between
      transition-all duration-300 ease-in
      ${padding}
      ${height}`}
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
      {/* mask image */}
      <Image
        src={CardMask}
        alt="card mask"
        width={CardMask.width}
        height={CardMask.height}
        sizes="100vw"
        className="object-cover object-center w-full h-full absolute inset-0 z-40 -top-[2px]"
        placeholder="blur"
        blurDataURL={CardMask?.blurDataURL}
      />
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
