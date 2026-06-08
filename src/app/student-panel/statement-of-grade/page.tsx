
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { db, Student } from '@/lib/local-storage-db';
import { StatementOfGradeDialog } from '@/components/student-panel/statement-of-grade-dialog';

export default function StatementOfGradePage() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
      const currentStudent = db.getAll('students').find(s => s.email === session.user);
      setStudent(currentStudent || null);
    }
  }, []);

  if (!student) {
    return <div>Loading report data...</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Statement of Grade</h2>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Unofficial Transcript (External Marks)</CardTitle>
          <CardDescription>View and download your official statement of grade which includes your external examination results.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="mb-4 text-muted-foreground">Click the button below to generate your statement.</p>
            <StatementOfGradeDialog student={student} />
        </CardContent>
      </Card>
    </>
  );
}
