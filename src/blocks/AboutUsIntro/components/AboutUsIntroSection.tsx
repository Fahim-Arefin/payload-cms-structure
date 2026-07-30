import { AboutUsIntroBlockType } from '@/types/payloadCustomTypes'
import AboutInfoSection from './AboutInfoSection'
import AboutImgVidSection from './AboutImgVidSection'

type Props = { block: AboutUsIntroBlockType }

function AboutUsIntroSection({ block }: Props) {
  return (
    <div className="container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
      <AboutInfoSection block={block} />
      <AboutImgVidSection block={block} />
    </div>
  )
}

export default AboutUsIntroSection
