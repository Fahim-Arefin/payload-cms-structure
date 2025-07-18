import GlobalButton from '@/components/custom/shared/GlobalButton'
import Link from 'next/link'
import { ContactComponent } from './CustomerCareCall'
export function CorporateClaim() {
  return (
    <>
      <div>
        <div className={``}>
          <div
            className={`
           flex mx-auto mt-12`}
          >
            <div className="flex mx-auto">
              <Link href="https://shantalife.com/claim.php">
                <GlobalButton variant="primary" className="" text="Submit Claim" />
              </Link>
            </div>
          </div>
          <div
            className={`
           flex mx-auto mt-12`}
          >
            <div className="mx-auto text-[20px]">
              Click on submit claim to submit your claim online. We humbly request you to attach all
              necessary documents.
            </div>
          </div>
          <div
            className={`
           flex mt-12`}
          >
            <div className="mx-auto text-[20px] w-1/2">
              For any further queries please contact.
              <ContactComponent />
            </div>
          </div>
          {/* <div className="mx-auto">
            <div className="text-[20px]">

              For any further queries please contact.

              <Link href="https://shantalife.com/claim.php">
                <GlobalButton variant="primary" className="" text="Lets Find More" />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}
