
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { db, Grievance, Student, Faculty } from '@/lib/local-storage-db';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sendGrievanceStatusUpdateEmail } from '@/lib/emailjs-client';
import { Textarea } from '@/components/ui/textarea';

const departments = [
  'Advanced Technology & AI',
  'Engineering & Applied Sciences',
  'Business & Entrepreneurship',
  'Health & Life Sciences',
  'Humanities & Global Studies',
  'Legal Studies',
  'Admissions',
  'Student Affairs',
  'Library',
  'Hostel',
  'Accounts',
  'Examination'
];
const roles: Grievance['assignedTo'][] = ['Faculty', 'HOD', 'Director'];

export default function GrievancesPage() {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [remarks, setRemarks] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const loadData = () => {
    setGrievances(db.getAll('grievances').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setStudents(db.getAll('students'));
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if (['grievances', 'students'].includes(event.detail.table)) {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  const handleUpdate = (grievanceId: string, updates: Partial<Grievance>) => {
    const grievanceToUpdate = db.getById('grievances', grievanceId);
    if(grievanceToUpdate) {
        const newGrievance = { ...grievanceToUpdate, ...updates };
        db.update('grievances', grievanceId, newGrievance);
        
        toast({ title: "Status Updated", description: `Grievance #${grievanceId} has been updated.`});

        const student = students.find(s => s.roll === newGrievance.studentId);
        if (student) {
            const admin_remarks = remarks[grievanceId] || `Your grievance status has been updated.`;
            
            sendGrievanceStatusUpdateEmail({
                student_name: student.name,
                to_email: student.email,
                ticket_id: grievanceId,
                new_status: newGrievance.status,
                admin_remarks: admin_remarks,
                from_name: "Obsidian Peak Grievance Cell",
                grievance_category: newGrievance.category,
                submission_date: newGrievance.date
            })
            .then(() => {
                toast({ title: "Notification Sent", description: `An email has been sent to ${student.name}.`});
            })
            .catch((error) => {
                console.error("EmailJS FAILED...", error);
                toast({ title: "Email Error", description: "Failed to send notification email. Check EmailJS configuration.", variant: "destructive" });
            });
        }
    }
  }

  const handleRemarkChange = (grievanceId: string, value: string) => {
      setRemarks(prev => ({ ...prev, [grievanceId]: value }));
  }
  
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Grievance Redressal
      </h2>
      <Card>
        <CardHeader>
            <CardTitle>Student Grievances</CardTitle>
            <CardDescription>
                View and manage student-submitted grievances.
            </CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead className="w-[250px]">Description</TableHead>
                <TableHead>Admin Remarks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assign to Dept</TableHead>
                <TableHead>Assign to Role</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {grievances.map((grievance) => {
                return (
                    <TableRow key={grievance.id}>
                        <TableCell className="font-mono">{grievance.id}</TableCell>
                        <TableCell>{grievance.studentName}<br/><span className="text-xs text-muted-foreground">{grievance.studentId}</span></TableCell>
                        <TableCell className="max-w-xs">
                            <p className="font-medium">{grievance.subject}</p>
                            <p className="text-xs text-muted-foreground truncate" title={grievance.description}>{grievance.description}</p>
                            <Badge variant="secondary" className="mt-1">{grievance.category}</Badge>
                        </TableCell>
                        <TableCell>
                            <Textarea 
                                placeholder="Add remarks before changing status..."
                                value={remarks[grievance.id] || ''}
                                onChange={(e) => handleRemarkChange(grievance.id, e.target.value)}
                            />
                        </TableCell>
                        <TableCell>
                            <Select value={grievance.status} onValueChange={(value: Grievance['status']) => handleUpdate(grievance.id, { status: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                         <TableCell>
                            <Select value={grievance.department} onValueChange={(value: string) => handleUpdate(grievance.id, { department: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Dept"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => <SelectItem key={dept} value={dept}>{dept}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell>
                            <Select value={grievance.assignedTo} onValueChange={(value: Grievance['assignedTo']) => handleUpdate(grievance.id, { assignedTo: value })}>
                                <SelectTrigger>
                                     <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                                </SelectContent>
                            </Select>
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
