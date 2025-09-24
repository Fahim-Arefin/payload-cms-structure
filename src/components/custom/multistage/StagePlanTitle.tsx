import React from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

type Props = {}

const StagePlanTitle = (props: Props) => {
  return (
    <div className="container-padding bg-[#F6EDDD] mt-10">
      <h1 className="global-h1 lg:px-0 text-start w-[60%] xl:w-[50%] font-semibold text-[#434342] uppercase">
        <LocalizedHighlighted
          textEn="Pick the Plan That Matches Your Life Path"
          textBn="আপনার যাত্রার সঙ্গে মানানসই প্ল্যান নির্বাচন করুন"
          highlightEn="Life Path"
          highlightBn="নির্বাচন করুন"
          highlightClassName="text-[#ED7125] font-medium lg:font-semibold"
        />
      </h1>
    </div>
  )
}

export default StagePlanTitle
