import { EmployeeBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import EmployeeCard from './EmployeeCard'

type Props = {
  block: EmployeeBlockType
}

function EmployeeGrid({ block }: Props) {
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
    gap-2 
    "
    >
      {block?.employeeGroup?.employees?.map((employee, index) => (
        <EmployeeCard key={index} employee={employee} />
      ))}
    </div>
  )
}

export default EmployeeGrid
