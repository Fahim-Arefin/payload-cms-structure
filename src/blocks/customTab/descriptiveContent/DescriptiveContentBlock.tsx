// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import LocalizedText from '@/components/custom/shared/LocalizedText'
// import { cn } from '@/lib/utils'
// import { DescriptiveContentBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'

// type Props = {
//   data: DescriptiveContentBlockType
// }

// function DescriptiveContentBlock({ data }: Props) {
//   return (
//     <div className="py-[15px] md:py-0 grid grid-cols-1 md:grid-cols-2 md:gap-4 border border-black">
//       {data?.items?.map((content, i) => {
//         return (
//           <div
//             key={i}
//             className={cn(
//               'border border-black flex flex-col items-center md:items-start justify-center md:justify-start w-[80%] md:w-full mx-auto lg:mx-0 md:flex-row md:space-x-2 2xl:space-x-4 xl:w-[80%] p-2 lg:p-3 xl:p-4',
//               i % 2 === 0 ? '' : ' lg:ml-auto',
//             )}
//           >
//             {typeof content?.icon === 'object' && content?.icon?.url && (
//               <div className="relative min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] ">
//                 <Image
//                   fill
//                   src={content?.icon?.url}
//                   alt={content.title}
//                   className="object-contain object-center"
//                   quality={80}
//                   placeholder="blur"
//                   blurDataURL={content?.iconBlurDataURL || ''}
//                 />
//               </div>
//             )}
//             <div className="text-[#434342] 2xl:max-w-[400px]">
//               <h3 className="global-h4 font-semibold uppercase text-center md:text-start">
//                 <LocalizedText en={content?.title} bn={content?.titleBN} />
//               </h3>

//               <div className="global-p2 font-light lg:leading-6 !text-center md:!text-start">
//                 <LocalizedRichText en={content?.description} bn={content?.descriptionBN} />
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// export default DescriptiveContentBlock

// =====================================================================================================
// =====================================================================================================
// =====================================================================================================

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { cn } from '@/lib/utils'
import { DescriptiveContentBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'

type Props = {
  data: DescriptiveContentBlockType
}

function DescriptiveContentBlock({ data }: Props) {
  return (
    <div
      className={`py-[15px] md:py-0 grid grid-cols-1 ${data?.fullWidth ? '' : ' md:grid-cols-2 '} gap-2 md:gap-4 `}
    >
      {data?.items?.map((content, i) => {
        return (
          <div
            key={i}
            className={cn(
              `group flex flex-col items-center md:items-start justify-center md:justify-start w-[85%] md:w-full mx-auto lg:mx-0 md:flex-row md:space-x-2 2xl:space-x-4 p-2 lg:p-3 xl:p-4`,
              i % 2 === 0 ? '' : ' lg:ml-auto',
              ' h-fit ',
              data?.hoverVisibility &&
                ' cursor-pointer rounded-md lg:rounded-lg border border-transparent bg-transparen transition-colors duration-200 hover:border-[#9C8639] hover:bg-white focus-within:border-[#9C8639] focus-within:bg-white ',
            )}
          >
            {typeof content?.icon === 'object' && content?.icon?.url && (
              <div className="relative min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] ">
                <Image
                  fill
                  src={content?.icon?.url}
                  alt={content.title}
                  className="object-contain object-center"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={content?.iconBlurDataURL || ''}
                />
              </div>
            )}
            <div className={`text-[#434342]`}>
              <h3 className="global-h4 font-semibold uppercase text-center md:text-start">
                <LocalizedText en={content?.title} bn={content?.titleBN} />
              </h3>

              <div
                className={`${!data?.desVisibility && ' transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 '} `}
              >
                <div className="global-p2 font-light lg:leading-6 !text-center md:!text-start">
                  <LocalizedRichText en={content?.description} bn={content?.descriptionBN} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DescriptiveContentBlock
