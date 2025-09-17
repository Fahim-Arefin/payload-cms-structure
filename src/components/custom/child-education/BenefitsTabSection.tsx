'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { LuArrowUpRight } from 'react-icons/lu'

const riders = [
  'Accidental Medical Reimbursement (AMR)',
  'Permanent Partial Disability (PPD)',
  'Permanent Total Disability (PTD)',
  'Accidental Death (AD)',
]

export function BenefitsTabSection() {
  return (
    <div className="p-2 lg:p-3 xl:p-4">
      {/* <div className="w-full flex flex-col lg:flex-row md:items-start gap-8 mt-[15px] md:mt-0 "> */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-8 mt-[15px] md:mt-0 ">
        {/* Right Image - top on mobile/tablet, right on desktop */}
        <div className="w-full h-auto order-1 lg:order-2 col-span-1 lg:col-span-2 xl:col-span-1">
          {/* mobile */}
          <div className="relative lg:hidden rounded-md w-full aspect-[300/200] ">
            <Image
              fill
              src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/child-education/mobile/benefitBannerTab.jpg`}
              alt="Benifit Section Image"
              className="object-cover object-center rounded-md"
              sizes="100vw"
            />
          </div>
          {/* web */}
          <div className="relative hidden lg:block w-full h-full rounded-md lg:rounded-lg xl:rounded-xl">
            <Image
              fill
              src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/child-education/web/benefitBannerTab.jpg`}
              alt="Benifit Section Image"
              className="object-cover lg:object-[83%] xl:object-[88%] rounded-md lg:rounded-lg xl:rounded-xl"
              sizes="50vw"
            />
          </div>
        </div>

        {/* Left Content */}
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 xl:col-span-2">
          <h2 className="global-h1 font-semibold uppercase mb-2 lg:mb-10 text-[#434343]">
            BOOST YOUR COVERAGE WITH
            <br />
            <span className="font-semibold">
              THESE <span className="text-[#ED7125]">SUPERCHARGED RIDERS!</span>
            </span>
          </h2>
          <div className="space-y-4 lg:space-y-8 mt-6 text-[#434343] ">
            <p className="global-p2 font-light">
              <span className="font-semibold">Shanta Spouse Shield: </span>A smart, practical, and
              future-focused protection plan designed to secure your family’s financial well-being.
            </p>
            <p className="global-p2 font-light">
              <span className="font-semibold ">Shanta Premium of Waiver:</span> When life takes an
              unexpected turn, your family stays protected. In case of death or disability, all
              premiums are waived but coverage remains intact.
            </p>
            <p className="global-p2 font-light">
              <span className="font-semibold ">Shanta Critical Protection:</span> Safeguard yourself
              against life’s serious health challenges with coverage for up to 25 critical
              illnesses. On diagnosis, receive a lump sum payout—so you can focus on recovery, not
              financial strain.
            </p>
            <p className="global-p2 font-light">
              <span className="font-semibold ">Shanta Accidental Coverage:</span> Strengthen your
              policy with added protection against unforeseen accidents. This rider offers financial
              support across:
            </p>
            <ul className="flex flex-col gap-2 md:gap-4 justify-center px-4 md:px-8 lg:px-16 xl:px-24">
              {riders.map((rider, idx) => (
                <li key={rider} className="flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 xl:h-8  rounded bg-[#ED7125] text-white font-light flex items-center justify-center text-[12px] md:text-base mr-2">
                    {idx + 1}
                  </span>
                  <span className="global-p2">{rider}</span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 md:gap-4 justify-center text-center px-4 md:px-8 lg:px-16 xl:px-24">
              <li className="flex items-center gap-1 lg:gap-2">
                <Link href="/plans/individual/health-and-protection">
                  <Button
                    variant="link"
                    className="px-0 text-[#ED7125] flex justify-start items-center gap-1 lg:gap-2 hover:underline hover:underline-offset-8 global-p2 font-normal"
                  >
                    See Rider Benefits
                    <LuArrowUpRight className="global-h4" />
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
