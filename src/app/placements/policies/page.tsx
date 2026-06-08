import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, CheckSquare } from "lucide-react";

const policies = [
  "Students must maintain a minimum of 75% attendance throughout their program to be eligible for participation in campus placement drives.",
  "A student who receives a job offer from a company is generally not permitted to sit for further placements, subject to specific 'Dream Job' policy exceptions.",
  "Students must attend all mandatory pre-placement talks and training sessions organized by the placement cell. Failure to do so may result in ineligibility for certain companies.",
  "Strict adherence to professional dress code (formal attire) is mandatory for all students participating in any phase of the placement process.",
  "Any act of misbehavior, misrepresentation of facts, or indiscipline during the placement process will lead to immediate disqualification from the entire placement season.",
  "Students must accept a job offer within the timeframe specified by the company. Refusal to accept an offer after confirming participation can lead to debarment from the placement process.",
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Placement Policies</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              To ensure a fair, transparent, and efficient placement process for all, students must strictly adhere to the following policies.
            </p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CheckSquare className="h-6 w-6 text-primary"/> Key Policies & Code of Conduct</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {policies.map((policy, index) => (
                  <li key={index} className="flex items-start">
                    <Info className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{policy}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
