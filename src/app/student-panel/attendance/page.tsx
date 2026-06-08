
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { db, AttendanceRecord, Student, Subject } from '@/lib/local-storage-db';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function AttendancePage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [attendanceSummary, setAttendanceSummary] = useState<any[]>([]);
  const [lowAttendanceSubjects, setLowAttendanceSubjects] = useState<string[]>([]);
  const [overallPercentage, setOverallPercentage] = useState(0);

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
        const currentStudent = db.getAll('students').find(s => s.email === session.user);
        if (currentStudent) {
            setStudent(currentStudent);
            const allAttendance = db.getAll('attendance');
            const studentAttendance = allAttendance.filter(a => a.roll === currentStudent.roll);
            const allSubjects = db.getAll('subjects').filter(s => s.class === currentStudent.class);

            const summary: any[] = [];
            const lowAtt: string[] = [];
            let totalAttended = 0;
            let totalConducted = 0;

            allSubjects.forEach(subject => {
                const subjectAttendanceRecords = studentAttendance.filter(a => a.subject === subject.code);
                const attended = subjectAttendanceRecords.filter(a => a.status === 'Present').length;
                const total = subjectAttendanceRecords.length;
                const percentage = total > 0 ? Math.round((attended / total) * 100) : 100;
                
                summary.push({
                course: subject.name,
                attended,
                total,
                percentage,
                });
                
                if (percentage < 75) {
                lowAtt.push(subject.name);
                }

                totalAttended += attended;
                totalConducted += total;
            });

            setAttendanceSummary(summary);
            setLowAttendanceSubjects(lowAtt);
            setOverallPercentage(totalConducted > 0 ? Math.round((totalAttended / totalConducted) * 100) : 100);
        }
    }
  }, []);

  if (!student) {
    return <div>Loading attendance data...</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Attendance Analytics</h2>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Overall Summary</CardTitle>
          <CardDescription>Your attendance across all subjects this semester.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="w-40">
              <Progress value={overallPercentage} className="h-4" />
            </div>
            <div>
              <p className="text-3xl font-bold">{overallPercentage}%</p>
              <p className="text-muted-foreground">Overall Attendance</p>
            </div>
          </div>
          {lowAttendanceSubjects.length > 0 && (
            <Alert variant="destructive" className="mt-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Low Attendance Warning</AlertTitle>
              <AlertDescription>
                Your attendance is below 75% in the following subjects: {lowAttendanceSubjects.join(', ')}. Please consult your faculty advisor.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Subject-wise Breakdown</CardTitle>
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
              {attendanceSummary.map((item) => (
                <TableRow key={item.course}>
                  <TableCell className="font-medium">{item.course}</TableCell>
                  <TableCell>{item.attended}</TableCell>
                  <TableCell>{item.total}</TableCell>
                  <TableCell className="text-right">
                     <Badge
                      variant={item.percentage < 75 ? "destructive" : "default"}
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
