'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CareerOpeningForm from './CareerOpeningForm'

import { useEffect, useState } from 'react'
import CareerOpeningCard from './CareerOpeningCard'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import { JoinOurTeamMobile } from './JoinOurTeamMobile'
import Autoplay from 'embla-carousel-autoplay'
import CareerDetailsModal from './CareerDetailsModal'

type CareerOpeningDataProps = {
  openingData: any
}

const positions = [
  'Junior IT Executive',
  'Mid IT Executive',
  'Senior IT Executive',
  'Management Trainee',
  'Relationship Officer (Internship)',
  'Relationship Officer (Full time)',
  'Campus Ambassador (Part-time)',
  'Campus Ambassador (Full time)',
]

const detailsData = {
  'MANAGEMENT TRAINEE': {
    title: 'Management Trainee',
    responsibilities: [
      'Assist in project planning and execution.',
      'Support cross-functional teams.',
      'Learn and adapt to company culture.',
      // ... add more
    ],
    requirements: [
      "Bachelor's degree in relevant field.",
      'Excellent communication skills.',
      // ... add more
    ],
    location: 'Dhaka',
    deadline: '30th August, 2025',
    applyEmail: 'talent@shantalife.com',
    subjectLine: 'Application for Management Trainee',
    footer: 'Join us to craft a brighter future at Shanta Life.',
  },
  'RELATIONSHIP OFFICER': {
    title: 'Relationship Officer',
    responsibilities: [
      'Build and maintain client relationships.',
      'Meet assigned targets.',
      'Provide after-sales service.',
    ],
    requirements: [
      "Bachelor's degree in any discipline.",
      'Strong communication and interpersonal skills.',
    ],
    location: 'Dhaka',
    deadline: '30th August, 2025',
    applyEmail: 'talent@shantalife.com',
    subjectLine: 'Application for Relationship Officer',
    footer: 'Be part of a new era in life insurance.',
  },
  'CAMPUS AMBASSADOR': {
    title: 'Campus Ambassador',
    responsibilities: [
      'Promote company events on campus.',
      'Engage with students and create awareness.',
      'Organize campus activities.',
    ],
    requirements: ['Currently enrolled in a university.', 'Excellent networking skills.'],
    location: 'Dhaka',
    deadline: '30th August, 2025',
    applyEmail: 'talent@shantalife.com',
    subjectLine: 'Application for Campus Ambassador',
    footer: 'Grow your leadership and communication skills with Shanta Life.',
  },
  // Example for a detailed IT Project Manager as from your PDF:
  'IT PROJECT MANAGER': {
    title: 'IT Project Manager',
    // The new statement at the top:
    intro: `With the vision of redefining the idea of Life Insurance in Bangladesh through innovation and a new spirit, Shanta Life
is set to commence its operations. Our ambition is to build a devoted team for delivering best-in-class products and
services that will transform the industry. If you are driven by the pursuit of excellence and wish to work with a dynamic
team, we invite you to be a part of our journey.`,
    responsibilities: [
      'Define project scope, objectives, and deliverables; develop and manage detailed project plans to ensure successful execution within scope, time and budget.',
      'Act as a liaison between business stakeholders and technical teams, ensuring clear communication, alignment and regular project status updates.',
      'Lead cross-functional project teams, fostering collaboration, accountability and alignment toward project goals.',
      'Identify, mitigate, and manage project risks and issues, ensuring timely resolution of challenges and adherence to contingency plans.',
      'Oversee the implementation of IT solutions, ensuring compliance, timely delivery and post-implementation success evaluations.',
      'Manage external vendors and optimize resources across projects, ensuring contractual obligations and resource efficiency.',
    ],
    requirements: [
      'Minimum Bachelor’s degree in Computer Science, Management information system or a related field.',
      '5 to 10 years of experience in IT project management, preferably in bank, telco or financial industry.',
      'Proven expertise in managing the end-to-end IT project lifecycle.',
      'Strong understanding of ICT concepts, system development lifecycle (SDLC) and agile methodologies.',
      'Proficiency in project management tools such as Microsoft Project, JIRA or Trello.',
    ],
    location: 'Dhaka',
    deadline: '30th August, 2025',
    applyEmail: 'talent@shantalife.com',
    subjectLine: 'Application for IT Project Manager',
    footer: '',
  },
}

