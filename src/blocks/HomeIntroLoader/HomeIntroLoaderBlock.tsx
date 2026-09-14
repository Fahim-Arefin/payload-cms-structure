import { HomeIntroLoaderBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: HomeIntroLoaderBlockType
  params: Record<string, string>
}

function HomeIntroLoaderBlock({ block }: Props) {
  if (!block?.showIntroLoader) {
    return null
  }

  // The frontend layout owns the overlay so it survives the page loading boundary.
  return null
}

export default HomeIntroLoaderBlock
