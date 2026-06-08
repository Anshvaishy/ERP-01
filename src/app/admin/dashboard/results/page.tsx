
'use client';
import { useEffect, useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { db, Marks, Student, Subject } from '@/lib/local-storage-db';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

export default function ResultsPage() {
  const { toast } = useToast();
  const [marks, setMarks] = useState<Marks[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const formRef = useRef<HTMLFormElement>(null);

  const loadData = () => {
    setMarks(db.getAll('marks'));
    setStudents(db.getAll('students'));
    setSubjects(db.getAll('subjects'));
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if (event.detail.table === 'marks' || event.detail.table === 'students' || event.detail.table === 'subjects') {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  const handleAddMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());

    if (!data.roll || !data.subject || !data.examType || !data.obtained || !data.total) {
        toast({ title: 'Error', description: 'All fields are required.', variant: 'destructive' });
        return;
    }

    const newMark: Marks = {
        roll: data.roll as string,
        subject: data.subject as string,
        examType: data.examType as 'Mid-Term' | 'Final' | 'Assignment',
        obtained: Number(data.obtained),
        total: Number(data.total)
    };

    db.add('marks', newMark);
    toast({ title: 'Success', description: 'Marks added successfully.' });
    formRef.current?.reset();
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Result Processing & Publication
      </h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
            <form ref={formRef} onSubmit={handleAddMarks}>
                <CardHeader>
                    <CardTitle>Add Student Marks</CardTitle>
                    <CardDescription>Enter marks for a student.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Select name="roll" required>
                            <SelectTrigger><SelectValue placeholder="Select Student" /></SelectTrigger>
                            <SelectContent>{students.map(s => <SelectItem key={s.roll} value={s.roll}>{s.name} ({s.roll})</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Select name="subject" required>
                            <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                            <SelectContent>{subjects.map(s => <SelectItem key={s.code} value={s.code}>[{s.class}] {s.name}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                             <Select name="examType" required>
                                <SelectTrigger><SelectValue placeholder="Exam Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                                    <SelectItem value="Final">Final</SelectItem>
                                    <SelectItem value="Assignment">Assignment</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Input name="obtained" type="number" placeholder="Marks Obtained" required />
                        </div>
                         <div className="space-y-2">
                            <Input name="total" type="number" placeholder="Total Marks" required />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit"><PlusCircle className="mr-2 h-4 w-4" />Add Marks</Button>
                </CardFooter>
            </form>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Published Results</CardTitle>
            <CardDescription>
              Overview of all recorded marks.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marks.map((mark, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{mark.roll}</TableCell>
                      <TableCell>{mark.subject}</TableCell>
                      <TableCell>{mark.obtained} / {mark.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
