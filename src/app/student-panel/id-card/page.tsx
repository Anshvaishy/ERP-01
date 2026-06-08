
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, User, Phone, Shield, Link as LinkIcon, Laptop, Smartphone, Edit } from 'lucide-react';
import { db, Student } from '@/lib/local-storage-db';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

function InfoCard({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-3">
                <Icon className="h-6 w-6 text-primary" />
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

function InfoItem({ label, value }: { label: string, value: string | undefined }) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-semibold">{value || 'Not available'}</p>
        </div>
    )
}

export default function IdCardPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const studentImage = PlaceHolderImages.find(p => p.id === 'testimonial-2');

  useEffect(() => {
    const session = db.get('session');
    if (session?.user) {
      const currentStudent = db.getAll('students').find(s => s.email === session.user);
      setStudent(currentStudent || null);
    }
  }, []);

  if (!student) {
    return <div>Loading Personal Information...</div>;
  }
  
  const studentInitial = student.name.split(' ').map(n => n[0]).join('');

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Digital Identity Hub</h2>
         <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit Information</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - ID Card */}
        <div className="lg:col-span-1">
             <div className="bg-card border p-6 rounded-lg shadow-md w-full sticky top-20">
                <div className="text-center mb-4">
                    <h4 className="font-bold text-lg text-primary">OBSIDIAN PEAK UNIVERSITY</h4>
                    <p className="text-xs text-muted-foreground">VIRTUAL IDENTITY CARD</p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-32 h-32 border-4 border-primary">
                        {studentImage && (
                            <AvatarImage src={student.photo || studentImage.imageUrl} alt={student.name} />
                        )}
                        <AvatarFallback className="text-4xl">{studentInitial}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <p className="font-bold text-2xl">{student.name}</p>
                        <p className="text-muted-foreground">{student.class}</p>
                        <p className="font-mono bg-muted px-2 py-1 rounded-md text-sm mt-2">Roll No: {student.roll}</p>
                    </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4 text-sm">
                    <InfoItem label="Academic Status" value={`Year 2, Semester 4`} />
                    <InfoItem label="Digital Signature" value={"On File"} />
                </div>
                <Button className="w-full mt-6"><Download className="mr-2 h-4 w-4" /> Download ID</Button>
            </div>
        </div>
        
        {/* Right Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
            <InfoCard title="Contact & Communication" icon={Phone}>
                <div className="grid md:grid-cols-2 gap-4">
                    <InfoItem label="Verified Mobile" value={student.contact} />
                    <InfoItem label="Alternative Contact" value={"Not Provided"} />
                    <InfoItem label="University Email" value={student.email} />
                    <InfoItem label="Personal Email" value={"Not Provided"} />
                    <InfoItem label="Current Address" value={"Room A-101, Boys Hostel"} />
                    <InfoItem label="Permanent Address" value={"123, Main St, New Delhi"} />
                </div>
            </InfoCard>

            <InfoCard title="Safety & Emergency" icon={Shield}>
                <div className="grid md:grid-cols-2 gap-4">
                    <InfoItem label="Emergency Contact (SOS)" value={"Mr. Kumar | +91 9876543210"} />
                    <InfoItem label="Blood Group" value={"O+"} />
                    <InfoItem label="Medical Alerts" value={"None"} />
                    <InfoItem label="Disability Info" value={"None"} />
                </div>
            </InfoCard>

            <InfoCard title="Integration & Security" icon={LinkIcon}>
                 <div className="grid md:grid-cols-2 gap-4">
                    <InfoItem label="ABC ID" value={"9876-5432-1098-7654"} />
                    <InfoItem label="Blockchain Wallet Address" value={"0xAb...89Dc"} />
                    <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Linked Devices</p>
                        <div className="flex items-center gap-4 mt-1 font-semibold">
                            <span className="flex items-center gap-2"><Laptop className="h-4 w-4" /> MacBook Pro</span>
                            <span className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> iPhone 15</span>
                        </div>
                    </div>
                </div>
            </InfoCard>
        </div>
      </div>
    </>
  );
}
