
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { db, Student, Marks, Subject } from '@/lib/local-storage-db';
import { HallTicketDialog } from '@/components/student-panel/hall-ticket-dialog';
import { TranscriptDialog } from '@/components/student-panel/transcript-dialog';
import { StatementOfGradeDialog } from '@/components/student-panel/statement-of-grade-dialog';

export default function ExaminationsPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [marks, setMarks] = useState<Marks[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cgpa, setCgpa] = useState('0.00');

  useEffect(() => {
    // Assuming a single student logs in for this demo.
    const session = db.get('session');
    if (session?.user) {
      const currentStudent = db.getAll('students').find(s => s.email === session.user);
      if (currentStudent) {
        setStudent(currentStudent);

        const allMarks = db.getAll('marks').filter(m => m.roll === currentStudent.roll);
        setMarks(allMarks);

        const studentSubjects = db.getAll('subjects').filter(s => s.class === currentStudent.class);
        setSubjects(studentSubjects);

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
    return <div>Loading examination data...</div>;
  }

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'bg-green-500' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-green-400' };
    if (percentage >= 70) return { grade: 'B+', color: 'bg-yellow-500' };
    if (percentage >= 60) return { grade: 'B', color: 'bg-yellow-400' };
    if (percentage >= 50) return { grade: 'C', color: 'bg-orange-500' };
    if (percentage >= 40) return { grade: 'P', color: 'bg-red-500' };
    return { grade: 'F', color: 'bg-red-600' };
  };

  const subjectMap = subjects.reduce((acc, s) => {
      acc[s.code] = s.name;
      return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Examination & Assessment</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
         <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{cgpa}</p>
              <p className="text-muted-foreground">Cumulative GPA</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Credentials</CardTitle>
              <CardDescription>Download your official documents.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <HallTicketDialog student={student} subjects={subjects} />
                <TranscriptDialog student={student} marks={marks} subjects={subjects} cgpa={cgpa} />
                <StatementOfGradeDialog student={student} />
            </CardContent>
          </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Internal Assessment History</CardTitle>
          <CardDescription>A comprehensive overview of your internal assessment performance.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead className="text-right">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marks.map((mark, index) => {
                const percentage = (mark.obtained / mark.total) * 100;
                const { grade, color } = getGrade(percentage);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{subjectMap[mark.subject] || mark.subject}</TableCell>
                    <TableCell><Badge variant="secondary">{mark.examType}</Badge></TableCell>
                    <TableCell>{mark.obtained} / {mark.total}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={`${color} text-white`}>{grade}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
