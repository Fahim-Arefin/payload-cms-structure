import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'

import HeroSection from '@/components/custom/shared/hero/HeroSection'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'

function PlanPage() {
  const heroSlides = [
    {
      title: 'Health & Protection',
      titleBN: 'স্বাস্থ্য ও সুরক্ষা (সহযোগী বীমা)',
      subtitle: '',
      description:
        'Preventive care meets powerful protection. Let us be your financial shield you can count on.',
      descriptionBN: `আর্থিক সুরক্ষার নির্ভরতা নিয়ে আমরা আছি আপনার পাশে`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/health-and-protection-banner.jpg`,
      titleTop: '60%',
    },
  ]

  const indivisualPlantData = [
    {
      title: 'Shanta',
      biggerTitle: 'Accidental Coverage',
      titleBN: 'শান্তা',
      biggerTitleBN: 'অ্যাক্সিডেন্টাল কাভারেজ',
      description: 'Life’s detours aren’t always in your control — but recovery can be.',
      descriptionBN: 'অনিশ্চিত জীবনের পথে নিয়ন্ত্রণ হোক আপনার হাতে',
      link: '/plans/individual/health-and-protection/accidental-coverage',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/web/accidental-coverage.jpg`,
      // mobileImage:
      //   '/assets/solutions/individual/health-and-protection/mobile/accidental-coverage.jpg',
    },
    {
      title: 'Shanta',
      titleBN: 'শান্তা',
      biggerTitle: 'Critical Protection',
      biggerTitleBN: 'ক্রিটিক্যাল প্রটেকশন',
      description: 'Coverage to help you heal- financially and fearlessly.',
      descriptionBN: `সুস্থতার সুরক্ষা- জীবনের আর্থিক নির্ভরতা গড়ে তুলুন আশ্বাসের সাথে `,
      link: '/plans/individual/health-and-protection/critical-illness-coverage',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/health-and-protection/web/critical-protection.jpg`,
      // mobileImage:
      //   '/assets/solutions/individual/health-and-protection/mobile/critical-protection.jpg',
    },
  ]

  return (
    <div className="font-avenir bg-white ">
      <HeroSection heroSlides={heroSlides} top=" top-[250px] md:top-[300px] lg:top-[63%] " />
      <AllPlanSection plantData={indivisualPlantData} blur>
        <div className="uppercase global-h2 font-medium">
          <LocalizedHighlighted
            textEn={`A healthy outside starts from the inside`}
            textBn={`আজকের প্রস্তুতিতে গড়ে তুলুন আগামী সুস্থতার প্ৰতিচ্ছবি`}
            highlightBn={`আগামী সুস্থতার প্ৰতিচ্ছবি`}
            highlightEn={`starts from the inside`}
            highlightClassName="text-[#ED7125]"
          />
        </div>
      </AllPlanSection>
      <ContactUsSection />
    </div>
  )
}

export default PlanPage
