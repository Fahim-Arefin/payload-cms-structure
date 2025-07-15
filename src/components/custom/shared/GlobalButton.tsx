import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
  variant: 'link' | 'primary' | 'glass' | 'default' | 'destructive' | 'outline' | 'secondary'
  text: string
  className?: string
}

function GlobalButton({ variant, text, className }: Props) {
  return (
    <Button
      variant={variant}
      className={`global-p1 
                    w-[130px]  md:w-[160px] lg:w-[170px] xl:w-[180px] 2xl:w-[200px]
                    h-[33px]  md:h-[42px] lg:h-[45px] xl:h-[48px] 2xl:h-[50px]
                    text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
                    font-normal rounded-sm lg:rounded-md transition-all duration-200
                ${className} `}
    >
      {text}
    </Button>
  )
}

export default GlobalButton
