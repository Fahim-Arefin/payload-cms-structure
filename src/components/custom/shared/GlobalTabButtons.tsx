import Link from 'next/link'
import React from 'react'
import GlobalButton from './GlobalButton'
import ToolTip from './ToolTip'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  brochureLink?: string
  calculateLinkBtn?: string
  calculateLink?: string
  explorePlansLink?: string
}

function GlobalTabButtons({
  brochureLink,
  calculateLink,
  explorePlansLink,
  calculateLinkBtn,
}: Props) {
  return (
    <div className="mt-[30px] lg:mt-[50px] xl:mt-[80px] w-fit mx-auto">
      <div className="flex flex-row gap-2  ">
        {brochureLink && (
          <Link href={brochureLink} target="_blank">
            <GlobalButton text="Download Brochure" variant="primary" />
          </Link>
        )}
        {calculateLink && (
          <ToolTip>
            <GlobalButton
              className="cursor-not-allowed  text-[#9C8639] border-[#9C8639] hover:text-[#9C8639]"
              text={calculateLinkBtn}
              variant="outline"
            />
          </ToolTip>
        )}
      </div>
      {explorePlansLink && (
        <div className="flex justify-center mt-2">
          <Link
            href={explorePlansLink}
            className="capitalize text-[#ED7125] underline hover:text-[#d65a1a] transition-colors font-medium flex items-center gap-1 
                    text-[10px] md:text-[12px] lg:text-[14px] xl:text-[14px]"
          >
            explore all plans
            <ArrowUpRight size={14} className="inline-block" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default GlobalTabButtons
