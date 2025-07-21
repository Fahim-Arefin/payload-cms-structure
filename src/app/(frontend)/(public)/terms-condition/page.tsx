import HeroSection from '@/components/custom/shared/hero/HeroSection'
import TermsConditionAccordion from './TermsConditionAccordion'

function TermsCondition() {
  const heroSlides = [
    {
      title: 'Terms & Condition',
      subtitle: '',
      description: '',
      image: '/assets/banner12.jpg',
      // titleTop: '60%'
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[578px] "
        top=" top-[150px] md:top-[200px] lg:top-[63%]"
      />
      {/* <AllPlanSection plantData={[]} blur> */}
      {/* <div>
          Protect what <span className="text-[#ED7125]">brings you joy</span>
        </div> */}
      <div className="sm:px-[10%] px-[35px] sm:mt-[100px] sm:mb-[160px] mt-[20px] mb-[30px]">
        <div className="mx-auto mb-[10px] relative">
          <p className="sm:text-[20px] text-[14px] sm:mb-[100px] mb-[30px]">
            Shanta Life Insurance Limited (“Shanta Life”, “we”, “our”, or “us”) is committed to
            protecting the privacy and personal data of our customers, prospective clients, business
            partners, and website visitors. This Privacy Policy describes how we collect, use,
            store, disclose, and safeguard your information in accordance with applicable data
            protection regulations.
          </p>
        </div>
        <TermsConditionAccordion />
      </div>

      {/* </AllPlanSection> */}
    </div>
  )
}

export default TermsCondition
