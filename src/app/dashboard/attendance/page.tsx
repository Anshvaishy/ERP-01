import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const attendanceData = [
  { course: "Advanced Web Development", attended: 28, total: 30, percentage: 93 },
  { course: "Data Structures & Algorithms", attended: 25, total: 30, percentage: 83 },
  { course: "Database Management Systems", attended: 30, total: 30, percentage: 100 },
  { course: "Operating Systems", attended: 24, total: 30, percentage: 80 },
  { course: "Artificial Intelligence", attended: 29, total: 30, percentage: 97 },
  { course: "Software Engineering", attended: 26, total: 30, percentage: 87 },
];

export default function AttendancePage() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Attendance</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Classes Attended</TableHead>
                <TableHead>Total Classes</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((item) => (
                <TableRow key={item.course}>
                  <TableCell className="font-medium">{item.course}</TableCell>
                  <TableCell>{item.attended}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell className="text-right">
                     <Badge
                      variant={item.percentage < 85 ? "destructive" : "default"}
                    >
                      {item.percentage}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
