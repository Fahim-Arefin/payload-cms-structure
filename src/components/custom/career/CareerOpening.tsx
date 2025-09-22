'use client'

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import CareerOpeningForm from './CareerOpeningForm'

import { useEffect, useState } from 'react'
import CareerOpeningCard from './CareerOpeningCard'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import { JoinOurTeamMobile } from './JoinOurTeamMobile'
import Autoplay from 'embla-carousel-autoplay'
import CareerDetailsModal from './CareerDetailsModal'
import LocalizedText from '../shared/LocalizedText'

type CareerOpeningDataProps = {
  openingData: any
}

const positions = [
  'Junior IT Executive',
  'IT Project Manager',
  'Head of Agency Business',
  'Full Stack Engineer',
  'Mid IT Executive',
  'Senior IT Executive',
  'Management Trainee',
  'Relationship Officer (Internship)',
  'Relationship Officer (Full time)',
  'Campus Ambassador (Part-time)',
  'Campus Ambassador (Full time)',
]

const detailsData = {
  'FULL STACK ENGINEER': {
    title: 'Full Stack Engineer',
    responsibilities: [
      'Design, develop and maintain scalable, secure front-end and back-end solutions for web and mobile applications, ensuring seamless user experiences.',
      'Integrate third-party APIs, develop and maintain RESTful APIs and manage database design, optimization and data integrity.',
      'Collaborate with cross-functional teams, including designers and product managers, to translate business requirements into technical solutions and participate in code reviews.',
      'Optimize application performance for speed, scalability and reliability while monitoring and troubleshooting issues.',
      'Write and maintain tests (unit, integration, end-to-end) and implement CI/CD pipelines for automated testing and deployment in cloud environments.',
      'Stay updated on emerging technologies, promoting innovative solutions like containerization and serverless computing.',
    ],
    requirements: [
      'Minimum Bachelor’s degree in Computer Science, Software Engineering or a related field.',
      '3 to 5 years of experience as a Full Stack Developer, Software Engineer or similar role.',
      'Proficiency in front-end technologies such as HTML, CSS, JavaScript, and modern frameworks like React, Angular, or Vue.js.',
      'Expertise in back-end technologies, including Node.js, Python, Ruby, Java, or .NET.',
      'Strong understanding of cloud platforms and database management.',
      'Familiarity with microservices architecture and containerization tools such as Docker and Kubernetes.',
    ],
    location: 'Dhaka',
    deadline: '30th August, 2025',
    applyEmail: 'talent@shantalife.com',
    subjectLine: 'Application for Full Stack Engineer',
    footer: '',
    filename: 'full stack engineer.pdf',
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
  'HEAD OF AGENCY BUSINESS': {
    title: 'Head of Agency Business',
    responsibilities: [
      'Develop and execute business strategies and plans for retail/agency/individual life insurance.',
      'Lead the nationwide sales team including divisional/regional offices, agency branches and other offices to achieve budgeted objectives and KPIs.',
      'Capitalize on new market opportunities, build strategic partnerships and expand the company’s retail presence across Bangladesh.',
      'Recruit, train and monitor performance of Sales Managers, Agency Supervisors and Distribution Teams.',
      'Monitor sales campaigns, bonus initiatives, market trends and competitors’ activities.',
      'Utilize data-driven insights to forecast sales, optimize performance and mitigate risks of sales.',
      'Ensure a customer centric approach by improving engagement, developing products and coordinating campaigns and events.',
    ],
    requirements: [
      "Bachelor’s /Master's degree in Business.",
      '12-15 years of experience in insurance/financial sector, with at least 5 years in a leadership role in sales/relationship/account management.',
      'In-depth knowledge of retail insurance products.',
      'Digital literacy, current tech trend awareness to capitalize the technology in order to ensure pace, simplicity and productivity.',
      'Strong network and exceptional communication skills.',
    ],
    location: 'Dhaka',
    deadline: '30th August, 2025',
    applyEmail: 'talent@shantalife.com',
    subjectLine: 'Application for Head of Agency Business',
    footer: '',
    filename: 'Head of Agency Business.pdf',
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
    filename: 'IT Project Manager.pdf',
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
  if (title.toLowerCase() === 'full stack engineer') return 'Full Stack Engineer'
  if (title.toLowerCase() === 'it project manager') return 'IT Project Manager'
  if (title.toLowerCase() === 'head of agency business') return 'Head of Agency Business'
  // add more as needed
  return positions[0]
}

export default function CareerOpening({ openingData }: CareerOpeningDataProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [pos, setPos] = useState('')
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
            <LocalizedText en="CURRENTLY OPENING" bn="নিয়োগ" />
          </span>
          <span className="block text-[#ED7125] font-bold text-[18px] md:text-[34px] xl:text-[50px] -mt-1">
            <LocalizedText en="POSITIONS" bn="চলছে" />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Left: Section Title */}

        {/* Center: Cards (Grid for desktop, Carousel for mobile) */}
        <div className="flex flex-col items-center w-full self-stretch">
          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 w-full grow">
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
              opts={{ align: 'start' }}
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
