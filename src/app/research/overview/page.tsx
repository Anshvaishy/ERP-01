import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Counter } from "@/components/counter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Microscope, FlaskConical, Laptop, Briefcase } from "lucide-react";

const researchStats = [
    { value: 22, label: 'Projects Completed' },
    { value: 3, label: 'Funding Received (Cr.+)', suffix: ' Cr.+' },
    { value: 90, label: 'Patents Filed', suffix: '+' },
    { value: 825, label: 'Research Papers', suffix: '+' },
    { value: 270, label: 'Books Published', suffix: '+' },
    { value: 125, label: 'Ph.D. Awarded', suffix: '+' },
];

const researchAreas = [
    { icon: Laptop, title: "Engineering & Technology" },
    { icon: FlaskConical, title: "Biosciences & Biotechnology" },
    { icon: Briefcase, title: "Management & Commerce" },
    { icon: Microscope, title: "Basic & Applied Sciences" },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Research Overview</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Research is at the heart of Obsidian Peak University's academic philosophy. We are committed to pushing the boundaries of knowledge.
            </p>
          </div>
          <div className="mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-10">
                {researchStats.map(stat => (
                    <div key={stat.label} className="text-center">
                        <p className="text-3xl md:text-4xl font-bold text-primary">
                            <Counter end={stat.value} suffix={stat.suffix} />
                        </p>
                        <p className="mt-2 text-muted-foreground">{stat.label}</p>
                    </div>
                ))}
            </div>
          </div>
           <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">Thrust Areas of Research</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {researchAreas.map((area) => (
                    <div key={area.title} className="flex items-center gap-4 p-4 bg-background rounded-lg border">
                        <area.icon className="w-8 h-8 text-primary flex-shrink-0" />
                        <span className="font-semibold">{area.title}</span>
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
