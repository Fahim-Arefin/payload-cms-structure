export type HeroContentType = {
  image: string
  title: string
  subtitle: string
  description: string
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
  description: string
}

export type DirectorCardDataType = {
  image: string
  title: string
  subtitle: string
  description: string
  link: string
}
export type DirectorProfileDataType = {
  image: string
  name: string
  title: string
}
export type AllOfThemDataType = {
  image: string
  name: string
  title: string
}

export type FootPrintDataType = {
  image: string
  title: string
  description: string
}

export type AllPlantDataType = {
  title: string
  description: string
  link: string
  image: string
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

export type InsuranceCardDataType = Pick<AllPlantDataType, 'title' | 'description' | 'image'>

export type InsuranceDataType = {
  content: 'left' | 'right'
  sectionHeading: string
  title: string
  subtitle: string
  mainImage: string
  insuranceCardData: InsuranceCardDataType[]
}
export type OnboardingRoleType = {
  image: string
  title: string
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


export type PlanData = {
  image: string
  timeline: string
}

