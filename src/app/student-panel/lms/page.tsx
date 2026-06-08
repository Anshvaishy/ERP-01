
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Upload, BookOpen } from 'lucide-react';
import { db, Student, Subject, LmsAssignment, LmsMaterial, LmsSubmission } from '@/lib/local-storage-db';
import { SubmitAssignmentDialog } from '@/components/student-panel/lms/submit-assignment-dialog';
import { ViewMaterialDialog } from '@/components/student-panel/lms/view-material-dialog';

export default function LmsPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [assignments, setAssignments] = useState<LmsAssignment[]>([]);
  const [materials, setMaterials] = useState<LmsMaterial[]>([]);
  const [submissions, setSubmissions] = useState<LmsSubmission[]>([]);

  const loadData = () => {
    const session = db.get('session');
    if (session?.user) {
        const currentStudent = db.getAll('students').find(s => s.email === session.user);
        if (currentStudent) {
            setStudent(currentStudent);
            const allSubjects = db.getAll('subjects').filter(s => s.class === currentStudent.class);
            setSubjects(allSubjects);

            const subjectCodes = allSubjects.map(s => s.code);
            const allAssignments = db.getAll('lmsAssignments');
            const studentAssignments = allAssignments.filter(a => subjectCodes.includes(a.subjectCode));
            setAssignments(studentAssignments);

            const allMaterials = db.getAll('lmsMaterials');
            const studentMaterials = allMaterials.filter(m => subjectCodes.includes(m.subjectCode));
            setMaterials(studentMaterials);

            const allSubmissions = db.getAll('lmsSubmissions');
            const studentSubmissions = allSubmissions.filter(s => s.studentRoll === currentStudent.roll);
            setSubmissions(studentSubmissions);
        }
    }
  };
  
  useEffect(() => {
    loadData();
    window.addEventListener('db-change', loadData);
    return () => window.removeEventListener('db-change', loadData);
  }, []);

  if (!student) {
    return <div>Loading LMS data...</div>;
  }
  
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Learning Management System</h2>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
          <CardDescription>Your pending and submitted assignments.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map(assignment => {
                const subject = subjects.find(s => s.code === assignment.subjectCode);
                const isSubmitted = submissions.some(s => s.assignmentId === assignment.id);
                return (
                  <TableRow key={assignment.id}>
                    <TableCell>{subject?.name}</TableCell>
                    <TableCell className="font-medium">{assignment.title}</TableCell>
                    <TableCell>{assignment.dueDate}</TableCell>
                    <TableCell className="text-right">
                      {isSubmitted ? (
                        <span className="text-green-600 font-semibold">Submitted</span>
                      ) : (
                        <SubmitAssignmentDialog student={student} assignment={assignment} />
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Course Materials</CardTitle>
          <CardDescription>Access lecture notes, presentations, and recordings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               {materials.map(material => {
                const subject = subjects.find(s => s.code === material.subjectCode);
                return (
                  <TableRow key={material.id}>
                    <TableCell>{subject?.name}</TableCell>
                    <TableCell className="font-medium">{material.title}</TableCell>
                    <TableCell className="text-right">
                       <ViewMaterialDialog material={material} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
