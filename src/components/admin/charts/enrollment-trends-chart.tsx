
"use client"

import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", students: 186 },
  { month: "February", students: 305 },
  { month: "March", students: 237 },
  { month: "April", students: 73 },
  { month: "May", students: 209 },
  { month: "June", students: 214 },
  { month: "July", students: 250 },
  { month: "August", students: 310 },
  { month: "September", students: 280 },
  { month: "October", students: 320 },
  { month: "November", students: 290 },
  { month: "December", students: 340 },
]

const chartConfig = {
  students: {
    label: "New Students",
    color: "hsl(var(--chart-1))",
  },
}

export function EnrollmentTrendsChart() {
  return (
    <ChartContainer config={chartConfig} className="w-full h-80">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="students"
          type="natural"
          stroke="var(--color-students)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
