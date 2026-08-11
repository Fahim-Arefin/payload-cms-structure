import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import BasicHeroSection from './components/BasicHeroSection'

type Props = {
  block: BasicHeroBlockType
  params: Record<string, string>
}
function BasicHeroBlock({ block }: Props) {
  return <BasicHeroSection block={block} />
}

export default BasicHeroBlock
