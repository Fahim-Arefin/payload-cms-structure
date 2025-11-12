import { DescriptiveContentBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: DescriptiveContentBlockType
}

function DescriptiveContentBlock({ data }: Props) {
  console.log('data', data)
  return <div>{data?.items[0]?.title}</div>
}

export default DescriptiveContentBlock
