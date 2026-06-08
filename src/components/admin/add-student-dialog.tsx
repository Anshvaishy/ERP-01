
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Subject, db } from '@/lib/local-storage-db';
import { PasswordInput } from '../password-input';
import { programDetailsData } from '@/lib/program-details';

type AddStudentDialogProps = {
  subjects: Subject[];
};

export function AddStudentDialog({ subjects }: AddStudentDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    roll: `STU${Math.floor(10000 + Math.random() * 90000)}`,
    name: '',
    class: '',
    dob: '',
    contact: '',
    email: '',
    password: '',
    photo: ''
  });

  const classNames = programDetailsData.filter(p => p.programName !== "Default").map(p => p.programName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, class: value });
  };

  const handleSubmit = () => {
    const { roll, name, class: className, dob, contact, email, password } = formData;
    if (!roll || !name || !className || !dob || !contact || !email || !password) {
      toast({ title: 'Error', description: 'All fields are required.', variant: 'destructive' });
      return;
    }
    const existing = db.getById('students', roll);
    if(existing) {
        toast({ title: 'Error', description: 'A student with this roll number already exists.', variant: 'destructive'});
        return;
    }

    db.add('students', formData);
    
    // Create initial fee records
    db.updateFee(roll, 'Tuition', 0);
    db.updateFee(roll, 'Examination', 0);
    db.updateFee(roll, 'Other', 0);
    
    toast({ title: 'Success', description: 'Student added successfully.' });
    setOpen(false);
    // Reset form
    setFormData({
      roll: `STU${Math.floor(10000 + Math.random() * 90000)}`,
      name: '', class: '', dob: '', contact: '', email: '', password: '', photo: ''
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="roll">Roll Number</Label>
                  <Input id="roll" name="roll" value={formData.roll} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select name="class" onValueChange={handleSelectChange} required>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                        <SelectContent>
                        {classNames.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" name="contact" type="tel" value={formData.contact} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
            <Button type="button" onClick={handleSubmit}>Add Student</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
