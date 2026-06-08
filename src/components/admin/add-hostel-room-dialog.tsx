
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
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, HostelRoom } from '@/lib/local-storage-db';
import { Input } from '../ui/input';

export function AddHostelRoomDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const roomNo = formData.get('roomNo') as string;
        const capacity = Number(formData.get('capacity'));

        if (!roomNo || !capacity) {
            toast({ title: 'Error', description: 'All fields are required.', variant: 'destructive' });
            return;
        }

        const existing = db.getById('hostel', roomNo);
        if (existing) {
            toast({ title: 'Error', description: 'A room with this number already exists.', variant: 'destructive' });
            return;
        }
        
        const newRoom: HostelRoom = {
            roomNo,
            capacity,
            roll: null,
            status: 'Vacant',
        };
        db.add('hostel', newRoom);
        toast({ title: 'Success', description: 'New room added.' });
        setOpen(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Room
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New Hostel Room</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="roomNo">Room Number</Label>
                            <Input id="roomNo" name="roomNo" placeholder='e.g. A-103' required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input id="capacity" name="capacity" type="number" placeholder='e.g. 2' required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Add Room</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
