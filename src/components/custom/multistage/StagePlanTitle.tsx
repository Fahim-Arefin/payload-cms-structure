import React from 'react'

type Props = {}

const StagePlanTitle = (props: Props) => {
  return (
    <div className="container-padding bg-[#F6EDDD] mt-10">
      <h1 className="global-h1 w-full px-20 lg:px-0 text-center lg:text-start lg:w-[60%] xl:w-[50%] font-semibold text-[#434342] uppercase">
        Pick the Plan That Matches Your{' '}
        <span className="text-[#ED7125] font-semibold">Life Path</span>
      </h1>
    </div>
  )
}

export default StagePlanTitle
