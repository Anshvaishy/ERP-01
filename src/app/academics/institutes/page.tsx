
'use client';

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InstituteDetailsDialog } from "@/components/institute-details-dialog";
import { ProgramDetailsDialog } from "@/components/program-details-dialog";
import { instituteDetailsData, InstituteDetail } from "@/lib/institute-details";
import { programDetailsData, ProgramDetail } from "@/lib/program-details";
import { db, Faculty } from '@/lib/local-storage-db';
import { Building, BookOpen } from "lucide-react";

export default function Page() {
  const [selectedInstitute, setSelectedInstitute] = useState<InstituteDetail | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);
  const [faculty, setFaculty] = useState<Faculty[]>([]);

  useEffect(() => {
    setFaculty(db.getAll('faculty'));
  }, []);

  const handleInstituteClick = (institute: InstituteDetail) => {
    setSelectedInstitute(institute);
  };

  const handleProgramSelect = (programName: string) => {
    const details = programDetailsData.find(p => p.programName === programName);
    setSelectedInstitute(null); // Close institute dialog
    setSelectedProgram(details || programDetailsData.find(p => p.programName === "Default")!);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-secondary/50">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Explore Our Academic Institutes</h1>
              <p className="text-lg mt-4 text-muted-foreground max-w-4xl mx-auto">
                Obsidian Peak University is a confluence of academic, cultural, and intellectual resources, committed to providing world-class education. Our institutes offer a wide spectrum of programs, preparing students for global opportunities through state-of-the-art infrastructure and a focus on innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instituteDetailsData.map((institute) => (
                <Card 
                    key={institute.id} 
                    className="flex flex-col cursor-pointer hover:shadow-xl hover:border-primary/50 transition-all"
                    onClick={() => handleInstituteClick(institute)}
                >
                  <CardHeader>
                      <CardTitle className="flex items-center gap-4 font-headline text-xl">
                          <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                              <Building className="w-6 h-6 text-primary" />
                          </div>
                          {institute.name}
                      </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                      <p className="text-muted-foreground mb-4">{institute.description}</p>
                      <div className="mt-auto">
                        <h4 className="font-semibold mb-2 text-sm">Departments:</h4>
                        <div className="space-y-1">
                          {institute.departments.map(dept => (
                            <div key={dept.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <BookOpen className="w-4 h-4 text-primary/70 flex-shrink-0"/>
                              <span>{dept.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {selectedInstitute && (
        <InstituteDetailsDialog
          institute={selectedInstitute}
          facultyList={faculty}
          onProgramSelect={handleProgramSelect}
          isOpen={!!selectedInstitute}
          onClose={() => setSelectedInstitute(null)}
        />
      )}

      {selectedProgram && (
        <ProgramDetailsDialog
          program={selectedProgram}
          isOpen={!!selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </>
  );
}
