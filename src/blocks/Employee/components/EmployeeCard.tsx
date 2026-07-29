import { EmployeeBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Frame from 'public/assets/images/Imgframe.png'
import Image from 'next/image'

type Props = {
  employee: EmployeeBlockType['employeeGroup']['employees'][number]
}

function EmployeeCard({ employee }: Props) {
  return (
    <div className="">
      {/* image frame */}
      <div className="relative aspect-[1/1] w-full ">
        <Image
          src={Frame}
          alt="hero bg image"
          fill
          className="z-0 object-cover object-center"
          sizes="100vw"
          priority
          quality={100}
          placeholder="blur"
          blurDataURL={Frame?.blurDataURL}
        />
        {/* employee image */}
        <div className="absolute inset-0 aspect-[1/1] scale-[56%] w-full ">
          {typeof employee.employeeImage === 'object' && employee.employeeImage?.url && (
            <Image
              src={employee.employeeImage.url}
              alt="hero image background"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
              quality={100}
              placeholder={employee?.employeeImageBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={employee?.employeeImageBlurDataURL || undefined}
            />
          )}
        </div>
      </div>
      <div className=" text-center -mt-[15%]">
        <div className="global-h7 text-secondary-1 font-agency leading-[33.75px]">
          {employee.employeeName}
        </div>
        <div className="global-p4 text-secondary-1 font-grift leading-[30px]">
          {employee.designation}
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
