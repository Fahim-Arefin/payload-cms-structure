export type HeroContentType = {
  image: string
  title: string
  subtitle: string
  description: string
  titleTop?: string
  showCallButton?: boolean
  showPurchaseButton?: boolean
}

export type ShantaIntroContentType = {
  heading: string
  subheading: string
  paragraphTitle: string
  image: string
  paragraph: string
}
export type VissionMissionContentType = {
  visionDescription: string
  missionDescription: string
}

export type AllAboutCardDataType = {
  image: string
  title: string
  hoverImage: string
  description: { __html: string }
}

export type DirectorCardDataType = {
  image: string
  name?: string
  designation?: string
  title: string
  subtitle: string
  description: string
  link: string
}
export type DirectorProfileDataType = {
  id?: number
  image: string
  name: string
  title: string
}
export type AllOfThemDataType = {
  id: number
  image: string
  name: string
  title: string
}

export type FootPrintDataType = {
  image: string
  title: string
  description: string
  link: string
}

export type AllPlantDataType = {
  title: string
  biggerTitle?: string
  description: string
  link: string
  image: string
  mobileImage?: string
  videoLink?: string
}

export type PurchaseCardDataType = {
  title: string
  biggerTitle?: string
  description: string
  link?: string
  image: string
  videoLink?: string
}

export type PlanInfoDataType = {
  image: string
  description: string
}

export type EndowmentDataType = {
  title: string
  subtitle: string
  description: string
  image: string
  link: string
  feature: {
    name: string
    image: string
  }[]
}

export type InsuranceCardDataType = Pick<
  AllPlantDataType,
  'title' | 'description' | 'image' | 'videoLink'
> & {
  mobileImage: string
}

export type InsuranceDataType = {
  content: 'left' | 'right'
  sectionHeading: string
  title: string
  subtitle: string
  mainImage: string
  mainMobileImage: string
  mainVIdeoLink: string
  insuranceCardData: InsuranceCardDataType[]
}

export type OurStoryDataType = {
  title: string
  subtitle: string
  mainImage: string
  mainMobileImage: string
  insuranceCardData: InsuranceCardDataType[]
}

export type CareerResourceDataType = {
  title: string
  image: string
  mobileImage: string
  description: string
  designation: string
}

export type OnboardingRoleType = {
  image: string
  title: string
  mobileImage: string
}

export type SuitabilityCardType = {
  img: string
  title: string
  description: string
}

export type VisionCardType = {
  img: string
  title: string
  points: Array<string>
}

export type PartnerType = {
  img: string
  title: string
}

export type BankingFacilitiesDataType = Pick<AllPlantDataType, 'description' | 'image'>

export type OfferDataType = Pick<AllPlantDataType, 'description' | 'image'> & {
  bgImage: string
}

export type OfferDataType2 = Pick<AllPlantDataType, 'description' | 'image'> & {
  bgImage: string
  title: string
}

export type PlanData = {
  image: string
  timeline: string
}

export type AllNewsDataType = {
  image: string
  title: string
}

export type CareerCard = {
  title: string
  description: string
}

export type ProtectionDataType = {
  title: string
  subTitle: string
  smallTitle: string
  bgImage: string
  item: {
    image: string
    description: string
  }[]
}

export type PayPremiumDataType = {
  bgImage: string
  bgMobileImage: string
  item: {
    // image: string
    descriptionContent: string
  }[]
}

export type Directors = {
  id: number
  title: string
  designation: string
  description: string
  image: string
  mobileImage: string
}

export type Leaders = {
  id: number
  title: string
  designation: string
  description: string
  image: string
}

export type AllNewsAndBlogDataType = {
  id: number
  image: string
  mobileImage: string
  title: string
  description: string
  date: string
  externalLink?: string
}

type TabContent = {
  office_location_Label: string
  office_location: string
  office_address: string
  office_email: string
  office_phone: string
}

export type TabDataType = {
  content: TabContent[]
}
