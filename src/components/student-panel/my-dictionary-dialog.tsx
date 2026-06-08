
'use client';
import { useState } from 'react';
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
import { ScrollArea } from '../ui/scroll-area';

const dictionaryTerms = {
    "CGPA": "Cumulative Grade Point Average. The average of Grade Points obtained in all the papers, starting from the first semester to the current semester.",
    "SGPA": "Semester Grade Point Average. The average of Grade Points obtained in all the papers in a single semester.",
    "LMS": "Learning Management System. A digital platform for course materials, assignments, and online learning activities.",
    "NCTE": "National Council for Teacher Education. A statutory body of the Indian government set up to formally oversee standards, procedures and processes in the Indian education system.",
    "OBE": "Outcome-Based Education. An educational model that focuses on measuring student performance (outcomes) through our courses.",
    "ABC ID": "Academic Bank of Credits ID. A unique ID for each student to access their digital credit bank, allowing for credit transfer across institutions.",
    "OPAC": "Online Public Access Catalog. An online database of materials held by a library, accessible to the public.",
};

export function MyDictionaryDialog({ trigger }: { trigger: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>My Dictionary</DialogTitle>
                    <DialogDescription>A glossary of common terms and acronyms used at the university.</DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72">
                    <div className="space-y-4 py-4 pr-6">
                        {Object.entries(dictionaryTerms).map(([term, definition]) => (
                            <div key={term}>
                                <h4 className="font-semibold text-primary">{term}</h4>
                                <p className="text-sm text-muted-foreground">{definition}</p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose asChild><Button type="button">Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