// Map type/title to your form options
function getFormPosition(type: string, title: string) {
  if (type.toLowerCase().includes('intern')) return 'Relationship Officer (Internship)'
  if (type.toLowerCase().includes('part')) return 'Campus Ambassador (Part-time)'
  if (type.toLowerCase().includes('full') && title.toLowerCase().includes('ambassador'))
    return 'Campus Ambassador (Full time)'
  if (type.toLowerCase().includes('full') && title.toLowerCase().includes('relationship'))
    return 'Relationship Officer (Full time)'
  if (title.toLowerCase() === 'management trainee') return 'Management Trainee'
  // add more as needed
  return positions[0]
}

export default function CareerOpening({ openingData }: CareerOpeningDataProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [pos, setPos] = useState(positions[0])
  const [openDetails, setOpenDetails] = useState<{ open: boolean; title?: string }>({
    open: false,
    title: undefined,
  })

  const handleViewDetails = (title: string) => {
    setOpenDetails({ open: true, title })
  }

  const handleApply = (type: string, title: string) => {
    setPos(getFormPosition(type, title))
    // Optionally scroll to form
    const formEl = document.querySelector('#career-opening-section form')
    // if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  useEffect(() => {
    if (!carouselApi) return

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollButtons()
    carouselApi.on('select', updateScrollButtons)

    return () => {
      carouselApi.off('select', updateScrollButtons)
    }
  }, [carouselApi])

  return (
    <section id="career-opening-section" className="container-padding w-full bg-[#F6EDDD] py-12">
      <div className="mb-8 lg:mb-10">
        <div>
          <span className="block text-[#343434] font-light text-[18px] md:text-[22px] xl:text-[24px]">
            CURRENTLY OPENING
          </span>
          <span className="block text-[#ED7125] font-bold text-[18px] md:text-[34px] xl:text-[50px] -mt-1">
            POSITIONS
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-stretch">
        {/* Left: Section Title */}

        {/* Center: Cards (Grid for desktop, Carousel for mobile) */}
        <div className="flex flex-col items-center w-full">
          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 w-full">
            {openingData.map((card: any, idx: number) => (
              <CareerOpeningCard
                key={idx}
                {...card}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          {/* Mobile: Carousel */}
          <div className="md:hidden w-full relative mb-8">
            <Carousel
              opts={{ loop: true, align: 'center' }}
              setApi={setCarouselApi}
              plugins={[
                Autoplay({
                  delay: 5000,
                }),
              ]}
            >
              <CarouselContent className="flex items-stretch">
                {openingData.map((card: any, idx: number) => (
                  <CarouselItem key={idx} className="flex-shrink-0 w-[91vw] max-w-[350px]">
                    <CareerOpeningCard
                      {...card}
                      onApply={handleApply}
                      onViewDetails={handleViewDetails}
                    />
                  </CarouselItem>
                ))}
                <CareerDetailsModal
                  open={openDetails.open}
                  onOpenChange={(o: boolean) => setOpenDetails({ open: o, title: undefined })}
                  details={
                    openDetails.title
                      ? detailsData[openDetails.title.toUpperCase() as keyof typeof detailsData]
                      : undefined
                  }
                />
              </CarouselContent>
              <div
                className="flex md:hidden gap-2 absolute
                          inset-x-0 justify-center -bottom-16"
              >
                <CarouselNavButtons
                  onPrev={() => carouselApi?.scrollPrev()}
                  onNext={() => carouselApi?.scrollNext()}
                  hasPrev={canScrollPrev}
                  hasNext={canScrollNext}
                />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Right: Form */}
        <div className="mt-10 md:mt-0 h-full">
          <JoinOurTeamMobile />
          <div className="hidden md:block h-full">
            <CareerOpeningForm pos={pos} setPos={setPos} />
          </div>
        </div>
      </div>
    </section>
  )
}
