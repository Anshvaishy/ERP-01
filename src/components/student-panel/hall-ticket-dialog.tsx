
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
import { Student, Subject } from '@/lib/local-storage-db';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';

type HallTicketDialogProps = {
    student: Student;
    subjects: Subject[];
};

export function HallTicketDialog({ student, subjects }: HallTicketDialogProps) {
  const studentImage = PlaceHolderImages.find(p => p.id === 'testimonial-2');
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Hall Ticket</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Examination Hall Ticket</DialogTitle>
          <DialogDescription>Mid-Term Examinations - Fall 2025</DialogDescription>
        </DialogHeader>
        <div className="py-4" id="hall-ticket-content">
            <div className="border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">OBSIDIAN PEAK UNIVERSITY</h3>
                    <p className="text-sm text-muted-foreground">Admit Card</p>
                </div>
                <Separator />
                <div className="flex gap-6 mt-4">
                    <Avatar className="w-24 h-24 border-2">
                        {studentImage && (
                            <AvatarImage src={student.photo || studentImage.imageUrl} alt={student.name} />
                        )}
                        <AvatarFallback className="text-2xl">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div><span className="font-semibold">Student Name:</span> {student.name}</div>
                        <div><span className="font-semibold">Roll No:</span> {student.roll}</div>
                        <div><span className="font-semibold">Program:</span> {student.class}</div>
                        <div><span className="font-semibold">Date of Birth:</span> {student.dob}</div>
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Registered Subjects:</h4>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Subject Code</TableHead>
                                <TableHead>Subject Name</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subjects.map(subject => (
                                <TableRow key={subject.code}>
                                    <TableCell>{subject.code}</TableCell>
                                    <TableCell>{subject.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 <div className="mt-6 text-xs text-muted-foreground">
                    <h4 className="font-semibold text-foreground mb-2">Instructions:</h4>
                    <ul className="list-decimal list-inside space-y-1">
                        <li>Please bring this hall ticket to the examination hall.</li>
                        <li>No electronic devices are allowed inside the examination hall.</li>
                        <li>Reach the examination center at least 30 minutes before the commencement of the exam.</li>
                    </ul>
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
