import { AllNewsDataType } from '@/types'

type Props = {
  data: AllNewsDataType
}
function AllNewsCard({ data }: Props) {
  return <div>{data.image}</div>
}

export default AllNewsCard
