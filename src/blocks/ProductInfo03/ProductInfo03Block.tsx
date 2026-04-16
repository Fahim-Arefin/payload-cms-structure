import Image from 'next/image'
import { default as Pattern01, default as Pattern02 } from '/public/assets/images/BOpattern2.png'
import Blur from '/public/assets/images/Blur.png'
import { ProductInfo03BlockType } from '@/types/payloadCustomTypes'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import IntroSectionDesign03 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign03'
import InfoCard03 from './components/InfoCard03'

type Props = {
  block: ProductInfo03BlockType
  params: Record<string, string>
}

function ProductInfo03Block({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        {/* content */}
        <div
          className={`container-padding grid grid-cols-1 md:grid-cols-12 
          gap-4 md:gap-3 lg:gap-5 xl:gap-8 2xl:gap-20`}
        >
          {/* section intro */}

          <IntroSectionDesign03
            block={block}
            className={`hidden md:flex relative z-20 md:col-span-4`}
            position="left"
            justify="justify-start"
          />
          <IntroSectionDesign03
            block={block}
            className={`flex md:hidden relative z-20 md:col-span-4`}
            position="center"
            justify="justify-center"
          />

          <div
            className="md:col-span-8 flex flex-col 
           gap-2 xl:gap-3 2xl:gap-4"
          >
            {block?.cards04?.map((item, index) => (
              <InfoCard03
                key={index}
                data={item}
                index={index}
                padding="
                px-[14px] py-[16px]
                md:px-[10px] md:py-[16px]
                lg:px-[12px] lg:py-[18px]
                xl:px-[18px] xl:py-[28px]
                2xl:px-[24px] 2xl:py-[34px]"
                height="md:min-h-[140px] lg:min-h-[160px] xl:min-h-[170px] 2xl:min-h-[200px]"
                className="w-full md:w-[97%] lg:w-[95%] hover:scale-105 transition-all duration-300 ease-in"
              />
            ))}
          </div>
        </div>
        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 top-0 z-30 h-[70%] opacity-50
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
            className="invisible md:visible absolute right-0 bottom-0 z-30 h-[30%] opacity-50
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

        <div className="invisible md:visible absolute left-0 bottom-0 z-10 h-[40%] w-[50%]">
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

export default ProductInfo03Block
