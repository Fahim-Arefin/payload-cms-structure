'use client'

import { PieChart, Pie, Cell } from 'recharts'
import { useMemo } from 'react'

const pieData = [
  { value: 10, color: '#ED7125' }, // 15%
  { value: 35, color: '#254525' }, // 35%
  { value: 55, color: '#583382' }, // 55%
]

const chartSize = 200
const innerRadius = 60
const outerRadius = 80

export default function PremiumChartSection() {
  const RADIAN = Math.PI / 180

  const renderCustomLines = useMemo(() => {
    const lines: any[] = []

    // Angles are manually calculated for correct Figma alignment
    const angleMap = [
      { angle: 75, color: '#ED7125', label: '15%' },
      { angle: -25, color: '#254525', label: '55%' },
    ]

    angleMap.forEach((item, index) => {
      const angle = -item.angle + 90
      const radius = outerRadius
      const startX = chartSize / 2 + radius * Math.cos(angle * RADIAN)
      const startY = chartSize / 2 + radius * Math.sin(angle * RADIAN)
      const endX = chartSize + 60
      const endY = index === 0 ? chartSize / 2 - 40 : chartSize / 2 + 20

      lines.push(
        <g key={index}>
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke={item.color}
            strokeDasharray="2 4"
            strokeWidth={1.5}
          />
          <circle cx={startX} cy={startY} r={3} fill={item.color} />
          <circle cx={endX} cy={endY} r={3} fill="#C2C2C2" />
        </g>
      )
    })

    return lines
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Chart */}
      <div className="relative w-full md:w-[200px] h-[200px]">
        <PieChart width={chartSize} height={chartSize}>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={90}
            endAngle={-270}
            stroke="white"
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>

        <svg
          width={chartSize + 100}
          height={chartSize}
          className="absolute top-0 left-0 pointer-events-none"
        >
          {renderCustomLines}
        </svg>
      </div>

      {/* Labels */}
      <div className="text-sm text-[#3A3A3C] flex-1 space-y-4 pt-2">
        <div className="space-y-1">
          <p className="font-semibold">
            15% of the Face Amount paid at the end of:
          </p>
          <ul className="list-disc list-inside ml-2">
            <li>¼ of the policy term</li>
            <li>½ of the policy term</li>
            <li>¾ of the policy</li>
          </ul>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-[#254525]">
            Final 55% paid at full maturity!
          </p>
        </div>

        <div className="border-l border-[#C2C2C2] pl-4 ml-1 space-y-1">
          <p className="font-semibold">Death Coverage</p>
          <p className="text-sm">
            100% of the Face Amount – regardless of any partial maturity benefits
          </p>
        </div>
      </div>
    </div>
  )
}
