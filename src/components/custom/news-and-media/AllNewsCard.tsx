import { AllNewsDataType } from '@/types'
import { Share2 } from 'lucide-react'

type Props = {
  data: AllNewsDataType
}
function AllNewsCard({ data }: Props) {
  return (
    <div>
      {/* image */}
      <div>
        <img
          src={data.image}
          alt="new image"
          className="h-[585px]
            w-full
          object-cover
          "
        />
      </div>
      <div className="flex justify-between pt-4">
        <span>news</span>
        <Share2 className="inline" />
      </div>
      <p>{data.title}</p>
    </div>
  )
}

export default AllNewsCard
