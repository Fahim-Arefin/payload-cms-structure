'use client'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { Button } from '@/components/ui/button'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import { CustomTabBlockType, LearnMoreBlogContentBlockType } from '@/types/payloadCustomTypes'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

type BlogType = NonNullable<
  NonNullable<LearnMoreBlogContentBlockType['groups']>[number]['blogs']
>[number]

type BlogItemProps = {
  blog: BlogType
  index: number
  bg: string
}

const BlogItem: React.FC<BlogItemProps> = ({ blog, index, bg }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const descRef = useRef<HTMLDivElement | null>(null)
  const lang = useSSRLanguage()

  // When language changes, always collapse and re-evaluate for that language
  useEffect(() => {
    setIsExpanded(false)
  }, [lang])

  // Measure overflow for the CURRENT language, in COLLAPSED state (3-line clamp)
  useEffect(() => {
    const el = descRef.current
    if (!el) return

    const measure = () => {
      if (!el) return
      // We only care about "collapsed" state to decide if button is needed
      if (isExpanded) return

      const hasOverflow = el.scrollHeight > el.clientHeight + 1
      setIsOverflowing(hasOverflow)
    }

    // First measure after render
    const frame = requestAnimationFrame(measure)

    // Also re-measure if content height changes (e.g., lang switch, responsive)
    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        measure()
      })
      ro.observe(el)
    }

    return () => {
      cancelAnimationFrame(frame)
      if (ro) ro.disconnect()
    }
    // Depend on lang + descriptions so EN/BN length differences are handled
  }, [lang, isExpanded, blog?.description, blog?.descriptionBN])

  const handleToggle = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 lg:gap-20 xl:gap-28 2xl:gap-32">
      {/* content */}
      <div
        className={`order-2 md:space-y-1 lg:space-y-2 2xl:space-y-4 flex flex-col justify-center items-center ${
          index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div className="text-[#201F22] global-h3 font-semibold text-center">
          <LocalizedText en={blog?.title} bn={blog?.titleBN} />
        </div>

        <div
          ref={descRef}
          className={`global-p2 font-light text-[#828384] text-justify ${
            !isExpanded ? 'line-clamp-3' : ''
          }`}
        >
          <LocalizedRichText en={blog?.description} bn={blog?.descriptionBN} />
        </div>

        {/* Only show button if current language's collapsed text is longer than 3 lines */}
        {isOverflowing && (
          <div>
            <Button
              asChild
              variant="link"
              className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit mx-auto lg:mx-0 cursor-pointer global-p2 p-0"
              onClick={handleToggle}
            >
              <div className="flex space-x-1 items-center uppercase">
                <LocalizedText
                  en={isExpanded ? blog?.readLessText : blog?.readMoreText}
                  bn={isExpanded ? blog?.readLessTextBN : blog?.readMoreTextBN}
                />
                <ArrowUpRight />
              </div>
            </Button>
          </div>
        )}
      </div>

      {/* image */}
      <div
        className={` h-full flex flex-col justify-center order-1  rounded-xl ${
          index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
        } `}
      >
        <div className="relative w-full aspect-[525/278] ">
          {typeof blog?.image === 'object' && blog?.image?.url && (
            <Image
              fill
              src={blog?.image?.url}
              alt={blog?.title}
              sizes="50vw"
              className="object-cover object-center rounded-xl w-full h-full"
              quality={80}
              placeholder="blur"
              blurDataURL={blog?.imageBlurDataURL || ''}
            />
          )}
          <div
            className="rounded-tr-xl absolute -left-0.5 -bottom-0.5 
        h-8 md:h-10 lg:h-9 xl:h-11 2xl:h-12 
        w-8 md:w-10 lg:w-9 xl:w-11 2xl:w-12"
            style={{
              backgroundColor: bg,
            }}
          >
            <div className="invisible">white layer</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogItem
