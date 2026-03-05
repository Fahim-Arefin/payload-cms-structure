import React from 'react'
import HashScroller from './HashScroller'

type Props = {
  bgColor: string | null | undefined
  id: string | null | undefined
  children: React.ReactElement
}

function WithHashScroller({ bgColor, id, children }: Props) {
  return (
    <>
      <HashScroller />
      <section
        style={{
          backgroundColor: bgColor || '',
        }}
        id={id || ''}
      >
        {children}
      </section>
    </>
  )
}

export default WithHashScroller
