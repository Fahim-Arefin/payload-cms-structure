'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import {
  INTRO_DISMISSED_EVENT,
  INTRO_MAX_DURATION,
  INTRO_READY_EVENT,
  INTRO_STORAGE_KEY,
  INTRO_VIDEO_SRC,
  isHomePath,
} from '../introState'

const EXIT_DURATION = 500
const VIDEO_TIMEOUT = 10000

function HomeIntroLoaderClient() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const pathname = usePathname()

  useLayoutEffect(() => {
    const root = document.documentElement
    const video = videoRef.current
    if (!video) return

    if (!isHomePath(pathname)) {
      root.removeAttribute('data-home-intro')
      window.clearTimeout(window.__xynolabIntroTimer)
      window.__xynolabIntroTimer = undefined
      video.pause()
      return
    }

    // Direct visits start in the head script. Also support reaching home for
    // the first time through client navigation from another page in this tab.
    if (!root.hasAttribute('data-home-intro')) {
      let seen = window.__xynolabIntroSeen
      try {
        seen ||= window.sessionStorage.getItem(INTRO_STORAGE_KEY) === '1'
      } catch {}
      if (seen) return
      window.__xynolabIntroSeen = true
      try {
        window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1')
      } catch {}
      root.setAttribute('data-home-intro', 'active')
    }

    let animationDone =
      video.ended || Boolean(video.error) || root.getAttribute('data-home-intro') === 'leaving'
    let disposed = false
    let leaving = false
    let exitTimer: number | undefined

    const dismiss = () => {
      root.removeAttribute('data-home-intro')
      window.dispatchEvent(new Event(INTRO_DISMISSED_EVENT))
      video.pause()
      window.clearTimeout(window.__xynolabIntroTimer)
      window.__xynolabIntroTimer = undefined
    }
    const revealWhenReady = () => {
      if (disposed || leaving || !animationDone || !root.hasAttribute('data-home-intro')) return
      if (!document.querySelector('[data-home-intro-ready="true"]')) return
      leaving = true
      root.setAttribute('data-home-intro', 'leaving')
      exitTimer = window.setTimeout(dismiss, EXIT_DURATION)
    }
    const finishAnimation = () => {
      animationDone = true
      revealWhenReady()
    }

    video.addEventListener('ended', finishAnimation)
    video.addEventListener('error', finishAnimation)
    window.addEventListener(INTRO_READY_EVENT, revealWhenReady)

    // Keep the pre-hydration deadline; create one for client navigation.
    if (!window.__xynolabIntroTimer) {
      window.__xynolabIntroTimer = window.setTimeout(dismiss, INTRO_MAX_DURATION)
    }
    const videoTimer = window.setTimeout(finishAnimation, VIDEO_TIMEOUT)
    if (!video.getAttribute('src')) video.src = INTRO_VIDEO_SRC
    if (!animationDone) void video.play().catch(finishAnimation)
    revealWhenReady()

    return () => {
      disposed = true
      video.removeEventListener('ended', finishAnimation)
      video.removeEventListener('error', finishAnimation)
      window.removeEventListener(INTRO_READY_EVENT, revealWhenReady)
      window.clearTimeout(videoTimer)
      window.clearTimeout(exitTimer)
      // Keep the bootstrap deadline through Strict Mode effect replay.
    }
  }, [pathname])

  return (
    <div
      id="home-intro-overlay"
      data-lenis-prevent
      aria-hidden="true"
      className="fixed inset-0 z-[99999] flex h-dvh items-center justify-center
        overflow-hidden bg-black transition-opacity duration-500 ease-out"
    >
      <div
        className="flex items-center justify-center h-[190px] w-[190px]
          sm:h-[210px] sm:w-[210px] md:h-[230px] md:w-[230px]
          lg:h-[270px] lg:w-[270px] xl:h-[330px] xl:w-[330px]
          2xl:h-[380px] 2xl:w-[380px] 3xl:h-[430px] 3xl:w-[430px]"
      >
        <video
          ref={videoRef}
          id="home-intro-video"
          suppressHydrationWarning
          autoPlay
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          className="block h-full w-full select-none object-contain"
        />
      </div>
    </div>
  )
}

export default HomeIntroLoaderClient
