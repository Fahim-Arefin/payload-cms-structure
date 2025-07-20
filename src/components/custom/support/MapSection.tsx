'use client'

import { TabDataType } from '@/types'

type Props = {
  data: TabDataType
}

function MapSection({ data }: Props) {
  // 🗺️ Logic for map
  const isIframe = data?.content[0]?.office_location.trim().startsWith('<iframe')
  const isShortLink = data?.content[0]?.office_location.trim().startsWith('https://maps.app.goo.gl')

  const mapSrc = isShortLink
    ? `https://www.google.com/maps?q=${encodeURIComponent(data?.content[0]?.office_location)}&output=embed`
    : `https://www.google.com/maps/embed/v1/place?key=AIzaSyDC9UyRrFn8cIqD5cAtLYg3aVSNREWuaQQ&q=${encodeURIComponent(
        data?.content[0]?.office_location,
      )}`

  return (
    <div
      className="bg-white lg:bg-[#FFF8F2] w-full grid grid-cols-1 lg:grid-cols-7 
    gap-4 lg:gap-6 2xl:gap-12
    lg:h-[550px] xl:h-[600px] 2xl:h-[650px] 
    pb-6 md:pb-12 lg:pb-0"
    >
      {/* Left Column - Contact Info */}
      <div
        className="lg:col-span-3 
          pl-5
           md:pl-24 md:pt-4
           lg:pl-[130px]  lg:pt-12
           xl:pl-[200px]   
           2xl:pl-[300px] 
           space-y-1 lg:space-y-4
           "
      >
        <h2 className="text-[#ED7125] text-[14px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-semibold">
          Shanta Life Insurance PLC
        </h2>
        <p className="text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#6E6E6E]">
          {data?.content[0]?.office_address}
        </p>

        <div className="flex items-center space-x-2 text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#434343]">
          <img src="/assets/phone.png" alt="" />
          <p>{data?.content[0]?.office_phone}</p>
        </div>
        <div className="flex items-center space-x-2 text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#434343]">
          <img src="/assets/phone.png" alt="" />
          <p>{data?.content[0]?.office_email}</p>
        </div>

        <div className="hidden lg:block pt-6">
          <hr className="border-[#6E6E6E]" />
        </div>
      </div>

      {/* Right Column - Dynamic Map */}
      <div className="lg:col-span-4 h-[200px] md:h-[350px] lg:h-full w-[90%] md:w-[74%] mx-auto lg:w-full">
        {isIframe ? (
          <div
            className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full overflow-hidden"
            dangerouslySetInnerHTML={{ __html: data?.content[0]?.office_location }}
          />
        ) : (
          <iframe
            title="Office Location"
            className="w-full h-full border-0 "
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
          />
        )}
      </div>
    </div>
  )
}

export default MapSection
