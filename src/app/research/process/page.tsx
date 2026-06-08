import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Lightbulb, UserCheck, CheckCircle } from 'lucide-react';

const processSteps = [
    { icon: Search, title: "Problem Identification", description: "Encouraging researchers to identify relevant societal and industrial problems." },
    { icon: Lightbulb, title: "Proposal & Funding", description: "Assisting in the preparation of research proposals and seeking funding from various agencies." },
    { icon: UserCheck, title: "Ethical Clearance", description: "Ensuring all research projects adhere to strict ethical guidelines through our internal review board." },
    { icon: CheckCircle, title: "Execution & Publication", description: "Providing state-of-the-art labs and resources for research execution, and promoting publication in high-impact journals." },
];

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/50">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Research Process & Initiatives</h1>
            <p className="text-lg mt-4 text-muted-foreground max-w-3xl mx-auto">
              Our structured research process ensures quality, integrity, and impact.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card key={step.title} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                     <div className="relative">
                        <div className="bg-primary/10 p-4 rounded-full">
                           <step.icon className="w-8 h-8 text-primary" />
                        </div>
                         <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center font-bold text-sm">
                            {index + 1}
                        </div>
                    </div>
                  </div>
                  <CardTitle className="font-headline">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
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
