'use client'

import { TabDataType } from '@/types'
import { FaUser } from 'react-icons/fa'
import { MdDiscount } from 'react-icons/md'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: TabDataType
  bgColor?: string
}

function MapSection({ data, bgColor }: Props) {
  // 🗺️ Logic for map
  const isIframe = data?.content[0]?.office_location.trim().startsWith('<iframe')
  const isShortLink = data?.content[0]?.office_location.trim().startsWith('https://maps.app.goo.gl')

  const discountDetails = (data?.content?.[0]?.discount_details ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  const mapSrc = isShortLink
    ? `https://www.google.com/maps?q=${encodeURIComponent(data?.content[0]?.office_location)}&output=embed`
    : `https://www.google.com/maps/embed/v1/place?key=AIzaSyDC9UyRrFn8cIqD5cAtLYg3aVSNREWuaQQ&q=${encodeURIComponent(
        data?.content[0]?.office_location,
      )}`

  return (
    <div
      className={` ${bgColor ? bgColor : 'bg-white lg:bg-[#FFF8F2]'}  w-full 
    pb-6 md:pb-12 lg:pb-16`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
        {/* Left Column - Contact Info */}
        <div
          className="
            pl-5
             md:pl-24 md:pt-4
             lg:pl-[130px]  lg:pt-12
             xl:pl-[200px]   
             2xl:pl-[300px] 
             space-y-1 lg:space-y-4
             "
        >
          <h2 className="text-[#ED7125] text-[14px] md:text-[20px] lg:text-[22px] xl:text-[24px] font-semibold">
            <LocalizedText
              en={data?.content[0]?.office_location_Label || 'Shanta Life Insurance PLC'}
              bn={
                data?.content[0]?.office_location_LabelBN || data?.content[0]?.office_location_Label
              }
            />
          </h2>
          <p className="text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#6E6E6E]">
            <LocalizedText
              en={data?.content[0]?.office_address}
              bn={data?.content[0]?.office_addressBN}
            />
          </p>
          {data?.content[0]?.office_name && (
            <div className="flex items-center space-x-1 lg:space-x-2 text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#434343]">
              <FaUser className="w-4 h-4" />
              <p className="text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#6E6E6E] font-bold">
                {data?.content[0]?.office_name}
              </p>
            </div>
          )}

          <div className="flex items-center space-x-1 lg:space-x-2 text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#434343]">
            <div className="w-4 h-4 flex items-center justify-center">
              <img
                className="lg:hidden w-4 h-4"
                src="/assets/supportpage/mobile/phone.png"
                alt=""
              />
              <img
                className="hidden lg:block w-4 h-4"
                src="/assets/supportpage/web/phone.png"
                alt=""
              />
            </div>
            <p>
              <LocalizedText
                en={data?.content[0]?.office_phone}
                bn={data?.content[0]?.office_phoneBN}
              />
            </p>
          </div>
          <div className="flex items-center space-x-1 lg:space-x-2 text-[12px] xl:text-[13px] 2xl:text-[15px] text-[#434343]">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-[#434343]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <p>{data?.content[0]?.office_email}</p>
          </div>

          <div className="hidden lg:block pt-6">
            <hr className="border-[#6E6E6E]" />
          </div>
          {/* ⬇️ Discount details: one icon, label on right, items below */}
          {discountDetails.length > 0 && (
            <div className="">
              <div className="flex items-start gap-2">
                <MdDiscount className="w-4 h-4 mt-[2px] md:mt-[4px] shrink-0" aria-hidden="true" />

                <div className="text-[#434343]">
                  <div className="font-semibold text-[12px] xl:text-[14px] 2xl:text-[17px]">
                    Discount Details
                  </div>

                  <div className="mt-1 space-y-1 md:space-y-2 text-[12px] xl:text-[13px] 2xl:text-[16px]">
                    {discountDetails.map((line, i) => {
                      const parts = line.split(/(\d+%)/g) // split into text and percentage parts
                      return (
                        <div key={`discount-${i}`}>
                          {parts.map((part, j) =>
                            /\d+%/.test(part) ? (
                              <span key={j} className="font-bold">
                                {part}
                              </span>
                            ) : (
                              <span key={j}>{part}</span>
                            ),
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <p className="text-[12px] xl:text-[13px] 2xl:text-[15px] ">
              {data?.content[0]?.cashless_status && (
                <>
                  <span className="font-bold">Cashless Status: </span>
                  <span className='text-[#6E6E6E]'>{data?.content[0]?.cashless_status}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Column - Dynamic Map */}
        <div
          className=" pl-5 md:pl-24 lg:pl-0
          pr-5 md:pr-24 lg:pr-[130px] xl:pr-[200px] 2xl:pr-[300px]
          lg:pt-12
        "
        >
          <div className="h-[200px] md:h-[300px] lg:h-[350px] xl:h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
            {isIframe ? (
              <div
                className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-lg overflow-hidden"
                dangerouslySetInnerHTML={{ __html: data?.content[0]?.office_location }}
              />
            ) : (
              <iframe
                title="Office Location"
                className="w-full h-full border-0 rounded-lg"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapSection
