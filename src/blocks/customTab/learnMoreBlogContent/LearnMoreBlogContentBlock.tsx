// 'use client'
// import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import LocalizedText from '@/components/custom/shared/LocalizedText'
// import { Button } from '@/components/ui/button'
// import { LearnMoreBlogContentBlockType } from '@/types/payloadCustomTypes'
// import { ArrowUpRight } from 'lucide-react'
// import Image from 'next/image'
// import React, { useState } from 'react'

// type Props = {
//   data: LearnMoreBlogContentBlockType
// }

// function LearnMoreBlogContentBlock({ data }: Props) {
//   const [descFull, SetDescFull] = useState(false)

//   return (
//     <div>
//       {/* Tab heading section */}
//       {data?.groups?.map((eachItem, i) => (
//         <div
//           key={i}
//           className={` text-[#434343] text-start space-y-4 md:space-y-10 lg:space-y-12 xl:space-y-20`}
//         >
//           {/* heading */}
//           <div>
//             <div className="uppercase global-h3 font-medium">
//               <div>
//                 <LocalizedHighlighted
//                   textEn={eachItem?.title}
//                   highlightEn={eachItem?.highlightedTitle}
//                   textBn={eachItem?.titleBN}
//                   highlightBn={eachItem?.highlightedTitleBN}
//                 />
//               </div>
//               {(eachItem?.subtitle || eachItem?.subtitleBN) && (
//                 <div>
//                   <LocalizedHighlighted
//                     textEn={eachItem?.subtitle}
//                     highlightEn={eachItem?.highlightedSubtitle}
//                     textBn={eachItem?.subtitleBN}
//                     highlightBn={eachItem?.highlightedSubtitleBN}
//                   />
//                 </div>
//               )}
//             </div>
//             {(eachItem?.description || eachItem?.descriptionBN) && (
//               <div
//                 className={`global-p1 text-[#3A3A3A] font-[350]
//                 ${(eachItem?.title || eachItem?.titleBN) && (eachItem?.subtitle || eachItem?.subtitleBN) ? `mt-2 md:mt-4 xl:mt-6 2xl:mt-8` : ''}`}
//               >
//                 <LocalizedRichText en={eachItem?.description} bn={eachItem?.descriptionBN} />
//               </div>
//             )}
//           </div>
//           {/* content section*/}
//           {eachItem?.blogs?.map((blog, index) => (
//             <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-32">
//               {/* content */}
//               <div
//                 className={`order-2 space-y-4 flex flex-col justify-center items-center ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}
//                 `}
//               >
//                 <div className="text-[#201F22] global-h3 font-semibold text-center">
//                   <LocalizedText en={blog?.title} bn={blog?.titleBN} />
//                 </div>
//                 <div
//                   className={`global-p2 font-light text-[#828384] text-justify
//                   ${!descFull && `line-clamp-3`}`}
//                 >
//                   <LocalizedRichText en={blog?.description} bn={blog?.descriptionBN} />
//                 </div>
//                 {descFull ? (
//                   <div>
//                     <Button
//                       asChild
//                       variant="link"
//                       className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit mx-auto lg:mx-0 cursor-pointer
//             global-p2 p-0"
//                       onClick={() => SetDescFull(!descFull)}
//                     >
//                       <div className="flex space-x-1 items-center uppercase ">
//                         <LocalizedText en={blog?.readLessText} bn={blog?.readLessTextBN} />
//                         <ArrowUpRight />
//                       </div>
//                     </Button>
//                   </div>
//                 ) : (
//                   <div>
//                     <Button
//                       asChild
//                       variant="link"
//                       className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit mx-auto lg:mx-0 cursor-pointer
//             global-p2 p-0"
//                       onClick={() => SetDescFull(!descFull)}
//                     >
//                       <div className="flex space-x-1 items-center uppercase ">
//                         <LocalizedText en={blog?.readMoreText} bn={blog?.readMoreTextBN} />
//                         <ArrowUpRight />
//                       </div>
//                     </Button>
//                   </div>
//                 )}
//               </div>
//               {/* image */}
//               <div
//                 className={`relative flex flex-col justify-center order-1 rounded-xl ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}  w-full aspect-[525/278]`}
//               >
//                 {typeof blog?.image === 'object' && blog?.image?.url && (
//                   <Image
//                     fill
//                     src={blog?.image?.url}
//                     alt={blog?.title}
//                     sizes="50vw"
//                     className="object-cover object-center rounded-xl"
//                     quality={80}
//                     placeholder="blur"
//                     blurDataURL={blog?.imageBlurDataURL || ''}
//                   />
//                 )}
//                 <div
//                   className="bg-white rounded-tr-xl absolute left-0 bottom-0
//                 h-12 w-12"
//                 >
//                   <div className="invisible">white layer</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default LearnMoreBlogContentBlock

// ===========================================================================
// ===========================================================================
// ===========================================================================
'use client'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { LearnMoreBlogContentBlockType } from '@/types/payloadCustomTypes'
import BlogItem from './BlogItem'

type Props = {
  data: LearnMoreBlogContentBlockType
}

function LearnMoreBlogContentBlock({ data }: Props) {
  return (
    <div>
      {/* Tab heading section */}
      {data?.groups?.map((eachItem, i) => (
        <div
          key={i}
          className="text-[#434343] text-start space-y-4 md:space-y-10 lg:space-y-12 xl:space-y-20"
        >
          {/* heading */}
          <div>
            <div className="uppercase global-h3 font-medium">
              <div>
                <LocalizedHighlighted
                  textEn={eachItem?.title}
                  highlightEn={eachItem?.highlightedTitle}
                  textBn={eachItem?.titleBN}
                  highlightBn={eachItem?.highlightedTitleBN}
                />
              </div>
              {(eachItem?.subtitle || eachItem?.subtitleBN) && (
                <div>
                  <LocalizedHighlighted
                    textEn={eachItem?.subtitle}
                    highlightEn={eachItem?.highlightedSubtitle}
                    textBn={eachItem?.subtitleBN}
                    highlightBn={eachItem?.highlightedSubtitleBN}
                  />
                </div>
              )}
            </div>
            {(eachItem?.description || eachItem?.descriptionBN) && (
              <div
                className={`global-p1 text-[#3A3A3A] font-[350] ${
                  (eachItem?.title || eachItem?.titleBN) &&
                  (eachItem?.subtitle || eachItem?.subtitleBN)
                    ? 'mt-2 md:mt-4 xl:mt-6 2xl:mt-8'
                    : ''
                }`}
              >
                <LocalizedRichText en={eachItem?.description} bn={eachItem?.descriptionBN} />
              </div>
            )}
          </div>

          {/* content section */}
          {eachItem?.blogs?.map((blog, index) => (
            <BlogItem key={index} blog={blog} index={index} />
          ))}
        </div>
      ))}
    </div>
  )
}

export default LearnMoreBlogContentBlock
