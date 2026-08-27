// 'use client'

// import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
// import Button02 from '@/components/custom/sagar-ropes-shared/buttons/Button02'
// import { gsap, useGSAP } from '@/lib/gsap'
// import { pageHrefWithAnchor } from '@/lib/utils'
// import { OurProjectBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import Link from 'next/link'
// import MacBookFrame from 'public/assets/images/MacBook-Pro-16 (3).png'
// // import MobileBorder from 'public/assets/images/Border.png'
// import MobileBorder from 'public/assets/images/iPhone.png'
// import React, { useMemo, useRef, useState } from 'react'

// type Props = {
//   block: OurProjectBlockType
// }

// type ProjectItem = NonNullable<NonNullable<OurProjectBlockType['projectGroup']>['projects']>[number]

// function ProjectContainer({ block }: Props) {
//   const projects = useMemo(() => {
//     return (block?.projectGroup?.projects ?? []).filter((project) => {
//       const desktopImage =
//         typeof project?.desktopSiteImage === 'object' ? project.desktopSiteImage : null

//       const mobileImage =
//         typeof project?.mobileSiteImage === 'object' ? project.mobileSiteImage : null

//       return !!desktopImage?.url && !!mobileImage?.url
//     })
//   }, [block?.projectGroup?.projects])

//   const [activeIndex, setActiveIndex] = useState(0)

//   const containerRef = useRef<HTMLDivElement | null>(null)
//   const contentRef = useRef<HTMLDivElement | null>(null)
//   const desktopScreenRef = useRef<HTMLDivElement | null>(null)
//   const mobileScreenRef = useRef<HTMLDivElement | null>(null)

//   const activeProject = projects[activeIndex]
//   const totalProjects = projects.length

//   const contactHref = pageHrefWithAnchor(block?.otherInfo?.buttonLink, block?.otherInfo?.sectionId)
//   const contactLink = contactHref !== '#' ? contactHref : ''

//   const goToProject = (direction: 'prev' | 'next') => {
//     if (totalProjects <= 1) return

//     setActiveIndex((prev) => {
//       if (direction === 'next') return (prev + 1) % totalProjects
//       return (prev - 1 + totalProjects) % totalProjects
//     })
//   }

//   useGSAP(
//     () => {
//       const content = contentRef.current
//       const desktopScreen = desktopScreenRef.current
//       const mobileScreen = mobileScreenRef.current

//       if (!content || !desktopScreen || !mobileScreen) return

//       const contentItems = content.querySelectorAll('.project-content-animate')
//       const screenItems = [desktopScreen, mobileScreen]

//       gsap.killTweensOf([contentItems, ...screenItems])

//       const tl = gsap.timeline({
//         defaults: {
//           ease: 'power3.out',
//           overwrite: 'auto',
//         },
//       })

//       tl.fromTo(
//         contentItems,
//         {
//           autoAlpha: 0,
//           y: 26,
//           filter: 'blur(6px)',
//         },
//         {
//           autoAlpha: 1,
//           y: 0,
//           filter: 'blur(0px)',
//           duration: 0.58,
//           stagger: 0.06,
//         },
//         0,
//       )

//       tl.fromTo(
//         screenItems,
//         {
//           autoAlpha: 0,
//           y: 22,
//           scale: 1.018,
//           filter: 'blur(5px)',
//         },
//         {
//           autoAlpha: 1,
//           y: 0,
//           scale: 1,
//           filter: 'blur(0px)',
//           duration: 0.68,
//           stagger: 0.055,
//         },
//         0.08,
//       )
//     },
//     {
//       scope: containerRef,
//       dependencies: [activeIndex],
//     },
//   )

//   if (!activeProject || !totalProjects) return null

//   return (
//     <div
//       ref={containerRef}
//       className="
//         relative overflow-hidden
//       "
//     >
//       {/* soft bottom glow */}
//       <div
//         className="
//           pointer-events-none absolute
//           left-1/2 bottom-[-18%] z-0
//           h-[360px] w-[78%]
//           -translate-x-1/2
//           rounded-full
//           bg-primary-1/45
//           blur-[95px]
//           lg:h-[440px] lg:w-[72%]
//           xl:h-[520px]
//         "
//       />

