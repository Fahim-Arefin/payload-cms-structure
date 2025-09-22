export type HeroContentType = {
  image: string
  title: string
  titleBN?: string
  subtitleBN?: string
  descriptionBN?: string
  subtitle: string
  description: string
  titleTop?: string
  showCallButton?: boolean
  showPurchaseButton?: boolean
}

export type ShantaIntroContentType = {
  heading: string
  headingBN?: string
  subheading: string
  subheadingBN?: string
  paragraphTitle: string
  paragraphTitleBN?: string
  image: string
  mobileImage?: string
  paragraph: string
  paragraphBN?: string
}
export type VissionMissionContentType = {
  visionDescription: string
  visionDescriptionBN?: string
  missionDescription: string
  missionDescriptionBN?: string
  bgImage: string
  bgMobileImage?: string
}

export type AllAboutCardDataType = {
  image: string
  mobileImage?: string
  hoverImage: string
  hoverMobileImage?: string
  title: string
  titleBN?: string
  description?: { __html: string; __htmlBN?: string }
}

export type LicensedInfoType = {
  licensedImage: string
  licensedMobileImage?: string
  licensedDate: string
  licensedDateBN?: string
  launchedImage: string
  launchedMobileImage?: string
  launchedDate: string
  launchedDateBN?: string
}

export type DirectorCardDataType = {
  image: string
  mobileImage?: string
  name?: string
  nameBN?: string
  designation?: string
  designationBN?: string
  title: string
  titleBN?: string
  subtitle: string
  subtitleBN?: string
  description: string
  descriptionBN?: string
  link: string
}
export type DirectorProfileDataType = {
  id?: number
  image: string
  mobileImage?: string
  name: string
  nameBN?: string
  title: string
  titleBN?: string
}
export type AllOfThemDataType = {
  id: number
  image: string
  mobileImage?: string
  name: string
  nameBN?: string
  title: string
  titleBN?: string
}

export type FootPrintDataType = {
  image: string
  mobileImage?: string
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
  mobileImage?: string
  description: string
}

export type EndowmentDataType = {
  title: string
  subtitle: string
  description: string
  image: string
  mobileImage: string
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
  mobileImage?: string
}

export type InsuranceDataType = {
  content: 'left' | 'right'
  sectionHeading: string
  title: string
  titleBN?: string
  subtitle: string
  subtitleBN?: string
  mainImage: string
  mainMobileImage?: string
  mainVIdeoLink: string
  insuranceCardData: InsuranceCardDataType[]
}

export type OurStoryDataType = {
  title: string
  subtitle: string
  titleBN?: string
  subtitleBN?: string
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
  mobileImage?: string
}

export type SuitabilityCardType = {
  img: string
  title: string
  description: string
}

export type VisionCardType = {
  img: string
  title: string
  titleBN?: string
  points: Array<string>
  pointsBN?: Array<string>
}

export type WayWeAreDataType = {
  image: string
  mobileImage?: string
  title: string
  description: string
}

export type PartnerType = {
  img: string
  title: string
}

export type BankingFacilitiesDataType = {
  title: string
  coloredTitle: string
  bancassuranceProductsImage: string
  bancassuranceProducts: {
    image: string
    description: string
  }[]
}

export type MicroinsuranceDataType = {
  title: string
  coloredTitle: string
  microinsuranceProductsImage: string
  microinsuranceProducts: {
    image: string
    description: string
  }[]
}

export type OfferDataType = Pick<AllPlantDataType, 'description' | 'image'> & {
  bgImage: string
  link?: string
}

export type OfferDataType2 = Pick<AllPlantDataType, 'description' | 'image'> & {
  bgImage: string
  bgMobileImage?: string
  mobileImage?: string
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
  titleBN?: string
  description: string
  descriptionBN?: string
}

export type ProtectionDataType = {
  title: string
  subTitle: string
  smallTitle: string
  bgImage: string
  bgMobileImage: string
  item: {
    image: string
    mobileImage?: string
    description: string
  }[]
}

export type PayPremiumDataType = {
  bgImage: string
  bgMobileImage: string
  item: {
    // image: string
    descriptionContent: string
    descriptionContentBN?: string
  }[]
}

export type Directors = {
  id: number
  title: string
  titleBN?: string
  designation: string
  designationBN?: string
  description: string
  descriptionBN?: string
  image: string
  mobileImage?: string
}

export type Leaders = {
  id: number
  title: string
  titleBN?: string
  designation: string
  designationBN?: string
  description: string
  descriptionBN?: string
  image: string
  mobileImage?: string
}

export type AllNewsAndBlogDataType = {
  id: number
  image: string
  mobileImage?: string
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
  office_name?: string
  discount_details?: string
}

export type TabDataType = {
  content: TabContent[]
}

export type EligibilityCardProps = {
  title: string
  icon: string // icon path
  mobileIcon?: string // icon path
  bgImage?: string // background image path
  entryMin: string
  entryMinLabel: string
  entryMax: string
  entryMaxLabel: string
  policyTerm: string
  policyTermLabel: string
  maturityAge: string
  maturityAgeLabel: string
}

export type PaymentTabDataType = {
  bkash: {
    item: {
      descriptionContent: string
      descriptionBN?: string
    }[]
  }
  rocket: {
    item: {
      descriptionContent: string
      descriptionBN?: string
    }[]
  }
  image: string
  mobileImage: string
}

export type BenefitSliderSectionData = {
  title: string
  coloredTitle: string
  description: string
  item: {
    bgImage: string
    icon: string
    description: string
    rateText?: string
  }[]
}
