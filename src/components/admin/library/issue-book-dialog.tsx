
'use client';
import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/local-storage-db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { LibraryBook, Student } from '@/lib/local-storage-db';

type IssueBookDialogProps = {
    book: LibraryBook;
    students: Student[];
}

export function IssueBookDialog({ book, students }: IssueBookDialogProps) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const roll = formData.get('roll') as string;
        
        if (!roll) {
            toast({ title: 'Error', description: 'Please select a student.', variant: 'destructive' });
            return;
        }

        const today = new Date();
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 14); // 2 weeks due date

        const updatedBook: LibraryBook = {
            ...book,
            roll,
            status: 'Issued',
            issueDate: today.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
        };

        db.update('library', book.bookTitle, updatedBook);
        toast({ title: 'Success', description: 'Book issued successfully.' });
        setOpen(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">Issue</Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Issue Book: {book.bookTitle}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="roll">Student</Label>
                            <Select name="roll" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                    {students.map(s => <SelectItem key={s.roll} value={s.roll}>{s.name} ({s.roll})</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Issue Book</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
