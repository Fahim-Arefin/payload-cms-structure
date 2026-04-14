import { pageHref, resolvePageSlug } from '@/lib/utils'
import { ProductInfo03BlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
// import CardMask from 'public/assets/images/cyanCardMask.png'
// import CardMask from 'public/assets/images/cyanCardBlur2.png'
import CardMask from 'public/assets/images/Blur2.png'

type Props = {
  data: ProductInfo03BlockType['cards04'][number]
  index?: number
  className?: string
  height?: string
  padding?: string
}

function InfoCard03({ data, index, height, padding, className }: Props) {
  // If GlobalButton supports children (you already do in the YT button), render label as child:
  const href =
    data?.sectionId && data?.buttonLink && data?.sectionId
      ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.sectionId}`
      : pageHref(data.buttonLink)

  const link = href !== '#' ? href : ''

  const cardContent = (
    <div
      className={`relative z-30 overflow-hidden
                bg-transparent border border-dashed border-border-2 hover:border-cyan
                transition-all duration-300 ease-in
                group ${height} ${padding} ${height}
                grid grid-cols-1 md:grid-cols-12 gap-2
                ${className}
                `}
    >
      {/* left */}
      <div
        className={`z-10 flex flex-col justify-evenly
        transition-all duration-500 ease-in-out items-center
        col-span-5 md:translate-x-[65%]
        group-hover:translate-x-0 
      `}
      >
        {/* year */}
        {data?.year && (
          <div
            className={`z-30 font-proxima global-h5 group-hover:global-h6 font-bold text-[#F7F7F7] text-center transition-all duration-300 ease-in
            border border-border-2 w-fit bg-white/5 group-hover:bg-dark-1/80 group-hover:border-cyan
            px-2 py-1
            xl:px-3 xl:py-1.5
            2xl:px-4 2xl:py-2
            `}
          >
            {data?.year}
          </div>
        )}
        {/* titles */}
        {data?.title && (
          <div
            className={`z-30 font-proxima global-h5 group-hover:global-h6 text-center transition-all duration-300 ease-in font-bold text-white-2`}
          >
            {data?.title && <div>{data?.title}</div>}
          </div>
        )}
      </div>
      {/* right */}
      <div
        className={`col-span-7 global-p5 text-white-2 font-manrope text-justify
        transition-all delay-150 duration-500 ease-in-out
        opacity-100 md:opacity-0 md:scale-90 md:translate-x-[20%] group-hover:translate-x-0 group-hover:opacity-100 group-hover:scale-100 flex flex-col justify-center `}
      >
        {data?.description}
      </div>
      {/* mask image */}
      <div
        className="w-[40%] md:w-[40%] xl:w-[200px] h-[90%] xl:h-[180px] 2xl:h-[200px] absolute 
        -left-8 md:-left-6 -top-10 xl:-top-20 rounded-r-full z-20
        transition-all duration-500 ease-in-out
      translate-x-0 group-hover:translate-x-[200%] md:group-hover:translate-x-[200%] xl:group-hover:translate-x-[300%] 2xl:group-hover:translate-x-[340%]
      translate-y-0 group-hover:translate-y-[80%] md:group-hover:translate-y-[70%]  xl:group-hover:translate-y-[70%] 
      "
      >
        <Image
          src={CardMask}
          alt="card mask"
          width={CardMask.width}
          height={CardMask.height}
          sizes="100vw"
          className="object-cover object-center w-full h-full scale-[170%] xl:scale-[170%] "
          placeholder="blur"
          blurDataURL={CardMask?.blurDataURL}
        />
      </div>
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

export default InfoCard03
