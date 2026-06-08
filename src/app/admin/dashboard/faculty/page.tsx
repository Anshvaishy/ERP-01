
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
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { db, Faculty } from '@/lib/local-storage-db';
import { AddFacultyDialog } from '@/components/admin/add-faculty-dialog';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function FacultyPage() {
  const { toast } = useToast();
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  const loadData = () => {
    setFaculty(db.getAll('faculty'));
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (event: any) => {
        if (event.detail.table === 'faculty') {
            loadData();
        }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
        db.delete('faculty', id);
        toast({ title: 'Success', description: 'Faculty member deleted.' });
    }
  }
  
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">
        Faculty Management
      </h2>
       <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Faculty Roster</CardTitle>
                    <CardDescription>
                        View and manage all faculty members.
                    </CardDescription>
                  </div>
                  <AddFacultyDialog />
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Faculty Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {(faculty ?? []).map((member) => {
                        return (
                            <TableRow key={member.id}>
                                <TableCell>
                                    <div className="font-medium">{member.name}</div>
                                </TableCell>
                                <TableCell>{member.department}</TableCell>
                                <TableCell><Badge variant="secondary">{member.role}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}
