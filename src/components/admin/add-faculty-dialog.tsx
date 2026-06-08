
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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, Faculty } from '@/lib/local-storage-db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const departments = [
  'Advanced Technology & AI',
  'Engineering & Applied Sciences',
  'Business & Entrepreneurship',
  'Health & Life Sciences',
  'Humanities & Global Studies',
  'Legal Studies',
  'Admissions',
  'Research & Development',
  'Student Affairs',
  'IT Infrastructure',
  'Library',
  'Hostel',
  'ALL'
];
const roles: Faculty['role'][] = ['Faculty', 'HOD', 'Director'];

export function AddFacultyDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        role: 'Faculty' as Faculty['role'],
        contact: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        const { name, department, role, contact } = formData;
        if (!name || !department || !role || !contact) {
            toast({ title: "Error", description: "All fields are required.", variant: 'destructive'});
            return;
        }

        const newFaculty = {
            id: `FAC${Date.now()}`,
            ...formData
        };

        db.add('faculty', newFaculty);
        toast({ title: 'Success', description: 'New faculty member added.'});
        setOpen(false);
        setFormData({ name: '', department: '', role: 'Faculty', contact: ''});
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" /> New Faculty
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Faculty Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Faculty Name</Label>
                        <Input 
                            id="name"
                            name="name" 
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Dr. Ada Lovelace" 
                            required
                        />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select name="department" onValueChange={(v) => handleSelectChange('department', v)} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select name="role" value={formData.role} onValueChange={(v) => handleSelectChange('role', v)} required>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="contact">Contact</Label>
                        <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required placeholder="e.g., 9876543210" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
                    <Button type="button" onClick={handleSubmit}>Add Faculty</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
