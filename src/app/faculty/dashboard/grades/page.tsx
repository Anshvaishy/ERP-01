
'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db, Subject, Student, Faculty, Marks, AttendanceRecord } from "@/lib/local-storage-db";
import { useToast } from "@/hooks/use-toast";

export default function FacultyGradesPage() {
    const { toast } = useToast();
    const [faculty, setFaculty] = useState<Faculty | null>(null);
    const [courses, setCourses] = useState<Subject[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [marks, setMarks] = useState<Record<string, { obtained: string, total: string }>>({});
    const [attendance, setAttendance] = useState<Record<string, 'Present' | 'Absent'>>({});

    useEffect(() => {
        const session = db.get('session');
        if (session?.user) {
            const currentFaculty = db.getAll('faculty').find(f => f.email === session.user);
            if (currentFaculty) {
                setFaculty(currentFaculty);
                const assignedCourses = db.getAll('subjects').filter(s => s.facultyId === currentFaculty.id);
                setCourses(assignedCourses);
                if (assignedCourses.length > 0) {
                    setSelectedCourse(assignedCourses[0].code);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (selectedCourse) {
            const subject = db.getById('subjects', selectedCourse);
            const allStudents = db.getAll('students');
            const courseStudents = allStudents.filter(s => s.class === subject?.class);
            setStudents(courseStudents);

            // Load existing marks and attendance for the selected course
            const allMarks = db.getAll('marks');
            const initialMarks: Record<string, { obtained: string, total: string }> = {};
            courseStudents.forEach(s => {
                const studentMark = allMarks.find(m => m.roll === s.roll && m.subject === selectedCourse && m.examType === 'Assignment');
                initialMarks[s.roll] = { 
                    obtained: studentMark?.obtained.toString() || '',
                    total: studentMark?.total.toString() || '100',
                };
            });
            setMarks(initialMarks);
        }
    }, [selectedCourse]);

    const handleMarkChange = (roll: string, field: 'obtained' | 'total', value: string) => {
        setMarks(prev => ({
            ...prev,
            [roll]: { ...prev[roll], [field]: value }
        }));
    };

    const handleSaveGrades = () => {
        if (!selectedCourse) return;
        Object.entries(marks).forEach(([roll, mark]) => {
            const obtained = parseInt(mark.obtained);
            const total = parseInt(mark.total);
            if (!isNaN(obtained) && !isNaN(total)) {
                const existingMark = db.getAll('marks').find(m => m.roll === roll && m.subject === selectedCourse && m.examType === 'Assignment');
                if (existingMark) {
                    db.update('marks', existingMark.roll, { ...existingMark, obtained, total });
                } else {
                    const newMark: Marks = { roll, subject: selectedCourse, examType: 'Assignment', obtained, total };
                    db.add('marks', newMark);
                }
            }
        });
        toast({ title: "Grades Saved", description: "Student grades have been updated." });
    };

    const handleCourseChange = (courseCode: string) => {
        setSelectedCourse(courseCode);
    }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Manage Grades & Attendance</h2>
      <Card>
        <CardHeader>
          <CardTitle>Student Roster</CardTitle>
          <CardDescription>Select a course to view students and manage their grades.</CardDescription>
            <div className="pt-4 flex gap-4">
                <Select value={selectedCourse} onValueChange={handleCourseChange}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map(course => (
                             <SelectItem key={course.code} value={course.code}>{course.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-[150px]">Marks Obtained</TableHead>
                <TableHead className="w-[150px]">Total Marks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.roll}>
                  <TableCell className="font-medium">{student.roll}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                      <Input 
                        type="number"
                        value={marks[student.roll]?.obtained || ''}
                        onChange={(e) => handleMarkChange(student.roll, 'obtained', e.target.value)}
                      />
                  </TableCell>
                  <TableCell>
                      <Input
                        type="number"
                        value={marks[student.roll]?.total || '100'}
                        onChange={(e) => handleMarkChange(student.roll, 'total', e.target.value)}
                      />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <div className="mt-6 flex justify-end">
                <Button onClick={handleSaveGrades}>Save All Grades</Button>
           </div>
        </CardContent>
      </Card>
    </>
  );
}
