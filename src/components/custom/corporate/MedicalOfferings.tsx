// components/custom/corporate/MedicalOfferings.tsx
import Image from 'next/image'

type Offering = { title: string; image: string; description?: string }

const CDN = process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN ?? ''

const MEDICAL_OFFERINGS: Offering[] = [
  {
    title: 'In-Patient Coverage (IPC)',
    image: `${CDN}/solutions/corporate/web/offerings_icon6.png`,
    description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
  },
  {
    title: 'Maternity Benefits',
    image: `${CDN}/solutions/corporate/web/offerings_icon7.png`,
    description: `Financial support for maternity-related hospital and medical costs.`,
  },
  {
    title: 'Out Patient Coverage (OPC)',
    image: `${CDN}/solutions/corporate/web/offerings_icon8.png`,
    description: `Coverage for medical consultations, diagnostics, and prescribed medications without hospitalization.`,
  },
  {
    title: 'OPC Dental',
    image: `${CDN}/solutions/corporate/web/offerings_icon9.png`,
    description: `Covers dental treatments, checkups, and preventive care under OPC benefits.`,
  },
  {
    title: 'OPC Optical',
    image: `${CDN}/solutions/corporate/web/offerings_icon10.png`,
    description: `Provides coverage for eye exams, glasses, and optical treatments.`,
  },
]

export default function MedicalOfferings({ className = '' }: { className?: string }) {
  return (
    <section
      className={`py-6 md:py-0 px-4 md:px-8 lg:px-10 xl:px-12 2xl:px-14 ${className}`}
    >
      <ul className="space-y-3 md:space-y-0">
        {MEDICAL_OFFERINGS.map((item, idx) => (
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
              <span className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  sizes="50px"
                  className="object-contain"
                  priority={idx === 0}
                />
              </span>
              <h4 className="text-[#292929] font-semibold tracking-wide text-[10px] sm:text-base md:text-lg uppercase">
                {item.title}
              </h4>
            </div>

            {/* Description with fade/expand effect */}
            {item.description && (
              <div
                className={`
                  px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 -mt-4
                  h-auto
                  opacity-0 overflow-hidden
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
