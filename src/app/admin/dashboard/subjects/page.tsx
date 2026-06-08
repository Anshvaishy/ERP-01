
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
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit } from 'lucide-react';
import { db, Subject, Faculty } from '@/lib/local-storage-db';
import { CourseDialog } from '@/components/admin/course-dialog';
import { useState, useEffect } from 'react';


export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  const loadData = () => {
    setSubjects(db.getAll('subjects'));
    setFaculty(db.getAll('faculty'));
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if(event.detail.table === 'subjects' || event.detail.table === 'faculty') {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Subjects & Curriculum
      </h2>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Courses / Subjects</CardTitle>
            <CardDescription>
              View, add, and manage all university subjects and their curriculum.
            </CardDescription>
          </div>
          <CourseDialog 
            faculty={faculty}
            trigger={
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
                </Button>
            }
          />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(subjects ?? []).map((subject) => {
                const assignedFaculty = faculty.find(f => f.id === subject.facultyId);
                return (
                  <TableRow key={subject.code}>
                    <TableCell className="font-medium">{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.department}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={subject.description}>{subject.description || 'N/A'}</TableCell>
                    <TableCell>{subject.class}</TableCell>
                    <TableCell>{assignedFaculty?.name || 'Not Assigned'}</TableCell>
                    <TableCell className="text-right">
                      <CourseDialog
                          subject={subject}
                          faculty={faculty}
                          trigger={
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                          }
                      />
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
