import IntroSectionDesign03 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign03'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { PerformanceAndApplicationCardBlockType } from '@/types/payloadCustomTypes'
import Pattern01 from '/public/assets/images/BOpattern2.png'
import Pattern02 from '/public/assets/images/BOpattern2.png'
import Blur from '/public/assets/images/Blur.png'
import Image from 'next/image'
import PerformanceAndApplicationCardCarousel from './components/PerformanceAndApplicationCardCarousel'

type Props = {
  block: PerformanceAndApplicationCardBlockType
  params: Record<string, string>
}

function PerformanceAndApplicationCardBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        {/* content */}
        <div className={`container-padding`}>
          {/* section intro */}
          <IntroSectionDesign03 block={block} className={`relative z-20`} />

          {/* CAROUSEL */}
          <div className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 ">
            <PerformanceAndApplicationCardCarousel block={block} />
          </div>
        </div>
        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 top-0 z-30 h-[50%] opacity-50
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
              className=""
              placeholder="blur"
              blurDataURL={Pattern01?.blurDataURL}
            />
          </div>
        )}
        {/* pattern 2 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute right-0 bottom-0 z-30 h-[50%] opacity-50
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
              className="object-cover rotate-180"
              placeholder="blur"
              blurDataURL={Pattern02?.blurDataURL}
            />
          </div>
        )}

        <div className="invisible md:visible absolute left-0 bottom-0 z-10 h-[70%] w-[50%]">
          <Image
            fill
            src={Blur}
            alt="blur image "
            quality={90}
            sizes="100vw"
            className="object-fill object-center"
            placeholder="blur"
            blurDataURL={Blur?.blurDataURL}
          />
        </div>
      </div>
    </WithHashScroller>
  )
}

export default PerformanceAndApplicationCardBlock
