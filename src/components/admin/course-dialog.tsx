
'use client';
import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import { db, Subject, Faculty } from '@/lib/local-storage-db';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { programDetailsData } from '@/lib/program-details';
import { Textarea } from '../ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateCourseDescription } from '@/ai/flows/generate-course-descriptions';

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
  'Hostel'
];

export function CourseDialog({
  subject,
  trigger,
  faculty,
}: {
  subject?: Subject | null;
  trigger: React.ReactNode;
  faculty: Faculty[];
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<Subject>>({
    code: '', name: '', class: '', facultyId: '', department: '', description: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const classNames = [...new Set(programDetailsData.map(p => p.programName).filter(p => p !== "Default"))];

  useEffect(() => {
    if (open && subject) {
        setFormData(subject);
    } else if (open) {
        setFormData({ code: '', name: '', class: '', facultyId: '', department: '', description: '' });
    }
  }, [open, subject]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value === 'none' ? '' : value });
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) {
      toast({ title: "Error", description: "Please enter a subject name first.", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateCourseDescription({
        keywords: formData.name,
        constraints: `Target audience are university students for the ${formData.class} program. The description should be engaging and professional.`
      });
      setFormData(prev => ({ ...prev, description: result.description }));
    } catch (e) {
      console.error(e);
      toast({ title: "AI Error", description: "Failed to generate description. Check Genkit server.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = () => {
    const { code, name, class: className, department } = formData;
    if (!code || !name || !className || !department) {
        toast({ title: 'Error', description: 'Code, Name, Class and Department are required.', variant: 'destructive' });
        return;
    }
    
    if (subject) { // Editing
        db.update('subjects', subject.code, formData);
        toast({ title: 'Success', description: 'Subject updated successfully.' });
    } else { // Adding
        const existing = db.getById('subjects', code);
        if (existing) {
            toast({ title: 'Error', description: 'A subject with this code already exists.', variant: 'destructive' });
            return;
        }
        db.add('subjects', formData as Subject);
        toast({ title: 'Success', description: 'Subject added successfully.' });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{subject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-8 py-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Subject Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Subject Code</Label>
                  <Input id="code" name="code" placeholder="e.g., CS50" value={formData.code} onChange={handleChange} required disabled={!!subject} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Subject Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Advanced AI" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                   <Select name="department" value={formData.department} onValueChange={(v) => handleSelectChange('department', v)}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                        {departments.map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="class">Class/Program</Label>
                   <Select name="class" value={formData.class} onValueChange={(v) => handleSelectChange('class', v)}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select Program" />
                        </SelectTrigger>
                        <SelectContent>
                        {classNames.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
              </div>
               <div className="space-y-2">
                  <Label htmlFor="facultyId">Assigned Faculty</Label>
                   <Select name="facultyId" value={formData.facultyId || 'none'} onValueChange={(v) => handleSelectChange('facultyId', v)}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select Faculty" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="none">Not Assigned</SelectItem>
                        {faculty.map((f) => (
                            <SelectItem key={f.id} value={f.id}>{f.name} ({f.department})</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="description">Description</Label>
                        <Button type="button" variant="ghost" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Generate with AI
                        </Button>
                    </div>
                  <Textarea id="description" name="description" placeholder="A brief description of the course..." value={formData.description} onChange={handleChange} rows={4} />
                </div>
            </div>
          </div>
          <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="button" onClick={handleSubmit}>Save Subject</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
