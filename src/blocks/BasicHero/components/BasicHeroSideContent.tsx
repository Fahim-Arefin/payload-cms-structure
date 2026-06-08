import { pageHrefWithAnchor } from '@/lib/utils'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  item: BasicHeroBlockType['heroes'][number]
}

function getPublicVideoAssetPath(fileName?: string | null) {
  const cleanFileName = fileName?.trim()

  if (!cleanFileName) return ''

  if (cleanFileName.startsWith('http://') || cleanFileName.startsWith('https://')) {
    return cleanFileName
  }

  if (cleanFileName.startsWith('/')) {
    return cleanFileName
  }

  if (cleanFileName.startsWith('assets/videos/')) {
    return `/${cleanFileName}`
  }

  return `/assets/videos/${cleanFileName}`
}

function BasicHeroSideContent({ item }: Props) {
  const heroMediaType = item?.heroMediaType || 'none'
  const videoAssetSrc = getPublicVideoAssetPath(item?.videoAssetName)

  return (
    <div className="hidden md:block z-10 absolute right-0 top-[100px] h-[calc(100vh-100px)] w-[50%] lg:w-[60%] 2xl:w-[65%]">
      <div className="w-full h-full relative">
        {/* image / video */}
        <div className="w-full h-full">
          {heroMediaType === 'image' && typeof item.image === 'object' && item.image?.url && (
            <Image
              src={item?.image?.url}
              alt="hero image"
              fill
              className="object-fill object-top xl:object-contain xl:origin-center z-0"
              sizes="100vw"
              priority
              quality={100}
              placeholder="blur"
              blurDataURL={item?.imageBlurDataURL || ''}
            />
          )}

          {heroMediaType === 'video' && videoAssetSrc && (
            <video
              className="absolute inset-0 z-0 h-full w-full object-fill object-top xl:object-contain bg-transparent"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={videoAssetSrc} />
            </video>
          )}
        </div>

        {/* stack show */}
        <div className="absolute inset-x-0 bottom-24 z-40 h-auto flex justify-end container-padding-r">
          <div
            className="w-full lg:w-[90%] xl:w-[70%] 2xl:w-[60%] flex flex-wrap 
            gap-[8px] 2xl:gap-[10px]"
          >
            {item?.webSolutionsWeProvide?.map((sol, i) => {
              const href = pageHrefWithAnchor(sol?.buttonLink, sol?.sectionId)
              const link = href !== '#' ? href : ''

              const chipClassName = `font-grift global-p5 text-primary-2 
                px-[24px]
                py-[8px]
                rounded-[99px]
                border border-primary-2
                transition-all duration-300 ease-in
                ${link ? 'hover:bg-primary-1/30 hover:text-white-1 cursor-pointer' : ''}`

              if (link) {
                return (
                  <Link key={i} href={link} className={chipClassName}>
                    {sol?.solution}
                  </Link>
                )
              }

              return (
                <div key={i} className={chipClassName}>
                  {sol?.solution}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicHeroSideContent
