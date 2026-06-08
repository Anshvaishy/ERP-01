
'use client';
import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PartyPopper, Download, Printer } from 'lucide-react';
import { Student } from '@/lib/local-storage-db';
import { Separator } from '@/components/ui/separator';

type OfferLetterDialogProps = {
  student: Student;
  onOpenChange: (open: boolean) => void;
};

export function OfferLetterDialog({ student, onOpenChange }: OfferLetterDialogProps) {
  
  useEffect(() => {
    // This effect ensures the dialog is open when the component mounts
    onOpenChange(true);
  }, [onOpenChange]);

  const handlePrint = () => {
    const printContent = document.getElementById('offer-letter-content');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      const printHTML = printContent.innerHTML;
      document.body.innerHTML = `<body style="color: black;">${printHTML}</body>`;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <PartyPopper className="h-12 w-12 text-yellow-500 animate-bounce" />
            <DialogTitle className="text-2xl font-bold mt-4">Congratulations, {student.name}!</DialogTitle>
            <DialogDescription>Welcome to the Obsidian Peak University family.</DialogDescription>
          </div>
        </DialogHeader>
        <div id="offer-letter-content" className="py-4 space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-2">
            <div className="border rounded-lg p-6">
                <h4 className="text-center font-bold text-lg mb-2">OFFER OF ADMISSION</h4>
                <Separator />
                <p className="my-4"><strong>Date:</strong> {new Date().toLocaleDateString('en-GB')}</p>
                <p><strong>To:</strong><br/>{student.name}<br/>{student.email}</p>
                <p className="mt-4"><strong>Subject:</strong> Offer of Admission to {student.class}</p>
                <p className="mt-4">Dear {student.name},</p>
                <p className="mt-2 text-justify">
                    On behalf of the admissions committee, we are delighted to offer you admission to the <strong>{student.class}</strong> program at Obsidian Peak University for the academic session beginning in Fall 2025.
                </p>
                <p className="mt-2 text-justify">
                    Your application stood out amongst a highly competitive pool of applicants, and we were impressed with your academic achievements and potential. We believe you will be a valuable addition to our diverse and vibrant campus community.
                </p>
                 <p className="mt-2 text-justify">
                    This offer is contingent upon the successful verification of your academic documents. Further details regarding orientation, registration, and class schedules will be communicated to you shortly.
                </p>
                <p className="mt-4">We congratulate you once again and eagerly look forward to welcoming you to our campus.</p>

                <div className="mt-8 text-right">
                    <p>Sincerely,</p>
                    <p className="font-bold mt-4">Ansh Vaishy</p>
                    <p>Chairman, Board of Governors</p>
                    <p>Obsidian Peak University</p>
                </div>
            </div>
        </div>
         <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
            <Button onClick={handlePrint}><Download className="mr-2 h-4 w-4" /> Download as PDF</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
