import { pageHref, pageHrefWithAnchor, resolvePageSlug } from '@/lib/utils'
import { ResultCardBlockType } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  data: NonNullable<ResultCardBlockType['cards']>[number]
  index: number
  className?: string
  height?: string
  padding?: string
}

function ResultCard({ data, index, className, height, padding }: Props) {
  // If GlobalButton supports children (you already do in the YT button), render label as child:
  // const href =
  //   data?.buttonSectionId && data?.buttonLink && data?.buttonSectionId
  //     ? `/${resolvePageSlug(data?.buttonLink)}/#${data?.buttonSectionId}`
  //     : pageHref(data.buttonLink)

  const href = pageHrefWithAnchor(data?.buttonLink, data?.buttonSectionId)
  const link = href !== '#' ? href : ''

  const cardContent = (
    <div
      className={`group 
      space-y-2 lg:space-y-3 xl:space-y-4 2xl:space-y-5 
      transition-all duration-300 ease-in
      ${padding}
      ${height}
      ${className}
      `}
    >
      {/* bg-[linear-gradient(180deg,#101053_0%,#101053_10%,rgba(16,16,83,0.78)_32%,rgba(16,16,83,0.42)_58%,rgba(255,255,255,0.88)_82%,#ffffff_100%)] */}
      <div
        className="
    font-proxima
    font-bold
    text-[50px] lg:text-[70px] xl:text-[90px]
    leading-[1]
    tracking-[-2.7px]
    inline-block
    bg-[linear-gradient(180deg,#101053_0%,#101053_5%,rgba(16,16,83,0.78)_30%,rgba(16,16,83,0.42)_55%,rgba(255,255,255,0.88)_82%,#ffffff_100%)]
    bg-clip-text
    text-transparent
    [-webkit-background-clip:text]
    [-webkit-text-fill-color:transparent]
  "
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        {/* titles */}
        {data?.title && (
          <div className={`font-proxima global-h5 font-bold text-dark-1`}>
            {data?.title && <div>{data?.title}</div>}
          </div>
        )}
        {/* titles */}
        {data?.subtitle && (
          <div className={`font-proxima global-h5 font-bold text-dark-1`}>
            {data?.subtitle && <div>{data?.subtitle}</div>}
          </div>
        )}
      </div>
      {data?.cardDescription && (
        <div className={`font-manrope global-p4 text-dark-3 text-justify`}>
          <LocalizedRichText en={data?.cardDescription} bn={data?.cardDescription} />
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

export default ResultCard
