'use client'

import { Button } from '@/components/ui/button'

const riders = [
  'Accidental Medical Reimbursement (AMR)',
  'Permanent Partial Disability (PPD)',
  'Permanent Total Disability (PTD)',
  'Accidental Death (AD)',
]

export function BenefitsTabSection() {
  return (
    <div>
      <div className="w-full flex flex-col lg:flex-row md:items-start gap-8 mt-8">
        {/* Right Image - top on mobile/tablet, right on desktop */}
        <div className="w-full h-fit order-1 lg:order-2">
          <img
            src="/assets/benefitsBanner.png"
            alt="Insurance Protection"
            className="rounded-2xl w-full lg:h-[500px] 2xl:h-[600px] object-cover"
          />
        </div>

        {/* Left Content */}
        <div className="order-2 lg:order-1">
          <h2 className="global-h3 font-medium mb-2 lg:mb-10 text-[#434343]">
            BOOST YOUR COVERAGE
            <br />
            <span className="font-light">
              WITH THESE <span className="text-[#ED7125]">SUPERCHARGED RIDERS!</span>
            </span>
          </h2>
          <div className="space-y-4 lg:space-y-8 mt-6 text-[#434343]">
            <p className="global-p1 font-normal">
              <span className="font-semibold">Shanta Critical Protection:</span> Safeguard yourself
              against life’s serious health challenges with coverage for up to 25 critical
              illnesses. On diagnosis, receive a lump sum payout—so you can focus on recovery, not
              financial strain.
            </p>
            <p className="global-p1 font-normal">
              <span className="font-semibold ">Shanta Accidental Coverage:</span> Strengthen your
              policy with added protection against unforeseen accidents. This rider offers financial
              support across:
            </p>
            <ul className="flex flex-col gap-4 justify-center text-center px-8 lg:px-16 xl:px-36">
              {riders.map((rider, idx) => (
                <li key={rider} className="flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 xl:h-8  rounded bg-[#ED7125] text-white font-light flex items-center justify-center text-[12px] md:text-base mr-2">
                    {idx + 1}.
                  </span>
                  <span className="text-[12px] md:global-p2">{rider}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex justify-center items-center gap-4 mt-10 md:mt-10 lg:mt-20">
        <Button
          variant="primary"
          className="
            cursor-not-allowed
            px-4 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[6px] 
            
            global-p1 font-normal"
        >
          Download Brochure
        </Button>
        <Button
          variant="outline"
          className="
            cursor-not-allowed
            px-4 md:px-6 2xl:px-10
            text-[#9C8639]
            border-[#9C8639]
            border-2
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[6px] 
            global-p1 font-normal"
        >
          Calculate Premium
        </Button>
      </div>
    </div>
  )
}
