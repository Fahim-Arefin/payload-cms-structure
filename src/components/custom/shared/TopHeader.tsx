// import { Button } from '@/components/ui/button'
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
// import Link from 'next/link'

// function TopHeader({ className }: { className?: string }) {
//   return (
//     <div
//       className={`w-full px-4 sm:px-6 md:px-12 py-2  lg:h-[40px] 2xl:h-fit
//                   bg-[rgba(155,133,56,0.55)] text-white
//                   flex justify-between items-center ${className}`}
//     >
//       {/* Left: Social icon */}

//       {/* <PiFacebookLogo className="text-3xl" /> */}
//       <div></div>
//       {/* Right: Agent + Language Switch + Search */}
//       <div className="flex items-center gap-4 ">
//         <Link href="/premium-calculator#calculator" className="">
//           <Button variant="link" className="text-white px-3 py-1 font-medium underline">
//             Premium Calculator
//           </Button>
//         </Link>
//         <Link href="/agent-onboarding">
//           <Button variant="link" className="text-white px-3 py-1 font-medium underline">
//             I’m an Agent
//           </Button>
//         </Link>

//         {/* Language Toggle - Hidden for now */}
//         <div className="flex items-center bg-[rgba(217,217,217,1)] rounded-full h-[30px] w-[100px] px-2 ml-2">
//           <ToggleGroup type="single" defaultValue="en" className="text-[#535353] text-[14px]">
//             <ToggleGroupItem
//               value="bn"
//               aria-label="Toggle Bangla"
//               className="h-[24px] w-[41px] rounded-[17px]
//                hover:bg-[rgba(237,113,37,0.28)]
//                data-[state=on]:bg-[rgba(237,113,37,0.28)]
//                data-[state=on]:text-[rgba(237,113,37,1)]"
//             >
//               BN
//             </ToggleGroupItem>
//             <ToggleGroupItem
//               value="en"
//               aria-label="Toggle English"
//               className="h-[24px] w-[41px] rounded-[17px]
//              hover:bg-[rgba(237,113,37,0.28)]
//              data-[state=on]:bg-[rgba(237,113,37,0.28)]
//              data-[state=on]:text-[rgba(237,113,37,1)]"
//             >
//               EN
//             </ToggleGroupItem>
//           </ToggleGroup>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TopHeader

// =============================================================================================
// =============================================================================================
// =============================================================================================

// 'use client'

// import { Button } from '@/components/ui/button'
// import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
// import Link from 'next/link'
// import { useLanguage } from '@/context/LanguageContext'

// function TopHeader({ className }: { className?: string }) {
//   const { language, setLanguage } = useLanguage()

//   return (
//     <div
//       className={`w-full px-4 sm:px-6 md:px-12 py-2 lg:h-[40px] 2xl:h-fit
//                   bg-[rgba(155,133,56,0.55)] text-white
//                   flex justify-between items-center ${className}`}
//     >
//       <div />
//       <div className="flex items-center gap-4">
//         <Link href="/premium-calculator#calculator">
//           <Button variant="link" className="text-white px-3 py-1 font-medium underline">
//             Premium Calculator
//           </Button>
//         </Link>

//         <Link href="/agent-onboarding">
//           <Button variant="link" className="text-white px-3 py-1 font-medium underline">
//             I’m an Agent
//           </Button>
//         </Link>

//         <div className="flex items-center bg-[rgba(217,217,217,1)] rounded-full h-[30px] w-[100px] px-2">
//           <ToggleGroup
//             type="single"
//             value={language} // 👈 controlled
//             // onValueChange={(val) => {
//             //   if (val === 'en' || val === 'bn') setLanguage(val)
//             // }}
//             onValueChange={(val) => (val === 'en' || val === 'bn') && setLanguage(val)}
//             className="text-[#535353] text-[14px]"
//           >
//             <ToggleGroupItem
//               value="bn"
//               aria-label="Toggle Bangla"
//               className="h-[24px] w-[41px] rounded-[17px]
//                hover:bg-[rgba(237,113,37,0.28)]
//                data-[state=on]:bg-[rgba(237,113,37,0.28)]
//                data-[state=on]:text-[rgba(237,113,37,1)]"
//             >
//               BN
//             </ToggleGroupItem>
//             <ToggleGroupItem
//               value="en"
//               aria-label="Toggle English"
//               className="h-[24px] w-[41px] rounded-[17px]
//                hover:bg-[rgba(237,113,37,0.28)]
//                data-[state=on]:bg-[rgba(237,113,37,0.28)]
//                data-[state=on]:text-[rgba(237,113,37,1)]"
//             >
//               EN
//             </ToggleGroupItem>
//           </ToggleGroup>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TopHeader

// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================

'use client'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import useMounted from '@/hooks/useMounted'
import LocalizedText from './LocalizedText'

function TopHeader({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()
  const mounted = useMounted()

  // While not mounted, force a stable value that matches SSG (EN)
  const uiLang = mounted ? language : 'en'

  return (
    <div
      className={`w-full px-4 sm:px-6 md:px-12 py-2 lg:h-[40px] 2xl:h-fit
                  bg-[rgba(155,133,56,0.55)] text-white 
                  flex justify-between items-center ${className}`}
    >
      <div />

      <div className="flex items-center gap-4">
        <Link href="/premium-calculator#calculator">
          <Button variant="link" className="text-white px-3 py-1 font-medium underline text-xs">
            <LocalizedText en="Premium Calculator" bn="প্রিমিয়াম ক্যালকুলেটর" />
          </Button>
        </Link>

        <Link href="/agent-onboarding">
          <Button variant="link" className="text-white px-3 py-1 font-medium underline text-xs">
            <LocalizedText en="I'm an Agent" bn="এজেন্ট" />
          </Button>
        </Link>

        <div className="flex items-center bg-[rgba(217,217,217,1)] rounded-full h-[30px] w-[100px] px-2">
          <ToggleGroup
            type="single"
            value={uiLang}
            onValueChange={(val) => (val === 'en' || val === 'bn') && setLanguage(val)}
            className="text-[#535353] text-[14px]"
          >
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
        </div>
      </div>
    </div>
  )
}

export default TopHeader
