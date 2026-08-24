'use client'

import lottie, { type AnimationItem } from 'lottie-web'
import React, { useEffect, useRef } from 'react'

function XynolabLottieLoader() {
  const loaderRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!loaderRef.current) return

    animationRef.current = lottie.loadAnimation({
      container: loaderRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/videos/xynolabLoader.json',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid meet',
      },
    })

    return () => {
      animationRef.current?.destroy()
      animationRef.current = null
    }
  }, [])

  return (
    <div
      ref={loaderRef}
      className="
        h-[190px] w-[190px]
        md:h-[230px] md:w-[230px]
        lg:h-[270px] lg:w-[270px]
        xl:h-[330px] xl:w-[330px]
        2xl:h-[380px] 2xl:w-[380px]
      "
    />
  )
}

export default XynolabLottieLoader
