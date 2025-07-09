import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
  tooltipContent?: string
  className?: string
}

// Replace This Component with the <div></div> if it has className passed otherwise just remove the component
function ToolTip({ children, tooltipContent, className }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={`${className}`}>
          <div> {children}</div>
        </TooltipTrigger>
        <TooltipContent>
          {tooltipContent ? tooltipContent : 'This feature is under development'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToolTip
