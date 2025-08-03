'use client'

import * as React from 'react'

interface LottiePlayerProps {
  src: string // Path or URL to Lottie JSON
  background?: string
  speed?: number
  loop?: boolean
  autoplay?: boolean
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
}

export default function LottiePlayer({
  src,
  background,
  speed = 1,
  loop = true,
  autoplay = true,
  width,
  height,
  className,
  style: customStyle,
}: LottiePlayerProps) {
  const combinedStyle = {
    ...(width || height ? { width, height } : {}),
    ...customStyle,
  }

  return React.createElement('lottie-player', {
    src,
    background,
    speed: String(speed),
    style: Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined,
    loop,
    autoplay,
    className,
  })
}
