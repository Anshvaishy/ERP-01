

'use client';

import { Button } from '@/components/ui/button';
import { Check, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/local-storage-db';
import { useState } from 'react';

type StudentActionProps = {
  action: 'approve' | 'deny' | 'delete';
  itemId: string;
};

export function StudentActions({ action, itemId }: StudentActionProps) {
    const { toast } = useToast();
    const [isPending, setIsPending] = useState(false);

    const handleAction = () => {
        setIsPending(true);

        try {
            if (action === 'approve') {
                const request = db.getById('admissions', itemId);
                if (!request) throw new Error("Request not found");
                
                const studentId = `STU${Date.now()}`;
                
                const newStudent = {
                    roll: studentId,
                    name: request.name,
                    class: request.class,
                    dob: request.dob,
                    contact: request.contact,
                    email: request.email,
                    photo: '',
                    password: request.password, 
                };
                db.add('students', newStudent);

                db.delete('admissions', itemId);
                toast({ title: "Success", description: "Admission approved." });

            } else if (action === 'deny') {
                db.delete('admissions', itemId);
                toast({ title: "Success", description: "Admission denied." });
            } else if (action === 'delete') {
                if(confirm("Are you sure you want to delete this student?")) {
                   db.delete('students', itemId);
                   toast({ title: "Success", description: "Student deleted." });
                }
            }
        } catch(e: any) {
             toast({ title: "Error", description: e.message || 'An error occurred', variant: 'destructive' });
        } finally {
            setIsPending(false);
        }
    }

    const icons = {
      approve: <Check className="h-4 w-4" />,
      deny: <X className="h-4 w-4" />,
      delete: <Trash2 className="h-4 w-4 text-destructive" />
    };

    const getButtonText = () => {
        switch(action) {
            case 'approve': return 'Approve';
            case 'deny': return 'Deny';
            case 'delete': return 'Delete';
        }
    }

    return (
        <Button variant="ghost" size="icon" onClick={handleAction} disabled={isPending} aria-label={getButtonText()}>
            {isPending ? "..." : icons[action]}
        </Button>
    )
}
