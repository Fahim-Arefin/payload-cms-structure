import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'
import { LicensedAndLaunchedBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: LicensedAndLaunchedBlockType
}

async function LiscensedInfo({ data }: Props) {
  const liscensedData = {
    licensedImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/licensed.png`,
    // licensedMobileImage: '/assets/icons/mobile/licensedMobile.png',
    licensedDate: 'November 7, 2023',

    launchedImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/icons/web/rocket.png`,
    // launchedMobileImage: '/assets/icons/mobile/rocketMobile.png',
    launchedDate: ' December 1, 2024',
  }

  return (
    <>
      <div className="bg-[#ED7125]">
        <div
          className="flex justify-evenly md:justify-between items-center mx-auto text-white 
      font-light md:font-medium lg:font-bold
      h-[50px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]  
      w-[98%] md:w-[80%]"
        >
          <div className="flex items-center space-x-1 md:space-x-4">
            <div className="relative w-[24px] lg:w-[64px] h-[24px] lg:h-[64px] ">
              {typeof data?.licensedImage === 'object' && data?.licensedImage?.url && (
                <Image
                  src={data?.licensedImage?.url}
                  alt="Licensed Image"
                  className=""
                  fill
                  sizes="100vw"
                />
              )}
            </div>
            <div className="uppercase text-[9px] md:global-h4">
              <span className="">
                {/* <LocalizedText en="Licensed" bn="লাইসেন্সপ্রাপ্ত" /> :{' '} */}
                <LocalizedText en={data?.licensedLabel} bn={data?.licensedLabelBN} /> :{' '}
              </span>
              <span>
                <LocalizedText en={data?.licensedDate} bn={data?.licensedDateBN} />
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 md:space-x-4">
            <div className="relative w-[24px] h-[24px] lg:w-[64px] lg:h-[64px]">
              {typeof data?.launchedImage === 'object' && data?.launchedImage?.url && (
                <Image
                  src={data?.launchedImage?.url}
                  alt="Launched Image"
                  className=""
                  fill
                  sizes="100vw"
                />
              )}
            </div>
            <div className="uppercase text-[9px] md:global-h4">
              {/* <span className="">Launched : </span>{' '} */}
              <span className="">
                {/* <LocalizedText en="Launched" bn="চালু হয়েছে" /> :{' '} */}
                <LocalizedText en={data?.launchedLabel} bn={data?.launchedLabelBN} /> :{' '}
              </span>
              <span>
                <LocalizedText en={data?.launchedDate} bn={data?.launchedDateBN} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LiscensedInfo
