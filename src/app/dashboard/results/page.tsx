import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const resultsData = [
    { semester: 1, gpa: "3.5", status: "Passed" },
    { semester: 2, gpa: "3.7", status: "Passed" },
    { semester: 3, gpa: "3.6", status: "Passed" },
    { semester: 4, gpa: "3.8", status: "Passed" },
];

export default function ResultsPage() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Results</h2>
      <Card>
        <CardHeader>
          <CardTitle>Examination Results</CardTitle>
           <CardDescription>
                Summary of your academic performance by semester.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Semester</TableHead>
                <TableHead>GPA (out of 4.0)</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resultsData.map((item) => (
                <TableRow key={item.semester}>
                  <TableCell className="font-medium">Semester {item.semester}</TableCell>
                  <TableCell>{item.gpa}</TableCell>
                  <TableCell className="text-right">{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
