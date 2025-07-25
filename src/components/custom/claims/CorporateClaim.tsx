import GlobalButton from '@/components/custom/shared/GlobalButton'
import Link from 'next/link'
import { ContactComponent } from './CustomerCareCall'
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
              <Link href="https://portal.shantalife.com/">
                <GlobalButton variant="secondary" className="" text="Submit Claim" size="small" />
              </Link>
            </div>
          </div>
          <div
            className={`
           flex mx-auto`}
          >
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-1/2 text-center mx-auto text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              <p>Click "Submit Claim" to proceed with your online claim.</p>
              <p>We humbly request you to attach all necessary documents.</p>
            </div>
          </div>
          <div
            className={`
           flex`}
          >
            <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-1/2 text-center mx-auto text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
              <ContactComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
