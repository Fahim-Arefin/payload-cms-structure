import React from 'react'

type Props = {}

function AllAboutCard({}: Props) {
  return (
    <div
      className="z-50
    rounded-md lg:rounded-[15px] 
    bg-[rgba(252,242,236,0.8)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]
    h-[150px] md:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[450px]
    w-full lg:w-[260px] xl:w-[380px] 2xl:w-[480px]
    flex justify-center items-center
    "
    >
      <div>
        <div
          className="mx-auto
         w-[40px] md:w-[70px] xl:w-[100px] 
         h-[40px] md:h-[70px] xl:h-[100px]"
        >
          <img src="/assets/allAboutIcon1.png" alt="" className="w-full h-full" />
        </div>
        <div className="text-[20px] md:text-[24px] lg:text-[32px] xl:text-[45px] text-center">
          Trust
        </div>
        <div
          className="text-[10px] md:text-xs xl:text-lg font-light mx-auto text-center
         max-w-[96%] md:max-w-[90%] xl:max-w-[80%] 2xl:max-w-[70%] "
        >
          Trust is our foundation. We earn trust not through words, but through consistent action
          and care.
        </div>
      </div>
    </div>
  )
}

export default AllAboutCard
