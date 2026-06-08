import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Rocket, Users } from "lucide-react";

const innovationPillars = [
    { icon: Lightbulb, title: "Incubation Center", description: "Our 'Abhinav' incubation center nurtures student startups by providing mentorship, resources, and funding opportunities." },
    { icon: Rocket, title: "Patent & IPR Cell", description: "Assisting students and faculty in filing patents and protecting their intellectual property rights." },
    { icon: Users, title: "Industry Collaborations", description: "Working with industry partners on collaborative research projects to solve real-world problems." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Innovation at Obsidian Peak University</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              We foster a vibrant ecosystem of innovation, entrepreneurship, and research.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {innovationPillars.map(item => (
                <Card key={item.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline">
                             <div className="bg-primary/10 p-2 rounded-full"><item.icon className="w-6 h-6 text-primary" /></div>
                             {item.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{item.description}</p>
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