//       <div
//         ref={contentRef}
//         className="
//           relative z-20 grid grid-cols-1
//           lg:grid-cols-12 lg:items-start
//           gap-[28px]
//           lg:gap-[42px]
//           xl:gap-[66px]
//           2xl:gap-[70px]

//         "
//       >
//         {/* left info */}
//         <div className="text-center xl:text-end text-white-1 lg:col-span-6">
//           <div
//             className="
//             mx-auto max-w-[520px]
//               project-content-animate
//               font-agency text-[68px] leading-none
//               lg:text-[86px]
//               xl:text-[104px]
//               2xl:text-[114px]
//             "
//           >
//             {String(activeIndex + 1).padStart(2, '0')}
//           </div>

//           {/* static siteNameHeading */}
//           {block?.otherInfo?.siteNameHeading && (
//             <div
//               className="
//                 mx-auto max-w-[520px]
//                 font-agency text-[18px] xl:leading-[33.75px]
//                 text-white-1
//                 lg:mt-[26px]
//                 lg:text-[22px]
//                 xl:text-[28px]
//                 2xl:text-[32px]
//               "
//             >
//               {block.otherInfo.siteNameHeading}
//             </div>
//           )}

//           <div
//             className="
//               project-content-animate
//               mx-auto mt-[2px] max-w-[520px]
//               font-agency text-[18px] xl:leading-[33.75px]
//               text-white-1
//               lg:text-[22px]
//               xl:text-[28px]
//               2xl:text-[32px]
//             "
//           >
//             {activeProject.projectName}
//           </div>

//           {totalProjects > 1 && (
//             <ProjectNavigation
//               activeIndex={activeIndex}
//               totalProjects={totalProjects}
//               onPrev={() => goToProject('prev')}
//               onNext={() => goToProject('next')}
//               className="
//                 mt-[18px]
//                 lg:mt-[26px]
//               "
//             />
//           )}
//         </div>

//         {/* right info */}
//         <div
//           className="
//             lg:col-span-6
//             lg:pt-[24px]
//             xl:pt-[30px]
//             2xl:pt-[36px]
//             px-2 md:px-0
//           "
//         >
//           <p
//             className="
//               project-content-animate
//               mx-auto max-w-[560px]
//               text-center font-grift global-p4
//               leading-[1.65] tracking-[0.04em]
//               text-[#FCF8F0]
//               lg:mx-0 lg:text-left
//               xl:max-w-[620px]
//             "
//           >
//             {activeProject.description}
//           </p>

//           <div
//             className="
//               project-content-animate
//               mt-[22px] flex flex-wrap justify-center gap-3
//               lg:justify-start
//               xl:mt-[28px]
//             "
//           >
//             {activeProject.siteLink && activeProject.siteLinkButtonLabel && (
//               <a
//                 href={activeProject.siteLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex"
//               >
//                 <Button01 type="button">{activeProject.siteLinkButtonLabel}</Button01>
//               </a>
//             )}

//             {contactLink && block?.otherInfo?.contactUsButtonLabel && (
//               <Link href={contactLink} className="inline-flex">
//                 <Button02 type="button">{block.otherInfo.contactUsButtonLabel}</Button02>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       <ProjectDeviceMockup
//         project={activeProject}
//         desktopScreenRef={desktopScreenRef}
//         mobileScreenRef={mobileScreenRef}
//       />
//     </div>
//   )
// }

// function ProjectNavigation({
//   activeIndex,
//   totalProjects,
//   onPrev,
//   onNext,
//   className = '',
// }: {
//   activeIndex: number
//   totalProjects: number
//   onPrev: () => void
//   onNext: () => void
//   className?: string
// }) {
//   return (
//     <div
//       className={`flex items-center justify-center xl:justify-end gap-3 ${className}  mx-auto max-w-[520px]`}
//     >
//       <button
//         type="button"
//         onClick={onPrev}
//         aria-label="Previous project"
//         className="
//           group flex size-[36px] items-center justify-center
//           rounded-full border border-primary-2/45
//           bg-white-1/5 text-white-1
//           transition-all duration-300 ease-out
//           hover:border-primary-2 hover:bg-primary-1
//           lg:size-[40px]
//           xl:size-[44px]
//         "
//       >
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           className="
//             size-[16px]
//             transition-transform duration-300 ease-out
//             group-hover:-translate-x-0.5
//           "
//         >
//           <path
//             d="M15 5L8 12L15 19"
//             stroke="currentColor"
//             strokeWidth="2.4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>

