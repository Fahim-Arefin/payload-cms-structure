import GlobalButton from '@/components/custom/shared/GlobalButton'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import { pageHref } from '@/lib/utils'
import { DetailsContentBlockType } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import React from 'react'

type Props = {
  data: DetailsContentBlockType
}

function DetailsContentBlock({ data }: Props) {
  return (
    <div>
      <div className={`space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12`}>
        <div
          className={`
           flex mx-auto mt-12`}
        >
          {(data?.buttonLink || data?.buttonExternalUrl) && (
            <div className="flex mx-auto">
              <Link
                href={`${data?.buttonLink ? pageHref(data?.buttonLink) : data?.buttonExternalUrl}`}
                target="_blank"
              >
                <GlobalButton
                  variant="secondary"
                  className="w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[150px]
            h-[32px] md:h-[34px] lg:h-[38px] xl:h-[40px] 2xl:h-[42px]"
                  size="medium"
                >
                  <LocalizedString en={data?.buttonText} bn={data?.buttonTextBN} />
                </GlobalButton>
              </Link>
            </div>
          )}
        </div>
        <div className={`flex mx-auto`}>
          <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[55%] text-center mx-auto text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
            <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsContentBlock
