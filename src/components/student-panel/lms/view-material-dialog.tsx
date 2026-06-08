
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
import { LmsMaterial } from '@/lib/local-storage-db';
import { BookOpen } from 'lucide-react';

type ViewMaterialDialogProps = {
    material: LmsMaterial;
};

export function ViewMaterialDialog({ material }: ViewMaterialDialogProps) {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="outline"><BookOpen className="mr-2 h-4 w-4" /> View</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{material.title}</DialogTitle>
                    <DialogDescription>
                        Course Material ({material.type})
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {material.type === 'Video' ? (
                        <div className="aspect-video">
                            <iframe 
                                className="w-full h-full rounded-lg"
                                src={material.url}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-muted rounded-lg">
                            <p>This is a placeholder for a {material.type} document.</p>
                            <Button asChild className="mt-4">
                                <a href={material.url} download>Download {material.type}</a>
                            </Button>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button">Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
