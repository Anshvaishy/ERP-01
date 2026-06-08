import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, Target, BookOpen } from "lucide-react";

const iqacObjectives = [
  "To develop a system for conscious, consistent and catalytic action to improve the academic and administrative performance of the institution.",
  "To promote measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices."
];

const iqacFunctions = [
  "Development and application of quality benchmarks/parameters for various academic and administrative activities.",
  "Facilitating the creation of a learner-centric environment conducive to quality education.",
  "Arrangement for feedback response from students, parents and other stakeholders on quality-related institutional processes.",
  "Dissemination of information on various quality parameters of higher education.",
  "Organization of inter and intra institutional workshops, seminars on quality related themes.",
  "Documentation of the various programmes/activities leading to quality improvement."
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Internal Quality Assurance Cell (IQAC)</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              IQAC at Obsidian Peak University is the cornerstone of our commitment to continuous improvement and academic excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><Target className="w-6 h-6 text-primary"/>Objectives of IQAC</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {iqacObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{obj}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline"><BookOpen className="w-6 h-6 text-primary"/>Functions of IQAC</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {iqacFunctions.map((func, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{func}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
