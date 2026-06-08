
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileCheck2, FileClock, FileX2, Loader2, PartyPopper } from 'lucide-react';
import { db, Student, Admission } from '@/lib/local-storage-db';
import { cn } from '@/lib/utils';
import { PayAdmissionFeeDialog } from '@/components/student-panel/admission/pay-admission-fee-dialog';
import { OfferLetterDialog } from '@/components/student-panel/admission/offer-letter-dialog';

const timelineSteps = [
    { status: 'Pending', icon: FileClock, title: 'Application Submitted', description: 'Your application has been received and is waiting for review.' },
    { status: 'Reviewing', icon: Loader2, title: 'Under Review', description: 'Our admissions team is currently reviewing your documents and details.' },
    { status: 'Approved', icon: FileCheck2, title: 'Application Approved', description: 'Congratulations! Your application has been approved. Please pay the admission fee to confirm your seat.' },
    { status: 'Confirmed', icon: PartyPopper, title: 'Admission Confirmed', description: 'Welcome to Obsidian Peak University! Your seat is confirmed.' },
    { status: 'Rejected', icon: FileX2, title: 'Application Rejected', description: 'We regret to inform you that your application could not be approved at this time.' },
];

export default function AdmissionsPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [admissionRequest, setAdmissionRequest] = useState<Admission | null>(null);
  const [showOfferLetter, setShowOfferLetter] = useState(false);

  const loadData = () => {
    const session = db.get('session');
    if (session?.user) {
      const currentStudent = db.getAll('students').find(s => s.email === session.user);
      if (currentStudent) {
        setStudent(currentStudent);
        setAdmissionRequest({
          ...currentStudent,
          id: `ADM-PAID-${currentStudent.roll}`,
          status: 'Confirmed',
          date: new Date().toISOString()
        });
      } else {
        const request = db.getAll('admissions').find(a => a.email === session.user);
        setAdmissionRequest(request || null);
      }
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('db-change', loadData);
    return () => {
        window.removeEventListener('db-change', loadData);
    }
  }, []);

  const handlePaymentSuccess = () => {
    // This will re-run the `loadData` effect because the DB has changed.
    // We also trigger the offer letter dialog immediately.
    setShowOfferLetter(true);
  };

  if (!admissionRequest) {
    return (
        <>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Admission Status</h2>
            <Card className="mt-6">
                <CardContent className="pt-6 text-center text-muted-foreground">
                You have not submitted any admission application.
                </CardContent>
            </Card>
        </>
    );
  }

  const currentStatus = admissionRequest.status === 'Confirmed' ? 'Confirmed' : admissionRequest.status;
  const currentStatusIndex = timelineSteps.findIndex(step => step.status === currentStatus);
  
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight font-headline">Admission Status</h2>
      
      {student && showOfferLetter && <OfferLetterDialog student={student} onOpenChange={setShowOfferLetter} />}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Your Application Timeline</CardTitle>
          <CardDescription>Track the progress of your admission to Obsidian Peak University.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-8">
                {timelineSteps.map((step, index) => {
                    if (admissionRequest.status !== 'Rejected' && step.status === 'Rejected') return null;
                    if (admissionRequest.status === 'Rejected' && (step.status === 'Approved' || step.status === 'Confirmed')) return null;
                    
                    const isActive = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;

                    return (
                        <div key={step.title} className="flex">
                            <div className="flex flex-col items-center mr-4">
                                <div>
                                    <div className={cn("flex items-center justify-center w-10 h-10 border-2 rounded-full",
                                        isActive ? "border-primary" : "border-muted",
                                        isCurrent && "bg-primary text-primary-foreground"
                                    )}>
                                        <step.icon className={cn("w-5 h-5", isCurrent && step.icon === Loader2 && "animate-spin")} />
                                    </div>
                                </div>
                                {index < timelineSteps.length - 2 && (step.status !== 'Rejected' && step.status !== 'Confirmed') && <div className={cn("w-px h-full", isActive && index < currentStatusIndex ? "bg-primary" : "bg-muted")}></div>}
                            </div>
                            <div className={cn("pb-8", !isActive && "opacity-50")}>
                                <p className="mb-1 text-lg font-semibold">{step.title}</p>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                                {isCurrent && admissionRequest.status === 'Approved' && (
                                     <PayAdmissionFeeDialog
                                        admissionRequest={admissionRequest}
                                        onPaymentSuccess={handlePaymentSuccess}
                                     />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </CardContent>
      </Card>
    </>
  );
}
