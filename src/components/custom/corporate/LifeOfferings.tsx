// components/custom/corporate/LifeOfferings.tsx
import Image from 'next/image'

type Offering = { title: string; image: string; description?: string }

const CDN = process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN ?? ''

const LIFE_OFFERINGS: Offering[] = [
  {
    title: 'Group Life Insurance (GL)',
    image: `${CDN}/solutions/corporate/web/offerings_icon1.png`,
    description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated
    beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
  },
  {
    title: 'Accidental Death Coverage (AD)',
    image: `${CDN}/solutions/corporate/web/offerings_icon2.png`,
    description: `Accidental death benefit paid in addition to basic life coverage.`,
  },
  {
    title: 'Permanent and Total Disability (PTD)',
    image: `${CDN}/solutions/corporate/web/offerings_icon3.png`,
    description: `Financial support if the insured becomes permanently and totally disabled.`,
  },
  {
    title: 'Permanent and Partial Disability (PPD)',
    image: `${CDN}/solutions/corporate/web/offerings_icon4.png`,
    description: `Coverage for partial but permanent disability due to accident or illness.`,
  },
  {
    title: 'Critical Illness Coverage (CIB)',
    image: `${CDN}/solutions/corporate/web/offerings_icon5.png`,
    description: `One-time lump sum on diagnosis of specified critical illnesses.`,
  },
]

function LifeOfferings() {
  return (
    <section className="py-6 md:py-0 px-4 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
      <ul className="space-y-3 md:space-y-0">
        {LIFE_OFFERINGS.map((item, idx) => (
          <li
            key={item.title}
            className={`
              group relative cursor-pointer
              rounded-[10px] border border-transparent bg-transparent
              transition-colors duration-200
              hover:border-[#9C8639] hover:bg-white
              focus-within:border-[#9C8639] focus-within:bg-white
            `}
          >
            {/* Row */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5">
              <div className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  sizes="50px"
                  className="object-contain"
                  priority={idx === 0}
                />
              </div>

              <h4 className="text-[#292929] font-semibold tracking-wide text-[10px] md:text-base lg:text-[18px] uppercase">
                {item.title}
              </h4>
            </div>

            {/* Description with fade/slide transition */}
            {item.description && (
              <div
                className={`
                  px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 -mt-4
                  opacity-0 min-h-fit overflow-hidden
                  transition-all duration-300 ease-in-out
                  group-hover:opacity-100 group-hover:max-h-40
                  hidden md:block
                `}
              >
                <p className="text-[11px] pl-[44px] md:pl-[72px] sm:text-sm md:text-[15px] leading-relaxed text-[#444]">
                  {item.description}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LifeOfferings
