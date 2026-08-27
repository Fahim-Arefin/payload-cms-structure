'use client'

import ReadMoreBtn from '@/components/custom/sagar-ropes-shared/buttons/ReadMoreBtn'
import Tags from '@/components/custom/sagar-ropes-shared/others/Tags'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { gsap, useGSAP } from '@/lib/gsap'
import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'

import React, { useRef, useState } from 'react'

type Props = {
  data: FounderQuoteBlockType['founderQuote']
}

function FounderQuote({ data }: Props) {
  const [fullDesc, setFullDesc] = useState(false)

  const descWrapperRef = useRef<HTMLDivElement | null>(null)
  const descInnerRef = useRef<HTMLDivElement | null>(null)
  const isExpandedRef = useRef(false)
  const isAnimatingRef = useRef(false)

  const getCollapsedHeight = () => {
    const inner = descInnerRef.current
    if (!inner) return 0

    const clone = inner.cloneNode(true) as HTMLElement

    clone.classList.add('line-clamp-3')

    clone.style.position = 'absolute'
    clone.style.visibility = 'hidden'
    clone.style.pointerEvents = 'none'
    clone.style.left = '-9999px'
    clone.style.top = '0'
    clone.style.width = `${inner.offsetWidth}px`
    clone.style.height = 'auto'
    clone.style.overflow = 'hidden'

    document.body.appendChild(clone)

    const height = clone.offsetHeight

    clone.remove()

    return height
  }

  const setCollapsedHeight = () => {
    const wrapper = descWrapperRef.current
    if (!wrapper) return

    const collapsedHeight = getCollapsedHeight()

    gsap.set(wrapper, {
      height: collapsedHeight,
      overflow: 'hidden',
    })
  }

  useGSAP(() => {
    const frame = requestAnimationFrame(() => {
      if (!isExpandedRef.current) {
        setCollapsedHeight()
      }
    })

    const handleResize = () => {
      if (!isExpandedRef.current) {
        setCollapsedHeight()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleClick = () => {
    const wrapper = descWrapperRef.current
    const inner = descInnerRef.current

    if (!wrapper || !inner || isAnimatingRef.current) return

    isAnimatingRef.current = true

    const currentHeight = wrapper.offsetHeight

    gsap.set(wrapper, {
      height: currentHeight,
      overflow: 'hidden',
    })

    if (!isExpandedRef.current) {
      // Expand
      isExpandedRef.current = true
      setFullDesc(true)

      const fullHeight = inner.scrollHeight

      gsap.to(wrapper, {
        height: fullHeight,
        duration: 0.55,
        ease: 'power3.inOut',
        overwrite: 'auto',
        onComplete: () => {
          gsap.set(wrapper, {
            height: 'auto',
            overflow: 'visible',
          })

          isAnimatingRef.current = false
        },
      })

      return
    }

    // Collapse
    isExpandedRef.current = false
    setFullDesc(false)

    const collapsedHeight = getCollapsedHeight()

    gsap.to(wrapper, {
      height: collapsedHeight,
      duration: 0.45,
      ease: 'power3.inOut',
      overwrite: 'auto',
      onComplete: () => {
        gsap.set(wrapper, {
          height: collapsedHeight,
          overflow: 'hidden',
        })

        isAnimatingRef.current = false
      },
    })
  }

  return (
    <div
      className="
        flex flex-col justify-center items-start
        space-y-1 lg:space-y-3 xl:space-y-4 2xl:space-y-6
      "
    >
      {data?.tag && (
        <div className="mx-auto md:mx-0">
          <Tags tag={data?.tag} />
        </div>
      )}

      <div>
        {data?.heading1 && (
          <div className="font-agency global-h4 text-secondary-1 text-center md:text-start">
            <LocalizedHighlighted
              textBn={data?.heading1}
              textEn={data?.heading1}
              highlightEn={data?.heading1Highlighted}
              highlightBn={data?.heading1Highlighted}
              highlightClassName={`${
                data?.heading1HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
              }`}
            />
          </div>
        )}

        {data?.heading2 && (
          <div className="font-agency global-h4 text-secondary-1 text-center md:text-start">
            <LocalizedHighlighted
              textBn={data?.heading2}
              textEn={data?.heading2}
              highlightEn={data?.heading2Highlighted}
              highlightBn={data?.heading2Highlighted}
              highlightClassName={`${
                data?.heading2HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
              }`}
            />
          </div>
        )}
      </div>

      <div ref={descWrapperRef} className="overflow-hidden">
        <div ref={descInnerRef} className="font-grift text-justify global-p4 text-secondary-2">
          <LocalizedRichText en={data?.quote} bn={data?.quote} />
        </div>
      </div>

      <div className="mx-auto md:mx-0">
        <ReadMoreBtn
          onClick={handleClick}
          text={fullDesc ? 'Read Less' : 'Read More'}
          active={fullDesc}
        />
      </div>
    </div>
  )
}

export default FounderQuote
