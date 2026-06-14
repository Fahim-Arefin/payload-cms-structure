// 'use client'
// import ReadMoreBtn from '@/components/custom/sagar-ropes-shared/buttons/ReadMoreBtn'
// import Tags from '@/components/custom/sagar-ropes-shared/others/Tags'
// import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'

// import React, { useState } from 'react'

// type Props = {
//   data: FounderQuoteBlockType['founderQuote']
// }

// function FounderQuote({ data }: Props) {
//   const [fullDesc, setFullDesc] = useState<Boolean>(false)

//   const handleClick = () => {
//     setFullDesc(!fullDesc)
//   }

//   return (
//     <div
//       className={`flex flex-col justify-center items-start space-y-1 lg:space-y-3 xl:space-y-4 2xl:space-y-6`}
//     >
//       {data?.tag && <Tags tag={data?.tag} />}
//       <div>
//         {data?.heading1 && (
//           <div className={`font-agency global-h4 text-secondary-1 `}>
//             <LocalizedHighlighted
//               textBn={data?.heading1}
//               textEn={data?.heading1}
//               highlightEn={data?.heading1Highlighted}
//               highlightBn={data?.heading1Highlighted}
//               highlightClassName={`${data?.heading1HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'} `}
//             />
//           </div>
//         )}
//         {data?.heading2 && (
//           <div className={`font-agency global-h4 text-secondary-1`}>
//             <LocalizedHighlighted
//               textBn={data?.heading2}
//               textEn={data?.heading2}
//               highlightEn={data?.heading2Highlighted}
//               highlightBn={data?.heading2Highlighted}
//               highlightClassName={`${data?.heading2HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'} `}
//             />
//           </div>
//         )}
//       </div>

//       <div className={`font-grift global-p4 text-secondary-2 ${!fullDesc && 'line-clamp-3'}`}>
//         <LocalizedRichText en={data.quote} bn={data.quote} />
//       </div>
//       <div>
//         <ReadMoreBtn onClick={handleClick} text={`${fullDesc ? `Read Less` : `Read More`}`} />
//       </div>
//     </div>
//   )
// }

// export default FounderQuote

'use client'

import ReadMoreBtn from '@/components/custom/sagar-ropes-shared/buttons/ReadMoreBtn'
import Tags from '@/components/custom/sagar-ropes-shared/others/Tags'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { gsap } from '@/lib/gsap'
import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'

import React, { useRef, useState } from 'react'

type Props = {
  data: FounderQuoteBlockType['founderQuote']
}

function FounderQuote({ data }: Props) {
  const [fullDesc, setFullDesc] = useState(false)
  const [isClamped, setIsClamped] = useState(true)

  const descWrapperRef = useRef<HTMLDivElement | null>(null)
  const descInnerRef = useRef<HTMLDivElement | null>(null)

  const getCollapsedHeight = () => {
    const inner = descInnerRef.current
    if (!inner) return 0

    inner.classList.add('line-clamp-3')
    const height = inner.offsetHeight
    inner.classList.remove('line-clamp-3')

    return height
  }

  const handleClick = () => {
    const wrapper = descWrapperRef.current
    const inner = descInnerRef.current

    if (!wrapper || !inner) return

    const currentHeight = wrapper.offsetHeight

    gsap.set(wrapper, {
      height: currentHeight,
      overflow: 'hidden',
    })

    if (!fullDesc) {
      // Expand
      setIsClamped(false)
      setFullDesc(true)

      requestAnimationFrame(() => {
        const fullHeight = inner.scrollHeight

        gsap.to(wrapper, {
          height: fullHeight,
          duration: 0.55,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onComplete: () => {
            gsap.set(wrapper, {
              height: 'auto',
              overflow: 'visible',
            })
          },
        })
      })

      return
    }

    // Collapse
    const collapsedHeight = getCollapsedHeight()

    gsap.to(wrapper, {
      height: collapsedHeight,
      duration: 0.45,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        setIsClamped(true)
        setFullDesc(false)

        gsap.set(wrapper, {
          height: 'auto',
          overflow: 'hidden',
        })
      },
    })
  }

  return (
    <div
      className="
        flex flex-col justify-center items-start
        space-y-1 lg:space-y-3 xl:space-y-4 2xl:space-y-6
      "
    >
      {data?.tag && (
        <div className="mx-auto md:mx-0">
          <Tags tag={data?.tag} />
        </div>
      )}

      <div>
        {data?.heading1 && (
          <div className="font-agency global-h4 text-secondary-1 text-center md:text-start">
            <LocalizedHighlighted
              textBn={data?.heading1}
              textEn={data?.heading1}
              highlightEn={data?.heading1Highlighted}
              highlightBn={data?.heading1Highlighted}
              highlightClassName={`${
                data?.heading1HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
              }`}
            />
          </div>
        )}

        {data?.heading2 && (
          <div className="font-agency global-h4 text-secondary-1 text-center md:text-start">
            <LocalizedHighlighted
              textBn={data?.heading2}
              textEn={data?.heading2}
              highlightEn={data?.heading2Highlighted}
              highlightBn={data?.heading2Highlighted}
              highlightClassName={`${
                data?.heading2HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
              }`}
            />
          </div>
        )}
      </div>

      <div ref={descWrapperRef} className="overflow-hidden">
        <div
          ref={descInnerRef}
          className={`font-grift text-justify global-p4 text-secondary-2 ${isClamped ? 'line-clamp-3' : ''}`}
        >
          <LocalizedRichText en={data?.quote} bn={data?.quote} />
        </div>
      </div>

      <div className="mx-auto md:mx-0">
        <ReadMoreBtn onClick={handleClick} text={fullDesc ? 'Read Less' : 'Read More'} />
      </div>
    </div>
  )
}

export default FounderQuote
