import { InsuranceCardDataType } from '@/types'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import React from 'react'

type Props = {
  data: InsuranceCardDataType
}

const content = (data: InsuranceCardDataType) => (
  <div>
    <div
      className="relative h-[120px] md:h-[200px] lg:h-[250px] xl:h-[300px] flex-shrink-0 
      rounded-[4.167px] 
      bg-no-repeat bg-cover bg-center 
      bg-[#343A40] overflow-hidden cursor-pointer
    "
      style={{
        backgroundImage: `url(${data.image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#343A40]/50 rounded-[4.167px] z-10"></div>

      {/* Text Content */}
      <div
        className="relative z-20 h-full flex items-end 
      md:px-4 xl:px-6 
      md:pb-10 xl:pb-16"
      >
        <div className="h-fit md:space-y-2 lg:space-y-3 xl:space-y-4">
          {/* <h4 className="text-white text-[12px] lg:text-[15px] font-bold">{data.title}</h4> */}
          <p className="text-[#E5E5E5] text-[10px] lg:text-[12px]">{data.description}</p>
        </div>
      </div>
      <div
        className="absolute bottom-0 right-0 z-20 
       w-[20px] lg:w-[30px] xl:w-[40px] 2xl:w-[50px]  
       h-[20px] lg:h-[30px] xl:h-[40px] 2xl:h-[50px]"
      >
        <img src={data?.videoLink ? '/assets/play3.svg' : '/assets/circle.svg'} alt="" />
      </div>
    </div>
    {data.title && (
      <h4 className="text-[#434343] text-[10px] md:text-[12px] lg:text-[15px] font-bold text-center mt-1 md:mt-5">
        {data.title}
      </h4>
    )}
  </div>
)

function InsuranceCard({ data }: Props) {
  return data?.videoLink ? (
    <Dialog>
      <DialogTrigger asChild>{content(data)}</DialogTrigger>

      <DialogContent
        className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
      >
        <VisuallyHidden>
          <DialogTitle>Insurance Video</DialogTitle>
        </VisuallyHidden>

        <iframe
          width="100%"
          height="100%"
          src={data?.videoLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </DialogContent>
    </Dialog>
  ) : (
    content(data)
  )
}

export default InsuranceCard
