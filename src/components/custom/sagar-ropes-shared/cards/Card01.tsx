import { GetToKnowBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  data: GetToKnowBlockType['cards'][number]
  index: number
}

function Card01({ data, index }: Props) {
  return (
    <div className="p-5">
      {/* icons */}
      <div className=" flex justify-between">
        <div className="flex">
          {data?.icons?.map((item, index) => {
            const media = item?.icon

            if (typeof media !== 'object' || !media?.url) return null

            return (
              <div className="relative w-[60px] h-[60px]">
                <Image
                  key={media.id ?? index}
                  src={media.url}
                  alt="icon"
                  fill
                  sizes="100vw"
                  className="object-cover object-center w-full h-full"
                  placeholder={item?.iconBlurDataURL ? 'blur' : 'empty'}
                  blurDataURL={item?.iconBlurDataURL || undefined}
                />
              </div>
            )
          })}
        </div>
        <div className="font-proxima global-h5 font-bold text-dark-1 leading-[140%] tracking-[-0.6px]">
          0{index + 1}.
        </div>
      </div>
      {/* titles */}
      {(data?.title || data?.subtitle) && (
        <div className="font-proxima global-h4 font-bold text-dark-1 leading-[133.333%] tracking-[-0.72px]">
          {data?.title && <div>{data?.title}</div>}
          {data?.subtitle && <div>{data?.subtitle}</div>}
        </div>
      )}
      {/* description */}
      {data?.description && (
        <div className="font-manrope global-p4 text-dark-3">
          <LocalizedRichText en={data?.description} bn={data?.description} />
        </div>
      )}
    </div>
  )
}

export default Card01
