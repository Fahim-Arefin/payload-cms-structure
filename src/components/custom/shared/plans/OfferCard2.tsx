import { Button } from '@/components/ui/button'
import { OfferDataType2 } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import ToolTip from '../ToolTip'
import Image from 'next/image'
import LocalizedText from '../LocalizedText'
import { OfferBlock } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import { pageHref } from '@/lib/utils'

type Props = {
  data: OfferBlock['offerCards'][number]
}

function OfferCard2({ data }: Props) {
  return (
    <div
      className="relative z-30 overflow-hidden
            rounded-[4px] lg:rounded-[6px]"
    >
      {/* Image */}
      {typeof data?.bgImage === 'object' && data?.bgImage?.url && (
        <Image
          fill
          className="object-cover rounded-[4px] lg:rounded-[6px]"
          src={data?.bgImage?.url}
          alt={data?.title}
          aria-hidden="true"
          sizes="(max-width: 767px) 150px,(max-width: 1349px) 350px, 600px"
          placeholder="blur"
          blurDataURL={data?.bgImageBlurDataURL || ''}
          quality={80}
        />
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0000004D] to-[#0000004D]/60 z-0" />

      {/* Foreground content */}
      <div
        className="relative z-10
        h-[240px] md:h-[270px] lg:h-[300px] xl:h-[380px] 2xl:h-[420px] 
       py-4 lg:py-4 xl:py-6 2xl:py-8 
       px-2 lg:px-3 xl:px-4 2xl:px-5 
        flex flex-col justify-between 
        space-y-2 lg:space-y-3 xl:space-y-4 2xl:space-y-5
        group transition-all duration-300 ease-linear
        hover:shadow-lg 
        "
      >
        {/*  hover:bg-[#9C8639]/60 */}
        <div
          className="relative transition-transform duration-500 group-hover:scale-105 
         w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[70px] 
         aspect-[1/1] "
        >
          {typeof data?.icon === 'object' && data?.icon?.url && (
            <Image
              fill
              src={data?.icon?.url}
              alt={data?.title || ''}
              className="object-contain object-center"
              placeholder="blur"
              blurDataURL={data?.iconBlurDataURL || ''}
              quality={80}
            />
          )}
        </div>

        <div
          className="text-white group-hover:text-white  transition-colors duration-500 uppercase
        text-[12px] md:text-[13px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px] "
        >
          <LocalizedText en={data?.title} bn={data?.titleBN} />
          <br />
          {(data?.subTitle || data?.subTitleBN) && (
            <LocalizedText en={data?.subTitle} bn={data?.subTitleBN} />
          )}
        </div>

        <div
          className="
        bg-[#3A3A3A]/20 backdrop-blur-[21.599998474121094px] rounded-md 
        px-2 py-2 lg:px-2 lg:py-2 xl:py-4 xl:px-3 
        w-full
        min-h-[50%] flex flex-col justify-between "
        >
          <p
            className="text-white group-hover:text-white  transition-colors duration-500 
        text-[10px] md:text-[12px] lg:text-[12px] xl:text-[14px]"
          >
            <LocalizedText en={data?.text} bn={data?.textBN} />
          </p>
          {/* <div
            className="cursor-pointer text-[10px] md:text-[12px] text-[#ED7125] underline underline-offset-4 
             opacity-100
             group-hover:opacity-100
             transition-all duration-300 ease-in font-medium 
             flex space-x-1 items-center"
          >
            <div>Explore Now</div>
            <ArrowUpRight size={15} className="mt-0.5" />
          </div> */}
          {(data?.buttonLink || data?.buttonText || data?.buttonTextBN) && (
            // <Button
            //   variant="link"
            //   className="text-[#ED7125] hover:underline w-fit
            // text-[10px] md:text-[12px] p-0"
            // >
            //   <div className="flex space-x-1 items-center ">
            //     <div>
            //       <LocalizedText en={data?.buttonText} bn={data?.buttonTextBN} />
            //     </div>
            //     <ArrowUpRight />
            //   </div>
            // </Button>
            <Button
              asChild
              variant="link"
              className="text-[#ED7125] hover:underline w-fit text-[10px] md:text-[12px] p-0"
            >
              <Link href={pageHref(data?.buttonLink)}>
                <div className="flex space-x-1 items-center">
                  <div>
                    <LocalizedText en={data?.buttonText} bn={data?.buttonTextBN} />
                  </div>
                  <ArrowUpRight />
                </div>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OfferCard2
