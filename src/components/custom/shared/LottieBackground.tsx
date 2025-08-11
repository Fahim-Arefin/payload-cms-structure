import React from 'react'
import LottiePlayer from './LottiePlayer'

interface LottieBackgroundProps {
  src: string
  background?: string
  className?: string
}

function LottieBackground({ src, background = 'white', className = '' }: LottieBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 z-0 flex ${className} `}
      style={{ top: '-200px', height: 'calc(100% + 200px)' }}
    >
      <LottiePlayer
        className="flex-1 "
        style={{ width: '33.33%', height: '100%', objectFit: 'fill' }}
        src={src}
        background={background}
      />
      <LottiePlayer
        className="flex-1 "
        style={{ width: '33.33%', height: '100%', objectFit: 'fill' }}
        src={src}
        background={background}
      />
      <LottiePlayer
        className="flex-1 "
        style={{ width: '33.33%', height: '100%', objectFit: 'fill' }}
        src={src}
        background={background}
      />
    </div>
  )
}

export default LottieBackground
