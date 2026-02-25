import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { ProductHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import explore from '/public/assets/icons/explore.png'
import union from '/public/assets/icons/union.png'

type Props = {
  item: ProductHeroBlockType['heroes'][number]
}

function ProductHeroItem({ item }: Props) {
  return (
    <div
      // className="relative w-full md:aspect-[16/9] h-screen md:h-auto"
      className="relative w-full h-screen"
    >
      {/* background image */}
      {typeof item.image === 'object' && item.image?.url && (
        <Image
          src={item.image?.url || ''}
          alt={'hero banner image'}
          fill
          className={`object-cover object-center`}
          sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL={item?.imageBlurDataURL || ''}
        />
      )}

      {/* overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,7,37,0.70) 0%, rgba(7,7,37,0.30) 30%, rgba(7,7,37,0.30) 70%, rgba(7,7,37,0.70) 100%)',
        }}
      />

      {/* main content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div
          // border-2 border-black
          className="container-padding w-full
        space-y-10 md:space-y-20 lg:space-y-24 xl:space-y-32 2xl:space-y-32"
        >
          <div className="space-y-10 lg:space-y-6 xl:space-y-8 2xl:space-y-10">
            {/* 3 heading */}
            <div
              className={`font-proxima text-white uppercase font-bold 
             text-[38px] md:text-[48px] lg:text-[72px] xl:text-[96px] 2xl:text-[120px]
             text-center md:text-start leading-[95.833%]
            `}
            >
              <div>
                <LocalizedHighlighted
                  textEn={item?.heading1}
                  textBn={item?.heading1}
                  highlightEn={item?.heading1Highlighted}
                  highlightBn={item?.heading1Highlighted}
                />
              </div>
              <div>
                {item?.heading2 && (
                  <LocalizedHighlighted
                    textEn={item?.heading2}
                    textBn={item?.heading2}
                    highlightEn={item?.heading2Highlighted}
                    highlightBn={item?.heading2Highlighted}
                  />
                )}
              </div>
              <div>
                {item?.heading3 && (
                  <LocalizedHighlighted
                    textEn={item?.heading3}
                    textBn={item?.heading3}
                    highlightEn={item?.heading3Highlighted}
                    highlightBn={item?.heading3Highlighted}
                  />
                )}
              </div>
            </div>

            {/* description */}
            <div
              className={`font-manrope text-white-1 font-light text-opacity-90
          global-p1 text-center md:text-start
          leading-[154.545%]
          `}
            >
              {item?.description && (
                <LocalizedRichText en={item?.description} bn={item?.description} />
              )}
            </div>
          </div>

          {/* product feature */}
          {item?.productHighlights && item?.productHighlights?.length > 0 && (
            <div
              className="flex flex-wrap pl-[25%] md:pl-1
            gap-4 
            lg:gap-x-10 lg:gap-y-5 
            xl:gap-12 xl:gap-y-6"
            >
              {item?.productHighlights.map((prod, index) => {
                return (
                  <div key={`product-highlight-${index}`} className="">
                    <div
                      className="border-l-2 lg:border-l-4 
                    border-l-cyan 
                     pl-2 lg:pl-4 xl:pl-6"
                    >
                      <div className="font-proxima global-h3 text-cyan font-bold leading-[125%]">
                        <LocalizedText en={prod?.value} bn={prod?.value} />
                      </div>
                      <div className="font-manrope global-p2 text-white-1 uppercase font-light text-opacity-80 leading-[144.444%]">
                        <LocalizedText en={prod?.label} bn={prod?.label} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* explore more bedge */}
          {item?.exploreMoreBadge && (
            <div
              className="absolute z-30 
            bottom-16 md:bottom-[70px] xl:bottom-32  
             right-1/2 translate-x-1/2 md:translate-x-0 md:right-8 lg:right-12 xl:right-32 2xl:right-52 "
            >
              <div className="relative h-[95px] w-[95px] rounded-full bg-white-1/10 flex justify-center items-center">
                <Image src={union} alt="Explore More Badge" className="w-[24px] h-[30px]" />
                <Image
                  src={explore}
                  alt="Explore More Badge"
                  className="absolute w-[85%] h-[85%]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductHeroItem
