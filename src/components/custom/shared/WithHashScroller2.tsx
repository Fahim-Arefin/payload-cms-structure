import React from 'react'
import HashScroller from './HashScroller'

type Props = {
  topToMidBgColor: string | null | undefined
  midToBottomBgColor: string | null | undefined
  id: string | null | undefined
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

const bgColorMap: Record<string, string> = {
  'white-1': 'bg-white-1',
  'white-2': 'bg-white-2',
  'white-3': 'bg-white-3',
  'secondary-1': 'bg-secondary-1',
  'secondary-2': 'bg-secondary-2',
  'primary-1-30': 'bg-primary-1/30',
  'primary-1-50': 'bg-primary-1/50',
}

function WithHashScroller2({
  topToMidBgColor,
  midToBottomBgColor,
  id,
  children,
  className,
  contentClassName,
}: Props) {
  const topBgClass = topToMidBgColor ? bgColorMap[topToMidBgColor] || '' : ''
  const bottomBgClass = midToBottomBgColor ? bgColorMap[midToBottomBgColor] || '' : ''

  return (
    <div className="relative z-20">
      <HashScroller />

      <section id={id ?? undefined} className={`relative overflow-hidden ${className ?? ''}`}>
        {/* split background */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className={`h-1/2 w-full ${topBgClass}`} />
          <div className={`h-1/2 w-full ${bottomBgClass}`} />
        </div>

        {/* content */}
        <div className={`relative z-10 ${contentClassName ?? ''}`}>{children}</div>
      </section>
    </div>
  )
}

export default WithHashScroller2
