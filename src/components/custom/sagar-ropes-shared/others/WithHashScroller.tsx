// import React from 'react'
// import HashScroller from './HashScroller'

// type Props = {
//   bgColor: string | null | undefined
//   id: string | null | undefined
//   children: React.ReactNode
//   className?: string
// }

// function WithHashScroller({ bgColor, id, children, className }: Props) {
//   const bgClass = bgColor ? `bg-${bgColor}` : ''

//   return (
//     <div className="relative z-20">
//       <HashScroller />
//       <section id={id ?? undefined} className={`${bgClass} ${className}`}>
//         {children}
//       </section>
//     </div>
//   )
// }

// export default WithHashScroller
import React from 'react'
import HashScroller from './HashScroller'

type Props = {
  bgColor: string | null | undefined
  id: string | null | undefined
  children: React.ReactNode
  className?: string
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

function WithHashScroller({ bgColor, id, children, className }: Props) {
  const bgClass = bgColor ? bgColorMap[bgColor] || '' : ''

  return (
    <div className="relative z-20">
      <HashScroller />
      <section id={id ?? undefined} className={`${bgClass} ${className ?? ''}`}>
        {children}
      </section>
    </div>
  )
}

export default WithHashScroller
