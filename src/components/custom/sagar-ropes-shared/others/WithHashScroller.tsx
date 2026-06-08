// import React from 'react'
// import HashScroller from './HashScroller'

// type Props = {
//   bgColor: string | null | undefined
//   id: string | null | undefined
//   children: React.ReactElement
// }

// function WithHashScroller({ bgColor, id, children }: Props) {
//   return (
//     <>
//       <HashScroller />
//       <section
//         style={{
//           backgroundColor: bgColor || '',
//         }}
//         id={id || ''}
//       >
//         {children}
//       </section>
//     </>
//   )
// }

// export default WithHashScroller

import React from 'react'
import HashScroller from './HashScroller'

type Props = {
  bgColor: string | null | undefined
  id: string | null | undefined
  children: React.ReactNode
}

function WithHashScroller({ bgColor, id, children }: Props) {
  const bgClass = bgColor ? `bg-${bgColor}` : ''

  return (
    <div className="relative z-20">
      <HashScroller />
      <section id={id ?? undefined} className={bgClass}>
        {children}
      </section>
    </div>
  )
}

export default WithHashScroller
