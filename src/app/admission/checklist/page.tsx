
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckSquare, AlertTriangle } from "lucide-react";

const mandatoryDocs = [
    "Valid Government ID: Passport (required for international students) or National ID Card.",
    "Academic Transcripts: High school diplomas for UG; Degree certificates and semester-wise mark sheets for PG/Doctoral.",
    "Proof of Age: Birth certificate or secondary school leaving certificate.",
    "Passport-sized Photographs: Digital format with a neutral background, taken within the last 6 months.",
];

const programSpecificDocs = [
    "Standardized Test Scores: OPET results or external scores (e.g., SAT, GRE, GMAT) where applicable.",
    "Letters of Recommendation (LOR): Minimum of two (2) formal letters—one academic and one professional (if applicable).",
    "Research Proposal: Mandatory for Doctoral (Ph.D.) candidates, outlining the intended area of study and methodology.",
    "English Proficiency: TOEFL/IELTS scores for applicants whose primary medium of instruction was not English.",
];

const financialAidDocs = [
    "Income Verification: Tax returns or official salary statements for the previous fiscal year.",
    "Merit Certificates: Evidence of national or international awards and extracurricular achievements.",
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Document Checklist for Admission 2026</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Ensure you have all the required documents ready for a smooth admission process. All documents must be scanned from originals and uploaded in high resolution.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Mandatory for All</CardTitle>
                    <CardDescription>Required for all applicants.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {mandatoryDocs.map((doc) => (
                            <li key={doc} className="flex items-start">
                                <CheckSquare className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{doc}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>Program-Specific</CardTitle>
                     <CardDescription>Based on your chosen program.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {programSpecificDocs.map((doc) => (
                            <li key={doc} className="flex items-start">
                                <CheckSquare className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{doc}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card className="lg:col-span-1">
                <CardHeader>
                    <CardTitle>For Financial Aid</CardTitle>
                     <CardDescription>If applying for scholarships.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {financialAidDocs.map((doc) => (
                            <li key={doc} className="flex items-start">
                                <CheckSquare className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{doc}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
          <Card className="mt-8 bg-destructive/10 border-destructive/50">
              <CardHeader className="flex-row items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                  <CardTitle className="text-destructive">Submission Policy</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-destructive/90">Incomplete applications or those containing fraudulent documentation will result in immediate disqualification and a permanent ban from future admissions cycles at Obsidian Peak University.</p>
              </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
