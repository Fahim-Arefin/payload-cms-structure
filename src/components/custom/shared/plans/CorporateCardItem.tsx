import { Button } from '@/components/ui/button'
import { pageHref } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedText from '../LocalizedText'
import { CorporateBlock } from '@/types/payloadCustomTypes'

type Props = {
  data: CorporateBlock['corporateCards'][number]
}

function CorporateCardItem({ data }: Props) {
  return (
    <div className="w-full relative z-30 overflow-hidden rounded-md">
      {/* bg Image  */}
      {typeof data?.bgImage === 'object' && data?.bgImage?.url && (
        <Image
          src={data?.bgImage?.url}
          alt={`Background corporate image`}
          fill
          className="inset-0 rounded-md object-cover object-center "
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
        h-[220px] md:h-[240px] lg:h-[280px] xl:h-[340px] 2xl:h-[400px]
        py-7 lg:py-9 xl:py-12
        px-2 xl:px-5
        flex flex-col items-center justify-center
        space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-6
        group transition-all duration-300 ease-linear
        hover:shadow-lg 
        "
      >
        {/* hover:bg-[#9C8639]/60 */}
        <div
          className="relative transition-transform duration-300 group-hover:scale-105
         w-[40px] md:w-[50px] lg:w-[60px] xl:w-[70px] 2xl:w-[80px]
         aspect-[1/1]"
        >
          {typeof data?.icon === 'object' && data?.icon?.url && (
            <Image
              fill
              src={data?.icon?.url}
              alt={`corporate card icon`}
              className="h-full w-full object-contain object-center"
              placeholder="blur"
              blurDataURL={data?.iconBlurDataURL || ''}
            />
          )}
        </div>

        {data?.descriptions?.map((desc, index) => (
          <div
            key={index}
            className="
        bg-[#3A3A3A]/20 backdrop-blur-[21.599998474121094px] rounded-sm md:rounded-md
        p-2
        w-full lg:w-[90%] xl:w-[80%] mx-auto
        min-h-fit max-h-[50%] flex flex-col justify-between"
          >
            <p
              className="text-white transition-colors duration-500
         global-p2 text-center uppercase font-light"
            >
              <LocalizedText en={desc?.text} bn={desc?.textBN} />
            </p>
            {desc?.buttonLink && desc?.buttonLink && desc?.buttonTextBN && (
              <Button
                variant="link"
                className="text-[#ED7125] hover:underline w-fit mx-auto 
            text-[10px] md:text-[12px] p-0"
              >
                <Link href={pageHref(desc?.buttonLink)} className="flex space-x-1 items-center ">
                  <div>
                    <LocalizedText en={desc?.buttonText} bn={desc?.buttonTextBN} />
                  </div>
                  <ArrowUpRight />
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CorporateCardItem
