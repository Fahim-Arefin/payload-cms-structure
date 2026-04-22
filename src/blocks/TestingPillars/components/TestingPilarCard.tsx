import { TestingPillarsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  data: NonNullable<TestingPillarsBlockType['testingPillars']>[number]
  className?: string
}

function TestingPilarCard({ data, className }: Props) {
  return <div>TestingPilarCard</div>
}

export default TestingPilarCard
