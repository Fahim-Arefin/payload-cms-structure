'use client'

import { useCarousel } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CarouselNextButton() {
  const { scrollNext } = useCarousel()

  return (
    <div className="flex justify-center mt-4 mb-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={scrollNext}
        className="bg-[#ED7125] text-white hover:bg-orange-700 w-10 h-10 rounded-full"
      >
        <ArrowRight className="w-8 h-8" />
      </Button>
    </div>
  )
}
