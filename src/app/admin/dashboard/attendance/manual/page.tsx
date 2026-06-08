
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { db, Subject, Student, AttendanceRecord } from '@/lib/local-storage-db';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ManualAttendancePage() {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<Record<string, 'Present' | 'Absent'>>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    setSubjects(db.getAll('subjects'));
    // Listen for custom event to reload data
    const handleDataChange = (event: any) => {
        if (event.detail.table === 'subjects') {
            setSubjects(db.getAll('subjects'));
        }
    };
    window.addEventListener('db-change', handleDataChange);
    return () => window.removeEventListener('db-change', handleDataChange);
  }, []);

  const handleSubjectChange = (subjectCode: string) => {
    setSelectedSubject(subjectCode);
    const subject = db.getById('subjects', subjectCode);
    if (!subject) return;

    const allStudents = db.getAll('students');
    const courseStudents = allStudents.filter(student => student.class === subject.class);
    setStudents(courseStudents);

    const initialAttendance: Record<string, 'Present' | 'Absent'> = {};
    courseStudents.forEach(s => {
      initialAttendance[s.roll] = 'Present'; // Default to present
    });
    setAttendance(initialAttendance);
  };

  const handleStatusChange = (studentRoll: string, status: 'Present' | 'Absent') => {
    setAttendance(prev => ({
      ...prev,
      [studentRoll]: status,
    }));
  };

  const handleSubmit = () => {
    if (!selectedSubject || !selectedDate) {
      toast({
        title: "Error",
        description: "Please select a subject and date.",
        variant: 'destructive',
      });
      return;
    }
    const subject = db.getById('subjects', selectedSubject);

    Object.entries(attendance).forEach(([roll, status]) => {
      const record: AttendanceRecord = {
        date: selectedDate,
        class: subject!.class,
        subject: selectedSubject,
        roll,
        status,
      };
      // In a real app, you might want to upsert instead of just adding
      db.add('attendance', record);
    });

    toast({
      title: "Attendance Submitted",
      description: `Attendance for ${subject?.name} on ${selectedDate} has been recorded.`,
    });
  };

  return (
    <>
      <Button asChild variant="outline" className="mb-4">
        <Link href="/admin/dashboard/attendance">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Smart Dashboard
        </Link>
      </Button>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Manual Attendance</h2>
      <Card>
        <CardHeader>
          <CardTitle>Mark Student Attendance</CardTitle>
          <CardDescription>Select a course to mark or correct attendance for a class.</CardDescription>
          <div className="pt-4 grid md:grid-cols-2 gap-4">
            <Select onValueChange={handleSubjectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.code} value={subject.code}>[{subject.class}] {subject.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          {selectedSubject ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No.</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => (
                    <TableRow key={student.roll}>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell className="text-right">
                        <RadioGroup
                          value={attendance[student.roll] || 'Present'}
                          onValueChange={(value: 'Present' | 'Absent') => handleStatusChange(student.roll, value)}
                          className="flex justify-end gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Present" id={`present-${student.roll}`} />
                            <Label htmlFor={`present-${student.roll}`}>Present</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Absent" id={`absent-${student.roll}`} />
                            <Label htmlFor={`absent-${student.roll}`}>Absent</Label>
                          </div>
                        </RadioGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 flex justify-end">
                <Button onClick={handleSubmit}>Submit Attendance</Button>
              </div>
            </>
          ) : (
            <p className="py-12 text-center text-muted-foreground">Please select a subject to view the student roster.</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
