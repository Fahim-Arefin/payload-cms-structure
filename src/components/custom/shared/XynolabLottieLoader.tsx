import React from 'react'

const LOADER_VIDEO_SRC = '/assets/videos/xynolabLoader.webm'

function XynolabLottieLoader() {
  return (
    <div
      className="
        flex items-center justify-center
        h-[190px] w-[190px]
        md:h-[230px] md:w-[230px]
        lg:h-[270px] lg:w-[270px]
        xl:h-[330px] xl:w-[330px]
        2xl:h-[380px] 2xl:w-[380px]
      "
    >
      <video
        src={LOADER_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="
          h-full w-full
          object-contain
        "
      />
    </div>
  )
}

export default XynolabLottieLoader
