
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
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { db, FeeRecord, Student } from '@/lib/local-storage-db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { CreditCard } from 'lucide-react';

type PayDuesDialogProps = {
    student: Student;
    pendingDues: FeeRecord[];
    feeStructure: Record<FeeRecord['feeType'], number>;
};

export function PayDuesDialog({ student, pendingDues, feeStructure }: PayDuesDialogProps) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const feeType = formData.get('feeType') as FeeRecord['feeType'];
        const amount = Number(formData.get('amount'));

        if (!feeType || !amount || amount <= 0) {
            toast({ title: 'Error', description: 'Please select a fee type and enter a valid amount.', variant: 'destructive' });
            return;
        }
        
        const currentRecord = db.getAll('fees').find(f => f.roll === student.roll && f.feeType === feeType);
        const currentPaid = currentRecord?.amount || 0;
        const newTotalPaid = currentPaid + amount;

        db.updateFee(student.roll, feeType, newTotalPaid);
        
        toast({ title: 'Success', description: `₹${amount.toLocaleString()} paid successfully towards ${feeType} fee.` });
        setOpen(false);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={pendingDues.length === 0}>
                    <CreditCard className="mr-2 h-4 w-4"/> Pay Dues
                </Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Pay Your Dues</DialogTitle>
                        <DialogDescription>Select the fee you want to pay and enter the amount.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="feeType">Fee Type</Label>
                            <Select name="feeType" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a fee to pay" />
                                </SelectTrigger>
                                <SelectContent>
                                    {pendingDues.map(due => (
                                        <SelectItem key={due.feeType} value={due.feeType}>
                                            {due.feeType} Fee (Due: ₹{(feeStructure[due.feeType] - due.amount).toLocaleString()})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" name="amount" type="number" placeholder="Enter amount to pay" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                        <Button type="submit">Pay Now</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
