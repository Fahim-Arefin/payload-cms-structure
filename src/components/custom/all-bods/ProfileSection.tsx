// 'use client'

// import { cn } from '@/lib/utils'
// import { BoardOfDirector } from '@/payload-types'
// import Image from 'next/image'
// import React, { useEffect, useRef, useState } from 'react'
// import LocalizedText from '../shared/LocalizedText'
// import LocalizedRichText from '../shared/LocalizedRichText'
// import { BoardOfDirectorsListBlockType } from '@/types/payloadCustomTypes'

// type Props = {
//   data: BoardOfDirector['directors'][number]
//   titleColor: string
//   reverse?: boolean // Controls image/desc order for desktop
//   block?: BoardOfDirectorsListBlockType
// }

// export const ProfileSection: React.FC<Props> = ({ data, titleColor, reverse = false, block }) => {
//   const [expanded, setExpanded] = useState(false)
//   const [isTextClamped, setIsTextClamped] = useState(false)
//   const textRef = useRef<HTMLParagraphElement>(null)

//   useEffect(() => {
//     const checkIfTextClamped = () => {
//       if (textRef.current) {
//         const element = textRef.current
//         const isOverflowing = element.scrollHeight > element.clientHeight
//         setIsTextClamped(isOverflowing)
//       }
//     }

//     checkIfTextClamped()

//     // Check again on window resize to handle responsive changes
//     window.addEventListener('resize', checkIfTextClamped)
//     return () => window.removeEventListener('resize', checkIfTextClamped)
//   }, [data.description])

//   return (
//     <div id={`id-${data.id}`} className="container-padding">
//       <div
//         className={cn(
//           'grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-start',
//           reverse && 'md:grid-cols-[1.8fr_1.2fr] lg:grid-cols-[2fr_1fr]',
//         )}
//       >
//         {/* Image block */}
//         <div
//           className={cn(
//             'w-full flex justify-start items-start',
//             reverse ? 'md:order-2' : 'md:order-1',
//           )}
//         >
//           <div
//             className="relative rounded-md lg:rounded-lg xl:rounded-xl
//           w-full max-w-[400px]
//           h-[400px] md:h-[250px] lg:h-[300px] xl:h-[480px] shadow-md"
//           >
//             {typeof data?.image === 'object' && data?.image?.url && (
//               <Image
//                 fill
//                 src={data.image?.url}
//                 alt={data.title}
//                 className="rounded-md lg:rounded-lg xl:rounded-xl object-cover "
//                 sizes="(max-width:767px) 100vw, 50vw"
//                 placeholder="blur"
//                 blurDataURL={data?.imageBlurDataURL || ''}
//                 quality={90}
//               />
//             )}
//           </div>
//         </div>
//         {/* Content block */}
//         <div
//           className={cn(
//             'flex flex-col justify-start items-start h-full',
//             reverse ? 'md:order-1' : 'md:order-2',
//           )}
//         >
//           <h2 className={`global-h2 font-semibold text-[${titleColor}] mb-1 uppercase`}>
//             <LocalizedText en={data?.title} bn={data?.titleBN} />
//           </h2>
//           <div className="font-medium global-span text-[#444] mb-1 uppercase">
//             <LocalizedText en={data?.designation} bn={data?.designationBN} />
//           </div>
//           <div className="border w-full border-[#000000] mb-4 xl:mb-8" />
//           <div className="transition-all duration-300 overflow-hidden">
//             <div
//               ref={textRef}
//               className={cn(
//                 'text-[#444] font-[350] text-justify text-base leading-7 xl:leading-10 md:global-p1',
//                 !expanded && 'line-clamp-5 lg:line-clamp-5 xl:line-clamp-[7]',
//               )}
//             >
//               <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
//             </div>
//           </div>

//           {isTextClamped && (
//             <button
//               className="mt-2 text-[#ED7125] hover:underline text-sm font-semibold w-fit"
//               onClick={() => setExpanded((prev) => !prev)}
//               aria-expanded={expanded}
//             >
//               {expanded ? (
//                 <LocalizedText en={block?.readLessText} bn={block?.readLessTextBN} />
//               ) : (
//                 <LocalizedText en={block?.readMoreText} bn={block?.readMoreTextBN} />
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
'use client'

import { cn } from '@/lib/utils'
import { BoardOfDirector } from '@/payload-types'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import LocalizedText from '../shared/LocalizedText'
import LocalizedRichText from '../shared/LocalizedRichText'
import {
  BoardOfDirectorsListBlockType,
  LeadershipTeamListBlockType,
} from '@/types/payloadCustomTypes'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import HashScroller from '../news-and-media/HashScroller'

