import React from 'react'

type Props = {
  data: {
    title: string
    description: string
  }
}

function CHFInfoSection({ data }: Props) {
  return (
    <div className={`container-padding bg-[#9A4E46]`}>
      <div className="space-y-2 md:space-y-4">
        <h1 className="global-h2 font-semibold uppercase text-white">{data?.title}</h1>
        <div></div>
        {/* Scoped styling for description */}
        <div
          className="global-span font-light text-justify text-white/90"
          // You can add a class like "content" here to apply scoped styles to avoid conflicting with Tailwind's global styles
          dangerouslySetInnerHTML={{ __html: data?.description }}
          style={{
            // In-line CSS to ensure it is not impacted by Tailwind's `prose` or any global list styling
            listStyleType: 'disc', // Apply list-style to `ul` only
            marginTop: '0', // Ensure no margin above
            marginBottom: '0', // Ensure no margin below
          }}
        />
      </div>
    </div>
  )
}

export default CHFInfoSection
