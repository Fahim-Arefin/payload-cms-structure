import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import BankingFacilities from '@/components/custom/shared/plans/BankingFacilities'
import BenefitsForCustomer from '@/components/custom/shared/plans/BenefitsForCustomer'
import { InsuranceCoverageTab } from '@/components/custom/shared/plans/InsuranceCoverageTab'

function Bancassurance() {
  const heroSlides = [
    {
      title: 'Bancassurance',
      subtitle: '',
      description:
        'Where banking meets protection, Tailored for individuals, delivered through trust',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner6.jpg`,
    },
  ]
  const planInfoData = {
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/planInfo3.png`,
    // mobileImage: '/assets/solutions/bancassurance/mobile/planInfo3.png',
    description: `At Shanta Life, we partner with leading banks to offer clear, affordable life insurance solutions that safeguard your financial journey. Our customized products address the diverse financial needs and risks of different banking segments, ensuring maximum protection for families during uncertain times while offering substantial financial benefits at maturity.`,
  }

  const bankingFacilitiesData = {
    title: 'Banking Facilities THAT CAN BE',
    coloredTitle: 'Protected under Life Insurance',
    bancassuranceProductsImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BF.jpg`,
    bancassuranceProducts: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon1.png`,
        description: 'Credit Card',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon2.png`,
        description: 'Personal Loan/Home Loan/SME Loan',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon3.png`,
        description: 'Payroll Account',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon4.png`,
        description: 'Savings Account',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/icon5.png`,
        description: 'Monthly Deposit Scheme (DPS)',
      },
    ],
  }

  // tab-config.ts
  const tabItems = [
    {
      value: 'lifeCoverage',
      label: 'Life Coverage',
    },
    {
      value: 'healthCoverage',
      label: 'Health Coverage',
    },
  ]

  const tabContent = {
    title: 'Insurance',
    coloredTitle: 'Coverages',
    lifeCoverage: [
      {
        title: 'Natural Death',
        description:
          'In the event of an insured member’s death, Shanta Life provides financial support to the nominated beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon1.png`,
      },
      {
        title: 'Accidental Death',
        description:
          'In the event of an insured member’s death, Shanta Life provides financial support to the nominated beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon2.png`,
      },
    ],
    healthCoverage: [
      {
        title: 'Total Permanent Disability',
        description:
          'In the event of an insured member’s death, Shanta Life provides financial support to the nominated beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times. ',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon3.png`,
      },
      {
        title: 'In-Patient Health Coverage',
        description:
          'In the event of an insured member’s death, Shanta Life provides financial support to the nominated beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon4.png`,
      },
      {
        title: 'Critical Illness Coverage',
        description:
          'In the event of an insured member’s death, Shanta Life provides financial support to the nominated beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/ICIcon5.png`,
      },
    ],
  }

  const benefitsForCustomerData = {
    title: 'Benefits for ',
    coloredTitle: 'Customers',
    bancassuranceProductsImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCImage.jpg`,
    bancassuranceProducts: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description: 'Simplified access to insurance',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description: 'Customized plans aligned with banking products',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description: 'Exclusive offers or bundled services',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/bancassurance/web/BFCIcon1.png`,
        description:
          'Enhanced trustworthy services that can last the customer’s Long-term Life journey',
      },
    ],
  }

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      {/* <PlanInfoSection data={planInfoData} bgColor="#F6EDDD" /> */}
      <PlanInfoSection data={planInfoData} />
      <BankingFacilities data={bankingFacilitiesData} />
      <InsuranceCoverageTab config={tabItems} data={tabContent} />
      <BenefitsForCustomer data={benefitsForCustomerData} />
    </div>
  )
}

export default Bancassurance
