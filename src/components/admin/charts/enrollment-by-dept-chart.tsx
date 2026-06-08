
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { db, Subject } from "@/lib/local-storage-db"
import { useEffect, useState } from "react"

const chartConfig = {
  students: {
    label: "Students",
  },
  Engineering: { label: "Engineering", color: "hsl(var(--chart-1))" },
  Management: { label: "Management", color: "hsl(var(--chart-2))" },
  Biosciences: { label: "Biosciences", color: "hsl(var(--chart-3))" },
  "Legal Studies": { label: "Legal", color: "hsl(var(--chart-4))" },
  "Media Studies": { label: "Media", color: "hsl(var(--chart-5))" },
  Agriculture: { label: "Agriculture", color: "hsl(var(--chart-1))" },
}

export function EnrollmentByDeptChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const students = db.getAll('students');
    const subjects = db.getAll('subjects');
    const faculty = db.getAll('faculty');

    const departmentMap: Record<string, string> = {};
    faculty.forEach(f => {
      departmentMap[f.id] = f.department;
    });

    const subjectDeptMap: Record<string, string> = {};
    subjects.forEach(s => {
      subjectDeptMap[s.code] = departmentMap[s.facultyId] || 'Unknown';
    });

    const studentClassMap: Record<string, string> = {};
    students.forEach(s => {
      studentClassMap[s.roll] = s.class;
    });
    
    // This is a simplification. A real app would link students to departments more directly.
    // Here we assume a student's department is based on their class's faculty.
    const deptCounts: Record<string, number> = {};
    subjects.forEach(sub => {
        const dept = faculty.find(f => f.id === sub.facultyId)?.department || 'Other';
        if (!deptCounts[dept]) {
            deptCounts[dept] = 0;
        }
        const studentsInClass = students.filter(s => s.class === sub.class).length;
        deptCounts[dept] += studentsInClass;
    });

    // To avoid double counting, we'll just count students per class and map class to department.
    const classDeptMap: Record<string, string> = {};
    subjects.forEach(s => {
      if(!classDeptMap[s.class]) {
        const fac = faculty.find(f => f.id === s.facultyId);
        classDeptMap[s.class] = fac?.department || 'Other';
      }
    });

    const finalDeptCounts: Record<string, number> = {};
    students.forEach(s => {
      const dept = classDeptMap[s.class] || 'Other';
      if (!finalDeptCounts[dept]) {
        finalDeptCounts[dept] = 0;
      }
      finalDeptCounts[dept]++;
    });


    const data = Object.entries(finalDeptCounts).map(([department, count]) => ({
      department,
      students: count,
      fill: `var(--color-${department})`
    }));

    setChartData(data);

  }, []);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-64">
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 10,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="department"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <XAxis type="number" dataKey="students" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="students" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  )
}
