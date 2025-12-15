'use client'

import Image from 'next/image'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import { GlobalBlog } from '@/payload-types'
import { HeroDynamicBlockType } from '@/types/payloadCustomTypes'
import { useParams } from 'next/navigation'

type Props = {
  slide: HeroDynamicBlockType['heroes'][number]
  globalBlogData: GlobalBlog
}

export default function HeroDynamicItem({ slide, globalBlogData }: Props) {
  const stableAlt = slide?.title || 'Hero image'

  // ✅ Properly typed useParams for [[...slug]]
  const params = useParams<{ slug?: string[] }>()
  const slug = params.slug
  const id = slug?.[slug.length - 1]

  // ✅ Find matching blog by id
  const targetBlog = globalBlogData?.blogs?.find((blog) => blog.id === id)

  const hasTargetBlogImage =
    targetBlog && typeof targetBlog.image === 'object' && !!targetBlog.image?.url

  // ✅ Decide which image to use
  const fallbackSrc = '/assets/images/newsDetails.webp' // ⬅️ change to your actual asset path
  const imageSrc = hasTargetBlogImage ? (targetBlog!.image as any).url : fallbackSrc
  const blurDataURL =
    hasTargetBlogImage && (targetBlog as any).imageBlurDataURL
      ? (targetBlog as any).imageBlurDataURL
      : undefined

  return (
    <>
      {/* Background image with fallback */}
      {blurDataURL ? (
        <Image
          src={imageSrc}
          alt={stableAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={stableAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 300px, (max-width: 1349px) 50vw, 100vw"
          priority
          quality={85}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* Content */}
      <div
        className={`
          absolute inset-x-0 lg:left-[120px] xl:left-[200px] 2xl:left-[270px] lg:right-auto
          space-y-4 md:space-y-6 xl:space-y-10 2xl:space-y-20 z-20 lg:w-[80%] top-[55%]
        `}
      >
        <div className="text-left hero-content-width tracking-[3%] lg:tracking-[0%] font-semibold text-white hero-h1 uppercase">
          {(slide?.title || slide?.titleBN) && (
            <h1>
              <LocalizedString en={slide?.title} bn={slide?.titleBN} />
            </h1>
          )}
        </div>
      </div>
    </>
  )
}
