// import { Button } from '@/components/ui/button'
// import React from 'react'

// type Props = {
//   variant: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
//   text: string
//   className?: string
// }

// function GlobalButton({ variant, text, className }: Props) {
//   return (
//     <Button
//       variant={variant}
//       className={`global-p1
//                     w-[130px]  md:w-[160px] lg:w-[170px] xl:w-[180px] 2xl:w-[200px]
//                     h-[33px]  md:h-[42px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px]
//                     text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
//                     font-normal rounded-sm lg:rounded-md transition-all duration-200
//                 ${className} `}
//     >
//       {text}
//     </Button>
//   )
// }

// export default GlobalButton

// =====================================================================================================
// =====================================================================================================

// import { Button } from '@/components/ui/button'
// import React from 'react'

// type Props = {
//   variant?: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
//   text?: string
//   className?: string
//   children?: React.ReactNode
//   size?: 'small' | 'medium' | 'large'
// }

// function GlobalButton({
//   variant = 'default',
//   text,
//   className = '',
//   children,
//   size = 'medium',
// }: Props) {
//   return (
//     <Button
//       variant={variant}
//       className={`global-p1
//         text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
//         font-normal rounded-sm lg:rounded-md transition-all duration-200
//         ${
//           size === 'medium'
//             ? ' w-[130px] md:w-[160px] lg:w-[170px] xl:w-[180px] 2xl:w-[200px] h-[33px] md:h-[42px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px] '
//             : size === 'small'
//               ? ''
//               : ' w-[150px] md:w-[180px] lg:w-[190px] xl:w-[220px] 2xl:w-[250px] h-[30px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] '
//         }
//         ${className}`}
//     >
//       {children ?? text}
//     </Button>
//   )
// }

// export default GlobalButton

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  variant?: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
  text?: string
  className?: string
  children?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
} & React.ButtonHTMLAttributes<HTMLButtonElement> // 👈 this adds native button prop

function GlobalButton({
  variant = 'default',
  text,
  className = '',
  children,
  size = 'medium',
  ...rest // 👈 rest includes onClick, onMouseEnter, etc.
}: Props) {
  const sizeStyles =
    size === 'medium'
      ? ` rounded-sm lg:rounded-md
          w-[130px] md:w-[160px] lg:w-[170px] xl:w-[180px] 2xl:w-[200px]
          h-[33px] md:h-[42px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px]
          text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
        `
      : size === 'small'
        ? `
          rounded-sm lg:rounded-md
          w-[100px] md:w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[150px]
          h-[28px] md:h-[34px] lg:h-[38px] xl:h-[40px] 2xl:h-[42px]
          text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] 2xl:text-[14px]
        `
        : `
        rounded-sm lg:rounded-md
          w-[150px] md:w-[180px] lg:w-[190px] xl:w-[220px] 2xl:w-[250px]
          h-[36px] md:h-[45px] lg:h-[50px] xl:h-[55px] 2xl:h-[60px]
          text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[18px]
        `

  return (
    <Button
      variant={variant}
      //   className={`global-p1 font-normal  transition-all duration-200 ${sizeStyles} ${className}`}
      className={cn(
        'global-p1 font-normal rounded-sm lg:rounded-md transition-all duration-300',
        sizeStyles,
        className,
      )}
      {...rest} // 👈 apply all extra button props (e.g., onClick)
    >
      {children ?? text}
    </Button>
  )
}

export default GlobalButton
