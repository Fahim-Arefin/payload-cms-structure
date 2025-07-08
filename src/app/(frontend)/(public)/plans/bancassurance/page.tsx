import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import BankingFacilities from '@/components/custom/shared/plans/BankingFacilities'
import React from 'react'

function Bancassurance() {
  const heroSlides = [
    {
      title: 'Shanta Bancassurance',
      subtitle: '',
      description: 'When you go further for your people, they go further for you.',
      image: '/assets/banner6.jpg',
    },
    // {
    //   title: 'Building Better Futures',
    //   subtitle: 'One Step at a Time',
    //   description:
    //     'We walk with you on your journey, providing the tools you need to succeed and grow.',
    //   image: '/assets/banner2.jpg',
    // },
    // {
    //   title: 'Innovative Thinking',
    //   subtitle: 'Impactful Living',
    //   description: "Harness innovation to redefine your future. Together, let's make a difference.",
    //   image: '/assets/banner1.jpg',
    // },
  ]
  const planInfoData = {
    image: '/assets/planInfo3.png',
    description:
      'Behind every savings or loan lies a dream worth protecting. At Shanta Life, we partner with leading banks and NBFIs to offer clear, affordable life insurance solutions that safeguard your financial journey. Our customized coverage options are designed to meet the distinct needs of different banking segments—ensuring protection that truly fits.',
  }

  const bankingFacilitiesData = [
    {
      image: '/assets/banking1.png',
      description: 'Credit Card',
    },
    {
      image: '/assets/banking2.png',
      description: 'Personal Loan/Home Loan/SME Loan',
    },
    {
      image: '/assets/banking3.png',
      description: 'Savings Account',
    },
    {
      image: '/assets/banking4.png',
      description: 'Monthly Deposit Scheme (DPS)',
    },
    {
      image: '/assets/banking1.png',
      description: 'Credit Card',
    },
    {
      image: '/assets/banking2.png',
      description: 'Personal Loan/Home Loan/SME Loan',
    },
    {
      image: '/assets/banking3.png',
      description: 'Savings Account',
    },
    {
      image: '/assets/banking4.png',
      description: 'Monthly Deposit Scheme (DPS)',
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <PlanInfoSection data={planInfoData} />
      <BankingFacilities data={bankingFacilitiesData} />
      <ContactUsSection />
    </div>
  )
}

export default Bancassurance
