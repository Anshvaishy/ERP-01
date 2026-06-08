
'use client';

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";

const policies = [
    { 
        title: "Academic Integrity Policy", 
        description: "Defines acceptable use of AI, plagiarism standards, and enforcement procedures.",
        content: `
            <h4 class="font-bold mb-2">Generative AI Usage</h4>
            <p class="text-sm text-muted-foreground mb-2">The use of generative AI tools is permitted as an aid for research and ideation, but not as a substitute for original intellectual contribution. A maximum of 20% AI-generated content is permissible in dissertations, and any use of AI assistance must be mandatorily acknowledged.</p>
            <h4 class="font-bold mt-4 mb-2">Plagiarism Detection</h4>
            <p class="text-sm text-muted-foreground mb-2">Advanced tools like Turnitin are used for plagiarism detection. A similarity index over 10% will trigger a formal review. In cases of suspected academic dishonesty, the university may require an oral defense or a traditional pen-and-paper exam to verify the student's knowledge.</p>
            <h4 class="font-bold mt-4 mb-2">Enforcement</h4>
            <p class="text-sm text-muted-foreground">Penalties for academic misconduct are structured, ranging from a 'Zero Score' on the specific assignment to permanent expulsion from the university, depending on the severity of the offense.</p>
        `
    },
    { 
        title: "Examination Policy", 
        description: "Details rules for examination conduct, security measures, and marking schemes.",
        content: `
            <h4 class="font-bold mb-2">Security Measures & Prohibited Items</h4>
            <p class="text-sm text-muted-foreground mb-2">Students must arrive at the examination center at least 45 minutes prior to the scheduled start time for mandatory security checks. A valid photo ID and the official university admit card are required for entry. All electronic devices, including but not limited to mobile phones, smartwatches, and digital calculators, are strictly prohibited within the examination hall.</p>
            <h4 class="font-bold mt-4 mb-2">Marking Scheme</h4>
            <p class="text-sm text-muted-foreground">In alignment with national standards (e.g., CUET 2026), the marking scheme is as follows: +5 marks for each correct answer, and a penalty of -1 mark for each incorrect answer. No marks are deducted for unattempted questions.</p>
        `
    },
    { 
        title: "Attendance Policy", 
        description: "Specifies the minimum attendance required for exam eligibility and procedures for leave.",
        content: `
            <h4 class="font-bold mb-2">Minimum Requirement</h4>
            <p class="text-sm text-muted-foreground mb-2">A minimum of 75% attendance in all registered courses is mandatory to be eligible to appear for the end-of-semester examinations. Failure to meet this requirement may result in debarment from the examination, potentially leading to repeating the academic year.</p>
            <h4 class="font-bold mt-4 mb-2">Condonation & Medical Leave</h4>
            <p class="text-sm text-muted-foreground">A grace margin of up to 5% may be granted for students representing the university in official sports or academic competitions, with prior approval. Medical leave for a period exceeding two consecutive days requires the submission of a valid medical certificate from a registered medical practitioner upon return.</p>
        `
    },
    { 
        title: "Research Policy", 
        description: "Provides a framework for conducting research, including ethics, funding, and publication.",
        content: `
            <h4 class="font-bold mb-2">Ethical Oversight</h4>
            <p class="text-sm text-muted-foreground mb-2">All research projects involving human or animal subjects require mandatory prior approval from the Institutional Ethics Committee (IEC) to ensure adherence to ethical standards and data privacy protocols.</p>
            <h4 class="font-bold mt-4 mb-2">Funding & Fellowships</h4>
            <p class="text-sm text-muted-foreground mb-2">The university provides a framework to assist researchers in securing external funding. For example, government fellowships like the National Post Doctoral Fellowship (N-PDF) offer support of up to ₹80,000 per month plus HRA, and an annual research grant of ₹2,00,000.</p>
            <h4 class="font-bold mt-4 mb-2">Authorship Guidelines</h4>
            <p class="text-sm text-muted-foreground">The university strictly prohibits 'gift' or 'honorary authorship.' Every author listed on a publication must have made a significant and verifiable intellectual contribution to the research.</p>
        `
    },
    { 
        title: "Student Code of Conduct", 
        description: "Defines expected behavior, anti-ragging rules, and disciplinary actions.",
        content: `
            <h4 class="font-bold mb-2">Anti-Ragging Directives</h4>
            <p class="text-sm text-muted-foreground mb-2">A zero-tolerance policy for ragging is enforced in alignment with Supreme Court directives. All students and their parents are required to submit an online anti-ragging undertaking affidavit annually.</p>
            <h4 class="font-bold mt-4 mb-2">Disciplinary Action</h4>
            <p class="text-sm text-muted-foreground mb-2">Misconduct, including but not limited to discrimination, harassment, or damage to university property, will result in disciplinary action. Penalties range from cancellation of admission and suspension to rustication (suspension for one to four semesters) or permanent expulsion.</p>
            <h4 class="font-bold mt-4 mb-2">Online Presence</h4>
            <p class="text-sm text-muted-foreground">Students are expected to use social media responsibly. Posting derogatory or defamatory comments about the institution or its members is considered a violation of the code of conduct.</p>
        `
    },
    { 
        title: "IT Policy", 
        description: "Governs the use of university's IT infrastructure, data security, and acceptable use.",
        content: `
             <h4 class="font-bold mb-2">Network Security & Privacy</h4>
            <p class="text-sm text-muted-foreground mb-2">The university mandates high security standards for all student and institutional data, in alignment with national data protection regulations.</p>
            <h4 class="font-bold mt-4 mb-2">Acceptable Use</h4>
            <p class="text-sm text-muted-foreground mb-2">This policy strictly prohibits unauthorized access to university systems, misuse of computing resources, and using the university network for any illegal activities.</p>
            <h4 class="font-bold mt-4 mb-2">Data Handling and Generative AI</h4>
            <p class="text-sm text-muted-foreground">Researchers and students are explicitly reminded not to upload any confidential, personal, or proprietary information into public or third-party Generative AI systems without explicit, documented consent from the data owner and the university's IT department.</p>
        `
    },
];

function PolicyDialog({ policy }: { policy: { title: string; description: string; content: string } }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" /> View/Download
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{policy.title}</DialogTitle>
                    <DialogDescription>Official university policy document.</DialogDescription>
                </DialogHeader>
                <div className="py-4 max-h-96 overflow-y-auto" dangerouslySetInnerHTML={{ __html: policy.content }}>
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => window.print()}>Print</Button>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Policies & Reports</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Access important university policies and academic reports that govern our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {policies.map((policy) => (
              <Card key={policy.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 font-headline text-xl">
                    <div className="bg-primary/10 p-2 rounded-full"><Shield className="w-5 h-5 text-primary" /></div>
                    {policy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-4">{policy.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                    <PolicyDialog policy={policy} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
