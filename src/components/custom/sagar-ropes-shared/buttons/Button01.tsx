// import { Button } from '@/components/ui/button'
// import Image from 'next/image'
// import React from 'react'
// import Btn01Icon from '/public/assets/icons/btn01Icon.png'

// type Props = {
//   children?: React.ReactNode
//   className?: string
// } & React.ButtonHTMLAttributes<HTMLButtonElement>

// function Button01({ children, className, ...props }: Props) {
//   return (
//     <Button
//       {...props}
//       className={`rounded-none font-manrope text-white-1 bg-cyan hover:bg-cyan group
//         hover:animate-hoverNudge ${className}`}
//     >
//       <div>{children}</div>
//       <div className="bg-white-1 w-[25px] h-[25px] flex justify-center items-center ">
//         <Image
//           src={Btn01Icon}
//           alt="btn icon"
//           width={20}
//           height={20}
//           className="w-[16px] h-[16px] group-hover:rotate-[43deg] transition-all duration-300 ease-in"
//         />
//       </div>
//     </Button>
//   )
// }

// export default Button01

// =============================================================================
// =============================================================================
// =============================================================================
'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useRef } from 'react'
import Btn01Icon from '/public/assets/icons/btn01Icon.png'

type Props = {
  children?: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function Button01({ children, className, ...props }: Props) {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const triggerNudge = () => {
    const el = btnRef.current
    if (!el) return
    el.classList.remove('animate-hoverNudge')
    // force reflow so animation can restart
    void el.offsetWidth
    el.classList.add('animate-hoverNudge')
  }

  return (
    <Button
      {...props}
      ref={btnRef}
      onMouseEnter={(e) => {
        triggerNudge()
        props.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        triggerNudge()
        props.onMouseLeave?.(e)
      }}
      className={`rounded-none font-manrope text-white-1 bg-cyan hover:bg-cyan group global-link font-bold
        h-7 xl:h-9
        px-2 xl:px-4
        ${className ?? ''}`}
    >
      <div>{children}</div>

      <div
        className="bg-white-1 flex justify-center items-center
      w-[20px] xl:w-[25px] 
      h-[20px] xl:h-[25px]"
      >
        <Image
          src={Btn01Icon}
          alt="btn icon"
          className="group-hover:rotate-[43deg] transition-all duration-300 ease-in
          w-[12px] xl:w-[16px] 
          h-[12px] xl:h-[16px]"
        />
      </div>
    </Button>
  )
}

export default Button01
