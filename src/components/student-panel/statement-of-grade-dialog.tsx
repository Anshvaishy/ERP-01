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
import { Download, Printer, FileText } from 'lucide-react';
import { Student } from '@/lib/local-storage-db';
import { Separator } from '../ui/separator';
import { Logo } from '../logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type StatementOfGradeDialogProps = {
    student: Student;
};

// Mock data to replicate the image
const gradeData = {
    program: "3 YEARS DIPLOMA IN COMPUTER SCIENCE & ENGINEERING",
    semester: "THIRD YEAR (SEMESTER VI)",
    session: "2025-2026",
    studentId: "00000040161",
    fatherName: "Arvind Kumar Vaishy",
    motherName: "Anuradha Vaishy",
    theory: [
        { code: "DMG6002", name: "Industrial Management and Entrepreneurship Development", grade: 0, points: 3, credit: 3, coursePoints: 0 },
        { code: "DCS6001", name: "Software Testing", grade: 0, points: 3, credit: 3, coursePoints: 0 },
        { code: "DCS6005", name: "Web Technology", grade: 0, points: 3, credit: 3, coursePoints: 0 },
        { code: "DCS6105", name: "Advanced Java Programming", grade: 0, points: 2, credit: 2, coursePoints: 0 },
    ],
    practical: [
        { code: "DCS6501", name: "Software Testing Lab", grade: 0, points: 1, credit: 1, coursePoints: 0 },
        { code: "DCS6506", name: "Web Technology Lab", grade: 0, points: 1, credit: 1, coursePoints: 0 },
        { code: "DCS6503", name: "Project", grade: 0, points: 6, credit: 6, coursePoints: 0 },
        { code: "DCS6507", name: "Professional Practices-III", grade: 0, points: 1, credit: 1, coursePoints: 0 },
        { code: "DCS6705", name: "Advanced Java Programming Lab", grade: 0, points: 2, credit: 2, coursePoints: 0 },
    ],
    summary: {
        sgpa: "0.00",
        cgpa: "8.23",
        yearlyGpa: "-",
        performance: "EXCELLENT",
        result: "PASS",
        carryOver: "None"
    }
};

