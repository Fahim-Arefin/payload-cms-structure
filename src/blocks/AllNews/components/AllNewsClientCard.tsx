import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import Button02 from '@/components/custom/sagar-ropes-shared/buttons/Button02'
import VideoThumbnailDialog from '@/components/custom/sagar-ropes-shared/dialog/VideoThumbnailDialog'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { buildNewsHref, formatPayloadDate, formatPayloadDateShort } from '@/lib/utils'
import { News } from '@/payload-types'
import { AllNewsBlockType, SingleNewsBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import Date from 'public/assets/icons/date.png'
import Tag from 'public/assets/icons/tag.png'
import QuoteIcon from 'public/assets/images/QuoteIcon.png'

type NewsItem = NonNullable<News['newsItems']>[number]

type NewsCategoryRuntime = {
  id?: string
  label?: string
  key?: string
}

type NewsTagRuntime = {
  id?: string
  label?: string
  key?: string
}

export type EnrichedNewsItem = NewsItem & {
  category?: NewsCategoryRuntime | null
  tag?: NewsTagRuntime | null
}

type Props = {
  block: AllNewsBlockType | SingleNewsBlockType
  item: EnrichedNewsItem
  detailsPage?: boolean
}

function AllNewsClientCard({ item, block, detailsPage }: Props) {
  return (
    <div className="space-y-2 xl:space-y-3 2xl:space-y-4">
      <div>
        {/* title 1 */}
        {item?.title1 && (
          <div className="text-dark-1 font-proxima font-bold global-h3">{item?.title1}</div>
        )}
        {/* title 1 */}
        {item?.title2 && (
          <div className="text-cyan font-proxima font-bold global-h3">{item?.title2}</div>
        )}
      </div>
      {/* thumbneil */}
      {item?.eventType === 'blog' &&
        typeof item?.thumbnailImage === 'object' &&
        item?.thumbnailImage?.url && (
          <div className="relative w-full aspect-[16/9] ">
            <Image
              src={item?.thumbnailImage?.url}
              alt="Thumbneil Image"
              fill
              quality={90}
              sizes="100vw"
              className="object-center object-cover w-full h-full"
              placeholder="blur"
              blurDataURL={item?.thumbnailImageBlurDataURL || ''}
            />{' '}
          </div>
        )}
      {/* video */}
      {item?.eventType === 'vlog' &&
        typeof item?.thumbnailImage === 'object' &&
        item?.thumbnailImage?.url && (
          <VideoThumbnailDialog
            className="relative w-full aspect-[16/9]"
            thumbnailUrl={item?.thumbnailImage?.url}
            blurDataURL={item?.thumbnailImageBlurDataURL || ''}
            videoUrl={item?.videoUrl ?? ''}
          />
        )}

      <div className="grid grid-cols-3 border border-dashed border-[#D0D0F6]">
        {/* product category */}
        <div
          className={`px-1 md:px-2 xl:px-4 2xl:px-6 py-2 xl:py-3 2xl:py-4 flex items-center justify-center border-r border-dashed border-[#D0D0F6] `}
        >
          <div className="flex items-center space-x-2 xl:space-x-3 2xl:space-x-4 ">
            {/* product image */}
            <div className="min-w-[20px] lg:min-w-[25px] xl:min-w-[30px] 2xl:min-w-[40px]">
              <div className="relative w-full aspect-square">
                {typeof item?.productImage === 'object' && item?.productImage?.url && (
                  <Image
                    src={item?.productImage?.url}
                    alt="Thumbneil Image"
                    fill
                    quality={90}
                    sizes="100vw"
                    className="object-center object-cover w-full h-full"
                    placeholder="blur"
                    blurDataURL={item?.productImageBlurDataURL || ''}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="text-[#0B0B3B] font-manrope text-[9px] md:text-[10px] xl:text-[12px] leading-[200%] opacity-80">
                {item?.category?.label}
              </div>
              <div className="text-dark-1 font-manrope font-bold global-p4">
                {item?.categoryName}
              </div>
            </div>
          </div>
        </div>
        {/* product release date */}
        <div
          className={`px-1 md:px-2 xl:px-4 2xl:px-6 py-2 xl:py-3 2xl:py-4 flex items-center justify-center border-r border-dashed border-[#D0D0F6] `}
        >
          <div className="flex items-center space-x-2 xl:space-x-3 2xl:space-x-4 ">
            {/* Date icon */}
            <div className="min-w-[20px] lg:min-w-[25px] xl:min-w-[30px] 2xl:min-w-[40px]">
              <div className="relative w-full aspect-square">
                <Image
                  src={Date}
                  alt="Thumbneil Image"
                  fill
                  quality={90}
                  sizes="100vw"
                  className="object-center object-cover w-full h-full"
                  placeholder="blur"
                  blurDataURL={Date?.blurDataURL || ''}
                />
              </div>
            </div>
            <div>
              <div className="text-[#0B0B3B] font-manrope text-[9px] md:text-[10px] xl:text-[12px] leading-[200%] opacity-80">
                Date Released
              </div>
              <div className="hidden md:block text-dark-1 font-manrope font-bold global-p4">
                {formatPayloadDate(item?.releaseDate)}
              </div>
              <div className="md:hidden text-dark-1 font-manrope font-bold global-p4">
                {formatPayloadDateShort(item?.releaseDate)}
              </div>
            </div>
          </div>
        </div>

        {/* product tag  */}
        <div
          className={`px-1 md:px-2 xl:px-4 2xl:px-6 py-2 xl:py-3 2xl:py-4 flex items-center justify-center`}
        >
          <div className="flex items-center space-x-2 xl:space-x-3 2xl:space-x-4 ">
            {/* tag icon */}
            <div className="min-w-[20px] lg:min-w-[25px] xl:min-w-[30px] 2xl:min-w-[40px]">
              <div className="relative w-full aspect-square">
                <Image
                  src={Tag}
                  alt="Thumbneil Image"
                  fill
                  quality={90}
                  sizes="100vw"
                  className="object-center object-cover w-full h-full"
                  placeholder="blur"
                  blurDataURL={Tag?.blurDataURL || ''}
                />
              </div>
            </div>
            <div>
              <div className="text-[#0B0B3B] font-manrope text-[9px] md:text-[10px] xl:text-[12px] leading-[200%] opacity-80">
                Tag
              </div>
              <div className="text-dark-1 font-manrope font-bold global-p4">{item?.tag?.label}</div>
            </div>
          </div>
        </div>
      </div>

      {/* description */}
      <div
        className={`text-dark-3 font-manrope global-p4 text-justify 
                   ${detailsPage ? '' : 'line-clamp-3'} 
                  `}
      >
        <LocalizedRichText en={item?.description} bn={item?.description} />
      </div>

      {detailsPage && (
        <div
          className="space-y-1.5
           border-2 border-cyan 
        xl:px-6 2xl:px-7
        xl:py-4 2xl:py-5
        "
        >
          <div className="flex justify-between items-center">
            <div className="min-w-[20px] lg:min-w-[25px] xl:min-w-[30px] 2xl:min-w-[40px]">
              <div className="relative w-full aspect-square">
                <Image
                  src={QuoteIcon}
                  alt="QuoteIcon Image"
                  fill
                  quality={90}
                  sizes="100vw"
                  className="object-center object-cover w-full h-full"
                  placeholder="blur"
                  blurDataURL={QuoteIcon?.blurDataURL || ''}
                />
              </div>
            </div>
            <div className="text-[#0B0B3B] font-manrope text-[9px] md:text-[10px] xl:text-[12px] opacity-80 ">
              {formatPayloadDate(item?.quotationDate)}
            </div>
          </div>
          <div className="text-dark-1 font-proxima font-bold global-h6 text-justify">
            <LocalizedRichText en={item?.quotationDescription} bn={item?.quotationDescription} />
          </div>
          <div className="flex justify-end">
            <div className="flex items-center space-x-2 xl:space-x-4">
              <div className="h-[1px] xl:h-[2px] w-[25px] xl:w-[40px] bg-cyan">
                <div className="invisible">a</div>
              </div>
              <div className="text-[#0B0B3B] font-manrope text-[9px] md:text-[10px] xl:text-[12px] opacity-80">
                {item?.quotationOwnerName}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex justify-center items-center">
        {block?.ctaButtons?.map((block, index) => {
          const href = buildNewsHref({
            buttonLink: block?.buttonLink,
            sectionId: block?.sectionId,
            itemId: item?.id || '',
            detail: !detailsPage,
          })

          return (
            <div key={`pageLink-${index}`}>
              <Link href={href} passHref>
                {block?.style === 'btn01' && (
                  <Button01>
                    <LocalizedText en={block.label} bn={block.label} />
                  </Button01>
                )}
                {block?.style === 'btn02' && (
                  <Button02>
                    <LocalizedText en={block.label} bn={block.label} />
                  </Button02>
                )}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllNewsClientCard
