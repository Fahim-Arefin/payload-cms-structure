import Link from 'next/link'
import React from 'react'
import GlobalButton from './GlobalButton'
import ToolTip from './ToolTip'
import { ArrowUpRight } from 'lucide-react'
import PremiumCalculatorModal from './PremiumCalculatorModal'
import LocalizedString from './LocalizedString'
import LocalizedText from './LocalizedText'

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
    <div className="mt-[15px] md:mt-[30px] lg:mt-[50px] xl:mt-[80px] w-fit mx-auto">
      <div className="flex flex-row gap-2  ">
        {brochureLink && (
          <Link href={brochureLink} target="_blank" prefetch={false}>
            <GlobalButton text="Download Brochure" variant="primary">
              <LocalizedString bn={`ডাউনলোড ব্রোশিওর`} en={`Download Brochure`} />
            </GlobalButton>
          </Link>
        )}
        {calculateLink &&
          showCalculatePremium &&
          (calculateLink === '#' ? (
            <PremiumCalculatorModal>
              <GlobalButton
                className="cursor-pointer text-[#9C8639] border-[#9C8639] hover:text-[#d65a1a] hover:border-[#d65a1a] transition-colors"
                text={calculateLinkBtn ? calculateLinkBtn : 'Calculate Premium'}
                variant="outline"
              >
                <LocalizedString
                  bn={`প্রিমিয়াম ক্যালকুলেট`}
                  en={calculateLinkBtn ? calculateLinkBtn : 'Calculate Premium'}
                />
              </GlobalButton>
            </PremiumCalculatorModal>
          ) : (
            <Link href={calculateLink}>
              <GlobalButton
                text={calculateLinkBtn ? calculateLinkBtn : 'Calculate Premium'}
                variant="outline"
              >
                <LocalizedString
                  bn={`প্রিমিয়াম ক্যালকুলেট`}
                  en={calculateLinkBtn ? calculateLinkBtn : 'Calculate Premium'}
                />
              </GlobalButton>
            </Link>
          ))}
      </div>
      {explorePlansLink && (
        <div className="flex justify-center mt-2">
          <Link
            href={explorePlansLink}
            className="capitalize text-[#ED7125] underline hover:text-[#d65a1a] transition-colors flex items-center gap-1 
                    text-[14px] md:text-[14px] lg:text-[16px] xl:text-[16px] font-normal"
          >
            <LocalizedText en="explore all plans" bn="সকল প্ল্যান ঘুরে দেখুন" />
            <ArrowUpRight size={14} className="inline-block" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default GlobalTabButtons
