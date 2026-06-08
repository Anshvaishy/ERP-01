
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { db, Student, Marks } from '@/lib/local-storage-db';
import { Logo } from '@/components/logo';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Download, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MarkCell = ({ mark }: { mark: { obt: number, mm: number } | null | undefined }) => {
    if (!mark) {
        return <div className="text-center text-muted-foreground">NA</div>;
    }
    const percentage = (mark.obt / mark.mm) * 100;
    const colorClass = 
        percentage >= 80 ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
        percentage >= 60 ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300' :
        'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
    
    return (
        <div className={cn('w-12 h-8 flex flex-col justify-center items-center rounded-md', colorClass)}>
            <div className="font-bold text-xs">{mark.obt}</div>
            <div className="text-[10px]">/{mark.mm}</div>
        </div>
    );
};


export default function PerformanceReportPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [reportData, setReportData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
      const currentStudent = db.getAll('students').find(s => s.email === session.user);
      setStudent(currentStudent || null);
      if (currentStudent) {
        const studentMarks = db.getAll('marks').filter(m => m.roll === currentStudent.roll);
        const studentSubjects = db.getAll('subjects').filter(s => s.class === currentStudent.class);
        const allAttendance = db.getAll('attendance').filter(a => a.roll === currentStudent.roll);
        
        const totalConducted = allAttendance.length;
        const totalAttended = allAttendance.filter(a => a.status === 'Present').length;
        const attendancePercentage = totalConducted > 0 ? parseFloat(((totalAttended / totalConducted) * 100).toFixed(2)) : 100;

        const marksBySubject = studentSubjects.map(subject => {
            const getMark = (examType: Marks['examType']) => {
                const mark = studentMarks.find(m => m.subject === subject.code && m.examType === examType);
                return mark ? { obt: mark.obtained, mm: mark.total } : null;
            }
            return {
                code: subject.code,
                name: subject.name,
                ut1: getMark('Assignment'), // Assuming UT1 is assignment
                ut2: null, // No UT2 in our simplified model
                itt: null,
                midTerm: getMark('Mid-Term'),
                makeup: null,
                classParticipation: { obt: 8, mm: 10 }, // mock
                ta1: { obt: 9, mm: 10 }, // mock
                ta2: { obt: 9, mm: 10 }, // mock
                ta3: null,
                ta4: null,
            }
        });

        setReportData({
          session: "2025-2026",
          program: currentStudent.class,
          semester: "Varies",
          attendance: attendancePercentage,
          marks: marksBySubject,
        });
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  }

  const handleDownload = () => {
      toast({
          title: "Download Started",
          description: "Your performance report is being downloaded.",
      });
      // In a real app, this would trigger a server-side PDF generation.
      // For demo, we can just print.
      window.print();
  }

  if (!student || !reportData) {
    return <div>Loading student report...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6 print:hidden">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Performance Report</h2>
          <p className="text-muted-foreground">Your detailed internal assessment report.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
            <Button onClick={handleDownload}><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
        </div>
      </div>
      
      <div id="report-content" className="p-4 sm:p-8 border rounded-lg bg-card text-card-foreground">
          {/* Header */}
          <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <Logo className="h-16 w-16" />
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-primary">OBSIDIAN PEAK UNIVERSITY</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">Lucknow-Deva Road, Barabanki, Uttar Pradesh</p>
                </div>
              </div>
              <div className="text-right text-xs sm:text-sm">
                  <p>{new Date().toLocaleDateString('en-GB', { day:'2-digit', month: 'short', year: 'numeric' })}</p>
                  <p>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
          </div>
          
          {/* Title */}
          <div className="text-center my-4">
              <p className="font-bold underline text-base sm:text-lg">PERFORMANCE REPORT</p>
              <p className="text-sm">Session: {reportData.session}</p>
              <p className="text-sm">{reportData.semester}</p>
          </div>

          <Separator />
          
          {/* Student Info */}
          <div className="flex justify-between items-center text-sm sm:text-base my-2">
              <p><strong>Name Of Student:</strong> {student.name}</p>
              <p><strong>ROLL NO:</strong> {student.roll}</p>
          </div>
           <div className="text-sm sm:text-base my-2">
              <p><strong>Program:</strong> {reportData.program}</p>
          </div>

          <Separator />

          {/* Marks Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-xs">
                <thead>
                    <tr className="bg-muted">
                        <th className="border p-1 w-24">SUBJECT CODE</th>
                        <th className="border p-1 w-40">SUBJECT NAME</th>
                        <th className="border p-1">UT1</th>
                        <th className="border p-1">UT2</th>
                        <th className="border p-1">ITT</th>
                        <th className="border p-1">Mid Term</th>
                        <th className="border p-1">Makeup</th>
                        <th className="border p-1">Class Part.</th>
                        <th className="border p-1">TA1</th>
                        <th className="border p-1">TA2</th>
                        <th className="border p-1">TA3</th>
                        <th className="border p-1">TA4</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.marks.map((row: any) => (
                        <tr key={row.code} className="text-center">
                            <td className="border p-1 font-mono">{row.code}</td>
                            <td className="border p-1 text-left">{row.name}</td>
                            <td className="border p-1 flex justify-center"><MarkCell mark={row.ut1} /></td>
                            <td className="border p-1"><MarkCell mark={row.ut2} /></td>
                            <td className="border p-1"><MarkCell mark={row.itt} /></td>
                            <td className="border p-1"><MarkCell mark={row.midTerm} /></td>
                            <td className="border p-1"><MarkCell mark={row.makeup} /></td>
                            <td className="border p-1"><MarkCell mark={row.classParticipation} /></td>
                            <td className="border p-1"><MarkCell mark={row.ta1} /></td>
                            <td className="border p-1"><MarkCell mark={row.ta2} /></td>
                            <td className="border p-1"><MarkCell mark={row.ta3} /></td>
                            <td className="border p-1"><MarkCell mark={row.ta4} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-4 p-2 border rounded-md">
                <strong>Attendance (%):</strong>
                <span className="font-bold text-primary">{reportData.attendance}</span>
                <span className="text-muted-foreground">(L+T+P)</span>
            </div>
            <div className="p-2 border rounded-md text-muted-foreground">
                <p>75% attendance should be maintained for participation in all assessments.</p>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-2 border rounded-md">
                    <p><strong>OBT:</strong> Obtained Marks, <strong>MM:</strong> Maximum Marks, <strong>NA:</strong> Not Applicable, <strong>AB:</strong> Absent</p>
                </div>
                 <div className="p-2 border rounded-md">
                    <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> <strong>Red:</strong> Below average performance</p>
                    <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> <strong>Orange:</strong> Average performance</p>
                    <p className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> <strong>Green:</strong> Good performance</p>
                </div>
            </div>
            <div className="p-2 border rounded-md text-muted-foreground">
                <p><strong>L:</strong> Lecture, <strong>T:</strong> Tutorial, <strong>P:</strong> Practical, <strong>UT:</strong> University Test, <strong>ITT:</strong> Innovative Teaching Assessment/Test, <strong>CP:</strong> Class Participation, <strong>TA:</strong> Teaching Assessment</p>
            </div>
          </div>
      </div>
    </>
  );
}
