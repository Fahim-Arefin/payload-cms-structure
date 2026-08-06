import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import { LocationBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LocationIcon from 'public/assets/icons/pinIcon.png'

type Props = { block: LocationBlockType }

function CompanyLocationRightContent({ block }: Props) {
  const locationInfo = block?.locationInfo

  const label = locationInfo?.label
  const location = locationInfo?.location
  const buttonLabel = locationInfo?.googleMapButtonLabel
  const googleMapLink = locationInfo?.googleMapLink

  return (
    <div
      className="
        flex h-full flex-col justify-center
        text-center md:text-start
        md:pl-[10px]
        lg:pl-[0px]
         space-y-[8px] lg:space-y-[12px] xl:space-y-[20px] 2xl:space-y-[28px]
      "
    >
      <div
        className="
          mx-auto md:mx-0
          relative size-[30px]
          md:size-[28px]
          lg:size-[34px]
          xl:size-[45px]
          2xl:size-[60px]
        "
      >
        <Image
          src={LocationIcon}
          alt="Location icon"
          fill
          className="object-contain object-center"
          quality={100}
        />
      </div>

      {label && (
        <h3
          className="
           
            font-agency text-primary-1
            global-h6
          "
        >
          {label}
        </h3>
      )}

      {location && (
        <p
          className="
            mx-auto 
            font-grift font-semibold text-secondary-1
            global-p4 
            md:mx-0
          "
        >
          {location}
        </p>
      )}

      {buttonLabel && googleMapLink && (
        <div className=" flex justify-center md:justify-start">
          <Link
            href={googleMapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button01 type="button">{buttonLabel}</Button01>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CompanyLocationRightContent
