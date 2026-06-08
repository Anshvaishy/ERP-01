
'use client';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Utensils, Wrench, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db, Student, HostelRoom } from '@/lib/local-storage-db';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const menu = {
    Monday: "Aloo Paratha, Curd",
    Tuesday: "Poha, Jalebi",
    Wednesday: "Chole Bhature",
    Thursday: "Idli Sambar",
    Friday: "Masala Dosa",
    Saturday: "Sandwich, Juice",
    Sunday: "Puri Sabji, Halwa",
}

function MaintenanceDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit this to a backend.
    toast({ title: "Ticket Submitted", description: "Your maintenance request has been logged."});
    setOpen(false);
    formRef.current?.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"><Wrench className="mr-2 h-4 w-4" /> Raise Maintenance Ticket</Button>
      </DialogTrigger>
      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Raise Maintenance Ticket</DialogTitle>
            <DialogDescription>Describe the issue you are facing in your room.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="issue-type">Issue Type</Label>
              <Select name="issue-type" required>
                <SelectTrigger><SelectValue placeholder="Select issue type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="carpentry">Carpentry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Please provide details about the issue..." required/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
            <Button type="submit">Submit Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function OutPassDialog() {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to submit out-pass request
        toast({ title: "Request Submitted", description: "Your out-pass request has been sent for approval." });
        setOpen(false);
        formRef.current?.reset();
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><LogOut className="mr-2 h-4 w-4" /> Apply for Out-Pass</Button>
            </DialogTrigger>
            <DialogContent>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Apply for Out-Pass</DialogTitle>
                    <DialogDescription>Fill in the details for your leave from the hostel.</DialogDescription>
                  </DialogHeader>
                   <div className="space-y-4 py-4">
                        <div className="space-y-2">
                           <Label htmlFor="reason">Reason</Label>
                           <Input id="reason" name="reason" placeholder="e.g., Going home for weekend" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="departure">Departure Date</Label>
                                <Input id="departure" name="departure" type="date" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="return">Return Date</Label>
                                <Input id="return" name="return" type="date" required/>
                            </div>
                        </div>
                   </div>
                   <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="ghost">Cancel</Button></DialogClose>
                        <Button type="submit">Apply</Button>
                   </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default function HostelPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [hostelInfo, setHostelInfo] = useState<HostelRoom | null>(null);
  
  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
        const currentStudent = db.getAll('students').find(s => s.email === session.user);
        if (currentStudent) {
            setStudent(currentStudent);
            const studentHostelInfo = db.getAll('hostel').find(h => h.roll === currentStudent.roll);
            setHostelInfo(studentHostelInfo || null);
        }
    }
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }) as keyof typeof menu;

  if (!student) {
    return (
        <div className="flex items-center justify-center h-full">
            <p>Loading hostel data...</p>
        </div>
    )
  }

  if (!hostelInfo) {
    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Residential Management</h2>
            <Card className="mt-6">
                <CardContent className="pt-6 text-center text-muted-foreground">
                    You are not currently enrolled in any hostel.
                </CardContent>
            </Card>
        </>
    )
  }

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Residential Management</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Room Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-lg"><span className="font-semibold">Room Number:</span> {hostelInfo.roomNo}</p>
            <p className="text-lg"><span className="font-semibold">Hostel Block:</span> {hostelInfo.roomNo.split('-')[0]}</p>
            <p className="text-lg"><span className="font-semibold">Status:</span> <span className="text-green-600 font-medium">{hostelInfo.status}</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Utensils className="mr-2" /> Today's Menu</CardTitle>
            <CardDescription>{today}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{menu[today] || "Menu not available"}</p>
            <p className="text-xs text-muted-foreground mt-1">Breakfast Menu</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Request services or manage your out-pass.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
              <MaintenanceDialog />
              <OutPassDialog />
          </CardContent>
      </Card>
    </>
  );
}
