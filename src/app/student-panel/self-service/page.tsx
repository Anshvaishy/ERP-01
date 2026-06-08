
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { db, Student, Faculty, Subject } from '@/lib/local-storage-db';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Phone } from 'lucide-react';

function InfoCard({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-lg text-primary">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

function AuthorityCard({ person, role, department }: { person: Faculty, role: string, department?: string }) {
    const fallback = person.name.split(' ').map(n => n[0]).join('');
    const deanImage = PlaceHolderImages.find(p => p.id === (person.id.startsWith('HOD03') ? 'dean-female' : 'dean-male'));

    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                {deanImage && <AvatarImage src={deanImage.imageUrl} />}
                <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold text-lg">{person.name}</p>
                <p className="text-sm text-muted-foreground font-semibold">{role} {department && `- ${department}`}</p>
                 <div className="text-xs text-muted-foreground space-y-1 mt-2">
                    {person.email && (
                        <div className="flex items-center gap-2">
                           <Mail className="w-3 h-3"/> <span>{person.email}</span>
                        </div>
                    )}
                     <div className="flex items-center gap-2">
                       <Phone className="w-3 h-3"/> <span>{person.contact}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SelfServicePage() {
    const [student, setStudent] = useState<Student | null>(null);
    const [director, setDirector] = useState<Faculty | null>(null);
    const [hod, setHod] = useState<Faculty | null>(null);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [facultyMap, setFacultyMap] = useState<Record<string, Faculty>>({});
    const studentImage = PlaceHolderImages.find(p => p.id === 'dashboard-profile');

    useEffect(() => {
        const session = db.get('session');
        if (session?.user) {
            const allFaculty = db.getAll('faculty');
            const allSubjects = db.getAll('subjects');
            
            const currentStudent = db.getAll('students').find(s => s.email === session.user);
            setStudent(currentStudent || null);

            const universityDirector = allFaculty.find(f => f.role === 'Director');
            setDirector(universityDirector || null);

            if (currentStudent) {
                const departmentHod = allFaculty.find(f => f.role === 'HOD' && f.department === currentStudent.department);
                setHod(departmentHod || null);

                const studentSubjects = allSubjects.filter(s => s.class === currentStudent.class);
                setSubjects(studentSubjects);
                
                const fMap: Record<string, Faculty> = {};
                allFaculty.forEach(f => { fMap[f.id] = f; });
                setFacultyMap(fMap);
            }
        }
    }, []);

    if (!student) {
        return <div className="flex h-full items-center justify-center">Loading Student Dashboard...</div>
    }

    return (
        <div>
            {/* 1. Top Header */}
            <div className="mb-6 p-4 border bg-card rounded-lg flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold tracking-tight font-headline text-primary">Your Academic Dashboard</h1>
                    <p className="text-sm text-muted-foreground">An overview of your academic hierarchy.</p>
                </div>
                {director && (
                    <div className="text-right">
                        <p className="font-semibold">{director.name}</p>
                        <p className="text-xs text-muted-foreground font-medium">University Director</p>
                    </div>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    {/* 2. Student Info Card */}
                    <InfoCard title="My Profile">
                       <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                {studentImage && <AvatarImage src={student.photo || studentImage.imageUrl} />}
                                <AvatarFallback className="text-2xl">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xl font-bold">{student.name}</p>
                                <p className="text-sm text-muted-foreground">Roll No: {student.roll}</p>
                            </div>
                        </div>
                        <div className="mt-4 text-sm space-y-1">
                            <p><span className="font-semibold">Department:</span> {student.department}</p>
                            <p><span className="font-semibold">Program:</span> {student.class}</p>
                        </div>
                    </InfoCard>

                    {/* 3. Department Authority Section */}
                    {director && (
                         <InfoCard title="University Leadership">
                            <AuthorityCard person={director} role="University Director" />
                        </InfoCard>
                    )}
                    {hod && (
                        <InfoCard title="My Department">
                            <AuthorityCard person={hod} role="HOD" department={hod.department} />
                        </InfoCard>
                    )}
                </div>

                <div className="lg:col-span-2">
                     {/* 4. My Subjects Section */}
                    <InfoCard title="My Subjects & Faculty">
                        <div className="grid md:grid-cols-2 gap-4">
                            {subjects.map(subject => {
                                const teacher = facultyMap[subject.facultyId];
                                return (
                                    <Card key={subject.code} className="p-4">
                                        <p className="font-bold">{subject.name}</p>
                                        <p className="text-xs font-mono bg-muted inline-block px-2 py-0.5 rounded-full">{subject.code}</p>
                                        {teacher ? (
                                            <div className="mt-2 pt-2 border-t">
                                                <p className="text-xs font-medium text-primary">Subject Teacher</p>
                                                <p className="text-sm text-muted-foreground font-semibold">{teacher.name}</p>
                                                {teacher.email && (
                                                    <div className="flex items-center gap-2 text-xs mt-1 text-muted-foreground">
                                                        <Mail className="w-3 h-3"/> <span>{teacher.email}</span>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground mt-2 pt-2 border-t">Faculty not assigned</p>
                                        )}
                                    </Card>
                                )
                            })}
                        </div>
                    </InfoCard>
                </div>
            </div>
        </div>
    )
}
