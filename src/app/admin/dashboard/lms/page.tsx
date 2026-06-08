
'use client';
import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CreateAssignmentDialog } from '@/components/admin/lms/create-assignment-dialog';
import { db, LmsAssignment, LmsMaterial, Subject } from '@/lib/local-storage-db';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LMSPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const [assignments, setAssignments] = useState<LmsAssignment[]>([]);
  const [materials, setMaterials] = useState<LmsMaterial[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const loadData = () => {
    setAssignments(db.getAll('lmsAssignments'));
    setMaterials(db.getAll('lmsMaterials'));
    setSubjects(db.getAll('subjects'));
  };

  useEffect(() => {
    loadData();
    const handleDbChange = (e: any) => {
      if (['lmsAssignments', 'lmsMaterials'].includes(e.detail.table)) {
        loadData();
      }
    };
    window.addEventListener('db-change', handleDbChange);
    return () => window.removeEventListener('db-change', handleDbChange);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadMaterial = () => {
    if (!selectedFile || !selectedSubject) {
      toast({ title: 'Error', description: 'Please select a file and a subject.', variant: 'destructive' });
      return;
    }
    
    // In a real app, this would upload to a storage service and get a URL.
    // For demo, we'll just create a placeholder record.
    const newMaterial: LmsMaterial = {
      id: `MAT${Date.now()}`,
      subjectCode: selectedSubject,
      title: selectedFile.name,
      type: selectedFile.type.split('/')[0] || 'Link', // Simplistic type detection
      url: '#' // Placeholder URL
    };
    
    db.add('lmsMaterials', newMaterial);
    toast({
      title: "Material Added",
      description: `"${selectedFile.name}" has been added to the course materials.`,
    });

    setSelectedFile(null);
    setSelectedSubject('');
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Learning Management System (LMS)</h2>
      
      <div className="grid lg:grid-cols-2 gap-8 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Course Material</CardTitle>
            <CardDescription>Upload lecture notes, videos, or presentations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="subject-select">Select Course</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger id="subject-select">
                  <SelectValue placeholder="Select a course..." />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(s => <SelectItem key={s.code} value={s.code}>[{s.class}] {s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="material-file">Material File</Label>
              <Input
                id="material-file"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*,application/pdf,.pptx,.doc,.docx"
              />
            </div>
            <Button onClick={handleUploadMaterial} disabled={!selectedFile || !selectedSubject}>
                <Upload className="mr-2 h-4 w-4" /> Upload Material
            </Button>
          </CardContent>
        </Card>

         <Card>
          <CardHeader className="flex flex-row justify-between items-start">
            <div>
              <CardTitle>Manage Assignments</CardTitle>
              <CardDescription>Create and view assignments for your courses.</CardDescription>
            </div>
            <CreateAssignmentDialog />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map(a => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell><Badge variant="outline">{a.subjectCode}</Badge></TableCell>
                    <TableCell>{a.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

       <Card className="mt-8">
          <CardHeader>
            <CardTitle>Uploaded Course Materials</CardTitle>
            <CardDescription>A list of all available materials.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materials.map(m => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.title}</TableCell>
                    <TableCell><Badge variant="outline">{m.subjectCode}</Badge></TableCell>
                    <TableCell>{m.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </>
  );
}
