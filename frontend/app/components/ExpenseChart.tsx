"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Streaming", value: 45 },
  { name: "Music", value: 20 },
  { name: "Productivity", value: 15 },
  { name: "Other", value: 20 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function ExpenseChart() {
  return (
    <ChartContainer
      config={{
        streaming: {
          label: "Streaming",
          color: COLORS[0],
        },
        music: {
          label: "Music",
          color: COLORS[1],
        },
        productivity: {
          label: "Productivity",
          color: COLORS[2],
        },
        other: {
          label: "Other",
          color: COLORS[3],
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

