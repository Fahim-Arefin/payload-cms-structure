import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  variant?: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
  text?: string
  className?: string
  children?: React.ReactNode
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

function GlobalButton({
  variant = 'default',
  text,
  className = '',
  children,
  size = 'small',
  ...props
}: Props) {
  // ✅ no fixed widths; just padding + height + font-size
  // const sizeStyles =
  //   size === 'small'
  //     ? `
  //       px-3 md:px-4 lg:px-5 xl:px-5 2xl:px-6
  //       h-[28px] md:h-[30px] lg:h-[34px] xl:h-[40px] 2xl:h-[42px]
  //       text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] 2xl:text-[14px]
  //       rounded-sm lg:rounded-md
  //     `
  //     : size === 'medium'
  //       ? `
  //       px-4 md:px-6 lg:px-7 xl:px-8 2xl:px-9
  //       h-[33px] md:h-[36px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px]
  //       text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
  //       rounded-sm lg:rounded-md
  //     `
  //       : size === 'large'
  //         ? `
  //       px-5 md:px-7 lg:px-8 xl:px-10 2xl:px-12
  //       h-[36px] md:h-[40px] lg:h-[50px] xl:h-[55px] 2xl:h-[60px]
  //       text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[18px]
  //       rounded-sm lg:rounded-md
  //     `
  //         : `
  //       px-7 md:px-8 lg:px-11 xl:px-14 2xl:px-20
  //       h-[36px] md:h-[40px] lg:h-[50px] xl:h-[55px] 2xl:h-[60px]
  //       text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[18px]
  //       rounded-sm lg:rounded-md
  //     ` // extraLarge

  // ✅ no fixed widths; just padding + height + font-size
  const sizeStyles =
    size === 'extraSmall'
      ? `
        px-2 md:px-3 lg:px-4 xl:px-4 2xl:px-5
        h-[24px] md:h-[26px] lg:h-[28px] xl:h-[32px] 2xl:h-[34px]
        text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] 2xl:text-[13px]
        rounded-sm lg:rounded-md
      `
      : size === 'small'
        ? `
        px-3 md:px-4 lg:px-5 xl:px-5 2xl:px-6
        h-[28px] md:h-[30px] lg:h-[34px] xl:h-[40px] 2xl:h-[42px]
        text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] 2xl:text-[14px]
        rounded-sm lg:rounded-md
      `
        : size === 'medium'
          ? `
        px-4 md:px-6 lg:px-7 xl:px-8 2xl:px-9
        h-[33px] md:h-[36px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px]
        text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
        rounded-sm lg:rounded-md
      `
          : size === 'large'
            ? `
        px-5 md:px-7 lg:px-8 xl:px-10 2xl:px-12
        h-[36px] md:h-[40px] lg:h-[50px] xl:h-[55px] 2xl:h-[60px]
        text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[18px]
        rounded-sm lg:rounded-md
      `
            : `
        px-7 md:px-8 lg:px-11 xl:px-14 2xl:px-20
        h-[36px] md:h-[40px] lg:h-[50px] xl:h-[55px] 2xl:h-[60px]
        text-[12px] sm:text-[13px] md:text-[15px] lg:text-[16px] 2xl:text-[18px]
        rounded-sm lg:rounded-md
      ` // extraLarge

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
