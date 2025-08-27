import React from 'react'

type Props = {
  data: any
}

function InsuraceCoverageTabContent({ data }: Props) {
  return (
    <div
      className="mt-6 md:mt-0 grid grid-cols-1 md:grid-cols-2 
      gap-4 md:gap-10 lg:gap-16 xl:gap-20 2xl:gap-24"
    >
      {data?.map((item: any, i: number) => (
        <div
          key={i}
          className="flex 
         space-x-2 md:space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12"
        >
          <div
            className="
          min-w-[20px] lg:min-w-[30px] xl:min-w-[40px] 2xl:min-w-[50px] 
          h-[20px] lg:h-[30px] xl:h-[40px] 2xl:h-[50px]"
          >
            <img src={item?.image} alt={item?.title} className="w-full h-full" />
          </div>
          <div>
            <div className="global-p1 font-semibold text-[#3A3A3A]">{item?.title}</div>
            <div className="global-p2 text-justify text-[#434342]">{item?.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default InsuraceCoverageTabContent
