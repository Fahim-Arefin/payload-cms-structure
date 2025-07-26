import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Search } from 'lucide-react'
import Link from 'next/link'

function TopHeader({ className }: { className?: string }) {
  return (
    <div
      className={`w-full px-4 sm:px-6 md:px-12 py-2  lg:h-[40px] 2xl:h-fit
                  bg-[rgba(155,133,56,0.55)] text-white 
                  flex justify-between items-center ${className}`}
    >
      {/* Left: Social icon */}

      {/* <PiFacebookLogo className="text-3xl" /> */}
      <div></div>
      {/* Right: Agent + Language Switch + Search */}
      <div className="flex items-center gap-4">
        <Link href="/agent-onboarding">
          <Button variant="link" className="text-white px-3 py-1 font-medium underline">
            I’m an Agent
          </Button>
        </Link>

        {/* Language Toggle - Hidden for now */}
        {/* <div className="flex items-center bg-[rgba(217,217,217,1)] rounded-full h-[30px] w-[100px] px-2">
          <ToggleGroup type="single" defaultValue="en" className="text-[#535353] text-[14px]">
            <ToggleGroupItem
              value="bn"
              aria-label="Toggle Bangla"
              className="h-[24px] w-[41px] rounded-[17px] 
               hover:bg-[rgba(237,113,37,0.28)] 
               data-[state=on]:bg-[rgba(237,113,37,0.28)]
               data-[state=on]:text-[rgba(237,113,37,1)]"
            >
              BN
            </ToggleGroupItem>
            <ToggleGroupItem
              value="en"
              aria-label="Toggle English"
              className="h-[24px] w-[41px] rounded-[17px] 
             hover:bg-[rgba(237,113,37,0.28)] 
             data-[state=on]:bg-[rgba(237,113,37,0.28)] 
             data-[state=on]:text-[rgba(237,113,37,1)]"
            >
              EN
            </ToggleGroupItem>
          </ToggleGroup>
        </div> */}

        {/* <Search size={18} className="cursor-pointer hover:text-gray-300" /> */}
      </div>
    </div>
  )
}

export default TopHeader
