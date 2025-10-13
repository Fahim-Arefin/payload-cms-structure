// components/custom/corporate/LifeOfferings.tsx
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'

type Offering = {
  title: string
  titleBN?: string
  image: string
  description?: string
  descriptionBN?: string
}

const CDN = process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN ?? ''

const LIFE_OFFERINGS: Offering[] = [
  {
    title: 'Group Life Insurance (GL)',
    titleBN: 'গ্রুপ লাইফ ইন্স্যুরেন্স (GL)',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon1.png`,
    description: `In the event of an insured member’s death, Shanta Life provides financial support to the nominated 
          beneficiary or organization as per policy terms, ensuring peace of mind and security during difficult times.`,
    descriptionBN: `বীমাকৃত সদস্যের মৃত্যু ঘটলে, শান্তা লাইফ আপনার মনোনীত উত্তরাধিকারী বা প্রতিষ্ঠানে আর্থিক সহায়তা প্রদান করে — 
          নীতির শর্ত অনুযায়ী। এটি কঠিন সময়ে মানসিক শান্তি ও আর্থিক নিরাপত্তা নিশ্চিত করে।`,
  },
  {
    title: 'Accidental Death Coverage (AD)',
    titleBN: 'দুর্ঘটনাজনিত মৃত্যু কভারেজ (AD)',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon2.png`,
    description: `In case of death due to an accident, Shanta Life pays an additional benefit on top of the natural death coverage, 
          offering extra financial protection to the nominee or organization.`,
    descriptionBN: `দুর্ঘটনায় মৃত্যু হলে, প্রাকৃতিক মৃত্যুর কভারেজের পাশাপাশি অতিরিক্ত আর্থিক সুবিধা প্রদান করা হয়, 
          যা মনোনীত ব্যক্তি বা প্রতিষ্ঠানের জন্য বাড়তি সুরক্ষা নিশ্চিত করে।`,
  },
  {
    title: 'Permanent and Total Disability (PTD)',
    titleBN: 'স্থায়ী ও সম্পূর্ণ অক্ষমতা (PTD)',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon3.png`,
    description: `In case of total and permanent disability due to an accident, the full sum insured is paid, 
          ensuring financial stability for the employee and their family.`,
    descriptionBN: `দুর্ঘটনায় স্থায়ী ও সম্পূর্ণ অক্ষম হলে সম্পূর্ণ বীমা অংক প্রদান করা হয়, যা কর্মচারী ও তার পরিবারের আর্থিক 
          স্থিতিশীলতা নিশ্চিত করে।`,
  },
  {
    title: 'Permanent and Partial Disability (PPD)',
    titleBN: 'স্থায়ী ও আংশিক অক্ষমতা (PPD)',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon4.png`,
    description: `In case of partial but permanent disability due to an accident, Shanta Life provides a 
          fixed benefit to the employee or employer, as per Bangladesh labor laws, helping ensure financial support 
          during recovery and adaptation.`,
    descriptionBN: `দুর্ঘটনায় আংশিক কিন্তু স্থায়ী অক্ষমতা হলে কর্মচারী বা নিয়োগকর্তাকে বাংলাদেশ শ্রম আইনের আলোকে 
          নির্ধারিত আর্থিক সহায়তা প্রদান করা হয়।`,
  },
  {
    title: 'Critical Illness Coverage (CIB)',
    titleBN: 'গুরুতর অসুস্থতা কভারেজ (CIB)',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon5.png`,
    description: `Shanta Life’s Critical Illness Benefit provides financial support if the insured is diagnosed 
          with a specified serious condition, helping ease the burden of medical expenses so the focus can remain on 
          recovery.`,
    descriptionBN: `গুরুতর অসুস্থতা ধরা পড়লে শান্তা লাইফ আর্থিক সহায়তা প্রদান করে, যাতে চিকিৎসা ব্যয়ের চাপ কমে এবং 
          সুস্থতায় মনোযোগ দেওয়া যায়।`,
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
                <LocalizedText en={item?.title} bn={item?.titleBN} />
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
                  <LocalizedText en={item?.description} bn={item?.descriptionBN} />
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
