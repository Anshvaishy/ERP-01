
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
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, File, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, Student, LmsAssignment, LmsSubmission } from '@/lib/local-storage-db';
import { Input } from '@/components/ui/input';

type SubmitAssignmentDialogProps = {
    student: Student;
    assignment: LmsAssignment;
};

export function SubmitAssignmentDialog({ student, assignment }: SubmitAssignmentDialogProps) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSubmit = () => {
        if (!selectedFile) {
            toast({ title: 'Error', description: 'Please select a file to upload.', variant: 'destructive' });
            return;
        }

        setIsPending(true);
        // Simulate upload and submission
        setTimeout(() => {
            const newSubmission: LmsSubmission = {
                assignmentId: assignment.id,
                studentRoll: student.roll,
                submissionDate: new Date().toISOString(),
                file: {
                    name: selectedFile.name,
                    url: '#', // Placeholder URL
                },
            };
            
            db.add('lmsSubmissions', newSubmission);
            
            toast({ title: 'Success', description: 'Your assignment has been submitted.' });
            setIsPending(false);
            setOpen(false);
        }, 1500);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm"><Upload className="mr-2 h-4 w-4" /> Submit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submit Assignment: {assignment.title}</DialogTitle>
                    <DialogDescription>
                        Due Date: {assignment.dueDate}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div>
                        <h4 className="font-semibold">Instructions:</h4>
                        <p className="text-sm text-muted-foreground">{assignment.instructions || 'No special instructions.'}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Upload Your File</h4>
                        <Input type="file" ref={fileInputRef} onChange={handleFileChange} />
                        {selectedFile && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted rounded-md">
                                <File className="h-4 w-4"/>
                                <span>{selectedFile.name}</span>
                            </div>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="outline" disabled={isPending}>Cancel</Button></DialogClose>
                    <Button type="button" onClick={handleSubmit} disabled={isPending || !selectedFile}>
                         {isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Confirm Submission"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