type Props = {
  data: BoardOfDirector['directors'][number]
  titleColor: string
  reverse?: boolean // Controls image/desc order for desktop
  block?: BoardOfDirectorsListBlockType | LeadershipTeamListBlockType
}

export const ProfileSection: React.FC<Props> = ({ data, titleColor, reverse = false, block }) => {
  const [expanded, setExpanded] = useState(false)
  const [isTextClamped, setIsTextClamped] = useState(false)
  const textRef = useRef<HTMLDivElement | null>(null)
  const lang = useSSRLanguage()

  const handleToggle = () => setExpanded((prev) => !prev)

  // Collapse when language changes
  useEffect(() => {
    setExpanded(false)
  }, [lang])

  // Measure overflow for CURRENT language, in COLLAPSED state
  useEffect(() => {
    const el = textRef.current
    if (!el) return

    const measure = () => {
      if (!el) return
      if (expanded) return // only decide button in collapsed mode

      const hasOverflow = el.scrollHeight > el.clientHeight + 1
      setIsTextClamped(hasOverflow)
    }

    const frame = requestAnimationFrame(measure)

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
  }, [lang, expanded, data?.description, data?.descriptionBN])

  return (
    <>
      <HashScroller />
      <div id={`id-${data.id}`} className="container-padding">
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] lg:grid-cols-[1fr_2fr] gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 items-start',
            reverse && 'md:grid-cols-[1.8fr_1.2fr] lg:grid-cols-[2fr_1fr]',
          )}
          // If sticky header is hiding anchor jumps, you can add:
          // className="scroll-mt-[120px] ..."
        >
          {/* Image block */}
          <div
            className={cn(
              'w-full flex justify-start items-start',
              reverse ? 'md:order-2' : 'md:order-1',
            )}
          >
            <div
              className="relative rounded-md lg:rounded-lg xl:rounded-xl
          w-full max-w-[400px]
          h-[400px] md:h-[250px] lg:h-[300px] xl:h-[480px] shadow-md"
            >
              {typeof data?.image === 'object' && data?.image?.url && (
                <Image
                  fill
                  src={data.image?.url}
                  alt={data.title}
                  className="rounded-md lg:rounded-lg xl:rounded-xl object-cover "
                  sizes="(max-width:767px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={data?.imageBlurDataURL || ''}
                  quality={90}
                />
              )}
            </div>
          </div>

          {/* Content block */}
          <div
            className={cn(
              'flex flex-col justify-start items-start h-full',
              reverse ? 'md:order-1' : 'md:order-2',
            )}
          >
            <h2 className={`global-h2 font-semibold text-[${titleColor}] mb-1 uppercase`}>
              <LocalizedText en={data?.title} bn={data?.titleBN} />
            </h2>
            <div className="font-medium global-span text-[#444] mb-1 uppercase">
              <LocalizedText en={data?.designation} bn={data?.designationBN} />
            </div>
            <div className="border w-full border-[#000000] mb-4 xl:mb-8" />

            <div className="transition-all duration-300 overflow-hidden">
              <div
                ref={textRef}
                className={cn(
                  'text-[#444] font-[350] text-justify text-base leading-7 xl:leading-10 md:global-p1',
                  !expanded && 'line-clamp-5 lg:line-clamp-5 xl:line-clamp-[7]',
                )}
              >
                <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
              </div>
            </div>

            {isTextClamped && (
              // <button
              //   className="mt-2 text-[#ED7125] hover:underline text-sm font-semibold w-fit"
              //   onClick={handleToggle}
              //   aria-expanded={expanded}
              // >
              //   {expanded ? (
              //     <LocalizedText en={block?.readLessText} bn={block?.readLessTextBN} />
              //   ) : (
              //     <LocalizedText en={block?.readMoreText} bn={block?.readMoreTextBN} />
              //   )}
              // </button>
              <div className="text-[10px] md:text-sm lg:text-lg flex" onClick={handleToggle}>
                <Button
                  asChild
                  aria-expanded={expanded}
                  variant="link"
                  className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit mx-auto lg:mx-0 cursor-pointer p-0"
                >
                  <div className="flex space-x-1 items-center">
                    <LocalizedText
                      en={expanded ? block?.readLessText : block?.readMoreText}
                      bn={expanded ? block?.readLessTextBN : block?.readMoreTextBN}
                    />
                    <ArrowUpRight />
                  </div>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
