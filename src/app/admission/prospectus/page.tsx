import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, AlertTriangle, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const opedFaq = [
    {
        question: "What is the format of the OPET 2026?",
        answer: "The OPET is a computer-based test (CBT) consisting of 120 Multiple Choice Questions (MCQs), divided into four primary sections: Quantitative Aptitude, Logical Reasoning, Verbal Ability, and General Awareness/Subject-Specific Basics."
    },
    {
        question: "Is there negative marking?",
        answer: "Yes. To discourage guesswork, OPU employs a marking scheme where +4 marks are awarded for a correct answer and -1 mark is deducted for an incorrect response. Unanswered questions receive zero marks."
    },
    {
        question: "Can I take the exam remotely?",
        answer: "While the university encourages appearing at designated international test centers, a Proctored Online Home-Based option is available for international applicants or those with documented physical disabilities."
    }
];

const feeStructure = [
    { school: "Engineering & Tech", tier: "Undergraduate (B.Tech)", fee: "₹1,40,000", regFee: "$500" },
    { school: "Business & Finance", tier: "Postgraduate (MBA)", fee: "₹1,65,000", regFee: "$750" },
    { school: "Applied Sciences", tier: "Undergraduate (B.Sc)", fee: "₹95,000", regFee: "$300" },
    { school: "Humanities & Arts", tier: "Undergraduate (B.A)", fee: "₹80,000", regFee: "$300" },
    { school: "Doctoral Studies", tier: "Ph.D. (All Streams)", fee: "₹60,000*", regFee: "$1,000" },
];

const admissionDates = [
    { event: "Portal Opening", date: "January 15, 2026" },
    { event: "Last Date to Apply", date: "April 30, 2026" },
    { event: "OPET Window", date: "May 15 – May 25, 2026" },
    { event: "Merit List Declaration", date: "June 10, 2026" },
    { event: "Session Commencement", date: "August 1, 2026" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Admission Prospectus 2026</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Key information regarding the Obsidian Peak Entrance Test (OPET), fee structure, and important admission dates.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>OPET Entrance Exam: FAQ Guide</CardTitle>
                        <CardDescription>The Obsidian Peak Entrance Test (OPET) is a standardized assessment designed to evaluate a candidate's readiness for rigorous academic inquiry.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {opedFaq.map(faq => (
                             <div key={faq.question} className="p-3 border rounded-lg">
                                <h4 className="font-semibold">{faq.question}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Marking Scheme</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-around">
                        <div className="text-center">
                            <Plus className="w-8 h-8 text-green-500 mx-auto"/>
                            <p className="font-bold text-lg">+4</p>
                            <p className="text-sm text-muted-foreground">Correct Answer</p>
                        </div>
                         <div className="text-center">
                            <Minus className="w-8 h-8 text-red-500 mx-auto"/>
                            <p className="font-bold text-lg">-1</p>
                            <p className="text-sm text-muted-foreground">Incorrect Answer</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Key Admission Dates</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <ul className="space-y-3">
                        {admissionDates.map(item => (
                            <li key={item.event} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                                <span className="font-medium text-muted-foreground">{item.event}</span>
                                <Badge variant="secondary">{item.date}</Badge>
                            </li>
                        ))}
                    </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Tuition Fee Structure (2026-2027)</CardTitle>
                        <CardDescription>Estimated annual fees. Does not include residential or meal plan charges.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>School / Department</TableHead>
                                    <TableHead>Annual Tuition (Est.)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {feeStructure.map(item => (
                                    <TableRow key={item.school}>
                                        <TableCell className="font-medium">{item.school}<br/><span className="text-xs text-muted-foreground">{item.tier}</span></TableCell>
                                        <TableCell className="font-semibold">{item.fee}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <p className="text-xs text-muted-foreground mt-2">*Ph.D. fees are often offset by university research stipends for qualified candidates.</p>
                    </CardContent>
                </Card>
                <Card className="bg-destructive/10 border-destructive/50">
                    <CardHeader className="flex-row items-center gap-4">
                        <AlertTriangle className="w-8 h-8 text-destructive" />
                        <CardTitle className="text-destructive">Financial Security Note</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-destructive/90">All fee payments must be conducted through the official OPU Payment Gateway. The university does not authorize third-party agents or cash collections for tuition fees.</p>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
