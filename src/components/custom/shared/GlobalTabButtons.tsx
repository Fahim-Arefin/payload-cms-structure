import Link from 'next/link'
import React from 'react'
import GlobalButton from './GlobalButton'
import ToolTip from './ToolTip'
import { ArrowUpRight } from 'lucide-react'
import PremiumCalculatorModal from './PremiumCalculatorModal'

type Props = {
  brochureLink?: string
  calculateLinkBtn?: string
  calculateLink?: string
  explorePlansLink?: string
  showCalculatePremium?: boolean
}

function GlobalTabButtons({
  brochureLink,
  calculateLink,
  explorePlansLink,
  calculateLinkBtn,
  showCalculatePremium = true,
}: Props) {
  return (
    <div className="mt-[30px] lg:mt-[50px] xl:mt-[80px] w-fit mx-auto">
      <div className="flex flex-row gap-2  ">
        {brochureLink && (
          <Link href={brochureLink} target="_blank">
            <GlobalButton text="Download Brochure" variant="primary" />
          </Link>
        )}
        {calculateLink && showCalculatePremium && (
          calculateLink === "#" ? (
            <PremiumCalculatorModal>
              <GlobalButton
                className="cursor-pointer text-[#9C8639] border-[#9C8639] hover:text-[#d65a1a] hover:border-[#d65a1a] transition-colors"
                text={calculateLinkBtn ? calculateLinkBtn : 'Calculate Premium'}
                variant="outline"
              />
            </PremiumCalculatorModal>
          ) : (
            <Link href={calculateLink}>
              <GlobalButton
                text={calculateLinkBtn ? calculateLinkBtn : 'Calculate Premium'}
                variant="outline"
              />
            </Link>
          )
        )}
      </div>
      {explorePlansLink && (
        <div className="flex justify-center mt-2">
          <Link
            href={explorePlansLink}
            className="capitalize text-[#ED7125] underline hover:text-[#d65a1a] transition-colors font-medium flex items-center gap-1 
                    text-[14px] md:text-[14px] lg:text-[16px] xl:text-[16px]"
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
