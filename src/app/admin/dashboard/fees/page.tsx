
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Send, Edit, Save, X as XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { db } from '@/lib/local-storage-db';
import type { FeeRecord, Student, HostelRoom } from '@/lib/local-storage-db';
import { programDetailsData } from '@/lib/program-details';

export default function FeesPage() {
  const { toast } = useToast();
  const [feeData, setFeeData] = useState<FeeRecord[]>([]);
  const [filteredFeeData, setFilteredFeeData] = useState<FeeRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState(0);

  const getFeeStructureForClass = (className: string) => {
    const program = programDetailsData.find(p => p.programName === className);
    return program ? program.fees : programDetailsData.find(p => p.programName === "Default")!.fees;
  };

  const loadData = () => {
    const allStudents = db.getAll('students');
    const allFees = db.getAll('fees');
    const allHostelRecords = db.getAll('hostel');

    const generatedFeeData = allStudents.flatMap(student => {
      const studentFees = allFees.filter(f => f.roll === student.roll);
      const isInHostel = allHostelRecords.some(h => h.roll === student.roll);
      
      const records: FeeRecord[] = [];

      const feeTypes: FeeRecord['feeType'][] = ['Tuition', 'Examination', 'Other'];
      if (isInHostel) {
        feeTypes.push('Hostel');
      }

      feeTypes.forEach(feeType => {
         const feeRecord = studentFees.find(f => f.feeType === feeType);
         records.push({
           roll: student.roll,
           name: student.name,
           feeType: feeType,
           amount: feeRecord?.amount || 0,
           date: feeRecord?.date,
         });
      });
      
      return records;
    });

    setFeeData(generatedFeeData);
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if(['fees', 'students', 'hostel'].includes(event.detail.table)) {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  useEffect(() => {
    const results = feeData.filter(record =>
        record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.roll.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeeData(results);
  }, [searchTerm, feeData]);

  const handleUpdateFee = (roll: string, feeType: FeeRecord['feeType']) => {
    db.updateFee(roll, feeType, editAmount);
    setEditingId(null);
    toast({ title: "Success", description: "Fee record updated." });
  };

  const handleSendReminder = (studentName: string) => {
    toast({
        title: "Reminder Sent",
        description: `Fee payment reminder has been sent to ${studentName}.`
    });
  }

  const handleEdit = (record: FeeRecord) => {
    setEditingId(`${record.roll}-${record.feeType}`);
    setEditAmount(record.amount);
  };
  
  const getStatus = (studentRoll: string, feeType: FeeRecord['feeType'], paidAmount: number): { text: 'Paid' | 'Pending' | 'Unpaid'; variant: 'default' | 'secondary' | 'destructive' } => {
    const student = db.getAll('students').find(s => s.roll === studentRoll);
    if (!student) return { text: 'Unpaid', variant: 'destructive' };
    
    const feeStructure = getFeeStructureForClass(student.class);
    const total = feeStructure[feeType.toLowerCase() as keyof typeof feeStructure] || 0;
    
    if (paidAmount >= total) {
      return { text: 'Paid', variant: 'default' };
    }
    if (paidAmount > 0) {
      return { text: 'Pending', variant: 'secondary' };
    }
    return { text: 'Unpaid', variant: 'destructive' };
  };
    
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Fee Management
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Student Fee Status</CardTitle>
          <CardDescription>
            Track and manage fee collections across the university.
          </CardDescription>
          <div className="pt-4">
             <Input 
                placeholder="Search by Student Roll No. or Name..." 
                className="max-w-sm" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeeData.map((studentFee) => {
                const status = getStatus(studentFee.roll, studentFee.feeType, studentFee.amount);
                const isEditing = editingId === `${studentFee.roll}-${studentFee.feeType}`;

                return (
                  <TableRow key={`${studentFee.roll}-${studentFee.feeType}`}>
                    <TableCell className="font-medium">
                      {studentFee.roll}
                    </TableCell>
                    <TableCell>{studentFee.name}</TableCell>
                    <TableCell>{studentFee.feeType}</TableCell>
                    <TableCell>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={editAmount}
                              onChange={(e) => setEditAmount(Number(e.target.value))}
                              className="h-8 w-28"
                            />
                            <Button variant="default" size="icon" onClick={() => handleUpdateFee(studentFee.roll, studentFee.feeType)}>
                                <Save className="h-4 w-4" />
                            </Button>
                             <Button type="button" variant="ghost" size="icon" onClick={() => setEditingId(null)}>
                                <XIcon className="h-4 w-4" />
                            </Button>
                        </div>
                      ) : (
                        `₹${studentFee.amount.toLocaleString()}`
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>
                        {status.text}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        {!isEditing && (
                             <Button variant="outline" size="sm" onClick={() => handleEdit(studentFee)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                        )}
                         <Button variant="outline" size="sm" disabled={status.text === 'Paid'} onClick={() => handleSendReminder(studentFee.name)}>
                            <Send className="mr-2 h-4 w-4" />
                            Reminder
                        </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
