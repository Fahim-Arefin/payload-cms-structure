import GlobalButton from '@/components/custom/shared/GlobalButton'
import Link from 'next/link'
import { ContactComponent } from './CustomerCareCall'
import LocalizedText from '../shared/LocalizedText'
import LocalizedString from '../shared/LocalizedString'
const PORTAL_URL = 'https://portal.shantalife.com/'

export function CorporateClaim() {
  return (
    <>
      <div>
        <div className={`space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12`}>
          <div
            className={`
           flex mx-auto mt-12`}
          >
            <div className="flex mx-auto">
              <Link href="https://portal.shantalife.com/" target="_blank">
                <GlobalButton
                  variant="secondary"
                  className="w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[150px]
            h-[32px] md:h-[34px] lg:h-[38px] xl:h-[40px] 2xl:h-[42px]"
                  text="Submit Claim"
                  size="small"
                >
                  <LocalizedString en="Submit Claim" bn="সাবমিট ক্লেম" />
                </GlobalButton>
              </Link>
            </div>
          </div>
          <div className={`flex mx-auto`}>
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[55%] text-center mx-auto text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              <p>
                <LocalizedText
                  en='Click "Submit Claim" to proceed with your online claim.'
                  bn='আপনার ক্লেম অনলাইনে প্রসেস করার জন্য "সাবমিট ক্লেম" এ ক্লিক করুন।'
                />
              </p>
              <p>
                <LocalizedText
                  en="We humbly request you to attach all necessary documents."
                  bn="অনুগ্রহ করে প্রয়োজনীয় সকল কাগজপত্র সংযুক্ত করার বিনীত অনুরোধ রইলো।"
                />
              </p>
            </div>
          </div>
          <div className={`flex mx-auto`}>
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[55%] text-center mx-auto text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              <p>
                <LocalizedText
                  en="If you have any prior claim submitted, please Login to "
                  bn="পূর্বে কোন ক্লেম জমা দিয়ে থাকলে, "
                />
                <a
                  href={PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9C8639] underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#9C8639]/40"
                >
                  <LocalizedText en="My Portal" bn="My Portal" />
                </a>{' '}
                <LocalizedText en="and check the status." bn="এ লগইন করে স্ট্যাটাস চেক করুন।" />
              </p>
            </div>
          </div>
          <div
            className={`
           flex`}
          >
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[55%] text-center mx-auto text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              <ContactComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
