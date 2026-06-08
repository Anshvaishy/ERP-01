
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, LibraryBook } from '@/lib/local-storage-db';

export function AddBookDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const title = formData.get('title') as string;
        
        if (!title) {
            toast({ title: 'Error', description: 'Book title is required.', variant: 'destructive' });
            return;
        }

        const newBook: LibraryBook = {
            bookTitle: title,
            status: 'Available',
        };

        db.add('library', newBook);
        toast({ title: 'Success', description: 'Book added successfully.' });
        setOpen(false);
        formRef.current?.reset();
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Book
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Book</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Book Title</Label>
                            <Input id="title" name="title" placeholder='e.g., Clean Code' required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Add Book</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
