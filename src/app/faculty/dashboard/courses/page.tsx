
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db, Faculty, Subject, Student } from '@/lib/local-storage-db';

export default function FacultyCoursesPage() {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [courses, setCourses] = useState<Subject[]>([]);
  const [studentCounts, setStudentCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
        const currentFaculty = db.getAll('faculty').find(f => f.email === session.user);
        if(currentFaculty) {
            setFaculty(currentFaculty);
            const assignedCourses = db.getAll('subjects').filter(s => s.facultyId === currentFaculty.id);
            setCourses(assignedCourses);

            const allStudents = db.getAll('students');
            const counts: Record<string, number> = {};
            assignedCourses.forEach(course => {
                counts[course.code] = allStudents.filter(s => s.class === course.class).length;
            });
            setStudentCounts(counts);
        }
    }
  }, []);

  if (!faculty) {
    return <div>Loading faculty data...</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">My Courses</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.code}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription className="mt-1">{course.code}</CardDescription>
                    </div>
                    <Badge>{studentCounts[course.code] || 0} Students</Badge>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground"><strong>Department:</strong> {course.department}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
