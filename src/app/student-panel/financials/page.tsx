
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download } from 'lucide-react';
import { db, Student, FeeRecord } from '@/lib/local-storage-db';
import { PayDuesDialog } from '@/components/student-panel/pay-dues-dialog';
import { programDetailsData } from '@/lib/program-details';

export default function FinancialsPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [summary, setSummary] = useState({ total: 0, paid: 0, due: 0 });
  const [feeStructure, setFeeStructure] = useState<any>({});
  
  const loadFinancialData = () => {
    const session = db.get('session');
    if (session?.user) {
        const currentStudent = db.getAll('students').find(s => s.email === session.user);
        if (currentStudent) {
            setStudent(currentStudent);
            
            const programInfo = programDetailsData.find(p => p.programName === currentStudent.class) || programDetailsData.find(p => p.programName === "Default")!;
            const currentFeeStructure = programInfo.fees;
            setFeeStructure(currentFeeStructure);

            const allFees = db.getAll('fees').filter(f => f.roll === currentStudent.roll);
            const isInHostel = !!db.getAll('hostel').find(h => h.roll === currentStudent.roll);

            let totalFee = currentFeeStructure.tuition + currentFeeStructure.examination + currentFeeStructure.other;
            if (isInHostel) totalFee += currentFeeStructure.hostel;
            
            const totalPaid = allFees.reduce((acc, f) => acc + f.amount, 0);
            
            setSummary({ total: totalFee, paid: totalPaid, due: totalFee - totalPaid });
            
            const records: FeeRecord[] = [];
            records.push({ roll: currentStudent.roll, name: currentStudent.name, feeType: 'Tuition', amount: allFees.find(f => f.feeType === 'Tuition')?.amount || 0, date: allFees.find(f => f.feeType === 'Tuition')?.date });
            records.push({ roll: currentStudent.roll, name: currentStudent.name, feeType: 'Examination', amount: allFees.find(f => f.feeType === 'Examination')?.amount || 0, date: allFees.find(f => f.feeType === 'Examination')?.date });
            records.push({ roll: currentStudent.roll, name: currentStudent.name, feeType: 'Other', amount: allFees.find(f => f.feeType === 'Other')?.amount || 0, date: allFees.find(f => f.feeType === 'Other')?.date });
            if (isInHostel) {
                records.push({ roll: currentStudent.roll, name: currentStudent.name, feeType: 'Hostel', amount: allFees.find(f => f.feeType === 'Hostel')?.amount || 0, date: allFees.find(f => f.feeType === 'Hostel')?.date });
            }
            setFeeRecords(records);
        }
    }
  };

  useEffect(() => {
    loadFinancialData();
    window.addEventListener('db-change', loadFinancialData);
    return () => window.removeEventListener('db-change', loadFinancialData);
  }, []);

  if (!student) {
    return <div>Loading financial data...</div>;
  }

  const getStatus = (feeType: FeeRecord['feeType'], paidAmount: number): { text: 'Paid' | 'Partially Paid' | 'Unpaid'; variant: 'default' | 'secondary' | 'destructive' } => {
    const total = feeStructure[feeType.toLowerCase() as keyof typeof feeStructure] || 0;
    if (paidAmount >= total) {
      return { text: 'Paid', variant: 'default' };
    }
    if (paidAmount > 0) {
      return { text: 'Partially Paid', variant: 'secondary' };
    }
    return { text: 'Unpaid', variant: 'destructive' };
  };

  const pendingDues = feeRecords.filter(r => (feeStructure[r.feeType.toLowerCase() as keyof typeof feeStructure] || 0) > r.amount);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Financial Services</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader><CardTitle>Total Fees</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold">₹{summary.total.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Paid</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-green-600">₹{summary.paid.toLocaleString()}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Total Due</CardTitle></CardHeader>
          <CardContent><p className="text-2xl font-bold text-red-600">₹{summary.due.toLocaleString()}</p></CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Consolidated Ledger</CardTitle>
              <CardDescription>A transparent accounting of all your fees.</CardDescription>
            </div>
            <PayDuesDialog student={student} pendingDues={pendingDues} feeStructure={feeStructure} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Last Payment Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeRecords.map((record) => {
                const status = getStatus(record.feeType, record.amount);
                return (
                  <TableRow key={record.feeType}>
                    <TableCell className="font-medium">{record.feeType} Fee</TableCell>
                    <TableCell>₹{record.amount.toLocaleString()}</TableCell>
                    <TableCell>{record.date || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={status.variant}>{status.text}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
           <div className="mt-6 flex justify-end">
              <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Download Statement</Button>
           </div>
        </CardContent>
      </Card>
    </>
  );
}
