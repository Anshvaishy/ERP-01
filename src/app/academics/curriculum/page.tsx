import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, FlaskConical, Lightbulb } from "lucide-react";

const curriculumPillars = [
    { icon: BookOpen, title: "Outcome-Based Education (OBE)", description: "Our curriculum is designed with the end in mind, focusing on what students can actually do after completing their courses." },
    { icon: Users, title: "Industry-Relevant Skills", description: "In collaboration with industry experts, we regularly update our curriculum to include the latest technologies and skills demanded by the job market." },
    { icon: FlaskConical, title: "Project-Based Learning", description: "Emphasis is placed on hands-on learning through real-world projects, case studies, and lab work to build practical skills." },
    { icon: Lightbulb, title: "Interdisciplinary Approach", description: "We encourage students to explore subjects outside their core discipline to foster creativity and a broader perspective." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Curriculum Design</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Our curriculum is meticulously designed to be dynamic, industry-aligned, and student-centric.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {curriculumPillars.map((pillar) => (
              <Card key={pillar.title} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <pillar.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-headline">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
