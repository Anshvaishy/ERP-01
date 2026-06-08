
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db, Faculty, Payroll } from '@/lib/local-storage-db';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Banknote, CheckCircle, Clock } from 'lucide-react';
import { Counter } from '@/components/counter';

export default function PayrollPage() {
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [payrollData, setPayrollData] = useState<Payroll[]>([]);
  const [stats, setStats] = useState({ disbursed: 0, pending: 0, facultyPaid: 0 });

  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

  const loadData = () => {
    const allFaculty = db.getAll('faculty');
    const allPayroll = db.getAll('payroll');
    setFaculty(allFaculty);
    setPayrollData(allPayroll);

    let totalDisbursed = 0;
    let totalPending = 0;
    let paidCount = 0;

    allFaculty.forEach(f => {
        // Assuming a fixed salary for demo purposes
        const salary = 75000;
        const record = allPayroll.find(p => p.facultyId === f.id && p.month === currentMonth);
        if (record?.status === 'Paid') {
            totalDisbursed += record.amount;
            paidCount++;
        } else {
            totalPending += salary;
        }
    });
    setStats({ disbursed: totalDisbursed, pending: totalPending, facultyPaid: paidCount });
  };

  useEffect(() => {
    loadData();
    const handleDataChange = (e: any) => {
        if(e.detail.table === 'faculty' || e.detail.table === 'payroll') {
            loadData();
        }
    }
    window.addEventListener('db-change', handleDataChange);
    return () => window.removeEventListener('db-change', handleDataChange);
  }, [currentMonth]);

  const processPayrollFor = (facultyId: string, amount: number) => {
    const recordId = `${facultyId}-${currentMonth}`;
    const allPayroll: Payroll[] = db.getAll('payroll');
    const existingRecordIndex = allPayroll.findIndex(p => p.facultyId === facultyId && p.month === currentMonth);

    if (existingRecordIndex > -1) {
        allPayroll[existingRecordIndex].status = 'Paid';
        allPayroll[existingRecordIndex].amount = amount;
    } else {
        const newRecord: Payroll = { facultyId, month: currentMonth, amount, status: 'Paid' };
        allPayroll.push(newRecord);
    }
    db.set('payroll', allPayroll);
  };

  const handleProcessAll = () => {
    faculty.forEach(f => {
      const record = payrollData.find(p => p.facultyId === f.id && p.month === currentMonth);
      if (record?.status !== 'Paid') {
        processPayrollFor(f.id, 75000); // Assuming fixed salary
      }
    });
    toast({
      title: "Payroll Processed",
      description: `All pending salaries for ${currentMonth} have been processed.`,
    });
  };
  
  const handlePaySingle = (facultyId: string, name: string) => {
    processPayrollFor(facultyId, 75000); // Assuming fixed salary
    toast({
      title: "Salary Paid",
      description: `Salary for ${name} has been processed.`,
    });
  }

  const kpi = [
      { title: "Total Disbursed", value: stats.disbursed, icon: Banknote, prefix: '₹' },
      { title: "Total Pending", value: stats.pending, icon: Clock, prefix: '₹' },
      { title: "Faculty Paid", value: stats.facultyPaid, icon: CheckCircle, suffix: ` / ${faculty.length}` },
  ]

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Payroll Management</h2>

      <div className="grid gap-4 md:grid-cols-3 my-6">
        {kpi.map((item) => (
             <Card key={item.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {item.prefix && item.prefix}
                        <Counter end={item.value} />
                        {item.suffix && item.suffix}
                    </div>
                </CardContent>
             </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Faculty Payroll - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</CardTitle>
            <CardDescription>Automated salary processing, tax deductions, and payslip generation.</CardDescription>
          </div>
          <Button onClick={handleProcessAll} disabled={stats.pending === 0}>
              Process All Pending
          </Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Faculty Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {faculty.map(f => {
                        const salary = 75000;
                        const record = payrollData.find(p => p.facultyId === f.id && p.month === currentMonth);
                        const status = record?.status || 'Pending';
                        return (
                            <TableRow key={f.id}>
                                <TableCell className="font-medium">{f.name}</TableCell>
                                <TableCell>{f.department}</TableCell>
                                <TableCell>₹{salary.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge variant={status === 'Paid' ? 'default' : 'destructive'}>{status}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button size="sm" variant="outline" disabled={status === 'Paid'} onClick={() => handlePaySingle(f.id, f.name)}>
                                        Pay
                                    </Button>
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
