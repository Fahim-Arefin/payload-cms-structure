import { Button } from '@/components/ui/button'
import { PlanCardBlockType } from '@/types/payloadCustomTypes'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedText from '../LocalizedText'
import { pageHref } from '@/lib/utils'

type Props = {
  data: PlanCardBlockType['cards'][number]
  blur?: boolean
}

function AllPlanCard({ data, blur }: Props) {
  return (
    <div
      // h-[250px] md:h-[250px] lg:h-[250px] xl:h-[300px] 2xl:h-[360px]
      className="group relative overflow-hidden
       w-full mx-auto 
       h-[250px] md:h-[250px] lg:h-[250px] xl:h-[300px] 2xl:h-[360px]
    rounded-[6px] xl:rounded-[10px] 2xl:rounded-[10px] "
    >
      {/* Background image only */}
      {typeof data?.bgImage === 'object' && data?.bgImage?.url && (
        <Image
          src={data?.bgImage?.url}
          alt={data?.title}
          fill
          className="object-cover object-center transition-transform duration-500 scale-100 group-hover:scale-105"
          sizes="(max-width:639px) 400px, (max-width:1023px) 300px, 500px"
          placeholder="blur"
          blurDataURL={data?.bgImageBlurDataURL || ''}
          quality={85}
        />
      )}

      {/* Gradient overlay with hover effect */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 z-10" />

      {/* Content */}
      <div
        className="relative z-20 text-white
      flex flex-col justify-between h-full
       px-5 py-7 md:px-5 md:py-8 lg:px-4 lg:py-8 xl:px-6 xl:py-10"
      >
        <div className="h-[50%] flex items-start">
          <div
            className={`text-[20px] xl:text-[28px] 2xl:text-[32px]  uppercase mx-auto lg:mx-0 text-center lg:text-start`}
          >
            <LocalizedText en={data?.title} bn={data?.titleBN} />
            <br></br>
          </div>
        </div>
        {/* blur section */}
        <div
          className={`${blur && 'bg-[#3A3A3A]/20 backdrop-blur-[21.599998474121094px] rounded-md px-3 py-4 md:px-4 md:py-4 lg:px-3 lg:py-2 xl:py-4 xl:px-3 w-[85%] md:w-[95%] mx-auto lg:w-full'} 
        h-[60%] flex flex-col justify-between`}
        >
          <p className="global-p2 text-center lg:text-start">
            <LocalizedText en={data?.description} bn={data?.descriptionBN} />
          </p>
          <Button
            variant="link"
            className="text-[#ED7125] hover:underline w-fit mx-auto lg:mx-0
           global-p2 p-0 "
          >
            <div className="flex space-x-1 items-center cursor-pointer">
              <Link href={pageHref(data?.buttonLink)}>
                <LocalizedText en="Explore" bn="এক্সপ্লোর" />
              </Link>
              <ArrowUpRight />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AllPlanCard
