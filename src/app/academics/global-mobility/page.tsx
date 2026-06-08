import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Globe } from "lucide-react";

const partnerUniversities = [
  { region: "Europe", university: "Technical University (TU) Munich, Germany", duration: "1–2 Semesters" },
  { region: "Asia", university: "Nanyang Technological University (NTU), Singapore", duration: "1 Semester" },
  { region: "United Kingdom", university: "University of Edinburgh, Scotland", duration: "1–2 Semesters" },
  { region: "North America", university: "University of Waterloo, Canada", duration: "1 Semester" },
  { region: "Australia", university: "University of Melbourne, Australia", duration: "1 Semester" },
];

const eligibilityCriteria = [
  "Minimum Cumulative GPA of 3.2/4.0 (or equivalent).",
  "Completion of at least three semesters of full-time study at OPU.",
  "Successful interview with the OIR Exchange Committee.",
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Global Mobility & International Exchange</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              OPU is committed to producing "Global Citizens." Through the Office of International Relations (OIR), students can spend one or two semesters abroad at partner institutions while paying their standard OPU tuition.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Globe className="w-6 h-6 text-primary"/> Current Partner Institutions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Partner University</TableHead>
                    <TableHead>Exchange Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerUniversities.map((partner) => (
                    <TableRow key={partner.university}>
                      <TableCell className="font-medium">{partner.region}</TableCell>
                      <TableCell>{partner.university}</TableCell>
                      <TableCell>{partner.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
             <CardHeader>
                <CardTitle>Exchange Eligibility</CardTitle>
             </CardHeader>
             <CardContent>
                <ul className="space-y-3">
                    {eligibilityCriteria.map((criterion, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                            <span className="text-muted-foreground">{criterion}</span>
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
