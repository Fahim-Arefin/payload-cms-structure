import React from 'react'
import Image from 'next/image'
import { AllOfThemDataType } from '@/types'

type Props = {
  data: AllOfThemDataType
}

function AllOfThemCard({ data }: Props) {
  return (
    <div
      className="w-full mx-auto flex flex-col items-center
    max-w-[200px] md:max-w-[250px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[300px]"
    >
      {/* Image Container with background gradients */}
      <div className="relative w-full aspect-[254/250] sm:aspect-[254/265] md:aspect-[254/280] lg:aspect-[254/295] xl:aspect-[254/310]">
        {/* Gradient Backgrounds */}
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute inset-0"
            width="100%"
            height="100%"
            viewBox="0 0 204 354"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M0.019043 353.435V0.901367H203.554L0.019043 353.435Z"
              fill="url(#paint0_linear_left)"
              fillOpacity="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_left"
                x1="101.787"
                y1="0.901367"
                x2="101.787"
                y2="353.435"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9C8639" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>

          <svg
            className="absolute inset-0"
            width="100%"
            height="100%"
            viewBox="0 0 205 354"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M204.019 0.874817L204.019 353.408L0.48378 353.408L204.019 0.874817Z"
              fill="url(#paint0_linear_right)"
              fillOpacity="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_right"
                x1="102.251"
                y1="353.408"
                x2="102.251"
                y2="0.874847"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ED7125" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Profile Image */}
        <div className="relative z-10 w-full h-full">
          <Image
            src={data?.image}
            alt={data?.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </div>

      {/* Name & Title */}
      <div className="mt-6 text-center">
        <p className="text-[#434342] font-light lg:font-medium shantaLifeIntroSection-h3">
          {data?.name}
        </p>
        <p className="text-[#9C8639] font-light lg:font-medium shantaLifeIntroSection-h5">
          {data?.title}
        </p>
      </div>
    </div>
  )
}

export default AllOfThemCard
