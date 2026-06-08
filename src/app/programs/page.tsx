
"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProgramDetailsDialog } from "@/components/program-details-dialog";
import { programDetailsData, ProgramDetail } from "@/lib/program-details";

const programs = {
  after10th: {
    title: "After Class 10th",
    courses: ["Diploma in Engineering", "D.Pharm"],
  },
  afterPolytechnic: {
    title: "After Polytechnic (Lateral Entry)",
    courses: ["B.Tech. (Mechanical Engineering)", "B.Tech. (Civil Engineering)", "B.Tech. (Electrical Engineering)"],
  },
  after12th: {
    title: "After Class 12th",
    courses: [
      "B.Tech. (Computer Science)",
      "B.Tech. (Mechanical Engineering)",
      "B.Tech. (Civil Engineering)",
      "B.Tech. (Electrical Engineering)",
      "B.Tech. (Electronics & Communication)",
      "B.Tech. (Biotechnology)",
      "B.C.A.",
      "B.Sc. (H) (Agriculture)",
      "B.Sc. (H) (Bio-Tech)",
      "B.Pharm",
      "B.B.A.",
      "LL.B.",
    ],
  },
  industryHonors: {
    title: "Industry Honors Programs",
    courses: [
      "B.Tech. (CSE) Specializations",
      "M.B.A."
    ],
  },
  afterGraduation: {
    title: "After Graduation",
    courses: [
      "M.B.A.",
      "M.C.A.",
      "M.Tech.",
      "LL.M.",
    ],
  },
  afterPostGraduation: {
    title: "After Post Graduation",
    courses: ["Ph.D."],
  },
};

const programCategories = [
    programs.after10th,
    programs.afterPolytechnic,
    programs.after12th,
    programs.industryHonors,
    programs.afterGraduation,
    programs.afterPostGraduation,
];


export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(null);

  const handleProgramClick = (courseName: string) => {
    const details = programDetailsData.find(p => p.programName === courseName);
    setSelectedProgram(details || programDetailsData.find(p => p.programName === "Default")!);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
              Our Programs
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive range of programs to shape your future.
            </p>
          </div>

          <div className="mt-16 space-y-8">
            <Accordion type="multiple" defaultValue={["item-0", "item-2"]} className="w-full">
              {programCategories.map((category, index) => (
                <AccordionItem value={`item-${index}`} key={category.title}>
                  <AccordionTrigger className="text-2xl font-headline text-primary">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground grid md:grid-cols-3 gap-2">
                      {category.courses.map((course) => (
                        <li
                          key={course}
                          className="cursor-pointer hover:text-primary hover:underline"
                          onClick={() => handleProgramClick(course)}
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
       {selectedProgram && (
        <ProgramDetailsDialog
          program={selectedProgram}
          isOpen={!!selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
}
