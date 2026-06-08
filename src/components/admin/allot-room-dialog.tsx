
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
import { db } from '@/lib/local-storage-db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { HostelRoom, Student } from '@/lib/local-storage-db';

type AllotRoomDialogProps = {
    students: Student[];
    vacantRooms: HostelRoom[];
}

export function AllotRoomDialog({ students, vacantRooms }: AllotRoomDialogProps) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const roll = formData.get('roll') as string;
        const roomNo = formData.get('roomNo') as string;
        
        if(!roll || !roomNo) {
            toast({ title: 'Error', description: 'Please select a student and a room.', variant: 'destructive' });
            return;
        }

        const roomToUpdate = db.getById('hostel', roomNo);
        if (roomToUpdate) {
            db.update('hostel', roomNo, { ...roomToUpdate, roll, status: 'Occupied' });
            
            // Add hostel fee for the student
            const existingFee = db.getAll('fees').find(f => f.roll === roll && f.feeType === 'Hostel');
            if(!existingFee) {
                db.updateFee(roll, 'Hostel', 0);
            }

            toast({ title: 'Success', description: 'Room allotted successfully.' });
            setOpen(false);
        } else {
             toast({ title: 'Error', description: 'Room not found.', variant: 'destructive' });
        }
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={vacantRooms.length === 0 || students.length === 0}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Allot Room
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Allot New Room</DialogTitle>
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
                        <div className="space-y-2">
                            <Label htmlFor="roomNo">Vacant Room</Label>
                             <Select name="roomNo" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a room" />
                                </SelectTrigger>
                                <SelectContent>
                                    {vacantRooms.map(r => <SelectItem key={r.roomNo} value={r.roomNo}>{r.roomNo}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Allot Room</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
