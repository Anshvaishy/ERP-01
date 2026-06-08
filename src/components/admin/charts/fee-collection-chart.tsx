
"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { db, FeeRecord } from "@/lib/local-storage-db"
import { programDetailsData } from "@/lib/program-details"

const chartConfig = {
  amount: {
    label: "Amount (₹)",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
}

export function FeeCollectionChart() {
  const [chartData, setChartData] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    const fees = db.getAll('fees');
    const students = db.getAll('students');
    const hostelRecords = db.getAll('hostel');
    
    let totalPaid = 0;
    let totalDue = 0;

    students.forEach(student => {
       const programInfo = programDetailsData.find(p => p.programName === student.class) || programDetailsData.find(p => p.programName === "Default")!;
       const feeStructure = programInfo.fees;
       const isInHostel = hostelRecords.some(hr => hr.roll === student.roll);
       
       let totalForStudent = feeStructure.tuition + feeStructure.examination + feeStructure.other;
       if (isInHostel) {
         totalForStudent += feeStructure.hostel;
       }

       const studentFees = fees.filter(f => f.roll === student.roll);
       const paidForStudent = studentFees.reduce((sum, f) => sum + f.amount, 0);
       
       totalPaid += paidForStudent;
       totalDue += (totalForStudent - paidForStudent);
    });
    
    setChartData([
      { status: "paid", amount: totalPaid, fill: "var(--color-paid)" },
      { status: "pending", amount: totalDue > 0 ? totalDue : 0, fill: "var(--color-pending)" },
    ]);
  }, []);

  return (
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="status"
            innerRadius={60}
            strokeWidth={5}
          >
          </Pie>
        </PieChart>
      </ChartContainer>
  )
}
