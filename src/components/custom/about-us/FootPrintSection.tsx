import { ShantaFootprintBlockType } from '@/types/payloadCustomTypes'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import { FootPrintSlider } from './FootPrintSlider'

type Props = {
  footPrintData: ShantaFootprintBlockType
}

function FootPrintSection({ footPrintData }: Props) {
  const {
    title,
    titleBN,
    highlightedText,
    highlightedTextBN,
    subtitle,
    subtitleBN,
    backgroundVideoUrl,
    cards,
  } = footPrintData
  return (
    <div className="relative">
      <div
        className="relative
        h-[230px] md:h-[330px] lg:h-[400px] xl:h-[450px] 2xl:h-[550px] overflow-hidden "
      >
        {/* Background Image */}
        {/* <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-center object-cover overflow-hidden"
        >
          <source src={backgroundVideoUrl} type="video/mp4" />
        </video>

        {/* Mobile to <lg overlay */}
        <div className="absolute inset-0 bg-[rgba(37,69,37,0.8)] lg:hidden z-0" />

        {/* lg and above overlay */}
        <div className="hidden lg:block absolute inset-0 bg-black/50 z-0" />

        {/* Content */}
        <div className="container-padding uppercase text-white relative z-10">
          <div className="text-center lg:text-start">
            <h1 className="global-h1 font-medium lg:font-semibold uppercase">
              <LocalizedHighlighted
                textEn={title}
                textBn={titleBN}
                highlightEn={highlightedText}
                highlightBn={highlightedTextBN}
              />
            </h1>
            {/* <h1 className="lg:hidden global-h1 font-medium lg:font-semibold uppercase">
              Shanta&rsquo;s Living <span className="text-[#ED7125]">Ecosystem</span>
            </h1> */}

            <h3 className="global-h1 md:global-h4 font-light">
              <LocalizedText en={subtitle} bn={subtitleBN} />
            </h3>
          </div>
        </div>
      </div>
      {/* Slider */}
      {/* <div className="-mt-[270px] pb-[100px] z-20 bg-white"> */}
      <div
        //   className="
        // pb-24 lg:pb-[150px]
        // z-20 bg-white
        // -mt-[90px] md:-mt-[100px] lg:-mt-[170px] 2xl:-mt-[270px] "
        // >
        className="
      pb-[150px] md:pb-[200px] lg:pb-[250px] xl:pb-[300px] 2xl:pb-[350px] 
      z-20 bg-white"
      >
        <FootPrintSlider footPrintData={cards} />
      </div>
    </div>
  )
}

export default FootPrintSection
