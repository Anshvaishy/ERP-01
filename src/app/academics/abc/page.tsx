import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Banknote, BookOpen, Repeat, GraduationCap } from "lucide-react";

const features = [
    { icon: Banknote, title: "Credit Accumulation", description: "Earn credits from various recognized institutions and store them in your academic bank account." },
    { icon: Repeat, title: "Credit Transfer", description: "Seamlessly transfer credits between institutions, allowing for flexible learning pathways." },
    { icon: BookOpen, title: "Multiple Entry-Exit", description: "Provides students with the flexibility to enter and exit academic programs at different levels with appropriate certification." },
    { icon: GraduationCap, title: "Academic Mobility", description: "Facilitates student mobility across higher education institutions, promoting interdisciplinary studies." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Academic Bank of Credits (ABC)</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Obsidian Peak University supports the Academic Bank of Credits, an initiative by the Government of India to promote flexibility and mobility in higher education.
            </p>
          </div>
          <Card>
              <CardHeader>
                  <CardTitle>Key Features of ABC</CardTitle>
                  <CardDescription>ABC is a digital storehouse that contains the information of the credits earned by students from various institutions.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature) => (
                      <div key={feature.title} className="flex flex-col items-center text-center p-4">
                          <div className="bg-primary/10 p-3 rounded-full mb-4">
                              <feature.icon className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-semibold text-lg">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
                      </div>
                  ))}
              </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
