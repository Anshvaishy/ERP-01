
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ChevronRight } from "lucide-react";

const sopSections = [
    {
        title: "Section 1: Academic Background & Introduction",
        objective: "Briefly state your academic history and the specific program to which you are applying.",
        question: "What specific academic experiences (courses, projects, or honors) have prepared you for this field?"
    },
    {
        title: "Section 2: Professional or Research Experience",
        objective: "Highlight internships, work experience, or research papers that demonstrate practical application of your skills.",
        question: "How did these experiences shape your current career goals?"
    },
    {
        title: "Section 3: Motivation for Choosing Obsidian Peak University",
        objective: "Explain why OPU is the ideal fit. Mention specific faculty members, research labs, or curriculum features.",
        question: "How does OPU’s 'Inclusive Excellence' policy or specific program structure align with your personal values?"
    },
    {
        title: "Section 4: Future Aspirations & Conclusion",
        objective: "Clearly articulate your short-term and long-term career goals.",
        question: "How will a degree from OPU enable you to contribute to your field or society at large?"
    }
];

export default function SopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Statement of Purpose (SOP) Guidelines</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              A guide to crafting a compelling SOP for Postgraduate and Doctoral programs at Obsidian Peak University.
            </p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>SOP Template</CardTitle>
                <CardDescription>
                    Your SOP is a critical component of your application. It should be a maximum of 1,000 words and written in a formal, academic tone.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {sopSections.map((section, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> {section.title}</h3>
                        <div className="mt-2 pl-7 space-y-2">
                           <div className="flex items-start">
                                <p className="font-medium w-24 shrink-0">Objective:</p>
                                <p className="text-muted-foreground">{section.objective}</p>
                           </div>
                           <div className="flex items-start">
                                <p className="font-medium w-24 shrink-0">Key Question:</p>
                                <p className="text-muted-foreground">{section.question}</p>
                           </div>
                        </div>
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
