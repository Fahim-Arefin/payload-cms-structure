// 'use client'

// import Image from 'next/image'
// import { useEffect, useRef, useState } from 'react'
// import LocalizedRichText from '../shared/LocalizedRichText'
// import LocalizedText from '../shared/LocalizedText'
// import { DirectorMessagesBlockType } from '@/types/payloadCustomTypes'
// import { useLanguage } from '@/context/LanguageContext'

// type Props = {
//   data: DirectorMessagesBlockType['cards'][0]
//   index: number
// }

// function DirectorCard({ data, index }: Props) {
//   const [expand, setExpand] = useState(false)
//   const [isOverflowing, setIsOverflowing] = useState(false)
//   const textRef = useRef<HTMLParagraphElement>(null)
//   const { language } = useLanguage()

//   const handleExpand = () => setExpand(!expand)

//   // Check if text is truncated
//   useEffect(() => {
//     if (textRef.current) {
//       const { scrollHeight, clientHeight } = textRef.current
//       setIsOverflowing(scrollHeight > clientHeight)
//       setExpand(true)
//     }
//   }, [data?.description, data?.descriptionBN, language])

//   useEffect(() => {
//     setExpand(false)
//   }, [language])

//   // pick from the current card's data (validated as #RRGGBB in schema)
//   const bg = data?.backgroundColor || ''

//   return (
//     // <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'}`}>
//     <div style={{ backgroundColor: bg }}>
//       <div className="relative grid grid-cols-2 container-padding">
//         {/* Image Container */}
//         <div className="flex flex-col space-y-2 md:space-y-4">
//           <div
//             // h-[160px] md:h-[250px] lg:h-[360px] xl:h-[420px] 2xl:h-[600px]
//             // w-[160px] md:w-[250px] lg:w-[360px] xl:w-[420px] 2xl:w-[550px]
//             className="relative w-[160px] md:w-[250px] lg:w-[360px] xl:w-[420px] 2xl:w-[550px] aspect-[8/9]"
//           >
//             {/* Gradient Background Frame */}
//             <div
//               className={`absolute bottom-0 z-0 w-full h-2/3
//                 rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]
//                 ${
//                   index % 2 === 0
//                     ? 'bg-gradient-to-t from-[#ED7125] via-[#ED7125]/30 to-transparent'
//                     : 'bg-gradient-to-t from-[#9C8639] via-[#9C8639]/30 to-transparent'
//                 }`}
//             />

//             {/* Foreground Image */}
//             <div className="relative z-10 w-full h-full rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]">
//               {typeof data?.image === 'object' && data?.image?.url && (
//                 <Image
//                   fill
//                   src={data.image?.url}
//                   alt={data.title}
//                   className="inset-0 object-cover object-center
//                 rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]"
//                   sizes="100vw"
//                   quality={99}
//                   placeholder="blur"
//                   blurDataURL={data?.imageBlurDataURL || ''}
//                 />
//               )}
//             </div>

//             {/* Name and Designation */}
//             {data.name && data.designation && (
//               <div className="text-center mt-1 md:mt-4">
//                 <h2 className="text-[#1E1E1E] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-medium lg:font-semibold">
//                   {/* {data.name} */}
//                   <LocalizedText en={data?.name} bn={data?.nameBN} />
//                 </h2>
//                 <div className="text-[#ED7125] text-[9px] md:text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] font-medium lg:font-semibold uppercase">
//                   {/* {data.designation} */}
//                   <LocalizedText en={data?.designation} bn={data?.designationBN} />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Text Content */}
//         <div className="z-40 space-y-1.5 md:space-y-4 lg:space-y-4 2xl:space-y-6">
//           <div>
//             <h1 className="text-[13px] md:text-[20px] lg:global-h1 font-medium  lg:font-semibold text-[#ED7125] uppercase">
//               {/* {data.title} */}
//               <LocalizedText en={data?.title} bn={data?.titleBN} />
//             </h1>
//             <h1 className="text-[13px] md:text-[20px] lg:global-h1 font-medium lg:font-semibold uppercase">
//               {/* {data.subtitle} */}
//               <LocalizedText en={data?.subtitle} bn={data?.subtitleBN} />
//             </h1>
//           </div>

//           {/* Description */}
//           <div
//             ref={textRef}
//             className={`text-[#434343] global-p2 text-justify ${
//               !expand
//                 ? 'line-clamp-6 md:line-clamp-[8] lg:line-clamp-[10] xl:line-clamp-[11] 2xl:line-clamp-[13]'
//                 : ''
//             }`}
//           >
//             {/* {data?.description} */}
//             <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
//           </div>

//           {/* Conditionally render button only if text is overflowing */}
//           {isOverflowing && (
//             <div
//               onClick={handleExpand}
//               className="uppercase cursor-pointer text-[10px] md:text-sm lg:text-lg flex"
//             >
//               <div className="text-[#ED7125] flex items-center space-x-1 md:space-x-2 hover:underline hover:underline-offset-8 font-medium">
//                 <div>
//                   {expand ? (
//                     <LocalizedText en={data?.readLessText} bn={data?.readLessTextBN} />
//                   ) : (
//                     <LocalizedText en={data?.readMoreText} bn={data?.readMoreTextBN} />
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DirectorCard

