
'use client';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { db, Grievance, Student } from '@/lib/local-storage-db';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function GrievancePage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  const loadGrievances = () => {
    const session = db.get('session');
    if (session?.user) {
        const currentStudent = db.getAll('students').find(s => s.email === session.user);
        setStudent(currentStudent || null);
        if (currentStudent) {
            setGrievances(
                db.getAll('grievances')
                .filter(g => g.studentId === currentStudent.roll)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );
        }
    }
  };

  useEffect(() => {
    loadGrievances();
    const handleDbChange = (event: any) => {
        if(event.detail.table === 'grievances') {
            loadGrievances();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) {
        toast({ title: "Error", description: "You must be logged in to submit a grievance.", variant: 'destructive' });
        return;
    }

    const formData = new FormData(formRef.current!);
    const category = formData.get('category') as string;
    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    
    if (!category || !subject || !description) {
        toast({ title: "Error", description: "All fields are required.", variant: 'destructive' });
        return;
    }

    const newGrievance: Grievance = {
        id: `TKT${Date.now()}`,
        studentId: student.roll,
        studentName: student.name,
        date: new Date().toISOString(),
        category,
        subject,
        description,
        status: 'Pending',
    };
    
    db.add('grievances', newGrievance);

    toast({ title: "Success", description: 'Your grievance has been submitted successfully.' });
    formRef.current?.reset();
  };

  const getStatusVariant = (status: Grievance['status']) => {
    switch(status) {
        case 'Resolved': return 'default';
        case 'In Progress': return 'secondary';
        case 'Pending': return 'destructive';
        default: return 'outline';
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Grievance Redressal</h2>
      <div className="grid lg:grid-cols-2 gap-8 mt-6">
        <Card>
            <form ref={formRef} onSubmit={handleSubmit}>
                <CardHeader>
                <CardTitle>Submit a New Grievance</CardTitle>
                <CardDescription>Your concerns are important to us. Please fill out the form below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" required>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Academic">Academic</SelectItem>
                                <SelectItem value="Hostel">Hostel</SelectItem>
                                <SelectItem value="Fees">Fees / Accounts</SelectItem>
                                <SelectItem value="Library">Library</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" placeholder="A brief subject for your grievance" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" placeholder="Please describe your issue in detail..." rows={6} required />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Submit Grievance
                    </Button>
                </CardFooter>
            </form>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Grievance History</CardTitle>
                <CardDescription>Track the status of your submitted grievances.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {grievances.length === 0 ? (
                    <p className="text-center text-muted-foreground pt-8">You have not submitted any grievances.</p>
                ) : (
                   <div className="space-y-4 h-[500px] overflow-y-auto pr-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ticket ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Assigned Dept</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {grievances.map((grievance) => (
                                <TableRow key={grievance.id}>
                                    <TableCell className="font-mono">{grievance.id}</TableCell>
                                    <TableCell>{new Date(grievance.date).toLocaleDateString()}</TableCell>
                                     <TableCell>{grievance.department || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(grievance.status)}>{grievance.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                   </div>
                )}
            </CardContent>
        </Card>
      </div>
    </>
  );
}
