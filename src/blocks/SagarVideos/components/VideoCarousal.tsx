// 'use client'

// import CardsCarousel from '@/components/custom/sagar-ropes-shared/carousal/CardsCarousel'
// import VideoThumbnailDialog from '@/components/custom/sagar-ropes-shared/dialog/VideoThumbnailDialog'
// import { News } from '@/payload-types'
// import { SagarVideosBlockType } from '@/types/payloadCustomTypes'

// type NewsItem = NonNullable<News['newsItems']>[number]

// type Props = {
//   publishedVlogs: NewsItem[]
//   block: SagarVideosBlockType
// }

// export default function VideoCarousal({ publishedVlogs, block }: Props) {
//   const cards = publishedVlogs ?? []

//   const items = [...cards.map((c) => ({ type: 'card01' as const, data: c }))]

//   return (
//     //  showNavigation
//     //   navigationWrapperClassName="pointer-events-none absolute inset-y-1/2 left-0 right-0 z-30 -translate-y-1/2"
//     //   prevButtonClassName="pointer-events-auto absolute left-2 md:left-3 xl:left-4 h-8 w-8 rounded-none border border-white/40 bg-transparent text-white hover:bg-white/10"
//     //   nextButtonClassName="pointer-events-auto absolute right-2 md:right-3 xl:right-4 h-8 w-8 rounded-none border border-white/40 bg-transparent text-white hover:bg-white/10"
//     //   paginationClassName="-bottom-6 md:-bottom-8 xl:-bottom-10"

//     <CardsCarousel
//       items={items}
//       className="w-full h-fit mx-auto"
//       contentClassName="-ml-3 md:-ml-4"
//       itemClassName="pl-3 md:pl-4 basis-[100%]"
//       paginationClassName="-bottom-6 md:-bottom-8 xl:-bottom-10"
//       //   showNavigation
//       //   navigationWrapperClassName="absolute right-0 top-0 z-30 flex items-center gap-2"
//       //   prevButtonClassName="pointer-events-auto static h-7 w-7 rounded-none border border-[#7B7BA8] bg-transparent text-[#7B7BA8] hover:bg-[#7B7BA8]/10"
//       //   nextButtonClassName="pointer-events-auto static h-7 w-7 rounded-none border border-[#7B7BA8] bg-transparent text-[#7B7BA8] hover:bg-[#7B7BA8]/10"
//       showNavigation
//       navigationWrapperClassName="pointer-events-none absolute inset-y-1/2 left-0 right-0 z-30 -translate-y-1/2"
//       prevButtonClassName="pointer-events-auto absolute left-2 md:left-3 xl:left-4 h-8 w-8 rounded-none border border-[#7B7BA8] bg-transparent text-white hover:bg-[#7B7BA8]"
//       nextButtonClassName="pointer-events-auto absolute right-2 md:right-3 xl:right-4 h-8 w-8 rounded-none border border-[#7B7BA8] bg-transparent text-white hover:bg-[#7B7BA8]"
//     >
//       {(item, idx) =>
//         item.type === 'card01' &&
//         typeof item?.data?.thumbnailImage === 'object' &&
//         item?.data?.thumbnailImage?.url && (
//           <div className="w-full">
//             <VideoThumbnailDialog
//               className="relative w-full aspect-[16/9]  my-auto "
//               thumbnailUrl={item?.data.thumbnailImage?.url}
//               blurDataURL={item?.data.thumbnailImageBlurDataURL || ''}
//               videoUrl={item?.data.videoUrl ?? ''}
//             />
//           </div>
//         )
//       }
//     </CardsCarousel>
//   )
// }
'use client'

import CardsCarousel from '@/components/custom/sagar-ropes-shared/carousal/CardsCarousel'
import VideoThumbnailDialog from '@/components/custom/sagar-ropes-shared/dialog/VideoThumbnailDialog'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { buildNewsHref } from '@/lib/utils'
import { News } from '@/payload-types'
import { SagarVideosBlockType } from '@/types/payloadCustomTypes'

type NewsItem = NonNullable<News['newsItems']>[number]

type Props = {
  publishedVlogs: NewsItem[]
  block: SagarVideosBlockType
}

export default function VideoCarousal({ publishedVlogs, block }: Props) {
  const cards = publishedVlogs ?? []

  const items = [...cards.map((c) => ({ type: 'card01' as const, data: c }))]

  return (
    <CardsCarousel
      items={items}
      className="w-full h-fit mx-auto"
      contentClassName="-ml-3 md:-ml-4"
      itemClassName="pl-3 md:pl-4 basis-[100%]"
      paginationClassName="-bottom-6 md:-bottom-8 xl:-bottom-10"
      showNavigation
      navigationWrapperClassName="pointer-events-none absolute inset-y-1/2 left-0 right-0 z-30 -translate-y-1/2"
      prevButtonClassName="pointer-events-auto absolute left-2 md:left-3 xl:left-4 h-8 w-8 rounded-none border border-[#7B7BA8] bg-transparent text-white hover:bg-[#7B7BA8]"
      nextButtonClassName="pointer-events-auto absolute right-2 md:right-3 xl:right-4 h-8 w-8 rounded-none border border-[#7B7BA8] bg-transparent text-white hover:bg-[#7B7BA8]"
    >
      {(item, idx) => {
        if (
          item.type !== 'card01' ||
          typeof item?.data?.thumbnailImage !== 'object' ||
          !item?.data?.thumbnailImage?.url
        ) {
          return null
        }

        const detailsCta = block?.detailsPageLink?.[0]

        const detailsHref = detailsCta
          ? buildNewsHref({
              buttonLink: detailsCta?.buttonLink,
              sectionId: detailsCta?.sectionId,
              itemId: item?.data?.id || '',
              detail: true,
            })
          : undefined

        return (
          <div className="w-full">
            <VideoThumbnailDialog
              className="relative w-full aspect-[16/9] my-auto"
              thumbnailUrl={item?.data.thumbnailImage?.url}
              blurDataURL={item?.data.thumbnailImageBlurDataURL || ''}
              videoUrl={item?.data.videoUrl ?? ''}
              detailsHref={detailsHref}
              detailsLabel={
                detailsCta?.label ? (
                  <LocalizedText en={detailsCta.label} bn={detailsCta.label} />
                ) : null
              }
            />
          </div>
        )
      }}
    </CardsCarousel>
  )
}
