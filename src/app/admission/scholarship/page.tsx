import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Medal, Percent, GraduationCap, Trophy } from "lucide-react";

const scholarships = [
    { icon: Medal, title: "Merit Scholarship", description: "Up to 100% tuition fee waiver for students with outstanding academic records (95%+ in qualifying exams)." },
    { icon: Percent, title: "Entrance Exam Scholarship", description: "Scholarships based on scores in national/state level entrance exams like JEE, NEET, and CAT." },
    { icon: GraduationCap, title: "Single Girl Child Scholarship", description: "A special scholarship to support the education of single girl children." },
    { icon: Trophy, title: "Sports Scholarship", description: "For students who have excelled in sports at the national or state level." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Scholarships</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Obsidian Peak University believes in rewarding merit and supporting deserving students. We offer a range of scholarships to help you pursue your dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.title}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <scholarship.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="font-headline">{scholarship.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{scholarship.description}</p>
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
