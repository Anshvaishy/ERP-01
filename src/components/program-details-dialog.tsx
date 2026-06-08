
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProgramDetail } from "@/lib/program-details";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface ProgramDetailsDialogProps {
  program: ProgramDetail;
  isOpen: boolean;
  onClose: () => void;
}

export function ProgramDetailsDialog({ program, isOpen, onClose }: ProgramDetailsDialogProps) {
  const deanImage = PlaceHolderImages.find(p => p.id === program.dean.imageId);
  const deanInitial = program.dean.name.split(' ').map(n => n[0]).join('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{program.programName}</DialogTitle>
          <DialogDescription>
            Details about the program, eligibility, fees, and department leadership.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
          {/* Dean's Profile */}
          <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
            {deanImage && (
              <Avatar className="h-20 w-20">
                <AvatarImage src={deanImage.imageUrl} alt={program.dean.name} />
                <AvatarFallback>{deanInitial}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <h3 className="font-bold text-lg">{program.dean.name}</h3>
              <p className="text-sm text-muted-foreground">{program.dean.title}</p>
            </div>
          </div>
          
          {/* Dean's Message */}
          <div>
              <h4 className="font-semibold text-primary mb-2">A Message from the Dean</h4>
              <p className="text-sm italic text-muted-foreground">
                &ldquo;{program.dean.message}&rdquo;
              </p>
          </div>

          <Separator />

          {/* Eligibility Criteria */}
          <div>
            <h4 className="font-semibold text-primary mb-2">Eligibility Criteria</h4>
            <p className="text-sm text-muted-foreground">{program.eligibility}</p>
          </div>

          <Separator />
            {/* Curriculum Overview */}
            {program.curriculum && program.curriculum.length > 0 && (
                <div>
                <h4 className="font-semibold text-primary mb-2">Curriculum Overview</h4>
                <Accordion type="single" collapsible className="w-full">
                    {program.curriculum.map((sem, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger>Semester {sem.semester}</AccordionTrigger>
                        <AccordionContent>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Subject</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {sem.subjects.map((sub, subIndex) => (
                                <TableRow key={subIndex}>
                                <TableCell className="font-mono">{sub.code}</TableCell>
                                <TableCell>{sub.name}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </div>
            )}
          <Separator />

          {/* Fee Structure */}
          <div>
            <h4 className="font-semibold text-primary mb-2">Fee Structure (Annual)</h4>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Particulars</TableHead>
                        <TableHead className="text-right">Amount (INR)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Tuition Fee</TableCell>
                        <TableCell className="text-right">{program.fees.tuition.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Examination Fee</TableCell>
                        <TableCell className="text-right">{program.fees.examination.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Other Fees</TableCell>
                        <TableCell className="text-right">{program.fees.other.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    {program.fees.training && (
                         <TableRow>
                            <TableCell>Training/Internship Fee</TableCell>
                            <TableCell className="text-right">{program.fees.training.toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                    )}
                     <TableRow className="font-bold bg-muted">
                        <TableCell>Total Annual Course Fee</TableCell>
                        <TableCell className="text-right">₹{(program.fees.tuition + program.fees.examination + program.fees.other + (program.fees.training || 0)).toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Hostel & Mess Fee</TableCell>
                        <TableCell className="text-right">{program.fees.hostel.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                    {program.fees.caution && (
                         <TableRow>
                            <TableCell>Caution Money (One-time, Refundable)</TableCell>
                            <TableCell className="text-right">{program.fees.caution.toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-2">*Fees are subject to revision as per university policy.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
