
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AddStudentDialog } from '@/components/admin/add-student-dialog';
import { StudentActions } from '@/components/admin/student-actions';
import { db, Subject, Admission, Student } from '@/lib/local-storage-db';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

function ManageStudentsPage() {
  const { toast } = useToast();
  const [admissionRequests, setAdmissionRequests] = useState<Admission[]>([]);
  const [enrolledStudents, setEnrolledStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const loadData = () => {
    setAdmissionRequests(db.getAll('admissions'));
    setEnrolledStudents(db.getAll('students'));
    setSubjects(db.getAll('subjects'));
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if(event.detail.table === 'admissions' || event.detail.table === 'students' || event.detail.table === 'subjects') {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
        db.delete('students', id);
        toast({ title: "Success", description: "Student deleted." });
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Manage Students
      </h2>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>New Admission Requests</CardTitle>
          <CardDescription>
            Review and process new applications from the registration form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admissionRequests && admissionRequests.length > 0 ? (
                admissionRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.id}</TableCell>
                    <TableCell>{req.name}</TableCell>
                    <TableCell>{req.email}</TableCell>
                    <TableCell>{req.class}</TableCell>
                    <TableCell className="text-right space-x-2">
                       <StudentActions action="approve" itemId={req.id} />
                       <StudentActions action="deny" itemId={req.id} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow key="no-admissions">
                  <TableCell
                    colSpan={5}
                    className="py-6 text-center text-muted-foreground"
                  >
                    No new admission requests.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Enrolled Students</CardTitle>
            <CardDescription>
              View and manage all registered students.
            </CardDescription>
          </div>
          <AddStudentDialog subjects={subjects} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               {enrolledStudents && enrolledStudents.length > 0 ? (
                enrolledStudents.map((student) => {
                  return (
                    <TableRow key={student.roll}>
                      <TableCell className="font-medium">
                        {student.roll}
                      </TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>
                        <Badge variant={'default'}>Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <StudentActions action="delete" itemId={student.roll} />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                 <TableRow key="no-students">
                  <TableCell
                    colSpan={7}
                    className="py-6 text-center text-muted-foreground"
                  >
                    No enrolled students.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default ManageStudentsPage;
