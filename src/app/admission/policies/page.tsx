import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, UserCheck, Laptop, Layers, Award, CheckCircle, Shield } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const policySections = [
    {
        id: "general",
        title: "Admission Overview & General Policy",
        icon: Shield,
        content: "Obsidian Peak University (OPU) maintains a policy of inclusive excellence, seeking to admit candidates who demonstrate not only academic proficiency but also a commitment to personal growth and social responsibility. For the 2026 session, the university adheres to a strictly regulated admissions calendar, beginning with the release of the official prospectus and culminating in the final enrollment phase.",
        points: [
            "Transparency: All selection criteria and weightage for entrance components are disclosed prior to the application window.",
            "Equitable Access: OPU ensures non-discrimination based on race, gender, religion, or nationality, providing equal opportunities to all qualified applicants.",
            "Finality of Decisions: Admission decisions rendered by the Central Admissions Committee are final and binding, subject to the verification of all original documentation.",
        ]
    },
    {
        id: "selection",
        title: "Merit-Based Selection Criteria",
        icon: UserCheck,
        content: "The University employs a multi-faceted evaluation system to ensure the selection of high-caliber students. Merit is determined through a standardized \"Composite Score\" (CS) approach.",
        points: [
            "Qualifying Examination Performance: A minimum aggregate of 60% (or equivalent GPA) in the preceding qualifying examination (e.g., 10+2 for UG, Bachelor’s for PG) is required for eligibility.",
            "Obsidian Peak Entrance Test (OPET): Mandatory for specific UG and PG programs. The OPET evaluates logical reasoning, quantitative aptitude, and subject-specific knowledge.",
            "Personal Interview (PI) & Statement of Purpose (SOP): Doctoral and select Professional Master’s programs require a formal interview to assess research intent and professional alignment.",
        ]
    },
    {
        id: "protocol",
        title: "Online Application Protocol",
        icon: Laptop,
        content: "In alignment with our digital-first initiative, OPU mandates a paperless application process through the Obsidian Peak Unified Portal.",
        points: [
            "Profile Registration: Candidates must create a unique Student ID using a verified email and mobile number.",
            "Document Upload: Digital copies of transcripts, identification (National ID/Passport), and recent photographs must be uploaded in high-resolution PDF/JPEG formats.",
            "Preference Selection: Applicants may select up to three program preferences in order of priority.",
            "Fee Remittance: An application processing fee must be settled via the integrated secure payment gateway. Applications without a successful fee transaction will be deemed incomplete.",
        ]
    },
     {
        id: "structure",
        title: "Program Diversity & Structure",
        icon: Layers,
        content: "OPU offers a comprehensive academic portfolio designed to meet global industry standards. Each program is structured under the Choice-Based Credit System (CBCS).",
        table: {
            headers: ["Program Tier", "Duration", "Focus Area"],
            rows: [
                ["Diploma", "1–2 Years", "Skill-based vocational training and specialized certifications."],
                ["Undergraduate (UG)", "3–4 Years", "Foundational disciplines in Arts, Sciences, Engineering, and Management."],
                ["Postgraduate (PG)", "2 Years", "Advanced theoretical knowledge and professional specialization."],
                ["Doctoral (Ph.D.)", "3–5 Years", "Original research, dissertation-led studies, and academic teaching."],
            ]
        }
    },
    {
        id: "scholarships",
        title: "Scholarship & Financial Aid Policies",
        icon: Award,
        content: "The Office of Financial Aid manages a robust scholarship program to ensure that financial constraints do not impede academic merit.",
        points: [
            "Peak Merit Scholarship: Up to a 100% tuition waiver for students ranking in the top 2% of the OPET or those with exceptional national-level board scores.",
            "Social Equity Grants: Targeted assistance for students from economically disadvantaged backgrounds or underrepresented communities.",
            "Research Fellowships: Specifically for Doctoral candidates, providing a monthly stipend and contingency grants for laboratory or field research.",
            "Important Note: All scholarships are subject to annual review. Recipients must maintain a minimum Cumulative Grade Point Average (CGPA) of 7.5/10.0 to remain eligible for renewal in subsequent years.",
        ]
    }
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Admission Policies 2026</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
             A comprehensive and formal overview of the admission policies for the 2026 academic session. These policies ensure a transparent, equitable, and rigorous selection process.
            </p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>University Admission Guidelines</CardTitle>
                <CardDescription>All prospective students must adhere to the following policies.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["general", "selection"]} className="w-full">
                {policySections.map((section) => (
                    <AccordionItem value={section.id} key={section.id}>
                        <AccordionTrigger className="text-lg font-semibold text-primary">
                          <div className="flex items-center gap-3">
                            <section.icon className="h-6 w-6" />
                            {section.title}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <p className="text-muted-foreground mb-4">{section.content}</p>
                           {section.points && (
                             <ul className="space-y-3 pt-2 pl-2">
                                {section.points.map((point, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">{point}</span>
                                </li>
                                ))}
                            </ul>
                           )}
                           {section.table && (
                             <div className="mt-4">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {section.table.headers.map(header => <TableHead key={header}>{header}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {section.table.rows.map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {row.map((cell, cellIndex) => <TableCell key={cellIndex} className={cellIndex === 0 ? 'font-medium' : ''}>{cell}</TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                           )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
