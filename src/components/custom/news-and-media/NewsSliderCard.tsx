// import { GlobalBlog } from '@/payload-types'
// import Image from 'next/image'
// import Link from 'next/link'
// import LocalizedText from '../shared/LocalizedText'
// import { buildDetailHref, formatLocalDhaka, formatMonDYYYYBN, resolvePageSlug } from '@/lib/utils'
// import LocalizedRichText from '../shared/LocalizedRichText'
// import { AllBlockCardType } from '@/types/payloadCustomTypes'

// type Props = {
//   data: GlobalBlog['blogs'][number]
//   block: AllBlockCardType
// }

// function NewsSliderCard({ data, block }: Props) {
//   const pattern = resolvePageSlug(block?.linkTarget) ?? ''
//   return (
//     <Link href={buildDetailHref(pattern, data.id ? data.id : '')}>
//       <div className="border border-[#ED7125] rounded-xl overflow-hidden mx-[2px] lg:mx-[4px] xl:mx-[2px] 2xl:mx-2">
//         <div className="overflow-hidden rounded-t-xl w-full">
//           <div
//             //  h-[220px] md:h-[300px] lg:h-[210px] xl:h-[220px] 2xl:h-[260px]
//             className="relative w-full aspect-[600/375] "
//             role="img"
//             aria-label={data?.title}
//           >
//             {typeof data?.image === 'object' && data?.image?.url && (
//               <Image
//                 src={data?.image?.url}
//                 alt={data?.title}
//                 fill
//                 className="object-cover object-center transition-all duration-300 hover:scale-110"
//                 sizes="(max-width: 767px) 300px, 600px"
//                 placeholder="blur"
//                 blurDataURL={data?.imageBlurDataURL || ''}
//                 quality={80}
//               />
//             )}
//           </div>
//         </div>
//         <div className="p-4 md:p-6 lg:p-4 xl:p-4 2xl:p-6">
//           <div className="text-[#6E6E6E] global-p2 uppercase mb-2">
//             {data?.importantDate && data?.importantDateBN ? (
//               <LocalizedText en={data?.importantDate} bn={data?.importantDateBN} />
//             ) : (
//               <LocalizedText
//                 en={formatLocalDhaka(data?.updatedAt ? data?.updatedAt : '')}
//                 bn={formatMonDYYYYBN(data?.updatedAt ? data?.updatedAt : '')}
//               />
//             )}
//           </div>
//           <div className="global-p2 leading-6 text-justify line-clamp-3">
//             <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
//           </div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default NewsSliderCard

// =================================================================
// =================================================================
// =================================================================

'use client'

import { GlobalBlog } from '@/payload-types'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'
import { buildDetailHref, formatLocalDhaka, formatMonDYYYYBN, resolvePageSlug } from '@/lib/utils'
import LocalizedRichText from '../shared/LocalizedRichText'
import { AllBlockCardType } from '@/types/payloadCustomTypes'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  data: GlobalBlog['blogs'][number]
  block: AllBlockCardType
}

function NewsSliderCard({ data, block }: Props) {
  const router = useRouter()
  const pattern = resolvePageSlug(block?.linkTarget) ?? ''
  const href = buildDetailHref(pattern, data.id ?? '')

  const go = () => router.push(href)
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      go()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={go}
      onKeyDown={onKey}
      className="border border-[#ED7125] rounded-xl overflow-hidden mx-[2px] lg:mx-[4px] xl:mx-[2px] 2xl:mx-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ED7125] focus:ring-offset-2"
      aria-label={data?.title}
    >
      <div className="overflow-hidden rounded-t-xl w-full">
        <div className="relative w-full aspect-[3248/2165]" role="img" aria-label={data?.title}>
          {typeof data?.image === 'object' && data?.image?.url && (
            <Image
              src={data.image.url}
              alt={data.title}
              fill
              className="object-cover object-center transition-all duration-300 hover:scale-110"
              sizes="(max-width: 767px) 300px, 600px"
              placeholder="blur"
              blurDataURL={data.imageBlurDataURL || ''}
              quality={80}
            />
          )}
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-4 xl:p-4 2xl:p-6">
        <div className="text-[#6E6E6E] global-p2 uppercase mb-2">
          {data?.importantDate && data?.importantDateBN ? (
            <LocalizedText en={data.importantDate} bn={data.importantDateBN} />
          ) : (
            <LocalizedText
              en={formatLocalDhaka(data?.updatedAt ? data.updatedAt : '')}
              bn={formatMonDYYYYBN(data?.updatedAt ? data.updatedAt : '')}
            />
          )}
        </div>

        <div className="global-p2 line-clamp-3">
          {/* RichText may include <a>; safe now because wrapper is a div, not a <Link> */}
          <LocalizedRichText en={data.description} bn={data.descriptionBN} />
        </div>
      </div>
    </div>
  )
}

export default NewsSliderCard
