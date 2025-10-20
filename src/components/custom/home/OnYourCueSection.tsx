import { FeaturedPlansBlock } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import GlobalButton from '../shared/GlobalButton'
import CueContent from './CueContent'
import CueHeader from './CueHeader'
import LocalizedString from '../shared/LocalizedString'
import { pageHref } from '@/lib/utils'

type Props = {
  data: FeaturedPlansBlock
}

async function OnYourCueSection({ data }: Props) {
  const btnText = (data?.buttonText ?? '').trim()
  const btnTextBN = (data?.buttonTextBN ?? '').trim()
  return (
    <>
      <div className="container-width container-padding-y px-2 lg:px-0">
        <CueHeader data={data} />

        {/* carousal  */}
        <CueContent data={data?.plans} />

        {/* Let’s Find More button */}
        {btnText.length > 0 && btnTextBN.length > 0 && data?.buttonLink && (
          <div className="flex justify-center mt-4 md:mt-6 lg:mt-8 2xl:mt-12 font-avenir">
            <Link href={pageHref(data?.buttonLink)}>
              <GlobalButton variant="primary" className="" text="Lets Find More">
                <LocalizedString en={data.buttonText} bn={data.buttonTextBN} />
              </GlobalButton>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default OnYourCueSection
