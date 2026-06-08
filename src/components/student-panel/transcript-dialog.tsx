
'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Download, Printer } from 'lucide-react';
import { Student, Subject, Marks } from '@/lib/local-storage-db';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';

type TranscriptDialogProps = {
    student: Student;
    subjects: Subject[];
    marks: Marks[];
    cgpa: string;
};

export function TranscriptDialog({ student, subjects, marks, cgpa }: TranscriptDialogProps) {
  
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'P';
    return 'F';
  };

  const subjectMap = subjects.reduce((acc, s) => {
      acc[s.code] = s.name;
      return acc;
  }, {} as Record<string, string>);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Transcript</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Official Transcript</DialogTitle>
          <DialogDescription>A summary of your academic performance to date.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <div className="border rounded-lg p-6">
                 <div className="text-center mb-4">
                    <h3 className="font-bold text-lg">OBSIDIAN PEAK UNIVERSITY</h3>
                    <p className="text-sm">Official Academic Transcript</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm my-4">
                    <div><span className="font-semibold">Student Name:</span> {student.name}</div>
                    <div><span className="font-semibold">Roll No:</span> {student.roll}</div>
                    <div><span className="font-semibold">Program:</span> {student.class}</div>
                    <div><span className="font-semibold">Date Issued:</span> {new Date().toLocaleDateString()}</div>
                </div>
                 <Separator />
                 <div className="mt-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject</TableHead>
                                <TableHead>Marks</TableHead>
                                <TableHead>Grade</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map(subject => {
                                const subjectMarks = marks.filter(m => m.subject === subject.code);
                                const totalObtained = subjectMarks.reduce((acc, m) => acc + m.obtained, 0);
                                const totalMax = subjectMarks.reduce((acc, m) => acc + m.total, 0);
                                const percentage = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
                                const grade = getGrade(percentage);
                                return (
                                    <TableRow key={subject.code}>
                                        <TableCell>{subject.name}</TableCell>
                                        <TableCell>{totalMax > 0 ? `${totalObtained}/${totalMax}` : 'N/A'}</TableCell>
                                        <TableCell>{totalMax > 0 ? grade : 'N/A'}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                 </div>
                 <div className="mt-6 flex justify-end">
                    <div className="text-right">
                        <p className="font-bold text-lg">Cumulative GPA: {cgpa}</p>
                        <p className="text-xs text-muted-foreground">Calculated on a 4.0 scale.</p>
                    </div>
                 </div>
            </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print</Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
