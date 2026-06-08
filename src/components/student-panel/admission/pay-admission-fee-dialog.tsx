
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
import { DollarSign, CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, Admission } from '@/lib/local-storage-db';

type PayAdmissionFeeDialogProps = {
  admissionRequest: Admission;
  onPaymentSuccess: () => void;
};

export function PayAdmissionFeeDialog({ admissionRequest, onPaymentSuccess }: PayAdmissionFeeDialogProps) {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();
    const admissionFee = 25000;

    const handlePayment = () => {
        setIsPending(true);
        // Simulate payment processing
        setTimeout(() => {
            try {
                // On successful payment, convert admission to student record
                const newStudent = {
                    roll: `STU${Date.now()}`,
                    name: admissionRequest.name,
                    class: admissionRequest.class,
                    dob: admissionRequest.dob,
                    contact: admissionRequest.contact,
                    email: admissionRequest.email,
                    photo: '',
                    password: admissionRequest.password
                };
                db.add('students', newStudent);

                // Create initial fee records for the new student
                db.updateFee(newStudent.roll, 'Annual', 0);
                db.updateFee(newStudent.roll, 'Exam', 0);

                // Remove the admission request
                db.delete('admissions', admissionRequest.id);

                toast({ title: 'Payment Successful', description: 'Your admission fee has been paid.' });
                onPaymentSuccess();
                setOpen(false);

            } catch (error) {
                 toast({ title: 'Error', description: 'An error occurred while processing your admission.', variant: 'destructive' });
            } finally {
                setIsPending(false);
            }
        }, 2000);
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mt-4">
                    <DollarSign className="mr-2 h-4 w-4" />
                    Pay Admission Fee
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Admission Fee Payment</DialogTitle>
                    <DialogDescription>You are about to pay the one-time admission fee to confirm your seat.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Admission Fee</span>
                            <span className="font-bold text-lg">₹{admissionFee.toLocaleString()}</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Clicking 'Pay Now' will simulate a payment process and confirm your admission.</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline" disabled={isPending}>Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handlePayment} disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Pay Now
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

