// import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
// import { ProductIntroBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React from 'react'
// import Pattern01 from '/public/assets/images/pattern1.png'
// import Pattern02 from '/public/assets/images/pattern2.png'
// import HashScroller from '@/components/custom/sagar-ropes-shared/others/HashScroller'

// type Props = {
//   block: ProductIntroBlockType
//   params: Record<string, string>
// }

// function ProductIntroBlock({ block }: Props) {
//   return (
//     <>
//       <HashScroller />
//       <div
//         id={block?.sectionId || ''}
//         style={{ backgroundColor: block?.backgroundColor || '' }}
//         className="relative z-10"
//       >
//         <div className="container-padding">
//           <IntroSection block={block} />
//         </div>
//         {/* pattern 01 */}
//         {/* <div className="invisible md:visible absolute left-0 top-0 z-30 w-[40%] h-full ">
//         <Image
//           fill
//           src={Pattern01}
//           alt="pattern image 01"
//           quality={90}
//           sizes="100vw"
//           className="object-cover"
//           placeholder="blur"
//           blurDataURL={Pattern01?.blurDataURL}
//         />
//       </div> */}
//         {/* pattern 01 */}
//         {/* <div className="invisible md:visible absolute right-0 top-0 z-30 w-[40%] h-full ">
//         <Image
//           fill
//           src={Pattern02}
//           alt="pattern image 02"
//           quality={90}
//           sizes="100vw"
//           className="object-cover"
//           placeholder="blur"
//           blurDataURL={Pattern02?.blurDataURL}
//         />
//       </div> */}
//       </div>
//     </>
//   )
// }

// export default ProductIntroBlock

import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ProductIntroBlockType } from '@/types/payloadCustomTypes'
import Pattern01 from '/public/assets/images/BOpattern.png'
import Pattern02 from '/public/assets/images/BOpattern.png'
import Image from 'next/image'

type Props = {
  block: ProductIntroBlockType
  params: Record<string, string>
}

function ProductIntroBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div className="container-padding">
          <IntroSection block={block} />
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 bottom-0 z-30 h-[50%]
           md:w-[120px] 
           lg:w-[170px] 
           xl:w-[225px] 
           2xl:w-[280px]
        "
          >
            <Image
              fill
              src={Pattern01}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className="object-cover -rotate-180"
              placeholder="blur"
              blurDataURL={Pattern01?.blurDataURL}
            />
          </div>
        )}
        {/* pattern 2 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute right-0 top-0 z-30 h-[50%]
           md:w-[120px] 
           lg:w-[170px] 
           xl:w-[225px] 
           2xl:w-[280px]
        "
          >
            <Image
              fill
              src={Pattern02}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={Pattern02?.blurDataURL}
            />
          </div>
        )}
      </div>
    </WithHashScroller>
  )
}

export default ProductIntroBlock
