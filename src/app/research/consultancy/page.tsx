import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FlaskConical, Laptop } from "lucide-react";

const consultancyAreas = [
    { icon: Laptop, title: "IT & Software Development", description: "Providing solutions in web development, AI/ML, and cybersecurity." },
    { icon: FlaskConical, title: "Scientific Research & Analysis", description: "Offering expertise in chemical analysis, material testing, and biotech research." },
    { icon: Briefcase, title: "Business & Management Strategy", description: "Assisting organizations with market research, financial modeling, and strategic planning." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Consultancy Services</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Obsidian Peak University leverages its academic and research expertise to offer professional consultancy services to industries and organizations.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {consultancyAreas.map(item => (
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
