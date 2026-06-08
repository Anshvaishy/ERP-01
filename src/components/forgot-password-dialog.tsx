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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { db, Student, Faculty } from '@/lib/local-storage-db';
import { sendPasswordResetEmail } from '@/lib/emailjs-client';

export function ForgotPasswordDialog() {
    const [open, setOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        const email = formData.get('email') as string;

        if (!email) {
            toast({ title: "Error", description: "Please enter your email address.", variant: 'destructive' });
            return;
        }

        setIsPending(true);

        const student = db.getAll('students').find(s => s.email === email);
        const faculty = db.getAll('faculty').find(f => f.email === email);
        const user = student || faculty;

        if (user && user.name) {
            try {
                // In a real app, generate a secure, unique reset token and URL.
                // For this demo, we'll use a placeholder link.
                const resetLink = `${window.location.origin}/login?reset=true`;

                await sendPasswordResetEmail({
                    to_email: email,
                    name: user.name,
                    reset_link: resetLink,
                });

            } catch (error) {
                console.error("Failed to send password reset email:", error);
                // We still show a generic success message to the user for security.
                // But we log the error for debugging.
            }
        }

        // Always show a generic message to prevent email enumeration attacks.
        toast({
            title: "Check Your Email",
            description: `If an account exists for ${email}, you will receive a password reset link.`,
        });
        
        setIsPending(false);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button type="button" className="text-sm font-medium text-primary hover:underline focus:outline-none">
                    Forgot Password?
                </button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Reset Your Password</DialogTitle>
                        <DialogDescription>
                            Enter your email address and we'll send you a link to reset your password.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Label htmlFor="reset-email" className="sr-only">Email Address</Label>
                        <Input id="reset-email" name="email" type="email" placeholder="you@example.com" required />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Send Reset Link
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
