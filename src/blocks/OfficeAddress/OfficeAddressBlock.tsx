// import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
// import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
// import { OfficeAddressBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'

// type Props = {
//   block: OfficeAddressBlockType
//   params: Record<string, string>
// }

// function OfficeAddressBlock({ block }: Props) {
//   return (
//     <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
//       <div className="relative z-10">
//         <div
//           className="container-padding grid grid-cols-1 md:grid-cols-12
//         gap-6 xl:gap-12 2xl:gap-14"
//         >
//           {/* section intro */}
//           <IntroSectionDesign04
//             block={block}
//             position="left"
//             className={`md:col-span-4 ${block?.addressAlignment === 'left' ? 'order-2' : 'order-1'}`}
//             justify="justify-center"
//           />
//           {/* videos section */}
//           <div
//             className={`md:col-span-8 w-full h-full flex items-center justify-center ${block?.addressAlignment === 'left' ? 'order-1' : 'order-2'}`}
//           >
//             Map
//           </div>
//         </div>
//       </div>
//     </WithHashScroller>
//   )
// }

// export default OfficeAddressBlock
import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { OfficeAddressBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Pattern01 from '/public/assets/images/BOpattern.png'
import Pattern02 from '/public/assets/images/BOpattern.png'
import Image from 'next/image'

type Props = {
  block: OfficeAddressBlockType
  params: Record<string, string>
}

function extractGoogleEmbedSrc(value?: string) {
  if (!value) return ''

  const trimmed = value.trim()

  // Case 1: full iframe pasted
  const iframeSrcMatch = trimmed.match(/src=["']([^"']+)["']/i)
  const possibleSrc = iframeSrcMatch?.[1] || trimmed

  // Allow only Google Maps embed URLs
  const isValidGoogleEmbed =
    possibleSrc.startsWith('https://www.google.com/maps/embed') ||
    possibleSrc.startsWith('http://www.google.com/maps/embed')

  return isValidGoogleEmbed ? possibleSrc : ''
}

function OfficeAddressBlock({ block }: Props) {
  const iframeSrc = extractGoogleEmbedSrc(block?.mapLink)

  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div
          className="container-padding grid grid-cols-1 md:grid-cols-12
          gap-6 xl:gap-12 2xl:gap-14"
        >
          <IntroSectionDesign04
            block={block}
            position="left"
            className={`md:col-span-4 ${
              block?.addressAlignment === 'left' ? 'order-2' : 'order-1'
            }`}
            justify="justify-center"
          />

          <div
            className={`md:col-span-8 w-full h-full flex items-center justify-center ${
              block?.addressAlignment === 'left' ? 'order-1' : 'order-2'
            }`}
          >
            <div className="w-full max-w-[639px] aspect-[639/399] overflow-hidden">
              {iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                  Invalid Google Maps embed link
                </div>
              )}
            </div>
          </div>
        </div>
        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 bottom-0 z-30 h-[50%] opacity-50
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
            className="invisible md:visible absolute right-0 top-0 z-30 h-[50%] opacity-50
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

export default OfficeAddressBlock
