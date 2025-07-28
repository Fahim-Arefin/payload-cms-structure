import Link from 'next/link'
import React from 'react'

type Props = {
  item: {
    image: string
    title: string
    link?: string
  }
}

function LevelUpCard({ item }: Props) {
  const CardContent = (
    <div
      className="relative flex justify-center items-center cursor-pointer
        bg-no-repeat bg-cover bg-center bg-[lightgray] text-white 
        transition-all duration-300 group overflow-hidden 
        h-[400px] md:h-[450px] lg:h-[500px]  xl:h-[700px]  2xl:h-[800px] "
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${item.image}')`,
        backgroundPosition: '50%',
        backgroundSize: 'cover',
      }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 z-0 rounded-[8px]" />

      {/* Content */}
      <div className="relative z-10 global-h1 font-semibold">{item?.title}</div>
    </div>
  )

  // If there's a link and it's not just a placeholder, wrap with Link
  if (item?.link && item.link !== '#') {
    return (
      <Link href={item.link}>
        {CardContent}
      </Link>
    )
  }

  // Otherwise return the card without navigation
  return CardContent
}

export default LevelUpCard
