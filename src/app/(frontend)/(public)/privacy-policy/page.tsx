import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PrivacyPolicyAccordion from './PrivacyPolicyAccordion'

function PrivacyPolicy() {
  const heroSlides = [
    {
      title: 'Privacy Policy',
      subtitle: '',
      description:'',
      image: '/assets/banner9.jpg',
      titleTop: '60%'
    },
  ]


  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides}/>
      {/* <AllPlanSection plantData={[]} blur> */}
        {/* <div>
          Protect what <span className="text-[#ED7125]">brings you joy</span>
        </div> */}
        <div className="sm:px-[20%] px-[35px] sm:mt-[100px] sm:mb-[160px] mt-[20px] mb-[30px]">
          <div  className='mx-auto mb-[10px] relative'>
            <p className='sm:text-[26px] text-[18px] text-bol sm:mb-[100px] mb-[30px]'>
              Shanta Life Insurance Limited (“Shanta Life”, “we”, “our”, or “us”) is committed to protecting the privacy and personal data of our customers, prospective clients, business partners, and website visitors. This Privacy Policy describes how we collect, use, store, disclose, and safeguard your information in accordance with applicable data protection regulations.
            </p>
          </div>
          <PrivacyPolicyAccordion />
        </div>
        
      {/* </AllPlanSection> */}
    </div>
  )
}

export default PrivacyPolicy
