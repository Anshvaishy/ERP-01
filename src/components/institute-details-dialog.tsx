
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { InstituteDetail } from "@/lib/institute-details";
import type { Faculty } from "@/lib/local-storage-db";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Mail, Phone } from "lucide-react";

interface InstituteDetailsDialogProps {
  institute: InstituteDetail;
  facultyList: Faculty[];
  onProgramSelect: (programName: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AuthorityCard = ({ person, role }: { person?: Faculty, role: string }) => {
    if (!person) return null;
    const fallback = person.name.split(' ').map(n => n[0]).join('');
    const image = PlaceHolderImages.find(p => p.id === (person.role === 'Director' ? 'dean-male' : 'dean-female'));

    return (
        <div className="flex items-center gap-4 py-2">
            <Avatar className="h-16 w-16">
                {image && <AvatarImage src={image.imageUrl} />}
                <AvatarFallback className="text-xl">{fallback}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-bold">{person.name}</p>
                <p className="text-sm text-muted-foreground font-semibold">{role}</p>
                {person.email && <p className="text-xs text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {person.email}</p>}
            </div>
        </div>
    );
};

export function InstituteDetailsDialog({ institute, facultyList, onProgramSelect, isOpen, onClose }: InstituteDetailsDialogProps) {
  const director = facultyList.find(f => f.id === institute.directorId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">{institute.name}</DialogTitle>
          <DialogDescription>{institute.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            {director && <AuthorityCard person={director} role="Institute Director" />}

            <h4 className="font-semibold text-primary mt-4">Departments</h4>
            <Accordion type="single" collapsible className="w-full">
                {institute.departments.map(dept => {
                    const hod = facultyList.find(f => f.id === dept.hodId);
                    return (
                        <AccordionItem value={dept.id} key={dept.id}>
                            <AccordionTrigger>{dept.name}</AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                {hod && <AuthorityCard person={hod} role="Head of Department" />}
                                <div>
                                    <h5 className="font-semibold mb-2">Programs Offered:</h5>
                                    <div className="flex flex-col items-start gap-2">
                                        {dept.programs.map(programName => (
                                            <Button key={programName} variant="link" className="p-0 h-auto" onClick={() => onProgramSelect(programName)}>
                                                {programName}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
