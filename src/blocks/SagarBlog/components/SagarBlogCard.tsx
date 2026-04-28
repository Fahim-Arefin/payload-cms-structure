import { News } from '@/payload-types'
import { SagarBlogBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: SagarBlogBlockType
  data: NonNullable<News['newsItems']>[number]
  index: number
  className?: string
  height?: string
  padding?: string
}

function SagarBlogCard({ data, index, className, height, padding, block }: Props) {
  return <div>SagarBlogCard</div>
}

export default SagarBlogCard
