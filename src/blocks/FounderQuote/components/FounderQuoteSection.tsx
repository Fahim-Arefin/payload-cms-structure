import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'
import FounderInfoSection from './FounderInfoSection'
import FounderQuote from './FounderQuote'
import Eclipse from 'public/assets/images/introDesign.png'
import Image from 'next/image'
type Props = {
  block: FounderQuoteBlockType
}

function FounderQuoteSection({ block }: Props) {
  return (
    <div className="relative container-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3 xl:gap-6 2xl:gap-24">
        <FounderQuote data={block?.founderQuote} />
        <FounderInfoSection data={block?.founderInfo} />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[100%] ">
        <Image
          src={Eclipse}
          alt="Eclipse"
          sizes="100vw"
          quality={100}
          placeholder="blur"
          fill
          blurDataURL={Eclipse?.blurDataURL}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  )
}

export default FounderQuoteSection
