'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { AboutUsIntroBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React, { useMemo, useRef, useState } from 'react'
import AboutIntroPlayButton from './AboutIntroPlayButton'

type Props = {
  block: AboutUsIntroBlockType
}

function getYouTubeEmbedUrl(url?: string | null) {
  const cleanUrl = url?.trim()

  if (!cleanUrl) return ''

  try {
    const parsedUrl = new URL(cleanUrl)

    if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname.startsWith('/embed/')) {
      return cleanUrl
    }

    if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.searchParams.get('v')) {
      const videoId = parsedUrl.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    }

    if (parsedUrl.hostname.includes('youtu.be')) {
      const videoId = parsedUrl.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    }

    if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname.startsWith('/shorts/')) {
      const videoId = parsedUrl.pathname.replace('/shorts/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : ''
    }

    return cleanUrl
  } catch {
    return cleanUrl
  }
}

function withAutoplay(url: string) {
  if (!url) return ''

  const separator = url.includes('?') ? '&' : '?'

  return `${url}${separator}autoplay=1&rel=0&modestbranding=1`
}

function AboutImgVidSection({ block }: Props) {
  const [open, setOpen] = useState(false)

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const maskRef = useRef<HTMLDivElement | null>(null)
  const modalMediaRef = useRef<HTMLDivElement | null>(null)

  const thumbnailImage =
    typeof block?.companyInfo?.thumbnailImage === 'object' ? block.companyInfo.thumbnailImage : null

  const embedUrl = useMemo(() => {
    return getYouTubeEmbedUrl(block?.companyInfo?.youtubeEmbedLink)
  }, [block?.companyInfo?.youtubeEmbedLink])

  const hasVideo = !!embedUrl

  useGSAP(
    () => {
      const section = sectionRef.current
      const mask = maskRef.current

      if (!section || !mask) return

      gsap.registerPlugin(ScrollTrigger)

      const maxInset = 12
      const rounded = 12

      gsap.set(mask, {
        clipPath: `inset(0% ${maxInset}% 0% ${maxInset}% round ${rounded}px)`,
        willChange: 'clip-path',
      })

      const setClip = gsap.quickSetter(mask, 'clipPath')

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.15,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          /**
           * progress:
           * 0   = entering screen, narrow
           * 0.5 = middle of screen, full width
           * 1   = leaving screen, narrow
           *
           * sin(progress * PI) gives same smooth animation for entering and leaving.
           */
          const visibleStrength = Math.sin(self.progress * Math.PI)
          const easedStrength = gsap.parseEase('power2.inOut')(visibleStrength)
          const inset = maxInset * (1 - easedStrength)

          setClip(`inset(0% ${inset}% 0% ${inset}% round ${rounded}px)`)
        },
      })

      return () => {
        trigger.kill()
      }
    },
    {
      scope: sectionRef,
      dependencies: [thumbnailImage?.url],
    },
  )

  useGSAP(
    () => {
      if (!open || !modalMediaRef.current) return

      gsap.fromTo(
        modalMediaRef.current,
        {
          autoAlpha: 0,
          y: 20,
          scale: 0.96,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
        },
      )
    },
    {
      scope: sectionRef,
      dependencies: [open],
    },
  )

  if (!thumbnailImage?.url) return null

  return (
    <div
      ref={sectionRef}
      className="
        relative
        mt-[28px]
        lg:mt-[56px]
        xl:mt-[68px]
        2xl:mt-[78px]
      "
    >
      <div
        ref={maskRef}
        className="
          relative mx-auto aspect-[1200/425] w-full overflow-hidden
          rounded-[10px]
          lg:rounded-[12px]
          xl:rounded-[14px]
          2xl:rounded-[18px]
        "
      >
        <Image
          src={thumbnailImage.url}
          alt="About us intro thumbnail"
          fill
          className="
            object-cover object-center
          "
          sizes="100vw"
          quality={100}
          priority
          placeholder={block?.companyInfo?.thumbnailImageBlurDataURL ? 'blur' : 'empty'}
          blurDataURL={block?.companyInfo?.thumbnailImageBlurDataURL || undefined}
        />

        {hasVideo && (
          <>
            <div
              className="
                pointer-events-none absolute inset-0 z-10
                bg-secondary-1/10
                transition-colors duration-300
              "
            />

            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <AboutIntroPlayButton onClick={() => setOpen(true)} />
            </div>
          </>
        )}
      </div>

      {hasVideo && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className="
              max-w-[94vw] border-0 bg-transparent p-0 shadow-none
              sm:max-w-[90vw]
              lg:max-w-[980px]
              xl:max-w-[1120px]
            "
          >
            <DialogTitle className="sr-only">About us video</DialogTitle>

            <div
              ref={modalMediaRef}
              className="
                relative aspect-video w-full overflow-hidden
                rounded-[12px]
                bg-secondary-1
                shadow-[0_24px_80px_rgba(10,17,40,0.35)]
                lg:rounded-[16px]
              "
            >
              {open && (
                <iframe
                  src={withAutoplay(embedUrl)}
                  title="About us video"
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default AboutImgVidSection