//       <div
//         className="
//           min-w-[72px] rounded-full
//           border border-primary-2/30
//           px-4 py-2
//           text-center font-grift text-[12px] font-semibold
//           tracking-[0.12em] text-white-1/85
//           xl:text-[13px]
//         "
//       >
//         {String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
//       </div>

//       <button
//         type="button"
//         onClick={onNext}
//         aria-label="Next project"
//         className="
//           group flex size-[36px] items-center justify-center
//           rounded-full border border-primary-2/45
//           bg-white-1/5 text-white-1
//           transition-all duration-300 ease-out
//           hover:border-primary-2 hover:bg-primary-1
//           lg:size-[40px]
//           xl:size-[44px]
//         "
//       >
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           className="
//             size-[16px]
//             transition-transform duration-300 ease-out
//             group-hover:translate-x-0.5
//           "
//         >
//           <path
//             d="M9 5L16 12L9 19"
//             stroke="currentColor"
//             strokeWidth="2.4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>
//     </div>
//   )
// }

// function ProjectDeviceMockup({
//   project,
//   desktopScreenRef,
//   mobileScreenRef,
// }: {
//   project: ProjectItem
//   desktopScreenRef: React.RefObject<HTMLDivElement | null>
//   mobileScreenRef: React.RefObject<HTMLDivElement | null>
// }) {
//   const desktopImage =
//     typeof project?.desktopSiteImage === 'object' ? project.desktopSiteImage : null
//   const mobileImage = typeof project?.mobileSiteImage === 'object' ? project.mobileSiteImage : null

//   if (!desktopImage?.url || !mobileImage?.url) return null

//   return (
//     <div
//       //   className="
//       //     relative z-10 mx-auto
//       //     mt-[36px]
//       //     mb-[-56px]
//       //     w-full max-w-[720px]
//       //     md:mt-[42px] md:mb-[-68px] md:max-w-[820px]
//       //     lg:mt-[54px] lg:mb-[-88px] lg:max-w-[920px]
//       //     xl:mt-[64px] xl:mb-[-110px] xl:max-w-[1030px]
//       //     2xl:mt-[72px] 2xl:mb-[-132px] 2xl:max-w-[1160px]
//       //
//       //   "
//       className="
//         relative z-10 mx-auto
//         w-full max-w-[720px]
//         md:mb-[-68px] md:max-w-[820px]
//          lg:mb-[-88px] lg:max-w-[920px]
//          xl:mb-[-110px] xl:max-w-[1030px]
//          2xl:mb-[-132px] 2xl:max-w-[1160px]

//       "
//     >
//       <div className="relative mx-auto w-full">
//         {/* laptop */}
//         <div
//           className="
//             relative mx-auto
//             aspect-[2048/1365]
//             w-[88%]
//             md:w-[82%]
//             lg:w-[76%]
//             xl:w-[78%]
//           "
//         >
//           {/* desktop screen image only swaps */}
//           <div
//             ref={desktopScreenRef}
//             className="
//               absolute z-10 overflow-hidden bg-secondary-1
//               left-[27.2%] top-[19.1%]
//               h-[44%] w-[46%]
//               rounded-[3px]
//             "
//           >
//             <Image
//               src={desktopImage.url}
//               alt={project?.projectName || 'Project desktop screenshot'}
//               fill
//               className="object-cover object-top"
//               sizes="760px"
//               quality={100}
//               priority
//               placeholder={project?.desktopSiteImageBlurDataURL ? 'blur' : 'empty'}
//               blurDataURL={project?.desktopSiteImageBlurDataURL || undefined}
//             />
//           </div>

