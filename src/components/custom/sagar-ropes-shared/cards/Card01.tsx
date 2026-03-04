import { GetToKnowBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'
import LocalizedRichText from '../../shared/LocalizedRichText'
import SparkImage from '/public/assets/images/spark.png'

type Props = {
  data: GetToKnowBlockType['cards'][number]
  index: number
  className?: React.ReactNode
}

function Card01({ data, index, className }: Props) {
  const hasBgImage = data?.bgImage
  return (
    <div
      className={`relative flex flex-col justify-between ${hasBgImage && 'cursor-pointer group'} ${className}`}
    >
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
          w-[50px] h-[50px]"
          quality={85}
          placeholder="blur"
          blurDataURL={SparkImage?.blurDataURL}
        />
      )}

      {/* icons */}
      {data?.icons && data?.icons?.length > 0 && (
        <div className="z-30 flex justify-between">
          <div className={`flex`}>
            {data?.icons?.map((item, index) => {
              const media = item?.icon
              const moreThanOneIcon = data?.icons && data?.icons?.length > 1

              if (typeof media !== 'object' || !media?.url) return null

              return (
                <div
                  key={index}
                  className={`relative 
                ${moreThanOneIcon ? 'w-[44px] h-[44px]' : 'w-[60px] h-[60px]'}`}
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
          </div>
          {data?.showCardNumber && (
            <div
              className={`font-proxima global-h5 font-bold ${hasBgImage ? 'text-white-1' : 'text-dark-1'} leading-[140%] tracking-[-0.6px]`}
            >
              0{index + 1}.
            </div>
          )}
        </div>
      )}
      {/* titles */}
      {(data?.title || data?.subtitle) && (
        <div
          className={`z-30 font-proxima global-h4 font-bold ${hasBgImage ? 'text-white-1' : 'text-dark-1'} leading-[133.333%] tracking-[-0.72px]`}
        >
          {data?.title && <div>{data?.title}</div>}
          {data?.subtitle && <div>{data?.subtitle}</div>}
          {data?.tertiaryTitle && <div>{data?.tertiaryTitle}</div>}
        </div>
      )}
      {/* description */}
      {data?.description && (
        <div
          className={`z-30 font-manrope global-p4 ${hasBgImage ? 'text-white-1' : 'text-dark-3'}`}
        >
          <LocalizedRichText en={data?.description} bn={data?.description} />
        </div>
      )}
    </div>
  )
}

export default Card01
