import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";

const timeline = [
    { date: "June 1, 2025", event: "Online Application Start" },
    { date: "July 31, 2025", event: "Application Deadline" },
    { date: "August 15, 2025", event: "Entrance Test (OPU-RET)" },
    { date: "August 25, 2025", event: "Interview for Shortlisted Candidates" },
    { date: "September 5, 2025", event: "Result Declaration" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Ph.D. Admission Notification</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Session: 2025-26 (Even Semester). Applications are invited for full-time and part-time Ph.D. programs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar className="h-6 w-6 text-primary" />Important Dates</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {timeline.map(item => (
                            <li key={item.event} className="flex justify-between items-center">
                                <span className="font-medium text-muted-foreground">{item.event}</span>
                                <span className="text-sm text-primary font-semibold">{item.date}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" />Downloads & Links</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button variant="outline" asChild>
                        <a href="#"><Download className="mr-2"/>Information Brochure</a>
                    </Button>
                     <Button variant="outline" asChild>
                        <a href="#"><Download className="mr-2"/>Available Research Areas</a>
                    </Button>
                    <Button asChild>
                        <Link href="/admission/apply">Apply Online</Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