//           {/* MacBook frame always static */}
//           <Image
//             src={MacBookFrame}
//             alt="MacBook frame"
//             fill
//             className="
//               pointer-events-none z-20
//               object-contain object-center
//             "
//             sizes="980px"
//             quality={100}
//             priority
//             placeholder="blur"
//             blurDataURL={MacBookFrame.blurDataURL}
//           />
//         </div>

//         {/* phone */}
//         <div
//           className="
//             absolute z-30
//             bottom-[17%] right-[18%]
//             w-[14%] min-w-[70px] max-w-[142px]
//             md:right-[19%]
//             lg:right-[20%]
//             xl:right-[19%]
//             2xl:right-[20%]
//           "
//         >
//           <div className="relative aspect-[174/368] w-full">
//             {/* phone frame always static */}
//             <Image
//               src={MobileBorder}
//               alt="Mobile frame"
//               fill
//               className="pointer-events-none z-10 object-contain"
//               sizes="150px"
//               quality={100}
//               priority
//               placeholder="blur"
//               blurDataURL={MobileBorder.blurDataURL}
//             />

//             {/* mobile screen image only swaps */}
//             <div
//               ref={mobileScreenRef}
//               className="
//                 absolute z-20 overflow-hidden bg-secondary-1
//                 left-[5.5%] top-[3.4%]
//                 h-[93.2%] w-[89%]
//                 rounded-[20px]
//                 md:rounded-[22px]
//                 xl:rounded-[24px]
//               "
//             >
//               <Image
//                 src={mobileImage.url}
//                 alt={project?.projectName || 'Project mobile screenshot'}
//                 fill
//                 className="object-fill object-top"
//                 sizes="150px"
//                 quality={100}
//                 priority
//                 placeholder={project?.mobileSiteImageBlurDataURL ? 'blur' : 'empty'}
//                 blurDataURL={project?.mobileSiteImageBlurDataURL || undefined}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProjectContainer

'use client'