// =====================================================================================
// =====================================================================================
// =====================================================================================
// =====================================================================================
'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import LocalizedRichText from '../shared/LocalizedRichText'
import LocalizedText from '../shared/LocalizedText'
import { DirectorMessagesBlockType } from '@/types/payloadCustomTypes'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  data: DirectorMessagesBlockType['cards'][0]
  index: number
}

function DirectorCard({ data, index }: Props) {
  const [expand, setExpand] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const textRef = useRef<HTMLDivElement | null>(null)
  const lang = useSSRLanguage()

  const handleExpand = () => setExpand((prev) => !prev)

  // When language changes, always collapse
  useEffect(() => {
    setExpand(false)
  }, [lang])

  // Measure overflow for CURRENT language in COLLAPSED state
  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const measure = () => {
      if (!el) return
      // Only care about collapsed state to decide if button is needed
      if (expand) return

      const hasOverflow = el.scrollHeight > el.clientHeight + 1
      setIsOverflowing(hasOverflow)
    }

    // First measure after render
    const frame = requestAnimationFrame(measure)

    // Re-measure on resize / content change
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        measure()
      })
      ro.observe(el)
    }

    return () => {
      cancelAnimationFrame(frame)
      if (ro) ro.disconnect()
    }
    // Depend on lang + descriptions so EN/BN differences are handled
  }, [lang, expand, data?.description, data?.descriptionBN])

  // pick from the current card's data (validated as #RRGGBB in schema)
  const bg = data?.backgroundColor || ''

  return (
    <div style={{ backgroundColor: bg }}>
      <div className="relative grid grid-cols-2 container-padding">
        {/* Image Container */}
        <div className="flex flex-col space-y-2 md:space-y-4">
          <div className="relative w-[160px] md:w-[250px] lg:w-[360px] xl:w-[420px] 2xl:w-[550px] aspect-[8/9]">
            {/* Gradient Background Frame */}
            <div
              className={`absolute bottom-0 z-0 w-full h-2/3 
                rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]
                ${
                  index % 2 === 0
                    ? 'bg-gradient-to-t from-[#ED7125] via-[#ED7125]/30 to-transparent'
                    : 'bg-gradient-to-t from-[#9C8639] via-[#9C8639]/30 to-transparent'
                }`}
            />

            {/* Foreground Image */}
            <div className="relative z-10 w-full h-full rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]">
              {typeof data?.image === 'object' && data?.image?.url && (
                <Image
                  fill
                  src={data.image?.url}
                  alt={data.title}
                  className="inset-0 object-cover object-center
                rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]"
                  sizes="100vw"
                  quality={99}
                  placeholder="blur"
                  blurDataURL={data?.imageBlurDataURL || ''}
                />
              )}
            </div>

            {/* Name and Designation */}
            {data.name && data.designation && (
              <div className="text-center mt-1 md:mt-4">
                <h2 className="text-[#1E1E1E] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-medium lg:font-semibold">
                  <LocalizedText en={data?.name} bn={data?.nameBN} />
                </h2>
                <div className="text-[#ED7125] text-[9px] md:text-[12px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px] font-medium lg:font-semibold uppercase">
                  <LocalizedText en={data?.designation} bn={data?.designationBN} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Text Content */}
        <div className="z-40 space-y-1.5 md:space-y-4 lg:space-y-4 2xl:space-y-6">
          <div>
            <h1 className="text-[13px] md:text-[20px] lg:global-h1 font-medium  lg:font-semibold text-[#ED7125] uppercase">
              <LocalizedText en={data?.title} bn={data?.titleBN} />
            </h1>
            <h1 className="text-[13px] md:text-[20px] lg:global-h1 font-medium lg:font-semibold uppercase">
              <LocalizedText en={data?.subtitle} bn={data?.subtitleBN} />
            </h1>
          </div>

          {/* Description */}
          <div
            ref={textRef}
            className={`text-[#434343] global-p2 text-justify ${
              !expand
                ? 'line-clamp-6 md:line-clamp-[8] lg:line-clamp-[10] xl:line-clamp-[11] 2xl:line-clamp-[13]'
                : ''
            }`}
          >
            <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
          </div>

          {/* Conditionally render button only if text is overflowing for current lang */}
          {isOverflowing && (
            <div onClick={handleExpand} className="text-[10px] md:text-sm lg:text-lg flex">
              {/* <div className="text-[#ED7125] flex items-center space-x-1 md:space-x-2 hover:underline hover:underline-offset-8 font-medium">
                <div>
                  {expand ? (
                    <LocalizedText en={data?.readLessText} bn={data?.readLessTextBN} />
                  ) : (
                    <LocalizedText en={data?.readMoreText} bn={data?.readMoreTextBN} />
                  )}
                </div>
              </div> */}
              <Button
                asChild
                variant="link"
                className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit mx-auto lg:mx-0 cursor-pointer global-p2 p-0"
              >
                <div className="flex space-x-1 items-center">
                  <LocalizedText
                    en={expand ? data?.readLessText : data?.readMoreText}
                    bn={expand ? data?.readLessTextBN : data?.readMoreTextBN}
                  />
                  <ArrowUpRight />
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DirectorCard
