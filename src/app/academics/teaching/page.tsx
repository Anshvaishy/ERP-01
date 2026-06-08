import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Lightbulb, TrendingUp, MonitorPlay } from "lucide-react";

const teachingMethods = [
  { icon: Users, title: "Student-Centric Approach", description: "Our teaching methodology puts students at the center of the learning experience, encouraging active participation and critical thinking." },
  { icon: Lightbulb, title: "Experiential Learning", description: "We emphasize learning by doing through labs, workshops, internships, and real-world projects." },
  { icon: TrendingUp, title: "Continuous Assessment", description: "Regular assessments, quizzes, and feedback sessions help track student progress and identify areas for improvement." },
  { icon: MonitorPlay, title: "Technology-Enhanced Learning", description: "We leverage smart classrooms, online resources, and digital tools to make learning more engaging and accessible." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Teaching & Learning Process</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              At Obsidian Peak University, we are committed to a teaching and learning process that is modern, effective, and prepares students for future challenges.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teachingMethods.map((method) => (
              <Card key={method.title} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <method.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="font-headline">{method.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{method.description}</p>
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
