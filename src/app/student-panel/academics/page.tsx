
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { db, Subject, Student, Faculty, Marks } from '@/lib/local-storage-db';
import { TranscriptDialog } from '@/components/student-panel/transcript-dialog';
import { AttendanceReportDialog } from '@/components/student-panel/attendance-report-dialog';

export default function AcademicsPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [facultyMap, setFacultyMap] = useState<Record<string, string>>({});
  const [marks, setMarks] = useState<Marks[]>([]);
  const [attendanceSummary, setAttendanceSummary] = useState<any[]>([]);
  const [cgpa, setCgpa] = useState('0.00');

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
      const currentStudent = db.getAll('students').find(s => s.email === session.user);
      if (currentStudent) {
        setStudent(currentStudent);

        const studentSubjects = db.getAll('subjects').filter(s => s.class === currentStudent.class);
        setSubjects(studentSubjects);

        const allFaculty = db.getAll('faculty');
        const newFacultyMap: Record<string, string> = {};
        allFaculty.forEach(f => { newFacultyMap[f.id] = f.name; });
        setFacultyMap(newFacultyMap);

        const allMarks = db.getAll('marks').filter(m => m.roll === currentStudent.roll);
        setMarks(allMarks);
        
        const allAttendance = db.getAll('attendance').filter(a => a.roll === currentStudent.roll);
        const summary: any[] = [];
        studentSubjects.forEach(subject => {
            const subjectAttendanceRecords = allAttendance.filter(a => a.subject === subject.code);
            const attended = subjectAttendanceRecords.filter(a => a.status === 'Present').length;
            const total = subjectAttendanceRecords.length;
            const percentage = total > 0 ? Math.round((attended / total) * 100) : 100;
            summary.push({ course: subject.name, attended, total, percentage });
        });
        setAttendanceSummary(summary);

        if (allMarks.length > 0) {
          const uniqueSubjects = [...new Set(allMarks.map(m => m.subject))];
          const totalPoints = uniqueSubjects.reduce((acc, subjectCode) => {
              const subjectMarks = allMarks.filter(m => m.subject === subjectCode);
              const totalObtained = subjectMarks.reduce((sum, m) => sum + m.obtained, 0);
              const totalMax = subjectMarks.reduce((sum, m) => sum + m.total, 0);
              if (totalMax === 0) return acc;
              const percentage = (totalObtained / totalMax) * 100;
              return acc + (percentage / 100 * 4);
          }, 0);

          const calculatedCgpa = uniqueSubjects.length > 0 ? (totalPoints / uniqueSubjects.length).toFixed(2) : '0.00';
          setCgpa(calculatedCgpa);
        }
      }
    }
  }, []);

  if (!student) {
    return <div>Loading student data...</div>;
  }

  const subjectMap = subjects.reduce((acc, s) => {
      acc[s.code] = s.name;
      return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Academics Overview</h2>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Performance & Marks</CardTitle>
          <CardDescription>An overview of your academic performance.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold">Program Enrolled</p>
                    <p className="text-muted-foreground">{student.class}</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold">Cumulative GPA</p>
                    <p className="text-xl font-bold">{cgpa}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <p className="font-semibold">Total Credits</p>
                    <p className="text-xl font-bold">{subjects.length * 4} (Estimated)</p>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>Exam Type</TableHead>
                        <TableHead>Marks</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {marks.length > 0 ? (
                  marks.map((mark, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{subjectMap[mark.subject] || mark.subject}</TableCell>
                        <TableCell><Badge variant="secondary">{mark.examType}</Badge></TableCell>
                        <TableCell>{mark.obtained} / {mark.total}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center h-24">No marks entered yet.</TableCell>
                  </TableRow>
                )}
                </TableBody>
            </Table>
            <div className="mt-4">
              <TranscriptDialog student={student} marks={marks} subjects={subjects} cgpa={cgpa} />
            </div>
        </CardContent>
      </Card>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Attendance Report</CardTitle>
           <CardDescription>Your attendance across all subjects this semester.</CardDescription>
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
              {attendanceSummary.length > 0 ? (
                attendanceSummary.map((item) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">No attendance records found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
           <div className="mt-4">
              <AttendanceReportDialog student={student} attendanceSummary={attendanceSummary} />
            </div>
        </CardContent>
      </Card>
    </>
  );
}
