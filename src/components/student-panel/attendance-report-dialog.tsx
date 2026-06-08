
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
import { Student } from '@/lib/local-storage-db';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

type AttendanceReportDialogProps = {
    student: Student;
    attendanceSummary: any[];
};

export function AttendanceReportDialog({ student, attendanceSummary }: AttendanceReportDialogProps) {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Attendance Report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Official Attendance Report</DialogTitle>
          <DialogDescription>A summary of your attendance to date.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <div className="border rounded-lg p-6">
                 <div className="text-center mb-4">
                    <h3 className="font-bold text-lg">OBSIDIAN PEAK UNIVERSITY</h3>
                    <p className="text-sm">Official Attendance Report</p>
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
                                <TableHead>Course</TableHead>
                                <TableHead>Classes Attended</TableHead>
                                <TableHead>Total Classes</TableHead>
                                <TableHead className="text-right">Percentage</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {attendanceSummary.map((item) => (
                            <TableRow key={item.course}>
                            <TableCell className="font-medium">{item.course}</TableCell>
                            <TableCell>{item.attended}</TableCell>
                            <TableCell>{item.total}</TableCell>
                            <TableCell className="text-right">
                                <Badge
                                variant={item.percentage < 75 ? "destructive" : "default"}
                                >
                                {item.percentage}%
                                </Badge>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
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
