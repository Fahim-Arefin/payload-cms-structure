import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import Button02 from '@/components/custom/sagar-ropes-shared/buttons/Button02'
import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { buildNewsHref } from '@/lib/utils'
import { News } from '@/payload-types'
import { SagarBlogBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  block: SagarBlogBlockType
  data: NonNullable<News['newsItems']>[number]
  index: number
  className?: string
  height?: string
  padding?: string
}

function SagarBlogCard({ data, index, className, height, padding, block }: Props) {
  return (
    <div
      className={`grid grid-cols-2 gap-2 
    ${height} ${padding} ${className}
    `}
    >
      {/* left */}
      <div>
        {/* imaage */}
        {typeof data?.thumbnailImage === 'object' && data?.thumbnailImage?.url && (
          <div className="relative w-full h-full">
            <Image
              src={data?.thumbnailImage?.url}
              alt="Thumbneil Image"
              sizes="100vw"
              fill
              className="absolute inset-0 object-center object-cover w-full h-full"
              quality={90}
              placeholder="blur"
              blurDataURL={data?.thumbnailImageBlurDataURL || ''}
            />
          </div>
        )}
      </div>
      {/* right */}
      <div
        className="flex flex-col justify-between 
      px-2 xl:px-3 2xl:px-4
      "
      >
        <div className="text-dark-1 font-proxima font-bold global-h4">{data?.title1}</div>
        {/* CTA */}
        <div>
          {block?.detailsPageLink?.map((cta, index) => {
            const href = buildNewsHref({
              buttonLink: cta?.buttonLink,
              sectionId: cta?.sectionId,
              itemId: data?.id || '',
              detail: true, // is going to details page? here yes so true
            })

            return (
              <div key={`pageLink-${index}`}>
                <Link href={href} passHref>
                  {cta?.style === 'btn01' && (
                    <Button01>
                      <LocalizedText en={cta.label} bn={cta.label} />
                    </Button01>
                  )}
                  {cta?.style === 'btn02' && (
                    <Button02>
                      <LocalizedText en={cta.label} bn={cta.label} />
                    </Button02>
                  )}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SagarBlogCard
