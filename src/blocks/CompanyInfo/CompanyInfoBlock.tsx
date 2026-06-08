import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CompanyInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Info from './components/Info'
import Marquee from 'react-fast-marquee'

type Props = {
  block: CompanyInfoBlockType
  params: Record<string, string>
}

function CompanyInfoBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <Marquee autoFill>
        <div className="pr-[12px] xl:pr-[24px] py-[16px] flex items-center justify-center gap-3 xl:gap-6 ">
          {block?.companyInfoItems?.map((info, i) => (
            <div key={i} className="flex items-center justify-center gap-3 xl:gap-6">
              <Info data={info} />
              <div className="h-[1px] w-[40px] lg:w-[60px] xl:w-[100px] bg-[#0A1128]">
                <span className="hidden">s</span>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
    </WithHashScroller>
  )
}

export default CompanyInfoBlock