export function StatementOfGradeDialog({ student }: StatementOfGradeDialogProps) {
  const studentImage = PlaceHolderImages.find(p => p.id === 'testimonial-2');
  
  const handlePrint = () => {
      const printContent = document.getElementById('grade-statement-content');
      if (printContent) {
          const originalContents = document.body.innerHTML;
          // Clone the content to avoid modifying the original
          const printClone = printContent.cloneNode(true) as HTMLElement;
          // Create a new window or iframe to print from
          const printWindow = window.open('', '', 'height=800,width=800');
          
          if(printWindow) {
              printWindow.document.write('<html><head><title>Statement of Grade</title>');
              // You need to link your stylesheets for consistent styling
              const styles = Array.from(document.styleSheets).map(s => s.href ? `<link rel="stylesheet" href="${s.href}">` : '').join('');
              printWindow.document.write(styles);
              printWindow.document.write('<style>@media print { body { -webkit-print-color-adjust: exact; } .print-black-text { color: black !important; } .bg-gray-200 { background-color: #E5E7EB !important; } .bg-gray-100 { background-color: #F3F4F6 !important; } }</style>');
              printWindow.document.write('</head><body>');
              printWindow.document.write(printClone.innerHTML);
              printWindow.document.write('</body></html>');
              printWindow.document.close();
              printWindow.focus();
              setTimeout(() => {
                printWindow.print();
                printWindow.close();
              }, 500);
          }
      }
  };

  const totalCredits = [...gradeData.theory, ...gradeData.practical].reduce((acc, s) => acc + s.credit, 0);
  const totalCoursePoints = [...gradeData.theory, ...gradeData.practical].reduce((acc, s) => acc + s.coursePoints, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> View Statement of Grade</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Statement of Grade</DialogTitle>
          <DialogDescription>Your official statement of grade for external examinations.</DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[80vh] overflow-y-auto">
            <div id="grade-statement-content" className="p-6 border rounded-lg bg-white print-black-text">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Logo className="h-20 w-20 text-black" />
                        <div>
                            <h3 className="text-xl font-bold">OBSIDIAN PEAK UNIVERSITY</h3>
                            <p className="text-sm">Knowledge Park, India</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                       <Avatar className="w-24 h-28 border-2 border-black rounded-none">
                            {studentImage && (
                                <AvatarImage src={student.photo || studentImage.imageUrl} alt={student.name} className="object-cover rounded-none" />
                            )}
                            <AvatarFallback className="text-2xl rounded-none">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                       </Avatar>
                       <p className="text-lg font-bold mt-1">DS</p>
                       <div className="w-24 h-2 bg-black mt-1" style={{background: 'repeating-linear-gradient(45deg, #000, #000 3px, #fff 3px, #fff 6px)'}}></div>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center my-4">
                    <p className="font-bold underline">STATEMENT OF GRADE</p>
                    <p className="text-sm font-semibold">{gradeData.program}</p>
                    <p className="text-sm font-semibold">{gradeData.semester} (SESSION:{gradeData.session})</p>
                </div>

                {/* Student Info */}
                <div className="grid grid-cols-2 text-sm">
                    <div className="space-y-1">
                        <p><strong>Student's Name:</strong> {student.name}</p>
                        <p><strong>Father's Name:</strong> {gradeData.fatherName}</p>
                        <p><strong>Mother's Name:</strong> {gradeData.motherName}</p>
                    </div>
                    <div className="space-y-1">
                        <p><strong>University Roll No:</strong> {student.roll}</p>
                        <p><strong>Student ID:</strong> {gradeData.studentId}</p>
                    </div>
                </div>

                {/* Marks Table */}
                <table className="w-full border-collapse border border-black mt-4 text-sm">
                    <thead className="bg-gray-200">
                        <tr className="font-bold">
                            <th className="border border-black p-1">Subject Code</th>
                            <th className="border border-black p-1">Subject Name</th>
                            <th className="border border-black p-1">Grade Obtained</th>
                            <th className="border border-black p-1">Grade Points</th>
                            <th className="border border-black p-1">Credit</th>
                            <th className="border border-black p-1">Course Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td colSpan={6} className="font-bold p-1 bg-gray-100">THEORY</td></tr>
                        {gradeData.theory.map(s => (
                            <tr key={s.code} className="text-center">
                                <td className="border border-black p-1 text-left">{s.code}</td>
                                <td className="border border-black p-1 text-left">{s.name}</td>
                                <td className="border border-black p-1">{s.grade}</td>
                                <td className="border border-black p-1">{s.points}</td>
                                <td className="border border-black p-1">{s.credit}</td>
                                <td className="border border-black p-1">{s.coursePoints}</td>
                            </tr>
                        ))}
                         <tr><td colSpan={6} className="font-bold p-1 bg-gray-100">PRACTICAL</td></tr>
                        {gradeData.practical.map(s => (
                            <tr key={s.code} className="text-center">
                                <td className="border border-black p-1 text-left">{s.code}</td>
                                <td className="border border-black p-1 text-left">{s.name}</td>
                                <td className="border border-black p-1">{s.grade}</td>
                                <td className="border border-black p-1">{s.points}</td>
                                <td className="border border-black p-1">{s.credit}</td>
                                <td className="border border-black p-1">{s.coursePoints}</td>
                            </tr>
                        ))}
                        <tr className="font-bold text-center">
                            <td colSpan={4} className="border border-black p-1 text-right">Total</td>
                            <td className="border border-black p-1">{totalCredits}</td>
                            <td className="border border-black p-1">{totalCoursePoints}</td>
                        </tr>
                    </tbody>
                </table>
                
                 {/* Carry Over */}
                 <table className="w-full border-collapse border border-black mt-2 text-sm">
                    <tbody>
                        <tr>
                            <td className="border border-black p-1 w-1/4"><strong>Carry Over Paper(s) (if any)</strong></td>
                            <td className="border border-black p-1">{gradeData.summary.carryOver}</td>
                        </tr>
                    </tbody>
                 </table>
                  <p className="text-xs mt-1">#Credit of Value Added Courses (if any) is not counted in SGPA/CGPA.</p>
                
                {/* Summary */}
                <table className="w-full border-collapse border border-black mt-2 text-sm text-center">
                    <thead className="bg-gray-200">
                        <tr className="font-bold">
                             <th className="border border-black p-1">SGPA</th>
                             <th className="border border-black p-1">CGPA</th>
                             <th className="border border-black p-1">Yearly GPA</th>
                             <th className="border border-black p-1">Performance</th>
                             <th className="border border-black p-1">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black p-1">{gradeData.summary.sgpa}</td>
                            <td className="border border-black p-1">{gradeData.summary.cgpa}</td>
                            <td className="border border-black p-1">{gradeData.summary.yearlyGpa}</td>
                            <td className="border border-black p-1">{gradeData.summary.performance}</td>
                            <td className="border border-black p-1">{gradeData.summary.result}</td>
                        </tr>
                    </tbody>
                </table>

                 <div className="flex justify-between items-end mt-16">
                    <div className="text-xs">
                        <p>*Non-Credit Subjects</p>
                        <p>The Statement of Grade is Electronically Generated.</p>
                    </div>
                    <div className="text-center">
                         <p className="font-bold mt-4">Ansh Vaishy</p>
                         <p className="text-xs border-t border-black mt-1 pt-1">Chairman, Board of Governors</p>
                    </div>
                 </div>
            </div>
        </div>
        <DialogFooter className="print:hidden">
          <Button variant="ghost" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
          <Button onClick={handlePrint}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
