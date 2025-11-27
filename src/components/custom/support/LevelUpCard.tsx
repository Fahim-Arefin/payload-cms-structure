import { resolvePageSlug } from '@/lib/utils'
import { HashlinkBlock } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  item: HashlinkBlock['hashLinkCards'][number]
}

function LevelUpCard({ item }: Props) {
  return (
    <Link href={`/${resolvePageSlug(item?.buttonLink)}/#${item?.sectionId}`}>
      <div
        // h-[400px] md:h-[450px] lg:h-[500px]  xl:h-[700px]  2xl:h-[800px]
        className="relative flex justify-center items-center cursor-pointer text-white 
        transition-all duration-300 group overflow-hidden 
        w-full
        aspect-[1/1]
        rounded-[4px] lg:rounded-[6px]"
      >
        {/* Desktop bg */}
        <div className="absolute inset-0 z-0">
          {typeof item?.bgImage === 'object' && item?.bgImage?.url && (
            <Image
              fill
              className="inset-0 object-cover object-center rounded-[4px] lg:rounded-[6px]"
              src={item?.bgImage?.url}
              alt={item?.title}
              aria-hidden="true"
              sizes="(max-width: 767px) 150px,(max-width: 1349px) 350px, 600px"
              placeholder="blur"
              blurDataURL={item?.bgImageBlurDataURL || ''}
              quality={80}
            />
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-20" />

        {/* Content */}
        <div className="relative z-10 global-h1 font-semibold">
          <LocalizedText en={item?.title} bn={item?.titleBN} />
        </div>
      </div>
    </Link>
  )
}

export default LevelUpCard
