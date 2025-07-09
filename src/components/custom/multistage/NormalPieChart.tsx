'use client'

import React, { FC } from 'react'

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

type NormalPieChartProps = {
  data?: any[]
}

const COLORS = ['transparent', 'transparent', 'transparent', 'transparent', 'transparent']
const GOLD = '#a88b36'

const RADIAN = Math.PI / 180

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill={GOLD} textAnchor="middle" dominantBaseline="central" fontSize={14}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const NormalPieChart: FC<NormalPieChartProps> = ({ data = [] }) => {
  return (
    <div>
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={40}
        outerRadius={80}
            paddingAngle={5}
            label={renderLabel}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} stroke={GOLD} strokeWidth={2} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default NormalPieChart
