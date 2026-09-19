'use client'

import React, { useEffect, useRef } from 'react'

type Props = {
  src: string

  poster?: string

  mimeType?: string | null
}

function IntroHeroVideo({ src, poster, mimeType }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  /* =======================================================
     SAFARI / AUTOPLAY FALLBACK

     autoPlay + muted + playsInline handles normal autoplay.

     This additionally calls play() once the video can play,
     which helps with browser-specific autoplay timing.

     If autoplay is still blocked by browser/device policy,
     the poster remains visible instead of a blank frame.
  ======================================================= */

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    /*
     * Safari/iOS is strict about the actual muted
     * element property, not only the JSX attribute.
     */
    video.muted = true
    video.defaultMuted = true

    const attemptPlay = () => {
      const result = video.play()

      result?.catch(() => {
        /*
         * Do nothing:
         * native poster remains available as fallback.
         */
      })
    }

    if (video.readyState >= 2) {
      attemptPlay()
    } else {
      video.addEventListener('canplay', attemptPlay, {
        once: true,
      })
    }

    return () => {
      video.removeEventListener('canplay', attemptPlay)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster || undefined}
      controls={false}
      disablePictureInPicture
      aria-hidden="true"
      className="
        absolute
        inset-0

        h-full
        w-full

        object-cover
        object-center
      "
    >
      <source src={src} type={mimeType || 'video/mp4'} />
    </video>
  )
}

export default IntroHeroVideo
