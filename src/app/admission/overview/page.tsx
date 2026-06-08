import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, UserPlus, Upload, CheckCircle, GraduationCap } from 'lucide-react';
import Link from "next/link";

const admissionHighlights = [
    { icon: GraduationCap, title: "Merit-Based Selection", description: "Admissions are granted based on performance in qualifying examinations and entrance tests where applicable." },
    { icon: FileText, title: "Online Application", description: "A simple and convenient online application process available on our website." },
    { icon: UserPlus, title: "Diverse Programs", description: "A wide range of Diploma, UG, PG, and Doctoral programs to choose from." },
    { icon: CheckCircle, title: "Scholarship Opportunities", description: "Various scholarships are available for meritorious and deserving students." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Admission Overview</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              An overview of the admission process at Obsidian Peak University for the upcoming academic session.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionHighlights.map((item) => (
              <Card key={item.title} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                     <div className="bg-primary/10 p-4 rounded-full">
                        <item.icon className="w-8 h-8 text-primary" />
                     </div>
                  </div>
                  <CardTitle className="font-headline">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="mr-4">
                <Link href="/admission/policies">Read Policies</Link>
            </Button>
            <Button asChild size="lg">
                <Link href="/admission/apply">Apply Now</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