import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import Button02 from '@/components/custom/sagar-ropes-shared/buttons/Button02'
import CarouselArrowButton from '@/components/custom/sagar-ropes-shared/buttons/CarouselArrowButton'
import { gsap, useGSAP } from '@/lib/gsap'
import { pageHrefWithAnchor } from '@/lib/utils'
import { OurProjectBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import Link from 'next/link'
import MacBookFrame from 'public/assets/images/MacBook-Pro-16 (3).png'
import MobileBorder from 'public/assets/images/iPhone.png'
import React, { useMemo, useRef, useState } from 'react'

type Props = {
  block: OurProjectBlockType
}

type ProjectItem = NonNullable<NonNullable<OurProjectBlockType['projectGroup']>['projects']>[number]

function ProjectContainer({ block }: Props) {
  const projects = useMemo(() => {
    return (block?.projectGroup?.projects ?? []).filter((project) => {
      const desktopImage =
        typeof project?.desktopSiteImage === 'object' ? project.desktopSiteImage : null

      const mobileImage =
        typeof project?.mobileSiteImage === 'object' ? project.mobileSiteImage : null

      return !!desktopImage?.url && !!mobileImage?.url
    })
  }, [block?.projectGroup?.projects])

  const [activeIndex, setActiveIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const desktopScreenRef = useRef<HTMLDivElement | null>(null)
  const mobileScreenRef = useRef<HTMLDivElement | null>(null)

  const activeProject = projects[activeIndex]
  const totalProjects = projects.length

  const contactHref = pageHrefWithAnchor(block?.otherInfo?.buttonLink, block?.otherInfo?.sectionId)
  const contactLink = contactHref !== '#' ? contactHref : ''

  const goToProject = (direction: 'prev' | 'next') => {
    if (totalProjects <= 1) return

    setActiveIndex((prev) => {
      if (direction === 'next') return (prev + 1) % totalProjects
      return (prev - 1 + totalProjects) % totalProjects
    })
  }

  useGSAP(
    () => {
      const content = contentRef.current
      const desktopScreen = desktopScreenRef.current
      const mobileScreen = mobileScreenRef.current

      if (!content || !desktopScreen || !mobileScreen) return

      const contentItems = content.querySelectorAll('.project-content-animate')
      const screenItems = [desktopScreen, mobileScreen]

      gsap.killTweensOf([contentItems, ...screenItems])

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          overwrite: 'auto',
        },
      })

      tl.fromTo(
        contentItems,
        {
          autoAlpha: 0,
          y: 26,
          filter: 'blur(6px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.58,
          stagger: 0.06,
        },
        0,
      )

      tl.fromTo(
        screenItems,
        {
          autoAlpha: 0,
          y: 22,
          scale: 1.018,
          filter: 'blur(5px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.68,
          stagger: 0.055,
        },
        0.08,
      )
    },
    {
      scope: containerRef,
      dependencies: [activeIndex],
    },
  )

  if (!activeProject || !totalProjects) return null

  return (
    <div
      ref={containerRef}
      className="
        relative overflow-hidden
      "
    >
      {/* soft bottom glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 bottom-[-18%] z-0
          h-[360px] w-[78%]
          -translate-x-1/2
          rounded-full
          bg-primary-1/45
          blur-[95px]
          lg:h-[440px] lg:w-[72%]
          xl:h-[520px]
        "
      />

      <div
        ref={contentRef}
        className="
          relative z-20 grid grid-cols-1
          gap-[28px]
          lg:grid-cols-12 lg:items-start lg:gap-[42px]
          xl:gap-[66px]
          2xl:gap-[70px]
        "
      >
        {/* left info */}
        <div className="text-center text-white-1 lg:col-span-6 xl:text-end">
          <div
            className="
              project-content-animate
              mx-auto max-w-[520px]
              font-agency text-[68px] leading-none
              lg:text-[86px]
              xl:text-[104px]
              2xl:text-[114px]
            "
          >
            {String(activeIndex + 1).padStart(2, '0')}
          </div>

          {/* static siteNameHeading */}
          {block?.otherInfo?.siteNameHeading && (
            <div
              className="
                mx-auto max-w-[520px]
                font-agency text-[18px] text-white-1
                lg:mt-[26px] lg:text-[22px]
                xl:text-[28px] xl:leading-[33.75px]
                2xl:text-[32px]
              "
            >
              {block.otherInfo.siteNameHeading}
            </div>
          )}

          <div
            className="
              project-content-animate
              mx-auto mt-[2px] max-w-[520px]
              font-agency text-[18px] text-white-1
              lg:text-[22px]
              xl:text-[28px] xl:leading-[33.75px]
              2xl:text-[32px]
            "
          >
            {activeProject.projectName}
          </div>

          {totalProjects > 1 && (
            <ProjectNavigation
              activeIndex={activeIndex}
              totalProjects={totalProjects}
              onPrev={() => goToProject('prev')}
              onNext={() => goToProject('next')}
              className="
                mt-[18px]
                lg:mt-[26px]
              "
            />
          )}
        </div>

        {/* right info */}
        <div
          className="
            px-2
            md:px-0
            lg:col-span-6 lg:pt-[24px]
            xl:pt-[30px]
            2xl:pt-[36px]
          "
        >
          <p
            className="
              project-content-animate
              mx-auto max-w-[560px]
              text-center font-grift global-p4
              leading-[1.65] tracking-[0.04em]
              text-[#FCF8F0]
              lg:mx-0 lg:text-left
              lg:max-w-[440px]
              xl:max-w-[620px]
            "
          >
            {activeProject.description}
          </p>

          <div
            className="
              project-content-animate
              mt-[22px] flex flex-wrap justify-center gap-3
              lg:justify-start
              xl:mt-[28px]
            "
          >
            {activeProject.siteLink && activeProject.siteLinkButtonLabel && (
              <a
                href={activeProject.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex"
              >
                <Button01 type="button">{activeProject.siteLinkButtonLabel}</Button01>
              </a>
            )}

            {contactLink && block?.otherInfo?.contactUsButtonLabel && (
              <Link href={contactLink} className="inline-flex">
                <Button02 type="button">{block.otherInfo.contactUsButtonLabel}</Button02>
              </Link>
            )}
          </div>
        </div>
      </div>

      <ProjectDeviceMockup
        project={activeProject}
        desktopScreenRef={desktopScreenRef}
        mobileScreenRef={mobileScreenRef}
      />
    </div>
  )
}

// function ProjectNavigation({
//   activeIndex,
//   totalProjects,
//   onPrev,
//   onNext,
//   className = '',
// }: {
//   activeIndex: number
//   totalProjects: number
//   onPrev: () => void
//   onNext: () => void
//   className?: string
// }) {
//   return (
//     <div
//       className={`
//         mx-auto flex max-w-[520px] items-center justify-center gap-3
//         xl:justify-end
//         ${className}
//       `}
//     >
//       <button
//         type="button"
//         onClick={onPrev}
//         aria-label="Previous project"
//         className="
//           group flex size-[36px] items-center justify-center
//           rounded-full border border-primary-2/45
//           bg-white-1/5 text-white-1
//           transition-all duration-300 ease-out
//           hover:border-primary-2 hover:bg-primary-1
//           lg:size-[40px]
//           xl:size-[44px]
//         "
//       >
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           className="
//             size-[16px]
//             transition-transform duration-300 ease-out
//             group-hover:-translate-x-0.5
//           "
//         >
//           <path
//             d="M15 5L8 12L15 19"
//             stroke="currentColor"
//             strokeWidth="2.4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>

//       <div
//         className="
//           min-w-[72px] rounded-full
//           border border-primary-2/30
//           px-4 py-2
//           text-center font-grift text-[12px] font-semibold
//           tracking-[0.12em] text-white-1/85
//           xl:text-[13px]
//         "
//       >
//         {String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
//       </div>

//       <button
//         type="button"
//         onClick={onNext}
//         aria-label="Next project"
//         className="
//           group flex size-[36px] items-center justify-center
//           rounded-full border border-primary-2/45
//           bg-white-1/5 text-white-1
//           transition-all duration-300 ease-out
//           hover:border-primary-2 hover:bg-primary-1
//           lg:size-[40px]
//           xl:size-[44px]
//         "
//       >
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           className="
//             size-[16px]
//             transition-transform duration-300 ease-out
//             group-hover:translate-x-0.5
//           "
//         >
//           <path
//             d="M9 5L16 12L9 19"
//             stroke="currentColor"
//             strokeWidth="2.4"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </button>
//     </div>
//   )
// }

function ProjectNavigation({
  activeIndex,
  totalProjects,
  onPrev,
  onNext,
  className = '',
}: {
  activeIndex: number
  totalProjects: number
  onPrev: () => void
  onNext: () => void
  className?: string
}) {
  return (
    <div
      className={`
        mx-auto flex max-w-[520px] items-center justify-center gap-3
        xl:justify-end
        ${className}
      `}
    >
      <CarouselArrowButton
        direction="prev"
        ariaLabel="Previous project"
        onClick={onPrev}
        expandedWidth={76}
        tailWidth={28}
        buttonClassName="
          size-[36px]
          lg:size-[40px]
          xl:size-[44px]
        "
      />

      <div
        className="
          min-w-[72px] rounded-full
          border border-primary-2/30
          bg-primary-1/30
          px-4 py-2
          text-center font-grift text-[12px] font-semibold
          tracking-[0.12em] text-white-1/85
          xl:text-[14px]
        "
      >
        {String(activeIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}
      </div>

      <CarouselArrowButton
        direction="next"
        ariaLabel="Next project"
        onClick={onNext}
        expandedWidth={76}
        tailWidth={28}
        buttonClassName="
          size-[36px]
          lg:size-[40px]
          xl:size-[44px]
        "
      />
    </div>
  )
}

function ProjectDeviceMockup({
  project,
  desktopScreenRef,
  mobileScreenRef,
}: {
  project: ProjectItem
  desktopScreenRef: React.RefObject<HTMLDivElement | null>
  mobileScreenRef: React.RefObject<HTMLDivElement | null>
}) {
  const desktopImage =
    typeof project?.desktopSiteImage === 'object' ? project.desktopSiteImage : null
  const mobileImage = typeof project?.mobileSiteImage === 'object' ? project.mobileSiteImage : null

  if (!desktopImage?.url || !mobileImage?.url) return null

  return (
    <div
      className="
        relative z-10 mx-auto

        mt-[18px]
        -mb-[26%]
        w-full 

        md:mt-0
        md:-mb-[16%]
        md:max-w-full

        lg:mb-[-148px]
        lg:max-w-[1020px]

        xl:mb-[-175px]
        xl:max-w-[1030px]

        2xl:mb-[-210px]
        2xl:max-w-[1160px]
      "
    >
      <div className="relative mx-auto w-full overflow-visible  ">
        {/* laptop */}
        <div
          className="
            relative mx-auto
            aspect-[2048/1365]

            w-[130%]
            -mt-[7%]
            -translate-x-[17%]

            md:w-[82%]
            md:-translate-x-[5%]
            md:-mt-[5%]

            lg:translate-x-0
            lg:w-[76%]
            lg:ml-[7%]
            lg:-mt-[4%]

            xl:w-[88%]
            xl:ml-[4%]
            xl:-mt-[4%]

            2xl:w-[95%]
            2xl:-ml-[3%]
            2xl:-mt-[5%]
          "
        >
          {/* desktop screen image only swaps */}
          <div
            ref={desktopScreenRef}
            className="
              absolute z-10 overflow-hidden bg-secondary-1
              left-[27.2%] top-[19.1%]
              h-[44%] w-[46%]
              rounded-[3px]
            "
          >
            <Image
              src={desktopImage.url}
              alt={project?.projectName || 'Project desktop screenshot'}
              fill
              className="object-cover object-top"
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 767px) 92vw,
                (max-width: 1023px) 700px,
                760px
              "
              quality={100}
              priority
              placeholder={project?.desktopSiteImageBlurDataURL ? 'blur' : 'empty'}
              blurDataURL={project?.desktopSiteImageBlurDataURL || undefined}
            />
          </div>

          {/* MacBook frame always static */}
          <Image
            src={MacBookFrame}
            alt="MacBook frame"
            fill
            className="
              pointer-events-none z-20
              object-contain object-center
            "
            sizes="
              (max-width: 639px) 110vw,
              (max-width: 767px) 100vw,
              (max-width: 1023px) 820px,
              980px
            "
            quality={100}
            priority
            placeholder="blur"
            blurDataURL={MacBookFrame.blurDataURL}
          />
        </div>

        {/* phone */}
        <div
          className="
            absolute z-30

            bottom-[26%]
            right-[13.4%]
            w-full
            min-w-[50px]
            max-w-[75px]

            sm:max-w-[100px]

            md:bottom-[23%]
            md:right-[22%]
            md:w-[14%]
            md:min-w-[70px]
            md:max-w-[142px]

            lg:right-[24%]
            lg:max-w-full

            xl:right-[19%]
            xl:max-w-full

            2xl:bottom-[24%]
            2xl:right-[21%]
            2xl:max-w-full
          "
        >
          <div className="relative aspect-[722/1336] w-full">
            {/* phone frame */}
            <Image
              src={MobileBorder}
              alt="Mobile frame"
              fill
              className="
                pointer-events-none z-10
                object-contain
              "
              sizes="
                (max-width: 639px) 70px,
                (max-width: 767px) 84px,
                (max-width: 1023px) 130px,
                150px
              "
              quality={100}
              priority
              placeholder="blur"
              blurDataURL={MobileBorder.blurDataURL}
            />

            {/* mobile screen image only swaps */}
            <div
              ref={mobileScreenRef}
              className="
                absolute z-20 overflow-hidden bg-secondary-1

                left-[5.05%]
                top-[3.15%]
                h-[89.55%]
                w-[89.9%]

                rounded-[7px]
                sm:rounded-[9px]
                md:rounded-[13px]
                lg:rounded-[15px]
                xl:rounded-[17px]
                2xl:rounded-[18px]
              "
            >
              <Image
                src={mobileImage.url}
                alt={project?.projectName || 'Project mobile screenshot'}
                fill
                className="object-fill object-top"
                sizes="
                  (max-width: 639px) 62px,
                  (max-width: 767px) 76px,
                  (max-width: 1023px) 116px,
                  136px
                "
                quality={100}
                priority
                placeholder={project?.mobileSiteImageBlurDataURL ? 'blur' : 'empty'}
                blurDataURL={project?.mobileSiteImageBlurDataURL || undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectContainer
