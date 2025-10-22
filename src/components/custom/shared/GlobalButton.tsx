// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
// import React from 'react'

// type Props = {
//   variant?: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
//   text?: string
//   className?: string
//   children?: React.ReactNode
//   size?: 'small' | 'medium' | 'large'
// } & React.ButtonHTMLAttributes<HTMLButtonElement> // 👈 this adds native button prop

// function GlobalButton({
//   variant = 'default',
//   text,
//   className = '',
//   children,
//   size = 'medium',
//   ...props
// }: Props) {
//   const sizeStyles =
//     size === 'medium'
//       ? ` rounded-sm lg:rounded-md
//           w-[130px] md:w-[160px] lg:w-[170px] xl:w-[180px] 2xl:w-[200px]
//           h-[33px] md:h-[42px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px]
//           text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
//         `
//       : size === 'small'
//         ? `
//           rounded-sm lg:rounded-md
//           w-[100px] md:w-[120px] lg:w-[130px] xl:w-[140px] 2xl:w-[150px]
//           h-[28px] md:h-[34px] lg:h-[38px] xl:h-[40px] 2xl:h-[42px]
//           text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] 2xl:text-[14px]
//         `
//         : `
//         rounded-sm lg:rounded-md
//           w-[150px] md:w-[180px] lg:w-[190px] xl:w-[220px] 2xl:w-[250px]
//           h-[36px] md:h-[45px] lg:h-[50px] xl:h-[55px] 2xl:h-[60px]
//           text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[18px]
//         `

//   return (
//     <Button
//       variant={variant}
//       //   className={`global-p1 font-normal  transition-all duration-200 ${sizeStyles} ${className}`}
//       className={cn(
//         'global-p2 font-normal rounded-sm lg:rounded-md transition-all duration-300',
//         sizeStyles,
//         className,
//       )}
//       {...props}
//     >
//       {children ?? text}
//     </Button>
//   )
// }

// export default GlobalButton

// ===================================================================================
// ===================================================================================
// ===================================================================================
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  variant?: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
  text?: string
  className?: string
  children?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function GlobalButton({
  variant = 'default',
  text,
  className = '',
  children,
  size = 'medium',
  ...props
}: Props) {
  // ✅ no fixed widths; just padding + height + font-size
  const sizeStyles =
    size === 'medium'
      ? `
        px-4 md:px-6 lg:px-7 xl:px-8 2xl:px-9
        h-[33px] md:h-[42px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px]
        text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
        rounded-sm lg:rounded-md
      `
      : size === 'small'
        ? `
        px-3 md:px-4 lg:px-5 xl:px-5 2xl:px-6
        h-[28px] md:h-[34px] lg:h-[38px] xl:h-[40px] 2xl:h-[42px]
        text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] 2xl:text-[14px]
        rounded-sm lg:rounded-md
      `
        : `
        px-5 md:px-7 lg:px-8 xl:px-10 2xl:px-12
        h-[36px] md:h-[45px] lg:h-[50px] xl:h-[55px] 2xl:h-[60px]
        text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[18px]
        rounded-sm lg:rounded-md
      `

  return (
    <Button
      variant={variant}
      className={cn(
        'global-p2 font-normal transition-all duration-300',
        'inline-flex items-center justify-center whitespace-nowrap', // 👈 grows with content, single line
        sizeStyles,
        className,
      )}
      {...props}
    >
      {/* render children first if provided, else text */}
      {children ?? text}
    </Button>
  )
}

export default GlobalButton
