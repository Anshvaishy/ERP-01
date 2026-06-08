
'use client';
import { useState, useEffect, useRef } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { db, Subject, LmsAssignment } from '@/lib/local-storage-db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle } from 'lucide-react';

export function CreateAssignmentDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        if(open) {
            setSubjects(db.getAll('subjects'));
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const title = formData.get('title') as string;
        const subjectCode = formData.get('subjectCode') as string;
        const dueDate = formData.get('dueDate') as string;
        const instructions = formData.get('instructions') as string;

        if(!title || !subjectCode || !dueDate) {
            toast({ title: 'Error', description: 'Please fill out all required fields.', variant: 'destructive' });
            return;
        }

        const newAssignment: LmsAssignment = {
            id: `ASGN${Date.now()}`,
            title,
            subjectCode,
            dueDate,
            instructions
        };

        db.add('lmsAssignments', newAssignment);

        toast({ title: 'Success', description: `Assignment "${title}" created successfully.` });
        setOpen(false);
        formRef.current?.reset();
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create Assignment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Assignment</DialogTitle>
                        <DialogDescription>Fill in the details for the new assignment.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Assignment Title</Label>
                            <Input id="title" name="title" placeholder="e.g., Chapter 5 Problem Set" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="subjectCode">Course</Label>
                                <Select name="subjectCode" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {subjects.map(s => <SelectItem key={s.code} value={s.code}>[{s.class}] {s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dueDate">Due Date</Label>
                                <Input id="dueDate" name="dueDate" type="date" required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instructions">Instructions</Label>
                            <Textarea id="instructions" name="instructions" rows={5} placeholder="Provide detailed instructions for the assignment..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Create Assignment</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
