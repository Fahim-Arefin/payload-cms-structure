'use client'

import { useCarousel } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'


export function CarouselPrevButton() {
  const { scrollPrev } = useCarousel()

  return (
    <div className="flex justify-center mt-4 mb-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={scrollPrev}
        className="bg-transparent border border-[#1E1E1E] text-[#1E1E1E] hover:bg-orange-700 w-10 h-10 rounded-full"
      >
        <ArrowLeft className="w-8 h-8" />
      </Button>
    </div>
  )
}
